"use client";

import { useContext } from "react";
import { HiroWalletContext } from "./HiroWalletProvider";
import { useDevnetWallet } from "./DevnetWalletProvider";
import { useNetwork } from "@/lib/use-network";
import { truncateMiddle } from "@/lib/utils";

export function ConnectWallet() {
  const network = useNetwork();
  const { isWalletConnected, testnetAddress, mainnetAddress, authenticate, disconnect } =
    useContext(HiroWalletContext);
  const { currentWallet, wallets, selectWalletByIndex } = useDevnetWallet();

  const isDevnet = network === "devnet";
  const currentAddress = network === "mainnet" ? mainnetAddress : testnetAddress;

  if (isDevnet) {
    return (
      <div className="flex items-center gap-2">
        {currentWallet ? (
          <>
            <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
              <span className="text-gray-600 dark:text-gray-400">Devnet: </span>
              <span className="font-mono">{truncateMiddle(currentWallet.stxAddress)}</span>
            </div>
            <select
              value={currentWallet.index}
              onChange={(e) => selectWalletByIndex(parseInt(e.target.value))}
              className="px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-900"
            >
              {wallets.map((wallet) => (
                <option key={wallet.index} value={wallet.index}>
                  Wallet {wallet.index + 1}
                </option>
              ))}
            </select>
          </>
        ) : (
          <button
            onClick={() => selectWalletByIndex(0)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Connect Devnet Wallet
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      {isWalletConnected && currentAddress ? (
        <div className="flex items-center gap-2">
          <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
            <span className="font-mono">{truncateMiddle(currentAddress)}</span>
          </div>
          <button
            onClick={disconnect}
            className="px-3 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={authenticate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}