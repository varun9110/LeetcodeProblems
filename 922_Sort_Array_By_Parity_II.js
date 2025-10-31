/**
 * 922. Sort Array By Parity II
 * Difficulty: Easy
 * 
 * Given an array of integers nums, half of the integers in nums are odd, and the other half are even.

Sort the array so that whenever nums[i] is odd, i is odd, and whenever nums[i] is even, i is even.

Return any answer array that satisfies this condition.

 

Example 1:

Input: nums = [4,2,5,7]
Output: [4,5,2,7]
Explanation: [4,7,2,5], [2,5,4,7], [2,7,4,5] would also have been accepted.
Example 2:

Input: nums = [2,3]
Output: [2,3]
 

Constraints:

2 <= nums.length <= 2 * 104
nums.length is even.
Half of the integers in nums are even.
0 <= nums[i] <= 1000
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParityII = function(nums) {
    let n = nums.length;
    // i points to even indexes and j points to odd indexes
    let i = 0, j = 1;
    while(i < n && j < n) {
        // If i founds even element at even index , it just jumps to next even index because i need odd element at even index (mismatch) to exchange the even element at odd index
        while(i < n && nums[i] % 2 === 0) {
            i += 2;
        }
        // If j founds odd element at odd index , it just jumps to next odd index because i need even element at odd index (mismatch) to exchange the odd element at even index
        while(j < n && nums[j] % 2 === 1) {
            j += 2;
        }
        // for [2, 5] , i goes to index = n and j goes till index = n + 1 and we dont need to exchange in this case, So It is required to put an if condition
        if(i < n && j < n) {
            [nums[i], nums[j]] = [nums[j], nums[i]]
        }
    }
    return nums;
};