/**
 * 2294. Partition Array Such That Maximum Difference Is K
 * Difficulty: Medium
 * 
 * You are given an integer array nums and an integer k. You may partition nums into one or more subsequences such that each element in nums appears in exactly one of the subsequences.

Return the minimum number of subsequences needed such that the difference between the maximum and minimum values in each subsequence is at most k.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

 

Example 1:

Input: nums = [3,6,1,2,5], k = 2
Output: 2
Explanation:
We can partition nums into the two subsequences [3,1,2] and [6,5].
The difference between the maximum and minimum value in the first subsequence is 3 - 1 = 2.
The difference between the maximum and minimum value in the second subsequence is 6 - 5 = 1.
Since two subsequences were created, we return 2. It can be shown that 2 is the minimum number of subsequences needed.
Example 2:

Input: nums = [1,2,3], k = 1
Output: 2
Explanation:
We can partition nums into the two subsequences [1,2] and [3].
The difference between the maximum and minimum value in the first subsequence is 2 - 1 = 1.
The difference between the maximum and minimum value in the second subsequence is 3 - 3 = 0.
Since two subsequences were created, we return 2. Note that another optimal solution is to partition nums into the two subsequences [1] and [2,3].
Example 3:

Input: nums = [2,2,4,5], k = 0
Output: 3
Explanation:
We can partition nums into the three subsequences [2,2], [4], and [5].
The difference between the maximum and minimum value in the first subsequences is 2 - 2 = 0.
The difference between the maximum and minimum value in the second subsequences is 4 - 4 = 0.
The difference between the maximum and minimum value in the third subsequences is 5 - 5 = 0.
Since three subsequences were created, we return 3. It can be shown that 3 is the minimum number of subsequences needed.
 

Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 105
0 <= k <= 105
 */

/**
 * Intuition💡
The task requires us to group the numbers in the nums array such that the difference between the minimum and maximum values in each group is no more than k, and the total number of groups is minimized.

Approach
1 . Sorting is Fundamental:

Sorting brings order, allowing us to easily track the range (min to max) of potential subsequences.
After sorting, we can greedily group elements while maintaining the max-min constraint.
2 . Greedy Partitioning:

Start with the smallest element as the initial min.
Keep expanding the current subsequence until we encounter an element that violates the max-min ≤ k condition.
When violated, start a new subsequence with this element as the new min.
Optimal Strategy
1 . Sort the Array: Ensures elements are in ascending order.

2 . Initialize:

ans = 1 (minimum one subsequence needed)
min = nums[0] (first element as the initial min)
3 . Iterate and Partition:

For each subsequent element, check if it can be part of the current subsequence (nums[i] - min ≤ k).
If not, increment ans and update min to start a new subsequence.
⏳Complexity Analysis
Time complexity:O(n log n) due to sorting.
Space complexity:O(1) additional space
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function partitionArray(nums, k) {
    nums.sort((a, b) => a - b);
    let ans = 1;
    let min = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] - min > k) {
            ans++;
            min = nums[i];
        }
    }
    
    return ans;
}