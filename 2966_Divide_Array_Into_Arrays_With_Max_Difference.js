/**
 * 2966. Divide Array Into Arrays With Max Difference
 * Difficulty: Medium
 * 
 * You are given an integer array nums of size n and a positive integer k.

Divide the array into one or more arrays of size 3 satisfying the following conditions:
Each element of nums should be in exactly one array.
The difference between any two elements in one array is less than or equal to k.
Return a 2D array containing all the arrays. If it is impossible to satisfy the conditions, return an empty array. 
And if there are multiple answers, return any of them.

Example 1:
Input: nums = [1,3,4,8,7,9,3,5,1], k = 2
Output: [[1,1,3],[3,4,5],[7,8,9]]
Explanation: We can divide the array into the following arrays: [1,1,3], [3,4,5] and [7,8,9].
The difference between any two elements in each array is less than or equal to 2.
Note that the order of elements is not important.
Example 2:
Input: nums = [1,3,3,2,7,3], k = 3
Output: []
Explanation: It is not possible to divide the array satisfying all the conditions.

Constraints:
n == nums.length
1 <= n <= 105
n is a multiple of 3.
1 <= nums[i] <= 105
1 <= k <= 105
 */

/**
 * Approaches
(Also explained in the code)

Dividing into Groups of Three:

The goal is to divide the given array into groups of three consecutive elements. 
This decision likely comes from the requirement or nature of the problem being solved.
Sorting for Comparison:

Sorting the array is done to simplify the process of comparing the elements within each group. When the array is sorted, 
the minimum and maximum elements for each group can be easily identified.
Setting a Condition (k):

The condition involving k is introduced to filter out groups based on the difference between the maximum and minimum elements within each group. 
This condition ensures that the elements in a group are within a certain range.
Iterative Approach:

The code iterates through the sorted array in steps of 3, forming groups and checking the condition for each group. If a group meets the condition, 
it is added to the result. If any group fails the condition, the function returns an empty result.
 */

var divideArray = function(nums, k) {
    const size = nums.length;
        if (size % 3 !== 0)
            return [];

        nums.sort((a, b) => a - b);

        const result = [];
        let groupIndex = 0;
        for (let i = 0; i < size; i += 3) {
            if (i + 2 < size && nums[i + 2] - nums[i] <= k) {
                result.push([nums[i], nums[i + 1], nums[i + 2]]);
                groupIndex++;
            } else {
                return [];
            }
        }
        return result;
};