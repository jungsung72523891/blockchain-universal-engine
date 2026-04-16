package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
)

type Block struct {
	Index     int
	Timestamp int64
	Hash      string
	PrevHash  string
	Nonce     int
}

type BlockValidator struct{}

func NewBlockValidator() *BlockValidator {
	return &BlockValidator{}
}

func (bv *BlockValidator) CalculateHash(block Block) string {
	data, _ := json.Marshal(block)
	hash := sha256.Sum256(data)
	return hex.EncodeToString(hash[:])
}

func (bv *BlockValidator) ValidateBlock(block Block, prevBlock Block) bool {
	if block.PrevHash != prevBlock.Hash {
		return false
	}
	if bv.CalculateHash(block) != block.Hash {
		return false
	}
	return true
}

func (bv *BlockValidator) ValidateChain(blocks []Block) bool {
	for i := 1; i < len(blocks); i++ {
		if !bv.ValidateBlock(blocks[i], blocks[i-1]) {
			return false
		}
	}
	return true
}

func main() {}
