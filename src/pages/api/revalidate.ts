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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

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

  try {
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
      allPathsToRevalidate.push(`/informacije/${p.slug}`)
    );
    eventiPaths.forEach((e) =>
      allPathsToRevalidate.push(`/kultura/eventi/${e.slug}`)
    );
    tecajeviPaths.forEach((t) =>
      allPathsToRevalidate.push(`/kultura/tecajevi-i-radionice/${t.slug}`)
    );
    obavijestiPaths.forEach((o) =>
      allPathsToRevalidate.push(`/obavijesti/${o.slug}`)
    );
    jobsPaths.forEach((j) => allPathsToRevalidate.push(`/poslovi/${j.slug}`));
    restaurantsPaths.forEach((r) =>
      allPathsToRevalidate.push(`/prehrana/restorani/${r.slug}`)
    );
    domoviPaths.forEach((d) =>
      allPathsToRevalidate.push(`/smjestaj/domovi/${d.slug}`)
    );
  } catch (err) {
    console.error("Failed to fetch paths for revalidation:", err);
    return res.status(500).json({
      error: "Error fetching paths",
      message: (err as Error).message,
    });
  }

  try {
    const results = await Promise.all(
      allPathsToRevalidate.map(async (path) => {
        try {
          await res.revalidate(path);
          return { path, success: true };
        } catch (error) {
          return { path, success: false, error: (error as Error).message };
        }
      })
    );
    return res.json({ revalidated: true, results });
  } catch (err) {
    console.error("Revalidation error:", err);
    return res.status(500).json({
      error: "Error revalidating",
      message: (err as Error).message,
    });
  }
}
