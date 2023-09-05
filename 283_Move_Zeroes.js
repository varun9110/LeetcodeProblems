/**
 * 283. Move Zeroes
Difficulty : Easy
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
Note that you must do this in-place without making a copy of the array.

Example 1:
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:
Input: nums = [0]
Output: [0]

Constraints:
1 <= nums.length <= 104
-231 <= nums[i] <= 231 - 1

Follow up: Could you minimize the total number of operations done?
 */

/**
 * Approach: 
 * take a pointer and keep replacing it whenever non zero number is encountered.
 * 
 * finally loop through pointer to the array length and replace with 0
 */

var moveZeroes = function(nums) {
    let pointer  = 0;
    for(let i=0; i<nums.length; i++){
        if(nums[i] !==0 ){
            nums[pointer] = nums[i];
            pointer++;
        }
    }
    while(pointer<nums.length){
        nums[pointer] = 0;
        pointer++
    }
};