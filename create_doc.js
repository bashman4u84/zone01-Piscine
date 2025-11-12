const docx = require("docx");
const fs = require("fs");

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  ShadingType,
} = docx;

// --- Data for the Document ---
const checkpoints = [
  {
    title: "1. Add Prime Sum",
    question:
      "Write a program that takes a single command-line argument representing a positive integer. The program should calculate and print the sum of all prime numbers from 2 up to and including the given number.\n\n- If the input is not a valid positive integer, or if the number of arguments is not exactly one, the program should print `0` followed by a newline.\n- You can assume the input number will fit within an `int`.",
    answer: `package main

import (
	"os"

	"github.com/01-edu/z01"
)

func main() {
	if len(os.Args) != 2 {
		z01.PrintRune('0')
		z01.PrintRune('\\n')
		return
	}

	arg := os.Args[1]
	num, err := Atoi(arg)
	if err != nil || num <= 0 {
		z01.PrintRune('0')
		z01.PrintRune('\\n')
		return
	}

	sum := 0
	for i := 2; i <= num; i++ {
		if isPrime(i) {
			sum += i
		}
	}
	PrintNbr(sum)
	z01.PrintRune('\\n')
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
			return 0, os.ErrInvalid
		}
		res = res*10 + int(c-'0')
	}
	return res * sign, nil
}

func PrintNbr(n int) {
	if n < 0 {
		z01.PrintRune('-')
		n = -n
	}
	if n/10 != 0 {
		PrintNbr(n / 10)
	}
	z01.PrintRune(rune(n%10 + '0'))
}`,
    explanation: `The program is designed to sum prime numbers up to a specified limit given as a command-line argument.

1.  **Argument Handling**: The \`main\` function first checks if exactly one argument (in addition to the program name) is provided. If not, it prints \`0\` and exits.
2.  **Input Parsing**: It uses a custom \`Atoi\` function to convert the string argument to an integer. If the conversion fails or the number is not positive, it also prints \`0\` and exits.
3.  **Prime Summation**: The code iterates from 2 up to the input number \`num\`. In each iteration, it calls the \`isPrime\` function.
4.  **Primality Test**: The \`isPrime\` function checks for primality. It returns \`false\` for numbers less than or equal to 1. It then iterates from 2 up to the square root of the number (\`i*i <= n\`). If any number in this range divides the input \`n\` evenly, \`n\` is not prime, and the function returns \`false\`. If the loop completes without finding a divisor, the number is prime.
5.  **Output**: If a number is determined to be prime, it's added to the \`sum\`. Finally, the total \`sum\` is printed to the console using a custom \`PrintNbr\` function that handles integer-to-character conversion.`,
  },
  {
    title: "2. Atoi",
    question:
      "Write a function `Atoi` that converts a string of digits into an integer.\n\n- The function should handle both positive and negative numbers, which are indicated by a `+` or `-` sign at the very beginning of the string.\n- If the string contains any characters that are not digits (outside of the optional leading sign), the function should return `0`.\n- For this exercise, you can assume the number will fit within the `int` type.",
    answer: `package main

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
}`,
    explanation: `This function replicates the basic functionality of the standard library's \`Atoi\` (ASCII to Integer).

1.  **Initialization**: It initializes the result \`res\` to \`0\` and the \`sign\` to \`1\` (for positive numbers).
2.  **Iteration**: The function iterates over each character \`c\` of the input string \`s\`.
3.  **Sign Handling**: For the first character (\`i == 0\`), it checks for a \`+\` or \`-\` sign. If a \`-\` is found, the \`sign\` is changed to \`-1\`. The \`continue\` statement then skips to the next character.
4.  **Validation**: For all other characters, it checks if the character is a digit (\`'0'\` to \`'9'\`). If a non-digit character is found, the function immediately returns \`0\` as per the requirements.
5.  **Conversion**: If the character is a digit, it's converted to its integer value using \`int(c - '0')\`. This works because character codes for digits are sequential. The value is then added to the \`res\` after multiplying \`res\` by 10 to shift the existing digits one place to the left.
6.  **Final Result**: After the loop, the final \`res\` is multiplied by \`sign\` to apply the negative sign if one was present, and the result is returned.`,
  },
  {
    title: "3. Brackets",
    question:
      "Write a program that takes one or more strings as command-line arguments. For each argument, the program must determine if the brackets `()`, `[]`, and `{}` are balanced and correctly nested.\n\n- If the brackets in a string are balanced, the program should print `OK` followed by a newline.\n- If they are not balanced, it should print `Error` followed by a newline.\n- If no arguments are provided, the program should just print a newline.\n- Characters that are not brackets should be ignored.",
    answer: `package main

import (
	"os"

	"github.com/01-edu/z01"
)

func main() {
	if len(os.Args) == 1 {
		z01.PrintRune('\\n')
		return
	}

	args := os.Args[1:]
	for _, arg := range args {
		if isBalanced(arg) {
			printStr("OK\\n")
		} else {
			printStr("Error\\n")
		}
	}
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

func printStr(s string) {
	for _, r := range s {
		z01.PrintRune(r)
	}
}`,
    explanation: `This program uses a classic stack-based approach to validate balanced brackets.

1.  **Argument Handling**: The \`main\` function iterates through each command-line argument provided. If no arguments are given, it simply prints a newline.
2.  **Balancing Logic**: The \`isBalanced\` function is the core of the solution. It uses a \`slice\` of runes (\`[]rune\`) named \`stack\` to keep track of opening brackets.
3.  **Processing Characters**: It iterates through each character of the input string.
    - **Opening Brackets**: When an opening bracket (\`(\`, \`[\`, or \`{\`) is encountered, it is "pushed" onto the stack (appended to the slice).
    - **Closing Brackets**: When a closing bracket (\`)\`, \`]\`, or \`}\`) is found, the function checks two conditions:
        1.  Is the stack empty? If so, there's no matching opening bracket, so the string is unbalanced.
        2.  Does the bracket at the top of the stack match the current closing bracket? (e.g., \`)\` must match \`(\`). If not, the nesting is incorrect, and the string is unbalanced.
    - If both conditions are met, the matching opening bracket is "popped" from the stack (by slicing the slice to exclude the last element).
4.  **Final Check**: After all characters have been processed, the function checks if the stack is empty. If it is, all opening brackets have been matched and closed correctly. If the stack is not empty, it means there are unmatched opening brackets. The function returns \`true\` if the stack is empty, and \`false\` otherwise.`,
  },
  {
    title: "4. Camel to Snake Case",
    question:
      "Write a program `cameltosnakecase` that converts a string from `camelCase` to `snake_case`.\n\n- The program should take a single string as a command-line argument.\n- The conversion rule is to insert an underscore `_` before each uppercase letter and convert that letter to lowercase.\n- If the program is run with zero or more than one argument, it should do nothing.",
    answer: `package main

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
	z01.PrintRune('\\n')
}`,
    explanation: `This program performs a straightforward character-by-character conversion from camelCase to snake_case.

1.  **Argument Check**: The \`main\` function first ensures that exactly one command-line argument is provided. If not, it exits immediately.
2.  **Iteration**: It iterates through the input string, examining each character \`r\` and its index \`i\`.
3.  **Uppercase Detection**: Inside the loop, it checks if a character is an uppercase letter (\`r >= 'A' && r <= 'Z'\`).
4.  **Conversion Logic**:
    - If an uppercase letter is found and it's not the first character of the string (\`i > 0\`), an underscore \`_\` is appended to the \`result\` slice first.
    - The uppercase letter is then converted to lowercase by adding the difference between \`'a'\` and \`'A'\` to its character code (\`r - 'A' + 'a'\`). This lowercase letter is appended to the \`result\`.
    - If the character is not an uppercase letter, it is appended to the \`result\` slice unchanged.
5.  **Output**: After the entire string is processed, the program iterates through the \`result\` rune slice and prints each character, followed by a final newline.`,
  },
  {
    title: "5. Can Jump",
    question:
      "Write a program that determines if it's possible to \"jump\" from the first element to the last element of an array of integers. The value of each element represents the maximum jump length from that position.\n\n- The input is provided as a single command-line argument: a string representing an array of non-negative integers (e.g., `\"[2,3,1,1,4]\"`).\n- If it's possible to reach the last element, the program should print `OK`.\n- If it's not possible, it should print `Error`.\n- If the input is invalid (e.g., not a valid array string, contains negative numbers, or wrong number of arguments), the program should print `Error`.",
    answer: `package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Println("Error")
		return
	}

	numsStr := os.Args[1]
	numsStr = strings.Trim(numsStr, "[]")
	if numsStr == "" {
		fmt.Println("OK") // Empty or single-element array is a success case
		return
	}

	parts := strings.Split(numsStr, ",")
	nums := make([]int, 0, len(parts))
	for _, part := range parts {
		num, err := strconv.Atoi(strings.TrimSpace(part))
		if err != nil || num < 0 {
			fmt.Println("Error")
			return
		}
		nums = append(nums, num)
	}

	if canJump(nums) {
		fmt.Println("OK")
	} else {
		fmt.Println("Error")
	}
}

func canJump(nums []int) bool {
	if len(nums) <= 1 {
		return true
	}

	maxReach := 0
	for i, num := range nums {
		if i > maxReach {
			return false // Current position is unreachable
		}
		if i+num > maxReach {
			maxReach = i + num
		}
		if maxReach >= len(nums)-1 {
			return true // Destination is reachable
		}
	}
	return false
}`,
    explanation: `This program implements a greedy algorithm to solve the "Jump Game" problem.

1.  **Input Parsing**: The \`main\` function first validates the command-line arguments. It then parses the input string: it removes the \`[]\` brackets, splits the string by commas, and converts each part into an integer. It performs error checking at each step; if the input is malformed or contains negative numbers, it prints \`Error\` and exits. An empty or single-element array is considered a success.
2.  **Greedy Algorithm**: The \`canJump\` function implements the core logic. It uses a variable \`maxReach\` to keep track of the farthest index that can be reached from the start.
3.  **Iteration and Logic**:
    - The function iterates through the \`nums\` array with both the index \`i\` and the value \`num\`.
    - **Unreachability Check**: In each step, it first checks if the current index \`i\` is greater than \`maxReach\`. If it is, it means the current position is impossible to get to, so we can't proceed. The function returns \`false\`.
    - **Update Max Reach**: It calculates the potential new farthest reach from the current position (\`i + num\`) and updates \`maxReach\` if this new reach is greater than the current \`maxReach\`.
    - **Goal Check**: It then checks if \`maxReach\` is greater than or equal to the last index of the array (\`len(nums) - 1\`). If it is, it means the end is reachable, and the function can return \`true\` immediately.
4.  **Final Result**: If the loop completes without \`maxReach\` ever reaching the last index, it means the end is unreachable, and the function returns \`false\`. The \`main\` function prints \`OK\` or \`Error\` based on the boolean result.`,
  },
];

