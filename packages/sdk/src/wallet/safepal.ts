import type { WalletSession } from '../types.js';

/**
 * SafePal mobile in-app DApp browser often injects the same EIP-12 `window.ergo` bridge
 * as other Ergo wallets. We label the session as SafePal when the user chooses this path.
 */
export async function connectSafePal(): Promise<WalletSession> {
  const w = typeof window !== 'undefined'
    ? (window as unknown as { ergo?: { get_used_addresses?: () => Promise<string[]> } })
    : undefined;
  if (!w?.ergo?.get_used_addresses) {
    throw new Error(
      'SafePal Ergo: open this site in SafePal’s DApp browser, or use Nautilus / Ergo Wallet on desktop.'
    );
  }
  const addrs = await w.ergo.get_used_addresses();
  const address = addrs[0];
  if (!address) throw new Error('No Ergo address from wallet');
  return {
    walletId: 'safepal',
    address,
    connected: true,
    displayLabel: 'SafePal'
  };
}
