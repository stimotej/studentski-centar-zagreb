import {
  getDomoviPaths,
  getEventsPaths,
  getInformacijePaths,
  getJobsPaths,
  getObavijestiPaths,
  getRestaurantsPaths,
  getTecajeviPaths,
} from "@/features/paths";
import type { NextApiRequest, NextApiResponse } from "next";

// WordPress calls this route on every save (Code Snippets: "Nextjs revalidation
// on content change"), and it rebuilds every page of the site in both locales.
//
// Rebuilding them all at once meant hundreds of concurrent page builds, each
// fetching from WordPress: more PHP workers than MySQL's 151 connections, so
// WordPress answered "Error establishing a database connection" in bursts all
// through office hours. So WordPress gets its answer straight away (it waits on
// this request, with a 5 s timeout), and the pages are rebuilt a few at a time
// in the background. A save that arrives mid-sweep doesn't start a second
// sweep; it queues one more pass, which picks up every save made meanwhile.
//
// The limit is per process: PM2 runs the site as a 4-worker cluster, so at most
// 4 × CONCURRENCY pages are rebuilt at once.

const CONCURRENCY = 3;

// A rebuild that never settles must not hold the sweep up. On the first
// production run every page was rebuilt but the sweep never finished, which
// left that worker "sweeping" for good and silently dropped every later save
// it received. A path that takes longer than this is reported as failed.
const PATH_TIMEOUT_MS = 60_000;

let sweeping = false;
let queued: NextApiResponse | null = null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (sweeping) {
    queued = res;
    return res.status(202).json({ revalidating: true, queued: true });
  }

  res.status(202).json({ revalidating: true });
  void sweepUntilIdle(res);
}

// `res.revalidate` rebuilds the page inside this server process through a mock
// request (`next start`), so it keeps working after the response has been sent.
async function sweepUntilIdle(res: NextApiResponse) {
  sweeping = true;
  try {
    let next: NextApiResponse | null = res;
    while (next) {
      const current: NextApiResponse = next;
      queued = null;
      await sweep(current);
      next = queued;
    }
  } finally {
    sweeping = false;
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number) {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`timed out after ${ms / 1000}s`)),
      ms,
    );
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function sweep(res: NextApiResponse) {
  const started = Date.now();

  let paths: string[];
  try {
    paths = await getPathsToRevalidate();
  } catch (err) {
    console.error("Revalidation: failed to fetch paths:", err);
    return;
  }

  const failed: string[] = [];
  let index = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (index < paths.length) {
        const path = paths[index++];
        try {
          // Pages nobody has opened since the deploy are skipped rather than
          // built; they are generated from fresh data on their first visit.
          await withTimeout(
            res.revalidate(path, { unstable_onlyGenerated: true }),
            PATH_TIMEOUT_MS,
          );
        } catch (error) {
          failed.push(`${path} (${(error as Error).message})`);
        }
      }
    }),
  );

  const seconds = Math.round((Date.now() - started) / 1000);
  const summary = `Revalidation: ${paths.length - failed.length}/${paths.length} paths in ${seconds}s`;
  if (failed.length === 0) {
    console.log(summary);
  } else {
    const more = failed.length > 5 ? ` and ${failed.length - 5} more` : "";
    console.error(`${summary}, failed: ${failed.slice(0, 5).join(", ")}${more}`);
  }
}

async function getPathsToRevalidate() {
  const allPathsToRevalidate = [
    "/",
    "/informacije",
    "/mediji",
    "/prijava-poslodavac",
    "/prijava-student",
    "/kultura",
    "/kultura/faq",
    "/kultura/eventi",
    "/kultura/tecajevi-i-radionice",
    "/obavijesti",
    "/poslovi",
    "/prehrana",
    "/prehrana/faq",
    "/smjestaj",
    "/smjestaj/faq",
    "/sport",
    "/sport/faq",
    "/student-servis",
    "/student-servis/faq",
  ];

  const [
    informacijePosts,
    eventiPaths,
    tecajeviPaths,
    obavijestiPaths,
    jobsPaths,
    restaurantsPaths,
    domoviPaths,
  ] = await Promise.all([
    getInformacijePaths(),
    getEventsPaths(),
    getTecajeviPaths(),
    getObavijestiPaths(),
    getJobsPaths(),
    getRestaurantsPaths(),
    getDomoviPaths(),
  ]);

  informacijePosts.forEach((p) =>
    allPathsToRevalidate.push(`/informacije/${p.slug}`),
  );
  eventiPaths.forEach((e) =>
    allPathsToRevalidate.push(`/kultura/eventi/${e.slug}`),
  );
  tecajeviPaths.forEach((t) =>
    allPathsToRevalidate.push(`/kultura/tecajevi-i-radionice/${t.slug}`),
  );
  obavijestiPaths.forEach((o) =>
    allPathsToRevalidate.push(`/obavijesti/${o.slug}`),
  );
  jobsPaths.forEach((j) => allPathsToRevalidate.push(`/poslovi/${j.slug}`));
  restaurantsPaths.forEach((r) =>
    allPathsToRevalidate.push(`/prehrana/restorani/${r.slug}`),
  );
  domoviPaths.forEach((d) =>
    allPathsToRevalidate.push(`/smjestaj/domovi/${d.slug}`),
  );

  // Every page exists twice now. Croatian is the default locale so it keeps
  // the bare path, and English lives under /en — revalidating only the bare
  // path would leave the English copy to age out on its own revalidate timer
  // instead of updating when an editor saves.
  return allPathsToRevalidate.flatMap((path) => [
    path,
    path === "/" ? "/en" : `/en${path}`,
  ]);
}
