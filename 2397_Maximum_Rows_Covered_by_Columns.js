/**
 * 2397. Maximum Rows Covered by Columns
 * Difficulty: Medium
 * 
 * You are given a 0-indexed m x n binary matrix matrix and an integer numSelect, which denotes the number of distinct columns you must select from matrix.
Let us consider s = {c1, c2, ...., cnumSelect} as the set of columns selected by you. A row row is covered by s if:
For each cell matrix[row][col] (0 <= col <= n - 1) where matrix[row][col] == 1, col is present in s or,
No cell in row has a value of 1.
You need to choose numSelect columns such that the number of rows that are covered is maximized.
Return the maximum number of rows that can be covered by a set of numSelect columns.

Example 1:
Input: matrix = [[0,0,0],[1,0,1],[0,1,1],[0,0,1]], numSelect = 2
Output: 3
Explanation: One possible way to cover 3 rows is shown in the diagram above.
We choose s = {0, 2}.
- Row 0 is covered because it has no occurrences of 1.
- Row 1 is covered because the columns with value 1, i.e. 0 and 2 are present in s.
- Row 2 is not covered because matrix[2][1] == 1 but 1 is not present in s.
- Row 3 is covered because matrix[2][2] == 1 and 2 is present in s.
Thus, we can cover three rows.
Note that s = {1, 2} will also cover 3 rows, but it can be shown that no more than three rows can be covered.

Example 2:
Input: matrix = [[1],[0]], numSelect = 1
Output: 2
Explanation: Selecting the only column will result in both rows being covered since the entire matrix is selected.
Therefore, we return 2.
 
Constraints:
m == matrix.length
n == matrix[i].length
1 <= m, n <= 12
matrix[i][j] is either 0 or 1.
1 <= numSelect <= n
*/

/**
 * Approach:
 * This is kind of brute force.
 * First store the position of 1s in a mapper, with row numbers as the key and indexes in the array in values
 * Then get all the numSelect combinations available in the columns (Done in function getCombinations)
 * 
 * Triple Nested loop below
 * 1st: Iterate through all the combinations
 * 2nd : Iterate through the mapper. get each value of the index
 * 3rd : Iterate throgh each index in the above value:
 *      check if the index in the value is avaiable in combination
 *      if not then so that combination is not suited to make all columns 0, hence this will not be a part of max value.
 * 
 * Later check max between max and the currentmax, which ever is higher,save it in the max.
 * this way all combinations will be checked across each rows. and hence we can find which combination is best suited. and then finally return the max
 */


 var maximumRows = function(mat, cols) {
    const R = mat.length
    const C = mat[0].length
    const rowsToOnesPositions = {} // {1: [2,3]} row idx with position of columns where 1's
    
    let fullyCovered = 0 // fullyCovered as all zeros
    
    for(let i = 0; i < R; i++) {
        for(let j = 0; j < C; j++) {
            const currVal = mat[i][j]
            if(currVal === 0) continue
            if(!(i in rowsToOnesPositions)) {
                rowsToOnesPositions[i] = new Set()
            }
            
            rowsToOnesPositions[i].add(j)
        }
        if(!(i in rowsToOnesPositions)) {
            // if we never entered into our map, it means that all cells in that row had 0s
            fullyCovered++
        }
    }
    
    const combinationsOfChosenCols = getCombinations(C,cols)
    
    
    let max = fullyCovered
    
    for(const combination of combinationsOfChosenCols) {
        let currCovered = fullyCovered
        for(const row in rowsToOnesPositions) {
            const zerosPositions = rowsToOnesPositions[row]

            let allZerosPosMatch = true
            for(const position of zerosPositions) {
                if(!(combination.has(position))) {
                  allZerosPosMatch = false
                  break  
                } 
            }
            allZerosPosMatch && currCovered++
        }
        
        max = Math.max(currCovered, max)
    }
    
    return max
    
    function getCombinations(columnLen, toChoose) {
       const res = []
       const arr = []
       
       for(let i = 0; i < columnLen; i++) {
           dfs(i)
       }
        
       function dfs(idx) {
           arr.push(idx)
           
           if(arr.length === toChoose) {
               res.push(new Set(arr))
               arr.pop()
               return 
           }
           
           for(let i = idx+1; i<columnLen;i++) {
               dfs(i)
           }
           
           arr.pop()
       }
       return res
    }
};