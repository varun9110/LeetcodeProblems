/**
 * 2762. Continuous Subarrays
 * Difficulty: Medium
 * 
 * You are given a 0-indexed integer array nums. A subarray of nums is called continuous if:

Let i, i + 1, ..., j be the indices in the subarray. Then, for each pair of indices i <= i1, i2 <= j, 0 <= |nums[i1] - nums[i2]| <= 2.
Return the total number of continuous subarrays.

A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [5,4,2,4]
Output: 8
Explanation: 
Continuous subarray of size 1: [5], [4], [2], [4].
Continuous subarray of size 2: [5,4], [4,2], [2,4].
Continuous subarray of size 3: [4,2,4].
Thereare no subarrys of size 4.
Total continuous subarrays = 4 + 3 + 1 = 8.
It can be shown that there are no more continuous subarrays.

Example 2:
Input: nums = [1,2,3]
Output: 6
Explanation: 
Continuous subarray of size 1: [1], [2], [3].
Continuous subarray of size 2: [1,2], [2,3].
Continuous subarray of size 3: [1,2,3].
Total continuous subarrays = 3 + 2 + 1 = 6.

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 109
 */

/**
 * Intuition
Since the maximum difference for any valid subarray is 2, we can just use a simple Map to track the frequency of everything in the sliding window. 
There can only be up to 3 keys in the map for any valid subarray (max - min <= 2). Once we have 4 keys in the map (or max - min > 2), the window size needs to decrease.

Complexity
Time complexity: O(n)
Space complexity: O(1) since there will be a maximum of 4 keys in the map before we start decreasing the window size (and subsequently removing one or more keys from the map).
 */

/**
 * @param {number[]} nums
 * @return {number}
 */

const continuousSubarrays = function(nums) {
    const map = new Map();
    let res = 0;
    for (let l = 0, r = 0; r < nums.length; ++r) {
        map.set(nums[r], (map.get(nums[r]) || 0) + 1);
        let keys = [...map.keys()];
        let min = Math.min(...keys);
        let max = Math.max(...keys);
        while (max - min > 2) {
            map.set(nums[l], map.get(nums[l]) - 1);
            if (map.get(nums[l]) === 0) map.delete(nums[l]);
            keys = [...map.keys()];
            min = Math.min(...keys);
            max = Math.max(...keys);
            ++l;
        }
        res += r - l + 1;
    }
    return res;    
};