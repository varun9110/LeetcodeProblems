/**
 * 3539. Find Sum of Array Product of Magical Sequences
 * Difficulty: Hard
 * You are given two integers, m and k, and an integer array nums.

A sequence of integers seq is called magical if:
seq has a size of m.
0 <= seq[i] < nums.length
The binary representation of 2seq[0] + 2seq[1] + ... + 2seq[m - 1] has k set bits.
The array product of this sequence is defined as prod(seq) = (nums[seq[0]] * nums[seq[1]] * ... * nums[seq[m - 1]]).

Return the sum of the array products for all valid magical sequences.

Since the answer may be large, return it modulo 109 + 7.

A set bit refers to a bit in the binary representation of a number that has a value of 1.

 

Example 1:

Input: m = 5, k = 5, nums = [1,10,100,10000,1000000]

Output: 991600007

Explanation:

All permutations of [0, 1, 2, 3, 4] are magical sequences, each with an array product of 1013.

Example 2:

Input: m = 2, k = 2, nums = [5,4,3,2,1]

Output: 170

Explanation:

The magical sequences are [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [1, 2], [1, 3], [1, 4], [2, 0], [2, 1], [2, 3], [2, 4], [3, 0], [3, 1], [3, 2], [3, 4], [4, 0], [4, 1], [4, 2], and [4, 3].

Example 3:

Input: m = 1, k = 1, nums = [28]

Output: 28

Explanation:

The only magical sequence is [0].

 

Constraints:

1 <= k <= m <= 30
1 <= nums.length <= 50
1 <= nums[i] <= 108
 */

/**
 * Intuition
...we need to count all sequences of length m whose sum of powers of two has exactly k set bits, and weight each sequence by the product of chosen nums values.

The tricky part is that adding multiple powers of two can create carries across bit positions.
Instead of brute‑forcing all sequences, we use dynamic programming to track how many picks we’ve used, how many set bits are finalized, and what carry remains.
To handle repeated picks of the same index, we divide by c! during DP and multiply by m! at the end to restore permutations.
BigInt is used to avoid precision loss in modular arithmetic.
Approach
Programming Techniques Used: 
✅ Dynamic Programming with 3D state → (used, setBits, carry)
✅ Combinatorics → divide by c! in DP, multiply by m! at the end
✅ Precomputation → factorials, inverse factorials,& powers of nums[i]
✅ BigInt modular arithmetic → exact math under 1e9+7
✅ Rolling DP arrays → memory efficiency

Algorithm Logic: 
1️⃣ Precompute factorials,inverse factorials,& nums[i]^c for all c≤m.
2️⃣ Initialize DP: dp[0][0][0] = 1.
3️⃣ For each index i in nums:  
• For each state (used, j, carry):   
– Try picking this index c times (0…m‑used).   
– New sum = carry + c.   
– Finalize lowest bit: bit = sum & 1, add to j.   
– Pass sum >>> 1 as new carry.   
– Multiply contribution by nums[i]^c / c!.
4️⃣ After all indices, flush remaining carry bits into set‑bit count.
5️⃣ Sum contributions where used == m and total set bits == k.
6️⃣ Multiply by m! to account for permutations.

Complexity
Time complexity:
O(n · m² · k) – For each of n indices, we iterate over m used counts, k set‑bit counts, and up to m choices of c.
O(m · k · m) – 3D DP array storing states by (used, setBits, carry).

Space complexity:
 *  */

/**
 * @param {number} m
 * @param {number} k
 * @param {number[]} nums
 * @return {number}
 */
var magicalSum = function(m, k, nums) {
    const MOD = 1000000007n;
    const n = nums.length;

    // factorials and inverse factorials (BigInt)
    const fact = Array(m + 1).fill(0n);
    fact[0] = 1n;
    for (let i = 1; i <= m; i++) fact[i] = (fact[i - 1] * BigInt(i)) % MOD;

    function modPow(base, exp) {
        let b = base % MOD, e = BigInt(exp), r = 1n;
        while (e > 0n) {
            if (e & 1n) r = (r * b) % MOD;
            b = (b * b) % MOD;
            e >>= 1n;
        }
        return r;
    }
    const invFact = Array(m + 1).fill(0n);
    invFact[m] = modPow(fact[m], Number(MOD - 2n));
    for (let i = m; i > 0; i--) invFact[i - 1] = (invFact[i] * BigInt(i)) % MOD;

    // we precompute nums[i]^c (BigInt)
    const powNum = nums.map(v => {
        const b = BigInt(v);
        const row = Array(m + 1).fill(0n);
        row[0] = 1n;
        for (let c = 1; c <= m; c++) row[c] = (row[c - 1] * b) % MOD;
        return row;
    });

    // dp[used][j][carry] rolled over indices
    let dp = Array.from({ length: m + 1 }, () =>
        Array.from({ length: k + 1 }, () =>
            Array(m + 1).fill(0n)
        )
    );
    dp[0][0][0] = 1n;

    for (let idx = 0; idx < n; idx++) {
        const ndp = Array.from({ length: m + 1 }, () =>
            Array.from({ length: k + 1 }, () =>
                Array(m + 1).fill(0n)
            )
        );

        for (let used = 0; used <= m; used++) {
            for (let j = 0; j <= k; j++) {
                for (let carry = 0; carry <= m; carry++) {
                    const base = dp[used][j][carry];
                    if (base === 0n) continue;

                    const maxPick = m - used;
                    for (let c = 0; c <= maxPick; c++) {
                        const s = carry + c;
                        const bit = s & 1;
                        const nj = j + bit;
                        if (nj > k) continue;
                        const ncarry = s >>> 1;

                        let contrib = base;
                        contrib = (contrib * powNum[idx][c]) % MOD;
                        contrib = (contrib * invFact[c]) % MOD;

                        ndp[used + c][nj][ncarry] =
                            (ndp[used + c][nj][ncarry] + contrib) % MOD;
                    }
                }
            }
        }

        dp = ndp;
    }

    // finalize: we add popcount of remaining carry
    function popcountInt32(x) {
        let cnt = 0;
        let v = x;
        while (v) { cnt += (v & 1); v >>>= 1; }
        return cnt;
    }

    let ans = 0n;
    for (let j = 0; j <= k; j++) {
        const rowUsedM = dp[m][j];
        for (let carry = 0; carry <= m; carry++) {
            const v = rowUsedM[carry];
            if (v === 0n) continue;
            if (j + popcountInt32(carry) === k) {
                ans = (ans + v) % MOD;
            }
        }
    }

    // we convert from counts to ordered sequences
    ans = (ans * fact[m]) % MOD;
    return Number(ans);
};