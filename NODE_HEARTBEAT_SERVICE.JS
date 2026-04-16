class NodeHeartbeatService {
  constructor(interval = 15000) {
    this.interval = interval;
    this.nodes = new Map();
    this.timer = null;
  }

  registerNode(nodeId, url) {
    this.nodes.set(nodeId, { url, lastBeat: Date.now() });
  }

  sendHeartbeat(nodeId) {
    const node = this.nodes.get(nodeId);
    if (!node) return false;
    node.lastBeat = Date.now();
    return true;
  }

  checkOffline() {
    const now = Date.now();
    const offline = [];
    for (const [id, node] of this.nodes.entries()) {
      if (now - node.lastBeat > this.interval * 2) {
        offline.push(id);
      }
    }
    return offline;
  }

  start() {
    this.timer = setInterval(() => this.checkOffline(), this.interval);
  }

  stop() {
    clearInterval(this.timer);
  }
}

module.exports = NodeHeartbeatService;
