/**
 * 3375. Minimum Operations to Make Array Values Equal to K
 * Difficulty: Easy
 * 
 *  You are given an integer array nums and an integer k.

An integer h is called valid if all values in the array that are strictly greater than h are identical.

For example, if nums = [10, 8, 10, 8], a valid integer is h = 9 because all nums[i] > 9 are equal to 10, but 5 is not a valid integer.

You are allowed to perform the following operation on nums:

Select an integer h that is valid for the current values in nums.
For each index i where nums[i] > h, set nums[i] to h.
Return the minimum number of operations required to make every element in nums equal to k. If it is impossible to make all elements equal to k, return -1.

Example 1:
Input: nums = [5,2,5,4,5], k = 2
Output: 2
Explanation:
The operations can be performed in order using valid integers 4 and then 2.
Example 2:
Input: nums = [2,1,2], k = 2
Output: -1
Explanation:
It is impossible to make all the values equal to 2.
Example 3:
Input: nums = [9,7,5,3], k = 1
Output: 4
Explanation:
The operations can be performed using valid integers in the order 7, 5, 3, and 1

Constraints:

1 <= nums.length <= 100 
1 <= nums[i] <= 100
1 <= k <= 100
 */


/**
 * Intuition
To make every value in the array equal to k, we need to iteratively reduce all values greater than k. The problem allows us to choose a valid height h such that all numbers greater than h are identical, and we can set them all to h.

So, each operation allows us to "flatten" the current maximum value (or any set of identical values greater than a chosen h) to something lower. To determine the minimum number of such operations, 
we can count how many distinct values greater than k exist — because each distinct number greater than k must be reduced at least once to eventually reach k.

However, if any number is less than k, then it is impossible to make all numbers equal to k, since we can only reduce numbers — not increase them.

Approach
Traverse through the array.
If any element is less than k, return -1 immediately.
Use a set to track all unique values that are strictly greater than k.
Return the size of this set, which represents the minimum number of operations needed.
Complexity
Time complexity:
O(n) — We iterate through the array once and perform constant time operations per element.

Space complexity:
O(n) — In the worst case, we may store up to n distinct values in the set.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function(nums, k) {
     const seen = new Set();
    for (let num of nums) {
        if (num < k) return -1;
        if (num > k) seen.add(num);
    }
    return seen.size;
};