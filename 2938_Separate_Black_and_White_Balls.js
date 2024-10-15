/**
 * 2938. Separate Black and White Balls
 * Difficulty: MEdium
 * 
 * There are n balls on a table, each ball has a color black or white.
You are given a 0-indexed binary string s of length n, where 1 and 0 represent black and white balls, respectively.
In each step, you can choose two adjacent balls and swap them.
Return the minimum number of steps to group all the black balls to the right and all the white balls to the left.

Example 1:

Input: s = "101"
Output: 1
Explanation: We can group all the black balls to the right in the following way:
- Swap s[0] and s[1], s = "011".
Initially, 1s are not grouped together, requiring at least 1 step to group them to the right.
Example 2:

Input: s = "100"
Output: 2
Explanation: We can group all the black balls to the right in the following way:
- Swap s[0] and s[1], s = "010".
- Swap s[1] and s[2], s = "001".
It can be proven that the minimum number of steps needed is 2.
Example 3:

Input: s = "0111"
Output: 0
Explanation: All the black balls are already grouped to the right.
 

Constraints:

1 <= n == s.length <= 105
s[i] is either '0' or '1'.
 */

/**
 * Intuition
The problem asks us to group all black balls (represented by 1s) to the right and all white balls (represented by 0s) to the left. We are only allowed to swap adjacent balls. 
Our goal is to calculate the minimum number of swaps required to achieve this.

Key Insight:
The number of swaps needed is directly related to the number of white balls (0s) that each black ball (1) needs to "skip" over to reach its desired position. 
Each black ball needs to move past all white balls to its left, and for each white ball encountered, it requires one swap.

Approach
Initialization: We keep two variables:

cnt: Tracks the cumulative number of black balls (1s) encountered so far.
ans: Stores the total number of swaps needed.
Traversal: Iterate through the string:

If the current character is a white ball (0), it needs to be swapped with the black balls that are on its left. So, add the number of black balls 
encountered so far (cnt) to ans.
If the current character is a black ball (1), simply increment the cnt to reflect that there’s one more black ball that needs to be considered in future swaps.
Final Result: The total swaps required to group all black balls to the right is stored in ans.

Complexity
Time complexity:
The solution runs in (O(n)), where (n) is the length of the string, as we traverse the string only once.

Space complexity:
(O(1)), since we are only using a few extra variables regardless of the input size.
 */

/**
 * @param {string} s
 * @return {number}
 */
var minimumSteps = function(s) {
    let ans = 0;
    let blackCount = 0; // Tracks the number of black balls (1s)

    // Traverse through the string
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '0') {
            // White ball encountered, add the number of black balls on its left
            ans += blackCount;
        } else {
            // Black ball encountered, increment the black ball count
            blackCount++;
        }
    }

    return ans;
};