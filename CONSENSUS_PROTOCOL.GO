package main

import (
	"fmt"
	"time"
)

type Consensus struct {
	Validators []string
	Threshold  int
}

func NewConsensus(validators []string) *Consensus {
	return &Consensus{
		Validators: validators,
		Threshold:  len(validators)*2/3 + 1,
	}
}

func (c *Consensus) Vote(voter string, blockHash string) bool {
	for _, v := range c.Validators {
		if v == voter {
			return true
		}
	}
	return false
}

func (c *Consensus) ReachConsensus(votes int) bool {
	return votes >= c.Threshold
}

func (c *Consensus) StartConsensus() {
	fmt.Println("Consensus protocol started at", time.Now())
}

func main() {
	validators := []string{"node1", "node2", "node3", "node4", "node5"}
	consensus := NewConsensus(validators)
	consensus.StartConsensus()
}
