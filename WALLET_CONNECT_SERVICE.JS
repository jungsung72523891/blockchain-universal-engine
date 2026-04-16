class WalletConnectService {
  constructor() {
    this.connectedWallets = new Map();
    this.supported = ["MetaMask", "TrustWallet", "Coinbase"];
  }

  connect(walletType, address) {
    if (!this.supported.includes(walletType)) return false;
    if (this.connectedWallets.has(address)) return false;
    this.connectedWallets.set(address, {
      walletType, connectedAt: Date.now(), sessionId: Math.random().toString(36).slice(2)
    });
    return true;
  }

  disconnect(address) {
    return this.connectedWallets.delete(address);
  }

  isConnected(address) {
    return this.connectedWallets.has(address);
  }

  getSession(address) {
    return this.connectedWallets.get(address) || null;
  }

  listConnected() {
    return Array.from(this.connectedWallets.keys());
  }
}

module.exports = WalletConnectService;
