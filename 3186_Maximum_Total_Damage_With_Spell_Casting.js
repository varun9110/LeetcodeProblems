/**
 * 3186. Maximum Total Damage With Spell Casting
 * Difficulty: Medium
 * 
 * A magician has various spells.

You are given an array power, where each element represents the damage of a spell. Multiple spells can have the same damage value.

It is a known fact that if a magician decides to cast a spell with a damage of power[i], they cannot cast any spell with a damage of power[i] - 2, power[i] - 1, power[i] + 1, or power[i] + 2.

Each spell can be cast only once.

Return the maximum possible total damage that a magician can cast.

 

Example 1:

Input: power = [1,1,3,4]

Output: 6

Explanation:

The maximum possible damage of 6 is produced by casting spells 0, 1, 3 with damage 1, 1, 4.

Example 2:

Input: power = [7,1,6,6]

Output: 13

Explanation:

The maximum possible damage of 13 is produced by casting spells 1, 2, 3 with damage 1, 6, 6.

 

Constraints:

1 <= power.length <= 105
1 <= power[i] <= 109
 */

/**
 * Intuition
If we cast a spell with damage power[i], we cannot cast spells with damage values power[i] - 2, power[i] - 1, power[i] + 1, or power[i] + 2.
Hence, for each unique damage value, we must decide whether to take it (and skip nearby ones) or skip it — while maximizing the total damage.
Approach
Count frequencies:
Use a map to count how many times each damage value occurs.

Sort the unique damages:
Store all unique damage values in a sorted list.

Dynamic Programming setup:
Let dp[i] be the maximum total damage we can get considering damage values up to index i.
When taking keys[i], we add keys[i] * freq[keys[i]] and skip nearby damages (keys[i]-2, keys[i]-1, keys[i]+1, keys[i]+2).

Find the previous valid index:
Use binary search to find the rightmost damage value that’s ≤ keys[i] - 3, since any damage within 2 difference is invalid.

Transition:
dp[i] = max(dp[i - 1], dp[prev] + freq[keys[i]] * keys[i])

dp[i - 1]: skip current damage
dp[prev] + ...: take current damage and add best result before the conflict zone
Answer:
dp[n - 1] gives the maximum possible total damage.
Complexity
Time complexity: O(Nlogn)
Space complexity: O(N)
 */

/**
 * @param {number[]} power
 * @return {number}
 */
var maximumTotalDamage = function(power) {
    const freq = new Map();
    for (const p of power) freq.set(p, (freq.get(p) || 0) + 1);
    const keys = Array.from(freq.keys()).sort((a, b) => a - b);
    const n = keys.length;
    const dp = Array(n).fill(0);
    dp[0] = freq.get(keys[0]) * keys[0];
    for (let i = 1; i < n; i++) {
        let take = freq.get(keys[i]) * keys[i];
        let l = 0, r = i - 1, ans = -1;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (keys[mid] <= keys[i] - 3) {
                ans = mid;
                l = mid + 1;
            } else r = mid - 1;
        }
        if (ans >= 0) take += dp[ans];
        dp[i] = Math.max(dp[i - 1], take);
    }
    return dp[n - 1];
};