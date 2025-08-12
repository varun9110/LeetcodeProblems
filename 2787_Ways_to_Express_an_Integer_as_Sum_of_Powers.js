/**
 * 2787. Ways to Express an Integer as Sum of Powers
 * Difficulty: Medium
 * 
 * Given two positive integers n and x.

Return the number of ways n can be expressed as the sum of the xth power of unique positive integers, in other words, the number of sets of unique integers [n1, n2, ..., nk] where n = n1x + n2x + ... + nkx.

Since the result can be very large, return it modulo 109 + 7.

For example, if n = 160 and x = 3, one way to express n is n = 23 + 33 + 53.

 

Example 1:

Input: n = 10, x = 2
Output: 1
Explanation: We can express n as the following: n = 32 + 12 = 10.
It can be shown that it is the only way to express 10 as the sum of the 2nd power of unique integers.
Example 2:

Input: n = 4, x = 1
Output: 2
Explanation: We can express n in the following ways:
- n = 41 = 4.
- n = 31 + 11 = 4.
 

Constraints:

1 <= n <= 300
1 <= x <= 5
 */

/**
 * Intuition 🧠
We are asked:

How many different sets of unique positive integers, when each is raised to the power x, sum up exactly to n?

This is basically a subset sum problem —
but instead of directly using the integers themselves,
we use their x-th powers.

Example:

n = 10, x = 2
Possible powers:
1² = 1
2² = 4
3² = 9
(4² = 16 > 10, so stop here)
Only one valid combination exists:
9 + 1 → (3² + 1²)
Approach 🚀
We can solve this using 1D Dynamic Programming, similar to 0/1 Knapsack.

Step 1: Precompute possible powers
Loop over integers starting from 1,
raise each to the x-th power,
stop when the power exceeds n.

Step 2: DP definition
Let:
dp[s] = number of ways to form sum s
using the powers considered so far

dp[0] = 1 → one way to make sum 0 (choose nothing)
dp[1..n] = 0 initially
Step 3: Iterate over each power
For each power p:

Loop backwards from n down to p
Update:dp[sum] += dp[sum - p]
Backward looping ensures each power is used at most once.

Step 4: Answer
dp[n] will contain the total number of valid combinations.

Example Walkthrough 📝
n = 10, x = 2
Powers = [1, 4, 9]
Initial:dp = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

Using power 1:
We update from sum = 10 → 1:
Now dp = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

Using power 4:
Update from sum = 10 → 4:
dp[4] = dp[4] + dp[0] = 2 (either 4 alone or four 1’s)
... updates continue.

Using power 9:
Only affects dp[9] and dp[10]:
dp[9] = dp[9] + dp[0] = 2
dp[10] = dp[10] + dp[1] = 1

Final:dp[10] = 1 → Only one valid combination: 9 + 1

Complexity Analysis 📊
Let m be the number of powers ≤ n
(m ≤ 14 for given constraints)

Time: O(m·n) → At most ~4200 operations for n=300
Space: O(n) → Only a single dp array
 */

/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
// You can use either `var numberOfWays = function(n, x) { ... }` or a class method.
const MOD = 1_000_000_007;

var numberOfWays = function(n, x) {
    const powers = [];
    for (let i = 1;; ++i) {
        let p = 1;
        for (let k = 0; k < x; ++k) p *= i;
        if (p > n) break;
        powers.push(p);
    }

    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    for (const p of powers) {
        for (let s = n; s >= p; --s) {
            dp[s] = (dp[s] + dp[s - p]) % MOD;
        }
    }
    return dp[n];
};
