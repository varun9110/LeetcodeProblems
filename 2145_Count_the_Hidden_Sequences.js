/**
 * 2145. Count the Hidden Sequences
 * Difficulty: Medium
 * 
 * You are given a 0-indexed array of n integers differences, which describes the differences between each pair of consecutive integers of a hidden sequence of length (n + 1). 
 * More formally, call the hidden sequence hidden, then we have that differences[i] = hidden[i + 1] - hidden[i].

You are further given two integers lower and upper that describe the inclusive range of values [lower, upper] that the hidden sequence can contain.

For example, given differences = [1, -3, 4], lower = 1, upper = 6, the hidden sequence is a sequence of length 4 whose elements are in between 1 and 6 (inclusive).
[3, 4, 1, 5] and [4, 5, 2, 6] are possible hidden sequences.
[5, 6, 3, 7] is not possible since it contains an element greater than 6.
[1, 2, 3, 4] is not possible since the differences are not correct.
Return the number of possible hidden sequences there are. If there are no possible sequences, return 0.


Example 1:
Input: differences = [1,-3,4], lower = 1, upper = 6
Output: 2
Explanation: The possible hidden sequences are:
- [3, 4, 1, 5]
- [4, 5, 2, 6]
Thus, we return 2.
Example 2:
Input: differences = [3,-4,5,1,-2], lower = -4, upper = 5
Output: 4
Explanation: The possible hidden sequences are:
- [-3, 0, -4, 1, 2, 0]
- [-2, 1, -3, 2, 3, 1]
- [-1, 2, -2, 3, 4, 2]
- [0, 3, -1, 4, 5, 3]
Thus, we return 4.
Example 3:
Input: differences = [4,-7,2], lower = 3, upper = 6
Output: 0
Explanation: There are no possible hidden sequences. Thus, we return 0.

Constraints:
n == differences.length
1 <= n <= 105
-105 <= differences[i] <= 105
-105 <= lower <= upper <= 105
 */

/**
 * Intuition
You’re given an array differences of length n.
You need to reconstruct a sequence of length n+1, such that:
differences[i] = hidden[i+1] - hidden[i]
The values in hidden must all lie within the range [lower, upper].
You must return how many possible starting values hidden[0] will keep all values within [lower, upper].
Approach
Compute prefixSum as you go.
Track the minimum and maximum values of prefixSum.
Determine valid range for x:
x_min = lower - minPrefixSum
x_max = upper - maxPrefixSum
Count of valid x values = x_max - x_min + 1 (if positive)
Complexity
Time complexity:

O(n)
Space complexity:

O(1)
 */

/**
 * @param {number[]} differences
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var numberOfArrays = function (differences, lower, upper) {
    let minSum = 0, maxSum = 0, sum = 0;

    for (let diff of differences) {
        sum += diff;
        minSum = Math.min(minSum, sum);
        maxSum = Math.max(maxSum, sum);
    }

    let minStart = lower - minSum;
    let maxStart = upper - maxSum;

    return Math.max(0, maxStart - minStart + 1);
};