// --- Document Styling ---
const styles = {
  font: "Calibri",
  codeFont: "Courier New",
  titleColor: "2E74B5",
  headingColor: "2E74B5",
  codeBlockShade: "F2F2F2",
};

// --- Helper Functions for Creating Document Components ---

// Creates a styled code block paragraph
function createCodeBlock(text) {
  return new Paragraph({
    shading: {
      type: ShadingType.CLEAR,
      fill: styles.codeBlockShade,
    },
    children: [
      new TextRun({
        text: text,
        font: {
          name: styles.codeFont,
        },
        size: 20, // 10pt
      }),
    ],
    spacing: {
      before: 200,
      after: 200,
    },
    indent: {
        left: 400,
    }
  });
}

// Creates a paragraph with multiple text runs from a string that may contain `...`
function createParagraphWithCode(text) {
    const parts = text.split(/(`[^`]+`)/g); // Split by text in backticks
    const children = parts.map(part => {
        if (part.startsWith('`') && part.endsWith('`')) {
            return new TextRun({
                text: part.slice(1, -1),
                font: { name: styles.codeFont },
                shading: { type: ShadingType.CLEAR, fill: styles.codeBlockShade },
            });
        }
        return new TextRun(part);
    });

    return new Paragraph({
        children: children,
        spacing: { after: 100 },
    });
}


// --- Main Document Generation Logic ---
function generateDoc() {
  const docChildren = [
    new Paragraph({
      text: "Checkpoint Solutions: Batch 1",
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
    }),
  ];

  checkpoints.forEach((checkpoint) => {
    // Main heading for the checkpoint
    docChildren.push(
      new Paragraph({
        text: checkpoint.title,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );

    // Question section
    docChildren.push(
      new Paragraph({
        text: "Question",
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 100 },
      })
    );
    checkpoint.question.split('\n').forEach(line => {
        docChildren.push(createParagraphWithCode(line));
    });


    // Answer section (Code Block)
    docChildren.push(
      new Paragraph({
        text: "Answer",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );
    docChildren.push(createCodeBlock(checkpoint.answer));

    // Explanation section
    docChildren.push(
      new Paragraph({
        text: "Explanation",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      })
    );
    checkpoint.explanation.split('\n').forEach(line => {
        docChildren.push(createParagraphWithCode(line));
    });
  });

  const doc = new Document({
    sections: [
      {
        children: docChildren,
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("checkpoint_solutions_batch_1.docx", buffer);
    console.log("Successfully created checkpoint_solutions_batch_1.docx");
  });
}

generateDoc();