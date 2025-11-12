# Checkpoint Solutions: Batch 7

This document contains programming questions, solutions, and explanations for checkpoints 31-35.

---

## 31. RPN Calculator

### Question

Write a program that evaluates an expression written in Reverse Polish Notation (RPN). The expression will be given as a single command-line argument, with numbers and operators separated by spaces.

- The program should handle the following operators: `+`, `-`, `*`, `/`, `%`.
- It must handle negative numbers.
- If the expression is invalid or if there is not exactly one argument, the program should print `Error`.

Example: `"1 2 + 3 *"` should result in `9`.

### Answer

```go
package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func deleteExtraSpaces(a []string) (res []string) {
	for _, v := range a {
		if v != "" {
			res = append(res, v)
		}
	}
	return
}

func main() {
	if len(os.Args) != 2 {
		fmt.Println("Error")
		return
	}
	var values []int
	op := strings.Split(os.Args[1], " ")
	op = deleteExtraSpaces(op)
	for _, v := range op {
		val, err := strconv.Atoi(v)

		if err == nil {
			values = append(values, val)
			continue
		}

		n := len(values)
		if n < 2 {
			fmt.Println("Error")
			return
		}

		switch v {
		case "+":
			values[n-2] += values[n-1]
			values = values[:n-1]
		case "-":
			values[n-2] -= values[n-1]
			values = values[:n-1]
		case "*":
			values[n-2] *= values[n-1]
			values = values[:n-1]
		case "/":
			values[n-2] /= values[n-1]
			values = values[:n-1]
		case "%" :
			values[n-2] %= values[n-1]
			values = values[:n-1]
		default:
			fmt.Println("Error")
			return
		}
	}
	if len(values) == 1 {
		fmt.Println(values[0])
	} else {
		fmt.Println("Error")
	}
}
```

### Explanation

This program implements a stack-based calculator for Reverse Polish Notation.

1.  **Input Processing**: The `main` function validates that there is one argument. It then splits the argument string by spaces and uses a helper function `deleteExtraSpaces` to clean up the resulting slice, creating a list of tokens (`op`).
2.  **Stack Implementation**: An integer slice `values` is used as a stack to store numbers.
3.  **Token Iteration**: The program iterates through each token `v` from the input.
    - **Number**: It first tries to convert the token to an integer using `strconv.Atoi`. If successful (`err == nil`), the number is pushed onto the stack (`values = append(values, val)`).
    - **Operator**: If the token is not a number, it's treated as an operator.
        - It checks if there are at least two numbers on the stack (`n < 2`). If not, the expression is invalid, and it prints "Error".
        - A `switch` statement handles the five operators (`+`, `-`, `*`, `/`, `%`). For each case, it "pops" the top two numbers by performing the operation on the second-to-last (`values[n-2]`) and last (`values[n-1]`) elements. The result is stored in the second-to-last element, and the stack is shrunk by one (`values = values[:n-1]`).
        - If the token is not a valid operator, it prints "Error".
4.  **Final Result**: After the loop, a valid RPN expression should leave exactly one number on the stack. The program checks if `len(values) == 1`. If so, it prints the final result. Otherwise, it prints "Error".

---

## 32. Save and Miss

### Question

Write a function `SaveAndMiss` that takes a string `arg` and an integer `num`. The function should process the string by "saving" `num` characters and then "missing" (skipping) the next `num` characters, repeating this pattern until the end of the string. It should return the new string formed by the "saved" characters. If `num` is invalid (less than or equal to 0, or greater than the string length), the original string should be returned.

### Answer

```go
package solution

func SaveAndMiss(arg string, num int) string {
	if num <= 0 || num > len(arg) {
		return string(arg)
	}
	_str := ""
	for i := 0; i < len(arg); i++ {
		if i != 0 && i%num == 0 {
			i += num
			if i > len(arg)-1 {
				break
			}
		}
		if i != len(arg) {
			_str += string(rune(arg[i]))
		}
	}
	return _str
}
```

### Explanation

This function constructs a new string by selectively skipping parts of an input string based on a given interval `num`.

1.  **Input Validation**: It first checks if `num` is invalid. If `num` is zero, negative, or larger than the string itself, the pattern makes no sense, so the original string is returned.
2.  **Iteration and Logic**: The function iterates through the string using an index `i`.
    - The `if i != 0 && i%num == 0` condition checks if the current index is a multiple of `num` (but not the very first character). This marks the point where a "miss" should occur.
    - When a "miss" is triggered, the index `i` is advanced by `num` characters (`i += num`), effectively skipping them. A check is added to `break` the loop if this jump overshoots the end of the string.
    - If the current index `i` is not a "miss" point, the character at that position is appended to the result string `_str`.
3.  **Return Value**: The final constructed string `_str` is returned.

---

## 33. Slice

### Question

Write a function `Slice` that mimics the behavior of Go's slicing operator on a slice of strings. It should accept a slice of strings and a variable number of integer arguments (`...int`).

