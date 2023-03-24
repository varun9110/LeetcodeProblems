/**
 * 905. Sort Array By Parity
 * Difficulty: Easy
 * 
 * Given an integer array nums, move all the even integers at the beginning of the array followed by all the odd integers.
Return any array that satisfies this condition.
Example 1:
Input: nums = [3,1,2,4]
Output: [2,4,3,1]
Explanation: The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.
Example 2:
Input: nums = [0]
Output: [0]

Constraints:
1 <= nums.length <= 5000
0 <= nums[i] <= 5000
 */

/**
 * Approach:
 * Iterate through the loop and keep checking for even and odd number. if even then unshift it to the begining of the array else push it at the end.
 */

 var sortArrayByParity = function(nums) {
    let result = [];
    for(let i=0; i<nums.length; i++){
        (nums[i] % 2 === 0) ? result.unshift(nums[i]) : result.push(nums[i]);
    }
    return result;
};