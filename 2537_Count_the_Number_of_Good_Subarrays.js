/**
 * 2537. Count the Number of Good Subarrays
 * Difficulty: Medium
 * 
 * Given an integer array nums and an integer k, return the number of good subarrays of nums.

A subarray arr is good if there are at least k pairs of indices (i, j) such that i < j and arr[i] == arr[j].

A subarray is a contiguous non-empty sequence of elements within an array.


Example 1:
Input: nums = [1,1,1,1,1], k = 10
Output: 1
Explanation: The only good subarray is the array nums itself.
Example 2:
Input: nums = [3,1,4,3,2,2,4], k = 2
Output: 4
Explanation: There are 4 different good subarrays:
- [3,1,4,3,2,2] that has 2 pairs.
- [3,1,4,3,2,2,4] that has 3 pairs.
- [1,4,3,2,2,4] that has 2 pairs.
- [4,3,2,2,4] that has 2 pairs.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i], k <= 109
 */

/**
 * Intuition
We need to count subarrays where the number of pairs (i, j) such that i < j and nums[i] == nums[j] is at least k.
A brute force approach would check every subarray, count pairs, and compare to k, but that would be too slow for large arrays.
Instead, we use a sliding window to efficiently track how many valid pairs are in a window.
Approach
Two pointers (left, right) define the sliding window.
Use a frequency map (freq) to track how many times each number has occurred in the window.
For each new element added to the window:
Update the pair count using: pairCount += freq[val] (because adding the same number makes new pairs with all previous occurrences).
If pairCount >= k, it means all subarrays starting from left to end that include this window are valid.
So add nums.length - right to the count.
Then, shrink the window from the left side to continue checking further possibilities.
Complexity
Time complexity:

O(n): Each index is added/removed from the sliding window at most once.
Space complexity:

O(n): To store frequency counts in a hash map.
 */


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countGood = function (nums, k) {
    let left = 0;
    let count = 0;
    let pairCount = 0;
    const freq = new Map();

    for (let right = 0; right < nums.length; right++) {
        const val = nums[right];
        freq.set(val, (freq.get(val) || 0) + 1);
        pairCount += freq.get(val) - 1;

        while (pairCount >= k) {
            count += nums.length - right;
            const leftVal = nums[left];
            pairCount -= freq.get(leftVal) - 1;
            freq.set(leftVal, freq.get(leftVal) - 1);
            left++;
        }
    }

    return count;
};