/**
 * 983. Minimum Cost For Tickets
 * Difficulty: Medium
 * 
 * You have planned some train traveling one year in advance. The days of the year in which you will travel are given as an integer array days. 
 * Each day is an integer from 1 to 365.

Train tickets are sold in three different ways:

a 1-day pass is sold for costs[0] dollars,
a 7-day pass is sold for costs[1] dollars, and
a 30-day pass is sold for costs[2] dollars.
The passes allow that many days of consecutive travel.

For example, if we get a 7-day pass on day 2, then we can travel for 7 days: 2, 3, 4, 5, 6, 7, and 8.
Return the minimum number of dollars you need to travel every day in the given list of days.

 

Example 1:

Input: days = [1,4,6,7,8,20], costs = [2,7,15]
Output: 11
Explanation: For example, here is one way to buy passes that lets you travel your travel plan:
On day 1, you bought a 1-day pass for costs[0] = $2, which covered day 1.
On day 3, you bought a 7-day pass for costs[1] = $7, which covered days 3, 4, ..., 9.
On day 20, you bought a 1-day pass for costs[0] = $2, which covered day 20.
In total, you spent $11 and covered all the days of your travel.
Example 2:

Input: days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]
Output: 17
Explanation: For example, here is one way to buy passes that lets you travel your travel plan:
On day 1, you bought a 30-day pass for costs[2] = $15 which covered days 1, 2, ..., 30.
On day 31, you bought a 1-day pass for costs[0] = $2 which covered day 31.
In total, you spent $17 and covered all the days of your travel.
 

Constraints:

1 <= days.length <= 365
1 <= days[i] <= 365
days is in strictly increasing order.
costs.length == 3
1 <= costs[i] <= 1000
 */

/**
 * Intuition
The goal is to minimize the cost for traveling on specific days given the available ticket options. 
We need to keep track of the minimum cost for each day based on the available tickets and the travel days provided.

Approach
We maintain a dp array where each index represents the minimum cost to travel up to that day.
We iterate through each day and check if it’s a travel day.
If it is, we calculate the minimum cost using three types of passes (1-day, 7-day, 30-day) and update the dp array accordingly.
The final answer is stored in dp[365], which represents the minimum cost to cover all travel days.
Complexity
Time complexity: O(n), where n is the number of days in the input list (since we iterate through all 365 days).
Space complexity: O(n), where n is the size of the dp array (365 elements).
 */

/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function(days, costs) {
    let dp = new Array(366).fill(0);
        let travelDays = new Set(days);

        for (let day = 1; day <= 365; day++) {
            if (!travelDays.has(day)) {
                dp[day] = dp[day - 1];
            } else {
                dp[day] = Math.min(dp[day - 1] + costs[0], 
                                   Math.min(dp[Math.max(0, day - 7)] + costs[1], 
                                            dp[Math.max(0, day - 30)] + costs[2]));
            }
        }

        return dp[365];
};