/**
 * 217. Contains Duplicate
 * Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

Example 1:
Input: nums = [1,2,3,1]
Output: true
Example 2:
Input: nums = [1,2,3,4]
Output: false
Example 3:
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true

Constraints:
1 <= nums.length <= 105
-109 <= nums[i] <= 109
 */

/**
 * Approach: 
 * Simple and staright forward thing, either do this using the set and check if the number already exists using the has function
 * or else use the object mapper, if the number already exists in the mapper object then return false else true
 */

var containsDuplicate = function(nums) {
    let mapper = {};

    for(let i=0; i<nums.length; i++){
        if(mapper[nums[i]]){
            return true;
        }
        mapper[nums[i]] = true;
    }
    return false;
};