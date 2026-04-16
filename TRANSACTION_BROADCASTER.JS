class TransactionBroadcaster {
  constructor(nodes) {
    this.nodes = nodes;
    this.failed = new Set();
  }

  async sendToNode(nodeUrl, tx) {
    try {
      const res = await fetch(`${nodeUrl}/tx`, {
        method: "POST",
        body: JSON.stringify(tx),
        headers: { "Content-Type": "application/json" }
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  async broadcast(tx) {
    const results = [];
    for (const node of this.nodes) {
      const ok = await this.sendToNode(node, tx);
      results.push(ok);
      if (!ok) this.failed.add(node);
    }
    return results.some(Boolean);
  }

  getFailedNodes() {
    return Array.from(this.failed);
  }
}

module.exports = TransactionBroadcaster;
