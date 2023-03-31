/**
 * 594. Longest Harmonious Subsequence
 * Difficulty: Easy
 * We define a harmonious array as an array where the difference between its maximum value and its minimum value is exactly 1.
Given an integer array nums, return the length of its longest harmonious subsequence among all its possible subsequences.
A subsequence of array is a sequence that can be derived from the array by deleting some or no elements without changing the order of the remaining elements.
Example 1:
Input: nums = [1,3,2,2,5,2,3,7]
Output: 5
Explanation: The longest harmonious subsequence is [3,2,2,2,3].

Example 2:
Input: nums = [1,2,3,4]
Output: 2

Example 3:
Input: nums = [1,1,1,1]
Output: 0

Constraints:
1 <= nums.length <= 2 * 104
-109 <= nums[i] <= 109
*/

/**
 * Appraoch:
 * Create a mapper object to store all the count of the elements.
 * Then create the loop for the keys and check if the subsequent keys are +1 of the previous, if yes then sum the values and check the max between this sum and the
 * result.
 */

var findLHS = function (nums) {
  let obj = {},
    result = 0;
  for (let v of nums) {
    obj[v] = obj[v] + 1 || 1;
  }
  for (let key in obj) {
    if (obj[parseInt(key) + 1]) {
      result = Math.max(result, obj[key] + obj[parseInt(key) + 1]);
    }
  }

  return result;
};
