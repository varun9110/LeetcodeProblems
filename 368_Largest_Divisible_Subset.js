/**
 * 368. Largest Divisible Subset
 * Difficulty: Medium
 * 
 * Given a set of distinct positive integers nums, return the largest subset answer such 
 * that every pair (answer[i], answer[j]) of elements in this subset satisfies:

answer[i] % answer[j] == 0, or
answer[j] % answer[i] == 0
If there are multiple solutions, return any of them.

Example 1:
Input: nums = [1,2,3]
Output: [1,2]
Explanation: [1,3] is also accepted.
Example 2:
Input: nums = [1,2,4,8]
Output: [1,2,4,8]
 
Constraints:
1 <= nums.length <= 1000
1 <= nums[i] <= 2 * 109
All the integers in nums are unique.
 */

/**
 * Approaches
(Also explained in the code)

Sort the Numbers: The first step is to sort the input array nums in ascending order. This is done to ensure that we only consider 
elements that come before the current element during the iteration.

Dynamic Programming (DP) Approach: We use dynamic programming to find the length of the largest divisible subset ending at each index. 
We maintain a dp array where dp[i] represents the length of the largest divisible subset ending at index i.

Finding Divisible Subsets: For each element nums[i], we iterate through all elements before it (nums[j], where j < i) and 
check if nums[i] is divisible by nums[j]. If it is divisible and adding nums[i] to the subset results in a larger subset, we update the dp[i] value.

Track Maximum Length: During the DP process, we keep track of the maximum subset length (maxi). 
This helps us identify the size of the largest divisible subset.

Backtracking to Generate Subset: Once we have the maximum subset length, we iterate through the dp array from the end 
to reconstruct the largest divisible subset. We start from the element that corresponds to the maximum subset length 
and backtrack by adding elements to the result vector (v) while ensuring that each element divides the next element in the subset.\

 */

var largestDivisibleSubset = function(nums) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const dp = new Array(n).fill(1);
    let maxSize = 1, maxIndex = 0;

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] % nums[j] === 0) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
                if (dp[i] > maxSize) {
                    maxSize = dp[i];
                    maxIndex = i;
                }
            }
        }
    }

    const result = [];
    let num = nums[maxIndex];
    for (let i = maxIndex; i >= 0; i--) {
        if (num % nums[i] === 0 && dp[i] === maxSize) {
            result.push(nums[i]);
            num = nums[i];
            maxSize--;
        }
    }

    return result;
};