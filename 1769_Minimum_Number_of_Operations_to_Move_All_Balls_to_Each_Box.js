/**
 * 1769. Minimum Number of Operations to Move All Balls to Each Box
 * Difficulty: Medium
 * 
 * You have n boxes. You are given a binary string boxes of length n, where boxes[i] is '0' if the ith box is empty, and '1' if it contains one ball.

In one operation, you can move one ball from a box to an adjacent box. Box i is adjacent to box j if abs(i - j) == 1. Note that after doing so, 
there may be more than one ball in some boxes.

Return an array answer of size n, where answer[i] is the minimum number of operations needed to move all the balls to the ith box.
Each answer[i] is calculated considering the initial state of the boxes.

Example 1:

Input: boxes = "110"
Output: [1,1,3]
Explanation: The answer for each box is as follows:
1) First box: you will have to move one ball from the second box to the first box in one operation.
2) Second box: you will have to move one ball from the first box to the second box in one operation.
3) Third box: you will have to move one ball from the first box to the third box in two operations, 
and move one ball from the second box to the third box in one operation.
Example 2:

Input: boxes = "001011"
Output: [11,8,5,4,3,4]
 

Constraints:

n == boxes.length
1 <= n <= 2000
boxes[i] is either '0' or '1'.
 */

/**
 * Initialization:
left and right arrays are initialized to store the cumulative costs.
cnt is used to keep track of the number of balls encountered so far.

Left Pass:

Traverse the boxes from left to right.

For each box, if the previous box contains a ball ('1'), increment the count (cnt).

Update the left array with the cumulative cost of moving balls to the current box.

Right Pass:

Traverse the boxes from right to left.

For each box, if the next box contains a ball ('1'), increment the count (cnt).

Update the right array with the cumulative cost of moving balls to the current box.

Combine Results:

Combine the results from the left and right arrays to get the total minimum operations required for each box.
 */

/**
 * @param {string} boxes
 * @return {number[]}
 */
var minOperations = function(boxes) {
    const n = boxes.length;
    const ans = new Array(n).fill(0);
    for (let i = 1, count = 0; i < n; i++) {
        if (boxes[i - 1] === '1') {
            count++;
        }
        ans[i] = ans[i - 1] + count;
    }
    for (let i = n - 2, count = 0, sum = 0; i >= 0; i--) {
        if (boxes[i + 1] === '1') {
            count++;
        }
        sum += count;
        ans[i] += sum;
    }
    return ans;
};