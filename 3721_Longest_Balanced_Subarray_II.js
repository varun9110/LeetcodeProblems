/**
 * 3721. Longest Balanced Subarray II
 * Difficulty: Hard
 * 
 * You are given an integer array nums.

A subarray is called balanced if the number of distinct even numbers in the subarray is equal to the number of distinct odd numbers.

Return the length of the longest balanced subarray.

 

Example 1:

Input: nums = [2,5,4,3]

Output: 4

Explanation:

The longest balanced subarray is [2, 5, 4, 3].
It has 2 distinct even numbers [2, 4] and 2 distinct odd numbers [5, 3]. Thus, the answer is 4.
Example 2:

Input: nums = [3,2,2,5,4]

Output: 5

Explanation:

The longest balanced subarray is [3, 2, 2, 5, 4].
It has 2 distinct even numbers [2, 4] and 2 distinct odd numbers [3, 5]. Thus, the answer is 5.
Example 3:

Input: nums = [1,2,3,2]

Output: 3

Explanation:

The longest balanced subarray is [2, 3, 2].
It has 1 distinct even number [2] and 1 distinct odd number [3]. Thus, the answer is 3.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
 */


/**
 * Intuition
This problem is about finding the longest balanced subarray, where balanced means the contribution of even and odd numbers cancels out.

Transform the problem

Treat even numbers as +1
Treat odd numbers as −1
A subarray is balanced if the sum over that subarray equals 0
Why simple prefix sums are not enough

Normally, prefix sums + hashmap can detect zero-sum subarrays.
Here, when a value appears again, its previous contribution must be removed.
This makes prefix sums dynamic, requiring range updates.
Role of the Segment Tree

We need to efficiently:
Add or subtract values over a range
Undo previous contributions when duplicates appear
Find the leftmost index where the balance is exactly 0
A lazy propagation segment tree supports all these operations in O(log n) time.
Key observation

At every index r, if there exists an index l ≤ r such that the prefix balance at l is 0,
then the subarray [l, r] is balanced.
Finding the earliest such l maximizes the subarray length.
Why min and max are tracked

If the minimum value in a segment is greater than 0 or the maximum is less than 0,
then 0 cannot exist in that segment.
This allows fast pruning when searching for the leftmost zero.
Core idea:
Dynamically maintain prefix balances with range updates and use a lazy segment tree to locate the earliest zero-balance prefix, yielding the longest balanced subarray.

Approach
Initialize helpers

Create a SegmentTree of size n to store prefix balance values.
Use a hashmap (prev) to track the last occurrence index of each number.
Initialize res = 0 to store the maximum balanced subarray length.
Iterate through the array

For each index r from 0 to n - 1:
Convert the current number:
Even → +1
Odd → -1
Handle duplicate values

If the current value has appeared before at index p:
Remove its previous contribution by applying a range update on [0, p]
with value -val.
Apply current contribution

Add the current contribution to all prefixes ending at r
using a range update on [0, r] with value val.
Update last occurrence

Store the current index r as the last occurrence of the value.
Find the longest balanced subarray

Query the segment tree to find the leftmost index l
where the prefix balance equals 0.
If such an index exists and l ≤ r,
update the result: res = max(res, r - l + 1).
Return the result

After processing all indices, return res.
Key Insight:
By dynamically maintaining prefix balances and removing outdated contributions of duplicate values, the segment tree enables efficient range updates and fast detection of zero-balance prefixes, allowing us to compute the longest balanced subarray in O(n log n) time.
 */




class SegmentTree {
  constructor(n) {
    this.n = n
    this.minTree = new Array(4 * n).fill(0)
    this.maxTree = new Array(4 * n).fill(0)
    this.lazy = new Array(4 * n).fill(0)
  }

  push(node, start, end) {
    if (this.lazy[node] !== 0) {
      this.minTree[node] += this.lazy[node]
      this.maxTree[node] += this.lazy[node]
      if (start !== end) {
        this.lazy[node * 2] += this.lazy[node]
        this.lazy[node * 2 + 1] += this.lazy[node]
      }
      this.lazy[node] = 0
    }
  }

  updateRange(node, start, end, l, r, val) {
    this.push(node, start, end)
    if (start > end || start > r || end < l) return

    if (l <= start && end <= r) {
      this.lazy[node] += val
      this.push(node, start, end)
      return
    }

    const mid = Math.floor((start + end) / 2)
    this.updateRange(node * 2, start, mid, l, r, val)
    this.updateRange(node * 2 + 1, mid + 1, end, l, r, val)

    this.minTree[node] = Math.min(
      this.minTree[node * 2],
      this.minTree[node * 2 + 1]
    )
    this.maxTree[node] = Math.max(
      this.maxTree[node * 2],
      this.maxTree[node * 2 + 1]
    )
  }

  findLeftmostZero(node, start, end) {
    this.push(node, start, end)
    if (this.minTree[node] > 0 || this.maxTree[node] < 0) return -1
    if (start === end) return this.minTree[node] === 0 ? start : -1

    const mid = Math.floor((start + end) / 2)
    const left = this.findLeftmostZero(node * 2, start, mid)
    if (left !== -1) return left
    return this.findLeftmostZero(node * 2 + 1, mid + 1, end)
  }
}


/**
 * @param {number[]} nums
 * @return {number}
 */
var longestBalanced = function(nums) {
    const n = nums.length
  const prev = new Map()
  const st = new SegmentTree(n)
  let res = 0

  for (let r = 0; r < n; r++) {
    const v = nums[r]
    const val = v % 2 === 0 ? 1 : -1

    if (prev.has(v)) {
      st.updateRange(1, 0, n - 1, 0, prev.get(v), -val)
    }

    st.updateRange(1, 0, n - 1, 0, r, val)
    prev.set(v, r)

    const l = st.findLeftmostZero(1, 0, n - 1)
    if (l !== -1 && l <= r) res = Math.max(res, r - l + 1)
  }

  return res
};