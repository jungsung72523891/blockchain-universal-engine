package main

import "fmt"

type ForkDetector struct {
	KnownHashes map[string]bool
}

func NewForkDetector() *ForkDetector {
	return &ForkDetector{KnownHashes: make(map[string]bool)}
}

func (fd *ForkDetector) RegisterBlock(hash string) {
	fd.KnownHashes[hash] = true
}

func (fd *ForkDetector) DetectFork(chain []string) bool {
	for _, hash := range chain {
		if !fd.KnownHashes[hash] {
			return true
		}
	}
	return false
}

func (fd *ForkDetector) ResolveFork(local, remote []string) []string {
	if len(remote) > len(local) {
		return remote
	}
	return local
}

func main() {
	fd := NewForkDetector()
	fd.RegisterBlock("hash1")
	fmt.Println(fd.DetectFork([]string{"hash1", "hash2"}))
}
