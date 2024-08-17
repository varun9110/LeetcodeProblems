/**
 * 1937. Maximum Number of Points with Cost
 * Difficulty: Medium
 * 
 * You are given an m x n integer matrix points (0-indexed). Starting with 0 points, you want to maximize the number of points you can get from the matrix.

To gain points, you must pick one cell in each row. Picking the cell at coordinates (r, c) will add points[r][c] to your score.

However, you will lose points if you pick a cell too far from the cell that you picked in the previous row. 
For every two adjacent rows r and r + 1 (where 0 <= r < m - 1), picking cells at coordinates (r, c1) and (r + 1, c2) will 
subtract abs(c1 - c2) from your score.

Return the maximum number of points you can achieve.

abs(x) is defined as:

x for x >= 0.
-x for x < 0.
 

Example 1:


Input: points = [[1,2,3],[1,5,1],[3,1,1]]
Output: 9
Explanation:
The blue cells denote the optimal cells to pick, which have coordinates (0, 2), (1, 1), and (2, 0).
You add 3 + 5 + 3 = 11 to your score.
However, you must subtract abs(2 - 1) + abs(1 - 0) = 2 from your score.
Your final score is 11 - 2 = 9.
Example 2:


Input: points = [[1,5],[2,3],[4,2]]
Output: 11
Explanation:
The blue cells denote the optimal cells to pick, which have coordinates (0, 1), (1, 1), and (2, 0).
You add 5 + 3 + 4 = 12 to your score.
However, you must subtract abs(1 - 1) + abs(1 - 0) = 1 from your score.
Your final score is 12 - 1 = 11.
 

Constraints:

m == points.length
n == points[r].length
1 <= m, n <= 105
1 <= m * n <= 105
0 <= points[r][c] <= 105
 */

