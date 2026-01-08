/**
 * 1458. Max Dot Product of Two Subsequences
 * Difficulty : Given two arrays nums1 and nums2.

Return the maximum dot product between non-empty subsequences of nums1 and nums2 with the same length.\
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
 * Approach
I solved this using 2D Dynamic Programming.

Step 1: Define DP state
I created a DP table:

dp[i][j]
This means:
maximum dot product using non-empty subsequences from

nums1[i … end]
nums2[j … end]
Step 2: Choices at each position
At every (i, j), I have three options:

Take both elements

Multiply nums1[i] * nums2[j]
Then optionally continue with dp[i+1][j+1]
But I must be careful: subsequence must be non-empty
So I take max(product, product + dp[i+1][j+1])
Skip element from nums1

Move to dp[i+1][j]
Skip element from nums2

Move to dp[i][j+1]
I take the maximum of all three.

Step 3: Base case
If either index reaches the end of its array,
I return a very small negative number, not zero.

Why?
Because the subsequence must be non-empty,
and returning zero would allow an invalid empty choice.

Step 4: Final answer
The answer will be stored in dp[0][0].
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDotProduct = function(nums1, nums2) {
    const n = nums1.length;
    const m = nums2.length;
    
    const dp = Array.from({ length: n + 1 }, () =>
        Array(m + 1).fill(-Infinity)
    );
    
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            const product = nums1[i] * nums2[j];
            
            let takeBoth = product;
            if (dp[i + 1][j + 1] !== -Infinity) {
                takeBoth = Math.max(takeBoth, product + dp[i + 1][j + 1]);
            }
            
            dp[i][j] = Math.max(
                takeBoth,
                dp[i + 1][j],
                dp[i][j + 1]
            );
        }
    }
    
    return dp[0][0];
};