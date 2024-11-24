/**
 * 1975. Maximum Matrix Sum
 * Difficulty: Medium
 * 
 * You are given an n x n integer matrix. You can do the following operation any number of times:

Choose any two adjacent elements of matrix and multiply each of them by -1.
Two elements are considered adjacent if and only if they share a border.

Your goal is to maximize the summation of the matrix's elements. Return the maximum sum of the matrix's elements using the operation mentioned above.

 

Example 1:


Input: matrix = [[1,-1],[-1,1]]
Output: 4
Explanation: We can follow the following steps to reach sum equals 4:
- Multiply the 2 elements in the first row by -1.
- Multiply the 2 elements in the first column by -1.
Example 2:


Input: matrix = [[1,2,3],[-1,-2,-3],[1,2,3]]
Output: 16
Explanation: We can follow the following step to reach sum equals 16:
- Multiply the 2 last elements in the second row by -1.
 

Constraints:

n == matrix.length == matrix[i].length
2 <= n <= 250
-105 <= matrix[i][j] <= 105
 */

/**
 * Explanation:
Variable Initialization:

neg: Tracks the number of negative elements.
sum: Stores the total sum of absolute values.
minVal: Tracks the smallest absolute value.
Matrix Traversal:

Loop through each element in the matrix.
Count negatives (neg) and calculate the sum of absolute values (sum).
Update minVal with the smallest absolute value.
Odd Negatives Adjustment:

If the count of negatives is odd, subtract twice the smallest absolute value from the sum.
Return Result:

Return the adjusted sum as the result.
Approach
Step 1: Traverse the matrix to calculate neg, sum, and minVal.
Step 2: Adjust the sum if neg is odd.
Step 3: Return the result.
Complexity
Time Complexity: (O(n \times m)), where (n) is the number of rows and (m) is the number of columns in the matrix.
Space Complexity: (O(1)), as no additional space is used other than variables.

 */

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var maxMatrixSum = function(matrix) {
    let neg = 0;
    let sum = 0;
    let minVal = Infinity;

    for (let row of matrix) {
        for (let val of row) {
            if (val < 0) {
                neg++;
            }
            sum += Math.abs(val);
            minVal = Math.min(minVal, Math.abs(val));
        }
    }

    if (neg % 2 === 1) {
        sum -= 2 * minVal;
    }

    return sum;
};