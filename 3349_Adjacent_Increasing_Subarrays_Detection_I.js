/**
 * 3349. Adjacent Increasing Subarrays Detection I
 * Difficulty: Easy
 * 
 * Given an array nums of n integers and an integer k, determine whether there exist two adjacent subarrays of length k such that both subarrays are strictly increasing. Specifically, check if there are two subarrays starting at indices a and b (a < b), where:

Both subarrays nums[a..a + k - 1] and nums[b..b + k - 1] are strictly increasing.
The subarrays must be adjacent, meaning b = a + k.
Return true if it is possible to find two such subarrays, and false otherwise.

 

Example 1:

Input: nums = [2,5,7,8,9,2,3,4,3,1], k = 3

Output: true

Explanation:

The subarray starting at index 2 is [7, 8, 9], which is strictly increasing.
The subarray starting at index 5 is [2, 3, 4], which is also strictly increasing.
These two subarrays are adjacent, so the result is true.
Example 2:

Input: nums = [1,2,3,4,4,4,4,5,6,7], k = 5

Output: false

 

Constraints:

2 <= nums.length <= 100
1 < 2 * k <= nums.length
-1000 <= nums[i] <= 1000
 */

/**
 * Approach: One-time Traversal
Intuition
If there exist two adjacent strictly increasing subarrays of length k, then there also exist two adjacent strictly increasing subarrays of length k−1 (excluding the first and last elements). Therefore, we only need to find the largest value k 
′
  that satisfies this condition. If k≤k 
′
 , we return true; otherwise, we return false.

We traverse the array nums once, using cnt and precnt to record the length of the current strictly increasing subarray and the previous one, respectively.

Initially, cnt=1 and precnt=0. When traversing to nums[i], if it is greater than nums[i−1], we increment cnt by 1; otherwise, the increasing sequence ends, so we assign cnt to precnt and reset cnt to 1.

There are two cases for two adjacent subarrays that satisfy the condition:

The previous subarray corresponds to precnt and the current one to cnt, in which case k 
′
 =min(precnt,cnt).

Both subarrays are part of the same increasing segment represented by cnt, in which case k 
′
 =⌊ 
2
cnt
​
 ⌋, where ⌊⋅⌋ denotes the floor function.

Based on these two cases, we continuously update the maximum value of k 
′
 . After completing the traversal, we check whether k≤k 
′
  holds.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var hasIncreasingSubarrays = function (nums, k) {
    const n = nums.length;
    let cnt = 1,
        precnt = 0,
        ans = 0;
    for (let i = 1; i < n; ++i) {
        if (nums[i] > nums[i - 1]) {
            ++cnt;
        } else {
            precnt = cnt;
            cnt = 1;
        }
        ans = Math.max(ans, Math.min(precnt, cnt));
        ans = Math.max(ans, Math.floor(cnt / 2));
    }
    return ans >= k;
};