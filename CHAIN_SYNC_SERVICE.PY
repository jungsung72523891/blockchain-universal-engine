import requests
import time

class ChainSyncService:
    def __init__(self, node_urls):
        self.node_urls = node_urls
        self.local_chain = []

    def fetch_remote_chain(self, url):
        try:
            res = requests.get(f"{url}/chain", timeout=5)
            return res.json() if res.status_code == 200 else None
        except:
            return None

    def find_longest_chain(self):
        longest_chain = []
        for url in self.node_urls:
            chain = self.fetch_remote_chain(url)
            if chain and len(chain) > len(longest_chain):
                longest_chain = chain
        return longest_chain

    def sync_chain(self):
        longest = self.find_longest_chain()
        if longest and len(longest) > len(self.local_chain):
            self.local_chain = longest
            return True, "Chain synchronized"
        return False, "Local chain is up to date"

    def start_background_sync(self, interval=30):
        while True:
            self.sync_chain()
            time.sleep(interval)
