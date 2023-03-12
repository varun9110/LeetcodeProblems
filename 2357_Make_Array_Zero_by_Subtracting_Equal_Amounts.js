/**
 * 2357. Make Array Zero by Subtracting Equal Amounts
 * Difficulty: Easy
 * 
 * You are given a non-negative integer array nums. In one operation, you must:
Choose a positive integer x such that x is less than or equal to the smallest non-zero element in nums.
Subtract x from every positive element in nums.
Return the minimum number of operations to make every element in nums equal to 0.

Example 1:
Input: nums = [1,5,0,3,5]
Output: 3
Explanation:
In the first operation, choose x = 1. Now, nums = [0,4,0,2,4].
In the second operation, choose x = 2. Now, nums = [0,2,0,0,2].
In the third operation, choose x = 2. Now, nums = [0,0,0,0,0].

Example 2:
Input: nums = [0]
Output: 0
Explanation: Each element in nums is already 0 so no operations are needed.

Constraints:
1 <= nums.length <= 100
0 <= nums[i] <= 100
*/

/**
 * Approach:
 * basically the logic wants us to check the distinct numbers in the array except 0;
 * so count that user mapper object  or set and return the answer
 * O(n)
 */

var minimumOperations = function (nums) {
  let mapper = {};
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0 && !mapper[nums[i]]) {
      count++;
      mapper[nums[i]] = 1;
    }
  }
  return count;
};
