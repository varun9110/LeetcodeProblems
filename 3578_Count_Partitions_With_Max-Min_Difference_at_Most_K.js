/**
 * 3578. Count Partitions With Max-Min Difference at Most K
 * Difficulty: Medium
 * 
 * You are given an integer array nums and an integer k. Your task is to partition nums into one or more non-empty contiguous segments such that in each segment, the difference between its maximum and minimum elements is at most k.

Return the total number of ways to partition nums under this condition.

Since the answer may be too large, return it modulo 109 + 7.

 

Example 1:

Input: nums = [9,4,1,3,7], k = 4

Output: 6

Explanation:

There are 6 valid partitions where the difference between the maximum and minimum elements in each segment is at most k = 4:

[[9], [4], [1], [3], [7]]
[[9], [4], [1], [3, 7]]
[[9], [4], [1, 3], [7]]
[[9], [4, 1], [3], [7]]
[[9], [4, 1], [3, 7]]
[[9], [4, 1, 3], [7]]
Example 2:

Input: nums = [3,3,4], k = 0

Output: 2

Explanation:

There are 2 valid partitions that satisfy the given conditions:

[[3], [3], [4]]
[[3, 3], [4]]
 

Constraints:

2 <= nums.length <= 5 * 104
1 <= nums[i] <= 109
0 <= k <= 109
 */

/**
 * Approach
DP definition

I define:

dp[i] = number of ways to partition the first i elements (nums[0..i-1]).
dp[0] = 1 (there is exactly one way to partition an empty prefix: do nothing).
The answer will be dp[n] (where n = nums.length).

Transition

Let the last segment end at index r (0-based).
That means we are computing dp[r+1].

Suppose the last segment starts at index j (0 ≤ j ≤ r).

Segment is nums[j..r].
It’s valid iff max(nums[j..r]) - min(nums[j..r]) ≤ k.
For each such j, the number of complete partitions is dp[j]
(because prefix nums[0..j-1] must already be correctly partitioned).
So:

dp[r+1] = sum(dp[j]) for all j in [L..r]
where L is the smallest index so that [L..r] is valid.
For any j ≥ L, [j..r] (a smaller subarray) will also be valid.

How to get L quickly?

For each r, I maintain a sliding window [l..r]:

I keep two deques:

maxDeque: indices with decreasing nums → front is max in window.
minDeque: indices with increasing nums → front is min in window.
For each new r, I insert nums[r] into both deques while preserving monotonicity.

While max - min > k, I move l to the right:

If l equals the index at the front of a deque, I pop it.
Increment l.
After this, for this r:

l is exactly the smallest starting index such that [l..r] is valid.
So L = l.
Fast sum of dp[j] using prefix sums

I also maintain pref[i] = dp[0] + dp[1] + … + dp[i] (mod 1e9+7).

Then:

dp[r+1] = pref[r] - pref[L-1] (if L > 0)
dp[r+1] = pref[r] (if L == 0)
Of course, everything is done modulo MOD = 1e9+7.

Final answer

After processing all r from 0 to n-1, return dp[n].


 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countPartitions = function(nums, k) {
    const MOD = 1_000_000_007;
    const n = nums.length;

    const dp = new Array(n + 1).fill(0);
    const pref = new Array(n + 1).fill(0);

    dp[0] = 1;
    pref[0] = 1;

    const maxdq = [];
    const mindq = [];
    let l = 0;

    for (let r = 0; r < n; r++) {
        const x = nums[r];

        while (maxdq.length > 0 && nums[maxdq[maxdq.length - 1]] <= x) {
            maxdq.pop();
        }
        maxdq.push(r);

        while (mindq.length > 0 && nums[mindq[mindq.length - 1]] >= x) {
            mindq.pop();
        }
        mindq.push(r);

        while (maxdq.length > 0 && mindq.length > 0 &&
               nums[maxdq[0]] - nums[mindq[0]] > k) {
            if (maxdq[0] === l) maxdq.shift();
            if (mindq[0] === l) mindq.shift();
            l++;
        }

        const L = l;
        const i = r + 1;

        let ways = pref[i - 1];
        if (L > 0) ways -= pref[L - 1];
        ways %= MOD;
        if (ways < 0) ways += MOD;

        dp[i] = ways;
        pref[i] = (pref[i - 1] + dp[i]) % MOD;
    }

    return dp[n];
};