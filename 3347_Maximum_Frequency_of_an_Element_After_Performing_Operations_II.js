/**
 * 3347. Maximum Frequency of an Element After Performing Operations II
 * Difficulty: Hard
 * 
 * You are given an integer array nums and two integers k and numOperations.

You must perform an operation numOperations times on nums, where in each operation you:

Select an index i that was not selected in any previous operations.
Add an integer in the range [-k, k] to nums[i].
Return the maximum possible frequency of any element in nums after performing the operations.

 

Example 1:

Input: nums = [1,4,5], k = 1, numOperations = 2

Output: 2

Explanation:

We can achieve a maximum frequency of two by:

Adding 0 to nums[1], after which nums becomes [1, 4, 5].
Adding -1 to nums[2], after which nums becomes [1, 4, 4].
Example 2:

Input: nums = [5,11,20,20], k = 5, numOperations = 1

Output: 2

Explanation:

We can achieve a maximum frequency of two by:

Adding 0 to nums[1].
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 109
0 <= k <= 109
0 <= numOperations <= nums.length
 */

/**
 * Approach
Sort nums. Sorting helps find ranges quickly with binary search or two pointers.

Precompute frequency of each value (using a map or contiguous counts) so we immediately know how many are already equal to a candidate v.

Case A (existing value v as target):

For each distinct value v, find L = lower_bound(nums, v - k) and R = upper_bound(nums, v + k).
total_in_range = R - L are the indices that can be converted to v (including those already equal).
already_equal = freq[v].
need = total_in_range - already_equal is how many indices require one operation to become v.
I can convert at most min(need, numOperations) of them. So achieved frequency = already_equal + min(need, numOperations). Update answer.
Case B (non-existing meeting point; window length 2*k):

Use a two-pointer sliding window: for each left i, move right j while nums[j] - nums[i] <= 2*k.
Window size w = j - i means there are w elements that can meet to some common value (not necessarily an existing value). But we can only convert at most numOperations indexes (if none are already equal); so achievable frequency is min(w, numOperations) — actually if we already have duplicates inside window we don't need operations for those. To be safe and simple we take min(w, numOperations) as a candidate too (it covers the case [5,64] where no duplicates exist but with 2 operations we can bring both to same).
Combine this with results from Case A and pick the maximum.
Return max frequency.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function(nums, k, numOperations) {
  const n = nums.length;
  if (n === 0) return 0;
  nums.sort((a,b) => a - b);

  const freq = new Map();
  for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);

  let ans = 1;

  const lowerBound = (arr, target) => {
    let l = 0, r = arr.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (arr[mid] < target) l = mid + 1; else r = mid;
    }
    return l;
  };
  const upperBound = (arr, target) => {
    let l = 0, r = arr.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (arr[mid] <= target) l = mid + 1; else r = mid;
    }
    return l;
  };

  for (const [v, already] of freq.entries()) {
    const lowVal = v - k;
    const highVal = v + k;
    const L = lowerBound(nums, lowVal);
    const R = upperBound(nums, highVal);
    const totalInRange = R - L;
    const need = totalInRange - already;
    const canFix = Math.min(need, numOperations);
    ans = Math.max(ans, already + canFix);
  }

  let l = 0;
  for (let r = 0; r < n; ++r) {
    while (l <= r && nums[r] - nums[l] > 2 * k) l++;
    const w = r - l + 1;
    ans = Math.max(ans, Math.min(w, numOperations));
  }

  return ans;
};