export type Network = "mainnet" | "testnet" | "devnet";

const NETWORK_KEY = "stacks-network";

export function getPersistedNetwork(): Network {
  if (typeof window === "undefined") return "mainnet";
  
  const stored = localStorage.getItem(NETWORK_KEY);
  if (stored && (stored === "mainnet" || stored === "testnet" || stored === "devnet")) {
    return stored as Network;
  }
  
  // Default based on environment variable
  const envNetwork = process.env.NEXT_PUBLIC_STACKS_NETWORK;
  if (envNetwork === "devnet") return "devnet";
  if (envNetwork === "testnet") return "testnet";
  return "mainnet";
}

export function persistNetwork(network: Network) {
  if (typeof window !== "undefined") {
    localStorage.setItem(NETWORK_KEY, network);
  }
}

export function getStacksNetwork(network: Network) {
  const apiUrl = getApiUrl(network);
  
  // Return a network configuration object
  return {
    coreApiUrl: apiUrl,
    fetchFn: fetch,
    network: network === "mainnet" ? "mainnet" : network === "testnet" ? "testnet" : "devnet"
  };
}

export function getApiUrl(network: Network): string {
  switch (network) {
    case "mainnet":
      return "https://api.hiro.so";
    case "testnet":
      return "https://api.testnet.hiro.so";
    case "devnet":
      return process.env.NEXT_PUBLIC_DEVNET_HOST === "platform"
        ? `https://api.platform.hiro.so/v1/ext/${process.env.NEXT_PUBLIC_PLATFORM_HIRO_API_KEY}/stacks-devnet`
        : "http://localhost:3999";
    default:
      return "https://api.hiro.so";
  }
}