/**
 * 3405. Count the Number of Arrays with K Matching Adjacent Elements
 * Difficulty: Hard
 * 
 * You are given three integers n, m, k. A good array arr of size n is defined as follows:
Each element in arr is in the inclusive range [1, m].
Exactly k indices i (where 1 <= i < n) satisfy the condition arr[i - 1] == arr[i].
Return the number of good arrays that can be formed.
Since the answer may be very large, return it modulo 109 + 7.

Example 1:
Input: n = 3, m = 2, k = 1
Output: 4
Explanation:
There are 4 good arrays. They are [1, 1, 2], [1, 2, 2], [2, 1, 1] and [2, 2, 1].
Hence, the answer is 4.
Example 2:
Input: n = 4, m = 2, k = 2
Output: 6
Explanation:
The good arrays are [1, 1, 1, 2], [1, 1, 2, 2], [1, 2, 2, 2], [2, 1, 1, 1], [2, 2, 1, 1] and [2, 2, 2, 1].
Hence, the answer is 6.
Example 3:
Input: n = 5, m = 2, k = 0
Output: 2
Explanation:
The good arrays are [1, 2, 1, 2, 1] and [2, 1, 2, 1, 2]. Hence, the answer is 2.

Constraints:
1 <= n <= 105
1 <= m <= 105
0 <= k <= n - 1
 */


/**
 * the key idea is to fix k values to a specific one m value, and the rest can be any value except m.

the problem becomes one of choosing positions for fixed values and assigning others accordingly.

so, to count the number of valid arrays with certain constraints, we have to rely on combinatorics.

walktrhough:
1. Choose positions to fix

We must place the value m exactly k times in the array, but we cannot place m in the last position.

So we have only n−1 positions to choose from.

Number of ways to choose m positions from n−1 is:
( 
k
n−1
​
 )= 
k!⋅(n−1−k)!
(n−1)!
​
 
​
 
2. Assign m to the k chosen positions

There is only one way to assign m to each of those positions (since it's fixed).
So this contributes nothing extra to the count (multiplicative identity).
3. Fill the remaining positions

There are (n−k−1) remaining positions.

Each of these positions can take any value from 1 to m, except m.

So we have (n−k−1) choices per position.

Number of ways to fill them:

(m−1) 
n−k−1
 
​
 
4. Multiply by number of possible values for m

Since m can be anything from 1 to m itself, we multiply the result by m.
Putting it all together:
Total=( 
k
n−1
​
 )⋅m⋅(m−1) 
n−k−1
 
​
 
​
 
All computations are done modulo:
10 
9
 +7

Time complexity: O(nlogn)
Space complexity: O(n)
 */

/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
const MOD = BigInt(1e9 + 7);
const MAX = 100000;
const fac = Array(MAX).fill(0n);
const inv = Array(MAX).fill(0n);

const pow = (x, y) => {
    x = BigInt(x);
    y = BigInt(y);
    let res = 1n;
    while (y > 0n) {
        if (y & 1n) res = (res * x) % MOD;
        x = (x * x) % MOD;
        y >>= 1n;
    }
    return res;
};

const prep = () => {
    if (fac[0] !== 0n) return;
    fac[0] = 1n;
    for (let i = 1; i < MAX; i++) fac[i] = (fac[i - 1] * BigInt(i)) % MOD;
    inv[MAX - 1] = pow(fac[MAX - 1], MOD - 2n);
    for (let i = MAX - 2; i >= 0; i--) inv[i] = (inv[i + 1] * BigInt(i + 1)) % MOD;
};

const binom = (n, r) => {
    if (r < 0 || r > n) return 0n;
    return (((fac[n] * inv[r]) % MOD) * inv[n - r]) % MOD;
};

const countGoodArrays = (n, m, k) => {
    prep();
    let ways = binom(n - 1, k);
    ways = (ways * BigInt(m)) % MOD;
    ways = (ways * pow(m - 1, n - k - 1)) % MOD;
    return Number(ways);
};