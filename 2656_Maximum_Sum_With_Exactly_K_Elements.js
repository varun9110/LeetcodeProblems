/**
 * 2656. Maximum Sum With Exactly K Elements
 * Difficulty : Easy
 * 
You are given a 0-indexed integer array nums and an integer k. 
Your task is to perform the following operation exactly k times in order to maximize your score:

Select an element m from nums.
Remove the selected element m from the array.
Add a new element with a value of m + 1 to the array.
Increase your score by m.
Return the maximum score you can achieve after performing the operation exactly k times.
Example 1:
Input: nums = [1,2,3,4,5], k = 3
Output: 18
Explanation: We need to choose exactly 3 elements from nums to maximize the sum.
For the first iteration, we choose 5. Then sum is 5 and nums = [1,2,3,4,6]
For the second iteration, we choose 6. Then sum is 5 + 6 and nums = [1,2,3,4,7]
For the third iteration, we choose 7. Then sum is 5 + 6 + 7 = 18 and nums = [1,2,3,4,8]
So, we will return 18.
It can be proven, that 18 is the maximum answer that we can achieve.
Example 2:
Input: nums = [5,5,5], k = 2
Output: 11
Explanation: We need to choose exactly 2 elements from nums to maximize the sum.
For the first iteration, we choose 5. Then sum is 5 and nums = [5,5,6]
For the second iteration, we choose 6. Then sum is 5 + 6 = 11 and nums = [5,5,7]
So, we will return 11.
It can be proven, that 11 is the maximum answer that we can achieve.

Constraints:
1 <= nums.length <= 100
1 <= nums[i] <= 100
1 <= k <= 100
 */

/**
 * Intuition
The code appears to aim at finding the maximum sum by selecting the maximum element from the given array nums and adding 
k consecutive integers starting from 0.

Approach
Find the maximum element in the array using Math.max(...nums).
Initialize the variable sum with the maximum element.
Iterate k-1 times starting from 1 (since we have already accounted for 0 in the maximum element).
In each iteration, add the current maximum element plus the current iteration index to the sum.
Return the final sum.
 */

var maximizeSum = function(nums, k) {
    let max = Math.max(...nums);
    sum = max;
    for(let i=1; i<k; i++){
        sum+= max+i;
    }
    return sum;
};