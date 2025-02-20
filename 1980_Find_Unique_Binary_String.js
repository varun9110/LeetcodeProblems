/**
 * 1980. Find Unique Binary String
 * Difficulty: Medium
 * 
 * Given an array of strings nums containing n unique binary strings each of length n, return a binary string of length n 
 * that does not appear in nums. If there are multiple answers, you may return any of them.

 

Example 1:

Input: nums = ["01","10"]
Output: "11"
Explanation: "11" does not appear in nums. "00" would also be correct.
Example 2:

Input: nums = ["00","01"]
Output: "11"
Explanation: "11" does not appear in nums. "10" would also be correct.
Example 3:

Input: nums = ["111","011","001"]
Output: "101"
Explanation: "101" does not appear in nums. "000", "010", "100", and "110" would also be correct.
 

Constraints:

n == nums.length
1 <= n <= 16
nums[i].length == n
nums[i] is either '0' or '1'.
All the strings of nums are unique.
 */

/**
 * Intuition
You can solve this problem efficiently using the Cantor's diagonalization technique, which ensures that the 
generated binary string is unique and doesn't appear in the input list.
Here’s the optimized JavaScript solution with O(n) time complexity:
Approach
Construct a new binary string where the i-th bit is different from the i-th bit of the i-th string in nums.
This guarantees that the new string is not present in nums.
We iterate over nums using map.
At index i, we take the i-th bit of the i-th string.
We flip 0 to 1 and 1 to 0, ensuring uniqueness.
Join the resulting array into a string and return it.
Complexity
Time complexity:

We iterate once through nums.
Space complexity:

The output string is stored in memory.
 */

/**
 * @param {string[]} nums
 * @return {string}
 */
var findDifferentBinaryString = function (nums) {
    return nums.map((num, i) => num[i] === '0' ? '1' : '0').join('');
};