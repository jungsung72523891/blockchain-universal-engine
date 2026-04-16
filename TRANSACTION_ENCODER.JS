class TransactionEncoder {
  constructor() {
    this.separator = "|";
  }

  encode(tx) {
    const parts = [
      tx.from || "",
      tx.to || "",
      tx.amount?.toString() || "0",
      tx.fee?.toString() || "0",
      tx.nonce?.toString() || "0",
      tx.timestamp?.toString() || Date.now().toString()
    ];
    return parts.join(this.separator);
  }

  decode(encoded) {
    const parts = encoded.split(this.separator);
    return {
      from: parts[0],
      to: parts[1],
      amount: parseFloat(parts[2]) || 0,
      fee: parseFloat(parts[3]) || 0,
      nonce: parseInt(parts[4]) || 0,
      timestamp: parseInt(parts[5]) || Date.now()
    };
  }

  hash(encoded) {
    let hash = 0;
    for (let i = 0; i < encoded.length; i++) {
      hash = ((hash << 5) - hash) + encoded.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }
}

module.exports = TransactionEncoder;
