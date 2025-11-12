# Checkpoint Solutions: Batch 6

This document contains programming questions, solutions, and explanations for checkpoints 26-30.

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

### Explanation

This program uses three nested loops to generate and print combinations of digits in a specific descending order.

1.  **Outermost Loop (Digit `a`)**: The first loop iterates `a` from 9 down to 2. This represents the first and largest digit in the three-digit combination.
2.  **Middle Loop (Digit `b`)**: The second loop iterates `b` from `a - 1` down to 1. This ensures that `b` is always strictly less than `a`.
3.  **Innermost Loop (Digit `c`)**: The third loop iterates `c` from `b - 1` down to 0. This ensures that `c` is always strictly less than `b`.
4.  **Printing**: Inside the innermost loop, `fmt.Printf("%d%d%d", a, b, c)` prints the three-digit combination.
5.  **Separator**: The condition `if a+b+c != 3` is a clever way to check if the combination is the very last one to be printed (`210`). If it's not the last one, a comma and a space are printed.
6.  **Final Newline**: After the loops complete, a single newline is printed. The descending nature of the loops naturally produces the combinations in descending lexicographical order.

---

## 27. Reverse Concat Alternate

### Question

Write a function `RevConcatAlternate` that takes two slices of integers. It should return a new slice containing the elements of the two input slices, concatenated by alternating between them in reverse order (starting from the last elements of the input slices). If one slice is longer than the other, the remaining elements of the longer slice should be appended at the end of the process.

### Answer

```go
package solution

func RevConcatAlternate(slice1, slice2 []int) []int {
	len1 := len(slice1)
	len2 := len(slice2)
	maxLen := len1
	result := make([]int, 0, len1+len2)

	if len2 > maxLen {
		maxLen = len2
	}

	for i := maxLen; i >= 0; i-- {
		if i < len1 {
			result = append(result, slice1[i])
		}
		if i < len2 {
			result = append(result, slice2[i])
		}
	}

	return result
}
```

### Explanation

This function merges two slices by alternating their elements, starting from the end of each slice.

1.  **Initialization**: It gets the lengths of both slices and determines the `maxLen`. It also initializes a `result` slice with a pre-allocated capacity for efficiency.
2.  **Reverse Iteration**: The core of the function is a `for` loop that iterates backwards, from `maxLen` down to 0. The index `i` here doesn't directly correspond to the result index, but rather the indices of the original slices.
3.  **Conditional Append**:
    - Inside the loop, it checks if the current index `i` is a valid index for `slice1` (`i < len1`). If it is, the element `slice1[i]` is appended to the `result`.
    - It performs the same check for `slice2`. If `i` is a valid index, `slice2[i]` is appended.
4.  **Return**: Because the loop starts from the largest index and moves backwards, it naturally picks elements from the end of the original slices first. The `result` slice is built up in this reversed, alternating order and is returned.

---

## 28. Reverse String Capitalize

### Question

Write a program that takes one or more strings as command-line arguments. For each argument, it should capitalize the last letter of every word and convert all other letters to lowercase. A word is defined as a sequence of alphanumeric characters separated by spaces. The modified string for each argument should be printed on a new line.

### Answer

```go
package main

import (
	"fmt"
	"os"
	"unicode"
)

func main() {
	for _, arg := range os.Args[1:] {
		arg := []rune(arg)
		for j, r := range arg {
			if j+1 == len(arg) || arg[j+1] == ' ' {
				arg[j] = unicode.ToUpper(r)
			} else {
				arg[j] = unicode.ToLower(r)
			}
		}
		fmt.Println(string(arg))
	}
}
```

### Explanation

This program modifies the capitalization of letters within each word of its arguments.

1.  **Argument Loop**: The program iterates through all command-line arguments provided (ignoring the program name itself).
2.  **Rune Conversion**: Each argument string is converted to a slice of runes (`[]rune(arg)`) to correctly handle multi-byte characters.
3.  **Character Loop**: It then iterates through the rune slice, examining each rune `r` at index `j`.
4.  **Capitalization Logic**: The core logic is in the `if` statement. A character is considered the "last letter of a word" if it is the very last character of the string (`j+1 == len(arg)`) OR if the character immediately following it is a space (`arg[j+1] == ' '`).
    - If it's the last letter, it's converted to uppercase using `unicode.ToUpper(r)`.
    - Otherwise, it's converted to lowercase using `unicode.ToLower(r)`.
5.  **Output**: After processing all runes in an argument, the modified rune slice is converted back to a string and printed, followed by a newline.

---

## 29. Roman Numbers

### Question

Write a program that takes a single positive integer (less than 4000) as a command-line argument and converts it to a Roman numeral. The program should also print the calculation used to form the Roman numeral.

- If the input is not a valid number, is 0, or is 4000 or greater, the program should print `ERROR: cannot convert to roman digit`.
- The calculation should show how the Roman numerals are formed, using parentheses for subtractive cases (e.g., `(M-C)` for 900).
- The final Roman numeral should be printed on a new line after the calculation.

