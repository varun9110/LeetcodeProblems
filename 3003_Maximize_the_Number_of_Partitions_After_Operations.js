/**
 * 3003. Maximize the Number of Partitions After Operations
 * Difficulty: Hard
 * 
 * You are given a string s and an integer k.

First, you are allowed to change at most one index in s to another lowercase English letter.

After that, do the following partitioning operation until s is empty:

Choose the longest prefix of s containing at most k distinct characters.
Delete the prefix from s and increase the number of partitions by one. The remaining characters (if any) in s maintain their initial order.
Return an integer denoting the maximum number of resulting partitions after the operations by optimally choosing at most one index to change.

 

Example 1:

Input: s = "accca", k = 2

Output: 3

Explanation:

The optimal way is to change s[2] to something other than a and c, for example, b. then it becomes "acbca".

Then we perform the operations:

The longest prefix containing at most 2 distinct characters is "ac", we remove it and s becomes "bca".
Now The longest prefix containing at most 2 distinct characters is "bc", so we remove it and s becomes "a".
Finally, we remove "a" and s becomes empty, so the procedure ends.
Doing the operations, the string is divided into 3 partitions, so the answer is 3.

Example 2:

Input: s = "aabaab", k = 3

Output: 1

Explanation:

Initially s contains 2 distinct characters, so whichever character we change, it will contain at most 3 distinct characters, so the longest prefix with at most 3 distinct characters would always be all of it, therefore the answer is 1.

Example 3:

Input: s = "xxyz", k = 1

Output: 4

Explanation:

The optimal way is to change s[0] or s[1] to something other than characters in s, for example, to change s[0] to w.

Then s becomes "wxyz", which consists of 4 distinct characters, so as k is 1, it will divide into 4 partitions.

 

Constraints:

1 <= s.length <= 104
s consists only of lowercase English letters.
1 <= k <= 26
 */

/**
 * Approach
Here’s how I solved it step by step:

I converted every character into a bitmask —
for example, 'a' → 1 << 0, 'b' → 1 << 1, etc.

Then, I defined a recursive DP function:

dp(i, canChange, mask)
i → current index in the string
canChange → whether I still can change one character (1 or 0)
mask → bitmask representing current distinct characters in this partition
For each character, I have two choices:

Add it to the current partition (if distinct count ≤ k)
Start a new partition (if adding it exceeds k)
If I still have the change option, I try changing the current character to all 26 possibilities and compute the best outcome.

Finally, the answer is dp(0, 1, 0) + 1
(we add 1 because the last segment counts as one partition).

Memoization ensures we don’t recompute the same states multiple times, making the solution efficient.
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxPartitionsAfterOperations = function(s, k) {
  const memo = new Map();

  const dp = (i, mask, canChange) => {
    if (i === s.length) return 0;
    const key = `${i},${mask},${canChange}`;
    if (memo.has(key)) return memo.get(key);

    const bit = s.charCodeAt(i) - 97;
    let newMask = mask | (1 << bit);
    let res = 0;

    if (countBits(newMask) > k)
      res = 1 + dp(i + 1, 1 << bit, canChange);
    else
      res = dp(i + 1, newMask, canChange);

    if (canChange) {
      for (let j = 0; j < 26; j++) {
        let changed = mask | (1 << j);
        if (countBits(changed) > k)
          res = Math.max(res, 1 + dp(i + 1, 1 << j, false));
        else
          res = Math.max(res, dp(i + 1, changed, false));
      }
    }

    memo.set(key, res);
    return res;
  };

  const countBits = (x) => x.toString(2).split('1').length - 1;

  return dp(0, 0, true) + 1;
};