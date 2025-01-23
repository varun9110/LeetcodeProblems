/**
 * 1267. Count Servers that Communicate
 * Difficulty : Medium
 * 
 * You are given a map of a server center, represented as a m * n integer matrix grid, where 1 means that on that cell there is a server and 0 means 
 * that it is no server. Two servers are said to communicate if they are on the same row or on the same column.

Return the number of servers that communicate with any other server.

Example 1:



Input: grid = [[1,0],[0,1]]
Output: 0
Explanation: No servers can communicate with others.
Example 2:



Input: grid = [[1,0],[1,1]]
Output: 3
Explanation: All three servers can communicate with at least one other server.
Example 3:


Input: grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]
Output: 4
Explanation: The two servers in the first row can communicate with each other. The two servers in the third column can communicate with each other. 
The server at right bottom corner can't communicate with any other server.
 
Constraints:

m == grid.length
n == grid[i].length
1 <= m <= 250
1 <= n <= 250
grid[i][j] == 0 or 1
 */

/**
 * Intuition
The problem involves counting the number of servers in a 2D grid that can communicate with at least one other server. Servers are represented as 1s in the grid, while empty cells are represented as 0s. A server can communicate if there is another server in the same row or same column.

The key observation is:

For a server at position (i, j), it can communicate if:
The total number of servers in row i is greater than 1 (Rows[i] > 1), or
The total number of servers in column j is greater than 1 (Col[j] > 1).
Thus, our goal is to:

Count the total number of servers in each row and column.
Check for each server whether it satisfies the communication condition.
Approach
Initialize Helper Data Structures:

Create a vector Rows of size equal to the number of rows in the grid to store the total number of servers in each row.
Create a vector Col of size equal to the number of columns in the grid to store the total number of servers in each column.
Calculate Row and Column Sums:

Traverse the entire grid.
For each cell (i, j):
If grid[i][j] == 1 (i.e., there is a server in this cell):
Increment Rows[i] to reflect the presence of a server in row i.
Increment Col[j] to reflect the presence of a server in column j.
Count Communicating Servers:

Traverse the grid again.
For each cell (i, j):
If grid[i][j] == 1:
Check if Rows[i] > 1 or Col[j] > 1.
If either condition is true, it means this server can communicate, so increment the answer counter.
Return the Result:

After the second traversal, return the final count of servers that can communicate.
Complexity
Time complexity:

Calculating the row and column sums takes (O(m*n)), where (m) is the number of rows and (n) is the number of columns.
Counting the communicating servers also takes (O(m*n)).
Overall time complexity: (O(m \times n)).
Space complexity:

Storing the row sums requires (O(m)) space.
Storing the column sums requires (O(n)) space.
Overall space complexity: (O(m + n)).
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var countServers = function(grid) {
    let Rows = new Array(grid.length).fill(0);
    let Col = new Array(grid[0].length).fill(0);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            Rows[i] += grid[i][j];
            Col[j] += grid[i][j];
        }
    }
    let ans = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1 && (Rows[i] > 1 || Col[j] > 1)) {
                ans++;
            }
        }
    }
    return ans;
};