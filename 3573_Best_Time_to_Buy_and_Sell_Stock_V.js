/**
 * 3573. Best Time to Buy and Sell Stock V
 * Difficulty: Medium
 * 
 * You are given an integer array prices where prices[i] is the price of a stock in dollars on the ith day, and an integer k.

You are allowed to make at most k transactions, where each transaction can be either of the following:

Normal transaction: Buy on day i, then sell on a later day j where i < j. You profit prices[j] - prices[i].

Short selling transaction: Sell on day i, then buy back on a later day j where i < j. You profit prices[i] - prices[j].

Note that you must complete each transaction before starting another. Additionally, you can't buy or sell on the same day you are selling or buying back as part of a previous transaction.

Return the maximum total profit you can earn by making at most k transactions.

 

Example 1:

Input: prices = [1,7,9,8,2], k = 2

Output: 14

Explanation:

We can make $14 of profit through 2 transactions:
A normal transaction: buy the stock on day 0 for $1 then sell it on day 2 for $9.
A short selling transaction: sell the stock on day 3 for $8 then buy back on day 4 for $2.
Example 2:

Input: prices = [12,16,19,19,8,1,19,13,9], k = 3

Output: 36

Explanation:

We can make $36 of profit through 3 transactions:
A normal transaction: buy the stock on day 0 for $12 then sell it on day 2 for $19.
A short selling transaction: sell the stock on day 3 for $19 then buy back on day 4 for $8.
A normal transaction: buy the stock on day 5 for $1 then sell it on day 6 for $19.
 

Constraints:

2 <= prices.length <= 103
1 <= prices[i] <= 109
1 <= k <= prices.length / 2
 */

/**
 * Intuition
Stock market allows two ways to profit:
Normal: Buy cheap, sell expensive (upward price movement)
Short: Sell expensive, buy cheap (downward price movement)
Track three states for each transaction:
maxProfit: Maximum profit after completing the transaction
buyHold: Maximum profit while holding stock (bought for normal transaction)
sellHold: Maximum profit while holding position (sold for short transaction)
For each day and transaction, update all three states
Must skip a day after completing transaction (cooldown period)
Approach
Use 2D Dynamic Programming with optimized space
Create dp array where dp[trans] stores state for transaction trans:
dp[trans].maxProfit: Max profit after completing trans transactions
dp[trans].buyHold: Max profit holding stock for transaction trans (normal)
dp[trans].sellHold: Max profit holding position for transaction trans (short)
Initialize day 0:
For all transactions: buyHold = -firstPrice, sellHold = +firstPrice
For each day from 1 to n-1:
For each transaction from k down to 1:
Update maxProfit: max of current profit, completing buy (buyHold + currPrice), completing sell (sellHold - currPrice)
Update buyHold: max of current buyHold, starting new buy (prevProfit - currPrice)
Update sellHold: max of current sellHold, starting new sell (prevProfit + currPrice)
Iterate backwards through transactions to avoid using updated values
Return dp[k].maxProfit as final answer
Complexity
Time complexity: O(n⋅k)

Space complexity: O(k)
 */

/**
 * @param {number[]} prices
 * @param {number} k
 * @return {number}
 */
var maximumProfit = function(prices, k) {
    const firstPrice = prices[0];
    const dp = Array(k + 1).fill(null).map(() => ({
        maxProfit: 0,
        buyHold: -firstPrice,
        sellHold: firstPrice
    }));
    const n = prices.length;
    
    for (let day = 1; day < n; day++) {
        const currPrice = prices[day];
        for (let trans = k; trans > 0; trans--) {
            const prevProfit = dp[trans - 1].maxProfit;
            dp[trans].maxProfit = Math.max(dp[trans].maxProfit, dp[trans].buyHold + currPrice, dp[trans].sellHold - currPrice);
            dp[trans].buyHold = Math.max(dp[trans].buyHold, prevProfit - currPrice);
            dp[trans].sellHold = Math.max(dp[trans].sellHold, prevProfit + currPrice);
        }
    }
    
    return dp[k].maxProfit;
};