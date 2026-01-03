/**
 * 411. Number of Ways to Paint N × 3 Grid
 * Difficulty: Hard
 * 
 * You have a grid of size n x 3 and you want to paint each cell of the grid with exactly one of the three colors: Red, Yellow, or Green while making sure that no two adjacent cells have the same color (i.e., no two cells that share vertical or horizontal sides have the same color).

Given n the number of rows of the grid, return the number of ways you can paint this grid. As the answer may grow large, the answer must be computed modulo 109 + 7.

 

Example 1:


Input: n = 1
Output: 12
Explanation: There are 12 possible way to paint the grid as shown.
Example 2:

Input: n = 5000
Output: 30228214
 

Constraints:

n == grid.length
1 <= n <= 5000
 */

/**
 * Intuition
Let's break down the problem step by step:

What we need: Paint n×3 grid with 3 colors (Red, Yellow, Green) where no adjacent cells share same color
Key observation 1: For any row, there are only 2 pattern types based on color distribution
Pattern Type 1 (Alternating): Colors alternate - like RYR, YRY, GRG, RGR, YGY, GYG → 6 patterns
Pattern Type 2 (All Different): All different colors - like RGB, RGY, YRG, YGR, GRY, GYR → 6 patterns
Critical insight: Each pattern type can transition to next row in specific ways
The trick: Track count of each pattern type, not individual patterns → saves space!
Why only 2 types matter?

Alternating patterns (6 total): first and last columns same, middle different
All different patterns (6 total): all three columns different
Both types have 6 variations each, total = 12 ways for first row
Approach
Breaking down the solution into clear steps:

Step 1: Identify Pattern Types

Type Alternating: 6 patterns (first and last column same)
Type All Different: 6 patterns (all three columns different)
First row: alternating_patterns = 6, all_different_patterns = 6
Step 2: Find Transition Rules

Alternating → next row: Can form 3 Alternating + 2 All Different patterns
All Different → next row: Can form 2 Alternating + 2 All Different patterns
Step 3: Dynamic Programming

For each row from 2 to n:
new_alternating = (3 × alternating_patterns + 2 × all_different_patterns) % MOD
new_all_different = (2 × alternating_patterns + 2 × all_different_patterns) % MOD
Update counts for next iteration
Step 4: Calculate Final Answer

Total ways = alternating_patterns + all_different_patterns
Why this works:

We only track pattern type counts, not individual patterns
Transition rules are mathematically derived from valid color combinations
DP builds answer row by row in O(n) time
Algorithms Used
Primary Technique: Dynamic Programming + Pattern Recognition

Breakdown:

Pattern Classification: Group 12 patterns into 2 types (Alternating and All Different)
State Transition: Calculate next row possibilities from current row
Space Optimization: Only track 2 variables instead of all 12 patterns
Complexity
Time complexity: O(n)

Space complexity: O(1)
 */

/**
 * @param {number} n
 * @return {number}
 */
var numOfWays = function(n) {
    const MOD = 1000000007;
    let alternating_patterns = 6, all_different_patterns = 6;
    
    for (let i = 2; i <= n; i++) {
        const new_alternating = (3 * alternating_patterns + 2 * all_different_patterns) % MOD;
        const new_all_different = (2 * alternating_patterns + 2 * all_different_patterns) % MOD;
        alternating_patterns = new_alternating;
        all_different_patterns = new_all_different;
    }
    
    return (alternating_patterns + all_different_patterns) % MOD;
};