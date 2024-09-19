/**
 * 241. Different Ways to Add Parentheses
 * Difficulty : Medium
 * 
 * Given a string expression of numbers and operators, return all possible results from computing all the different possible ways to group 
 * numbers and operators. You may return the answer in any order.

The test cases are generated such that the output values fit in a 32-bit integer and the number of different results does not exceed 104.

Example 1:
Input: expression = "2-1-1"
Output: [0,2]
Explanation:
((2-1)-1) = 0 
(2-(1-1)) = 2
Example 2:
Input: expression = "2*3-4*5"
Output: [-34,-14,-10,-10,10]
Explanation:
(2*(3-(4*5))) = -34 
((2*3)-(4*5)) = -14 
((2*(3-4))*5) = -10 
(2*((3-4)*5)) = -10 
(((2*3)-4)*5) = 10

Constraints:
1 <= expression.length <= 20
expression consists of digits and the operator '+', '-', and '*'.
All the integer values in the input expression are in the range [0, 99].
The integer values in the input expression do not have a leading '-' or '+' denoting the sign.
 */

/**
 * 1. Intuition 💡
The key idea is to break the expression down recursively at every operator (+, -, *). By treating each operator as a potential point to divide the 
expression into two parts, we calculate all possible results from both sides, then combine them. This recursive exploration generates all possible ways 
to parenthesize the expression.

Imagine an expression as a tree 🌳, where operators are the nodes and numbers are the leaves. Each split of the tree is a new way of grouping the numbers 
and operators, which yields a different result. Our goal is to explore every possible tree and return all results.

2. Approach 🧩
Divide & Conquer:

For each operator (+, -, *) in the expression, split the string into two parts: the left and right sub-expressions.
Recursively compute the results of both the left and right sub-expressions.
Combine:

Once you have the results of the left and right sub-expressions, combine them based on the current operator.
For each result in the left part and each result in the right part, compute a new result using the operator.
Base Case:

If the expression contains no operators (i.e., just a number), return that number as a result.
3. Time and Space Complexity ⏳📦
Time Complexity:
The expression has n characters, where each operator can split the expression into two parts. The number of ways to split an expression grows 
exponentially (like the Catalan number sequence). This results in O(2^n) recursive calls in the worst case.

Space Complexity:

The space complexity depends on the depth of the recursion tree, which can go as deep as n. The additional space used to store intermediate 
results (in the res array) also adds up. So, the space complexity is O(2^n), primarily due to the recursive stack and storing results.
 */


/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function (expression) {
    let res = [];
    for (let i = 0; i < expression.length; i++) {
        let oper = expression[i];
        if (oper === '+' || oper === '-' || oper === '*') {
            let s1 = diffWaysToCompute(expression.slice(0, i));
            let s2 = diffWaysToCompute(expression.slice(i + 1));
            for (let a of s1) {
                for (let b of s2) {
                    if (oper === '+') res.push(a + b);
                    else if (oper === '-') res.push(a - b);
                    else if (oper === '*') res.push(a * b);
                }
            }
        }
    }
    if (res.length === 0) res.push(parseInt(expression));
    return res;
};