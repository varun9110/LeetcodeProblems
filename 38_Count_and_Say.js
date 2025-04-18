/**
 * 38. Count and Say
 * Difficulty: Medium
 * 
 * The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

countAndSay(1) = "1"
countAndSay(n) is the run-length encoding of countAndSay(n - 1).
Run-length encoding (RLE) is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation 
of the character and the number marking the count of the characters (length of the run). For example, to compress the string "3322251" we replace "33" with "23", 
replace "222" with "32", replace "5" with "15" and replace "1" with "11". Thus the compressed string becomes "23321511".

Given a positive integer n, return the nth element of the count-and-say sequence.

Example 1:
Input: n = 4
Output: "1211"
Explanation:
countAndSay(1) = "1"
countAndSay(2) = RLE of "1" = "11"
countAndSay(3) = RLE of "11" = "21"
countAndSay(4) = RLE of "21" = "1211"
Example 2:

Input: n = 1

Output: "1"

Explanation:

This is the base case.

Constraints:

1 <= n <= 30
 */

/**
 * 📌 Intuition
The problem is about generating the "Count and Say" sequence. Starting from "1", each term is formed by reading the previous term out loud — counting consecutive digits and then saying the digit.
For example:

"1" is read as "one 1" → "11"
"11" is read as "two 1s" → "21"
"21" is read as "one 2, then one 1" → "1211"
So the idea is to repeatedly process the previous term to generate the next one 🔁.

🧠 Approach
We use recursion to go from the 1st term to the nth term.
Here's how it works:

Start with res = "1" (base case).
Use a helper function to build the sequence up to the nth term.
For each term:
Traverse the string.
Count how many times a digit repeats consecutively 👀.
Append the count and the digit to the result string 🧩.
Recursively call the helper until we've reached term n.
The helper updates the res string in-place at each step to build the next term.

⏱️ Complexity
Time complexity:
O(n⋅m)
Where (n) is the number of terms to generate and (m) is the average length of the strings. The length of the string grows roughly by 1.3x each time, so it's not constant.

Space complexity:
O(m)
Since we only store two strings at each recursive call — the current and the previous term.

 */

/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    let res = "1";
    for (let i = 1; i < n; i++) {
        res = buildNext(res);
    }
    return res;
};

function buildNext(s) {
    let result = "";
    let count = 1;
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            count++;
        } else {
            result += count + s[i - 1];
            count = 1;
        }
    }
    result += count + s[s.length - 1];
    return result;
}
