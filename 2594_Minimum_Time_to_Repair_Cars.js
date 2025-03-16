/**
 * 2594. Minimum Time to Repair Cars
 * Difficulty: Medium
 * 
 * You are given an integer array ranks representing the ranks of some mechanics. ranksi is the rank of the ith mechanic. 
 * A mechanic with a rank r can repair n cars in r * n2 minutes.

You are also given an integer cars representing the total number of cars waiting in the garage to be repaired.

Return the minimum time taken to repair all the cars.

Note: All the mechanics can repair the cars simultaneously.


Example 1:
Input: ranks = [4,2,3,1], cars = 10
Output: 16
Explanation: 
- The first mechanic will repair two cars. The time required is 4 * 2 * 2 = 16 minutes.
- The second mechanic will repair two cars. The time required is 2 * 2 * 2 = 8 minutes.
- The third mechanic will repair two cars. The time required is 3 * 2 * 2 = 12 minutes.
- The fourth mechanic will repair four cars. The time required is 1 * 4 * 4 = 16 minutes.
It can be proved that the cars cannot be repaired in less than 16 minutes.​​​​​
Example 2:
Input: ranks = [5,1,8], cars = 6
Output: 16
Explanation: 
- The first mechanic will repair one car. The time required is 5 * 1 * 1 = 5 minutes.
- The second mechanic will repair four cars. The time required is 1 * 4 * 4 = 16 minutes.
- The third mechanic will repair one car. The time required is 8 * 1 * 1 = 8 minutes.
It can be proved that the cars cannot be repaired in less than 16 minutes.​​​​​
 

Constraints:

1 <= ranks.length <= 105
1 <= ranks[i] <= 100
1 <= cars <= 106
 */


/**
 * Intuition
We need to find the minimum time required to repair all cars using multiple mechanics with different ranks.

A mechanic with rank r takes r × x² time to repair x cars.
The goal is to distribute cars optimally so that the total repair time is minimized.
Instead of manually assigning cars to mechanics, we use Binary Search on Time to efficiently find the minimum possible time.

Approach
Define the Search Space

Minimum time = The best (lowest-ranked) mechanic repairing one car → min(ranks) * 1 * 1
Maximum time = The worst (highest-ranked) mechanic repairing all cars → max(ranks) * cars * cars
We search between this range using Binary Search.
Binary Search on Time

Pick a midpoint (guessTime) and check if we can repair all cars within that time.
If possible, try to reduce the time (r = guessTime - 1).
If not possible, increase the time (l = guessTime + 1).
Check Feasibility (isGood Function)
If the total number of repaired cars is greater than or equal to cars, then guessTime is valid.

PLEASE UPVOTE IF IT HELPS ⬆️ ✅

Complexity
Time complexity:
O(n log(maxTime))

Space complexity:
 */

/**
 * @param {number[]} ranks
 * @param {number} cars
 * @return {number}
 */
var repairCars = function(ranks, cars) {
    let res = Infinity;
    let l = Math.min(...ranks);
    let r = Math.max(...ranks) * cars * cars;

    while (l <= r) {
        let guessTime = Math.floor((l + r) / 2);
        
        if (isGood(ranks, guessTime, cars)) {
            res = guessTime;
            r = guessTime - 1;
        } else {
            l = guessTime + 1;
        }
    }

    return res;
};

function isGood(ranks, max, cars) {
    let count = 0;

    for (let i = 0; i < ranks.length; i++) {
        let temp = Math.floor(max / ranks[i]);
        count += Math.floor(Math.sqrt(temp));
        if (count >= cars) return true;
    }
    return false;
}