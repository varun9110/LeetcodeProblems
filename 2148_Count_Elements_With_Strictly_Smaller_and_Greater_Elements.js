/**
 * 2148. Count Elements With Strictly Smaller and Greater Elements
 * Difficulty: Easy
 * Given an integer array nums, return the number of elements that have both a strictly smaller and a strictly greater element appear in nums.

Example 1:
Input: nums = [11,7,2,15]
Output: 2
Explanation: The element 7 has the element 2 strictly smaller than it and the element 11 strictly greater than it.
Element 11 has element 7 strictly smaller than it and element 15 strictly greater than it.
In total there are 2 elements having both a strictly smaller and a strictly greater element appear in nums.
Example 2:
Input: nums = [-3,3,3,90]
Output: 2
Explanation: The element 3 has the element -3 strictly smaller than it and the element 90 strictly greater than it.
Since there are two elements with the value 3, in total there are 2 elements having both a strictly smaller and a strictly greater element appear in nums.

Constraints:
1 <= nums.length <= 100
-105 <= nums[i] <= 105
 */

/**
 * Approach:
 * Sort the array. Then remove all the 0th and last index duplicate elements.
 * then check for the length of the array, if < 3 return 0 else length -2
 */

var countElements = function (nums) {
  nums.sort((a, b) => a - b);
  while (nums[0] === nums[1]) {
    nums.splice(0, 1);
  }
  while (nums[nums.length - 1] === nums[nums.length - 2]) {
    nums.pop();
  }
  if (nums.length < 3) {
    return 0;
  }
  return nums.length - 2;
};

/**
 * Refined approach:
 * Find the max and min in the array ;
 * then count all the elements in the array that are not equal to max or min value.
 * return this count
 */

var countElements = function (nums) {
  const max = Math.max(...nums);
  const min = Math.min(...nums);
  let count = 0;

  nums.forEach((ele) => {
    if (ele < max && ele > min) count++;
  });
  return count;
};
