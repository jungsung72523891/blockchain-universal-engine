package main

import (
	"fmt"
	"time"
)

type NodeStatus struct {
	ID        string
	Online    bool
	Latency   int
	LastCheck time.Time
}

type NodeMonitor struct {
	Nodes map[string]*NodeStatus
}

func NewNodeMonitor() *NodeMonitor {
	return &NodeMonitor{Nodes: make(map[string]*NodeStatus)}
}

func (nm *NodeMonitor) RegisterNode(id string) {
	nm.Nodes[id] = &NodeStatus{ID: id, Online: true, Latency: 0}
}

func (nm *NodeMonitor) CheckNode(id string) {
	if node, ok := nm.Nodes[id]; ok {
		node.Latency = int(time.Now().UnixMilli() % 500)
		node.LastCheck = time.Now()
		node.Online = node.Latency < 400
	}
}

func (nm *NodeMonitor) GetOfflineNodes() []string {
	var offline []string
	for id, node := range nm.Nodes {
		if !node.Online {
			offline = append(offline, id)
		}
	}
	return offline
}

func main() {
	monitor := NewNodeMonitor()
	monitor.RegisterNode("node-01")
	monitor.CheckNode("node-01")
	fmt.Println(monitor.GetOfflineNodes())
}
