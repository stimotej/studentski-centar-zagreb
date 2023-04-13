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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <AnimatePresence mode="wait">
            <AccessibilitySettings>
              <Component {...pageProps} />
            </AccessibilitySettings>
          </AnimatePresence>
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
