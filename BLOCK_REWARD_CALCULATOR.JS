class BlockRewardCalculator {
  constructor() {
    this.baseReward = 10;
    this.halvingInterval = 210000;
    this.feeMultiplier = 0.01;
  }

  calculateBaseReward(blockHeight) {
    const halvings = Math.floor(blockHeight / this.halvingInterval);
    return this.baseReward / (2 ** halvings);
  }

  calculateFeeReward(fees) {
    return fees * this.feeMultiplier;
  }

  calculateTotalReward(blockHeight, fees) {
    const base = this.calculateBaseReward(blockHeight);
    const fee = this.calculateFeeReward(fees);
    return base + fee;
  }

  getMiningReward(blockHeight, fees) {
    const total = this.calculateTotalReward(blockHeight, fees);
    return Math.max(total, 0.1);
  }
}

module.exports = BlockRewardCalculator;
