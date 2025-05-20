/**
 * 3355. Zero Array Transformation I
 * Difficulty: Medium
 * 
 * You are given an integer array nums of length n and a 2D array queries, where queries[i] = [li, ri].

For each queries[i]:

Select a subset of indices within the range [li, ri] in nums.
Decrement the values at the selected indices by 1.
A Zero Array is an array where all elements are equal to 0.

Return true if it is possible to transform nums into a Zero Array after processing all the queries sequentially, otherwise return false.

 

Example 1:

Input: nums = [1,0,1], queries = [[0,2]]

Output: true

Explanation:

For i = 0:
Select the subset of indices as [0, 2] and decrement the values at these indices by 1.
The array will become [0, 0, 0], which is a Zero Array.
Example 2:

Input: nums = [4,3,2,1], queries = [[1,3],[0,2]]

Output: false

Explanation:

For i = 0:
Select the subset of indices as [1, 2, 3] and decrement the values at these indices by 1.
The array will become [4, 2, 1, 0].
For i = 1:
Select the subset of indices as [0, 1, 2] and decrement the values at these indices by 1.
The array will become [3, 1, 0, 0], which is not a Zero Array.
 

Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 105
1 <= queries.length <= 105
queries[i].length == 2
0 <= li <= ri < nums.length
 */

/**
 *  Building the Intuition
🔍 Step 1: Understand the Problem
Goal: Make all elements in nums equal to 0.
Query: For [li, ri], we can decrement any subset of indices in that range by 1.
Question: Can we make nums a Zero Array after all queries?
Key Points 📋:
To make nums[i] = 0, we need to decrement index i exactly nums[i] times.
A query [li, ri] can decrement index i if li <= i <= ri.
We need to check if each index i is covered by enough queries to reduce nums[i] to 0.
🚀 Step 2: Approach
Idea: Count how many queries cover each index i. If the count is at least nums[i], we can reduce nums[i] to 0.
Challenge: Directly counting query coverage for each index takes O(n * q) time, too slow.
Solution: Use a difference array to compute coverage in O(n + q) time:
For each query [li, ri], mark a decrement at li and an increment at ri + 1.
Compute a cumulative sum to find the number of queries covering each index.
Check: At each index i, ensure the number of covering queries is at least nums[i].
🧩 Step 3: How the Code Works
🛠️ Difference Array Setup
Create a diff array of size n+1, initialized to 0.
For each query [li, ri]:
diff[li]--: Indicates a decrement starts at li.
diff[ri + 1]++: Indicates the decrement ends after ri (if ri + 1 < n).
This tracks the net effect of queries across ranges.
🚀 Compute Coverage
Use a variable sum to compute the cumulative effect:
At each index i, update sum += diff[i].
sum represents the negative of the number of queries covering index i (since we decremented at the start of ranges).
For index i, if sum = -k, then k queries cover i.
🔄 Check Feasibility
We need k >= nums[i], where k is the number of covering queries.
Since sum = -k, we need nums[i] <= k, or nums[i] <= -sum.
Rewrite as nums[i] > -sum: If true, we don’t have enough decrements, return false.
The code checks this as nums[i] > (sum += diff[i]) * -1.
🖼️ Visualization
For nums = [1,0,1], queries = [[0,2]]:

diff = [-1, 0, 0, 1] (decrement at 0, increment at 3).
i=0: sum = -1, nums[0] = 1, 1 > -(-1) = 1 → false.
i=1: sum = -1, 0 > 1 → false.
i=2: sum = -1, 1 > 1 → false.
All checks pass → true.
For nums = [4,3,2,1], queries = [[1,3],[0,2]]:

diff = [-1, -1, 0, 1, 0].
i=0: sum = -1, 4 > -(-1) = 1 → true (fail, not enough decrements).
Return false.
⏱️ Complexity
Time Complexity ⏳: O(n + q)
Build diff: O(q).
Check array: O(n).
Total: O(n + q).
Space Complexity 💾: O(n)
diff array: O(n).
 */


/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean}
 */
var isZeroArray = function(nums, queries) {
    const n = nums.length;
    const diff = new Array(n + 1).fill(0);
    for (let [li, ri] of queries) {
        diff[li]--;
        if (ri + 1 < n) diff[ri + 1]++;
    }
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += diff[i];
        if (nums[i] > -sum) return false;
    }
    return true;
};