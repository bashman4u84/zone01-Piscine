# Checkpoint Solutions: Batch 1 (Revised)

This document contains programming questions, solutions, and detailed, beginner-friendly explanations of the code for checkpoints 1-5.

---

## 1. Add Prime Sum

### Question

Write a program that takes a single command-line argument representing a positive integer. The program should calculate and print the sum of all prime numbers from 2 up to and including the given number.

- If the input is not a valid positive integer, or if the number of arguments is not exactly one, the program should print `0` followed by a newline.
- You can assume the input number will fit within an `int`.

### Answer

```go
package main

import (
	"os"

	"github.com/01-edu/z01"
)

func main() {
	if len(os.Args) != 2 {
		z01.PrintRune('0')
		z01.PrintRune('\n')
		return
	}

	arg := os.Args[1]
	num, err := Atoi(arg)
	if err != nil || num <= 0 {
		z01.PrintRune('0')
		z01.PrintRune('\n')
		return
	}

	sum := 0
	for i := 2; i <= num; i++ {
		if isPrime(i) {
			sum += i
		}
	}
	PrintNbr(sum)
	z01.PrintRune('\n')
}

func isPrime(n int) bool {
	if n <= 1 {
		return false
	}
	for i := 2; i*i <= n; i++ {
		if n%i == 0 {
			return false
		}
	}
	return true
}

func Atoi(s string) (int, error) {
	// ... implementation from previous steps ...
}

func PrintNbr(n int) {
	// ... implementation from previous steps ...
}
```

### Detailed Code Explanation

This program is composed of a `main` function that controls the flow, and helper functions like `isPrime` to perform specific tasks.

**`main` function:**

-   `import ("os", "github.com/01-edu/z01")`: This line imports two packages. The `os` package is needed to access command-line arguments. The `z01` package is a custom package for this learning environment, used here for printing characters to the screen.
-   `if len(os.Args) != 2`: `os.Args` is a slice of strings containing all the arguments passed to the program. `os.Args[0]` is the name of the program itself, and `os.Args[1]` is the first argument provided by the user. This line checks if the total number of arguments is not exactly two (program name + one user argument). This is the primary input validation.
-   `return`: If the number of arguments is wrong, the program prints '0' and a newline, and `return` immediately stops the `main` function.
-   `arg := os.Args[1]`: We assign the user's argument to the variable `arg`.
-   `num, err := Atoi(arg)`: This calls our custom `Atoi` function (ASCII to Integer) to convert the string argument into an integer. In Go, functions can return multiple values. Here, `Atoi` returns the integer result (`num`) and a potential error (`err`).
-   `if err != nil || num <= 0`: This checks two conditions. `err != nil` checks if the `Atoi` conversion failed (e.g., the string contained non-numeric characters). `num <= 0` checks if the number is negative or zero. If either is true, it's invalid input, so we print '0' and exit.
-   `sum := 0`: A variable `sum` is initialized to zero. This will store the running total of the prime numbers we find.
-   `for i := 2; i <= num; i++`: This is the main loop. It starts an integer `i` at 2 (the first prime number) and continues as long as `i` is less than or equal to the user's input number, incrementing `i` by one each time.
-   `if isPrime(i)`: Inside the loop, for each number `i`, this line calls the `isPrime` function to check if `i` is a prime number.
-   `sum += i`: If `isPrime` returns `true`, the current number `i` is added to our `sum`.
-   `PrintNbr(sum)`: After the loop finishes, this calls a custom function to print the final calculated `sum`.

**`isPrime` function:**

-   `func isPrime(n int) bool`: This defines a function named `isPrime` that takes one integer `n` and returns a boolean (`true` or `false`).
-   `if n <= 1`: Prime numbers are defined as being greater than 1. This line handles the base cases, immediately returning `false` for 0, 1, and any negative numbers.
-   `for i := 2; i*i <= n; i++`: This loop checks for factors of `n`. It's an important optimization. Instead of checking all the way up to `n`, we only need to check up to the square root of `n`. **Why?** Because if a number `n` has a divisor `d` that is larger than its square root, it must also have a corresponding divisor `n/d` that is *smaller* than its square root. So, if we don't find any divisors by the time we reach the square root, we can be sure none exist.
-   `if n%i == 0`: The modulo operator (`%`) gives the remainder of a division. If the remainder of `n` divided by `i` is 0, it means `i` is a divisor, and therefore `n` is not a prime number. The function returns `false`.
-   `return true`: If the loop finishes without finding any divisors, it means the number is prime, and the function returns `true`.

---

## 2. Atoi

### Question

Write a function `Atoi` that converts a string of digits into an integer.

- The function should handle both positive and negative numbers, which are indicated by a `+` or `-` sign at the very beginning of the string.
- If the string contains any characters that are not digits (outside of the optional leading sign), the function should return `0`.

### Answer

