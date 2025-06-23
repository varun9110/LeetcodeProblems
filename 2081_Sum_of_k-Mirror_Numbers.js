/**
 * 2081. Sum of k-Mirror Numbers
 * Difficulty: Hard
 * 
 * A k-mirror number is a positive integer without leading zeros that reads the same both forward and backward in base-10 as well as in base-k.

For example, 9 is a 2-mirror number. The representation of 9 in base-10 and base-2 are 9 and 1001 respectively, which read the same both forward and backward.
On the contrary, 4 is not a 2-mirror number. The representation of 4 in base-2 is 100, which does not read the same both forward and backward.
Given the base k and the number n, return the sum of the n smallest k-mirror numbers.


Example 1:
Input: k = 2, n = 5
Output: 25
Explanation:
The 5 smallest 2-mirror numbers and their representations in base-2 are listed as follows:
  base-10    base-2
    1          1
    3          11
    5          101
    7          111
    9          1001
Their sum = 1 + 3 + 5 + 7 + 9 = 25. 
Example 2:
Input: k = 3, n = 7
Output: 499
Explanation:
The 7 smallest 3-mirror numbers are and their representations in base-3 are listed as follows:
  base-10    base-3
    1          1
    2          2
    4          11
    8          22
    121        11111
    151        12121
    212        21212
Their sum = 1 + 2 + 4 + 8 + 121 + 151 + 212 = 499.
Example 3
Input: k = 7, n = 17
Output: 20379000
Explanation: The 17 smallest 7-mirror numbers are:
1, 2, 3, 4, 5, 6, 8, 121, 171, 242, 292, 16561, 65656, 2137312, 4602064, 6597956, 6958596
 
Constraints:
2 <= k <= 9
1 <= n <= 30
 */

/**
 * Key Concepts
Palindrome Generation:
createPalindrome generates both even-length (odd=false) and odd-length (odd=true) palindromes from a seed number.
Base Conversion Check:
isPalindrome converts a number to another base and checks if it's a palindrome.
Iterative Search:
kMirror searches for numbers that are palindromic in both base 10 and base k.
Step-by-Step Example
Input: k = 2 (binary), n = 3 (find 3 such numbers)

Step 1: Initialize
sum = 0, len = 1 (start with 1-digit seeds)
Step 2: Generate Odd-Length Palindromes
Seed i = 1:

createPalindrome(1, true):
Start with num = 1 → x = 1 / 10 = 0 (no reversal needed)
Result: 1 (palindrome "1" in base 10 and base 2: "1")
Check: isPalindrome(1, 2) → true
Update: sum = 1, n = 2
Seed i = 2:

createPalindrome(2, true) → 2 (binary "10" → not a palindrome)
Skipped.
Step 3: Generate Even-Length Palindromes
Seed i = 1:

createPalindrome(1, false):
num = 1, x = 1 → reverse x and append: 1 * 10 + 1 % 10 = 11
Result: 11 (base 10: "11", base 2: "1011" → not a palindrome)
Skipped.
Seed i = 2:

createPalindrome(2, false) → 22 (binary "10110" → not a palindrome)
Skipped.
Step 4: Increase Seed Length (len = 10)
Odd-Length Seeds (i = 10 to 99):

Seed i = 10:

createPalindrome(10, true):
num = 10 → x = 1 → append reversed x: 10 * 10 + 1 = 101
Result: 101 (base 10: "101", base 2: "1100101" → palindrome!)
Update: sum = 1 + 101 = 102, n = 1
Seed i = 11:

createPalindrome(11, true) → 111 (binary "1101111" → not a palindrome)
Skipped.
Even-Length Seeds (i = 10 to 99):

Seed i = 10:
createPalindrome(10, false) → 1001 (binary "1111101001" → not a palindrome)
Skipped.
Step 5: Terminate (Found n = 3 Numbers)
Final Numbers: [1, 101, ...] (continues until n reaches 0)
Output: sum = 102 (sum of first 2 numbers; third would be added similarly).
Visualization
Palindrome Generation (Seed = 10, Odd-Length)
Step 1: num = 10, x = 1 (after division)
Step 2: Append reversed x:
   num = 10 * 10 + 1 = 101
Result: 101 (base 10 and base 2 palindromes)
Base Conversion Check (101 in Base 2)
101 → Binary:
  101 ÷ 2 = 50 R1 → '1'
   50 ÷ 2 = 25 R0 → '0'
   25 ÷ 2 = 12 R1 → '1'
    12 ÷ 2 = 6 R0 → '0'
     6 ÷ 2 = 3 R0 → '0'
     3 ÷ 2 = 1 R1 → '1'
     1 ÷ 2 = 0 R1 → '1'
Binary: '1100101' (reads the same forwards/backwards)
Algorithm Summary
Generate Palindromes:
For each seed length (1-digit, 2-digits, etc.):
Create odd/even-length palindromes in base 10.
Check Base k:
Convert the palindrome to base k and verify if it remains a palindrome.
Sum Valid Numbers:
Add valid numbers to the sum until n numbers are found.
Complexity
Time: O(n * d), where d is the average number of digits in the palindromes.
Space: O(1) (no extra storage beyond variables).
 */

/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
const isPalindrome = (s) => { let n = s.length; let i = 0; let j = n - 1; while (i < j) { if (s[i++] != s[j--]) return false; } return true; };

const int = parseInt;
const kMirror = (k, n) => {
    let res = 0;
    for (let len = 1; ; len++) {
        let min = 10 ** ((len - 1) >> 1), max = 10 ** ((len + 1) >> 1);
        for (let base = min; base < max; base++) {
            let x = base;
            for (let i = len & 1 ? int(base / 10) : base; i > 0; i = int(i / 10)) {
                x = x * 10 + i % 10;
            }
            let s = x.toString(k);
            if (isPalindrome(s)) {
                res += x;
                n--;
                if (!n) return res;
            }
        }
    }
};