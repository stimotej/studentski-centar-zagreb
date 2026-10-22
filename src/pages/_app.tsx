import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AccessibilitySettings from "@/components/shared/AccessibilitySettings";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SC_API_URL;

// Next logs an error thrown from getStaticProps with console.error, and an
// AxiosError prints as its whole request and response: about 7 KB for every
// failed regeneration, ~100 MB of PM2 log every 15 minutes while WordPress was
// failing. Print it as one line instead. The error itself is untouched, so
// `axios.isAxiosError` and `error.response` keep working.
if (typeof window === "undefined") {
  axios.interceptors.response.use(undefined, (error) => {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as { message?: unknown } | undefined;
      const reason =
        typeof data?.message === "string"
          ? data.message.replace(/<[^>]*>/g, "")
          : error.message;
      const line = `AxiosError: ${error.config?.method?.toUpperCase()} ${
        error.config ? axios.getUri(error.config) : ""
      } -> ${error.response?.status ?? error.code} ${reason}`;
      Object.defineProperty(error, Symbol.for("nodejs.util.inspect.custom"), {
        value: () => line,
        configurable: true,
      });
    }
    return Promise.reject(error);
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem("lastPage", router.pathname);
  }, [router.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AnimatePresence mode="wait">
          <AccessibilitySettings>
            <Component {...pageProps} />
            <ScrollToTop />
          </AccessibilitySettings>
        </AnimatePresence>
      </Hydrate>
    </QueryClientProvider>
  );
}
