# Checkpoint Solutions: Batch 6 (Corrected)

This document contains programming questions, solutions, and ultra-detailed, beginner-friendly explanations of the **correct code from the solution files** for checkpoints 26-30.

---

## 26. Print Reverse Comb

### Question

Write a program that prints all unique combinations of three different digits in descending order. The output should be a comma-separated list.

- The combinations should be of three digits (e.g., `210`, `431`).
- The digits within a combination must be in strictly descending order (e.g., `210` is valid, but `120` or `201` are not).
- The combinations themselves should be printed in descending lexicographical order.

Example output: `... 321, 320, 310, 210`

### Answer

```go
package main

import "fmt"

func main() {
	for a := 9; a >= 2; a-- {
		for b := a - 1; b >= 1; b-- {
			for c := b - 1; c >= 0; c-- {
				fmt.Printf("%d%d%d", a, b, c)
				if a+b+c != 3 {
					fmt.Print(", ")
				}
			}
		}
	}
	fmt.Println()
}
```

### Detailed Code Explanation

#### Core Concepts for This Solution

*   **Nested Loops**: Placing one loop inside another. This is a common technique for generating combinations of values.
*   **`for` loop (decrementing)**: A `for` loop can count down as well as up. The syntax `for a := 9; a >= 2; a--` initializes `a` at 9, continues as long as `a` is greater than or equal to 2, and decrements `a` by one after each iteration.
*   **`fmt.Printf`**: A function that prints formatted strings. The `%d` verb is a placeholder for a decimal integer. `fmt.Printf("%d%d%d", a, b, c)` will print the three numbers right next to each other without spaces.

---

#### Code Walkthrough

This program is a clever use of nested loops to generate a very specific, ordered set of number combinations.

**Line-by-Line Explanation**

`for a := 9; a >= 2; a-- { ... }`
-   **What it is:** The outermost `for` loop.
-   **What it does:** It controls the first digit of the three-digit combination. It starts `a` at 9 and counts down to 2.
-   **Why it's here:** By starting at the highest possible digit (9) and counting down, it ensures that the combinations are generated in descending lexicographical order (e.g., all the "9xx" combinations will be generated before the "8xx" combinations).

`for b := a - 1; b >= 1; b-- { ... }`
-   **What it is:** The middle `for` loop, nested inside the first.
-   **What it does:** It controls the second digit. It always starts `b` at one less than the current value of `a` (`a - 1`) and counts down.
-   **Why it's here:** This enforces the rule that the second digit must be strictly smaller than the first digit.

`for c := b - 1; c >= 0; c-- { ... }`
-   **What it is:** The innermost `for` loop.
-   **What it does:** It controls the third digit. It always starts `c` at one less than the current value of `b` (`b - 1`) and counts down.
-   **Why it's here:** This enforces the rule that the third digit must be strictly smaller than the second digit. Together, these three loops guarantee that every combination generated has digits in strictly descending order (a > b > c).

`fmt.Printf("%d%d%d", a, b, c)`
-   **What it is:** A formatted print statement.
-   **What it does:** It prints the current values of `a`, `b`, and `c` right next to each other, forming the three-digit number on the console.
-   **Why it's here:** To display the valid combination that the loops have generated.

`if a+b+c != 3 { fmt.Print(", ") }`
-   **What it is:** An `if` statement to handle the separator.
-   **What it does:** It checks if the sum of the three digits is not equal to 3. If it's not, it prints a comma and a space.
-   **Why it's here:** This is a clever trick to avoid printing a comma after the very last number. The loops are structured such that the very last combination they will possibly generate is `210`. The sum of `2 + 1 + 0` is 3. For every other combination, the sum will be different, so the comma is printed.

`fmt.Println()`
-   **What it is:** A print statement.
-   **What it does:** After all the loops have completed, this prints a single newline character.
-   **Why it's here:** To ensure the command prompt or any subsequent output appears on a new line after the program finishes.

---
*(The other checkpoints in this file will follow the same ultra-detailed format for their actual solution code.)*