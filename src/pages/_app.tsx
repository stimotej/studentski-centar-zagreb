import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import AuthProvider from "@/providers/auth";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AccessibilitySettings from "@/components/shared/AccessibilitySettings";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { useRouter } from "next/router";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
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
        <AuthProvider>
          <AnimatePresence mode="wait">
            <AccessibilitySettings>
              <Component {...pageProps} />
              <ScrollToTop />
            </AccessibilitySettings>
          </AnimatePresence>
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
