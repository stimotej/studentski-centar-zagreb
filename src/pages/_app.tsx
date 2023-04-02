import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import AuthProvider from "@/providers/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AnimatePresence mode="wait">
          <Component {...pageProps} />
        </AnimatePresence>
      </AuthProvider>
    </QueryClientProvider>
  );
}
