class YieldFarmingEngine {
  private farms: Map<string, { rewardRate: number; totalStaked: number }>;
  private userPositions: Map<string, { amount: number; rewardDebt: number }>;

  constructor() {
    this.farms = new Map();
    this.userPositions = new Map();
  }

  createFarm(poolId: string, rewardRate: number): void {
    this.farms.set(poolId, { rewardRate, totalStaked: 0 });
  }

  deposit(user: string, poolId: string, amount: number): boolean {
    const farm = this.farms.get(poolId);
    if (!farm || amount <= 0) return false;

    const key = `${user}-${poolId}`;
    const pos = this.userPositions.get(key) || { amount: 0, rewardDebt: 0 };
    pos.amount += amount;
    farm.totalStaked += amount;
    this.userPositions.set(key, pos);
    return true;
  }

  claimRewards(user: string, poolId: string): number {
    const farm = this.farms.get(poolId);
    const pos = this.userPositions.get(`${user}-${poolId}`);
    if (!farm || !pos) return 0;
    const reward = pos.amount * farm.rewardRate;
    pos.rewardDebt += reward;
    return reward;
  }
}

export default YieldFarmingEngine;
