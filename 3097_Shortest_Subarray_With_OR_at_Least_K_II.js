/**
 * 3097. Shortest Subarray With OR at Least K II
 * Difficulty: Medium
 * 
 * You are given an array nums of non-negative integers and an integer k.

An array is called special if the bitwise OR of all of its elements is at least k.
Return the length of the shortest special non-empty 
subarray
 of nums, or return -1 if no special subarray exists.


Example 1:
Input: nums = [1,2,3], k = 2
Output: 1
Explanation:
The subarray [3] has OR value of 3. Hence, we return 1.
Example 2:
Input: nums = [2,1,8], k = 10
Output: 3
Explanation:
The subarray [2,1,8] has OR value of 11. Hence, we return 3.
Example 3:
Input: nums = [1,2], k = 0
Output: 1
Explanation:
The subarray [1] has OR value of 1. Hence, we return 1.

Constraints:
1 <= nums.length <= 2 * 105
0 <= nums[i] <= 109
0 <= k <= 109
 */

/**
 * Intuition
We are tasked with finding the shortest subarray whose bitwise OR is greater than or equal to a given value k. We can use a sliding window approach to explore each subarray while maintaining the bitwise OR of the elements in the window. If the OR value satisfies the condition, we try to minimize the window's length.

Approach
We use two pointers (left and right) to represent a sliding window over the array.
We maintain a bitCount array to keep track of the count of set bits at each position.
For each new element in the window, we update the bitwise OR.
Whenever the bitwise OR of the window meets or exceeds k, we try to shrink the window from the left to find the shortest possible valid subarray.
Return the length of the shortest valid subarray, or -1 if no such subarray exists.
Complexity
Time complexity: (O(n \cdot 32)), where (n) is the length of the array, and 32 is the number of bits in the integer (since the maximum number is (10^9), which fits in 32 bits).
Space complexity: (O(32)) for the bitCount array, which stores the count of bits for 32 positions.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumSubarrayLength = function(nums, k) {
    let n = nums.length;
    let bitCount = new Array(32).fill(0);
    let currentOR = 0;
    let left = 0;
    let minLength = Infinity;
    
    for (let right = 0; right < n; right++) {
        currentOR |= nums[right];
        
        for (let bit = 0; bit < 32; bit++) {
            if (nums[right] & (1 << bit)) {
                bitCount[bit]++;
            }
        }
        
        while (left <= right && currentOR >= k) {
            minLength = Math.min(minLength, right - left + 1);
            
            let updatedOR = 0;
            for (let bit = 0; bit < 32; bit++) {
                if (nums[left] & (1 << bit)) {
                    bitCount[bit]--;
                }
                if (bitCount[bit] > 0) {
                    updatedOR |= (1 << bit);
                }
            }
            currentOR = updatedOR;
            left++;
        }
    }
    
    return minLength === Infinity ? -1 : minLength;
};