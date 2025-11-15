/**
 * 3234. Count the Number of Substrings With Dominant Ones
 * Difficulty: Medium
 * 
 * You are given a binary string s.

Return the number of substrings with dominant ones.

A string has dominant ones if the number of ones in the string is greater than or equal to the square of the number of zeros in the string.

 

Example 1:

Input: s = "00011"

Output: 5

Explanation:

The substrings with dominant ones are shown in the table below.

i	j	s[i..j]	Number of Zeros	Number of Ones
3	3	1	0	1
4	4	1	0	1
2	3	01	1	1
3	4	11	0	2
2	4	011	1	2
Example 2:

Input: s = "101101"

Output: 16

Explanation:

The substrings with non-dominant ones are shown in the table below.

Since there are 21 substrings total and 5 of them have non-dominant ones, it follows that there are 16 substrings with dominant ones.

i	j	s[i..j]	Number of Zeros	Number of Ones
1	1	0	1	0
4	4	0	1	0
1	4	0110	2	2
0	4	10110	2	3
1	5	01101	2	3
 

Constraints:

1 <= s.length <= 4 * 104
s consists only of characters '0' and '1'.
 */

/**
 * Intuition
The key insight for this problem is that for a substring to have "dominant ones", the number of ones must be greater than or equal to the square of the number of zeros. This means that as the number of zeros increases, the number of ones needed grows quadratically. This observation leads us to an important conclusion: the maximum number of zeros in a valid substring can't exceed the square root of the string's length.

Approach
Let's break down the solution into steps:

1. Iterate through possible zero counts:

We iterate from 1 to the square root of the string length (inclusive).
This covers all possible counts of zeros that could result in a valid substring.

2. For each zero count (k), we scan the string:

We use a sliding window technique to keep track of zeros and ones.
We use a deque (double-ended queue, although this is not necessary) to store the positions of zeros.
We keep count of ones between zeros.

3. Counting valid substrings:

When we have exactly k zeros and at least k^2 ones, we've found a valid substring.
We can extend this subtring by adding ones between the last zero and the zero before it, but we can only start adding from the (k^2)th one before the current position.
Thus, we will add the minimum of ones - k^2 + 1 and the number of ones between our last zero and the zero before it.

4. Handle all-ones substrings:

After the main loop, we count substrings that consist of only ones.
These weren't counted in the main loop (which always included at least one zero).
 */

/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function (s) {
    const n = s.length;
    const pre = new Array(n + 1);
    pre[0] = -1;
    for (let i = 0; i < n; i++) {
        if (i === 0 || (i > 0 && s[i - 1] === "0")) {
            pre[i + 1] = i;
        } else {
            pre[i + 1] = pre[i];
        }
    }
    let res = 0;
    for (let i = 1; i <= n; i++) {
        let cnt0 = s[i - 1] === "0" ? 1 : 0;
        let j = i;
        while (j > 0 && cnt0 * cnt0 <= n) {
            const cnt1 = i - pre[j] - cnt0;
            if (cnt0 * cnt0 <= cnt1) {
                res += Math.min(j - pre[j], cnt1 - cnt0 * cnt0 + 1);
            }
            j = pre[j];
            cnt0++;
        }
    }
    return res;
};