import json
import hashlib

class TransactionValidator:
    def __init__(self):
        self.min_amount = 0.0001
        self.max_amount = 100000

    def validate_structure(self, transaction):
        required_fields = ["from", "to", "amount", "signature", "timestamp"]
        for field in required_fields:
            if field not in transaction:
                return False, f"Missing field: {field}"
        return True, "Valid structure"

    def validate_amount(self, amount):
        if not isinstance(amount, (int, float)):
            return False
        return self.min_amount <= amount <= self.max_amount

    def validate_signature(self, transaction):
        data = f"{transaction['from']}{transaction['to']}{transaction['amount']}{transaction['timestamp']}"
        generated_hash = hashlib.sha256(data.encode()).hexdigest()
        return generated_hash == transaction["signature"]

    def full_validate(self, transaction):
        struct_valid, msg = self.validate_structure(transaction)
        if not struct_valid:
            return False, msg
        if not self.validate_amount(transaction["amount"]):
            return False, "Invalid amount range"
        if not self.validate_signature(transaction):
            return False, "Invalid signature"
        return True, "Transaction valid"