/**
 * Problem
We're given a grid (a matrix) where each cell has some points. We want to collect the most points possible by picking one cell from each row. 
However, there's a catch: if you choose a cell in one row and then pick a cell that's far away in the next row, you'll lose some points 
based on how far apart they are.

To maximize your score, you need to think carefully about which cells to pick in each row so that you get the most points while losing the 
fewest points due to distance between picks.

Since the grid can be large, a simple method that checks all possible options would be too slow. Instead, we need a smart strategy that 
efficiently calculates the best way to pick cells from the grid to get the highest possible score.

Intuition
When I first looked at this problem, I thought about The most straightforward approach would be to try all possible combinations of cell selections. 
For each row, we would choose one cell, and then recursively explore all possibilities for the remaining rows. While this would guarantee 
finding the optimal solution, it would be extremely inefficient. The time complexity would be O(n^m), where n is the number of columns and m is 
the number of rows. This is impractical for any reasonably sized input.
Then I thought We might consider a greedy approach where we always choose the cell with the highest value in each row. However, this fails to account 
for the penalties incurred by movement between rows.
Realizing these shortcomings of brute force and greedy approaches, we turn to dynamic programming. Since Dynamic programming is ideal for problems where:

The optimal solution can be constructed from optimal solutions of subproblems.
The problem has overlapping subproblems.
Both conditions are met in our case:

The best path to any cell in a row depends on the best paths to cells in the previous row.
When calculating the best score for a cell, we'll need to consider the best scores from the previous row multiple times.
Developing the Intuition

To develop our intuition for solving this problem, let's think about how we would make decisions if we were solving it manually:

For each cell in a row, we need to know the best way to reach it from the previous row.
The "best way" means the path that gives us the highest score considering both the cell values and the penalties.
For any given cell, we could potentially come from any cell in the previous row.
However, cells that are far away in the previous row are less likely to be optimal due to the increasing penalty.
This line of thinking leads us to a key insight: for each cell, we don't need to consider every cell from the previous row, 
but we do need to consider a range of cells to ensure we don't miss the optimal path.

How To think of Optimization

Now, here's where the real insight comes in. Instead of calculating the best score for each cell by looking at every cell in the previous row, 
what if we could somehow efficiently propagate the best scores across the row?

Imagine we're looking at a particular cell. The best score for this cell could come from:

A path that came from the left side of the previous row
A path that came directly from above
A path that came from the right side of the previous row
If we could efficiently calculate these three possibilities for every cell, we'd have our solution!

This leads us to the key ideas of our optimized approach:

Process the matrix row by row
For each row, make two passes:
A left-to-right pass to calculate the best scores coming from the left
A right-to-left pass to calculate the best scores coming from the right and combine with the scores from above and the left
To Summarise at first, I considered a straightforward DP approach: for each cell, we could calculate the maximum points by considering 
all possible moves from the previous row. But then I realized, that's going to be slow for large grids!
That's when it hit me - we don't need to consider every single possible move for each cell. We can be smarter about this. 
What if we could somehow keep track of the best possible score from the left and right sides as we move through each row? 
This thought led me to the optimized approach Instead of recalculating scores from every possible cell in the previous row for each cell in the current 
row, we use a more efficient method. By maintaining a running maximum (peak) and performing two sweeps (left-to-right and right-to-left), 
we avoid redundant calculations. This strategy updates the currentRow directly, eliminating the need for separate leftMax and rightMax 
arrays while ensuring optimal performance.

Approach
Let's break down the approach step-by-step:

1. Initialize Data Structures
We'll use two arrays:

previous: to store the best scores for each column in the previous row
current: to calculate and store the best scores for each column in the current row
Initially, previous will be all zeros, representing the scores before we start processing the first row.

2. Process Each Row
For each row in the matrix, we'll do the following:

2.1 Forward Pass (Left−to−Right)
In this pass, we calculate the best score for each cell if we were to come from the left side of the previous row.

We use a variable peak to keep track of the maximum score we can bring from the left. As we move right, we subtract 1 from peak for each 
step (this represents our penalty), but we also compare it with the score from the cell directly above (which is in previous).

The logic looks like this:

peak = 0
for i from 0 to width - 1:
    peak = max(peak - 1, previous[i])
    current[i] = peak
What's happening here?

peak - 1 represents the best score we can bring from the left, minus the penalty for moving one more step right.
previous[i] represents the best score if we came directly from above.
By taking the maximum of these two values, we're choosing the better option between coming from the left or from directly above.
After this pass, current[i] holds the best score we can get at column i if we only consider moves from the left or from directly above.

Mathematical Explanation:

Recurrence Relation:
current[i] = max(previous[j] - (i−j)) for all j<=i

Explanation:

For each cell i in the current row, current[i] is updated to be the maximum of:
previous[j] - (i - j): The score from the previous row's column j adjusted by the penalty (i−j) (since moving from a 
column j to i incurs a penalty of (i−j).
peak: Keeps track of the maximum score obtainable from the left side (up to column i) while moving right.
peak represents the maximum score that can be achieved from the left as we move through the row.
2.2 Backward Pass (Right−to−Left)
Now we do a similar process, but from right to left. This time, we're updating current with the maximum of:

The value we calculated in the forward pass
The best score we can get from the right
And then we add the points from the current cell in the matrix.

The logic looks like this:

peak = 0
for i from width - 1 to 0:
    peak = max(peak - 1, previous[i])
    current[i] = max(current[i], peak) + matrix[row][i]
What's happening here?

peak - 1 represents the best score we can bring from the right, minus the penalty for moving one more step left.
previous[i] again represents the best score if we came directly from above.
max(current[i], peak) chooses the better option between the score calculated in the forward pass and the score we can get from the right.
Finally, we add matrix[row][i], which is the value of the current cell in the matrix.
Mathematical Explanation:

Recurrence Relation:
current[i] = max(current[i], peak) + level[i]

Explanation:

peak tracks the maximum score obtainable from the right side (from column i to the end of the row) while moving left.
current[i] is updated to be the maximum of:
current[i]: The score from the forward pass (left−to−right).
peak: The best score achievable from the right, minus the penalty for moving left.
Adding level[i] incorporates the points of the current cell into the total score.
3. Update for Next Row
After processing a row, we make previous = current. This way, when we move to the next row, previous holds the best scores from all the 
rows we've processed so far.

4. Final Result
After processing all rows, previous will hold the maximum scores possible for each column in the last row. The highest value in this array 
is our answer - it's the maximum score we can achieve.

Why This Approach Works
This approach is brilliant in its efficiency. Here's why it works:

Considers All Possibilities: By doing both a forward and backward pass, we've considered all possible moves to each cell:

Moves from directly above (from previous[i])
Moves from any cell to the left (forward pass)
Moves from any cell to the right (backward pass)
Efficient Computation: Instead of comparing every cell with every other cell in the previous row (which would be O(n^2) for each row), 
we're doing two linear passes through each row. This reduces our time complexity to O(m*n), where m is the number of rows and n is the number of columns.

Space Efficient: We only need to keep track of two rows at a time (previous and current), so our space complexity is O(n), where n is the number of columns.

Handles Penalties Implicitly: By subtracting 1 from peak in each step, we're implicitly handling the penalty for moving between columns. 
This clever trick allows us to avoid explicitly calculating penalties for each possible move.

Optimal Substructure: This approach leverages the optimal substructure property of the problem. The best path to any cell depends 
only on the best paths to cells in the previous row, which allows us to build our solution incrementally.

[The majority of the content remains the same. Only the sections that require updates are shown below.]

Mathematical Explanation
Let's delve deeper into the mathematics behind this approach:

Forward Pass Equation
peak = max(peak - 1, previous[i])
current[i] = peak
This is effectively solving the recurrence relation:

current[i] = max(previous[j] - (i - j)) for all j <= i
Here, (i - j) represents the penalty for moving from column j to column i.

To understand this better, let's break it down:

previous[j] - (i - j) represents the score we would get if we came from column j in the previous row to column i in the current row.
We're taking the maximum of this value for all j <= i, which means we're considering all possible moves from the left side of the previous row.
The peak variable efficiently keeps track of this maximum as we move from left to right.
Backward Pass Equation
peak = max(peak - 1, previous[i])
current[i] = max(current[i], peak) + matrix[row][i]
This completes our calculation by considering moves from the right and adding the current cell's value. Let's break this down:

Similar to the forward pass, peak keeps track of the best score we can bring from the right.
max(current[i], peak) chooses the better option between:
The score calculated in the forward pass (stored in current[i])
The best score we can get from the right (stored in peak)
Finally, we add matrix[row][i], which is the value of the current cell in the matrix.
Overall Recurrence Relation
The combination of these two passes effectively solves the overall recurrence relation:

dp[r][c] = matrix[r][c] + max(dp[r-1][k] - abs(c - k)) for all k
Where:

dp[r][c] represents the maximum score achievable at row r, column c
matrix[r][c] is the value in the input grid at row r, column c
abs(c - k) is the penalty for moving from column k in the previous row to column c in the current row
The max is taken over all possible k (all columns in the previous row)
This recurrence relation encapsulates the core of our problem:

We add the value of the current cell (matrix[r][c])
We consider all possible moves from the previous row (for all k)
For each possible move, we calculate the score (dp[r-1][k]) minus the penalty (abs(c - k))
We take the maximum of all these possibilities
Our two-pass approach (forward and backward) is an efficient way to solve this recurrence without explicitly considering every k for each cell.

Correctness Proof
To prove that our approach correctly solves the recurrence relation, we can show that after the backward pass, current[i] will 
indeed contain the value of dp[r][i] as defined by the recurrence relation.

The forward pass calculates:

current[i] = max(previous[j] - (i - j)) for all j <= i
The backward pass then updates this to:

current[i] = max(current[i], max(previous[j] - (j - i)) for all j > i) + matrix[r][i]
Combining these, we get:

current[i] = max(max(previous[j] - |i - j|) for all j) + matrix[r][i]
This is equivalent to our recurrence relation:

dp[r][i] = matrix[r][i] + max(dp[r-1][k] - abs(i - k)) for all k
Thus, our two-pass approach correctly solves the recurrence relation for each cell in each row.

Complexity
Time Complexity: O(m×n)

Matrix Dimensions:

Let (m) be the number of rows in the matrix.
Let (n) be the number of columns in the matrix.
Processing Each Cell:

Forward Sweep: During the forward sweep for each row, we iterate over all (n) columns once. Since this is done for each of the (m) rows, 
it results in O(m×n) operations.
Backward Sweep: Similarly, in the backward sweep, we iterate over all (n) columns once for each of the (m) rows, which adds another O(m×n) operations.
Since we perform both sweeps sequentially for each row, the total time complexity is the sum of the two sweeps' complexities. 
Each sweep operates in (O(n)) time per row, and with (m) rows, the combined complexity for processing all rows is:

O(m×n) + O(m×n) = O(m×n)

This means that, overall, we process each cell a constant number of times (specifically, twice), leading to an overall time complexity of O(m×n).

Space Complexity: O(n)
Space for Arrays:
We use two arrays: current and previous, each of size (n) (the number of columns in the matrix). 
These arrays store the maximum points that can be achieved up to the current row for each column.
No Additional Significant Space Usage:
Apart from the arrays, we only use a few extra variables (peak, maxScore) to keep track of intermediate results. These variables use constant space.
Since the size of the arrays is proportional to the number of columns (n) and does not depend on the number of rows (m), the space complexity is: O(n)
 */

/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function(points) {
    let width = points[0].length;
    let current = new Array(width).fill(0);
    let previous = new Array(width);
    
 
    for (let i = 0; i < width; i++) {
        previous[i] = points[0][i];
    }

    for (let row = 1; row < points.length; row++) {
        let peak = 0;
        
        // Forward sweep
        for (let col = 0; col < width; col++) {
            peak = Math.max(peak - 1, previous[col]);
            current[col] = points[row][col] + peak;
        }
        
        peak = 0;
        
        // Backward sweep
        for (let col = width - 1; col >= 0; col--) {
            peak = Math.max(peak - 1, previous[col]);
            current[col] = Math.max(current[col], points[row][col] + peak);
        }
        
        
        [previous, current] = [current, previous];
    }
    
    
    return Math.max(...previous);
};
