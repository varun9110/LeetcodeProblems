/**
 * 150. Evaluate Reverse Polish Notation
 * Difficulty: Medium
 * 
 * You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:

The valid operators are '+', '-', '*', and '/'.
Each operand may be an integer or another expression.
The division between two integers always truncates toward zero.
There will not be any division by zero.
The input represents a valid arithmetic expression in a reverse polish notation.
The answer and all the intermediate calculations can be represented in a 32-bit integer.
 

Example 1:

Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
Example 2:

Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
Example 3:

Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
 

Constraints:

1 <= tokens.length <= 104
tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].
 */

/**
 * Approaches
(Also explained in the code)

Stack for Operand Storage: Use a stack to store operands while iterating through the given list of tokens. When encountering an operand, push it onto the stack.

Operator Handling: When encountering an operator, pop the top two operands from the stack, apply the operator, and push the result back onto the stack.

Numeric Token Detection: Check whether the token is a numeric value or an operator. If it is a numeric value, convert it to a long and push it onto the stack.

Resolving Operations: Define a helper function (resolves) to handle the arithmetic operations based on the encountered operator. Perform the operation on the top two operands and push the result back onto the stack.

Final Result: After processing all tokens, the final result will be the only remaining element on the stack. Return this value as the result of the evaluation.
 */

var resolves= function (a, b, Operator) {
    if (Operator === '+') return a + b;
    else if (Operator === '-') return a - b;
    else if (Operator === '*') return a * b;
    return Math.trunc(a / b);
};

var evalRPN = function(tokens) {
    const stack = [];
        for (const token of tokens) {
            if (token.length === 1 && token.charCodeAt(0) < 48) {
                const integer2 = stack.pop();
                const integer1 = stack.pop();
                const operator = token;
                const resolvedAns = resolves(integer1, integer2, operator);
                stack.push(resolvedAns);
            } else {
                stack.push(parseInt(token, 10));
            }
        }
        return stack.pop();
};