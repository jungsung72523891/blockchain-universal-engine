interface BridgeTransfer {
  id: string;
  fromChain: string;
  toChain: string;
  token: string;
  amount: number;
  sender: string;
  receiver: string;
  status: "pending" | "completed" | "failed";
}

class CrossChainBridge {
  private transfers: Map<string, BridgeTransfer>;
  private supportedChains = ["ETH", "BSC", "SOL", "AVAX"];

  constructor() {
    this.transfers = new Map();
  }

  createTransfer(data: Omit<BridgeTransfer, "id" | "status">): string {
    if (!this.supportedChains.includes(data.fromChain) || !this.supportedChains.includes(data.toChain)) {
      return "";
    }
    const id = Math.random().toString(16).slice(2);
    this.transfers.set(id, { ...data, id, status: "pending" });
    return id;
  }

  completeTransfer(id: string): boolean {
    const transfer = this.transfers.get(id);
    if (!transfer || transfer.status !== "pending") return false;
    transfer.status = "completed";
    return true;
  }

  getTransfer(id: string): BridgeTransfer | null {
    return this.transfers.get(id) || null;
  }
}

export default CrossChainBridge;
