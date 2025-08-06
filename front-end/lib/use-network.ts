import { useContext } from "react";
import { HiroWalletContext } from "@/components/HiroWalletProvider";

export function useNetwork() {
  const { network } = useContext(HiroWalletContext);
  return network;
}