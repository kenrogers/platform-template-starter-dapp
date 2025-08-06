"use client";

import { useContext, useEffect, useState } from "react";
import { HiroWalletContext } from "./HiroWalletProvider";
import { Network } from "@/lib/network";

export function NetworkSelector() {
  const { network, setNetwork } = useContext(HiroWalletContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !network) {
    return null;
  }

  const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNetwork(e.target.value as Network);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="network-selector" className="text-sm text-gray-600 dark:text-gray-400">
        Network:
      </label>
      <select
        id="network-selector"
        value={network}
        onChange={handleNetworkChange}
        className="px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-900"
      >
        <option value="mainnet">Mainnet</option>
        <option value="testnet">Testnet</option>
        <option value="devnet">Devnet</option>
      </select>
    </div>
  );
}