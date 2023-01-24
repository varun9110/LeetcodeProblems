
/*

2087_Minimum_Cost_Homecoming_of_a_Robot_in_a_Grid
Difficulty : Medium

There is an m x n grid, where (0, 0) is the top-left cell and (m - 1, n - 1) is the bottom-right cell. You are given an integer array startPos where startPos = [startrow, startcol] indicates that initially, a robot is at the cell (startrow, startcol). You are also given an integer array homePos where homePos = [homerow, homecol] indicates that its home is at the cell (homerow, homecol).

The robot needs to go to its home. It can move one cell in four directions: left, right, up, or down, and it can not move outside the boundary. Every move incurs some cost. You are further given two 0-indexed integer arrays: rowCosts of length m and colCosts of length n.

If the robot moves up or down into a cell whose row is r, then this move costs rowCosts[r].
If the robot moves left or right into a cell whose column is c, then this move costs colCosts[c].
Return the minimum total cost for this robot to return home.

Example 1:
Input: startPos = [1, 0], homePos = [2, 3], rowCosts = [5, 4, 3], colCosts = [8, 2, 6, 7]
Output: 18
Explanation: One optimal path is that:
Starting from (1, 0)
-> It goes down to (2, 0). This move costs rowCosts[2] = 3.
-> It goes right to (2, 1). This move costs colCosts[1] = 2.
-> It goes right to (2, 2). This move costs colCosts[2] = 6.
-> It goes right to (2, 3). This move costs colCosts[3] = 7.
The total cost is 3 + 2 + 6 + 7 = 18

Example 2:
Input: startPos = [0, 0], homePos = [0, 0], rowCosts = [5], colCosts = [26]
Output: 0
Explanation: The robot is already at its home. Since no moves occur, the total cost is 0.
 
Constraints:
m == rowCosts.length
n == colCosts.length
1 <= m, n <= 105
0 <= rowCosts[r], colCosts[c] <= 104
startPos.length == 2
homePos.length == 2
0 <= startrow, homerow < m
0 <= startcol, homecol < n

*/

/*
Approach: 
Basically there will be 2 routes but both will have the same charges since the column jump and row jump will be same for both.
Now, just iterate through the difference of the rows first and add the charges then iterate through the column then and add the charges.
The final sum is the result
Time complexity is the O(n) where n is the sum of difference between the rows and columns of the robot and home
*/

//Naive code, we find where the start and end is and based on that we add or subtract the iterator
var minCost = function(startPos, homePos, rowCosts, colCosts) {

    // when start = end
    if(startPos[0] === homePos[0]  && startPos[1] === homePos[1]){
        return 0;
    }
    let result= 0;

    //calculating column jump charges
    if(startPos[1] < homePos[1]){
        let i=startPos[1];
        while(i<homePos[1]){
            result +=colCosts[i+1];
            i++;
        }
    } else if(startPos[1] > homePos[1]){
        let i=startPos[1];
        while(i>homePos[1]){
            result +=colCosts[i-1];
            i--;
        }
    }

    //calculating row jump charges
    if(startPos[0] < homePos[0]){
        let i=startPos[0];
        while(i<homePos[0]){
            result +=rowCosts[i+1];
            i++;
        }
    }else if(startPos[0] > homePos[0]){
        let i=startPos[0];
        while(i>homePos[0]){
            result +=rowCosts[i-1];
            i--;
        }
    }

    return result;

};


//Advanced approach, we just find the difference to be added between the rows and column iterator and keep iterating
var minCost = function(startPos, homePos, rowCosts, colCosts) {
    let totCosts = 0;

    let rowDir = startPos[0] <= homePos[0] ? 1 : -1;
    let colDir = startPos[1] <= homePos[1] ? 1 : -1;
    
    let row = startPos[0];

    while (row != homePos[0]) {
        row += rowDir;
        totCosts += rowCosts[row];
    }

    let col = startPos[1];

    while (col != homePos[1]) {
        col += colDir;
        totCosts += colCosts[col];
    }

    return totCosts;
};