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
 * What's the problem asking?
We need to find sequences of length m where each element is an index from the nums array. The twist? When we treat these indices as powers of 2 and sum them up (like 2 
seq[0]
 +2 
seq[1]
 +...), the resulting binary number should have exactly k set bits (1s).

We must compute the sum of products:

magical seq
∑
​
 ∏ 
i=0
m−1
​
 nums[seq[i]]mod(10 
9
 +7)

For each valid "magical" sequence, we calculate the product of the corresponding numbers from nums, and sum all these products together.

Example: m=2, k=2, nums=[5,4,3,2,1]
Sequence [0,1] means: 2^0 + 2^1 = 1 + 2 = 3 (binary: 11, has 2 set bits ✓)
Product: nums[0] * nums[1] = 5 * 4 = 20

Visual representation:
    Indices:     0    1    2    3    4
    nums:      [ 5,   4,   3,   2,   1 ]
               
    Sequence [0,1]: Pick indices 0 and 1
    Binary sum: 2^0 + 2^1 = 001 + 010 = 011 (two 1s ✓)
    Product: 5 × 4 = 20
Intuition
The key insight is realizing this is about binary addition with repetition allowed!

Instead of enumerating every sequence (which explodes combinatorially), we notice something subtle:

Each sequence corresponds to a multiset of indices. What matters is how many times each index appears, not the order.

Here's how we think of it :

Instead of "sequence of indices", think "how many times do we pick each index?"
When we add powers of 2, we're literally doing binary addition!
If we pick index 2 three times:
2^2 + 2^2 + 2^2 = 4 + 4 + 4 = 12

Binary addition with carry:
  Position 2:  1 + 1 + 1 = 11 (binary)
                           ^^
                           |└─ bit at position 2 = 1
                           └── carry to position 3 = 1
  
  Result: 12 = 1100 (binary)
So this becomes a digit DP problem where we process each index (bit position) and track:

How many indices we've used so far
The carry from previous additions
How many 1s we've accumulated in our result
Flow of binary addition simulation:

Position:     0     1     2     3    ...
             ┌─┐   ┌─┐   ┌─┐   ┌─┐
             │ │   │ │   │ │   │ │
Counts:      │2│   │0│   │3│   │1│  ← How many times we pick each
             │ │   │ │   │ │   │ │
             └┬┘   └┬┘   └┬┘   └┬┘
              │     │     │     │
              ▼     ▼     ▼     ▼
Carry in:     0 →   1 →   0 →   1
Add count:   +2    +0    +3    +1
             ──    ──    ──    ──
Total:        2     1     3     2
              │     │     │     │
Bit result:   0     1     1     0  ← (total & 1)
Carry out:    1 →   0 →   1 →   1  ← (total >> 1)
Approach
Brute Force
The naive approach would be:

Generate all possible sequences of length m (with repetition allowed)
For each sequence, calculate 2 
seq[0]
 +2 
seq[1]
 +...
Count set bits in the result
If count equals k, add the product to our answer
Brute Force Flow:
┌─────────────────────────────────────┐
│ Generate all sequences of length m  │
│ (n^m possible sequences!)           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ For each sequence:                  │
│  • Calculate sum of 2^(indices)     │
│  • Count bits in binary             │
│  • Check if bit count == k          │
│  • If yes, multiply nums values     │
└──────────────┬──────────────────────┘
               │
               ▼
         Sum all products
Why this fails: With n=50 and m=30, we'd have 50 
30
  sequences to check. That's astronomically large!

Optimal Solution
Instead of generating sequences, we use multiset counting with binary simulation:

Key Observations:

Order doesn't matter for bit counting! [0,1,2] and [2,0,1] give the same binary sum
We only care about how many times each index appears
We can simulate binary addition bit by bit, tracking the carry
The DP State:

dp[pos][carry][used][ones] = 
    Sum of products for all ways to:
    • Use indices 0..pos-1
    • Have 'carry' bits carrying over
    • Have used 'used' total picks
    • Have 'ones' set bits so far
Transition Logic:

At each position 'pos', decide how many times to pick it (0 to m-used times)

For count 'cnt':
┌──────────────────────────────────────────┐
│  Binary addition at this bit position:   │
│                                          │
│  total = carry + cnt                     │
│  bit = total & 1  (our result bit here)  │
│  next_carry = total >> 1                 │
│                                          │
│  Ways to arrange = C(remaining, cnt)     │
│  Contribution = nums[pos]^cnt            │
└──────────────────────────────────────────┘
Visual DP Transition:

