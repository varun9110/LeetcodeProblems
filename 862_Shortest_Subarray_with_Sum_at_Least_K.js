/**
 * 862. Shortest Subarray with Sum at Least K
 * Difficulty: Hard
 * Given an integer array nums and an integer k, return the length of the shortest non-empty subarray of nums with a sum of at least k. 
 * If there is no such subarray, return -1.

A subarray is a contiguous part of an array.
Example 1:
Input: nums = [1], k = 1
Output: 1
Example 2:
Input: nums = [1,2], k = 4
Output: -1
Example 3:
Input: nums = [2,-1,2], k = 3
Output: 3

Constraints:
1 <= nums.length <= 105
-105 <= nums[i] <= 105
1 <= k <= 109
 */

/**
 * Intuition
When tackling this problem, the key realization is that finding the shortest subarray with a sum of at least k can be efficiently managed by keeping track of prefix sums. 
The prefix sum allows us to efficiently compute the sum of subarrays by leveraging the difference between two prefix values.

The challenge is to efficiently maintain the relationship between prefix sums and indices to find the shortest subarray length. 
A deque (double-ended queue) is ideal for this task because it helps us maintain a monotonic order of prefix sums, enabling quick updates while ensuring we always check the smallest valid subarray.

Approach
Let’s walk through the steps to solve this problem:

Prefix Sum Calculation:

We calculate the prefix sum array, where each element represents the cumulative sum of elements up to that index. This helps in calculating subarray sums efficiently.
For subarray [i, j], the sum is given by prefix[j] - prefix[i-1].
Deque for Optimization:

Use a deque to store indices of the prefix sum array in increasing order.
This structure helps us check for subarrays that meet the required sum condition efficiently.
Valid Subarray Condition:

For any index j, if prefix[j] - prefix[dq.front()] >= k, then the subarray starting just after dq.front() and ending at j is a valid candidate.
We update the result with the length of this subarray and remove the front of the deque since it’s no longer useful.
Monotonicity of Deque:

To maintain a valid deque structure, remove indices from the back if the current prefix sum is smaller than or equal to the prefix sum of the last index in the deque.
This ensures we only keep the smallest indices for comparison.
Edge Case:

If no subarray is found with a sum ≥ k, return -1.
Complexity
Time Complexity:
(O(n)): Each element is added and removed from the deque at most once, and the prefix sum computation takes (O(n)).

Space Complexity:
(O(n)): For the prefix sum array and the deque.


 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var shortestSubarray = function(nums, k) {
    const n = nums.length;
    const prefix = new Array(n + 1).fill(0);

    // Step 1: Compute prefix sums
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    const deque = [];
    let minLength = Infinity;

    // Step 2: Process prefix sums
    for (let i = 0; i <= n; i++) {
        while (deque.length > 0 && prefix[i] - prefix[deque[0]] >= k) {
            minLength = Math.min(minLength, i - deque.shift());
        }

        while (deque.length > 0 && prefix[i] <= prefix[deque[deque.length - 1]]) {
            deque.pop();
        }

        deque.push(i);
    }

    return minLength === Infinity ? -1 : minLength;
};