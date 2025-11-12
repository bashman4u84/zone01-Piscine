# Checkpoint Solutions: Batch 4

This document contains programming questions, solutions, and explanations for checkpoints 16-20.

---

## 16. Fprime

### Question

Write a program that takes a positive integer as a command-line argument and prints its prime factorization, followed by a newline. The factors should be listed in increasing order and separated by asterisks (*). For example, for the input 225, the output should be `3*3*5*5`.

### Answer

```go
package main

import (
	"fmt"
	"os"
	"strconv"
)

func fprime(value int) {
	if value == 1 {
		return
	}
	divisionIterator := 2
	for value > 1 {
		if value%divisionIterator == 0 {
			fmt.Print(divisionIterator)
			value = value / divisionIterator

			if value > 1 {
				fmt.Print("*")
			}
			divisionIterator--
		}
		divisionIterator++
	}
	fmt.Println()
}

func main() {
	if len(os.Args) == 2 {
		if i, err := strconv.Atoi(os.Args[1]); err == nil {
			fprime(i)
		}
	}
}
```

### Explanation

This program calculates and prints the prime factors of a given number.

1.  **Input Handling**: The `main` function checks for a single command-line argument, converts it to an integer, and passes it to the `fprime` function. It ignores invalid inputs.
2.  **Core Logic**: The `fprime` function finds the prime factors.
    - It initializes a `divisionIterator` to 2, the first prime number.
    - The main loop continues as long as the `value` is greater than 1.
    - Inside the loop, it checks if the current `divisionIterator` is a factor of `value` (`value % divisionIterator == 0`).
    - **Factor Found**: If it is a factor, the iterator is printed. The `value` is then divided by the factor. An asterisk is printed if the new `value` is still greater than 1. Crucially, `divisionIterator` is then decremented. This seems counterintuitive, but it's immediately incremented again after the `if` block, so its net effect is to re-check the same factor again (e.g., to find both 3s in 9).
    - **No Factor Found**: If the iterator is not a factor, it's simply incremented to check the next number.
3.  **Output**: The factors are printed sequentially, separated by asterisks, and a final newline is printed after the loop completes.

---

## 17. From To

### Question

Write a function `FromTo` that takes two integers, `from` and `to`. It should return a string containing a sequence of numbers. If `from < to`, it's an increasing sequence. If `from > to`, it's a decreasing sequence. If `from == to`, it's just the number. All numbers in the sequence must be padded with a leading zero if they are less than 10. The numbers are separated by ", ". If any input is outside the range [0, 99], it should return "Invalid\n".

### Answer

```go
package solution

import "strconv"

func FromTo(from, to int) string {
	result := ""

	if from > 99 || from < 0 || to > 99 || to < 0 {
		return "Invalid\n"
	} else if from == to {
		return strconv.Itoa(from) + "\n"
	}
	if from > to {
		for i := from; i >= to; i-- {
			if i < 10 {
				result += "0"
			}
			result += strconv.Itoa(i)
			if i-1 >= to {
				result += ", "
			}
		}
		return result + "\n"
	}
	for i := from; i <= to; i++ {
		if i < 10 {
			result += "0"
		}
		result += strconv.Itoa(i)
		if i+1 <= to {
			result += ", "
		}
	}
	return result + "\n"
}
```

### Explanation

This function generates a formatted string of numbers representing a range.

1.  **Validation**: It first checks if `from` or `to` are outside the valid range of 0 to 99. If so, it returns "Invalid\n". It also handles the simple case where `from` and `to` are equal.
2.  **Decreasing Sequence**: If `from > to`, it enters a loop that decrements from `from` down to `to`.
    - **Padding**: Inside the loop, if a number `i` is less than 10, a "0" is prepended.
    - **Concatenation**: The number (converted to a string) is appended to the `result`. A ", " separator is added if it's not the last number in the sequence.
3.  **Increasing Sequence**: If `from < to`, it enters a similar loop that increments from `from` up to `to`, applying the same padding and concatenation logic.
4.  **Return**: Finally, a newline character is appended to the `result`, and the full string is returned.

---

## 18. Grouping

### Question

Write a program that performs a simple search. It takes two arguments: a regular expression-like string and a text string. The expression is enclosed in parentheses, e.g., `(word1|word2)`. The program should find all words in the text that contain any of the sub-expressions (separated by `|`). The output should be a numbered list of the matching words, one per line. Punctuation at the end of a matching word should be stripped.

### Answer

