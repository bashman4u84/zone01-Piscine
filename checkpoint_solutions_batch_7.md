# Checkpoint Solutions: Batch 7 (Corrected)

This document contains programming questions, solutions, and ultra-detailed, beginner-friendly explanations of the **correct code from the solution files** for checkpoints 31-35.

---

## 31. RPN Calculator

### Question

Write a program that evaluates an expression written in Reverse Polish Notation (RPN). The expression will be given as a single command-line argument, with numbers and operators separated by spaces.

- The program should handle the following operators: `+`, `-`, `*`, `/`, `%`.
- It must handle negative numbers.
- If the expression is invalid or if there is not exactly one argument, the program should print `Error`.

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
		case "%":
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

### Detailed Code Explanation

#### Core Concepts for This Solution

*   **Reverse Polish Notation (RPN)**: A mathematical notation where operators follow their operands. For example, `3 4 +` is the same as `3 + 4`. It is easily evaluated with a stack.
*   **Stack**: A data structure that follows a "Last-In, First-Out" (LIFO) principle. We can implement a stack in Go using a slice. `append` is used to "push" an item onto the stack, and slicing (`slice[:n-1]`) is used to "pop" an item off.
*   **`strings.Split`**: A function that breaks a string into a slice of substrings based on a separator.
*   **`strconv.Atoi`**: A function that converts a string to an integer. It returns an error if the string is not a valid number.

---

#### Code Walkthrough

This program evaluates an RPN expression by processing tokens (numbers and operators) one by one and using a slice as a stack.

**Line-by-Line Explanation**

`if len(os.Args) != 2 { ... }`
-   **What it is:** Input validation.
-   **What it does:** Checks for exactly one command-line argument. If not present, prints "Error" and exits.
-   **Why it's here:** To ensure the program has an expression to evaluate.

`var values []int`
-   **What it is:** A slice declaration.
-   **What it does:** Creates an empty integer slice named `values`.
-   **Why it's here:** This slice will be used as our stack to hold numbers (operands).

`op := strings.Split(os.Args[1], " ")`
-   **What it is:** A function call to split the input string.
-   **What it does:** It takes the user's expression string and splits it into a slice of strings (`op`) using a space as the delimiter.
-   **Why it's here:** To get a list of all the numbers and operators (tokens) in the expression.

`op = deleteExtraSpaces(op)`
-   **What it is:** A call to a helper function (defined elsewhere in the code) to clean the token list.
-   **What it does:** It removes any empty strings from the `op` slice that might have been created by multiple spaces in the input.
-   **Why it's here:** To ensure we only process valid tokens.

`for _, v := range op { ... }`
-   **What it is:** A `for` loop to iterate over the tokens.
-   **What it does:** It loops through each token `v` in our cleaned-up `op` slice.
-   **Why it's here:** This is the main loop that drives the calculator's logic.

`val, err := strconv.Atoi(v)`
-   **What it is:** A string-to-integer conversion attempt.
-   **What it does:** It tries to convert the current token `v` into an integer.
-   **Why it's here:** To determine if the token is a number or an operator.

`if err == nil { ... }`
-   **What it is:** An `if` statement that checks if the conversion was successful.
-   **What it does:** If `err` is `nil`, it means `Atoi` worked and the token is a number.
    -   `values = append(values, val)`: The number `val` is "pushed" onto our stack.
    -   `continue`: This keyword skips the rest of the loop and moves to the next token.
-   **Why it's here:** This is the logic for handling numbers: simply add them to the stack and wait for an operator.

`n := len(values)`
-   **What it is:** A variable assignment.
-   **What it does:** If the token was *not* a number, this line is reached. It gets the current size of our stack.
-   **Why it's here:** We need to know if we have enough numbers on the stack to perform an operation.

`if n < 2 { ... }`
-   **What it is:** An `if` statement for error checking.
-   **What it does:** If we encounter an operator but have fewer than two numbers on the stack, the expression is invalid. It prints "Error" and exits.
-   **Why it's here:** To handle malformed expressions like `"1 +"`.

`switch v { ... }`
-   **What it is:** A `switch` statement to handle the different operators.
-   **What it does:** It checks the value of the token `v`.
    -   `case "+":`: If the token is a `+`, it adds the top two numbers on the stack. `values[n-2] += values[n-1]` takes the last two values, adds them, and stores the result in the second-to-last position.
    -   `values = values[:n-1]`: After the operation, the last element is no longer needed, so the stack is "popped" by re-slicing it to be one element shorter.
    -   The other cases (`-`, `*`, `/`, `%`) work identically.
    -   `default:`: If the token is not a number and not a recognized operator, it's an error.
-   **Why it's here:** This is where the actual calculations happen based on the operator token.

`if len(values) == 1 { ... }`
-   **What it is:** An `if` statement checking the final state of the stack.
-   **What it does:** After the loop has processed all tokens, it checks if there is exactly one value left on the stack.
-   **Why it's here:** A correctly formed RPN expression will always result in a single number. If there are more, the expression was incomplete (e.g., `"1 2 3"`). If there are zero, something went wrong. This prints the final result or an error.

---
*(The other checkpoints in this file will follow the same ultra-detailed format for their actual solution code.)*