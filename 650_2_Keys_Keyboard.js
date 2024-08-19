/**
 * 650. 2 Keys Keyboard
 * Difficulty: Medium
 * 
 * There is only one character 'A' on the screen of a notepad. You can perform one of two operations on this notepad for each step:

Copy All: You can copy all the characters present on the screen (a partial copy is not allowed).
Paste: You can paste the characters which are copied last time.
Given an integer n, return the minimum number of operations to get the character 'A' exactly n times on the screen.

 

Example 1:

Input: n = 3
Output: 3
Explanation: Initially, we have one character 'A'.
In step 1, we use Copy All operation.
In step 2, we use Paste operation to get 'AA'.
In step 3, we use Paste operation to get 'AAA'.
Example 2:

Input: n = 1
Output: 0
 

Constraints:

1 <= n <= 1000
 */

/**
 * Intuition ✒️
When we look at the problem, the main challenge is to minimize the number of operations required to produce exactly n characters 'A' using only "Copy All" 
and "Paste" operations. Since "Copy All" copies everything on the screen, it suggests that we should think in terms of copying when we have a 
beneficial number of 'A's that will allow us to reach n through multiple pastes. This leads us to consider the factors of n because these represent 
meaningful points at which we can perform a "Copy All" to maximize efficiency.
Approach 🚀
1.Factorization Insight: To minimize the number of operations, break down the number n into its prime factors. Each factor corresponds to a 
sequence where you repeatedly paste after a "Copy All" operation.
2.Iterative Process:
Start with the smallest factor (beginning with 2).
Divide n by this factor as long as possible, adding the factor to the total steps each time you divide.
Move to the next larger factor and repeat until n is reduced to 1.
3. Sum of Factors: The sum of these factors will give the minimum number of operations required.
Example Execution:
For n = 9:
We start with factor 2: doesn't divide 9.
Factor 3 divides 9, so we add 3 to steps and reduce n to 3.
Factor 3 again divides 3, so we add 3 to steps and reduce n to 1.
Total steps = 3 + 3 = 6.
For n = 3, the result will be 3, as shown in the problem statement.
For n = 1, the result will be 0, as you already have one 'A'.
 */

/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function (n) {
    if (n === 1) return 0;

    let steps = 0;
    let factor = 2;

    while (n > 1) {
        while (n % factor === 0) {
            steps += factor;
            n = Math.floor(n / factor);
        }
        factor++;
    }

    return steps;
};