"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <NextUIProvider locale="en-GB">{children}</NextUIProvider>
    </QueryClientProvider>
  );
}

export default Providers;