- `Slice(a)`: Should return the original slice `a`.
- `Slice(a, n)`: Should return a slice from index `n` to the end.
- `Slice(a, n, m)`: Should return a slice from index `n` up to (but not including) index `m`.
- The function must handle negative indices, where `-x` is treated as `len(a) - x`.
- If indices are out of bounds, they should be clamped to the valid range (0 to `len(a)`).
- If the start index is greater than the end index, it should return `nil`.

### Answer

```go
package solution

func ifNegative(a []string, n int) int {
	if n < 0 {
		n = len(a) + n
	}

	if n < 0 {
		n = 0
	} else if n > len(a) {
		n = len(a)
	}

	return n
}

func Slice(a []string, nbr ...int) []string {
	if len(nbr) == 0 {
		return a
	}

	first := nbr[0]
	if len(nbr) == 1 {
		if first < 0 {
			first = len(a) + first
			if first < 0 {
				return a
			}
		}
		return a[first:]
	}
	second := nbr[1]

	first = ifNegative(a, first)
	second = ifNegative(a, second)

	if first > second {
		return nil
	}

	return a[first:second]
}
```

### Explanation

This function reimplements Go's string slice logic, including handling negative indices and edge cases.

1.  **`ifNegative` Helper**: This helper function is key to the logic. It takes a slice `a` and an index `n`.
    - If `n` is negative, it converts it to a positive index relative to the end of the slice (`len(a) + n`).
    - It then "clamps" the resulting index, ensuring it's not less than 0 or greater than the length of the slice. This prevents out-of-bounds errors.
2.  **Main `Slice` Function**:
    - **Zero Indices**: If no integer arguments are provided (`len(nbr) == 0`), it returns the original slice.
    - **One Index**: If one index `first` is provided, it handles a potential negative value and then returns the slice from that index to the end (`a[first:]`).
    - **Two Indices**: If two indices `first` and `second` are provided:
        - It uses the `ifNegative` helper to normalize both indices.
        - It checks if the normalized `first` index is greater than the `second`. If so, it's an invalid range, and the function returns `nil`.
        - Otherwise, it returns the standard Go slice `a[first:second]`.

---

## 34. Third Time is a Charm

### Question

Write a function `ThirdTimeIsACharm` that takes a string and returns a new string made up of every third character from the input string, starting from index 2 (the first third character). If the input string is empty or has fewer than 3 characters, it should return a newline. 

### Answer

```go
package solution

import "strings"

func ThirdTimeIsACharm(arg string) string {
	if arg == "" || len(arg) < 3 {
		return "\n"
	}
	var str strings.Builder
	for i := 0; i < len(arg); i++ {
		if i == 0 {
			continue
		}
		j := i + 1
		if j%3 == 0 {
			str.WriteRune(rune(arg[i]))
		}
	}
	str.WriteRune(rune('\n'))
	return (str.String())
}
```

### Explanation

This function extracts specific characters from a string based on their position.

1.  **Input Validation**: It first checks if the string is empty or too short. If the length is less than 3, it's impossible to get a third character, so it just returns a newline.
2.  **String Builder**: It uses a `strings.Builder` for efficient string construction.
3.  **Iteration**: The function iterates through the string with index `i`.
    - It explicitly skips the first character (`i == 0`).
    - It uses a variable `j = i + 1` to think in terms of 1-based indexing for positions.
    - The condition `if j%3 == 0` checks if the character's position is a multiple of 3 (i.e., the 3rd, 6th, 9th... character).
    - If the condition is met, the character at index `i` is written to the string builder.
4.  **Final Output**: After the loop, a newline character is added to the builder, and the final constructed string is returned.

---

## 35. Union

### Question

Write a program that takes two strings as command-line arguments and prints their "union". The union should consist of all characters that appear in at least one of the strings. Each character in the output must be unique, and the order of characters should be the order of their first appearance across both strings (i.e., all unique characters from the first string in order, followed by all unique characters from the second string that were not in the first).

### Answer

```go
package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	if len(os.Args) == 3 {
		var res string
		s1 := os.Args[1]
		s2 := os.Args[2]

		for _, v := range s1 {
			if !strings.ContainsRune(res, v) {
				res += string(v)
			}
		}
		for _, v := range s2 {
			if !strings.ContainsRune(res, v) {
				res += string(v)
			}
		}
		fmt.Print(res)
	}
	fmt.Println()
}
```

### Explanation

This program computes the ordered set union of the characters of two strings.

1.  **Argument Check**: It first ensures there are exactly two string arguments.
2.  **Initialization**: An empty string `res` is created to store the result. This string will be built up with only unique characters.
3.  **First String**: The program iterates through each character `v` of the first string, `s1`.
    - For each character, it checks if that character is already in the `res` string using `!strings.ContainsRune(res, v)`.
    - If the character is not already present, it is appended to `res`. This process gathers all unique characters from `s1` while preserving their original order.
4.  **Second String**: It then performs the exact same process for the second string, `s2`. It iterates through `s2` and appends any character that is not already in `res`. This adds the unique characters from `s2` that were not present in `s1`.
5.  **Output**: The final `res` string is printed, followed by a newline.