```go
package main

func Atoi(s string) int {
	if len(s) == 0 {
		return 0
	}
	res := 0
	sign := 1
	for i, c := range s {
		if i == 0 && (c == '+' || c == '-') {
			if c == '-' {
				sign = -1
			}
			continue
		}
		if c < '0' || c > '9' {
			return 0
		}
		res = res*10 + int(c-'0')
	}
	return res * sign
}
```

### Detailed Code Explanation

This function manually implements the logic for converting a string of characters into an integer.

-   `if len(s) == 0`: This is a guard clause. If the input string `s` is empty, there's nothing to convert, so it returns `0` immediately.
-   `res := 0`: Initializes the `res` (result) variable, which will accumulate the final integer value.
-   `sign := 1`: Initializes a `sign` multiplier to `1` (for positive numbers). This will be changed to `-1` if a negative sign is found.
-   `for i, c := range s`: This is a `for...range` loop, a common way to iterate over strings in Go. In each iteration, it gives you the index `i` and the character (as a `rune`) `c`.
-   `if i == 0 && (c == '+' || c == '-')`: This checks if we are at the very first character of the string (`i == 0`) AND if that character is either a `+` or a `-`.
    -   `if c == '-'`: If the sign is a minus, the `sign` variable is updated to `-1`.
    -   `continue`: This keyword immediately skips to the next iteration of the loop, so the sign character itself isn't processed as a digit.
-   `if c < '0' || c > '9'`: This checks if the character `c` is NOT a digit. It does this by comparing its value to the values of the characters '0' and '9'. If it's any other character, the string is invalid, and the function returns `0`.
-   `res = res*10 + int(c-'0')`: This is the core of the conversion.
    -   `res * 10`: This shifts the digits we've already processed one place to the left (e.g., if `res` is 12, it becomes 120).
    -   `int(c - '0')`: This converts the digit character to its integer equivalent. In ASCII (and UTF-8), digits '0' through '9' are encoded as sequential numbers. So, subtracting the character '0' from any other digit character gives you the integer value of that digit (e.g., '7' - '0' = 7).
    -   The new digit is then added to the shifted result.
-   `return res * sign`: After the loop, the final accumulated `res` is multiplied by `sign`. If no negative sign was found, this multiplies by 1 (no change). If a negative sign was found, it multiplies by -1, making the result negative.

---

## 3. Brackets

### Question

Write a program that takes one or more strings as command-line arguments. For each argument, the program must determine if the brackets `()`, `[]`, and `{}` are balanced and correctly nested.

- If the brackets in a string are balanced, the program should print `OK`.
- If they are not balanced, it should print `Error`.
- Characters that are not brackets should be ignored.

### Answer

```go
package main

import (
	os
	"github.com/01-edu/z01"
)

func main() {
	// ...
}

func isBalanced(s string) bool {
	var stack []rune
	for _, r := range s {
		switch r {
		case '(', '[', '{':
			stack = append(stack, r)
		case ')':
			if len(stack) == 0 || stack[len(stack)-1] != '(' {
				return false
			}
			stack = stack[:len(stack)-1]
		case ']':
			if len(stack) == 0 || stack[len(stack)-1] != '[' {
				return false
			}
			stack = stack[:len(stack)-1]
		case '}':
			if len(stack) == 0 || stack[len(stack)-1] != '{' {
				return false
			}
			stack = stack[:len(stack)-1]
		}
	}
	return len(stack) == 0
}
```

### Detailed Code Explanation

This problem is a classic example of using a **stack** data structure. A stack follows a "Last-In, First-Out" (LIFO) principle. Think of it like a stack of plates: you add new plates to the top, and you can only remove the top plate.

**`isBalanced` function:**

-   `var stack []rune`: In Go, a slice can be used to simulate a stack. We declare a slice of `rune` (a character type) called `stack`. We will use it to store the opening brackets we encounter.
-   `for _, r := range s`: We loop through each character `r` in the input string.
-   `switch r`: A `switch` statement is a clean way to handle the different types of characters.
-   `case '(', '[', '{':`: If the character is an opening bracket...
    -   `stack = append(stack, r)`: ...we "push" it onto our stack. The `append` function adds the new bracket to the end of the slice.
-   `case ')':`: If the character is a closing parenthesis...
    -   `if len(stack) == 0 || stack[len(stack)-1] != '('`: ...we check two critical conditions.
        1.  `len(stack) == 0`: Is the stack empty? If it is, we have a closing bracket with no corresponding opening bracket. This is an error.
        2.  `stack[len(stack)-1] != '('`: If the stack is not empty, we look at the last element (`stack[len(stack)-1]`, which is the "top" of our stack). Does it match the type of closing bracket we have? If we have a `)` but the top of the stack is `[` or `{`, the brackets are not correctly nested. This is an error.
    -   `stack = stack[:len(stack)-1]`: If the conditions pass, it means we found a valid, matching pair. We "pop" the opening bracket off the stack. This is done by re-slicing the slice to exclude the last element.
