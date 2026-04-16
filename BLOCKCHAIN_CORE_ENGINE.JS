class BlockchainCore {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.createGenesisBlock();
  }

  createGenesisBlock() {
    const genesisBlock = {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      prevHash: "0",
      hash: this.generateHash("0"),
      nonce: 0
    };
    this.chain.push(genesisBlock);
  }

  generateHash(blockData) {
    const str = JSON.stringify(blockData);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  mineBlock(nonce) {
    const lastBlock = this.chain[this.chain.length - 1];
    const newBlock = {
      index: this.chain.length,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      prevHash: lastBlock.hash,
      nonce,
      hash: ""
    };
    newBlock.hash = this.generateHash(newBlock);
    this.chain.push(newBlock);
    this.pendingTransactions = [];
    return newBlock;
  }

  validateChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];
      if (current.hash !== this.generateHash(current) || current.prevHash !== previous.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports = BlockchainCore;
