import { useContext } from "react";
import { HiroWalletContext } from "@/components/HiroWalletProvider";
import { useDevnetWallet } from "@/components/DevnetWalletProvider";
import { useNetwork } from "@/lib/use-network";

export function useCurrentAddress(): string | null {
  const network = useNetwork();
  const { isWalletConnected, testnetAddress, mainnetAddress } = useContext(HiroWalletContext);
  const { currentWallet } = useDevnetWallet();

  if (network === "devnet") {
    return currentWallet?.stxAddress || null;
  }

  if (!isWalletConnected) {
    return null;
  }

  return network === "mainnet" ? mainnetAddress : testnetAddress;
}