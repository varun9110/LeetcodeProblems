/**
 * 679. 24 Game
 * Dofficulty: Hard
 * 
 * You are given an integer array cards of length 4. You have four cards, each containing a number in the range [1, 9]. You should arrange the numbers on these cards in a mathematical expression using the operators ['+', '-', '*', '/'] and the parentheses '(' and ')' to get the value 24.

You are restricted with the following rules:

The division operator '/' represents real division, not integer division.
For example, 4 / (1 - 2 / 3) = 4 / (1 / 3) = 12.
Every operation done is between two numbers. In particular, we cannot use '-' as a unary operator.
For example, if cards = [1, 1, 1, 1], the expression "-1 - 1 - 1 - 1" is not allowed.
You cannot concatenate numbers together
For example, if cards = [1, 2, 1, 2], the expression "12 + 12" is not valid.
Return true if you can get such expression that evaluates to 24, and false otherwise.

 

Example 1:

Input: cards = [4,1,8,7]
Output: true
Explanation: (8-4) * (7-1) = 24
Example 2:

Input: cards = [1,2,1,2]
Output: false
 

Constraints:

cards.length == 4
1 <= cards[i] <= 9
 */

/** 
 * Intuition
The problem is small in scale (only 4 numbers), so a brute force / backtracking approach is feasible.
We can recursively pick any two numbers, apply all possible arithmetic operations (+ - * /), and replace them with the result until only one number is left. If that number is close to 24, we return true.

Approach
Convert the 4 integers into doubles to allow floating point division.
Define a recursive function:
Base case: if there is only one number, check if it is approximately equal to 24 (using a tolerance like 1e-6).
Otherwise, iterate through all pairs of numbers:
For each pair, try all possible results of combining them with + - * / (taking care to avoid division by zero).
Form a new list containing the remaining numbers plus the new result, and recurse.
If any recursive call returns true, propagate true upwards.
If no combination yields 24, return false.
Since the number of possible states is small, brute force is efficient enough.
Complexity
Time complexity:
For general n, the recursion explores O(n 
2
 ) choices of pairs at each step, and reduces the problem to size n−1.
Thus, the complexity is about O(n 
2
 ∗(n−1) 
2
 ∗...∗2 
2
 )=O((n!)∗n)
For this problem, n=4, so the maximum number of states is a constant (≈ 3888).
Therefore, effectively O(1) in practice.

Space complexity:
The recursion depth is at most n (here 4), and each call stores a small vector of numbers.
Hence space complexity is &&O(n)&&, which is &&O(1)&& for n=4.
*/


/**
 * @param {number[]} cards
 * @return {boolean}
 */
var judgePoint24 = function(cards) {
  const EPS = 1e-6;

  const backtrack = (nums) => {
    if (nums.length === 1) return Math.abs(nums[0] - 24) < EPS;

    const n = nums.length;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const rest = [];
        for (let k = 0; k < n; k++) {
          if (k !== i && k !== j) rest.push(nums[k]);
        }

        const a = nums[i], b = nums[j];

        const candidates = [];
        candidates.push(a + b);        // + 
        candidates.push(a - b);        // -
        candidates.push(b - a);        // -
        candidates.push(a * b);        // * 
        if (Math.abs(b) > EPS) candidates.push(a / b); 
        if (Math.abs(a) > EPS) candidates.push(b / a); 

        for (const x of candidates) {
          rest.push(x);
          if (backtrack(rest)) return true;
          rest.pop();
        }
      }
    }
    return false;
  };

  return backtrack(cards.map(x => x * 1.0));
};