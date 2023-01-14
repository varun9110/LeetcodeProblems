/*

1991_Find_the_Middle_Index_in_Array
Difficulty : Easy

Given a 0-indexed integer array nums, find the leftmost middleIndex (i.e., the smallest amongst all the possible ones).

A middleIndex is an index where nums[0] + nums[1] + ... + nums[middleIndex-1] == nums[middleIndex+1] + nums[middleIndex+2] + ... + nums[nums.length-1].

If middleIndex == 0, the left side sum is considered to be 0. Similarly, if middleIndex == nums.length - 1, the right side sum is considered to be 0.

Return the leftmost middleIndex that satisfies the condition, or -1 if there is no such index.

Example 1:
Input: nums = [2,3,-1,8,4]
Output: 3
Explanation: The sum of the numbers before index 3 is: 2 + 3 + -1 = 4
The sum of the numbers after index 3 is: 4 = 4

Example 2:
Input: nums = [1,-1,4]
Output: 2
Explanation: The sum of the numbers before index 2 is: 1 + -1 = 0
The sum of the numbers after index 2 is: 0

Example 3:
Input: nums = [2,5]
Output: -1
Explanation: There is no valid middleIndex.

*/

/*
Approach:
Edge case : if array lenght is 1 then index 0 is the middleIndex. So return 0

For rest: 
Assuming leftSum to be zero and find the sum of the whole array and store it in the rightSum
Now, iterate through the each index (assuming it to the middle index), but first remove it from the rightSum, then check for leftSum === rightSum.
if yes then return the index, if not then add the value to the leftSum.

Complexity : O(n)
*/

var findMiddleIndex = function(nums) {
    let leftSum = 0;
    let rightSum=0;

    if(nums.length === 1){
        return 0;
    }

    for(let i=0; i<nums.length; i++){
        rightSum += nums[i];
    }

    for(let j=0; j<nums.length; j++){
        rightSum -= nums[j];
        if(leftSum === rightSum){
            return j;
        }
        leftSum += nums[j];
    }

    return -1;
};