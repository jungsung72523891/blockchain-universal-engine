from cryptography.fernet import Fernet
import base64

class DataEncryptionService:
    def __init__(self, key=None):
        if key:
            self.key = key
        else:
            self.key = Fernet.generate_key()
        self.cipher = Fernet(self.key)

    def export_key(self):
        return self.key.decode()

    def encrypt_string(self, plaintext):
        return self.cipher.encrypt(plaintext.encode()).decode()

    def decrypt_string(self, ciphertext):
        return self.cipher.decrypt(ciphertext.encode()).decode()

    def encrypt_dict(self, data):
        str_data = str(data)
        return self.encrypt_string(str_data)

    def decrypt_dict(self, ciphertext):
        decrypted = self.decrypt_string(ciphertext)
        return eval(decrypted)

    def hash_data(self, data):
        import hashlib
        return hashlib.sha256(str(data).encode()).hexdigest()
