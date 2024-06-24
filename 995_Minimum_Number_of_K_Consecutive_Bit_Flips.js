/**
 * 995. Minimum Number of K Consecutive Bit Flips
 * Difficulty: Hard
 * 
 * You are given a binary array nums and an integer k.

A k-bit flip is choosing a subarray of length k from nums and simultaneously changing every 0 in the subarray to 1, and every 1 in the subarray to 0.

Return the minimum number of k-bit flips required so that there is no 0 in the array. If it is not possible, return -1.

A subarray is a contiguous part of an array.

 

Example 1:

Input: nums = [0,1,0], k = 1
Output: 2
Explanation: Flip nums[0], then flip nums[2].
Example 2:

Input: nums = [1,1,0], k = 2
Output: -1
Explanation: No matter how we flip subarrays of size 2, we cannot make the array become [1,1,1].
Example 3:

Input: nums = [0,0,0,1,0,1,1,0], k = 3
Output: 3
Explanation: 
Flip nums[0],nums[1],nums[2]: nums becomes [1,1,1,1,0,1,1,0]
Flip nums[4],nums[5],nums[6]: nums becomes [1,1,1,1,1,0,0,0]
Flip nums[5],nums[6],nums[7]: nums becomes [1,1,1,1,1,1,1,1]
 

Constraints:

1 <= nums.length <= 105
1 <= k <= nums.length
 */


/**
 * Good question: 
 * Should know the concept of XOR to find the perfect combination of the previous flags. 
 * this would determine if the bits should be changed or not.
 * 
 * Intuition
The goal is to make sure there are no 0s left in the array after performing the minimum number of k-bit flips. A k-bit flip will flip every bit (0 to 1, or 1 to 0) in a subarray of length k. To achieve the minimum number of flips, we need to be strategic about where and when to flip the bits.

Approach
Tracking Flips: Use a helper array isFlipped to keep track of flips. This array will mark whether a flip operation is active at a particular index.
Flipped State: Maintain a flipped state to indicate the number of active flips.
Iterate through the array:
For each position i, check if it needs to be flipped. This is determined by the parity of flipped and the current bit (nums[i]).
If the bit needs to be flipped:
Ensure that flipping a subarray starting at i and extending to i + k - 1 is within bounds.
Mark this position in isFlipped as starting a flip.
Update the flipped state.
Increment the result counter which counts the number of flips.
If the position i - k was previously flipped, decrement the flipped state.
Complexity
Time Complexity: O(n), where n is the length of the input array nums. Each element is processed a constant number of times.
Space Complexity: O(n), for the additional isFlipped array used to keep track of the flips.
 */


var minKBitFlips = function(nums, k) {
    const n = nums.length;
    let flipped = 0;
    let res = 0;
    const isFlipped = new Array(n).fill(0);

    for (let i = 0; i < n; ++i) {
        if (i >= k) {
            flipped ^= isFlipped[i - k];
        }
        if (flipped == nums[i]) {
            if (i + k > n) {
                return -1;
            }
            isFlipped[i] = 1;
            flipped ^= 1;
            res++;
        }
    }

    return res;
};