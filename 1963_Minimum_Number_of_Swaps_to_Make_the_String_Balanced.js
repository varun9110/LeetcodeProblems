/**
 * 1963. Minimum Number of Swaps to Make the String Balanced
 * Difficulty: Medium
 * 
 * You are given a 0-indexed string s of even length n. The string consists of exactly n / 2 opening brackets '[' and n / 2 closing brackets ']'.

A string is called balanced if and only if:

It is the empty string, or
It can be written as AB, where both A and B are balanced strings, or
It can be written as [C], where C is a balanced string.
You may swap the brackets at any two indices any number of times.

Return the minimum number of swaps to make s balanced.

 

Example 1:

Input: s = "][]["
Output: 1
Explanation: You can make the string balanced by swapping index 0 with index 3.
The resulting string is "[[]]".
Example 2:

Input: s = "]]][[["
Output: 2
Explanation: You can do the following to make the string balanced:
- Swap index 0 with index 4. s = "[]][][".
- Swap index 1 with index 5. s = "[[][]]".
The resulting string is "[[][]]".
Example 3:

Input: s = "[]"
Output: 0
Explanation: The string is already balanced.
 

Constraints:

n == s.length
2 <= n <= 106
n is even.
s[i] is either '[' or ']'.
The number of opening brackets '[' equals n / 2, and the number of closing brackets ']' equals n / 2.
 */

/**
 * Explained Step by Step
We start by initializing a variable stack_size to 0
This variable will keep track of the number of unmatched opening brackets as we iterate through the string.

We then iterate through each character in the input string s:

2.a. If we encounter an opening bracket "[", we increment stack_size by 1 . This is because we've found an opening bracket that hasn't been matched yet.
2.b.. If we encounter a closing bracket "]", we check if stack_size is greater than 0. If it is, it means we have an unmatched opening bracket available, so we can match it with this closing bracket. In this case, we decrement stack_size by 1.
After iterating through the entire string, stack_size will represent the number of unmatched opening brackets.
To calculate the minimum number of swaps needed, we use the formula (stack_size + 1) // 2:
We need to swap half of the unmatched brackets because each swap fixes two brackets (it moves a "[" to the right and a "]" to the left).
We add 1 before dividing by 2 to handle cases where stack_size is odd. This ensures we round up to the nearest integer.
We use integer division (//) to get the final result as an integer.
Thats the the reason this solution works is that it effectively counts the number of mismatched brackets and then calculates how many swaps are needed to fix them.

By keeping track of unmatched opening brackets, so we can determine how many closing brackets are out of place.

...and efficient bcs only one pass through the string and dont need extra space
time: O(n) space: O(1)

Is it understandable? Do you have any suggestions on how I could write this more clearly? Please for contrictive critisis.

Complexity
Time complexity: O(n)

Space complexity: O(1)
 */

/**
 * @param {string} s
 * @return {number}
 */
var minSwaps = function(s) {
    // Initialize a variable to keep track of unmatched opening brackets
    let stackSize = 0;

    // Iterate through each character in the input string
    for (let ch of s) {
        if (ch === '[') {
            // If we encounter an opening bracket, increment the stack size
            stackSize++;
        } else {
            // If we encounter a closing bracket
            if (stackSize > 0) {
                // If there's a matching opening bracket (stackSize > 0),
                // decrement the stack size
                stackSize--;
            }
            // If stackSize is 0, it means we have an unmatched closing bracket,
            // but we don't need to do anything special for this case
        }
    }

    // Calculate the minimum number of swaps needed
    // We need to swap half of the remaining unmatched brackets
    // Use Math.floor to round down the division result after adding 1
    return Math.floor((stackSize + 1) / 2);
};