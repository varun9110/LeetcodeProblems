/**
 * 689. Maximum Sum of 3 Non-Overlapping Subarrays
 * Difficulty : Hard
 * 
 * Given an integer array nums and an integer k, find three non-overlapping subarrays of length k with maximum sum and return them.

Return the result as a list of indices representing the starting position of each interval (0-indexed). If there are multiple answers, 
return the lexicographically smallest one.


Example 1:
Input: nums = [1,2,1,2,6,7,5,1], k = 2
Output: [0,3,5]
Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].
We could have also taken [2, 1], but an answer of [1, 3, 5] would be lexicographically larger.
Example 2:

Input: nums = [1,2,1,2,1,2,1,2,1], k = 2
Output: [0,2,4]
 

Constraints:

1 <= nums.length <= 2 * 104
1 <= nums[i] < 216
1 <= k <= floor(nums.length / 3)
 */

/**
 * Intuition
The goal is to find three non-overlapping subarrays of length k that together have the maximum sum. The naive approach of trying all possible combinations of three subarrays would take too long, especially for large arrays. Thus, we need an optimized approach.

A sliding window technique can help efficiently calculate the sum of subarrays as we move through the array. By keeping track of the best positions for each of the subarrays using dynamic programming, we can solve this problem in linear time.

Approach
Sliding Window for Sum Calculation:
To calculate the sum of subarrays of length k, we use a sliding window. Initially, we calculate the sum of the first k elements. As we slide the window by one element to the right, we subtract the element that is going out of the window and add the new element that is coming into the window. This allows us to calculate the sum of each subarray in constant time.

Dynamic Programming for Tracking Maximum Sums:
We need to keep track of the best possible indices for subarrays:

max1: Tracks the maximum sum of the first subarray.
max12: Tracks the maximum sum for the first two subarrays (combination of max1 and a subarray starting after max1).
max123: Tracks the maximum sum for all three subarrays.
Sliding Window Overlapping Logic:
We update the sums dynamically as we move the window. We calculate the sum of the first, second, and third subarrays at each step and update the indices of where these subarrays start if we find a new maximum sum.

Steps:
Initialize the sums for the first three subarrays (sum1, sum2, and sum3) of length k.
Calculate max1, max12, and max123 by iterating through the array and updating the sums dynamically.
At each step, if a new sum is greater than the previous maximum, update the corresponding maximum and the indices.
Return the indices of the three subarrays that yield the maximum sum.
Detailed Explanation:
Initialization:

Calculate the initial sum for the first three subarrays (each of length k).
Set the initial maximum values for max1, max12, and max123.
Sliding Window Updates:

For each index from 1 to n - 3k, update the three subarray sums (sum1, sum2, and sum3) by sliding the window.
Track the maximum sum for the first subarray (sum1), the first two subarrays combined (sum12), and all three subarrays combined (sum123).
Final Result:

After iterating through the array, the result will contain the indices of the three subarrays that yield the maximum sum.
Complexity:
Time complexity:

Sliding Window: For each of the three subarrays, we only iterate through the array once. This gives us a time complexity of O(n), where n is the length of the array.
Dynamic Updates: Since we only update a few variables (max sums and indices) in each iteration, the time complexity for each step is constant. Thus, the overall time complexity is O(n).
Space complexity:

Auxiliary Variables: We are using a constant amount of extra space to store the subarray sums and indices. Therefore, the space complexity is O(1).
If you have any questions or need further clarification, feel free to drop a comment! 😊
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSumOfThreeSubarrays = function(nums, k) {
    let n = nums.length;
    let sum1 = 0, sum2 = 0, sum3 = 0;
    let max1 = 0, max12 = 0, max123 = 0;
    let index1 = 0, index12_1 = 0, index12_2 = k;
    let ans = [0, k, 2 * k];

    for (let i = 0; i < k; i++) {
        sum1 += nums[i];
        sum2 += nums[i + k];
        sum3 += nums[i + 2 * k];
    }
    max1 = sum1;
    max12 = sum1 + sum2;
    max123 = sum1 + sum2 + sum3;

    for (let i = 0; i <= n - 3 * k; i++) {
        if (i > 0) {
            sum1 = sum1 - nums[i - 1] + nums[i + k - 1];
            sum2 = sum2 - nums[i + k - 1] + nums[i + 2 * k - 1];
            sum3 = sum3 - nums[i + 2 * k - 1] + nums[i + 3 * k - 1];
        }

        if (sum1 > max1) {
            max1 = sum1;
            index1 = i;
        }

        if (max1 + sum2 > max12) {
            max12 = max1 + sum2;
            index12_1 = index1;
            index12_2 = i + k;
        }

        if (max12 + sum3 > max123) {
            max123 = max12 + sum3;
            ans = [index12_1, index12_2, i + 2 * k];
        }
    }

    return ans;
};