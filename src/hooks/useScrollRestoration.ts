import { useRouter } from "next/router";
import { useLayoutEffect, useRef } from "react";

export function useScrollRestoration() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleOnScroll = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    }, 200);
  };

  useLayoutEffect(() => {
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;

    const lastPage = sessionStorage.getItem("lastPage");

    if (lastPage && lastPage.includes(router.pathname)) {
      html.style.scrollBehavior = "auto";

      const savedPosition = parseInt(
        sessionStorage.getItem("scrollPosition") || "0"
      );

      window.scrollTo(0, savedPosition);

      html.style.scrollBehavior = prevScrollBehavior;
    }

    window.addEventListener("scroll", handleOnScroll);

    return () => {
      window.removeEventListener("scroll", handleOnScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [router.pathname]);
}
