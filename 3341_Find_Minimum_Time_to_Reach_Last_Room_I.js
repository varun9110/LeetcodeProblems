/**
 * 3341. Find Minimum Time to Reach Last Room I
 * Difficulty: Medium
 * 
 * There is a dungeon with n x m rooms arranged as a grid.

You are given a 2D array moveTime of size n x m, where moveTime[i][j] represents the minimum time in seconds when you can start moving to that room. You start from the room (0, 0) at time t = 0 and can move to an adjacent room. Moving between adjacent rooms takes exactly one second.

Return the minimum time to reach the room (n - 1, m - 1).

Two rooms are adjacent if they share a common wall, either horizontally or vertically.

Example 1:
Input: moveTime = [[0,4],[4,4]]
Output: 6
Explanation:
The minimum time required is 6 seconds.

At time t == 4, move from room (0, 0) to room (1, 0) in one second.
At time t == 5, move from room (1, 0) to room (1, 1) in one second.
Example 2:

Input: moveTime = [[0,0,0],[0,0,0]]

Output: 3
Explanation:

The minimum time required is 3 seconds.
At time t == 0, move from room (0, 0) to room (1, 0) in one second.
At time t == 1, move from room (1, 0) to room (1, 1) in one second.
At time t == 2, move from room (1, 1) to room (1, 2) in one second.
Example 3:

Input: moveTime = [[0,1],[1,2]]

Output: 3

Constraints:

2 <= n == moveTime.length <= 50
2 <= m == moveTime[i].length <= 50
0 <= moveTime[i][j] <= 109
 */

/**
 * Intuition
Since movement between rooms takes exactly 1 second, but some rooms cannot be entered until a certain time, we must move carefully and sometimes wait until a room is accessible.
We want to find the minimum time to reach the bottom-right room, considering the moveTime constraints.
Because we can move in four directions and at each step the available rooms depend on the current time, a simple DFS with pruning (only proceeding if we find a faster way) can be effective.
Approach
We initialize a best 2D array where best[i][j] stores the minimum time to reach room (i, j).
Start DFS from (0,0) at time 0.
At each move:
Check all 4 possible directions (up, down, left, right).
Calculate the earliest time we can move into the next room:
timeNeeded = currentTime + 1 + Math.max(0, moveTime[nx][ny] - currentTime) +1 for moving time.
Math.max(0, moveTime - currentTime) to wait if the room is not yet available.
If the newly calculated time is less than the previous best time to reach that room, update and continue DFS from there.
Finally, return best[n-1][m-1], which will hold the minimum time to reach the bottom-right room.
Complexity
Time complexity:

O(n×m)
Space complexity:

O(n×m)
 */

/**
 * @param {number[][]} moveTime
 * @return {number}
 */
var minTimeToReach = function (moveTime) {
    const n = moveTime.length;
    const m = moveTime[0].length;
    // Best time to reach each cell
    const best = Array.from({ length: n }, () => Array(m).fill(Number.MAX_SAFE_INTEGER));
    best[0][0] = 0; // Start at (0,0) at time 0
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right
    const dfs = (x, y, currentTime) => {
        if (x === n - 1 && y === m - 1) return; // Reached goal
        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
                const timeNeeded = currentTime + 1 + Math.max(0, moveTime[nx][ny] - currentTime);
                if (timeNeeded < best[nx][ny]) {
                    best[nx][ny] = timeNeeded;
                    dfs(nx, ny, timeNeeded);
                }
            }
        }
    };
    dfs(0, 0, 0);
    return best[n - 1][m - 1];
};