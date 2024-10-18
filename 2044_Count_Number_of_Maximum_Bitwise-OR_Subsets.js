/**
 * 2044. Count Number of Maximum Bitwise-OR Subsets
 * Difficulty: Medium
 * 
 * Given an integer array nums, find the maximum possible bitwise OR of a subset of nums and return the number of different non-empty subsets with the maximum bitwise OR.

An array a is a subset of an array b if a can be obtained from b by deleting some (possibly zero) elements of b. Two subsets are considered different if the indices of the elements chosen are different.

The bitwise OR of an array a is equal to a[0] OR a[1] OR ... OR a[a.length - 1] (0-indexed).

 

Example 1:

Input: nums = [3,1]
Output: 2
Explanation: The maximum possible bitwise OR of a subset is 3. There are 2 subsets with a bitwise OR of 3:
- [3]
- [3,1]
Example 2:

Input: nums = [2,2,2]
Output: 7
Explanation: All non-empty subsets of [2,2,2] have a bitwise OR of 2. There are 23 - 1 = 7 total subsets.
Example 3:

Input: nums = [3,2,1,5]
Output: 6
Explanation: The maximum possible bitwise OR of a subset is 7. There are 6 subsets with a bitwise OR of 7:
- [3,5]
- [3,1,5]
- [3,2,5]
- [3,2,1,5]
- [2,5]
- [2,1,5]
 

Constraints:

1 <= nums.length <= 16
1 <= nums[i] <= 105
 */

/**
 * Intuition
When we are asked to compute the maximum bitwise OR of subsets and count how many subsets achieve this maximum, the problem essentially boils down to finding the
largest possible OR value. Since OR operations are cumulative (meaning that once a bit is set, it stays set), the more elements we include in a subset, the closer 
we get to the maximum possible OR. Therefore, our goal is to:

Compute the maximum OR by combining all the elements in the array.
Use a method to explore every subset of the array and count how many subsets give this maximum OR value.
The key insight is that the more elements we OR together, the higher the result tends to be, making backtracking a natural choice to systematically explore each subset.

Approach
Compute Maximum OR: First, find the maximum OR by combining all elements using the | (bitwise OR) operation. This is the maximum OR that any subset can achieve.
Backtracking: Next, use backtracking to explore all possible subsets. For each subset, compute its OR value. If the OR matches the maximum OR, increment the count.
Base Case: If a subset OR matches the maximum, count it. Recursively explore further subsets until all have been considered.
Complexity
Time complexity:
The total number of subsets is (2^n), where (n) is the length of the array. For each subset, we compute the OR, which takes (O(n)). Thus, the time complexity is 
approximately (O(n \times 2^n)).

Space complexity:
The space complexity is (O(n)), which accounts for the recursion stack during backtracking.


 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var countMaxOrSubsets = function (nums) {
  let maxOR = 0;

  // Step 1: Compute the maximum OR
  for (let num of nums) {
    maxOR |= num;
  }

  let count = 0;

  const backtrack = (index, currentOR) => {
    if (currentOR === maxOR) {
      count++;
    }

    for (let i = index; i < nums.length; i++) {
      backtrack(i + 1, currentOR | nums[i]);
    }
  };

  // Step 2: Backtrack to count the subsets
  backtrack(0, 0);

  return count;
};