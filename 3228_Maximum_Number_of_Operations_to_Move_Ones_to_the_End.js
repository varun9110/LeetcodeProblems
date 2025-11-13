/**
 * 3228. Maximum Number of Operations to Move Ones to the End
 * Difficulty: Medium
 * 
 * You are given a binary string s.

You can perform the following operation on the string any number of times:

Choose any index i from the string where i + 1 < s.length such that s[i] == '1' and s[i + 1] == '0'.
Move the character s[i] to the right until it reaches the end of the string or another '1'. For example, for s = "010010", if we choose i = 1, the resulting string will be s = "000110".
Return the maximum number of operations that you can perform.

Example 1:
Input: s = "1001101"
Output: 4
Explanation:
We can perform the following operations:

Choose index i = 0. The resulting string is s = "0011101".
Choose index i = 4. The resulting string is s = "0011011".
Choose index i = 3. The resulting string is s = "0010111".
Choose index i = 2. The resulting string is s = "0001111".
Example 2:
Input: s = "00111"
Output: 0

Constraints:
1 <= s.length <= 105
s[i] is either '0' or '1'.
 */

/**
 * ✅ Understanding the Problem Context
Given a binary string s (containing '0' and '1'), we need to compute how many operations can be performed following some rules.

Even without the exact problem statement, we can infer what the code is doing by logic tracing.

Intuition
"11100011" → segments: [111] [000] [11]
Count how many '1's appear before each segment of '0', and whenever you transition back to '1', add all previous '1's to the result — because each previous '1' can form a valid operation with that transition.

Approach
🧩 Step-by-Step Code Explanation
int result = 0;
int ones = 0;
boolean use = false;
result → total number of operations.

ones → counts how many '1's have been seen so far.

use → flag that tracks whether we've just seen a '0' (i.e., whether a new segment starts after some zeros).

🔍 Looping through each character
for (char c : s.toCharArray()) {
    if (c == '0') {
        use = true;
    } else {
        if (use) {
            result += ones;
        }
        ones++;
        use = false;
    }    
}
Case 1: When c == '0'

We set use = true.
→ This means we’ve encountered a '0' after some '1's, and this could be a potential "cut point" or "boundary" for an operation.
Case 2: When c == '1'

If use is true, that means the previous segment ended with '0', and now we’ve hit a '1' again.
→ So, an operation can be performed between the last '0' segment and the current '1'.

The code does result += ones;
→ Meaning: for every '1' seen before, we can make one operation with this '1' segment appearing after zeros.

Then it increments ones++ (we’ve seen another '1') and resets use = false.

🧮 After the loop
if (use) {
    result += ones;
}
If the string ended with zeros, then we can still add operations corresponding to all the '1's we’ve seen before, since that last '0' segment can also be paired with all previous '1's.
🧩 Conceptual Summary
We count how many times we can make an operation each time we move from a block of zeros back to ones.

Each such transition contributes ones operations.

The variable use helps identify zero-block boundaries.

The final addition after the loop handles if the string ends with zeros.

Complexity
Time complexity:
O(n), since we loop through the string once.

Space complexity:
O(1) space, using only a few counters.
 */

/**
 * @param {string} s
 * @return {number}
 */
var maxOperations = function maxOperations(s) {
    let countOne = 0;
    let ans = 0;
    let i = 0;
    while (i < s.length) {
        if (s[i] === "0") {
            while (i + 1 < s.length && s[i + 1] === "0") {
                i++;
            }
            ans += countOne;
        } else {
            countOne++;
        }
        i++;
    }
    return ans;
};