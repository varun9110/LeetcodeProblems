/**
 * 287. Find the Duplicate Number
 * Difficulty: Medium
 * 
 * Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
There is only one repeated number in nums, return this repeated number.
You must solve the problem without modifying the array nums and uses only constant extra space.

Example 1:
Input: nums = [1,3,4,2,2]
Output: 2
Example 2:
Input: nums = [3,1,3,4,2]
Output: 3
Example 3:
Input: nums = [3,3,3,3,3]
Output: 3

Constraints:
1 <= n <= 105
nums.length == n + 1
1 <= nums[i] <= n
All the integers in nums appear only once except for precisely one integer which appears two or more times.

Follow up:
How can we prove that at least one duplicate number must exist in nums?
Can you solve the problem in linear runtime complexity?
 * 
 */

/**
 * 1. Set/Hash Table Approach
Detailed Logic:
Initialize an empty set seen.
Traverse through the array nums.
For each element num in nums, check if it exists in seen.
If it does, return num as the duplicate.
Otherwise, add num to seen.
Pros:
Extremely straightforward to implement.
No need to sort or modify the original array.
Cons:
This approach requires extra space for the set, which violates the problem's constraint of constant extra space.
Time and Space Complexity:
Time Complexity: O(n)O(n)O(n) because we iterate through the array once.
Space Complexity: O(n)O(n)O(n) for storing the set.
 */

var findDuplicate = function(nums) {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }
    return -1; 
};