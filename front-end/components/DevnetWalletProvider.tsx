"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DEVNET_ACCOUNTS } from "@/constants/devnet";

export interface DevnetWallet {
  stxAddress: string;
  stxPrivateKey: string;
  btcAddress: string;
  btcPrivateKey: string;
  seed: string;
  index: number;
}

interface DevnetWalletContextType {
  wallets: DevnetWallet[];
  currentWallet: DevnetWallet | null;
  setCurrentWallet: (wallet: DevnetWallet | null) => void;
  selectWalletByIndex: (index: number) => void;
}

const DevnetWalletContext = createContext<DevnetWalletContextType>({
  wallets: [],
  currentWallet: null,
  setCurrentWallet: () => {},
  selectWalletByIndex: () => {},
});

export const useDevnetWallet = () => useContext(DevnetWalletContext);

export function DevnetWalletProvider({ children }: { children: React.ReactNode }) {
  const [wallets] = useState<DevnetWallet[]>(DEVNET_ACCOUNTS);
  const [currentWallet, setCurrentWallet] = useState<DevnetWallet | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedIndex = localStorage.getItem("devnet-wallet-index");
      if (savedIndex !== null) {
        const index = parseInt(savedIndex);
        if (index >= 0 && index < wallets.length) {
          setCurrentWallet(wallets[index]);
        }
      }
    }
  }, [wallets]);

  const selectWalletByIndex = (index: number) => {
    if (index >= 0 && index < wallets.length) {
      setCurrentWallet(wallets[index]);
      if (typeof window !== "undefined") {
        localStorage.setItem("devnet-wallet-index", index.toString());
      }
    }
  };

  const handleSetCurrentWallet = (wallet: DevnetWallet | null) => {
    setCurrentWallet(wallet);
    if (typeof window !== "undefined") {
      if (wallet) {
        localStorage.setItem("devnet-wallet-index", wallet.index.toString());
      } else {
        localStorage.removeItem("devnet-wallet-index");
      }
    }
  };

  return (
    <DevnetWalletContext.Provider
      value={{
        wallets,
        currentWallet,
        setCurrentWallet: handleSetCurrentWallet,
        selectWalletByIndex,
      }}
    >
      {children}
    </DevnetWalletContext.Provider>
  );
}