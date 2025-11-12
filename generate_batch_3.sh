#!/bin/bash

# Use a 'here document' to safely write the entire JavaScript file,
# preventing any unexpected modifications.
cat << 'EOF' > create_doc_batch_3.js
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
        title: "11. Count Alpha",
        question: "Write a function `CountAlpha` that takes a string and returns the total number of alphabetic characters (both uppercase and lowercase) it contains.",
        answer: `package solution

func CountAlpha(s string) int {
	count := 0
	for _, c := range s {
		if c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' {
			count++
		}
	}
	return count
}`,
        explanation: `This function counts the number of letters in a given string.

1.  **Initialization**: A variable \`count\` is initialized to 0.
2.  **Iteration**: The function loops through each character \`c\` in the input string \`s\`.
3.  **Alphabetic Check**: Inside the loop, it checks if the character is a lowercase letter (\`c >= 'a' && c <= 'z'\`) OR an uppercase letter (\`c >= 'A' && c <= 'Z'\`).
4.  **Increment**: If the character is alphabetic, the \`count\` is incremented.
5.  **Return Value**: After checking all characters, the total \`count\` is returned.`
    },
    {
        title: "12. Expand String",
        question: "Write a program that takes a string as a command-line argument. The string will contain words separated by one or more spaces. The program should expand the string by replacing the space(s) between words with exactly three spaces. There should be no leading or trailing spaces in the output.",
        answer: `package main

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
}`,
        explanation: `This program reformats the spacing between words in a string.

1.  **Argument Check**: The \`main\` function first checks for a single command-line argument.
2.  **Splitting**: \`strings.Split(os.Args[1], " ")\` splits the input string into a slice of strings, using a single space as the delimiter. This might create empty strings in the slice if there are multiple spaces together.
3.  **Cleaning**: The \`deleteExtraSpaces\` helper function iterates through the slice and creates a new slice containing only the non-empty elements. This effectively removes all extra spacing and gets just the words.
4.  **Joining**: \`strings.Join(arg, "   ")\` joins the elements of the cleaned slice back into a single string, but this time, it uses three spaces as the separator between each element.
5.  **Output**: The final, expanded string is printed to the console.`
    },
    {
        title: "13. Fifth and Skip",
        question: "Write a function \`FifthAndSkip\` that takes a string. It should first remove all spaces from the string. If the resulting string has fewer than 5 characters, it should return \"Invalid Input\\n\". Otherwise, it should process the string, inserting a space after every 5th character. The function should return the modified string followed by a newline.",
        answer: `package solution

import "strings"

func FifthAndSkip(str string) string {
	if str == "" {
		return "\n"
	}
	if len(str) < 5 {
		return "Invalid Input\n"
	}
	s := strings.ReplaceAll(str, " ", "")
	var _str strings.Builder
	j := 0
	for _, char := range s {
		if j == 5 {
			_str.WriteRune(rune(' '))
			j = 0
		} else {
			_str.WriteRune(rune(char))
			j++
		}
	}
	_str.WriteRune('\n')
	return _str.String()
}`,
        explanation: `This function reformats a string by inserting spaces at fixed intervals.

1.  **Edge Cases**: It first handles edge cases: if the input string is empty, it returns a newline. If it's shorter than 5 characters, it returns "Invalid Input\n".
2.  **Remove Spaces**: \`strings.ReplaceAll(str, " ", "")\` is used to create a new string \`s\` with all space characters removed.
3.  **String Builder**: A \`strings.Builder\` (\`_str\`) is used for efficient string construction, which is better than repeated string concatenation.
4.  **Iteration and Logic**: The code iterates through the space-free string \`s\`. A counter \`j\` tracks the characters written since the last space.
    - When \`j\` reaches 5, it means 5 characters have been written. A space is added to the builder, and the counter \`j\` is reset to 0.
    - Otherwise, the current character is written to the builder, and \`j\` is incremented.
5.  **Final Output**: After the loop, a newline character is added, and the final string is returned from the builder.`
    },
    {
        title: "14. Find Pairs",
        question: "Write a program that finds all pairs of numbers in an array that sum up to a specific target value. The program receives two command-line arguments: a string representation of an integer array (e.g., \`\"[-1, 2, -3, 4, -5]\"\") and a target sum (e.g., \`\"1\"\").\n\nThe program should print the indices of the pairs that sum to the target. If no pairs are found, it should print \"No pairs found.\". The program must also handle various invalid inputs (malformed array, non-integer values, wrong number of arguments) by printing a relevant error message.",
        answer: `package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func findPairs(arr []int, targetSum int) [][]int {
	var pairs [][]int
	for i := 0; i < len(arr); i++ {
		for j := i + 1; j < len(arr); j++ {
			if arr[i]+arr[j] == targetSum {
				pairs = append(pairs, []int{i, j})
			}
		}
	}
	return pairs
}

func isValidArrayFormat(s string) bool {
	s = strings.TrimSpace(s)
	if len(s) < 2 || s[0] != '[' || s[len(s)-1] != ']'{ 
		return false
	}
	return true
}

func main() {
	if len(os.Args) != 3 {
		fmt.Println("Invalid input.")
		return
	}

	arrayStr := os.Args[1]
	targetStr := os.Args[2]

	if !isValidArrayFormat(arrayStr) {
		fmt.Println("Invalid input.")
		return
	}

	arrayStr = strings.Trim(arrayStr, "[]")
	strNums := strings.Split(arrayStr, ",")
	var arr []int
	for _, strNum := range strNums {
		s := strings.TrimSpace(strNum)
		num, err := strconv.Atoi(s)
		if err != nil {
			fmt.Printf("Invalid number: %s\n", s)
			return
		}
		arr = append(arr, num)
	}

	targetSum, err := strconv.Atoi(targetStr)
	if err != nil {
		fmt.Println("Invalid target sum.")
		return
	}

	pairs := findPairs(arr, targetSum)
	if len(pairs) > 0 {
		fmt.Printf("Pairs with sum %d: %v\n", targetSum, pairs)
	} else {
		fmt.Println("No pairs found.")
	}
}`,
        explanation: `This program is a robust solution for finding pairs in an array that sum to a target, with extensive input validation.

1.  **Core Logic**: The \`findPairs\` function contains the main algorithm. It uses a nested loop to check every possible pair of numbers in the array. The outer loop runs from index \`i = 0\` to the end, and the inner loop runs from \`j = i + 1\` to the end, ensuring each pair is only checked once. If \`arr[i] + arr[j]\` equals the \`targetSum\`, the pair of indices \`[i, j]\` is added to the results.
2.  **Input Validation**: The \`main\` function is responsible for parsing and validating the command-line arguments.
    - It checks for the correct number of arguments (2).
    - The \`isValidArrayFormat\` helper function checks if the array string starts with \`[\` and ends with \`]\`.
    - It parses the array string by trimming brackets, splitting by commas, and then converting each substring to an integer with \`strconv.Atoi\`. It prints specific errors for invalid numbers.
    - It parses the target sum string, printing an error if it's not a valid integer.
3.  **Output**: After parsing, it calls \`findPairs\` and prints the result in the required format, distinguishing between cases where pairs are found and where they are not.`
    },
    {
        title: "15. Find Previous Prime",
        question: "Write a function \`FindPrevPrime\` that takes an integer and returns the greatest prime number that is less than or equal to it. If there are no prime numbers less than or equal to the input, it should return 0.",
        answer: `package solution

import "github.com/01-edu/go-tests/lib/is"

func FindPrevPrime(nb int) int {
	if nb < 2 {
		return 0
	}
	if is.Prime(nb) {
		return nb
	}
	return FindPrevPrime(nb - 1)
}`,
        explanation: `This function finds the nearest prime number less than or equal to the input number using recursion.

1.  **Base Case**: The function first checks if the input number \`nb\` is less than 2. Since 2 is the smallest prime number, any input less than 2 cannot have a preceding prime, so it returns 0.
2.  **Primality Check**: It then uses an external helper function, \`is.Prime(nb)\`, to check if the current number is prime. If it is, the number itself is the answer, and it is returned.
3.  **Recursive Step**: If the number is not prime, the function calls itself (\`FindPrevPrime(nb - 1)\`) with the next smallest integer. This process repeats, decrementing the number by 1 at each step until a prime number is found or the base case (\`nb < 2\`) is reached.`
    }
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

// Creates a paragraph with multiple text runs from a string that may contain \`...\`
function createParagraphWithCode(text) {
    const parts = text.split(/(\`[^`]+\`)/g); // Split by text in backticks
    const children = parts.map(part => {
        if (part.startsWith('\`') && part.endsWith('\`')) {
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
      text: "Checkpoint Solutions: Batch 3",
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
    fs.writeFileSync("checkpoint_solutions_batch_3.docx", buffer);
    console.log("Successfully created checkpoint_solutions_batch_3.docx");
  });
}

generateDoc();
EOF

# Make the script executable and run it
chmod +x create_doc_batch_3.js
node create_doc_batch_3.js
