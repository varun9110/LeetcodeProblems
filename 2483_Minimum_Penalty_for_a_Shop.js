/**
 * 2483. Minimum Penalty for a Shop
 * Difficulty: Medium
 * 
 * You are given the customer visit log of a shop represented by a 0-indexed string customers consisting only of characters 'N' and 'Y':

if the ith character is 'Y', it means that customers come at the ith hour
whereas 'N' indicates that no customers come at the ith hour.
If the shop closes at the jth hour (0 <= j <= n), the penalty is calculated as follows:

For every hour when the shop is open and no customers come, the penalty increases by 1.
For every hour when the shop is closed and customers come, the penalty increases by 1.
Return the earliest hour at which the shop must be closed to incur a minimum penalty.

Note that if a shop closes at the jth hour, it means the shop is closed at the hour j.

 

Example 1:

Input: customers = "YYNY"
Output: 2
Explanation: 
- Closing the shop at the 0th hour incurs in 1+1+0+1 = 3 penalty.
- Closing the shop at the 1st hour incurs in 0+1+0+1 = 2 penalty.
- Closing the shop at the 2nd hour incurs in 0+0+0+1 = 1 penalty.
- Closing the shop at the 3rd hour incurs in 0+0+1+1 = 2 penalty.
- Closing the shop at the 4th hour incurs in 0+0+1+0 = 1 penalty.
Closing the shop at 2nd or 4th hour gives a minimum penalty. Since 2 is earlier, the optimal closing time is 2.
Example 2:

Input: customers = "NNNNN"
Output: 0
Explanation: It is best to close the shop at the 0th hour as no customers arrive.
Example 3:

Input: customers = "YYYY"
Output: 4
Explanation: It is best to close the shop at the 4th hour as customers arrive at each hour.
 

Constraints:

1 <= customers.length <= 105
customers consists only of characters 'Y' and 'N'.
 */

/**
 * Algorithm
Let's see an example:

We want to find if closing the shop (ex at 0th index) is a good idea or not:

anigif.gif

The customer Y that comes after the shop closes will cost us +1 penalty per customer.

However, N will cost us +0 penalty per customer.

SO the current penalty at 0 is 5, because we lose 5 potential customers after we closed the shop!

vlcsnap-2025-12-26-10h05m55s918.png

Since we want to find the minimum penalty, we will iterate the entire array to find the global minimum.

Next, let's move to the next index:

2.png

SO, anytime a customer is inside the store (Y), they give us 0 penalty (we're open when they arrive). However, N will give us +1 penalty because we opened the shop and no one arrives.

Basically we "flip" the worth of Y and N before and after we close the shop.

anigif.gif

How do we track this?
Instead of recalculating the full penalty every time, we use a trick: track the penalty change as we move forward.

When we move from closing at hour i to closing at hour i+1:

If we see Y:

Before: shop was closed, customer came → penalty was +1
After: shop is open, customer came → penalty is 0
Change: −1 (penalty decreases!)
If we see N:

Before: shop was closed, no customer → penalty was 0
After: shop is open, no customer → penalty is +1
Change: +1 (penalty increases!)
SO we just keep a running sum called prefix:

prefix=prefix+{ 
−1
+1
​
  
if Y
if N
​
 
​
 
Whenever prefix hits a new minimum (most negative), we found a better closing time!

Time Complexity: O(n)
Space Complexity: O(1)
 */

/**
 * @param {string} customers
 * @return {number}
 */
var bestClosingTime = function(customers) {
    let bestTime = 0;
    let minPenalty = 0;
    let prefix = 0;
    
    for (let i = 0; i < customers.length; i++) {
        prefix += customers[i] === 'Y' ? -1 : 1;
        
        if (prefix < minPenalty) {
            bestTime = i + 1;
            minPenalty = prefix;
        }
    }
    
    return bestTime;
};