/**
 * 3637. Trionic Array I
 * Difficulty: Easy
 * 
 * You are given an integer array nums of length n.

An array is trionic if there exist indices 0 < p < q < n − 1 such that:

nums[0...p] is strictly increasing,
nums[p...q] is strictly decreasing,
nums[q...n − 1] is strictly increasing.
Return true if nums is trionic, otherwise return false.

Example 1:

Input: nums = [1,3,5,4,2,6]

Output: true

Explanation:

Pick p = 2, q = 4:

nums[0...2] = [1, 3, 5] is strictly increasing (1 < 3 < 5).
nums[2...4] = [5, 4, 2] is strictly decreasing (5 > 4 > 2).
nums[4...5] = [2, 6] is strictly increasing (2 < 6).
Example 2:
Input: nums = [2,1,3]
Output: false
Explanation:
There is no way to pick p and q to form the required three segments.

Constraints:

3 <= n <= 100
-1000 <= nums[i] <= 1000
 */


/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isTrionic = function(nums) {
    const n = nums.length;
    let peak = -1;
    let valley = n;

    for (let i = 0; i < n - 1; i++) {
        if (peak === -1 && nums[i] >= nums[i + 1])
            peak = i;

        if (valley === n && nums.at(-1 - i) <= nums.at(-2 - i))
            valley = n - 1 - i;

        if (peak !== -1 && valley !== n)
            break;
    }

    if (peak <= 0 || valley >= n - 1)
        return false;

    for (let i = peak; i < valley; i++)
        if (nums[i] <= nums[i + 1])
            return false;

    return true;
};