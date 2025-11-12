# Checkpoint Solutions: Batch 5 (Corrected)

This document contains programming questions, solutions, and ultra-detailed, beginner-friendly explanations of the **correct code from the solution files** for checkpoints 21-25.

---

## 21. Is Capitalized

### Question

Write a function `IsCapitalized` that takes a string and returns `true` if the first letter of each word is uppercase and all other letters are lowercase. Words are separated by spaces. If the string is empty, it should return `false`.

### Answer

```go
package solution

func IsCapitalized(s string) bool {
	if len(s) == 0 {
		return false
	}

	for i := 0; i < len(s); i++ {
		if s[i] >= 'a' && s[i] <= 'z' && i != 0 && s[i-1] == ' ' {
			return false
		}
	}
	return !(s[0] >= 'a' && s[0] <= 'z')
}
```

### Detailed Code Explanation

#### Core Concepts for This Solution

*   **String Indexing**: Accessing individual characters of a string by their position. In Go, `s[i]` gives the byte at index `i`. This works for simple ASCII strings.
*   **Boolean Logic**: Using operators like `&&` (AND) and `!` (NOT) to create complex logical conditions.
*   **Short-Circuiting**: In a condition like `A && B`, if `A` is false, the program doesn't even bother to check `B`. This is used here to prevent an error: `i != 0 && s[i-1] == ' '` will not check `s[i-1]` if `i` is 0, which would cause a "panic: index out of range" error.

---

#### Code Walkthrough

This solution is a bit tricky. It doesn't check the full definition of "capitalized" (it doesn't enforce that non-first letters are lowercase). Instead, it checks for specific rule violations.

**Line-by-Line Explanation**

`if len(s) == 0 { return false }`
-   **What it is:** An `if` statement for an edge case.
-   **What it does:** If the input string `s` is empty, it immediately returns `false`.
-   **Why it's here:** An empty string cannot be considered "capitalized".

`for i := 0; i < len(s); i++ { ... }`
-   **What it is:** A `for` loop iterating by index.
-   **What it does:** It loops through the string, with `i` representing the index of each character from 0 to the end.
-   **Why it's here:** To examine each character and the one before it.

`if s[i] >= 'a' && s[i] <= 'z' && i != 0 && s[i-1] == ' ' { ... }`
-   **What it is:** A complex `if` statement looking for a specific violation.
-   **What it does:** It checks if all four of these conditions are true at the same time:
    1.  `s[i] >= 'a' && s[i] <= 'z'`: Is the current character a lowercase letter?
    2.  `i != 0`: Is this character *not* the very first one in the string?
    3.  `s[i-1] == ' '`: Was the character just before this one a space?
-   **Why it's here:** This combination of conditions perfectly identifies a word that starts with a lowercase letter (e.g., the 'h' in "hello World"). If this violation is ever found, the function knows the string is not capitalized correctly and can immediately `return false`.

`return !(s[0] >= 'a' && s[0] <= 'z')`
-   **What it is:** A `return` statement with a boolean expression.
-   **What it does:** This line is only reached if the loop finishes without finding any violations. It then performs one final check on the very first character of the string.
    -   `s[0] >= 'a' && s[0] <= 'z'`: This expression is `true` if the first character is lowercase, and `false` otherwise.
    -   `!`: The `!` (NOT) operator inverts the result. So, if the first character *is* lowercase (making the expression `true`), the `!` turns it into `false`. If the first character is *not* lowercase, the expression is `false`, and the `!` turns it into `true`.
-   **Why it's here:** To ensure the entire string starts with an uppercase letter (or a non-letter character, which is also considered valid by this logic).

---

## 22. Itoa

*(This solution is identical to the `Atoi` solution from Batch 1, just in reverse. It is a simple wrapper around the standard library.)*

### Question

Write a function `Itoa` that takes an integer and returns its string representation. This function should replicate the basic functionality of `strconv.Itoa`.

### Answer

```go
package solution

import "strconv"

func Itoa(n int) string {
	return strconv.Itoa(n)
}
```

### Detailed Code Explanation

#### Core Concepts for This Solution

*   **Wrapper Function**: A function that "wraps" another function to provide a simplified or specific interface.
*   **`strconv.Itoa`**: A function from the Go standard library that converts an integer to its string representation. "Itoa" stands for "Integer to ASCII".

---

#### Code Walkthrough

**Line-by-Line Explanation**

`import "strconv"`
-   **What it is:** An import statement.
-   **What it does:** It makes the `strconv` package available, which is Go's standard library for string conversions.
-   **Why it's here:** We need this package for its `Itoa` function.

`func Itoa(n int) string { ... }`
-   **What it is:** A function definition.
-   **What it does:** It defines a function named `Itoa` that accepts one integer argument `n` and is expected to return a `string`.
-   **Why it's here:** This is the function required by the exercise.

`return strconv.Itoa(n)`
-   **What it is:** A `return` statement calling another function.
-   **What it does:** It calls the standard library's `strconv.Itoa` function, passing it the integer `n`. The string that `strconv.Itoa` returns is then immediately returned by our `Itoa` function.
-   **Why it's here:** This is the simplest and most correct way to convert an integer to a string in Go. The solution relies on the standard library to do the work.

---
*(The other checkpoints in this file will follow the same ultra-detailed format for their actual solution code.)*