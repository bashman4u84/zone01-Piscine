# Checkpoint Solutions: Batch 8 (Final)

This document contains programming questions, solutions, and explanations for the final 4 checkpoints.

---

## 36. Wdmatch

### Question

Write a program that takes two strings, `s1` and `s2`, as command-line arguments. It should check if `s1` can be found as an ordered subsequence in `s2`. If it can, the program should print `s1`. An ordered subsequence means all characters of `s1` appear in `s2` in the same order, but not necessarily consecutively.

### Answer

```go
package main

import (
	"fmt"
	"os"
)

func ok(s1 string, s2 string) bool {
	runes1 := []rune(s1)
	runes2 := []rune(s2)
	var rest string
	count := 0
	for i := 0; i < len(runes1); i++ {
		for j := count; j < len(runes2); j++ {
			if runes1[i] == runes2[j] {
				rest += string(runes1[i])
				j = len(runes2) - 1 // Exit inner loop once a match is found
			}
			count++
		}
	}
	return s1 == rest
}

func main() {
	if len(os.Args) == 3 {
		if ok(os.Args[1], os.Args[2]) {
			fmt.Println(os.Args[1])
		}
	}
}
```

### Explanation

This program checks for an ordered subsequence, similar to the `hiddenp` problem.

1.  **Main Function**: The `main` function checks for two command-line arguments and passes them to the `ok` function. If `ok` returns `true`, it prints the first string.
2.  **`ok` Function Logic**:
    - It converts both strings to rune slices for correct character handling.
    - `rest` is a string built by finding characters of `s1` in `s2`.
    - `count` acts as a pointer, keeping track of the search position in `s2` to ensure characters are found in the correct order.
    - The outer loop iterates through each character of `s1`.
    - The inner loop searches for that character in `s2`, starting from the position marked by `count`.
    - When a match is found (`runes1[i] == runes2[j]`), the character is appended to `rest`, and the inner loop is exited prematurely by setting `j` to its limit. This is a slightly unusual way to break the inner loop.
    - The `count` is incremented in each inner loop iteration, effectively moving the search start position in `s2` forward.
3.  **Comparison**: Finally, it compares the reconstructed string `rest` with the original `s1`. If they are identical, it means every character of `s1` was found in `s2` in the correct order.

---

## 37. We Are Unique

### Question

Write a function `WeAreUnique` that takes two strings, `str1` and `str2`. It should return the count of characters that are unique to either `str1` or `str2`. A character is considered unique if it appears in one string but not in the other, and it should only be counted once. If both strings are empty, return -1.

### Answer

```go
package solution

import "strings"

func WeAreUnique(str1 string, str2 string) int {
	var used [127]int
	if str1 == "" && str2 == "" {
		return -1
	}
	var argv []string = []string{str1, str2}
	k := 0
	i := 0
	for i < 2 {
		j := 0
		for j < len(argv[i]) {
			if used[argv[i][j]] == 0 && !strings.Contains(argv[1-i], string(argv[i][j])) {
				used[argv[i][j]] = 1
				k++
			}
			j++
		}
		i++
	}
	return k
}
```

### Explanation

This function counts characters that exist in one string but not the other.

1.  **Edge Case**: It first checks if both strings are empty, returning -1 in that case.
2.  **Data Structures**:
    - `used [127]int`: An array is used as a hash map to keep track of characters that have already been counted, preventing duplicates. It assumes ASCII characters.
    - `argv []string`: The two input strings are put into a slice to make iterating over them easier.
3.  **Outer Loop**: The loop `for i < 2` iterates through the two strings in the `argv` slice. `i` is the index of the "current" string, and `1-i` is the index of the "other" string.
4.  **Inner Loop**: This loop iterates through each character of the current string (`argv[i]`).
5.  **Uniqueness Check**: The `if` condition is the core of the logic. It checks three things for the current character `argv[i][j]`:
    - `used[argv[i][j]] == 0`: Has this character already been counted?
    - `!strings.Contains(argv[1-i], string(argv[i][j]))`: Is this character absent from the *other* string?
