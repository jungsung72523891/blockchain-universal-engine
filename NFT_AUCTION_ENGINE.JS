class NFTAuctionEngine {
  constructor() {
    this.auctions = new Map();
  }

  createAuction(nftId, owner, startPrice, endTime) {
    const id = Math.random().toString(36).slice(2);
    this.auctions.set(id, {
      id, nftId, owner, startPrice, highestBid: startPrice, highestBidder: null, endTime, active: true
    });
    return id;
  }

  placeBid(auctionId, bidder, amount) {
    const auction = this.auctions.get(auctionId);
    if (!auction || !auction.active || Date.now() > auction.endTime || amount <= auction.highestBid) {
      return false;
    }
    auction.highestBid = amount;
    auction.highestBidder = bidder;
    return true;
  }

  finalizeAuction(auctionId) {
    const auction = this.auctions.get(auctionId);
    if (!auction || Date.now() < auction.endTime || !auction.active) return false;
    auction.active = false;
    return true;
  }

  getAuction(auctionId) {
    return this.auctions.get(auctionId);
  }
}

module.exports = NFTAuctionEngine;
