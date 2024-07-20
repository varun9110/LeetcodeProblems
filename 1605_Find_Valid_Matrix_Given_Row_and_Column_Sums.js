/**
 * 1605. Find Valid Matrix Given Row and Column Sums
 * Difficulty: Medium
 * 
 * You are given two arrays rowSum and colSum of non-negative integers where rowSum[i] is the sum of the elements in the ith row and colSum[j] is 
 * the sum of the elements of the jth column of a 2D matrix. In other words, you do not know the elements of the matrix, 
 * but you do know the sums of each row and column.

Find any matrix of non-negative integers of size rowSum.length x colSum.length that satisfies the rowSum and colSum requirements.
Return a 2D array representing any matrix that fulfills the requirements. It's guaranteed that at least one matrix that fulfills the requirements exists.

Example 1:
Input: rowSum = [3,8], colSum = [4,7]
Output: [[3,0],
         [1,7]]
Explanation: 
0th row: 3 + 0 = 3 == rowSum[0]
1st row: 1 + 7 = 8 == rowSum[1]
0th column: 3 + 1 = 4 == colSum[0]
1st column: 0 + 7 = 7 == colSum[1]
The row and column sums match, and all matrix elements are non-negative.
Another possible matrix is: [[1,2],
                             [3,5]]
Example 2:
Input: rowSum = [5,7,10], colSum = [8,6,8]
Output: [[0,5,0],
         [6,1,0],
         [2,0,8]]
 
Constraints:
1 <= rowSum.length, colSum.length <= 500
0 <= rowSum[i], colSum[i] <= 108
sum(rowSum) == sum(colSum)
 */


/**
 *  Approach: Greedy With 2 Pointers
🤔 Intuition
For today's problem it's hard to explain something in plain text, so I've prepared images with explanations for you. But before this - 
don't look at that stupid examples in description, they're just distract you, it's common for such problem where you need to find one valid answer 
among several to put some nonsense as example trying to confuse solvers. In fact, problem is much easier, 
so let's look at the pictures and then I'll do some more explanations about why this works


First of all, about why this will work for any n and m - when you came to the last cell you know for sure that you eliminated cols - 1 columns 
and rows - 1 rows, but you came either from top or left, so you've visited either row or column for the FIRST time, what about the sum you left 
in the other candidate? It's accumulated from cols - 1 columns and rows - 1 rows. If you came from left then last column was untouched so far and 
because you visited all columns you've already column sum among all columns column_sum - this_last_element and row sum row_sum - this_last_element, 
but you know for sure that column_sum = row_sum, from this you can say that if you fill matrix with this method you always end up with the state where 
last element is defined by equality.

Secondly, you always will create valid result and fill every row and column because the condition for loop is column is in bounds OR row is in bounds, 
so this is possible that you will first go all way to right and only then to the bottom (I think so). Also, there might be a case where, for example, 
initially C1 == R1 - then you want to move your pointer not one column or one row but BOTH of them.

This concludes my explanation, hope this makes sense for you - if not feel free to ask any question in comments
 */


var restoreMatrix = function(rowSum, colSum) {
    let rows = rowSum.length;
    let cols = colSum.length;
    let cur_row = 0, cur_col = 0;
    let res = Array.from({ length: rows }, () => Array(cols).fill(0));

    while (cur_row < rows || cur_col < cols) {
        if (cur_row >= rows) {
            res[rows - 1][cur_col] = colSum[cur_col];
            cur_col++;
            continue;
        } else if (cur_col >= cols) {
            res[cur_row][cols - 1] = rowSum[cur_row];
            cur_row++;
            continue;
        }

        let value_to_put = Math.min(rowSum[cur_row], colSum[cur_col]);
        rowSum[cur_row] -= value_to_put;
        colSum[cur_col] -= value_to_put;
        res[cur_row][cur_col] = value_to_put;

        // I write this as this because it's possible that rowSum[cur_row] == colSum[cur_col] and we'll want to move both row and col pointers
        if (rowSum[cur_row] === 0) {
            cur_row++;
        }
        if (colSum[cur_col] === 0) {
            cur_col++;
        }
    }
    return res;
};
