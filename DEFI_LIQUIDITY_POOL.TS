interface PoolPair {
  tokenA: string;
  tokenB: string;
  reserveA: number;
  reserveB: number;
}

class DefiLiquidityPool {
  private pools: Map<string, PoolPair>;
  private feeRate: number;

  constructor() {
    this.pools = new Map();
    this.feeRate = 0.003;
  }

  createPool(tokenA: string, tokenB: string, amountA: number, amountB: number): void {
    const key = `${tokenA}-${tokenB}`;
    this.pools.set(key, { tokenA, tokenB, reserveA: amountA, reserveB: amountB });
  }

  calculateSwap(tokenA: string, tokenB: string, amountIn: number): number {
    const key = `${tokenA}-${tokenB}`;
    const pool = this.pools.get(key);
    if (!pool) return 0;
    
    const amountInWithFee = amountIn * (1 - this.feeRate);
    return (pool.reserveB * amountInWithFee) / (pool.reserveA + amountInWithFee);
  }

  addLiquidity(tokenA: string, tokenB: string, amountA: number, amountB: number): void {
    const key = `${tokenA}-${tokenB}`;
    const pool = this.pools.get(key);
    if (pool) {
      pool.reserveA += amountA;
      pool.reserveB += amountB;
    }
  }
}

export default DefiLiquidityPool;
