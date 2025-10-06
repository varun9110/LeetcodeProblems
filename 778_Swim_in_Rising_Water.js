/**
 * 778. Swim in Rising Water
 * Difficulty: Hard
 * 
 * You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j).

It starts raining, and water gradually rises over time. At time t, the water level is t, meaning any cell with elevation less than equal to t is submerged or reachable.

You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.

Return the minimum time until you can reach the bottom right square (n - 1, n - 1) if you start at the top left square (0, 0).

 

Example 1:


Input: grid = [[0,2],[1,3]]
Output: 3
Explanation:
At time 0, you are in grid location (0, 0).
You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.
You cannot reach point (1, 1) until time 3.
When the depth of water is 3, we can swim anywhere inside the grid.
Example 2:


Input: grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
Output: 16
Explanation: The final route is shown.
We need to wait until time 16 so that (0, 0) and (4, 4) are connected.
 

Constraints:

n == grid.length
n == grid[i].length
1 <= n <= 50
0 <= grid[i][j] < n2
Each value grid[i][j] is unique.
 */

/**
 * Approach
Use a min-heap (priority queue). Each heap entry stores (time, r, c) where time = the earliest time I can stand on cell (r,c) — equivalently, the maximum elevation seen on the path to (r,c).
Start with (grid[0][0], 0, 0) because initially I must wait at least grid[0][0].
Repeatedly pop the smallest time entry. If I reach (n-1, n-1) return that time.
For each 4-directional neighbor (nr,nc), new time becomes max(current_time, grid[nr][nc]). If neighbor not visited, push (new_time, nr, nc) to heap.
Use a visited grid and mark when a cell is popped (the first time we pop it is the minimum possible time to reach it).
The first time we pop destination is the answer.
 */

/**
 * Corrected version: define MinHeap inside the function scope
 * to avoid "Identifier ... has already been declared" on repeated runs.
 *
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function(grid) {
    const n = grid.length;
    const visited = Array.from({length: n}, () => Array(n).fill(false));

    class MinHeap {
        constructor() { this.heap = []; }
        size() { return this.heap.length; }
        peek() { return this.heap[0]; }
        push(val) {
            this.heap.push(val);
            this._bubbleUp(this.heap.length - 1);
        }
        pop() {
            if (this.heap.length === 0) return undefined;
            const top = this.heap[0];
            const last = this.heap.pop();
            if (this.heap.length > 0) {
                this.heap[0] = last;
                this._bubbleDown(0);
            }
            return top;
        }
        _bubbleUp(i) {
            const h = this.heap;
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (h[p][0] <= h[i][0]) break;
                [h[p], h[i]] = [h[i], h[p]];
                i = p;
            }
        }
        _bubbleDown(i) {
            const h = this.heap;
            const len = h.length;
            while (true) {
                let smallest = i;
                const l = 2 * i + 1, r = 2 * i + 2;
                if (l < len && h[l][0] < h[smallest][0]) smallest = l;
                if (r < len && h[r][0] < h[smallest][0]) smallest = r;
                if (smallest === i) break;
                [h[smallest], h[i]] = [h[i], h[smallest]];
                i = smallest;
            }
        }
    }

    const heap = new MinHeap();
    heap.push([grid[0][0], 0, 0]); // [time, r, c]
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

    while (heap.size() > 0) {
        const [t, r, c] = heap.pop();
        if (visited[r][c]) continue;
        visited[r][c] = true;
        if (r === n - 1 && c === n - 1) return t;
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
                heap.push([Math.max(t, grid[nr][nc]), nr, nc]);
            }
        }
    }
    return -1;
};