/**
 * 2381. Shifting Letters II
 * Difficulty: Medium
 * 
 * You are given a string s of lowercase English letters and a 2D integer array shifts where shifts[i] = [starti, endi, directioni]. 
 * For every i, shift the characters in s from the index starti to the index endi (inclusive) forward if directioni = 1, 
 * or shift the characters backward if directioni = 0.

Shifting a character forward means replacing it with the next letter in the alphabet (wrapping around so that 'z' becomes 'a'). 
Similarly, shifting a character backward means replacing it with the previous letter in the alphabet (wrapping around so that 'a' becomes 'z').

Return the final string after all such shifts to s are applied.

 

Example 1:

Input: s = "abc", shifts = [[0,1,0],[1,2,1],[0,2,1]]
Output: "ace"
Explanation: Firstly, shift the characters from index 0 to index 1 backward. Now s = "zac".
Secondly, shift the characters from index 1 to index 2 forward. Now s = "zbd".
Finally, shift the characters from index 0 to index 2 forward. Now s = "ace".
Example 2:

Input: s = "dztz", shifts = [[0,0,0],[1,1,1]]
Output: "catz"
Explanation: Firstly, shift the characters from index 0 to index 0 backward. Now s = "cztz".
Finally, shift the characters from index 1 to index 1 forward. Now s = "catz".
 

Constraints:

1 <= s.length, shifts.length <= 5 * 104
shifts[i].length == 3
0 <= starti <= endi < s.length
0 <= directioni <= 1
s consists of lowercase English letters.
 */

/**
 * Problem Understanding and Intuition
The problem asks us to perform shifts on a string, where each shift operation modifies the letters in a specified range. The challenge is to compute the final result after applying all shifts efficiently.

🔑 Key Insight:
Instead of applying shifts directly for each operation, we can use a difference array technique, which will allow us to perform all operations in an optimal time complexity.

Chanel for video solution https://www.youtube.com/@Mr.Destroy-0
🛠️ Approach
🔄 Difference Array:
We use an auxiliary array (difference array) to efficiently manage range update operations. Instead of updating all elements within a range directly, we mark the starting and ending points of the range and use a prefix sum to process the updates later.

Steps for Range Update:
1. Marking the Start (L) of the Range:
If the direction of the shift is right (increment), we mark the start of the range by:
Diff[L] += 1
If the direction is left (decrement), we mark it as:
Diff[L] -= 1
2. Marking the End (R) of the Range:
If the direction is right (increment), mark the end by:
Diff[R+1] -= 1
If the direction is left (decrement), mark the end as:
Diff[R+1] += 1
3. Processing the Queries:
After marking the ranges, we compute the prefix sum of the Diff[] array to get the final updated values.
Formula for Marking the Range:
If the direction is right:
Diff[L] += 1 and Diff[R+1] -= 1
If the direction is left:
Diff[L] -= 1 and Diff[R+1] += 1
📈 Apply Shift:
After marking the differences in the auxiliary array, we compute the cumulative sum using prefix Sum to determine how much each index of the string should be shifted.
🔠 Shifting Characters:
Once we have the cumulative shifts, we apply the shifts to the string characters and return the modified string.
Formula = s[i] = 'a' + (s[i] - 'a' + netShift) % 26; netShift = number of total shift at index i

🧮 Complexity Analysis
⏱️ Time Complexity:
The time complexity is O(n + m), where:

n is the length of the string.
m is the number of shift operations.
This is because:

We only make two passes through the string—one for processing the shifts and one for applying the final shifts.
💾 Space Complexity:
The space complexity is O(n) due to the auxiliary array used for the shifts.
 */

/**
 * @param {string} s
 * @param {number[][]} shifts
 * @return {string}
 */
var shiftingLetters = function(s, shifts) {
    const n = s.length;
    const shift = Array(n + 1).fill(0);

    for (let shiftOp of shifts) {
        const [start, end, direction] = shiftOp;
        shift[start] += direction === 1 ? 1 : -1;
        if (end + 1 < n) shift[end + 1] -= direction === 1 ? 1 : -1;
    }

    let currentShift = 0;
    let result = s.split('');
    for (let i = 0; i < n; ++i) {
        currentShift += shift[i];
        shift[i] = currentShift;
    }

    for (let i = 0; i < n; ++i) {
        let netShift = (shift[i] % 26 + 26) % 26;
        result[i] = String.fromCharCode('a'.charCodeAt(0) + (s.charCodeAt(i) - 'a'.charCodeAt(0) + netShift) % 26);
    }

    return result.join('');
};