Example for input `999`:
`(M-C)+(C-X)+(X-I)`
`CMXCIX`

### Answer

```go
package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type roman struct {
	num        int
	romanDigit string
}

func main() {
	if len(os.Args) == 2 {
		nbr, err := strconv.Atoi(os.Args[1])
		if err != nil || nbr >= 4000 || nbr == 0 {
			fmt.Println("ERROR: cannot convert to roman digit")
			return
		}
		patter := []roman{
			{num: 1000, romanDigit: "M"},
			{num: 900, romanDigit: "CM"},
			{num: 500, romanDigit: "D"},
			{num: 400, romanDigit: "CD"},
			{num: 100, romanDigit: "C"},
			{num: 90, romanDigit: "XC"},
			{num: 50, romanDigit: "L"},
			{num: 40, romanDigit: "XL"},
			{num: 10, romanDigit: "X"},
			{num: 9, romanDigit: "IX"},
			{num: 5, romanDigit: "V"},
			{num: 4, romanDigit: "IV"},
			{num: 1, romanDigit: "I"},
		}
		sumRoman, romandigit := print(nbr, patter)
		fmt.Println(strings.TrimSuffix(sumRoman, "+"))
		fmt.Println(romandigit)
	}
}

func print(nbr int, patter []roman) (string, string) {
	var sumRomanDigit, result string
	for _, v := range patter {
		for nbr >= v.num {
			sumRomanDigit += v.romanDigit + "+"
			result += v.romanDigit
			nbr -= v.num
		}
	}
	sumRomanDigit = formatsum(sumRomanDigit)
	return sumRomanDigit, result
}

func formatsum(a string) string {
	result2 := strings.Split(a, "+")

	for i, v := range result2 {
		if len(v) == 2 {
			result2[i] = fmt.Sprintf("(%s-%s)", string(result2[i][1]), string(result2[i][0]))
		}
	}
	a = strings.Join(result2, "+")
	return a
}
```

### Explanation

This program converts an integer to its Roman numeral representation using a greedy algorithm, and also formats a string showing the calculation.

1.  **Data Structure**: A `roman` struct is defined to pair integer values with their Roman numeral symbols. A slice of these structs, `patter`, is created in descending order of value, including subtractive combinations like 900 (`CM`) and 40 (`XL`).
2.  **Input Validation**: The `main` function validates the command-line argument, ensuring it's a number between 1 and 3999.
3.  **Conversion (`print` function)**:
    - It iterates through the `patter` slice. For each `roman` value `v`, it repeatedly subtracts `v.num` from the input number `nbr` as long as `nbr` is large enough.
    - Each time a subtraction occurs, the corresponding `v.romanDigit` is appended to both the final `result` string and a `sumRomanDigit` string (which also gets a `+` separator).
4.  **Formatting the Sum (`formatsum` function)**:
    - The `sumRomanDigit` string (e.g., `CM+XC+IX+`) is split by `+`.
    - The function iterates through the resulting slice. If an element has a length of 2 (like `CM` or `IX`), it's a subtractive case. It reformats this element into the `(M-C)` format.
    - The parts are then joined back together with `+`.
5.  **Output**: The `main` function prints the formatted sum (with the trailing `+` removed) and the final Roman numeral result on separate lines.

---

## 30. Ro-String

### Question

Write a program that "rotates" a string. The first word is moved to the end of the string, and all other words remain in their original order. Words are separated by spaces. The output should have exactly one space between words, with no leading or trailing spaces.

Example: `"abc   def  ghi"` becomes `"def ghi abc"`

### Answer

```go
package main

import (
	"fmt"
	"os"
	"strings"
)

func deleteExtraSpaces(a []string) []string {
	var res []string
	for _, v := range a {
		if v != "" {
			res = append(res, v)
		}
	}
	return res
}

func main() {
	if len(os.Args) == 2 {
		words := strings.Split(os.Args[1], " ")
		words = deleteExtraSpaces(words)
		if len(words) >= 1 {
			for _, v := range words[1:] {
				fmt.Print(v, " ")
			}
			fmt.Print(words[0])
		}
	}
	fmt.Println()
}
```

### Explanation

This program manipulates words in a string to perform a left rotation.

1.  **Argument Check**: It ensures there is exactly one command-line argument.
2.  **Splitting**: `strings.Split(os.Args[1], " ")` splits the input string into a slice of strings (`words`) using a space as the delimiter. This can result in empty strings if there are multiple spaces together.
3.  **Cleaning**: The `deleteExtraSpaces` helper function is called to filter out any empty strings from the `words` slice, leaving only the actual words.
4.  **Rotation Logic**:
    - It first checks if there is at least one word to avoid errors.
    - It then iterates through the slice starting from the *second* word (`words[1:]`). Each of these words is printed, followed by a space.
    - After the loop, the *first* word (`words[0]`) is printed without a trailing space.
5.  **Output**: A final newline is printed to complete the output. This process effectively takes the first word and moves it to the end while normalizing all spacing.
