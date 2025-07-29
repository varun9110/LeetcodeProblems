/**
 * 2411. Smallest Subarrays With Maximum Bitwise OR
 * Difficulty: Medium
 * 
 * You are given a 0-indexed array nums of length n, consisting of non-negative integers. For each index i from 0 to n - 1, you must determine the size of the minimum sized non-empty subarray of nums starting at i (inclusive) that has the maximum possible bitwise OR.

In other words, let Bij be the bitwise OR of the subarray nums[i...j]. You need to find the smallest subarray starting at i, such that bitwise OR of this subarray is equal to max(Bik) where i <= k <= n - 1.
The bitwise OR of an array is the bitwise OR of all the numbers in it.

Return an integer array answer of size n where answer[i] is the length of the minimum sized subarray starting at i with maximum bitwise OR.

A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: nums = [1,0,2,1,3]
Output: [3,3,2,2,1]
Explanation:
The maximum possible bitwise OR starting at any index is 3. 
- Starting at index 0, the shortest subarray that yields it is [1,0,2].
- Starting at index 1, the shortest subarray that yields the maximum bitwise OR is [0,2,1].
- Starting at index 2, the shortest subarray that yields the maximum bitwise OR is [2,1].
- Starting at index 3, the shortest subarray that yields the maximum bitwise OR is [1,3].
- Starting at index 4, the shortest subarray that yields the maximum bitwise OR is [3].
Therefore, we return [3,3,2,2,1]. 
Example 2:

Input: nums = [1,2]
Output: [2,1]
Explanation:
Starting at index 0, the shortest subarray that yields the maximum bitwise OR is of length 2.
Starting at index 1, the shortest subarray that yields the maximum bitwise OR is of length 1.
Therefore, we return [2,1].
 

Constraints:

n == nums.length
1 <= n <= 105
0 <= nums[i] <= 109
 */

/**
 * Bitwise OR as Light Propagation – Visual Analogy:

We can understand this problem through a physical simulation:

Conceptual Model:

Imagine each number as a platform with (up to 30 layers), each corresponding to a bit position from 0 to 29.
If a bit is set to (1) in nums[i], that layer is "opaque" at index i, so it "blocks light" from passing downward.
If a bit is (0), the corresponding layer is "transparent" at index i, so light can pass through.
Simulation Process:

We simulate a "light source" that shines from the end of the array toward the beginning.

As we move to each layer, we progressively "restore illumination to each bit-layer".

The first index to block a given bit marks the "point where that bit becomes illuminated".

At each index i, we compute:

How far light needs to travel to fully illuminate all blocked layers (ex: collect all 1−bits contributing to the final OR).
The distance from i to the furthest index required to capture all the needed opaque layers (set bits) is the subarray size.
RESULT:

The maximum bit index reached (where light was last blocked by a 1−bit) determines how long we must extend the subarray.

The final result for index i is:

answer[i]=(furthest blocking index−i+1)
​
 
This is the minimal length of a subarray starting at i that accumulates all necessary opaque layers to achieve the maximum OR observable from that point onward.
 */


/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallestSubarrays = function(nums) {
    const len = nums.length,
		lastSeen = new Array(30).fill(0),
		res = new Array(len).fill(1);
	for (let i = len - 1; i >= 0; i--) {
		for (let bit = 0; bit < 30; bit++) {
			if ((nums[i] & (1 << bit)) > 0) lastSeen[bit] = i;
			res[i] = Math.max(res[i], lastSeen[bit] - i + 1);
		}
	}
	return res;
};