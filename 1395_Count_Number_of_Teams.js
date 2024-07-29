/**
 * 1395. Count Number of Teams
 * Difficulty: Medium
 * 
 * There are n soldiers standing in a line. Each soldier is assigned a unique rating value.

You have to form a team of 3 soldiers amongst them under the following rules:

Choose 3 soldiers with index (i, j, k) with rating (rating[i], rating[j], rating[k]).
A team is valid if: (rating[i] < rating[j] < rating[k]) or (rating[i] > rating[j] > rating[k]) where (0 <= i < j < k < n).
Return the number of teams you can form given the conditions. (soldiers can be part of multiple teams).

 

Example 1:

Input: rating = [2,5,3,4,1]
Output: 3
Explanation: We can form three teams given the conditions. (2,3,4), (5,4,1), (5,3,1). 
Example 2:

Input: rating = [2,1,3]
Output: 0
Explanation: We can't form any team given the conditions.
Example 3:

Input: rating = [1,2,3,4]
Output: 4
 

Constraints:

n == rating.length
3 <= n <= 1000
1 <= rating[i] <= 105
All the integers in rating are unique.
 */


/**
 * Binary Index Tree
Intuition
The problem asks us to count the number of valid teams of three soldiers that can be formed from a line of soldiers, where each soldier has a unique rating. A valid team must satisfy either an ascending or descending order of ratings, and the soldiers must be in the correct order in the line.

The key insight is that for each soldier, we need to count how many valid pairs of soldiers we can form with this soldier as the middle element. This means we need to find:

For ascending order: How many soldiers to the left have a lower rating, and how many to the right have a higher rating.
For descending order: How many soldiers to the left have a higher rating, and how many to the right have a lower rating.
The product of these two counts will give us the number of valid teams for each soldier as the middle element. Summing this for all soldiers will give us the total number of valid teams.

Approach
Preprocessing:

Create a list of Soldier objects, each containing the rating and original index.
Sort this list based on the ratings.
Create an index map that maps each soldier's original index to their position in the sorted list.
Counting Teams:

Use a Binary Indexed Tree (BIT) or Fenwick Tree to efficiently count the number of soldiers with ratings less than or greater than a given rating.
Iterate through the soldiers in their original order.
For each soldier, count the number of valid teams they can form as the middle element, both for ascending and descending order.
Binary Indexed Tree (BIT):

Use a BIT to perform efficient range sum queries and updates.
This allows us to count the number of soldiers with ratings less than or greater than a given rating in logarithmic time.
 */


/**
 * @param {number[]} rating
 * @return {number}
 */
var numTeams = function(rating) {
    const n = rating.length;
    if (n < 3) return 0;
    
    const soldiers = rating.map((r, i) => [r, i]).sort((a, b) => a[0] - b[0]);
    const indexMap = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        indexMap[soldiers[i][1]] = i;
    }
    
    const countTeams = (ascending) => {
        const bit = new Array(n + 1).fill(0);
        let teams = 0;
        
        for (let i = 0; i < n; i++) {
            const rank = indexMap[i] + 1;
            const left = ascending ? getSum(bit, rank - 1) : getSum(bit, n) - getSum(bit, rank);
            const right = ascending ? n - rank - (getSum(bit, n) - getSum(bit, rank)) : rank - 1 - getSum(bit, rank - 1);
            teams += left * right;
            update(bit, rank, 1);
        }
        
        return teams;
    };
    
    const update = (bit, index, val) => {
        while (index < bit.length) {
            bit[index] += val;
            index += index & (-index);
        }
    };
    
    const getSum = (bit, index) => {
        let sum = 0;
        while (index > 0) {
            sum += bit[index];
            index -= index & (-index);
        }
        return sum;
    };
    
    return countTeams(true) + countTeams(false);
};