# Checkpoint Solutions: Batch 3 (Corrected)

This document contains programming questions, solutions, and ultra-detailed, beginner-friendly explanations of the **correct code from the solution files** for checkpoints 11-15.

---

## 11. Count Alpha

### Question

Write a function `CountAlpha` that takes a string and returns the total number of alphabetic characters (both uppercase and lowercase) it contains.

### Answer

```go
package solution

func CountAlpha(s string) int {
	count := 0
	for _, c := range s {
		if c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' {
			count++
		}
	}
	return count
}
```

### Detailed Code Explanation

#### Core Concepts for This Solution

*   **Variable Initialization**: Creating a variable and giving it a starting value, like `count := 0`.
*   **`for...range` loop**: A loop structure for iterating over elements in a collection like a string.
*   **Conditional Logic (`if`)**: Running code only if a certain condition is true.
*   **Boolean Operator `||` ("OR")**: Used to combine two conditions. The entire expression is true if *at least one* of the conditions is true.
*   **Increment Operator `++`**: A shorthand way to add 1 to a variable (`count++` is the same as `count = count + 1`).

---

#### Code Walkthrough

This function counts the number of alphabetic characters in a string, ignoring numbers, spaces, and symbols.

**Line-by-Line Explanation**

`count := 0`
-   **What it is:** A variable declaration and initialization.
-   **What it does:** It creates a new integer variable named `count` and sets its initial value to 0.
-   **Why it's here:** This variable will act as our counter. We'll add to it every time we find a letter.

`for _, c := range s { ... }`
-   **What it is:** A `for...range` loop.
-   **What it does:** It iterates over the input string `s`, one character at a time. In each iteration, the character is assigned to the variable `c`. The `_` is used to ignore the character's index, which we don't need.
-   **Why it's here:** To examine each character of the string individually.

`if c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' { ... }`
-   **What it is:** An `if` statement with a compound condition.
-   **What it does:** This is the core logic. It checks if the character `c` is within one of two ranges:
    1.  `c >= 'a' && c <= 'z'`: Is it a lowercase letter?
    2.  `c >= 'A' && c <= 'Z'`: Is it an uppercase letter?
    The `||` (OR) means the whole condition is true if the character is in *either* of these ranges.
-   **Why it's here:** To specifically identify if the character is an alphabet character, regardless of its case.

`count++`
-   **What it is:** An increment statement.
-   **What it does:** It adds 1 to the value of the `count` variable.
-   **Why it's here:** This line only runs if the `if` statement was true, meaning we've found a letter. This is how we keep a running total.

`return count`
-   **What it is:** A `return` statement.
-   **What it does:** After the loop has finished checking every character, this line returns the final value of `count`.
-   **Why it's here:** To provide the final answer after the calculation is complete.

---

## 12. Expand String

### Question

Write a program that takes a string as a command-line argument. The string will contain words separated by one or more spaces. The program should expand the string by replacing the space(s) between words with exactly three spaces. There should be no leading or trailing spaces in the output.

### Answer

```go
package main

import (
	"fmt"
	"os"
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
	if len(os.Args) == 2 {
		arg := strings.Split(os.Args[1], " ")
		arg = deleteExtraSpaces(arg)
		fmt.Println(strings.Join(arg, "   "))
	}
}
```

### Detailed Code Explanation

#### Core Concepts for This Solution

*   **`strings.Split`**: A function from the `strings` package that splits a string into a slice of substrings based on a separator.
*   **`strings.Join`**: A function from the `strings` package that joins the elements of a slice of strings into a single string, inserting a separator between elements.
*   **Helper Function**: A function created to perform a specific sub-task to keep the main logic clean. `deleteExtraSpaces` is a helper function.

---

#### Function-by-Function Breakdown

##### `deleteExtraSpaces` function

This function's job is to clean up a slice of strings by removing any empty strings.

**Line-by-Line Explanation**

`func deleteExtraSpaces(a []string) (res []string) { ... }`
-   **What it is:** A function definition with a "named return value".
-   **What it does:** It defines a function that takes a slice of strings `a`. By putting `(res []string)` in the signature, it pre-declares the return variable `res`.
-   **Why it's here:** To create a reusable piece of logic for cleaning the slice.

`for _, v := range a { ... }`
-   **What it is:** A `for...range` loop.
-   **What it does:** It iterates over each string `v` in the input slice `a`.
-   **Why it's here:** To examine each element of the slice.

`if v != "" { res = append(res, v) }`
-   **What it is:** An `if` statement that appends to a slice.
-   **What it does:** It checks if the current string `v` is not empty. If it's a real word (not an empty string), it's appended to the `res` slice.
-   **Why it's here:** This is the filtering logic. It ensures that only actual words are kept.

`return`
-   **What it is:** A `return` statement.
-   **What it does:** Because `res` was named in the function signature, a bare `return` automatically returns the current value of `res`.
-   **Why it's here:** To send the cleaned slice back.

##### `main` function

This function controls the program's flow: it gets the input, uses helper functions to process it, and prints the result.

**Line-by-Line Explanation**

`if len(os.Args) == 2 { ... }`
-   **What it is:** An `if` statement checking for the correct number of arguments.
-   **What it does:** Ensures the program only runs if there is exactly one user-provided argument.
-   **Why it's here:** Basic input validation.

`arg := strings.Split(os.Args[1], " ")`
-   **What it is:** A function call and variable assignment.
-   **What it does:** It takes the user's input string and splits it into a slice of strings wherever it finds a space " ". If there are multiple spaces together, this will create empty strings in the slice (e.g., `"a  b"` becomes `["a", "", "b"]`). The result is stored in `arg`.
-   **Why it's here:** To break the input sentence into individual words or word-like elements.

`arg = deleteExtraSpaces(arg)`
-   **What it is:** A function call that re-assigns a variable.
-   **What it does:** It sends the potentially messy slice `arg` to our helper function `deleteExtraSpaces` and replaces the old slice with the new, cleaned-up slice that is returned.
-   **Why it's here:** To get rid of the empty strings created by the `Split` function.

`fmt.Println(strings.Join(arg, "   "))`
-   **What it is:** A function call inside another function call.
-   **What it does:**
    1.  `strings.Join(arg, "   ")`: It takes the clean slice of words `arg` and joins them back into a single string, but this time it uses three spaces `"   "` as the separator.
    2.  `fmt.Println(...)`: It prints the resulting single string to the console.
-   **Why it's here:** To produce the final output in the desired format.

---
*(The other checkpoints in this file will follow the same ultra-detailed format for their actual solution code.)*
