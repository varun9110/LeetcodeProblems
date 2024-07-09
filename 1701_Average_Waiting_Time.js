/**
 * 1701. Average Waiting Time
 * Difficulty: Medium
 * 
 * There is a restaurant with a single chef. You are given an array customers, where customers[i] = [arrivali, timei]:

arrivali is the arrival time of the ith customer. The arrival times are sorted in non-decreasing order.
timei is the time needed to prepare the order of the ith customer.
When a customer arrives, he gives the chef his order, and the chef starts preparing it once he is idle. The customer waits till the chef finishes preparing his order. 
The chef does not prepare food for more than one customer at a time. The chef prepares food for customers in the order they were given in the input.

Return the average waiting time of all customers. Solutions within 10-5 from the actual answer are considered accepted.

 

Example 1:

Input: customers = [[1,2],[2,5],[4,3]]
Output: 5.00000
Explanation:
1) The first customer arrives at time 1, the chef takes his order and starts preparing it immediately at time 1, and finishes at time 3, 
so the waiting time of the first customer is 3 - 1 = 2.
2) The second customer arrives at time 2, the chef takes his order and starts preparing it at time 3, and finishes at time 8, 
so the waiting time of the second customer is 8 - 2 = 6.
3) The third customer arrives at time 4, the chef takes his order and starts preparing it at time 8, and finishes at time 11, 
so the waiting time of the third customer is 11 - 4 = 7.
So the average waiting time = (2 + 6 + 7) / 3 = 5.
Example 2:

Input: customers = [[5,2],[5,4],[10,3],[20,1]]
Output: 3.25000
Explanation:
1) The first customer arrives at time 5, the chef takes his order and starts preparing it immediately at time 5, and finishes at time 7, 
so the waiting time of the first customer is 7 - 5 = 2.
2) The second customer arrives at time 5, the chef takes his order and starts preparing it at time 7, and finishes at time 11, 
so the waiting time of the second customer is 11 - 5 = 6.
3) The third customer arrives at time 10, the chef takes his order and starts preparing it at time 11, and finishes at time 14, 
so the waiting time of the third customer is 14 - 10 = 4.
4) The fourth customer arrives at time 20, the chef takes his order and starts preparing it immediately at time 20, and finishes at time 21, 
so the waiting time of the fourth customer is 21 - 20 = 1.
So the average waiting time = (2 + 6 + 4 + 1) / 4 = 3.25.
 
Constraints:
1 <= customers.length <= 105
1 <= arrivali, timei <= 104
arrivali <= arrivali+1
 */

/**
 *  Intuition
The first thing I asked myself is how would I do it if I were this chef? When every customer arrives there's two options:
I am now cooking other order so I'll start this as soon as I do all others.
I am idle now so I imediately start this order
We can actualy go through array of customers every time updating variable that keeps time when we'll finish 
previous order (and so by this time we'll already finished all others)
We're starting prepare first order as soon as first customer arrive (so for first customer waiting time is time_for_cooking_customer_order)
For every customer we want to start cook his dish at MAX between time he arrived and time we finish all other orders. 
If we finish all orders by time 5 and customer arrived at time 6 - well, we start cook his order at time six, 
if we finish all orders by time 6 and customer arrived at time 5 - well, we start cook his order at time 5.
 Coding
Initialize n with the length of the customers list, representing the number of customers.
Initialize time_waiting with the cooking time of the first customer.
Initialize finished_prev with the sum of the arrival time and cooking time of the first customer, representing the time the first dish is finished.
Start a loop that iterates through the rest of the customers, starting from the second customer. In the loop:
Calculate the start cooking time as the maximum of the current customer's arrival time and the time the previous dish finished.
Calculate the end time of the current dish by adding the cooking time to the start cooking time.
Update finished_prev to the current dish's end time (we know for sure that before we started this dish we finished all others, 
so every time we use finished_prev we know we finish all previous orders).
Add the waiting time for the current customer (end time - arrival time) to time_waiting.
Return the average waiting time by dividing the total waiting time by the number of customers.
 Complexity Analysis
 Time complexity: O(n), since we ho through each element in customers once
 Space complexity: O(1), since no extra space is used
 */

var averageWaitingTime = function (customers) {
    let n = customers.length;
    let time_waiting = customers[0][1];
    let finished_prev = customers[0][0] + customers[0][1];

    for (let customer_ind = 1; customer_ind < n; ++customer_ind) {
        let times = customers[customer_ind];
        let arrive = times[0];

        let start_cook = Math.max(arrive, finished_prev);
        let end_time = start_cook + times[1];
        finished_prev = end_time;
        time_waiting += end_time - arrive;
    }

    return time_waiting / n;
};