/**
 * 2616. Minimize the Maximum Difference of Pairs
 * Difficulty: Medium
 * 
 *  You are given a 0-indexed integer array nums and an integer p. Find p pairs of indices of nums such that the maximum difference amongst all the pairs is minimized. Also, ensure no index appears more than once amongst the p pairs.

Note that for a pair of elements at the index i and j, the difference of this pair is |nums[i] - nums[j]|, where |x| represents the absolute value of x.
Return the minimum maximum difference among all p pairs. We define the maximum of an empty set to be zero.

Example 1:
Input: nums = [10,1,2,7,1,3], p = 2
Output: 1
Explanation: The first pair is formed from the indices 1 and 4, and the second pair is formed from the indices 2 and 5. 
The maximum difference is max(|nums[1] - nums[4]|, |nums[2] - nums[5]|) = max(0, 1) = 1. Therefore, we return 1.
Example 2:

Input: nums = [4,2,1,2], p = 1
Output: 0
Explanation: Let the indices 1 and 3 form a pair. The difference of that pair is |2 - 2| = 0, which is the minimum we can attain.

Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 109
0 <= p <= (nums.length)/2
 */


/**
 * the goal here is to select p non-overlapping pairs in a way that minimizes the maximum absolute difference between the elements in each pair.

in order to minimize this "maximum difference", we can utilize binary search to check if it's possible to make p valid pairs under a given difference constraint d.

The helper function canFormPairs() checks if we can pick at least p non-overlapping adjacent pairs in the array where each pair has a difference of at most d.

For each position:
Check the next element.
If the difference is small enough (≤ d):
Count it as a valid pair.
Skip the next one (move i forward again) to avoid overlap.
Stop early if enough pairs (p) are found.
Return true if successful, false otherwise.
Overall Algorithm: Step-by-Step

sort() nums in ascending order.

adjacent elements will be as close as possible, minimizing differences.

Apply binarySearch() over the possible difference values (d):

In each iteration:
Let M be the midpoint of [L, H].
Call canFormPairs(nums, M, p):
If true, try smaller d by setting H = M.
If false, try larger d by setting L = M + 1.
When L == H, the minimal possible d satisfying the requirement is found.
Return L as the final answer.

Time complexity:O(nlogm)

Space complexity:O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
const minimizeMax = (nums, p) => {
    nums.sort((a, b) => a - b);

    const canFormPairs = (nums, d, p, c = 0) => {
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i + 1] - nums[i] <= d) {
                c++;
                i++;
            }
            if (c >= p) return true;
        }
        return false;
    };

    const binarySearch = (nums, p) => {
        let L = 0, H = nums.at(-1) - nums[0];
        while (L < H) {
            const M = L + ((H - L) >> 1);
            if (canFormPairs(nums, M, p)) {
                H = M;
            } else {
                L = M + 1;
            }
        }
        return L;
    };

    return binarySearch(nums, p);
};