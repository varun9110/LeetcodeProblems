/**
 * 1475. Final Prices With a Special Discount in a Shop
 * Difficulty : Easy
 * 
 * You are given an integer array prices where prices[i] is the price of the ith item in a shop.
There is a special discount for items in the shop. If you buy the ith item, then you will receive a discount equivalent to prices[j] 
where j is the minimum index such that j > i and prices[j] <= prices[i]. Otherwise, you will not receive any discount at all.
Return an integer array answer where answer[i] is the final price you will pay for the ith item of the shop, considering the special discount.

Example 1:
Input: prices = [8,4,6,2,3]
Output: [4,2,4,2,3]
Explanation: 
For item 0 with price[0]=8 you will receive a discount equivalent to prices[1]=4, therefore, the final price you will pay is 8 - 4 = 4.
For item 1 with price[1]=4 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 4 - 2 = 2.
For item 2 with price[2]=6 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 6 - 2 = 4.
For items 3 and 4 you will not receive any discount at all.
Example 2:
Input: prices = [1,2,3,4,5]
Output: [1,2,3,4,5]
Explanation: In this case, for all items, you will not receive any discount at all.
Example 3:
Input: prices = [10,1,1,6]
Output: [9,0,1,6]

Constraints:
1 <= prices.length <= 500
1 <= prices[i] <= 1000
 */

/**
 * Monostack Problems

Monostack problems are problems that utilize monotonic stacks (stack with specific condtions) to find the solution.

Algorithm

We start with an empty array to act as our stack.
The for loop scans the elements from the input back to front. We use the stack to store numbers we have seen and pop off numbers that don't satisfy our condition 
(greater than our current price).
When we finish visiting the items in our stack and removing the greater items, we return the current price - item at the top of the stack as our result or 
current price if the stack is empty.
The number at the top of our stack is the next lower price.
There are n elements in total, each element is pushed into the stack once, and it will be popped once at most, without any redundant operation. 
So the total calculation scale is proportional to the element scale n, which is the complexity of O(n).
 */


var finalPrices = function(prices) {
    const stack = [];
    const result = [];
    for (let i = prices.length - 1; i >= 0; i -= 1) {
        while (stack.length && stack[stack.length - 1] > prices[i]) {
            stack.pop();
        }
        result[i] = stack.length === 0 ? prices[i] : prices[i] - stack[stack.length - 1];
        stack.push(prices[i]);
    }
    return result;
};