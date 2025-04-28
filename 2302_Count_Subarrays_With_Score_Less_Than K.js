/**
 * 2302. Count Subarrays With Score Less Than K
 * Difficulty: Hard
 * 
 * The score of an array is defined as the product of its sum and its length.

For example, the score of [1, 2, 3, 4, 5] is (1 + 2 + 3 + 4 + 5) * 5 = 75.
Given a positive integer array nums and an integer k, return the number of non-empty subarrays of nums whose score is strictly less than k.
A subarray is a contiguous sequence of elements within an array.

Example 1:

Input: nums = [2,1,4,3,5], k = 10
Output: 6
Explanation:
The 6 subarrays having scores less than 10 are:
- [2] with score 2 * 1 = 2.
- [1] with score 1 * 1 = 1.
- [4] with score 4 * 1 = 4.
- [3] with score 3 * 1 = 3. 
- [5] with score 5 * 1 = 5.
- [2,1] with score (2 + 1) * 2 = 6.
Note that subarrays such as [1,4] and [4,3,5] are not considered because their scores are 10 and 36 respectively, while we need scores strictly less than 10.
Example 2:

Input: nums = [1,1,1], k = 5
Output: 5
Explanation:
Every subarray except [1,1,1] has a score less than 5.
[1,1,1] has a score (1 + 1 + 1) * 3 = 9, which is greater than 5.
Thus, there are 5 subarrays having scores less than 5.
 
Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
1 <= k <= 1015
 */

/**
 * Intuition
The problem asks us to find the number of subarrays where the average is less than a given value.
Since average = (sum of subarray) / (length of subarray),
we rearrange it to:
sum of subarray < k × length of subarray.
We can maintain a sliding window where we expand the window by moving the right pointer and shrink the window by moving the left pointer when the condition is violated.

Approach
Initialize two pointers left and right.

Expand right and keep adding elements to sum.

Whenever sum * (right - left + 1) >= k, shrink the window by moving left and adjusting the sum.

After adjusting, the number of valid subarrays ending at right is (right - left + 1).

Accumulate this value into the answer.

Complexity
Time complexity:
O(n)
Space complexity:
O(1)
 */


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function(nums, k) {
    let ans = 0, sum = 0, left = 0;
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        while (sum * (right - left + 1) >= k) {
            sum -= nums[left++];
        }
        ans += right - left + 1;
    }
    return ans;
};