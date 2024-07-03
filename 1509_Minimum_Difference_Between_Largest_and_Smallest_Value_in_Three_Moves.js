/**
 * 1509. Minimum Difference Between Largest and Smallest Value in Three Moves
 * Difficulty: Medium
 * 
 * You are given an integer array nums.
In one move, you can choose one element of nums and change it to any value.
Return the minimum difference between the largest and smallest value of nums after performing at most three moves.

Example 1:
Input: nums = [5,3,2,4]
Output: 0
Explanation: We can make at most 3 moves.
In the first move, change 2 to 3. nums becomes [5,3,3,4].
In the second move, change 4 to 3. nums becomes [5,3,3,3].
In the third move, change 5 to 3. nums becomes [3,3,3,3].
After performing 3 moves, the difference between the minimum and maximum is 3 - 3 = 0.
Example 2:
Input: nums = [1,5,0,10,14]
Output: 1
Explanation: We can make at most 3 moves.
In the first move, change 5 to 0. nums becomes [1,0,0,10,14].
In the second move, change 10 to 0. nums becomes [1,0,0,0,14].
In the third move, change 14 to 1. nums becomes [1,0,0,0,1].
After performing 3 moves, the difference between the minimum and maximum is 1 - 0 = 1.
It can be shown that there is no way to make the difference 0 in 3 moves.
Example 3:
Input: nums = [3,100,20]
Output: 0
Explanation: We can make at most 3 moves.
In the first move, change 100 to 7. nums becomes [3,7,20].
In the second move, change 20 to 7. nums becomes [3,7,7].
In the third move, change 3 to 7. nums becomes [7,7,7].
After performing 3 moves, the difference between the minimum and maximum is 7 - 7 = 0.

Constraints:

1 <= nums.length <= 105
-109 <= nums[i] <= 109
 */


/**
 * If the length of the input array is 4 or fewer, the answer is 0 because we can make all numbers equal with up to 3 moves.

Three moves means that we can remove 3 numbers from the input array to make the remaining numbers equal to any number in the array.

If we have more than 4 numbers, the greedy intuition suggests that excluding a total of 3 elements from both the leftmost and 
rightmost ends of the sorted array minimizes the difference between the maximum and minimum values remaining in the array.

This can simply be proven by contradiction. If we do not remove such numbers (three from both the leftmost and rightmost sides), 
then either the maximum or minimum of the array might be among the first three or last three numbers after sorting, potentially increasing the difference between them.

The solution involves iterating through the number of elements removed from the leftmost side. If we choose i elements from the leftmost side, 
then we must choose 3 - i elements from the right side to remove.
 */


var minDifference = function(nums) {
    if (nums.length <= 4) {
        return 0;
    }
    nums.sort((a, b) => a - b);
    let ans = nums[nums.length - 1] - nums[0];
    for (let i = 0; i <= 3; i++) {
        a = nums[nums.length - (3 - i) - 1]
        console.log("1 : ",a)
        b = nums[i]
        console.log("2 : ",b)
        console.log("3 : ", a-b)

        ans = Math.min(ans, nums[nums.length - (3 - i) - 1] - nums[i]);
    }
    return ans;
};