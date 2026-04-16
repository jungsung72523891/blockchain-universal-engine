class NFTMetadataGenerator {
  constructor() {
    this.traits = {
      background: ["red", "blue", "green", "black", "white"],
      body: ["robot", "human", "alien", "cyborg"],
      accessory: ["sword", "shield", "gun", "crown"]
    };
  }

  generateRandomTrait(category) {
    const list = this.traits[category];
    return list[Math.floor(Math.random() * list.length)];
  }

  generateMetadata(tokenId) {
    return {
      name: `Blockchain NFT #${tokenId}`,
      description: "Decentralized digital collectible on public chain",
      image: `ipfs://QmRandomHash${tokenId}`,
      attributes: [
        { trait_type: "Background", value: this.generateRandomTrait("background") },
        { trait_type: "Body", value: this.generateRandomTrait("body") },
        { trait_type: "Accessory", value: this.generateRandomTrait("accessory") }
      ],
      external_url: "https://nft-engine.io",
      created_at: new Date().toISOString()
    };
  }

  batchGenerate(count) {
    return Array.from({ length: count }, (_, i) => this.generateMetadata(i + 1));
  }
}

module.exports = NFTMetadataGenerator;
