package main

import (
	"fmt"
)

type FullNode struct {
	ID        string
	Chain     []string
	IsRunning bool
}

func NewFullNode(id string) *FullNode {
	return &FullNode{
		ID:        id,
		Chain:     []string{"genesis"},
		IsRunning: false,
	}
}

func (fn *FullNode) Start() {
	fn.IsRunning = true
	fmt.Printf("Node %s started\n", fn.ID)
}

func (fn *FullNode) Stop() {
	fn.IsRunning = false
	fmt.Printf("Node %s stopped\n", fn.ID)
}

func (fn *FullNode) AddBlock(hash string) {
	fn.Chain = append(fn.Chain, hash)
}

func (fn *FullNode) ChainHeight() int {
	return len(fn.Chain)
}

func main() {
	node := NewFullNode("main-full-node-01")
	node.Start()
	node.AddBlock("new-block-hash")
	fmt.Println(node.ChainHeight())
}
