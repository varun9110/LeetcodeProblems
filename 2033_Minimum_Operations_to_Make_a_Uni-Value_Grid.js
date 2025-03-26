/**
 * 2033. Minimum Operations to Make a Uni-Value Grid
 * Difficulty: Medium
 * 
 * You are given a 2D integer grid of size m x n and an integer x. In one operation, you can add x to or subtract x from any element in the grid.
A uni-value grid is a grid where all the elements of it are equal.
Return the minimum number of operations to make the grid uni-value. If it is not possible, return -1.

Example 1:
Input: grid = [[2,4],[6,8]], x = 2
Output: 4
Explanation: We can make every element equal to 4 by doing the following: 
- Add x to 2 once.
- Subtract x from 6 once.
- Subtract x from 8 twice.
A total of 4 operations were used.
Example 2:
Input: grid = [[1,5],[2,3]], x = 1
Output: 5
Explanation: We can make every element equal to 3.
Example 3:

Input: grid = [[1,2],[3,4]], x = 2
Output: -1
Explanation: It is impossible to make every element equal.

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 105
1 <= m * n <= 105
1 <= x, grid[i][j] <= 104
 */


/**
 * Intuition
The problem requires making all elements in a 2D grid the same using a given step size x. The key observation is that the optimal target value is the median of the array formed by flattening the grid. The median minimizes the total number of operations needed when changing all numbers to a common value.

Approach
Flatten the grid: Convert the 2D grid into a 1D list of numbers.
Check divisibility condition: Ensure that all numbers in the grid have the same remainder when divided by x. If they do not, it is impossible to make all elements equal.
Sort the array: Sorting helps in efficiently finding the median.
Find the median: The median is the middle element of the sorted array (or the average of the two middle elements for even-length arrays).
Compute operations: Calculate the number of operations required to convert all elements to the median by computing the absolute difference and dividing by x.
Complexity
Time complexity:

Flattening the grid: ( O(m * n) )
Sorting the array: ( O(m * n \log (m * n)) )
Iterating through the array: ( O(m * n) )
Overall: ( O(m * n \log (m * n)) )
Space complexity:

Storing the flattened array: ( O(m \times n) )
Overall: ( O(m \times n) )
 */

/**
 * @param {number[][]} grid
 * @param {number} x
 * @return {number}
 */
var minOperations = function(grid, x) {
    let arr = [];
    for (let row of grid) {
        for (let num of row) {
            arr.push(num);
        }
    }
    
    arr.sort((a, b) => a - b);
    let median = arr[Math.floor(arr.length / 2)];
    let operations = 0;

    for (let num of arr) {
        let diff = Math.abs(num - median);
        if (diff % x !== 0) return -1;
        operations += diff / x;
    }
    return operations;
};