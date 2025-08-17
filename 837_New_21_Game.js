/**
 * 837. New 21 Game
 * Difficulty: Medium
 * 
 * Alice plays the following game, loosely based on the card game "21".

Alice starts with 0 points and draws numbers while she has less than k points. During each draw, she gains an integer number of points randomly from the range [1, maxPts], where maxPts is an integer. Each draw is independent and the outcomes have equal probabilities.

Alice stops drawing numbers when she gets k or more points.

Return the probability that Alice has n or fewer points.

Answers within 10-5 of the actual answer are considered accepted.

 

Example 1:

Input: n = 10, k = 1, maxPts = 10
Output: 1.00000
Explanation: Alice gets a single card, then stops.
Example 2:

Input: n = 6, k = 1, maxPts = 10
Output: 0.60000
Explanation: Alice gets a single card, then stops.
In 6 out of 10 possibilities, she is at or below 6 points.
Example 3:

Input: n = 21, k = 17, maxPts = 10
Output: 0.73278
 

Constraints:

0 <= k <= n <= 104
1 <= maxPts <= 104
 */

/**
 * Intuition
The problem is about calculating the probability that Alice ends up with a score of at most N when she keeps drawing numbers between 1 and maxPts until her score reaches at least K. At first glance, this looks similar to dynamic programming on probabilities because the outcome of each draw depends on the results of previous draws. The key idea is that the probability of reaching a score i can be derived from the probabilities of reaching earlier scores within a sliding window of size maxPts.
Instead of recalculating probabilities for each range repeatedly, we maintain a running sum of the last maxPts probabilities, which allows us to update efficiently. This way, we can build probabilities step by step and finally add up the ones that represent valid outcomes (scores between K and N).
Approach
We use dynamic programming with a sliding window to efficiently calculate probabilities. Let dp[i] represent the probability of reaching exactly i points. Initially, dp[0] = 1 since Alice always starts with 0 points. For every next score i, its probability comes from all possible scores that could have led to it in one draw, i.e., dp[i] = (dp[i-1] + dp[i-2] + ... + dp[i-maxPts]) / maxPts. Directly computing this sum would be too slow, so we maintain a running total called windowSum, which keeps track of the last maxPts probabilities.
At each step:

We compute prob = windowSum / maxPts as the probability for i.

If i < K, Alice can still draw more, so we add this probability into windowSum.

If i >= K, Alice stops drawing, so we add this probability to the final result.

To maintain the window size, if i >= maxPts, we remove the oldest probability from windowSum.

By repeating this process up to N, we efficiently compute the result without recalculating large sums repeatedly.

Complexity
Time complexity: O(N)
Space complexity: O(1)
 */

/**
 * @param {number} n
 * @param {number} k
 * @param {number} maxPts
 * @return {number}
 */
var new21Game = function(n, k, maxPts) {
    if (k === 0 || n >= k - 1 + maxPts) return 1.0;

    let dp = new Array(maxPts).fill(0.0);
    dp[0] = 1.0;

    let windowSum = 1.0, result = 0.0;

    for (let i = 1; i <= n; i++) {
        let prob = windowSum / maxPts;

        if (i < k) {
            windowSum += prob;
        } else {
            result += prob;
        }

        if (i >= maxPts) {
            windowSum -= dp[i % maxPts];
        }

        dp[i % maxPts] = prob;
    }

    return result;
};