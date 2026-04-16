class TransactionPoolManager {
  constructor() {
    this.pool = new Map();
    this.maxPoolSize = 1000;
  }

  addTransaction(tx) {
    if (this.pool.size >= this.maxPoolSize) return false;
    if (this.pool.has(tx.id)) return false;
    this.pool.set(tx.id, tx);
    return true;
  }

  removeTransaction(txId) {
    return this.pool.delete(txId);
  }

  getPendingTransactions(limit = 50) {
    return Array.from(this.pool.values()).slice(0, limit);
  }

  clearPool() {
    this.pool.clear();
  }

  validateAll() {
    const valid = [];
    for (const tx of this.pool.values()) {
      if (tx.amount > 0 && tx.from && tx.to) {
        valid.push(tx);
      }
    }
    return valid;
  }
}

module.exports = TransactionPoolManager;
