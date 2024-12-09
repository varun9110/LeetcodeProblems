/**
 * 3152. Special Array II
 * Difficulty: Medium
 * 
 * An array is considered special if every pair of its adjacent elements contains two numbers with different parity.

You are given an array of integer nums and a 2D integer matrix queries, where for queries[i] = [fromi, toi] your task is to check that 
subarray
 nums[fromi..toi] is special or not.

Return an array of booleans answer such that answer[i] is true if nums[fromi..toi] is special.

 

Example 1:

Input: nums = [3,4,1,2,6], queries = [[0,4]]

Output: [false]

Explanation:

The subarray is [3,4,1,2,6]. 2 and 6 are both even.

Example 2:

Input: nums = [4,3,1,6], queries = [[0,2],[2,3]]

Output: [false,true]

Explanation:

The subarray is [4,3,1]. 3 and 1 are both odd. So the answer to this query is false.
The subarray is [1,6]. There is only one pair: (1,6) and it contains numbers with different parity. So the answer to this query is true.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
1 <= queries.length <= 105
queries[i].length == 2
0 <= queries[i][0] <= queries[i][1] <= nums.length - 1
 */

/**
 *  Intuition
Imagine you’re looking at a lineup of numbers 🧮, and your job is to find pairs of neighbors that have the same "team":

Team 🟢: Both numbers are even (e.g., 4, 6).
Team 🔴: Both numbers are odd (e.g., 3, 1).
These are called special pairs. For example:

In [4, 3, 1, 6], (3, 1) is a special pair because they’re both odd 🔴.
(4, 3) isn’t special since one is even 🟢 and the other is odd 🔴.
Now, we’re asked to check for each query [left, right] if there are no special pairs between those indices. Instead of counting from scratch every time, we can use a clever trick — prefix sums! ✨

🛠️ Approach
Step 1: Build the Prefix Array
We use a prefix array to count special pairs as we move through nums:

If two consecutive numbers have the same "team" (both 🟢 or both 🔴), we increase the count.
Otherwise, the count stays the same.
For example, in [4, 3, 1, 6]:

At index 0: No pairs yet → prefix[0] = 0.
At index 1: (4, 3) isn’t special → prefix[1] = 0.
At index 2: (3, 1) is special → prefix[2] = 1.
At index 3: (1, 6) isn’t special → prefix[3] = 1.
Final prefix array: [0, 0, 1, 1].

Step 2: Process Queries
For each query [left, right]:

Calculate the number of special pairs in the range using the prefix array:
specialCount = prefix[right] - (left > 0 ? prefix[left - 1] : 0);
⏱️ Complexity
Time Complexity:

Building the prefix array: O(n) (where n is the size of nums).
Answering queries: O(q) (where q is the number of queries).
Total: O(n + q).
 */

/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var isArraySpecial = function(nums, queries) {
    const n = nums.length;
    const prefix = Array(n).fill(0);  // Initialize prefix array

    // Build the prefix array to count special pairs
    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1];
        if ((nums[i - 1] % 2 === 0 && nums[i] % 2 === 0) || 
            (nums[i - 1] % 2 !== 0 && nums[i] % 2 !== 0)) {
            prefix[i]++;
        }
    }

    const result = [];

    // Process each query
    for (let i = 0; i < queries.length; i++) {
        const [left, right] = queries[i];
        const specialCount = prefix[right] - (left > 0 ? prefix[left] : 0);
        result.push(specialCount === 0);
    }

    return result;
};