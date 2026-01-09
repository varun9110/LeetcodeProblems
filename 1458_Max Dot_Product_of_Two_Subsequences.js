/**
 * 1458. Max Dot Product of Two Subsequences
 * Difficulty: Hard
 * 
 * Given two arrays nums1 and nums2.

Return the maximum dot product between non-empty subsequences of nums1 and nums2 with the same length.

A subsequence of a array is a new array which is formed from the original array by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, [2,3,5] is a subsequence of [1,2,3,4,5] while [1,5,3] is not).

 

Example 1:

Input: nums1 = [2,1,-2,5], nums2 = [3,0,-6]
Output: 18
Explanation: Take subsequence [2,-2] from nums1 and subsequence [3,-6] from nums2.
Their dot product is (2*3 + (-2)*(-6)) = 18.
Example 2:

Input: nums1 = [3,-2], nums2 = [2,-6,7]
Output: 21
Explanation: Take subsequence [3] from nums1 and subsequence [7] from nums2.
Their dot product is (3*7) = 21.
Example 3:

Input: nums1 = [-1,-1], nums2 = [1,1]
Output: -1
Explanation: Take subsequence [-1] from nums1 and subsequence [1] from nums2.
Their dot product is -1.
 

Constraints:

1 <= nums1.length, nums2.length <= 500
-1000 <= nums1[i], nums2[i] <= 1000
 */

/**
 * Intuition
We need the maximum dot product of two non-empty subsequences with the same length.
This is similar to LCS-style DP: at each position, we can either match two elements or skip one element from either array.
Because the subsequence must be non-empty, we also handle the case where the best answer would otherwise incorrectly become 0.

Approach
(Optional swap) If nums1[0] > nums2[0], swap the arrays to keep behavior consistent with the given code.
Handle the special case where:
all numbers in nums1 are negative AND all numbers in nums2 are positive
In that case, the best non-empty dot product is max(nums1) * min(nums2).
Use 1D DP:
dp[j] represents the best dot product using some subsequence from processed part of nums1 and the first j elements of nums2.
For each nums1[i], update dp from right to left:
Try pairing nums1[i] with nums2[j] and extending a previous best stored in dp[j].
Do a left-to-right pass to ensure dp is non-decreasing (dp[j+1] = max(dp[j+1], dp[j])).
Answer is dp[n].
Complexity
Time complexity:
O(m * n)

Space complexity:
O(n)
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDotProduct = function(nums1, nums2) {
    if (nums1[0] > nums2[0]){
        const tmp = nums1; nums1 = nums2; nums2 = tmp;
    }
    const max1 = Math.max(...nums1);
    const min2 = Math.min(...nums2);
    if (max1 < 0 && min2 > 0)
        return max1 * min2;
    const m = nums1.length; n = nums2.length;
    const dp = new Array(n + 1).fill(0);
    for (let i = 0; i < m; i++){
        for (let j = n - 1; j >= 0; j--){
            const v = nums1[i] * nums2[j] + dp[j];
            if (v > dp[j + 1])
                dp[j + 1] = v;
        }
        for (let j = 0; j < n; j++){
            if (dp[j + 1] < dp[j])
                dp[j + 1] = dp[j];
        }
    }
    return dp[n];
};