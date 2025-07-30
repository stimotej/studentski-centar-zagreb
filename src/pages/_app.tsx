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
