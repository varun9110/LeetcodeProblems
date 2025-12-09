/**
 * 3583. Count Special Triplets
 * Difficulty: Medium
 * 
 * You are given an integer array nums.

A special triplet is defined as a triplet of indices (i, j, k) such that:

0 <= i < j < k < n, where n = nums.length
nums[i] == nums[j] * 2
nums[k] == nums[j] * 2
Return the total number of special triplets in the array.

Since the answer may be large, return it modulo 109 + 7.

 

Example 1:

Input: nums = [6,3,6]

Output: 1

Explanation:

The only special triplet is (i, j, k) = (0, 1, 2), where:

nums[0] = 6, nums[1] = 3, nums[2] = 6
nums[0] = nums[1] * 2 = 3 * 2 = 6
nums[2] = nums[1] * 2 = 3 * 2 = 6
Example 2:

Input: nums = [0,1,0,0]

Output: 1

Explanation:

The only special triplet is (i, j, k) = (0, 2, 3), where:

nums[0] = 0, nums[2] = 0, nums[3] = 0
nums[0] = nums[2] * 2 = 0 * 2 = 0
nums[3] = nums[2] * 2 = 0 * 2 = 0
Example 3:

Input: nums = [8,4,2,8,4]

Output: 2

Explanation:

There are exactly two special triplets:

(i, j, k) = (0, 1, 3)
nums[0] = 8, nums[1] = 4, nums[3] = 8
nums[0] = nums[1] * 2 = 4 * 2 = 8
nums[3] = nums[1] * 2 = 4 * 2 = 8
(i, j, k) = (1, 2, 4)
nums[1] = 4, nums[2] = 2, nums[4] = 4
nums[1] = nums[2] * 2 = 2 * 2 = 4
nums[4] = nums[2] * 2 = 2 * 2 = 4
 

Constraints:

3 <= n == nums.length <= 105
0 <= nums[i] <= 105
 */

/**
 * Intuition
We need to count the number of special triplets (i, j, k) where i < j < k and nums[i] = 2 * nums[j] = 4 * nums[k].
We can reframe the problem as counting triplets where the middle element acts as a "pivot" and track the number of valid elements on the left and right of it.

Approach
Initialize two frequency maps:

leftFreq to count occurrences of elements to the left of the current pivot j.
rightFreq to count occurrences of elements to the right of the current pivot j.
Fill rightFreq initially with all elements.

Iterate through the array with j as the pivot:

Remove the current pivot from rightFreq.
Compute target = 2 * nums[j].
The number of valid triplets with nums[j] as middle is leftFreq.get(target) * rightFreq.get(target).
Update result modulo 1e9+7.
Add the current pivot to leftFreq.
Return the final count.

Complexity
Time complexity:

Single pass through the array → O(n)
Space complexity:

Two frequency maps storing up to n elements → O(n)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
let specialTriplets = function (nums) {
    const MOD = 1e9 + 7;
    const n = nums.length;
    let res = 0;
    const leftFreq = new Map();
    const rightFreq = new Map();

    for (const num of nums) {
        rightFreq.set(num, (rightFreq.get(num) || 0) + 1);
    }

    for (let j = 0; j < n; j++) {
        const val = nums[j];
        rightFreq.set(val, rightFreq.get(val) - 1);
        const target = val * 2;
        const leftCount = leftFreq.get(target) || 0;
        const rightCount = rightFreq.get(target) || 0;
        res = (res + (leftCount * rightCount) % MOD) % MOD;
        leftFreq.set(val, (leftFreq.get(val) || 0) + 1);
    }

    return res;
}