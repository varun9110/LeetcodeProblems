/**
 * 1526. Minimum Number of Increments on Subarrays to Form a Target Array
 * Difficulty: Hard
 * 
 * You are given an integer array target. You have an integer array initial of the same size as target with all elements initially zeros.

In one operation you can choose any subarray from initial and increment each value by one.

Return the minimum number of operations to form a target array from initial.

The test cases are generated so that the answer fits in a 32-bit integer.

 

Example 1:

Input: target = [1,2,3,2,1]
Output: 3
Explanation: We need at least 3 operations to form the target array from the initial array.
[0,0,0,0,0] increment 1 from index 0 to 4 (inclusive).
[1,1,1,1,1] increment 1 from index 1 to 3 (inclusive).
[1,2,2,2,1] increment 1 at index 2.
[1,2,3,2,1] target array is formed.
Example 2:

Input: target = [3,1,1,2]
Output: 4
Explanation: [0,0,0,0] -> [1,1,1,1] -> [1,1,1,2] -> [2,1,1,2] -> [3,1,1,2]
Example 3:

Input: target = [3,1,5,4,2]
Output: 7
Explanation: [0,0,0,0,0] -> [1,1,1,1,1] -> [2,1,1,1,1] -> [3,1,1,1,1] -> [3,1,2,2,2] -> [3,1,3,3,2] -> [3,1,4,4,2] -> [3,1,5,4,2].
 

Constraints:

1 <= target.length <= 105
1 <= target[i] <= 105
 */

/**
 * 💡 Key Idea

Let us assume that target represents height of columns on a square grid. One operation corresponds to laying out continuous row of bricks.

What is the number of these rows? To find this number we count the number of left edges of these rows.

Example: [3,1,5,4,2,3,4,2]. Left edges are marked by red color. Total number of left edges is 3 + 4 + 1 + 1.

Then, for each subsequent bar, we add only the positive difference.

Complexity
Time complexity: O(n) → single pass through the array
Space complexity: O(1) → uses only a few variables
 */

/**
 * @param {number[]} target
 * @return {number}
 */
var minNumberOperations = function(target) {
    let ans = target[0];
    for (let i = 1; i < target.length; i++) {
        ans += Math.max(target[i] - target[i - 1], 0);
    }
    return ans;
};