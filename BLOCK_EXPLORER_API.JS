const express = require('express');
const app = express();
app.use(express.json());

class BlockExplorerAPI {
  constructor(core) {
    this.core = core;
    this.registerRoutes();
  }

  registerRoutes() {
    app.get('/api/chain', (req, res) => {
      res.json({ chain: this.core.chain, length: this.core.chain.length });
    });

    app.get('/api/block/:index', (req, res) => {
      const index = parseInt(req.params.index);
      const block = this.core.chain[index];
      res.json(block || { error: "Block not found" });
    });

    app.get('/api/address/:addr', (req, res) => {
      const addr = req.params.addr;
      const txs = this.core.chain.flatMap(b => b.transactions).filter(tx => tx.from === addr || tx.to === addr);
      res.json({ address: addr, transactions: txs });
    });
  }

  start(port = 3000) {
    app.listen(port, () => {
      console.log(`Explorer running on port ${port}`);
    });
  }
}

module.exports = BlockExplorerAPI;
