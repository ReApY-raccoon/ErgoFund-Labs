/** Base token decimals (Ergo standard references). */
export const DECIMALS = {
  ERG: 9,
  SIG_USD: 2
} as const;

/** Minimum nanoERG to keep boxes valid (protocol-dependent; document in contract). */
export const MIN_NANO_ERG_BOX = 100_000n;

/** Official links shown in the wallet panel (Ergo + SafePal). */
export const WALLET_LINKS = {
  safepalHome: 'https://www.safepal.com/',
  safepalDownload: 'https://www.safepal.com/download',
  ergoWallets: 'https://ergoplatform.org/en/wallets',
  /** Mainnet address page on the public explorer (adjust for testnet if needed). */
  explorerAddressMainnet: (address: string) =>
    `https://explorer.ergoplatform.com/en/addresses/${encodeURIComponent(address)}`
} as const;
