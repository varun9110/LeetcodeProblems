/**
 * 945. Minimum Increment to Make Array Unique
 * Difficulty: Medium
 * 
 * You are given an integer array nums. In one move, you can pick an index i where 0 <= i < nums.length and increment nums[i] by 1.

Return the minimum number of moves to make every value in nums unique.

The test cases are generated so that the answer fits in a 32-bit integer.

 

Example 1:

Input: nums = [1,2,2]
Output: 1
Explanation: After 1 move, the array could be [1, 2, 3].
Example 2:

Input: nums = [3,2,1,2,1,7]
Output: 6
Explanation: After 6 moves, the array could be [3, 4, 1, 2, 5, 7].
It can be shown with 5 or less moves that it is impossible for the array to have all unique values.
 

Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 105
 */

/**
 * Intuition
The algorithm begins by sorting the array to handle each element in ascending order. For each number, it ensures that it meets or exceeds the last encountered unique value, adding to the total count of increments needed to achieve this. The process is repeated for each element, updating the required unique value each time, to ensure all elements in the array are unique.
Approach
Sorting: Sort the input array to simplify sequential processing.

Initialization: Set up variables for the target unique value and the total increments counter.

Iteration and Adjustment: For each number, adjust it to at least match the last unique value, increasing the total increments as needed.

Result: Return the cumulative number of increments required to ensure all numbers are unique.
 */

var minIncrementForUnique = function (nums) {
    // Sort the array first
    nums.sort((a, b) => a - b);

    let numTracker = 0;   // Tracks the next unique number that should be set.
    let minIncrement = 0; // Counts the total increments required.

    for (let num of nums) {
        numTracker = Math.max(numTracker, num);
        minIncrement += numTracker - num;
        numTracker++; // Increment the tracker for the next number.
    }

    return minIncrement;
};