-   `case ']':` and `case '}':`: These follow the exact same logic as the closing parenthesis, just for their respective bracket types.
-   `return len(stack) == 0`: After the loop has checked every character in the string, we look at the stack one last time.
    -   If the stack is empty (`len(stack) == 0`), it means every opening bracket we found was perfectly matched with a closing bracket. The expression is balanced, and the function returns `true`.
    -   If the stack is *not* empty, it means we have leftover opening brackets that were never closed (e.g., "([)]"). The expression is unbalanced, and the function returns `false`.

---

## 4. Camel to Snake Case

### Question

Write a program `cameltosnakecase` that converts a string from `camelCase` to `snake_case`. The conversion rule is to insert an underscore `_` before each uppercase letter and convert that letter to lowercase.

### Answer

```go
package main

import (
	"os"
	"github.com/01-edu/z01"
)

func main() {
	if len(os.Args) != 2 {
		return
	}

	s := os.Args[1]
	var result []rune
	for i, r := range s {
		if r >= 'A' && r <= 'Z' {
			if i > 0 {
				result = append(result, '_')
			}
			result = append(result, r-'A'+'a')
		} else {
			result = append(result, r)
		}
	}

	for _, r := range result {
		z01.PrintRune(r)
	}
	z01.PrintRune('\n')
}
```

### Detailed Code Explanation

This program converts a string from one common programming case style to another by iterating through it character by character.

-   `var result []rune`: We declare a slice of runes called `result`. We will build our new `snake_case` string in this slice. Using a rune slice is often better than building a string directly with `+` because it can be more efficient and handles all characters correctly.
-   `for i, r := range s`: We loop through the input string `s`, getting both the index `i` and the character `r` for each pass.
-   `if r >= 'A' && r <= 'Z'`: This condition checks if the current character `r` is an uppercase letter.
-   `if i > 0`: If it *is* an uppercase letter, we have a nested check. This ensures we don't add an underscore at the very beginning of the string (e.g., for an input like "MyVariable"). An underscore is only added if the uppercase letter is found after the first character.
-   `result = append(result, '_')`: If the conditions are met, an underscore character is appended to our `result` slice.
-   `result = append(result, r-'A'+'a')`: This line converts the uppercase letter to lowercase and appends it.
    -   `r - 'A'`: This calculates the "distance" of the uppercase letter from 'A'. For 'C', this would be 2.
    -   `... + 'a'`: This adds that distance to the character 'a'. For 'C', this becomes 'a' + 2, which results in the character 'c'.
-   `else { result = append(result, r) }`: If the character was not an uppercase letter, it's appended to the `result` slice without any changes.
-   `for _, r := range result`: After the main loop has finished building the `result` slice, this second loop iterates through our new slice and prints each character one by one.

---

## 5. Can Jump

### Question

Write a program that determines if it's possible to "jump" from the first element to the last element of an array of integers. The value of each element represents the maximum jump length from that position.

- The input is provided as a single command-line argument: a string representing an array of non-negative integers (e.g., `"[2,3,1,1,4]"`).
- If it's possible to reach the last element, print `OK`. If not, print `Error`.

### Answer

```go
package main

// ... imports and main function for parsing ...

func canJump(nums []int) bool {
	if len(nums) <= 1 {
		return true
	}

	maxReach := 0
	for i, num := range nums {
		if i > maxReach {
			return false
		}
		if i+num > maxReach {
			maxReach = i + num
		}
		if maxReach >= len(nums)-1 {
			return true
		}
	}
	return false
}
```

### Detailed Code Explanation

This problem can be solved efficiently using a **greedy algorithm**. The core idea is to keep track of the farthest index you can possibly reach at any given moment.

**`canJump` function:**

-   `if len(nums) <= 1`: This handles a simple edge case. If the array has 0 or 1 elements, you are already at the "last" element, so the journey is trivially successful.
-   `maxReach := 0`: We initialize a variable `maxReach`. This will always store the furthest index in the array that we know is reachable from the start. Initially, we can only reach index 0.
-   `for i, num := range nums`: We loop through the array, getting both the index `i` and the value `num` at that index.
-   `if i > maxReach`: This is the most important check. At each position `i`, we first ask: "Is this position even reachable?" If our current index `i` is greater than the `maxReach` we've calculated so far, it means we've hit a gap in the array that we cannot jump over. For example, in `[1, 0, 4]`, `maxReach` will be 1 after the first step. When the loop gets to index `i = 2`, `i` will be greater than `maxReach`, meaning we can't get to index 2. The function returns `false`.
-   `if i+num > maxReach`: If the current position *is* reachable, we calculate how far we could jump *from here*. The furthest we can get from index `i` is `i + num`. If this new potential reach is greater than our current `maxReach`, we update `maxReach`.
-   `if maxReach >= len(nums)-1`: After updating `maxReach`, we check if our farthest reachable point has met or passed the last index of the array (`len(nums)-1`). If it has, we know a path to the end is possible, and we can return `true` immediately without checking the rest of the array.
-   `return false`: If the loop finishes without `maxReach` ever reaching the end, it means we got stuck somewhere. The function returns `false`.

```