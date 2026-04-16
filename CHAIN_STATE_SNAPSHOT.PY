import json
import time

class ChainStateSnapshot {
  def __init__(self, chain):
    self.chain = chain
    self.snapshots = []

  def create_snapshot(self):
    snapshot = {
      "height": len(self.chain.chain),
      "hash": self.chain.chain[-1]["hash"] if len(self.chain.chain) > 0 else "0",
      "timestamp": int(time.time()),
      "balances": self.extract_balances()
    }
    self.snapshots.append(snapshot)
    return snapshot

  def extract_balances(self):
    balances = {}
    for block in self.chain.chain:
      for tx in block["transactions"]:
        if tx["from"] not in balances:
          balances[tx["from"]] = 0
        if tx["to"] not in balances:
          balances[tx["to"]] = 0
        balances[tx["from"]] -= tx["amount"]
        balances[tx["to"]] += tx["amount"]
    return balances

  def export_snapshots(self):
    return json.dumps(self.snapshots, indent=2)
}