```go
package main

import (
	"fmt"
	"os"
	"strings"
	"unicode"
)

func singleSearch(exp []string, text string) []string {
	items := strings.Split(text, " ")
	var result []string

	for _, item := range items {
		for _, word := range exp {
			if strings.Contains(item, word) {
				result = append(result, item)
			}
		}
	}
	return result
}

func simpleSearch(runes []rune, text string) []string {
	exp := string(runes)

	var result []string
	if !strings.ContainsRune(exp, '|') {
		helper := []string{exp}
		result = append(result, singleSearch(helper, text))
	} else {
		expWords := strings.Split(exp, "|")
		result = append(result, singleSearch(expWords, text)...)
	}
	return result
}

func brackets(regexp, text string) {
	if text == "" || regexp == "" {
		return
	}
	runes := []rune(regexp)

	if runes[0] == '(' && runes[len(runes)-1] == ')' {
		runes = runes[1 : len(runes)-1]
		result := simpleSearch(runes, text)
		for i, s := range result {
			if !unicode.IsLetter(rune(s[len(s)-1])) {
				s = s[0 : len(s)-1]
			}
			fmt.Printf("%d: %s\n", i+1, s)
		}
	}
}

func main() {
	if len(os.Args) == 3 {
		brackets(os.Args[1], os.Args[2])
	}
}
```

### Explanation

This program implements a text search based on a custom expression.

1.  **Main & Brackets**: The `main` function passes the two command-line arguments to the `brackets` function. `brackets` validates that the expression is wrapped in parentheses `()` and extracts the content within them.
2.  **Simple Search**: The `simpleSearch` function takes the expression content. It checks for a pipe character `|`.
    - If no pipe exists, the expression is treated as a single search term.
    - If a pipe exists, the expression is split by the pipe into multiple search terms.
3.  **Single Search**: The `singleSearch` function performs the actual search. It splits the input `text` into words. It then iterates through each word of the text and checks if it contains any of the search terms provided in the `exp` slice. If a match is found, the word from the text is added to the results.
4.  **Output Formatting**: Back in `brackets`, the program iterates through the list of matching words. It checks if the last character of the word is a letter using `unicode.IsLetter`. If it's not (i.e., it's punctuation), the last character is stripped off. Finally, it prints the numbered, cleaned result.

---

## 19. HiddenP

### Question

Write a program that takes two strings, `s1` and `s2`, as command-line arguments. It should determine if `s1` is 'hidden' within `s2`. A string `s1` is hidden in `s2` if all the characters of `s1` can be found in `s2` in the same order, though not necessarily consecutively. If `s1` is hidden in `s2`, the program should print `1`; otherwise, it should print `0`.

### Answer

```go
package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	var i int
	for _, r := range os.Args[1] {
		j := strings.Index(os.Args[2][i:], string(r))
		if j == -1 {
			fmt.Println("0")
			return
		}
		i += j + 1
	}
	fmt.Println("1")
}
```

### Explanation

This program checks if one string is an ordered subsequence of another.

1.  **Argument Assumption**: The program assumes it will receive two arguments, `os.Args[1]` (s1) and `os.Args[2]` (s2).
2.  **Iteration**: It iterates through each character `r` of the first string, `s1`.
3.  **Search Logic**: A variable `i` tracks the current search position in the second string, `s2`.
    - Inside the loop, `strings.Index(os.Args[2][i:], string(r))` searches for the character `r` within the *remainder* of `s2`, starting from index `i`.
    - **Not Found**: If the character is not found (`j == -1`), it means `s1` cannot be hidden in `s2`. The program prints `0` and exits immediately.
    - **Found**: If the character is found at index `j` (relative to the substring), the main search position `i` is updated. It's advanced by `j + 1` to ensure the next search for the next character of `s1` begins *after* the current character's location in `s2`.
4.  **Success**: If the loop completes, it means every character of `s1` was found in `s2` in the correct order. The program prints `1`.

---

## 20. Inter

### Question

Write a program that takes two strings as command-line arguments. The program should find the characters that are common to both strings and print them, without duplicates, in the order they appear in the first string.

### Answer

```go
package main

import (
	"fmt"
	"os"
	"strings"
)

func result(s1 string, s2 string) string {
	var rest []rune
	for _, a := range s1 {
		for _, b := range s2 {
			if a == b && !strings.ContainsRune(string(rest), a) {
				rest = append(rest, a)
			}
		}
	}
	return string(rest)
}

func main() {
	if len(os.Args) == 3 {
		fmt.Println(result(os.Args[1], os.Args[2]))
	}
}
```

### Explanation

This program finds the intersection of two strings, preserving the order of the first string and ensuring uniqueness.

1.  **Argument Check**: The `main` function ensures two arguments are passed and sends them to the `result` function.
2.  **Core Logic**: The `result` function calculates the intersection.
    - It initializes an empty rune slice `rest` to store the unique, common characters.
    - It iterates through each character `a` of the first string, `s1`. This preserves the order.
    - For each character `a`, it iterates through each character `b` of the second string, `s2`.
    - **Condition Check**: It checks for two conditions:
        1.  The characters must be equal (`a == b`).
        2.  The character `a` must not already be in our `rest` slice. This is checked using `!strings.ContainsRune(string(rest), a)`.
    - **Append**: If both conditions are true, the character `a` is appended to `rest`.
3.  **Return**: After all characters are checked, the `rest` slice is converted back to a string and returned.

```