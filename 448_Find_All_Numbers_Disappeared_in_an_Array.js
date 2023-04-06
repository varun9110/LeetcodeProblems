/**
 * 448. Find All Numbers Disappeared in an Array
 * Difficulty: Easy
 * 
 * Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.
Example 1:
Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]
Example 2:
Input: nums = [1,1]
Output: [2]

Constraints:
n == nums.length
1 <= n <= 105
1 <= nums[i] <= n
Follow up: Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.
 */

/**
 * Appraoch:
 * Create a mapper to record the occurence of each number in the array.
 * Now, iterate through 1 to the length and if the number is not there in the mapper then add that to the result.
 */

var findDisappearedNumbers = function (nums) {
  let mapper = {};
  for (let i = 0; i < nums.length; i++) {
    mapper[nums[i]] = 1;
  }
  let result = [];
  for (let i = 1; i <= nums.length; i++) {
    if (!mapper[i]) {
      result.push(i);
    }
  }
  return result;
};
