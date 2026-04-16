import socket
import threading

class PeerDiscoveryService:
    def __init__(self, port):
        self.port = port
        self.peers = set()
        self.running = False

    def broadcast_presence(self):
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        message = b"NODE_DISCOVERY"
        while self.running:
            try:
                sock.sendto(message, ('<broadcast>', self.port))
            except:
                pass
            import time
            time.sleep(5)

    def listen_for_peers(self):
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.bind(('0.0.0.0', self.port))
        while self.running:
            data, addr = sock.recvfrom(1024)
            if data == b"NODE_DISCOVERY":
                self.peers.add(addr[0])

    def start(self):
        self.running = True
        threading.Thread(target=self.broadcast_presence, daemon=True).start()
        threading.Thread(target=self.listen_for_peers, daemon=True).start()

    def get_peer_list(self):
        return list(self.peers)
