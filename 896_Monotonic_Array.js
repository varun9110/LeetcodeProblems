/**
 * 896. Monotonic Array
 * Difficulty:easy
 * 
 * An array is monotonic if it is either monotone increasing or monotone decreasing.

An array nums is monotone increasing if for all i <= j, nums[i] <= nums[j]. An array nums is monotone 
decreasing if for all i <= j, nums[i] >= nums[j].

Given an integer array nums, return true if the given array is monotonic, or false otherwise.

Example 1:
Input: nums = [1,2,2,3]
Output: true
Example 2:
Input: nums = [6,5,4,4]
Output: true
Example 3:
Input: nums = [1,3,2]
Output: false

Constraints:
1 <= nums.length <= 105
-105 <= nums[i] <= 105
 */

var isMonotonic = function(nums) {
    if (nums.length < 2) return true;

    let direction = 0;  // 0 means unknown, 1 means increasing, -1 means decreasing

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i-1]) {  // increasing
            if (direction === 0) direction = 1;
            else if (direction === -1) return false;
        } else if (nums[i] < nums[i-1]) {  // decreasing
            if (direction === 0) direction = -1;
            else if (direction === 1) return false;
        }
    }

    return true;
};


/**
 * Refined code
 */

var isMonotonic = function(nums) {
    let countIncreasing=0
    let countDecreasing=0
    for(let i=0;i<nums.length-1;i++)
    {
        if(nums[i]<=nums[i+1])
        {
            countIncreasing++;
        }
        if(nums[i]>=nums[i+1])
        {
            countDecreasing++;
            }
        
    }
    if(countIncreasing===nums.length-1||countDecreasing===nums.length-1)
    {
        return true
    }
    else return false
};