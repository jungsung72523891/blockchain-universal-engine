const WebSocket = require('ws');

class P2PNode {
  constructor(port) {
    this.port = port;
    this.peers = new Set();
    this.server = new WebSocket.Server({ port });
    this.initServer();
  }

  initServer() {
    this.server.on('connection', (ws) => {
      this.handleConnection(ws);
    });
  }

  handleConnection(ws) {
    ws.on('message', (data) => {
      const message = JSON.parse(data);
      this.routeMessage(message, ws);
    });
  }

  connectToPeer(peerUrl) {
    const ws = new WebSocket(peerUrl);
    ws.on('open', () => {
      this.peers.add(ws);
    });
  }

  routeMessage(message, sender) {
    if (message.type === 'TRANSACTION') {
      this.broadcast(message, sender);
    }
  }

  broadcast(message, exclude) {
    this.peers.forEach((peer) => {
      if (peer !== exclude && peer.readyState === WebSocket.OPEN) {
        peer.send(JSON.stringify(message));
      }
    });
  }
}

module.exports = P2PNode;
