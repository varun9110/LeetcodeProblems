/**
 * 1512. Number of Good Pairs
 * Difficulty : Easy
 * 
 * Given an array of integers nums, return the number of good pairs.
A pair (i, j) is called good if nums[i] == nums[j] and i < j.

Example 1:
Input: nums = [1,2,3,1,1,3]
Output: 4
Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.

Example 2:
Input: nums = [1,1,1,1]
Output: 6
Explanation: Each pair in the array are good.

Example 3:
Input: nums = [1,2,3]
Output: 0

Constraints:
1 <= nums.length <= 100
1 <= nums[i] <= 100
*/

/**
 * Approach: Simple mapper object to mark the count and occurence of the number.
 * if the number is there then add the number of occurences to the count else assign 1 to the mapper
 * return the count
 * Complexity : O(n)
 */

var numIdenticalPairs = function(nums) {
    let mapper = {};
    let count = 0;
    for(let i=0; i<nums.length; i++){
        if(mapper[nums[i]]){
            count += mapper[nums[i]];
            mapper[nums[i]] = mapper[nums[i]] +1;
        } else {
            mapper[nums[i]] = 1;
        }
    }
    return count;
};