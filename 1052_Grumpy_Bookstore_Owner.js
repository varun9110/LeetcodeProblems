/**
 * 1052. Grumpy Bookstore Owner
 * Difficulty: Medium
 * 
 * There is a bookstore owner that has a store open for n minutes. Every minute, some number of customers enter the store. 
 * You are given an integer array customers of length n where customers[i] is the number of the customer that enters the store at 
 * the start of the ith minute and all those customers leave after the end of that minute.

On some minutes, the bookstore owner is grumpy. You are given a binary array grumpy where grumpy[i] is 1 if the bookstore owner 
is grumpy during the ith minute, and is 0 otherwise.

When the bookstore owner is grumpy, the customers of that minute are not satisfied, otherwise, they are satisfied.
The bookstore owner knows a secret technique to keep themselves not grumpy for minutes consecutive minutes, but can only use it once.
Return the maximum number of customers that can be satisfied throughout the day.

Example 1:
Input: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3
Output: 16
Explanation: The bookstore owner keeps themselves not grumpy for the last 3 minutes. 
The maximum number of customers that can be satisfied = 1 + 1 + 1 + 1 + 7 + 5 = 16.
Example 2:
Input: customers = [1], grumpy = [0], minutes = 1
Output: 1

Constraints:
n == customers.length == grumpy.length
1 <= minutes <= n <= 2 * 104
0 <= customers[i] <= 1000
grumpy[i] is either 0 or 1.
 */

/**
 * Intuition
The problem involves maximizing customer satisfaction in a bookstore where the owner can control their grumpiness for a consecutive number of minutes. 
The key challenge is to decide when to use this "non-grumpy" period to maximize the number of satisfied customers.

Approach
Initialize Variables:

initialSatisfaction: Sum of customers during non-grumpy minutes.
maxExtraSatisfaction: Maximum additional satisfaction we can get using the non-grumpy technique.
Calculate Initial Satisfaction:

Iterate over the customers array and add customers where the owner is not grumpy.
Sliding Window to Find Maximum Extra Satisfaction:

Initialize currentWindowSatisfaction to calculate the satisfaction within the first minutes window where the owner would otherwise be grumpy.
Use the sliding window technique to move through the customers array and update the currentWindowSatisfaction for each position.
Track the maximum satisfaction obtained in any window.
Combine Both Results:

The final result is the sum of initialSatisfaction and maxExtraSatisfaction.
Complexity
Time Complexity: O(n)
Calculating the initial satisfaction takes O(n).
The sliding window to find the maximum extra satisfaction also takes O(n).
Space Complexity: O(1)
We use a constant amount of extra space for variables.
 */

/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} minutes
 * @return {number}
 */
var maxSatisfied = function(customers, grumpy, minutes) {
    let initialSatisfaction = 0;
    let maxExtraSatisfaction = 0;
    let currentWindowSatisfaction = 0;
    
    for (let i = 0; i < customers.length; i++) {
        if (grumpy[i] === 0) {
            initialSatisfaction += customers[i];
        } else if (i < minutes) {
            currentWindowSatisfaction += customers[i];
        }
    }
    
    maxExtraSatisfaction = currentWindowSatisfaction;
    
    for (let i = minutes; i < customers.length; i++) {
        currentWindowSatisfaction += customers[i] * grumpy[i];
        currentWindowSatisfaction -= customers[i - minutes] * grumpy[i - minutes];
        maxExtraSatisfaction = Math.max(maxExtraSatisfaction, currentWindowSatisfaction);
    }
    
    return initialSatisfaction + maxExtraSatisfaction;
};