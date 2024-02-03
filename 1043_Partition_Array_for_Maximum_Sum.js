/**
 * 1043. Partition Array for Maximum Sum
 * Difficulty: Medium
 * 
 * Given an integer array arr, partition the array into (contiguous) subarrays of length at most k. 
 * After partitioning, each subarray has their values changed to become the maximum value of that subarray.
Return the largest sum of the given array after partitioning. Test cases are generated so that the answer fits in a 32-bit integer.

Example 1:
Input: arr = [1,15,7,9,2,5,10], k = 3
Output: 84
Explanation: arr becomes [15,15,15,9,10,10,10]
Example 2:
Input: arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
Output: 83
Example 3:
Input: arr = [1], k = 1
Output: 1

Constraints:
1 <= arr.length <= 500
0 <= arr[i] <= 109
1 <= k <= arr.length
 */

/**
 * Approaches
(Also explained in the code)

Uses dynamic programming to find the maximum sum after partitioning an array.

Initializing an array dp to store the maximum sum at each position.

Iterating through the array from the end to the beginning. For each position, considering all possible partitions of the array.

Within each partition, we calculates the maximum value and updates the dynamic programming array dp to store the maximum sum.

The final result is stored in dp[0], representing the maximum sum after partitioning the entire array.
 */

var maxSumAfterPartitioning = function(arr, k) {
    const N = arr.length;
    const K = k + 1;

    const dp = Array(K).fill(0);

    for (let start = N - 1; start >= 0; start--) {
        let currMax = 0;
        const end = Math.min(N, start + k);

        for (let i = start; i < end; i++) {
            currMax = Math.max(currMax, arr[i]);
            dp[start % K] = Math.max(dp[start % K], dp[(i + 1) % K] + currMax * (i - start + 1));
        }
    }
    return dp[0];
};