export function truncateMiddle(str: string | null, maxLength: number = 16): string {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  
  const start = str.slice(0, 6);
  const end = str.slice(-4);
  return `${start}...${end}`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function getExplorerUrl(txId: string, network: "mainnet" | "testnet" | "devnet"): string {
  switch (network) {
    case "mainnet":
      return `https://explorer.hiro.so/txid/${txId}`;
    case "testnet":
      return `https://explorer.hiro.so/txid/${txId}?chain=testnet`;
    case "devnet":
      return `#`; // Devnet doesn't have a public explorer
    default:
      return "#";
  }
}