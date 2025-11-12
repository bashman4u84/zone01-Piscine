# Checkpoint Solutions: Batch 2

This document contains programming questions, solutions, and explanations for checkpoints 6-10.

---

## 6. Check Number

### Question

Write a function `CheckNumber` that takes a string and returns `true` if the string contains at least one digit ('0'-'9'), and `false` otherwise.

### Answer

```go
package solution

func CheckNumber(arg string) bool {
	for _, c := range arg {
		if c >= '0' && c <= '9' {
			return true
		}
	}
	return false
}
```

### Explanation

This function iterates through a string to check for the presence of a digit.

1.  **Iteration**: The function loops through each character `c` of the input string `arg`.
2.  **Digit Check**: Inside the loop, it checks if the character's ASCII value is between '0' and '9'.
3.  **Early Exit**: If a digit is found, the function immediately returns `true` without checking the rest of the string.
4.  **Default Return**: If the loop completes without finding any digits, the function returns `false`.

---

## 7. Chunk

### Question

Write a function `Chunk` that takes a slice of integers and a chunk size (an integer). It should split the slice into smaller chunks of the given size and print the resulting 2D slice. If the chunk size is 0 or less, it should print an empty line.

### Answer

```go
package solution

import "fmt"

func Chunk(a []int, ch int) {
	var slice []int
	if ch <= 0 {
		fmt.Println()
		return
	}
	result := make([][]int, 0, len(a)/ch+1)
	for len(a) >= ch {
		slice, a = a[:ch], a[ch:]
		result = append(result, slice)
	}
	if len(a) > 0 {
		result = append(result, a[:])
	}
	fmt.Println(result)
}
```

### Explanation

This function divides a slice into a 2D slice of smaller chunks.

1.  **Input Validation**: It first checks if the chunk size `ch` is positive. If not, it prints a newline and returns.
2.  **Initialization**: It initializes a new 2D slice called `result`. The capacity is pre-calculated to be `len(a)/ch + 1` for efficiency.
3.  **Main Loop**: The function enters a loop that continues as long as the remaining part of the input slice `a` is larger than or equal to the chunk size `ch`.
4.  **Slicing**: In each iteration, it slices `a` to create a `slice` of size `ch`. The original slice `a` is then reassigned to the remaining part. The newly created `slice` is appended to the `result`.
5.  **Handling Remainder**: After the loop, if there are any elements left in `a` (i.e., a final chunk smaller than the specified size), this remaining part is appended as the last chunk to the `result`.
6.  **Output**: Finally, the complete 2D slice `result` is printed.

---

## 8. Clean String

### Question

Write a program that takes a single string as a command-line argument and cleans it. Cleaning consists of removing leading and trailing spaces, and replacing any sequence of one or more spaces between words with a single space. The program should print the cleaned string followed by a newline.

### Answer

```go
package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	if len(os.Args) == 2 {
		re := regexp.MustCompile(`( +)`)
		fmt.Print(re.ReplaceAllString(strings.Trim(os.Args[1], " "), " "))
	}
	fmt.Println()
}
```

### Explanation

This program uses regular expressions to clean up whitespace in a string.

1.  **Argument Check**: It first checks if exactly one argument is provided.
2.  **Trimming**: It uses `strings.Trim(os.Args[1], " ")` to remove all spaces from the beginning and end of the string.
3.  **Regular Expression**: It compiles a regular expression, `regexp.MustCompile(`( +)`)`, which matches any sequence of one or more space characters.
4.  **Replacement**: It then uses `re.ReplaceAllString(..., " ")` to find all occurrences matching the regular expression and replace each one with a single space.
5.  **Output**: The resulting clean string is printed to the console, followed by a final newline that is always printed, regardless of the number of arguments.

---

## 9. Concat Alternate

### Question

Write a function `ConcatAlternate` that takes two slices of integers. It should return a new slice containing the elements of the two input slices, concatenated by alternating between them. If one slice is longer than the other, the remaining elements of the longer slice should be appended at the end.

### Answer

```go
package solution

func ConcatAlternate(slice1, slice2 []int) []int {
	var result []int

	if len(slice1) < len(slice2) {
		slice1, slice2 = slice2, slice1
	}
	for i, v := range slice1 {
		result = append(result, v)
		if i < len(slice2) {
			result = append(result, slice2[i])
		}
	}
	return result
}
```

### Explanation

This function merges two slices by alternating their elements.

1.  **Ensure Order**: It first checks which slice is longer and swaps them if necessary, ensuring that `slice1` is always the longer or equal-length slice. This simplifies the main loop.
2.  **Iteration**: It iterates through the longer slice (`slice1`).
3.  **Alternating Append**: In each iteration, it appends the current element from `slice1`. It then checks if the current index `i` is within the bounds of the shorter slice (`slice2`). If it is, the corresponding element from `slice2` is also appended.
4.  **Appending Remainder**: Because the loop runs for the length of the longer slice, its remaining elements are automatically appended after the shorter slice runs out.
5.  **Return Value**: The final merged `result` slice is returned.

---

## 10. Concat Slice

### Question

Write a function `ConcatSlice` that takes two slices of integers and returns a new slice containing all the elements of the first slice followed by all the elements of the second slice.

### Answer

```go
package solution

func ConcatSlice(slice1, slice2 []int) []int {
	var result []int

	result = append(result, slice1...)
	result = append(result, slice2...)
	
	return result
}
```

### Explanation

This function concatenates two integer slices into one.

1.  **Initialization**: A new empty slice, `result`, is declared.
2.  **Append First Slice**: It uses the `append` function with the variadic `...` operator to add all elements from `slice1` into the `result` slice.
3.  **Append Second Slice**: It does the same for `slice2`, appending all of its elements to the end of the `result` slice.
4.  **Return Value**: The combined slice, `result`, is returned.
