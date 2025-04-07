/**
 * 416. Partition Equal Subset Sum
 * Difficulty: Medium
 * 
 * Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

Example 1:
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
Example 2:
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.

Constraints:
1 <= nums.length <= 200
1 <= nums[i] <= 100
 */

/**
 * 🧠 Problem Summary
You are given a list of positive integers. Your task is to determine whether it can be split into two subsets such that the sum of elements in both subsets is equal.

💡 Key Idea
We want to check if there's a subset of numbers in the array that adds up to half of the total sum.

If we can find such a subset, the remaining elements will naturally form the other half.
If the total sum is odd, we cannot split it into two equal parts — return false.
⚙️ What’s a Bitset and Why Use It?
A bitset is like an array of bits (0s and 1s), and it's very efficient for subset sum problems.

bit[i] == 1 means we can form a subset that adds up to sum i.
bit |= bit << num updates all current possible subset sums by adding num.
Approach ⚙️
Compute the total sum of the array.
If the sum is odd, return false immediately as it can't be split evenly.
Use a bitset to represent which subset sums are possible. The bitset index i will be true if there's a subset with sum i.
Initialize the bitset with only the 0-th bit set (meaning sum 0 is always possible).
For each number in the array, update the bitset by shifting its bits to the left by the value of the number and performing a bitwise OR.
If bit[sum / 2] becomes true at any point, return true immediately — we found a valid subset.
If the loop finishes, return the final value of bit[sum / 2].
Complexity ⏱️
Time complexity:
O(n⋅target)
In practice, this bitset solution is very efficient due to hardware-level bit manipulation.

Space complexity:
O(target)
Because the bitset tracks up to sum / 2 values.
 */


/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    let total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 !== 0) return false;
    
    let target = total / 2;
    possible = new Set([0]);
    
    for (let num of nums) {
        let newPossible = new Set(possible);
        for (let s of possible) {
            if (s + num === target) return true;
            newPossible.add(s + num);
        }
        possible = newPossible;
    }

    return possible.has(target);
};