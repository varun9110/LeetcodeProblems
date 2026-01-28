/**
 * 3651. Minimum Cost Path with Teleportations
 * Difficulty: Hard
 * 
 * You are given a m x n 2D integer array grid and an integer k. You start at the top-left cell (0, 0) and your goal is to reach the bottom‐right cell (m - 1, n - 1).

There are two types of moves available:

Normal move: You can move right or down from your current cell (i, j), i.e. you can move to (i, j + 1) (right) or (i + 1, j) (down). The cost is the value of the destination cell.

Teleportation: You can teleport from any cell (i, j), to any cell (x, y) such that grid[x][y] <= grid[i][j]; the cost of this move is 0. You may teleport at most k times.

Return the minimum total cost to reach cell (m - 1, n - 1) from (0, 0).

 

Example 1:

Input: grid = [[1,3,3],[2,5,4],[4,3,5]], k = 2

Output: 7

Explanation:

Initially we are at (0, 0) and cost is 0.

Current Position	Move	New Position	Total Cost
(0, 0)	Move Down	(1, 0)	0 + 2 = 2
(1, 0)	Move Right	(1, 1)	2 + 5 = 7
(1, 1)	Teleport to (2, 2)	(2, 2)	7 + 0 = 7
The minimum cost to reach bottom-right cell is 7.

Example 2:

Input: grid = [[1,2],[2,3],[3,4]], k = 1

Output: 9

Explanation:

Initially we are at (0, 0) and cost is 0.

Current Position	Move	New Position	Total Cost
(0, 0)	Move Down	(1, 0)	0 + 2 = 2
(1, 0)	Move Right	(1, 1)	2 + 3 = 5
(1, 1)	Move Down	(2, 1)	5 + 4 = 9
The minimum cost to reach bottom-right cell is 9.

 

Constraints:

2 <= m, n <= 80
m == grid.length
n == grid[i].length
0 <= grid[i][j] <= 104
0 <= k <= 10
 */


/**
 * Intuition
Use directed DP. The order to calculate the outcome of each slot is critical.

Approach
Use a min prefix matrix (MinFL) to help for each remaining teleportation count (rmg).

Complexity
Time complexity:
O(mnk)
Space complexity:
O(mnk)
 */

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var minCost = function(grid, k) {
    const R = grid.length, C = grid[0].length, RC = R * C,
        RMinus1 = R - 1, CMinus1 = C - 1, RCMinus1 = RC - 1,
        kPlus1 = 1 + k
    const memo = new Array(R)
    for (const i of memo.keys()) {
        const row = memo[i] = new Array(C)
        for (const j of row.keys())
            row[j] = []
    }

    // key: prepare for directed DP
    const MinFL = new Array(kPlus1)
    for (const rmg of MinFL.keys()) {
        const row = MinFL[rmg] = new Array(RC)
        row[-1] = Infinity
    }

    const items = []
    for (const [i, row] of grid.entries()) {
        for (const [j, val] of row.entries()) {
            const item = [i, j, val]
            items.push(item)
        }
    }
    items.sort((A, B) => A[2] - B[2])

    let costSF = Infinity
    const cost2lastIndex = new Array(RC)
    for (let i = RCMinus1; i > -1; i--) {
        const cost = items[i][2]
        if (cost < costSF) {
            costSF = cost
            cost2lastIndex[cost] = i
        }
    }
    

    function dp(fromI, fromJ, rmg) {
        if (fromI === RMinus1 && fromJ === CMinus1)
            return 0
        
        const existing = memo[fromI][fromJ][rmg]
        if (existing !== undefined)
            return existing
        
        let result = Infinity
        const val = grid[fromI][fromJ]
        if (fromI < RMinus1) {
            const outcomeR = grid[fromI + 1][fromJ] + dp(fromI + 1, fromJ, rmg)
            result = Math.min(result, outcomeR)
        }
        if (fromJ < CMinus1) {
            const outcomeC = grid[fromI][fromJ + 1] + dp(fromI, fromJ + 1, rmg)
            result = Math.min(result, outcomeC)
        }

        if (rmg) {
            const rmgMinus1 = rmg - 1
            // key: directed DP
            const minFL = MinFL[rmgMinus1]
            const reachment = cost2lastIndex[val]

            const subresult = minFL[reachment]
            result = Math.min(result, subresult)
        }
        
        return memo[fromI][fromJ][rmg] = result
    }
    for (let rmg = 0; rmg < kPlus1; rmg++) {
        const minFL = MinFL[rmg]
        // key: directed DP
        // the order is critical!
        for (const [sf, item] of items.entries()) {
            const [i, j] = item
            const outcome = dp(i, j, rmg)
            minFL[sf] = Math.min(minFL[sf - 1], outcome)
        }
    }


    const result = dp(0, 0, k)
    return result
};