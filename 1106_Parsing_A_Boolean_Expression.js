/**
 * 1106. Parsing A Boolean Expression
 * Difficulty: hard
 * 
 * A boolean expression is an expression that evaluates to either true or false. It can be in one of the following shapes:

't' that evaluates to true.
'f' that evaluates to false.
'!(subExpr)' that evaluates to the logical NOT of the inner expression subExpr.
'&(subExpr1, subExpr2, ..., subExprn)' that evaluates to the logical AND of the inner expressions subExpr1, subExpr2, ..., subExprn where n >= 1.
'|(subExpr1, subExpr2, ..., subExprn)' that evaluates to the logical OR of the inner expressions subExpr1, subExpr2, ..., subExprn where n >= 1.
Given a string expression that represents a boolean expression, return the evaluation of that expression.

It is guaranteed that the given expression is valid and follows the given rules.

 

Example 1:

Input: expression = "&(|(f))"
Output: false
Explanation: 
First, evaluate |(f) --> f. The expression is now "&(f)".
Then, evaluate &(f) --> f. The expression is now "f".
Finally, return false.
Example 2:

Input: expression = "|(f,f,f,t)"
Output: true
Explanation: The evaluation of (false OR false OR false OR true) is true.
Example 3:

Input: expression = "!(&(f,t))"
Output: true
Explanation: 
First, evaluate &(f,t) --> (false AND true) --> false --> f. The expression is now "!(f)".
Then, evaluate !(f) --> NOT false --> true. We return true.
 

Constraints:

1 <= expression.length <= 2 * 104
expression[i] is one following characters: '(', ')', '&', '|', '!', 't', 'f', and ','.
 */

/**
 * Intuition
The problem is about evaluating a boolean expression given in a string format with nested logical operators. The key idea is to evaluate the expression in a structured way, handling the nested nature of the operators (&, |, !) and the boolean values (t for true, f for false).

Since the expression can have multiple levels of nested parentheses, a stack can be a good data structure to keep track of the ongoing operations and values until we reach a complete subexpression. Once a subexpression is complete (identified by the closing )), we can evaluate it and push the result back onto the stack.

Approach
The approach revolves around using a stack to handle the nested structure of the boolean expression:

Stack Push: Traverse the expression character by character. If the character is not a closing parenthesis ), push it onto the stack.
Subexpression Evaluation: When encountering a closing parenthesis ), pop the stack to collect the boolean values for the current subexpression, evaluate it according to the preceding operator (&, |, !), and push the result back onto the stack.
Repeat: This process continues until the entire expression is processed, leaving the final result at the top of the stack.
Key details:

The & operator evaluates to true only if all values are true.
The | operator evaluates to true if at least one value is true.
The ! operator negates a value.
Complexity
Time complexity:
The time complexity is O(n), where n is the length of the expression. Each character is processed once when pushed to the stack and once when popped, leading to linear time complexity.

Space complexity:
The space complexity is O(n), where n is the length of the expression. The stack can hold up to n characters, and we use additional space to store boolean values for subexpressions.

Code Breakdown:
Stack Initialization: A stack is used to store characters of the expression as we process them.
Iterating through the expression: For each character in the expression:
If it's a valid character (not ) or ,), push it onto the stack.
When encountering ), this signals the end of a subexpression. The boolean values are popped off the stack and evaluated based on the operator before the corresponding (.
Subexpression Evaluation: After collecting the boolean values, the appropriate logical operation (&, |, !) is applied, and the result is pushed back onto the stack.
Final Result: After processing the entire expression, the result (either t or f) is at the top of the stack.

 */

var parseBoolExpr = function(expression) {
    let stk = [];  // Stack to hold characters and operators

    // Iterate over each character in the expression
    for (let c of expression) {
        if (c !== ')' && c !== ',') {
            stk.push(c);  // Push valid characters to the stack
        } else if (c === ')') {  // When ')' is encountered, evaluate subexpression
            let exp = [];  // Array to hold boolean values of the current subexpression
            
            // Pop characters until '(' is found, collect 't' or 'f' values
            while (stk.length > 0 && stk[stk.length - 1] !== '(') {
                let t = stk.pop();
                exp.push(t === 't');
            }
            
            stk.pop();  // Pop the '(' from the stack
            
            if (stk.length > 0) {
                let t = stk.pop();  // Get the operator before '('
                let v = exp[0];  // Initialize result with the first value
                
                // Perform the corresponding logical operation
                if (t === '&') {  // AND operation
                    for (let b of exp) v = v && b;
                } else if (t === '|') {  // OR operation
                    for (let b of exp) v = v || b;
                } else {  // NOT operation
                    v = !v;
                }
                
                // Push the result back to the stack as 't' or 'f'
                stk.push(v ? 't' : 'f');
            }
        }
    }

    // Return the final result from the stack
    return stk[stk.length - 1] === 't';
};