/**
 * 873. Length of Longest Fibonacci Subsequence
 * Difficulty: Medium
 * 
 * A sequence x1, x2, ..., xn is Fibonacci-like if:

n >= 3
xi + xi+1 == xi+2 for all i + 2 <= n
Given a strictly increasing array arr of positive integers forming a sequence, return the length of the longest Fibonacci-like subsequence of arr. 
If one does not exist, return 0.

A subsequence is derived from another sequence arr by deleting any number of elements (including none) from arr, without changing the order of the remaining elements. 
For example, [3, 5, 8] is a subsequence of [3, 4, 5, 6, 7, 8].

 

Example 1:

Input: arr = [1,2,3,4,5,6,7,8]
Output: 5
Explanation: The longest subsequence that is fibonacci-like: [1,2,3,5,8].
Example 2:

Input: arr = [1,3,7,11,12,14,18]
Output: 3
Explanation: The longest subsequence that is fibonacci-like: [1,11,12], [3,11,14] or [7,11,18].
 

Constraints:

3 <= arr.length <= 1000
1 <= arr[i] < arr[i + 1] <= 109
 */

/**
 * Intuition
Here's the optimized solution in JavaScript using Use a 2D DP table. This approach ensures we check all possible pairs and extend sequences optimally.
Optimized Approach:
Use a HashMap (indexMap) to store the index of each number in the array for quick lookup.
Use a 2D DP table (dp[i][j]) where:
dp[i][j] represents the length of the Fibonacci-like subsequence ending at indices i and j.
Iterate through pairs of numbers to check if they can form a Fibonacci-like sequence.
Efficiently find previous elements using indexMap to avoid nested loops.
Update the DP table and track the longest Fibonacci-like subsequence.
Approach
Store indexes for quick lookup
Create a Map (indexMap) that stores the index of each element in arr for O(1) lookups.
Initialize a 2D DP table (dp[j][i])
dp[j][i] represents the length of the longest Fibonacci-like sequence ending at indices j and i.
Initialize all values in dp to 2 since the minimum length of a valid Fibonacci-like sequence is 2.
Iterate through all pairs (j, i) where j < i
Compute x = arr[i] - arr[j] (the expected previous Fibonacci number).
If x exists at some index k (found via indexMap) and k < j, update dp[j][i] = dp[k][j] + 1.
Update maxLen to track the longest subsequence found
If no valid Fibonacci sequence is found (maxLen < 3), return 0; otherwise, return maxLen.
Complexity
Time complexity: O(N²)

There are two nested loops iterating over (j, i), making it O(N²).
Lookup in indexMap (a Map) takes O(1), keeping the complexity at O(N²).
Space complexity: O(N²) + O(N) ≈ O(N²)

O(N²) for the dp table.
O(N) for the indexMap.
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
var lenLongestFibSubseq = function (arr) {
    let n = arr.length;
    let indexMap = new Map();
    let dp = Array(n).fill(0).map(() => Array(n).fill(2)); // Initialize DP array with 2
    let maxLen = 0;

    // Store index of each number for quick lookup
    for (let i = 0; i < n; i++) {
        indexMap.set(arr[i], i);
    }

    // Iterate over all pairs (j, i)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            let x = arr[i] - arr[j]; // Previous Fibonacci number
            let k = indexMap.get(x); // Check if x exists before arr[j]

            // Ensure x appears before arr[j] and forms a valid sequence
            if (k !== undefined && k < j) {
                dp[j][i] = dp[k][j] + 1;
                maxLen = Math.max(maxLen, dp[j][i]);
            }
        }
    }
    return maxLen >= 3 ? maxLen : 0;
};