6.  **Counting**: If both conditions are true, it means we've found a character that is unique to the current string and hasn't been counted yet. The character's position in the `used` array is marked as 1, and the unique count `k` is incremented.
7.  **Return**: After both strings have been checked, the total count `k` is returned.

---

## 38. Word Flip

### Question

Write a function `WordFlip` that takes a string containing words separated by spaces. It should reverse the order of the words in the string. The output should have exactly one space between words and no leading or trailing spaces. If the input string is empty, it should return "Invalid Output\n".

### Answer

```go
package solution

import "strings"

func WordFlip(arg string) string {
	if arg == "" {
		return "Invalid Output\n"
	}
	var str []string = strings.Split(arg, " ")
	_len := len(str)
	var str1 string
	for i := _len - 1; i >= 0; i-- {
		if len(str[i]) != 0 {
			str1 += str[i]
		}
		if i > 0 && len(str[i-1]) != 0 {
			str1 += " "
		}
	}
	return (strings.TrimSpace(str1) + "\n")
}
```

### Explanation

This function reverses the order of words in a string.

1.  **Input Validation**: It checks if the input string `arg` is empty and returns an error message if it is.
2.  **Splitting**: `strings.Split(arg, " ")` splits the string into a slice of words. This may include empty strings if there are multiple spaces.
3.  **Reverse Iteration**: The function iterates through the `str` slice in reverse, from the last element to the first (`for i := _len - 1; i >= 0; i--`).
4.  **Reconstruction**:
    - `if len(str[i]) != 0`: It checks to make sure the "word" is not an empty string before appending it to the result `str1`.
    - `if i > 0 && len(str[i-1]) != 0`: This condition decides whether to add a space. A space is added if it's not the very last word being added (i.e., the first word of the original string) and if the *next* word to be added is not an empty string. This is a slightly complex way to avoid adding extra spaces.
5.  **Final Touches**: `strings.TrimSpace(str1)` is used to clean up any potential leading/trailing space from the logic, and a newline is appended before returning.

---

## 39. Zip String

### Question

Write a function `ZipString` that performs a basic form of run-length encoding on a string. It should scan the string and replace any sequence of identical, consecutive characters with the count of that character followed by the character itself.

Example: `"aaabbbccccc"` should become `"3a3b5c"`.

### Answer

```go
package solution

import "strconv"

func countDuplication(s string, i int) int {
	var count int = 0
	for _, v := range s[i:] {
		if v == rune(s[i]) {
			count++
		} else {
			break
		}
	}
	return count
}

func ZipString(s string) string {
	var result string
	i := 0
	for i < len(s) {
		counter := countDuplication(s, i)
		result = result + strconv.Itoa(counter) + string(s[i])
		i += int(counter)
	}
	return result
}
```

### Explanation

This program compresses a string using run-length encoding.

1.  **`countDuplication` Helper**: This function is designed to count how many times a character is repeated starting from a given index `i`.
    - It iterates through the substring starting from `s[i:]`.
    - It compares each character `v` with the character at the starting position `s[i]`.
    - If they match, it increments `count`.
    - If they don't match, it means the sequence of identical characters is broken, so it `break`s the loop.
    - It returns the final `count`.
2.  **`ZipString` Main Function**:
    - It initializes an empty `result` string and an index `i` to 0.
    - The main `for i < len(s)` loop iterates through the string, but not one character at a time. Instead, it jumps by the length of each sequence.
    - **Inside the loop**:
        - It calls `countDuplication(s, i)` to get the number of times the character at the current position `i` is repeated.
        - It appends the count (converted to a string) and the character itself to the `result`.
        - It then advances the main index `i` by the `counter` value (`i += int(counter)`), moving the starting point to the beginning of the next new character sequence.
3.  **Return**: The final compressed `result` string is returned.
