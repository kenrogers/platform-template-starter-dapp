import { Network } from "@/lib/network";

// Contract addresses for different networks
export const CONTRACT_ADDRESS = {
  mainnet: "SP000000000000000000000000000000", // Replace with your mainnet contract
  testnet: "ST000000000000000000000000000000", // Replace with your testnet contract
  devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", // Devnet deployer address
} as const;

export const CONTRACT_NAME = "starter";

export function getContractAddress(network: Network): string {
  return CONTRACT_ADDRESS[network];
}