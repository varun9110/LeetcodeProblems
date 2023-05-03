/**
 * 1337. The K Weakest Rows in a Matrix
 * Difficulty: Easy
 * ou are given an m x n binary matrix mat of 1's (representing soldiers) and 0's (representing civilians). The soldiers are positioned in 
 * front of the civilians. That is, all the 1's will appear to the left of all the 0's in each row.
A row i is weaker than a row j if one of the following is true:
The number of soldiers in row i is less than the number of soldiers in row j.
Both rows have the same number of soldiers and i < j.
Return the indices of the k weakest rows in the matrix ordered from weakest to strongest.
Example 1:
Input: mat = 
[[1,1,0,0,0],
 [1,1,1,1,0],
 [1,0,0,0,0],
 [1,1,0,0,0],
 [1,1,1,1,1]], 
k = 3
Output: [2,0,3]
Explanation: 
The number of soldiers in each row is: 
- Row 0: 2 
- Row 1: 4 
- Row 2: 1 
- Row 3: 2 
- Row 4: 5 
The rows ordered from weakest to strongest are [2,0,3,1,4].
Example 2:
Input: mat = 
[[1,0,0,0],
 [1,1,1,1],
 [1,0,0,0],
 [1,0,0,0]], 
k = 2
Output: [0,2]
Explanation: 
The number of soldiers in each row is: 
- Row 0: 1 
- Row 1: 4 
- Row 2: 1 
- Row 3: 1 
The rows ordered from weakest to strongest are [0,2,3,1].
 Constraints:
m == mat.length
n == mat[i].length
2 <= n, m <= 100
1 <= k <= m
matrix[i][j] is either 0 or 1.
 */

/**
 * Approach:
 * Iterate through the matrix and count the number of 1s before 0s in each row, then create an array with index and count of 1s
 * then sort the array with the count of 1s then create the array with just the indexes and then finally splice the array.
 */

var kWeakestRows = function (mat, k) {
  let temp = mat.map((row, index) => {
    let count = 0;
    for (let i = 0; i < row.length; i++) {
      if (row[i] === 0) {
        break;
      }
      count++;
    }
    return { index, count };
  });
  temp.sort((a, b) => a.count - b.count).map((item) => item[0]);
  let result = [];
  for (let j = 0; j < k; j++) {
    result.push(temp[j].index);
  }
  return result;
};

/**
 * using the js built in js methods. refactored code
 */

var kWeakestRows = function (mat, k) {
  return mat
    .map((row, index) => {
      let count = 0;
      for (let i = 0; i < row.length; i++) {
        if (row[i] === 0) {
          break;
        }
        count++;
      }
      return { index, count };
    })
    .sort((a, b) => a.count - b.count)
    .map((item) => item.index)
    .splice(0, k);
};
