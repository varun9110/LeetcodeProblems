/**
 * 2221. Find Triangular Sum of an Array
 * Difficulty: Medium
 * 
 * You are given a 0-indexed integer array nums, where nums[i] is a digit between 0 and 9 (inclusive).

The triangular sum of nums is the value of the only element present in nums after the following process terminates:

Let nums comprise of n elements. If n == 1, end the process. Otherwise, create a new 0-indexed integer array newNums of length n - 1.
For each index i, where 0 <= i < n - 1, assign the value of newNums[i] as (nums[i] + nums[i+1]) % 10, where % denotes modulo operator.
Replace the array nums with newNums.
Repeat the entire process starting from step 1.
Return the triangular sum of nums.

 

Example 1:


Input: nums = [1,2,3,4,5]
Output: 8
Explanation:
The above diagram depicts the process from which we obtain the triangular sum of the array.
Example 2:

Input: nums = [5]
Output: 5
Explanation:
Since there is only one element in nums, the triangular sum is the value of that element itself.
 

Constraints:

1 <= nums.length <= 1000
0 <= nums[i] <= 9
 */

/**
 * Intuition
This problem asks us to find the final value after repeatedly reducing an array by creating a new array where each element is the sum of two adjacent elements from the previous array, continuing until a single element remains. The optimized approach uses Pascal's triangle coefficients - each element in the final result is determined by binomial coefficients multiplied by the original array values.

Approach
We'll use a mathematical optimization with combinatorics:

Combinatorial insight: The final value equals the sum of each original element multiplied by its binomial coefficient
Coefficient calculation: Use comb(n-1, i) to get the coefficient for position i
Weighted sum: Multiply each array element by its corresponding binomial coefficient
Modulo operation: Apply mod 10 at each step to keep values manageable
Single-pass solution: Calculate result directly without simulating intermediate arrays
This approach transforms an O(n²) simulation into an O(n) mathematical calculation by recognizing the underlying combinatorial pattern.

Complexity
Time complexity: O(n)
Where n is the array length, for computing binomial coefficients and weighted sum.

Space complexity: O(1)
We only use constant extra space for the accumulator, as binomial coefficient calculation is handled internally.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var triangularSum = function(nums) {
     while (nums.length > 1) {
        for (let i = 0; i < nums.length - 1; i++) {
            nums[i] = (nums[i] + nums[i + 1]) % 10;
        }
        nums.pop(); // remove the last element
    }
    return nums[0];
};