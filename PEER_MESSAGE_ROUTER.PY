import json

class PeerMessageRouter:
    def __init__(self):
        self.routes = {
            "TRANSACTION": self.handle_transaction,
            "BLOCK": self.handle_block,
            "PING": self.handle_ping,
            "SYNC": self.handle_sync
        }
        self.inbox = []

    def parse_message(self, raw):
        try:
            return json.loads(raw)
        except:
            return None

    def route(self, raw_message):
        msg = self.parse_message(raw_message)
        if not msg or "type" not in msg:
            return False
        handler = self.routes.get(msg["type"])
        if handler:
            handler(msg)
            return True
        return False

    def handle_transaction(self, msg):
        self.inbox.append(("transaction", msg["data"]))

    def handle_block(self, msg):
        self.inbox.append(("block", msg["data"]))

    def handle_ping(self, msg):
        return {"type": "PONG"}

    def handle_sync(self, msg):
        self.inbox.append(("sync", msg["height"]))
