package main

import (
	"fmt"
	"math"
)

type ChainAnalytics struct {
	Blocks []Block
}

type Block struct {
	Transactions int
}

func NewChainAnalytics(blocks []Block) *ChainAnalytics {
	return &ChainAnalytics{Blocks: blocks}
}

func (ca *ChainAnalytics) AvgTransactionsPerBlock() float64 {
	total := 0
	for _, b := range ca.Blocks {
		total += b.Transactions
	}
	return float64(total) / float64(len(ca.Blocks))
}

func (ca *ChainAnalytics) MaxBlockSize() int {
	max := 0
	for _, b := range ca.Blocks {
		if b.Transactions > max {
			max = b.Transactions
		}
	}
	return max
}

func (ca *ChainAnalytics) TPS() float64 {
	return ca.AvgTransactionsPerBlock() / 10
}

func main() {
	blocks := []Block{{3}, {5}, {2}, {7}}
	analytics := NewChainAnalytics(blocks)
	fmt.Println(analytics.TPS())
}
