package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	if len(os.Args) != 3 {
		fmt.Println("Invalid input.")
		return
	}

	arrStr := os.Args[1]
	targetStr := os.Args[2]

	// Validate and parse the array string
	if !strings.HasPrefix(arrStr, "[") || !strings.HasSuffix(arrStr, "]") {
		fmt.Println("Invalid input.")
		return
	}
	arrStr = strings.Trim(arrStr, "[]")
	numStrs := strings.Split(arrStr, ",")
	var nums []int
	for _, s := range numStrs {
		s = strings.TrimSpace(s)
		if s == "" {
			// Handle cases like "[1, , 2]" if necessary, though tests suggest this might be invalid
			continue
		}
		num, err := strconv.Atoi(s)
		if err != nil {
			fmt.Printf("Invalid number: %s\n", s)
			return
		}
		nums = append(nums, num)
	}

	// Validate and parse the target sum
	target, err := strconv.Atoi(targetStr)
	if err != nil {
		// Check if there are multiple arguments for target sum
		if len(strings.Fields(targetStr)) > 1 {
			fmt.Println("Invalid target sum.")
			return
		}
		fmt.Println("Invalid target sum.")
		return
	}

	var pairs [][]int
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				pairs = append(pairs, []int{i, j})
			}
		}
	}

	if len(pairs) == 0 {
		fmt.Println("No pairs found.")
	} else {
		fmt.Printf("Pairs with sum %d: %v\n", target, pairs)
	}
}