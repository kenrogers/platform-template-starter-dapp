"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HiroWalletProvider } from "./HiroWalletProvider";
import { DevnetWalletProvider } from "./DevnetWalletProvider";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DevnetWalletProvider>
        <HiroWalletProvider>
          {children}
        </HiroWalletProvider>
      </DevnetWalletProvider>
    </QueryClientProvider>
  );
}