/**
 * 2270. Number of Ways to Split Array
 * Difficulty: Medium
 * 
 * You are given a 0-indexed integer array nums of length n.

nums contains a valid split at index i if the following are true:

The sum of the first i + 1 elements is greater than or equal to the sum of the last n - i - 1 elements.
There is at least one element to the right of i. That is, 0 <= i < n - 1.
Return the number of valid splits in nums.

 

Example 1:

Input: nums = [10,4,-8,7]
Output: 2
Explanation: 
There are three ways of splitting nums into two non-empty parts:
- Split nums at index 0. Then, the first part is [10], and its sum is 10. The second part is [4,-8,7], and its sum is 3. Since 10 >= 3, i = 0 is a valid split.
- Split nums at index 1. Then, the first part is [10,4], and its sum is 14. The second part is [-8,7], and its sum is -1. Since 14 >= -1, i = 1 is a valid split.
- Split nums at index 2. Then, the first part is [10,4,-8], and its sum is 6. The second part is [7], and its sum is 7. Since 6 < 7, i = 2 is not a valid split.
Thus, the number of valid splits in nums is 2.
Example 2:

Input: nums = [2,3,1,0]
Output: 2
Explanation: 
There are two valid splits in nums:
- Split nums at index 1. Then, the first part is [2,3], and its sum is 5. The second part is [1,0], and its sum is 1. Since 5 >= 1, i = 1 is a valid split. 
- Split nums at index 2. Then, the first part is [2,3,1], and its sum is 6. The second part is [0], and its sum is 0. Since 6 >= 0, i = 2 is a valid split.
 

Constraints:

2 <= nums.length <= 105
-105 <= nums[i] <= 105
 */

/**
 * Intuition
The task requires finding the number of ways to split the array such that the sum of the left part is greater than or equal to the sum of the right part.

To solve this, consider:

Brute force approach: For every possible split, calculate the sum of the left and right parts. This is inefficient as it 
involves recalculating sums repeatedly for each split, leading to O(n 2) time complexity.
Optimized approach: Use a running sum technique where:
Precompute the total sum of the array.
Dynamically update the left and right sums as you traverse the array.
This reduces redundant calculations and ensures a linear O(n) solution.
Subscribe For Video Solution Startind today : https://shorturl.at/zM3iG

🛠️ Approach
1️⃣ Precompute the Total Sum
Calculate the total sum of the array (rightSideSum). This represents the initial sum of the "right side" before any split.
2️⃣ Simulate Splits Efficiently
Use two variables:
leftSideSum initialized to 0.
rightSideSum initialized to the total sum of the array.
Traverse the array:
For each split at index i, update:
Add nums[i] to leftSideSum (growing the left part).
Subtract nums[i] from rightSideSum (shrinking the right part).
Check the condition: leftSideSum >= rightSideSum.
3️⃣ Count Valid Splits
For every valid split (where the condition is satisfied), increment the count.
📊 Complexity
Time Complexity:
O(n) — Two passes: one for the total sum and one for simulating splits.
Space Complexity:
O(1) — Only a few variables are used for computations.

 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var waysToSplitArray = function(nums) {
    let leftSideSum = 0, rightSideSum = nums.reduce((acc, num) => acc + num, 0);
    let validSplits = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        leftSideSum += nums[i];
        rightSideSum -= nums[i];
        if (leftSideSum >= rightSideSum) {
            validSplits++;
        }
    }

    return validSplits;
};