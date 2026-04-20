/**
 * Ganache local networks only: chainId 1337 or 5777 (decimal).
 * MetaMask returns chainId as hex string (e.g. 0x539, 0x1691).
 */

const parseChainId = (chainId) => {
  if (chainId == null) return null;
  const s = String(chainId);
  if (s.startsWith("0x") || s.startsWith("0X")) {
    return Number.parseInt(s, 16);
  }
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};

const GANACHE_DECIMAL_IDS = new Set([1337, 5777]);

export const isGanacheChainId = (chainId) => {
  const n = parseChainId(chainId);
  return n != null && GANACHE_DECIMAL_IDS.has(n);
};

export const formatChainMessage = (chainId) => {
  const n = parseChainId(chainId);
  if (n == null) return "Unknown network";
  return `Current chain ID: ${n} (use Ganache 1337 or 5777)`;
};

export const isMetaMaskInstalled = () => typeof window !== "undefined" && Boolean(window.ethereum?.isMetaMask);

export const getChainId = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed.");
  }
  return window.ethereum.request({ method: "eth_chainId" });
};

/**
 * Request accounts only (no network validation). Use for signup connect flow.
 */
export const requestAccountsOnly = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed.");
  }
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  if (!accounts?.length) {
    throw new Error("No account selected in MetaMask.");
  }
  return accounts[0];
};

export const refreshChainId = async () => {
  if (!window.ethereum) return null;
  try {
    return await getChainId();
  } catch {
    return null;
  }
};

export const onChainChanged = (handler) => {
  if (!window.ethereum?.on) return () => {};
  window.ethereum.on("chainChanged", handler);
  return () => {
    window.ethereum.removeListener("chainChanged", handler);
  };
};
