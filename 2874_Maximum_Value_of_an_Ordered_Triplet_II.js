/**
 * 2874. Maximum Value of an Ordered Triplet II
 * Difficulty: Medium
 * 
 * You are given a 0-indexed integer array nums.

Return the maximum value over all triplets of indices (i, j, k) such that i < j < k. If all such triplets have a negative value, return 0.

The value of a triplet of indices (i, j, k) is equal to (nums[i] - nums[j]) * nums[k].

 

Example 1:

Input: nums = [12,6,1,2,7]
Output: 77
Explanation: The value of the triplet (0, 2, 4) is (nums[0] - nums[2]) * nums[4] = 77.
It can be shown that there are no ordered triplets of indices with a value greater than 77. 
Example 2:

Input: nums = [1,10,3,4,19]
Output: 133
Explanation: The value of the triplet (1, 2, 4) is (nums[1] - nums[2]) * nums[4] = 133.
It can be shown that there are no ordered triplets of indices with a value greater than 133.
Example 3:

Input: nums = [1,2,3]
Output: 0
Explanation: The only ordered triplet of indices (0, 1, 2) has a negative value of (nums[0] - nums[1]) * nums[2] = -3. Hence, the answer would be 0.
 

Constraints:

3 <= nums.length <= 105
1 <= nums[i] <= 106
 */

/**
 * Intuition
The goal is to find the maximum triplet value in the given vector nums by considering three distinct elements (i, j, k) such that i < j < k. You want to maximize the value of (nums[i] - nums[j]) * (nums[j] - nums[k]).

Approach
Initialize a multiset uniqueValues to store unique elements in the vector except for the first element.
Initialize variables currentMax to keep track of the maximum element encountered so far and maxTripletValue to store the maximum triplet value.
Iterate through the vector starting from the second element (index 1).
For each element at index i, remove it from uniqueValues and find the current maximum in uniqueValues.
Calculate the triplet value using the formula and update maxTripletValue if it's greater than the current maximum.
Update currentMax if the current element is greater than currentMax.
Return the final maxTripletValue.
Complexity
Time complexity:
The algorithm has a time complexity of O(N log N) due to the use of a multiset, where N is the number of elements in the nums vector.

Space complexity:
The space complexity is O(N) as we store unique elements in the uniqueValues multiset, where N is the number of elements in the nums vector.


 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumTripletValue = function(nums) {
    let max_i = nums[0], max_ij = 0, result = 0;
    
    for (let k = 2; k < nums.length; k++) {
        max_i = Math.max(max_i, nums[k-2]);
        max_ij = Math.max(max_ij, max_i - nums[k-1]);
        result = Math.max(result, max_ij * nums[k]);
    }
    
    return result;
};