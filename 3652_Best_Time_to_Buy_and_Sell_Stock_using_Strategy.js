/***
 * 3652. Best Time to Buy and Sell Stock using Strategy
 * Difficulty: Medium
 * 
 * You are given two integer arrays prices and strategy, where:

prices[i] is the price of a given stock on the ith day.
strategy[i] represents a trading action on the ith day, where:
-1 indicates buying one unit of the stock.
0 indicates holding the stock.
1 indicates selling one unit of the stock.
You are also given an even integer k, and may perform at most one modification to strategy. A modification consists of:

Selecting exactly k consecutive elements in strategy.
Set the first k / 2 elements to 0 (hold).
Set the last k / 2 elements to 1 (sell).
The profit is defined as the sum of strategy[i] * prices[i] across all days.

Return the maximum possible profit you can achieve.

Note: There are no constraints on budget or stock ownership, so all buy and sell operations are feasible regardless of past actions.

 

Example 1:

Input: prices = [4,2,8], strategy = [-1,0,1], k = 2

Output: 10

Explanation:

Modification	Strategy	Profit Calculation	Profit
Original	[-1, 0, 1]	(-1 × 4) + (0 × 2) + (1 × 8) = -4 + 0 + 8	4
Modify [0, 1]	[0, 1, 1]	(0 × 4) + (1 × 2) + (1 × 8) = 0 + 2 + 8	10
Modify [1, 2]	[-1, 0, 1]	(-1 × 4) + (0 × 2) + (1 × 8) = -4 + 0 + 8	4
Thus, the maximum possible profit is 10, which is achieved by modifying the subarray [0, 1]​​​​​​​.

Example 2:

Input: prices = [5,4,3], strategy = [1,1,0], k = 2

Output: 9

Explanation:

Modification	Strategy	Profit Calculation	Profit
Original	[1, 1, 0]	(1 × 5) + (1 × 4) + (0 × 3) = 5 + 4 + 0	9
Modify [0, 1]	[0, 1, 0]	(0 × 5) + (1 × 4) + (0 × 3) = 0 + 4 + 0	4
Modify [1, 2]	[1, 0, 1]	(1 × 5) + (0 × 4) + (1 × 3) = 5 + 0 + 3	8
Thus, the maximum possible profit is 9, which is achieved without any modification.

 

Constraints:

2 <= prices.length == strategy.length <= 105
1 <= prices[i] <= 105
-1 <= strategy[i] <= 1
2 <= k <= prices.length
k is even
 */

/**
 * Intuition
Base profit is calculated from original strategy
We can improve profit by modifying one window of size k
Modification pattern is fixed: first half → hold (0), second half → sell (1)
Need to find which window gives maximum profit gain
Use prefix sums to calculate profit change for any window in O(1)
Slide window across array to find best position
Approach
Calculate base profit: sum(strategy[i] * prices[i])
Create two arrays for profit changes:
level[i]: gain from changing to hold (0)
sell[i]: gain from changing to sell (1)
Build prefix sum arrays pre0 and pre1 for O(1) range queries
Slide window of size k across array:
First k/2 elements use level values (hold)
Last k/2 elements use sell values (sell)
Calculate total gain using prefix sums
Track maximum gain across all windows
Return base profit + maximum gain
Complexity
Time complexity: O(n)

Space complexity: O(n)
 */

/**
 * @param {number[]} prices
 * @param {number[]} strategy
 * @param {number} k
 * @return {number}
 */
var maxProfit = function(prices, strategy, k) {
    const n = prices.length;
    const half = Math.floor(k / 2);
    
    const prefixSum = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefixSum[i + 1] = prefixSum[i] + strategy[i] * prices[i];
    }
    
    let windowSum = 0;
    for (let i = half; i < k; i++) {
        windowSum += prices[i];
    }
    let maxProfit = Math.max(prefixSum[n], windowSum + prefixSum[n] - prefixSum[k]);
    
    for (let start = 1; start + k <= n; start++) {
        windowSum += prices[start + k - 1] - prices[start + half - 1];
        maxProfit = Math.max(maxProfit, windowSum + prefixSum[n] - prefixSum[start + k] + prefixSum[start]);
    }
    
    return maxProfit;
};