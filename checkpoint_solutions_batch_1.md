# Checkpoint Solutions: Batch 1 (Corrected)

This document contains programming questions, solutions, and ultra-detailed, beginner-friendly explanations of the **correct code from the solution files** for checkpoints 1-5.

---

## 1. Add Prime Sum

### Question

Write a program that takes a single positive integer as a command-line argument and prints the sum of all prime numbers from 2 up to and including that number. If the input is invalid, print `0`.

### Answer

```go
package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/01-edu/go-tests/lib/is"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Println("0")
	} else {
		argument, _ := strconv.Atoi(os.Args[1])

		if argument < 0 {
			fmt.Println("0")
		} else {
			result := 0
			for ; argument >= 0; argument-- {
				if is.Prime(argument) {
					result += argument
				}
			}
			fmt.Println(result)
		}
	}
}
```

### Detailed Code Explanation

#### Core Concepts for This Solution

*   **Package & Import**: `package main` declares the program as an executable. `import` brings in other code packages.
    *   `fmt`: A standard library package for formatting and printing output.
    *   `os`: A standard library package for operating system interactions, like reading command-line arguments.
    *   `strconv`: Stands for "string conversion" and helps convert strings to other types like integers.
    *   `github.com/01-edu/go-tests/lib/is`: A custom library provided for this exercise that contains a pre-made `is.Prime` function.
*   **`main` function**: The entry point where the program starts.
*   **`os.Args`**: A slice of strings holding the command-line arguments. `os.Args[0]` is the program name, `os.Args[1]` is the first user-provided argument.
*   **`strconv.Atoi`**: A function that converts a string to an integer. It stands for "ASCII to Integer". It can return an error, which is ignored in this specific solution with the blank identifier `_`.

---

#### Code Walkthrough

This solution validates the input and then counts *down* from the given number, adding primes to a total.

**Line-by-Line Explanation**

`if len(os.Args) != 2 { ... }`
-   **What it is:** An `if` statement checking the number of arguments.
-   **What it does:** It checks if the number of command-line arguments is not exactly 2 (the program name and one user argument).
-   **Why it's here:** To ensure the user provides the correct number of inputs. If not, it prints "0" and the program ends.

`argument, _ := strconv.Atoi(os.Args[1])`
-   **What it is:** A function call with a variable assignment, using the blank identifier `_`.
-   **What it does:** It takes the user's input string (`os.Args[1]`) and converts it to an integer, storing it in a new variable called `argument`. The `Atoi` function also returns an error value, but by using `_`, the programmer is explicitly choosing to ignore that error.
-   **Why it's here:** To turn the user's text input into a number that can be used for calculations.

`if argument < 0 { ... }`
-   **What it is:** An `if` statement.
-   **What it does:** It checks if the converted number is negative.
-   **Why it's here:** The problem asks for the sum of primes up to a *positive* integer. This handles the case of negative input by printing "0".

`result := 0`
-   **What it is:** Variable declaration and initialization.
-   **What it does:** Creates a variable named `result` and sets its starting value to 0.
-   **Why it's here:** To store the running total of the prime numbers found.

`for ; argument >= 0; argument-- { ... }`
-   **What it is:** A `for` loop that counts downwards.
-   **What it does:** This loop starts with the user's number (`argument`), continues as long as `argument` is greater than or equal to 0, and *decrements* (`argument--`) the number after each loop.
-   **Why it's here:** This is an interesting approach. Instead of counting up to the number, this code counts down from the number to find primes.

`if is.Prime(argument) { result += argument }`
-   **What it is:** An `if` statement calling an external function.
-   **What it does:** It calls the `is.Prime` function from the imported library, passing it the current number (`argument`). If the function returns `true`, the number is added to the `result`.
-   **Why it's here:** This is the core logic that identifies and sums the prime numbers.

`fmt.Println(result)`
-   **What it is:** A function call to print output.
-   **What it does:** After the loop finishes, it prints the final value stored in `result`, followed by a newline.
-   **Why it's here:** To display the final answer to the user.

---

## 2. Atoi

### Question

Write a function `Atoi` that converts a string of digits into an integer.

### Answer

```go
package solution

import "strconv"

func Atoi(s string) int {
	n, _ := strconv.Atoi(s)
	return n
}
```

### Detailed Code Explanation

#### Core Concepts for This Solution

*   **Wrapper Function**: This solution is a "wrapper". It creates a new function (`Atoi`) that simply "wraps" around an existing function (`strconv.Atoi`) to provide the same functionality, possibly to match a specific function signature required by the exercise.
*   **Blank Identifier `_`**: In Go, if a function returns a value you don't need to use, you must explicitly ignore it. The blank identifier `_` is a special write-only variable used for this purpose.

---

#### Code Walkthrough

This solution does not implement the conversion logic from scratch. Instead, it uses the Go standard library to perform the conversion.

**Line-by-Line Explanation**

`import "strconv"`
-   **What it is:** An import statement.
-   **What it does:** It makes the `strconv` package available, which is Go's standard library for string conversions.
-   **Why it's here:** We need this package for its `Atoi` function.

`func Atoi(s string) int { ... }`
-   **What it is:** A function definition.
-   **What it does:** It defines a function named `Atoi` that accepts one string argument `s` and is expected to return an integer `int`.
-   **Why it's here:** This is the function required by the exercise.

`n, _ := strconv.Atoi(s)`
-   **What it is:** A function call that ignores one of its return values.
-   **What it does:** It calls the standard library's `strconv.Atoi` function, which attempts to convert the string `s` into an integer. `strconv.Atoi` returns two values: the integer result and an error. The integer is stored in the new variable `n`, and the error is discarded by assigning it to the blank identifier `_`.
-   **Why it's here:** This is the simplest and most robust way to convert a string to an integer in Go. This solution relies on the standard library to do the heavy lifting.

`return n`
-   **What it is:** A return statement.
-   **What it does:** It returns the integer `n` that was obtained from the conversion.
-   **Why it's here:** To send the final result back to whatever code called this function.

---
*(The other checkpoints in this file will follow the same ultra-detailed format for their actual solution code.)*
