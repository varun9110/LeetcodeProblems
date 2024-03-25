/**
 * 442. Find All Duplicates in an Array
 * Difficulty: Medium
 * 
 * Given an integer array nums of length n where all the integers of nums are in the range [1, n] and 
 * each integer appears once or twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant extra space.

Example 1:
Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]
Example 2:
Input: nums = [1,1,2]
Output: [1]
Example 3:
Input: nums = [1]
Output: []

Constraints:
n == nums.length
1 <= n <= 105
1 <= nums[i] <= n
Each element in nums appears once or twice.
 */

/**
 * Approach :
 *  create a map object and check the count of each item, then iterate through the keys and check if the occurence is 2, if yes then push the 
 * key to a result array
 */

var findDuplicates = function (nums) {
    let map = {};
    for (let i = 0; i < nums.length; i++) {
        map[nums[i]] = (map[nums[i]]) ? map[nums[i]] + 1 : 1;
    }
    let keys = Object.keys(map);
    let result = [];
    for (let i = 0; i < keys.length; i++) {
        if (map[keys[i]] === 2) {
            result.push(keys[i]);
        }
    }
    return result
}

/**
 * Another approach:
 since the item is in the range of 1 to n, iterate through the length and the index by -1 from the value.
 if value at this new value (-1) is less than 0 then add the item at ith index to the result array
 if not then make the value at the new item variable (-1) (*-1)

 */

const findDuplicates = (nums) => {
    const duplicates = [];
    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]) - 1;

        if (nums[index] < 0) {
            duplicates.push(index + 1);
        }

        nums[index] = nums[index] * -1;
    }
    return duplicates;
};