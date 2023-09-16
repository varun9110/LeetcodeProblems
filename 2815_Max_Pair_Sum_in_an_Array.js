/**
 * 2815. Max Pair Sum in an Array
 * Difficulty: Easy
 * You are given a 0-indexed integer array nums. You have to find the maximum sum of a pair of numbers from nums such that the maximum
 *  digit in both numbers are equal.

Return the maximum sum or -1 if no such pair exists.
Example 1:
Input: nums = [51,71,17,24,42]
Output: 88
Explanation: 
For i = 1 and j = 2, nums[i] and nums[j] have equal maximum digits with a pair sum of 71 + 17 = 88. 
For i = 3 and j = 4, nums[i] and nums[j] have equal maximum digits with a pair sum of 24 + 42 = 66.
It can be shown that there are no other pairs with equal maximum digits, so the answer is 88.
Example 2:
Input: nums = [1,2,3,4]
Output: -1
Explanation: No pair exists in nums with equal maximum digits.
Constraints:
2 <= nums.length <= 100
1 <= nums[i] <= 104
 */

/**
 * Approach:
 * Craete a map object for each digit and store all numbers with max that digit and an array
 * Iterate through all the keys and sort the array of that key in descending and find the sum of 0 and 1 index
 * if the sum > max then store it in max else continue
 * return the max
 */

var maxSum = function(nums) {
  let o = {} // max digit of numbers   :   numbers
  for (let e of nums) {
    let se = '' + e
    let sea = se.split('').map((e) => +e).sort((a, b) => b - a)
    let maxDigit = +sea[0]
    o[maxDigit] = o[maxDigit] || []
    o[maxDigit].push(e)
  }
  let max2sum = -1
  for (let k in o) {
    let nums = o[k]
    if (nums.length > 1) {
      nums.sort((a, b) => b - a)
      let sumOf2MaxNumbers = nums[0] + nums[1]
      max2sum = Math.max(max2sum, sumOf2MaxNumbers)
    }
  }
  return max2sum
};