class StakingRewardCalculator {
  private baseAPY = 0.08;
  private lockBonus = 0.04;
  private maxBonus = 0.06;

  calculateAPY(lockMonths: number): number {
    let apy = this.baseAPY;
    if (lockMonths >= 3) apy += this.lockBonus;
    if (lockMonths >= 12) apy += this.maxBonus;
    return apy > 0.18 ? 0.18 : apy;
  }

  calculateDailyReward(staked: number, apy: number): number {
    return (staked * apy) / 365;
  }

  calculateTotalReward(staked: number, lockMonths: number): number {
    const apy = this.calculateAPY(lockMonths);
    const days = lockMonths * 30;
    return this.calculateDailyReward(staked, apy) * days;
  }

  formatReward(amount: number): string {
    return amount.toFixed(4);
  }
}

export default StakingRewardCalculator;
