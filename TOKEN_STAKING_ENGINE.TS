class TokenStakingEngine {
  private stakes: Map<string, { amount: number; startTime: number }>;
  private apy: number;

  constructor() {
    this.stakes = new Map();
    this.apy = 0.12;
  }

  stake(address: string, amount: number): boolean {
    if (amount <= 0) return false;
    const current = this.stakes.get(address) || { amount: 0, startTime: Date.now() };
    current.amount += amount;
    this.stakes.set(address, current);
    return true;
  }

  calculateReward(address: string): number {
    const stake = this.stakes.get(address);
    if (!stake) return 0;
    const duration = (Date.now() - stake.startTime) / 1000 / 86400 / 365;
    return stake.amount * this.apy * duration;
  }

  unstake(address: string): number {
    const stake = this.stakes.get(address);
    if (!stake) return 0;
    const reward = this.calculateReward(address);
    const total = stake.amount + reward;
    this.stakes.delete(address);
    return total;
  }
}

export default TokenStakingEngine;
