/**
 * 808. Soup Servings
 * Difficulty: Medium
 * 
 * You have two soups, A and B, each starting with n mL. On every turn, one of the following four serving operations is chosen at random, 
 * each with probability 0.25 independent of all previous turns:

pour 100 mL from type A and 0 mL from type B
pour 75 mL from type A and 25 mL from type B
pour 50 mL from type A and 50 mL from type B
pour 25 mL from type A and 75 mL from type B
Note:

There is no operation that pours 0 mL from A and 100 mL from B.
The amounts from A and B are poured simultaneously during the turn.
If an operation asks you to pour more than you have left of a soup, pour all that remains of that soup.
The process stops immediately after any turn in which one of the soups is used up.

Return the probability that A is used up before B, plus half the probability that both soups are used up in the same turn. Answers within 10-5 of the actual answer will be accepted.

Example 1:
Input: n = 50
Output: 0.62500
Explanation: 
If we perform either of the first two serving operations, soup A will become empty first.
If we perform the third operation, A and B will become empty at the same time.
If we perform the fourth operation, B will become empty first.
So the total probability of A becoming empty first plus half the probability that A and B become empty at the same time, is 0.25 * (1 + 1 + 0.5 + 0) = 0.625.
Example 2:
Input: n = 100
Output: 0.71875
Explanation: 
If we perform the first serving operation, soup A will become empty first.
If we perform the second serving operations, A will become empty on performing operation [1, 2, 3], and both A and B become empty on performing operation 4.
If we perform the third operation, A will become empty on performing operation [1, 2], and both A and B become empty on performing operation 3.
If we perform the fourth operation, A will become empty on performing operation 1, and both A and B become empty on performing operation 2.
So the total probability of A becoming empty first plus half the probability that A and B become empty at the same time, is 0.71875.

Constraints:
0 <= n <= 109
 */

/**
 * 🔥🚀Easiest💡100% Runtime Beat🏆|🧩Optimal Soup Servings Probability🎯|Smart DP + Large-N Shortcut💡

Sandesh Naik
485
2 hours ago
C++
Java
Go
Python3

2+
🥣 LeetCode 808 – Soup Servings | 100% Runtime | Java
💡 Intuition
We have two soups — A and B — each starting with n mL.
At every step, one of four serving operations is chosen at random:

Pour 100 mL from A, 0 mL from B
Pour 75 mL from A, 25 mL from B
Pour 50 mL from A, 50 mL from B
Pour 25 mL from A, 75 mL from B
The process stops when either soup is empty.
We want:

Probability that A finishes first
Plus half the probability that A and B finish at the same time
🧠 Key Observations
Unit Conversion

All serving amounts are multiples of 25 mL.
We can scale down the problem by dividing n by 25.
Example: n = 50 → m = 2 units of 25 mL each.
Base Cases

A ≤ 0 and B ≤ 0 → Both empty → return 0.5
A ≤ 0 and B > 0 → A empty first → return 1.0
B ≤ 0 and A > 0 → B empty first → return 0.0
Large n Optimization

For large n, the probability approaches 1.0 quickly.
We can safely return 1.0 if n > 5000 without losing accuracy (error < 1e-5).
Memoization

We avoid recalculating states (a, b) by storing results in a Double[][] dp.
🚀 Approach
Convert n to units of 25 mL: m = ceil(n / 25)
Use DFS with memoization to recursively compute probabilities.
For each state (a, b):
Explore the four possible serving operations.
Each operation has equal probability (0.25).
Recursively compute the probability for the next state.
Store the result in dp[a][b] to reuse later.
📝 Example
Input:
n = 50 → m = 2

Step-by-step:
Possible first moves:

(A=0, B=2) → A empty first → probability 1.0
(A=-1, B=1) → A empty first → probability 1.0
(A=0, B=0) → Both empty → probability 0.5
(A=1, B=-1) → B empty first → probability 0.0
Final probability:0.25 × (1.0 + 1.0 + 0.5 + 0.0) = 0.625

⏳ Complexity
Time Complexity:
( O(m^2) ) where ( m = \lceil n / 25 \rceil )
(Each state (a,b) computed once.)

Space Complexity:
( O(m^2) ) for memoization table.


 */

/**
 * @param {number} n
 * @return {number}
 */
var soupServings = function(n) {
    if (n > 5000) return 1.0;
    const units = Math.ceil(n / 25);
    const cache = Array.from({ length: units + 1 }, () => Array(units + 1).fill(null));

    const calcProb = (soupA, soupB) => {
        if (soupA <= 0 && soupB <= 0) return 0.5;
        if (soupA <= 0) return 1.0;
        if (soupB <= 0) return 0.0;
        if (cache[soupA][soupB] !== null) return cache[soupA][soupB];
        let prob = 0.25 * (
            calcProb(soupA - 4, soupB) +
            calcProb(soupA - 3, soupB - 1) +
            calcProb(soupA - 2, soupB - 2) +
            calcProb(soupA - 1, soupB - 3)
        );
        cache[soupA][soupB] = prob;
        return prob;
    };

    return calcProb(units, units);
};