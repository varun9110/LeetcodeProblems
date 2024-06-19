/**
 * 1482. Minimum Number of Days to Make m Bouquets
 * Difficulty: Medium
 * 
 * You are given an integer array bloomDay, an integer m and an integer k.

You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.

The garden consists of n flowers, the ith flower will bloom in the bloomDay[i] and then can be used in exactly one bouquet.

Return the minimum number of days you need to wait to be able to make m bouquets from the garden. If it is impossible to make m bouquets return -1.

 

Example 1:

Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: Let us see what happened in the first three days. x means flower bloomed and _ means flower did not bloom in the garden.
We need 3 bouquets each should contain 1 flower.
After day 1: [x, _, _, _, _]   // we can only make one bouquet.
After day 2: [x, _, _, _, x]   // we can only make two bouquets.
After day 3: [x, _, x, _, x]   // we can make 3 bouquets. The answer is 3.
Example 2:

Input: bloomDay = [1,10,3,10,2], m = 3, k = 2
Output: -1
Explanation: We need 3 bouquets each has 2 flowers, that means we need 6 flowers. We only have 5 flowers so it is impossible to get the needed 
bouquets and we return -1.
Example 3:

Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
Output: 12
Explanation: We need 2 bouquets each should have 3 flowers.
Here is the garden after the 7 and 12 days:
After day 7: [x, x, x, x, _, x, x]
We can make one bouquet of the first three flowers that bloomed. We cannot make another bouquet from the last three flowers that bloomed 
because they are not adjacent.
After day 12: [x, x, x, x, x, x, x]
It is obvious that we can make two bouquets in different ways.
 

Constraints:

bloomDay.length == n
1 <= n <= 105
1 <= bloomDay[i] <= 109
1 <= m <= 106
1 <= k <= n
 */




/** 
 * Brute force approach
 */


const findMinimumDaysToBloom = (bloomDay) => {
    let map = {};

    for(let i=0; i<bloomDay.length; i++){
        if(bloomDay[i]!==0 && map[bloomDay[i]]===undefined){
            map[bloomDay[i]]=1;
        }
    }

    return Object.keys(map).sort((a,b) => a-b)[0]
};

var minDays = function(bloomDay, m, k) {
    if(m*k > bloomDay.length){
        return -1
    }
    let days = 0;
    while(m>0){
        let min = Number(findMinimumDaysToBloom(bloomDay));
        days = days+min;
        for(let i=0; i<bloomDay.length; i++){
            if(bloomDay[i]>0){
                bloomDay[i] = bloomDay[i]-min;
            }
        }


        let i=0;
        while(i<bloomDay.length){
            if(bloomDay[i]===0){
                let adjacentFlowers = true;
                for(let j=i; j<i+k; j++){
                    if(bloomDay[j]!==0){
                        adjacentFlowers=false;
                        i = j;
                        break;
                    }
                }
                if(adjacentFlowers){
                    bloomDay.splice(i, k);
                    i = i-k
                    m--;
                }
            }
            i++;
        }
    }

    return days;
};


/**
 * Refined Approach:
 * 
 * Use the binary search to check at which day do can we reach the required number of bouquets;
 * 
 * Video : https://youtu.be/4gR2FmfxViQ
 * 
 * Approach
Initial Check:

If m * k exceeds the length of the bloomDay array, it's impossible to make m bouquets, so return -1.
Binary Search Setup:

Use binary search to determine the minimum number of days required.
Initialize low to 1 (the minimum possible day) and high to (10^9) (the maximum possible day given the constraints).
Binary Search Execution:

While low is less than high, calculate the middle value (mid).
Use the helper function isPossibleBouquets to check if it's possible to make m bouquets within mid days.
If possible, adjust high to mid.
Otherwise, adjust low to mid + 1.
Helper Function (isPossibleBouquets):

Iterate through the bloomDay array, counting consecutive flowers that have bloomed on or before the given day.
Track the number of valid bouquets formed.
Return true if the required number of bouquets (m) can be formed, otherwise false.
Step by Step Explanation
Example:

Input: bloomDay = [1, 10, 3, 10, 2], m = 3, k = 1
Output: 3
We need to make 3 bouquets, each containing 1 adjacent flower. Here’s how we can approach the problem:

Steps
Binary Search Setup:

We use binary search to find the minimum number of days. We initialize low to 1 (minimum possible day) and high to the maximum value in bloomDay.
Helper Function - canMakeBouquets:

This function checks if we can make m bouquets in a given number of days (day). It iterates through bloomDay and counts the number of flowers that can be used to make bouquets.
Binary Search Process:

We perform binary search by calculating the middle day (mid). We then use canMakeBouquets to check if we can make the required bouquets in mid days.
If we can make the bouquets, we search in the left half (days fewer than mid).
If we cannot make the bouquets, we search in the right half (days more than mid).
Tables for Better Understanding
Binary Search Table:

Iteration	low	high	mid	Can Make Bouquets in mid days?	Update low or high
1	1	10	5	Yes	high = mid (5)
2	1	5	3	Yes	high = mid (3)
3	1	3	2	No	low = mid + 1 (3)
Helper Function Table (canMakeBouquets):

Day (mid)	Flower	Can Use Flower?	Bouquets Formed	Total Bouquets
3	1	Yes	1	1
3	10	No	0	1
3	3	Yes	1	2
3	10	No	0	2
3	2	Yes	1	3
Complexity
Time Complexity:

The binary search runs in O(log(max_day)), where max_day is (10^9).
The isPossibleBouquets function runs in (O(n), where n is the length of the bloomDay array.
Overall time complexity is (O(n log(max_day))).
Space Complexity:

The space complexity is O(1) as we are not using any additional data structures that scale with input size.
 */

/**
 * @param {number[]} bloomDay
 * @param {number} m
 * @param {number} k
 * @return {number}
 */

var minDays = function(bloomDay, m, k) {
    if (m * k > bloomDay.length) {
        return -1;
    }

    const canMakeBouquets = (bloomDay, m, k, day) => {
        let total = 0;
        let flowers = 0;
        for (let b of bloomDay) {
            if (b <= day) {
                flowers++;
                if (flowers == k) {
                    total++;
                    flowers = 0;
                }
            } else {
                flowers = 0;
            }
            if (total >= m) {
                return true;
            }
        }
        return false;
    };

    let low = 1, high = Math.max(...bloomDay);
    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        if (canMakeBouquets(bloomDay, m, k, mid)) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    return low;
};