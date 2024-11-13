/**
 * 2563. Count the Number of Fair Pairs
 * Difficulty: Medium
 * 
 * Given a 0-indexed integer array nums of size n and two integers lower and upper, return the number of fair pairs.

A pair (i, j) is fair if:

0 <= i < j < n, and
lower <= nums[i] + nums[j] <= upper
 

Example 1:

Input: nums = [0,1,7,4,4,5], lower = 3, upper = 6
Output: 6
Explanation: There are 6 fair pairs: (0,3), (0,4), (0,5), (1,3), (1,4), and (1,5).
Example 2:

Input: nums = [1,7,9,2,5], lower = 11, upper = 11
Output: 1
Explanation: There is a single fair pair: (2,3).
 

Constraints:

1 <= nums.length <= 105
nums.length == n
-109 <= nums[i] <= 109
-109 <= lower <= upper <= 109
 */

/**
 * Explanation (Step-by-Step)
Sort the Array: Sorting the array allows us to efficiently find ranges of valid pairs.

Iterate Through Elements: We loop through each element, considering it as the first item in a pair.

Binary Search for Bounds: For each element:

Use lower_bound or equivalent to find the first position in the sorted array where v[j] can create a sum greater than or equal to lower.
Use upper_bound to find where v[j] exceeds the upper limit.
Accumulate the Count: The count of valid pairs for each v[i] is the difference between upper_bound and lower_bound.

Complexity
Time Complexity: Sorting the array takes (O(n \log n)). Each query to find bounds runs in (O(\log n)), and we repeat it for each element in the array, resulting in a total time complexity of (O(n \log n)).
Space Complexity: (O(1)), aside from the input, as we only store the result.
 */


/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function(nums, lower, upper) {
    nums.sort((a, b) => a - b);
    let ans = 0;
  
    for (let i = 0; i < nums.length - 1; i++) {
        const low = lowerBound(nums, lower - nums[i], i + 1);
        const up = upperBound(nums, upper - nums[i], i + 1);
        ans += up - low;
    }
    return ans;
};

function lowerBound(nums, target, start) {
    let end = nums.length;
    while (start < end) {
        let mid = Math.floor((start + end) / 2);
        if (nums[mid] >= target) end = mid;
        else start = mid + 1;
    }
    return start;
}

function upperBound(nums, target, start) {
    let end = nums.length;
    while (start < end) {
        let mid = Math.floor((start + end) / 2);
        if (nums[mid] > target) end = mid;
        else start = mid + 1;
    }
    return start;
}