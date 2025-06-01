/**
 * 2929. Distribute Candies Among Children II
 * Difficulty: Medium
 * 
 * You are given two positive integers n and limit.

Return the total number of ways to distribute n candies among 3 children such that no child gets more than limit candies.


Example 1:

Input: n = 5, limit = 2
Output: 3
Explanation: There are 3 ways to distribute 5 candies such that no child gets more than 2 candies: (1, 2, 2), (2, 1, 2) and (2, 2, 1).
Example 2:

Input: n = 3, limit = 3
Output: 10
Explanation: There are 10 ways to distribute 3 candies such that no child gets more than 3 candies: (0, 0, 3), (0, 1, 2), (0, 2, 1), (0, 3, 0), (1, 0, 2), (1, 1, 1), (1, 2, 0), (2, 0, 1), (2, 1, 0) and (3, 0, 0).
 

Constraints:

1 <= n <= 106
1 <= limit <= 106
 */


/**
Intuition
Iterate over the possible number of candies for one child (i), and then calculate the number of ways to distribute the remaining candies to the other two children (j and n - i - j), while satisfying the condition that no child gets more than limit candies.
JavaScript Solution to Distribute Candies Among Children II Beats 100% of Users in Runtime and Memory

Approach
We use a simple for loop to iterate over the possible number of candies for one child (i).
For each value of i, we calculate the minimum and maximum number of candies that the second child can get (jMin and jMax).
We then calculate the number of ways to distribute the remaining candies to the third child (n - i - j), while satisfying the condition that no child gets more than limit candies.
We do this by subtracting jMin and jMax from n - i - j, and adding 1.
We then add the number of ways to distribute the candies for the current value of i to the total number of ways.
Complexity
Time complexity:
The time complexity of the approach is O(n * limit).
This is because the for loop iterates up to n times, and the calculation of jMin, jMax, and numWaysForI takes O(limit) time.
Space complexity:
The space complexity of the approach is O(1).
This is because we only need to store a few variables, such as totalWays, i, jMin, jMax, and numWaysForI.

 */


/**
 * @param {number} n
 * @param {number} limit
 * @return {number}
 */
var distributeCandies = function(n, limit) {
 
    let totalWays = 0;
    // Total number of ways to distribute candies
  
    for (let i = 0; i <= Math.min(limit, n); i++) {
    // Iterate over the possible number of candies for one child
  
      const jMin = Math.max(0, n - i - limit);
      // Minimum number of candies that the second child can get
  
      const jMax = Math.min(limit, n - i);
      // Maximum number of candies that the second child can get
  
      const numWaysForI = Math.max(jMax - jMin + 1, 0);
      // Number of ways to distribute the remaining candies to the third child
  
      totalWays += numWaysForI;
      // Add the number of ways to distribute the candies for the current i to the total number of ways
  
    }
    return totalWays;
    // Return the total number of ways to distribute the candies
  
  }
  