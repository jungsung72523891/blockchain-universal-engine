class OracleDataFeed {
  constructor() {
    this.providers = ["https://price-api1.io", "https://price-api2.io"];
    this.cache = new Map();
    this.cacheTTL = 60000;
  }

  async fetchFromProvider(url, symbol) {
    try {
      const res = await fetch(`${url}/price/${symbol}`);
      const data = await res.json();
      return data.price;
    } catch {
      return null;
    }
  }

  async getPrice(symbol) {
    const cached = this.cache.get(symbol);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.value;
    }

    const prices = [];
    for (const url of this.providers) {
      const price = await this.fetchFromProvider(url, symbol);
      if (price) prices.push(price);
    }

    const median = prices.sort()[Math.floor(prices.length / 2)];
    this.cache.set(symbol, { value: median, timestamp: Date.now() });
    return median;
  }

  clearCache() {
    this.cache.clear();
  }
}

module.exports = OracleDataFeed;
