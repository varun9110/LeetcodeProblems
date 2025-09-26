/**
 * 611. Valid Triangle Number
 * Difficulty: Medium
 * 
 * Given an integer array nums, return the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.

 

Example 1:

Input: nums = [2,2,3,4]
Output: 3
Explanation: Valid combinations are: 
2,3,4 (using the first 2)
2,3,4 (using the second 2)
2,2,3
Example 2:

Input: nums = [4,2,3,4]
Output: 4
 

Constraints:

1 <= nums.length <= 1000
0 <= nums[i] <= 1000
 */

/**
 * Approach
Sort nums ascending.

Iterate k from the end (k = n-1) down to 2. Treat nums[k] as the largest side c.

Use two pointers i = 0 (left) and j = k-1 (right). While i < j:

If nums[i] + nums[j] > nums[k], then every index between i and j-1 paired with j also works (because the array is sorted). So add j - i to the answer and decrement j.
Otherwise, increment i (we need a bigger a to satisfy the inequality).
Return the total count.

This uses a two-pointer technique to count pairs in O(k) time for each k, giving overall O(n^2) runtime with O(1) extra space (ignoring input sort space).
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function(nums) {
    nums.sort((a,b) => a - b);
    const n = nums.length;
    let count = 0;
    for (let k = n - 1; k >= 2; k--) {
        let i = 0, j = k - 1;
        while (i < j) {
            if (nums[i] + nums[j] > nums[k]) {
                count += j - i;
                j--;
            } else {
                i++;
            }
        }
    }
    return count;
};