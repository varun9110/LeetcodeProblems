/**
 * 3100. Water Bottles II
 * Difficulty: Medium
 * 
 * You are given two integers numBottles and numExchange.

numBottles represents the number of full water bottles that you initially have. In one operation, you can perform one of the following operations:

Drink any number of full water bottles turning them into empty bottles.
Exchange numExchange empty bottles with one full water bottle. Then, increase numExchange by one.
Note that you cannot exchange multiple batches of empty bottles for the same value of numExchange. For example, if numBottles == 3 and numExchange == 1, you cannot exchange 3 empty water bottles for 3 full bottles.

Return the maximum number of water bottles you can drink.

 

Example 1:


Input: numBottles = 13, numExchange = 6
Output: 15
Explanation: The table above shows the number of full water bottles, empty water bottles, the value of numExchange, and the number of bottles drunk.
Example 2:


Input: numBottles = 10, numExchange = 3
Output: 13
Explanation: The table above shows the number of full water bottles, empty water bottles, the value of numExchange, and the number of bottles drunk.
 

Constraints:

1 <= numBottles <= 100 
1 <= numExchange <= 100
 */

/**
 * Approach
This is a twist on the classic water bottles problem - the exchange rate increases each time! Each exchange requires more empty bottles than the previous one.

The key insight is greedy simulation:

Start by drinking all initial bottles
Keep exchanging as long as we have enough empty bottles
After each exchange, the cost increases by 1
Track empty bottles carefully: use some for exchange, get 1 back
Think of it like an escalating cost system where each trade gets more expensive!
 */

/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var maxBottlesDrunk = function(numBottles, numExchange) {
    let drank = numBottles;
    let empty = numBottles;
    
    while (empty >= numExchange) {
        empty -= numExchange;    
        drank += 1;              
        empty++;                
        numExchange++;           
    }
    
    return drank;
};