/**
 * 2577. Minimum Time to Visit a Cell In a Grid
 * Difficulty: Hard
 * 
 * You are given a m x n matrix grid consisting of non-negative integers where grid[row][col] represents the minimum time required to be 
 * able to visit the cell (row, col), which means you can visit the cell (row, col) only when the time you visit it is greater than or equal to grid[row][col].

You are standing in the top-left cell of the matrix in the 0th second, and you must move to any adjacent cell in the four directions: up, down, left, and right. 
Each move you make takes 1 second.
Return the minimum time required in which you can visit the bottom-right cell of the matrix. If you cannot visit the bottom-right cell, then return -1.

Example 1:
Input: grid = [[0,1,3,2],[5,1,2,5],[4,3,8,6]]
Output: 7
Explanation: One of the paths that we can take is the following:
- at t = 0, we are on the cell (0,0).
- at t = 1, we move to the cell (0,1). It is possible because grid[0][1] <= 1.
- at t = 2, we move to the cell (1,1). It is possible because grid[1][1] <= 2.
- at t = 3, we move to the cell (1,2). It is possible because grid[1][2] <= 3.
- at t = 4, we move to the cell (1,1). It is possible because grid[1][1] <= 4.
- at t = 5, we move to the cell (1,2). It is possible because grid[1][2] <= 5.
- at t = 6, we move to the cell (1,3). It is possible because grid[1][3] <= 6.
- at t = 7, we move to the cell (2,3). It is possible because grid[2][3] <= 7.
The final time is 7. It can be shown that it is the minimum time possible.
Example 2:
Input: grid = [[0,2,4],[3,2,1],[1,0,4]]
Output: -1
Explanation: There is no path from the top left to the bottom-right cell.

Constraints:
m == grid.length
n == grid[i].length
2 <= m, n <= 1000
4 <= m * n <= 105
0 <= grid[i][j] <= 105
grid[0][0] == 0
 
 */

/**
 * Intuition
On every step we will go to cell we can visit at minimum time.

Approach
We will use BFS + priority queue. Among all possible cells we select one we can reach at minimum time. How can we calculate minimum time we can reach particular cell. Let consider following example:
Screenshot 2023-02-26 at 17.22.43.pngFrom [0,0] we can move to [0,1] at minute 1. At minute 2 we can move to [1,1] at minute 2. At minute 3 we can move to [1,2]. Let calculate at what minute we can move to cell [1,3]. We can not move to it instantly but we can move back and forward untill we can. So we move back to [1,1] at minute 4, move to [1,2] at minute 5 and move to [1,3] at minute 6. We seond 2 seconds to do step back/forward. So if at time N we considering move to grid[i][j] = M we can calculate minimum time to reach it as following:

if N + 1 >= M
  time = N + 1
else
  diff = M - N -1 // seconds we need to wait untill we can move to this cell
  time = diff MOD 2 == 0 ? M : M + 1 // We spend 2 seconds to do step back/forward so if difference is even we can move at M if not at M + 1
No Path
There is only one case when there is now path when both first possible steps [0,1] and [1,0] greater than 1. In this case we can not move. In all other cases we can do step back/forward in any particular cell untill next cell is avalalbe to move in.

Complexity
Time complexity:
O(N*Log(N))

Space complexity:
O(N)
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
let visited = new Set()
const moves = [[0, -1], [0, 1], [1, 0], [-1, 0]]
var minimumTime = function(grid) {
    visited = new Set();
    // Check if there is no path
    if(grid[0][1] > 1 && grid[1][0] > 1){
        return -1
    }
    
    return solve(grid)
};

function solve(grid){
    const heap = new MinPriorityQueue()
    heap.enqueue([0, 0, 0], 0)
    while(heap.size() > 0){
        let c = heap.dequeue().element
        let i = c[0]
        let j = c[1]
        let key = `${i}_${j}`
        visited.add(key)
        let time = c[2]
        if(i == grid.length -1 && j == grid[0].length-1) {
            return time
        }
        const nm = moves.map(m => [i + m[0], j + m[1]]).filter(m => m[0] >= 0 && m[1] >= 0 && m[0] < grid.length && m[1] < grid[0].length).filter(m => !visited.has(`${m[0]}_${m[1]}`))
        
        for(let m of nm) {
            let nt = time+1
            if(time + 1 < grid[m[0]][m[1]]) {
                let diff = grid[m[0]][m[1]] - time-1
                nt = diff % 2 == 0 ? 
                    grid[m[0]][m[1]] : grid[m[0]][m[1]] + 1
                
            }
            visited.add(`${m[0]}_${m[1]}`)
            heap.enqueue([...m, nt], nt)
        }
    }
    return -1;
}
