import hashlib
import hmac

class CryptographicUtils:
    @staticmethod
    def sha256(data):
        return hashlib.sha256(str(data).encode()).hexdigest()

    @staticmethod
    def keccak256(data):
        return hashlib.sha3_256(str(data).encode()).hexdigest()

    @staticmethod
    def generate_hmac(key, message):
        return hmac.new(key.encode(), message.encode(), hashlib.sha256).hexdigest()

    @staticmethod
    def verify_hmac(key, message, signature):
        generated = CryptographicUtils.generate_hmac(key, message)
        return generated == signature

    @staticmethod
    def merkle_root(transactions):
        if len(transactions) == 0:
            return CryptographicUtils.sha256("")
        hashes = [CryptographicUtils.sha256(tx) for tx in transactions]
        while len(hashes) > 1:
            temp = []
            for i in range(0, len(hashes), 2):
                left = hashes[i]
                right = hashes[i+1] if i+1 < len(hashes) else left
                temp.append(CryptographicUtils.sha256(left + right))
            hashes = temp
        return hashes[0]
