import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { BANNER_EVENTS, type BannerEvent } from "@/components/ads/bannerStats";

// Banner statistics, forwarded to WordPress (sc/v1/banner-stats).
//
// The browser talks to this route rather than to WordPress directly so the
// secret stays on the server, and so the request is same-origin with a
// neutral name — ad blockers drop anything that looks like /banner or /track,
// which would quietly undercount exactly the visitors who block ads.
//
// Without BANNER_STATS_SECRET (local dev) events are accepted and dropped, so
// working on the site never writes into the production counters.

const BANNER_KEY = /^[a-z0-9-]{1,40}$/;
const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse/i;

const statsUrl = process.env.NEXT_PUBLIC_SC_API_URL?.replace(
  /wp\/v2\/?$/,
  "sc/v1/banner-stats",
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  const { banner, event, screen_width } = req.body ?? {};
  if (
    typeof banner !== "string" ||
    !BANNER_KEY.test(banner) ||
    !BANNER_EVENTS.includes(event as BannerEvent) ||
    !Number.isInteger(screen_width) ||
    screen_width < 1 ||
    screen_width > 10000
  ) {
    return res.status(400).end();
  }

  const userAgent = req.headers["user-agent"] ?? "";
  const secret = process.env.BANNER_STATS_SECRET;
  if (!secret || !statsUrl || BOT.test(userAgent)) {
    return res.status(204).end();
  }

  try {
    await axios.post(
      statsUrl,
      // WordPress sees this server's User-Agent, not the visitor's, so it is
      // passed along in the body.
      { banner, event, screen_width, user_agent: userAgent.slice(0, 255) },
      { headers: { "X-SC-Stats-Secret": secret }, timeout: 5000 },
    );
  } catch (err) {
    console.error("Banner stats: WordPress refused the event:", err);
  }

  res.status(204).end();
}
