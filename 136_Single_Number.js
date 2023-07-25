/**
 * 136. Single Number
 * Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
You must implement a solution with a linear runtime complexity and use only constant extra space.

Example 1:
Input: nums = [2,2,1]
Output: 1
Example 2:
Input: nums = [4,1,2,1,2]
Output: 4
Example 3:
Input: nums = [1]
Output: 1

Constraints:
1 <= nums.length <= 3 * 104
-3 * 104 <= nums[i] <= 3 * 104
Each element in the array appears twice except for one element which appears only once.
 */

var singleNumber = function(nums) {
    let set = new Set();
    for(let i=0; i<nums.length; i++){
        if(set.has(nums[i])) {
            set.delete(nums[i]);
        } else {
            set.add(nums[i]);
        }
    }
    return set.values().next().value;
};

/**
 * Concept of XOR:
XOR of zero and some bit returns that bit i.e. x^0 = x...
XOR of two same bits returns 0 i.e. x^x = 0...
And, x^y^x = (x^x)^y = 0^y = y...
XOR all bits together to find the unique number.
 */

var singleNumber = function(nums) {
    // Initialize the unique number...
    let uniqNum = 0;
    // TRaverse all elements through the loop...
    for (let idx = 0; idx < nums.length; idx++) {
        // Concept of XOR...
        uniqNum = uniqNum ^ nums[idx];
    } return uniqNum;       // Return the unique number...
};