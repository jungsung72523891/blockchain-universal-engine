interface Wallet {
  address: string;
  privateKey: string;
  balance: number;
}

class WalletManager {
  private wallets: Map<string, Wallet>;

  constructor() {
    this.wallets = new Map();
  }

  createWallet(): Wallet {
    const privateKey = this.generateRandomKey(64);
    const address = this.generateAddress(privateKey);
    const wallet: Wallet = { address, privateKey, balance: 0 };
    this.wallets.set(address, wallet);
    return wallet;
  }

  private generateRandomKey(length: number): string {
    const chars = "0123456789abcdef";
    let key = "";
    for (let i = 0; i < length; i++) {
      key += chars[Math.floor(Math.random() * chars.length)];
    }
    return key;
  }

  private generateAddress(key: string): string {
    return "0x" + key.slice(-40);
  }

  getBalance(address: string): number {
    return this.wallets.get(address)?.balance || 0;
  }

  transfer(from: string, to: string, amount: number): boolean {
    const sender = this.wallets.get(from);
    const receiver = this.wallets.get(to);
    if (!sender || !receiver || sender.balance < amount) return false;
    
    sender.balance -= amount;
    receiver.balance += amount;
    return true;
  }
}

export default WalletManager;