State at position i:
                 [pos=i, carry=c, used=u, ones=o]
                              |
                    ┌─────────┴─────────┐
                    │ Try picking this  │
                    │ index cnt times   │
                    │ (0 ≤ cnt ≤ m-u)   │
                    └─────────┬─────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
         cnt=0           cnt=1           cnt=2 ...
              │               │               │
              ▼               ▼               ▼
    total=c+0         total=c+1         total=c+2
    bit=c&1           bit=(c+1)&1       bit=(c+2)&1
    carry'=c>>1       carry'=(c+1)>>1   carry'=(c+2)>>1
              │               │               │
              └───────────────┼───────────────┘
                              ▼
                     Recurse to pos+1
            [pos=i+1, carry=carry', used=u+cnt, ones=o+bit]
                              │
                              ▼
                   Multiply by C(m-u, cnt)
                   Multiply by nums[i]^cnt
The Magic of Combinatorics:

When we choose to pick index i exactly cnt times out of m positions, and we've already used used positions:

Remaining positions: m - used
Ways to place cnt copies: ( 
cnt
m−used
​
 )
Product contribution: nums[i] 
cnt
 
Complexity
Time complexity: O(n⋅m 
3
 ⋅k)

States: n positions × m carry values × m used count × k ones count
Each state tries m transitions
With memoization, each state computed once
Space complexity: O(n⋅m 
2
 ⋅k)

DP table size: 55 × 35 × 35 × 35 (using static arrays with max constraints)
Precomputed tables: O(n⋅m) for powers, O(m 
2
 ) for combinations
Test Cases Walkthrough
Test Case 1: Simple Example
Input: m=2, k=2, nums=[5,4,3,2,1]

Step-by-step for sequence [0,1]:
• Indices 0 and 1 selected
• Binary: 2^0 + 2^1 = 001 + 010 = 011
• Set bits: 2 ✓
• Product: nums[0] × nums[1] = 5 × 4 = 20

All valid sequences and their contributions:
[0,1]: 011 → 20    [1,0]: 011 → 20
[0,2]: 101 → 15    [2,0]: 101 → 15
[0,3]: 1001 → 10   [3,0]: 1001 → 10
[0,4]: 10001 → 5   [4,0]: 10001 → 5
[1,2]: 110 → 12    [2,1]: 110 → 12
[1,3]: 1010 → 8    [3,1]: 1010 → 8
[1,4]: 10010 → 4   [4,1]: 10010 → 4
[2,3]: 1100 → 6    [3,2]: 1100 → 6
[2,4]: 10100 → 3   [4,2]: 10100 → 3
[3,4]: 11000 → 2   [4,3]: 11000 → 2

Total: 170 ✓
Test Case 2: With Repetition
Input: m=3, k=2, nums=[2,3]

Consider choosing index 0 twice and index 1 once:
• Binary: 2^0 + 2^0 + 2^1 = 1 + 1 + 2 = 4 = 100 (one set bit ✗)

Consider choosing index 0 once and index 1 twice:
• Binary: 2^0 + 2^1 + 2^1 = 1 + 2 + 2 = 5 = 101 (two set bits ✓)
• Ways to arrange: C(3,1) × C(2,2) = 3
• Product: nums[0]^1 × nums[1]^2 = 2 × 9 = 18
• Contribution: 3 × 18 = 54
Test Case 3: Understanding Carry
Input: m=4, k=1, nums=[1]

If we pick index 0 four times:
• Binary addition: 1 + 1 + 1 + 1 = 4 = 100

Simulation:
Position 0: count=4
  total = 0 + 4 = 4
  bit = 4 & 1 = 0
  carry = 4 >> 1 = 2
  ones_so_far = 0

Position 1: (from carry)
  total = 2 + 0 = 2
  bit = 2 & 1 = 0
  carry = 2 >> 1 = 1
  ones_so_far = 0

Position 2: (from carry)
  total = 1 + 0 = 1
  bit = 1 & 1 = 1
  carry = 1 >> 1 = 0
  ones_so_far = 1

Final: 100 in binary (one set bit ✓)
Product: 1^4 = 1
Ways: C(4,4) = 1
Answer: 1 ✓
Key Takeaways
Transform the problem: From "sequences" to "multisets with counts"
Binary addition insight: Process bit-by-bit with carry simulation
Combinatorics matter: Use ( 
k
n
​
 ) to count arrangements without generating them
Memoization is crucial: The same state can be reached via different paths
Handle edge cases: Don't forget the final carry bits at the end!
The beauty of this solution is how it elegantly combines DP, combinatorics, and bit manipulation to solve what initially seems like an intractable counting problem.
 */

/**
 * @param {number} m
 * @param {number} k
 * @param {number[]} nums
 * @return {number}
 */

const MOD = 1e9 + 7; 
 
var magicalSum = function(m, k, nums) {
    const n = nums.length;

    // precompute powers
    const powNum = Array.from({ length: n }, () => Array(m + 1).fill(1));
    for (let i = 0; i < n; i++)
      for (let j = 1; j <= m; j++)
        powNum[i][j] = powNum[i][j - 1] * nums[i] % MOD;

    // nCk table
    const C = Array.from({ length: m + 1 }, () => Array(m + 1).fill(0));
    for (let i = 0; i <= m; i++) {
      C[i][0] = C[i][i] = 1;
      for (let j = 1; j < i; j++)
        C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
    }

    const memo = new Map();
    const dfs = (pos, carry, used, ones) => {
      const key = `${pos},${carry},${used},${ones}`;
      if (memo.has(key)) return memo.get(key);

      if (pos === n) {
        let extra = 0, c = carry;
        while (c) { if (c & 1) extra++; c >>= 1; }
        return used === m && ones + extra === k ? 1 : 0;
      }

      let ans = 0;
      for (let cnt = 0; cnt + used <= m; cnt++) {
        const total = carry + cnt;
        const bit = total & 1;
        const ncarry = total >> 1;
        const sub = dfs(pos + 1, ncarry, used + cnt, ones + bit);
        if (!sub) continue;
        const ways = C[m - used][cnt];
        const prod = powNum[pos][cnt];
        ans = (ans + sub * ways % MOD * prod) % MOD;
      }
      memo.set(key, ans);
      return ans;
    };

    return dfs(0, 0, 0, 0);
};