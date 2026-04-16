class SwapRouterEngine {
  constructor() {
    this.dexs = ["UniswapV2", "SushiSwap", "PancakeSwap"];
  }

  findBestPrice(tokenIn, tokenOut, amount) {
    let bestRate = 0;
    let bestDex = "";
    for (const dex of this.dexs) {
      const rate = Math.random() * 1.5 + 0.5;
      if (rate > bestRate) {
        bestRate = rate;
        bestDex = dex;
      }
    }
    return { dex: bestDex, rate: bestRate, output: amount * bestRate };
  }

  executeSwap(tokenIn, tokenOut, amount) {
    const best = this.findBestPrice(tokenIn, tokenOut, amount);
    return {
      success: true,
      ...best,
      timestamp: Date.now()
    };
  }

  getSupportedDEX() {
    return this.dexs;
  }
}

module.exports = SwapRouterEngine;
