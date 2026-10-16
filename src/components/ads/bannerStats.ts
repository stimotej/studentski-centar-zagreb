import { useCallback, useEffect, useRef } from "react";

export const BANNER_EVENTS = ["view", "click", "close"] as const;
export type BannerEvent = (typeof BANNER_EVENTS)[number];

const ENDPOINT = "/api/counter";

// A "view" is the advertising industry's viewable impression: at least half
// the banner on screen, in a visible tab, for one continuous second. A plain
// "rendered" count would include tabs opened in the background and never
// looked at.
const VIEW_THRESHOLD = 0.5;
const VIEW_DELAY_MS = 1000;

function send(banner: string, event: BannerEvent) {
  // The viewport width, not a device label: what decides whether a 970x250
  // creative is legible is how wide it renders, and an exact number can be
  // bucketed any way later, where a label fixes the breakpoints for good.
  const body = JSON.stringify({
    banner,
    event,
    screen_width: Math.round(window.innerWidth),
  });
  try {
    // sendBeacon survives the page unloading, which a click on a link may do.
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon?.(ENDPOINT, blob)) return;
  } catch {
    // fall through to fetch
  }
  fetch(ENDPOINT, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
    keepalive: true,
  }).catch(() => {});
}

/**
 * Counts views, clicks and closes for one banner, each at most once per page
 * load — so a visitor clicking twice is one click, and CTR stays honest.
 *
 *   const { ref, track } = useBannerStats("otp-paket-young");
 *   <div ref={ref}>…<a onClick={() => track("click")}>
 */
export function useBannerStats(banner: string | undefined) {
  const ref = useRef<HTMLDivElement>(null);
  const sent = useRef(new Set<BannerEvent>());

  const track = useCallback(
    (event: BannerEvent) => {
      if (!banner || sent.current.has(event)) return;
      sent.current.add(event);
      send(banner, event);
    },
    [banner],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !banner || typeof IntersectionObserver === "undefined") return;

    let inView = false;
    let timer: number | undefined;

    const update = () => {
      const visible = inView && document.visibilityState === "visible";
      if (visible && timer === undefined) {
        timer = window.setTimeout(() => track("view"), VIEW_DELAY_MS);
      } else if (!visible && timer !== undefined) {
        window.clearTimeout(timer);
        timer = undefined;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { threshold: VIEW_THRESHOLD },
    );
    observer.observe(el);
    // IntersectionObserver ignores tab switches, so a banner in a background
    // tab counts as intersecting. Re-check when the tab is shown or hidden.
    document.addEventListener("visibilitychange", update);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [banner, track]);

  return { ref, track };
}
