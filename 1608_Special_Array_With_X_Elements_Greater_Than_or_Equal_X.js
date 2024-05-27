/**
 * 1608. Special Array With X Elements Greater Than or Equal X
 * Difficulty: Easy
 * 
 * You are given an array nums of non-negative integers. nums is considered special if there exists a number x such 
 * that there are exactly x numbers in nums that are greater than or equal to x.

Notice that x does not have to be an element in nums.

Return x if the array is special, otherwise, return -1. It can be proven that if nums is special, the value for x is unique.

 

Example 1:

Input: nums = [3,5]
Output: 2
Explanation: There are 2 values (3 and 5) that are greater than or equal to 2.
Example 2:

Input: nums = [0,0]
Output: -1
Explanation: No numbers fit the criteria for x.
If x = 0, there should be 0 numbers >= x, but there are 2.
If x = 1, there should be 1 number >= x, but there are 0.
If x = 2, there should be 2 numbers >= x, but there are 0.
x cannot be greater since there are only 2 numbers in nums.
Example 3:

Input: nums = [0,4,3,0,4]
Output: 3
Explanation: There are 3 values that are greater than or equal to 3.
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 1000
 */

/**
 * Approach:
 * 
 * Create a map to store the frequency of each number and find the highest number in the same iteration
 * Create a loop from the highest number to the 0 and keep adding the sum to the count.
 * Now, check if i is === count then return the i 
 * 
 * return -1 if there is no return from the loop
 */

var specialArray = function(nums) {
    let map = {};
    let highest = 0;
    for(let i=0; i<nums.length; i++){
        map[nums[i]] = (map[nums[i]]) ? map[nums[i]]+1 : 1
        highest = (nums[i] > highest) ? nums[i] : highest;
    }

    let count=0;
    for(let i=highest; i>=0; i--){
        count += (map[i]) ? map[i] : 0;

        if(i===count){
            return i
        }
    }
    return -1;
};