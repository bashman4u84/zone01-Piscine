# Checkpoint Solutions: Batch 5

This document contains programming questions, solutions, and explanations for checkpoints 21-25.

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

### Explanation

This function checks if a string follows a specific capitalization rule for words.

1.  **Empty String Check**: It first checks if the string is empty. If so, it returns `false` as per the implied requirement that a capitalized string must have content.
2.  **Word Start Check**: The function iterates through the string. The core logic is `if s[i] >= 'a' && s[i] <= 'z' && i != 0 && s[i-1] == ' '`. This checks if a character is a lowercase letter (`s[i] >= 'a' && s[i] <= 'z'`) AND it is the start of a new word (the previous character was a space, `s[i-1] == ' '`). If this condition is ever met, it means a word starts with a lowercase letter, so the function immediately returns `false`.
3.  **First Character Check**: After the loop, if no invalid word starts were found, it performs one final check: `!(s[0] >= 'a' && s[0] <= 'z')`. This ensures the very first character of the entire string is not a lowercase letter.
4.  **Return**: If all checks pass, the string is considered capitalized correctly, and the function returns `true`. Note: This logic is not a perfect test for capitalization as it doesn't enforce that other letters in a word must be lowercase, but it passes the specific tests for this problem.

---

## 22. Itoa

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

### Explanation

This function provides a simple wrapper around the standard library\'s `Itoa` function.

1.  **Import**: It imports the `strconv` package, which contains string conversion utilities.
2.  **Function Call**: The function takes an integer `n` and directly calls `strconv.Itoa(n)`.
3.  **Return Value**: It returns the string result from the standard library function. `Itoa` is shorthand for "Integer to ASCII".

---

## 23. Itoa Base

### Question

Write a function `ItoaBase` that takes an integer `value` and a `base` (from 2 to 16). It should return the string representation of the `value` in the given `base`. The returned string should use uppercase letters for digits greater than 9 (e.g., 'A' for 10, 'B' for 11, etc.). If the base is invalid, return an empty string.

### Answer

```go
package solution

import (
	"strconv"
	"strings"
)

func ItoaBase(value, base int) string {
	if base < 2 || base > 16 {
		return ""
	}

	return strings.ToUpper(strconv.FormatInt(int64(value), base))
}
```

### Explanation

This function converts an integer to a string representation in a specified numerical base, leveraging the standard library.

1.  **Base Validation**: It first checks if the provided `base` is within the valid range of 2 to 16. If not, it returns an empty string.
2.  **Conversion**: It uses `strconv.FormatInt(int64(value), base)`. This powerful function from the `strconv` package converts an `int64` number to a string in the given base. The input `value` is first cast to `int64`.
3.  **Uppercase**: The problem requires uppercase letters for bases greater than 10 (e.g., hexadecimal). `strconv.FormatInt` produces lowercase letters by default (e.g., 'a', 'b', 'c'). The function wraps the result in `strings.ToUpper()` to convert the entire string to uppercase, satisfying the requirement.
4.  **Return**: The final, uppercase string is returned.

---

## 24. Not Decimal

### Question

Write a function `NotDecimal` that takes a string representing a floating-point number (e.g., `"1.234"`). The function should return a string representing the integer part of the number after the decimal point. For example, if the input is `"1.234"`, the output should be `"234"`. If the input has no decimal part or is not a valid float, the behavior may vary, but the primary goal is to extract the digits after the decimal.

### Answer

```go
package solution

import (
	"math"
	"strconv"
)

func NotDecimal(dec string) string {
	j := -1
	n := 0
	if len(dec) == 0 {
		return "\n"
	}
	for i := 0; i < len(dec); i++ {
		if j == -1 && dec[i] == '.' {
			j++
		} else if j == 0 {
			n++
		}
	}
	s, err := strconv.ParseFloat(dec, 64)
	if err == nil {
		return strconv.Itoa(int(s*math.Pow(10, float64(n)))) + "\n"
	}
	return (dec + "\n")
}
```

### Explanation

This function attempts to extract the decimal part of a number string and represent it as an integer string. The logic is somewhat complex.

1.  **Initialization**: It initializes `j` to -1 (a state flag) and `n` to 0 (a counter for decimal places).
2.  **Counting Decimal Places**: It iterates through the input string `dec`.
    - When it first encounters a decimal point `.`, it sets `j` to 0.
    - For all characters after the decimal point has been found (`j == 0`), it increments `n`. This loop effectively counts the number of digits after the decimal point.
3.  **Conversion**:
    - It uses `strconv.ParseFloat` to convert the entire string into a `float64` number `s`.
    - If the conversion is successful (`err == nil`), it calculates `s * math.Pow(10, float64(n))`. This operation effectively shifts the decimal point to the right by `n` places. For example, `1.234 * 10^3 = 1234`.
    - The result is cast to an `int`, effectively truncating any remaining fractional part, and then converted back to a string.
4.  **Return**: The resulting integer string (representing the decimal part) is returned, followed by a newline.

---

## 25. Print Memory

### Question

Write a function `PrintMemory` that takes a byte array of size 10, `[10]byte`, and prints its memory representation. The output should be formatted as follows:
1. The hexadecimal representation of the bytes, printed 4 bytes per line, separated by spaces.
2. After the hex output, a newline should be printed, followed by a string representation of the bytes. For this string, any non-printable characters should be replaced with a dot ('.').

### Answer

```go
package solution

import (
	"fmt"
	"strings"
)

func PrintMemory(a [10]byte) {
	str := ""
	for i, nbr := range a {
		fmt.Printf("%.2x", nbr)

		if ((i+1)%4 == 0 && i != 0) || i == len(a)-1 {
			fmt.Println()
		} else {
			fmt.Print(" ")
		}

		if nbr >= 33 && nbr <= 126 {
			str += string(rune(nbr))
		} else {
			str += "."
		}
	}
	fmt.Println(str + strings.Repeat(".", 10-len(a)))
}
```

### Explanation

This function displays the content of a 10-byte array in a hex-dump-like format.

1.  **Initialization**: An empty string `str` is created to build the character representation of the memory content.
2.  **Iteration**: The function iterates through the byte array `a` using both the index `i` and the value `nbr`.
3.  **Hex Output**:
    - `fmt.Printf("%.2x", nbr)` prints the byte as a two-digit, lowercase hexadecimal number.
    - The following `if` condition handles line breaks. A newline is printed after every 4th byte (`(i+1)%4 == 0`) and also at the very end of the array (`i == len(a)-1`). Otherwise, a space is printed.
4.  **Character Representation**:
    - Inside the same loop, the function checks if the byte `nbr` falls within the printable ASCII range (33 to 126).
    - If it is printable, the character is appended to the `str`.
    - If it is not printable, a dot `.` is appended instead.
5.  **Final String Output**: After the loop, `fmt.Println(str + strings.Repeat(".", 10-len(a)))` prints the final character string. The `strings.Repeat` part seems intended to pad the string with dots if the input array were smaller than 10, but since the input is fixed at `[10]byte`, this part of the code doesn't have a practical effect.
