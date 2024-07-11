/**
 * 1190. Reverse Substrings Between Each Pair of Parentheses
 * Difficulty: Medium
 * 
 * You are given a string s that consists of lower case English letters and brackets.
Reverse the strings in each pair of matching parentheses, starting from the innermost one.
Your result should not contain any brackets.

Example 1:
Input: s = "(abcd)"
Output: "dcba"
Example 2:
Input: s = "(u(love)i)"
Output: "iloveu"
Explanation: The substring "love" is reversed first, then the whole string is reversed.
Example 3:
Input: s = "(ed(et(oc))el)"
Output: "leetcode"
Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.

Constraints:
1 <= s.length <= 2000
s only contains lower case English characters and parentheses.
It is guaranteed that all parentheses are balanced.
 */

/**
 * Intuition
It took time for me to come up even with this approach, so don't worry if something seems hard, 
I'll try my best so after my explanations you can write code by yourself.

Let's say we iterate through s and we found ). What does this mean for us? Well, 
this means that we want to know the pair to which match this bracket and then reverse string from that bracket to this. How'd we know? 
Common data structure related to problems with parentheses - stack. Because if brackets are balanced than you can match them like this:
If you encountered ) then the matching open bracket is the one last in the stack - this is the last bracket we found which is still unmatched with any close bracket.
So, all we want to do - create stack and keep track of indeces of open brackets. 
Each time we find close bracket we match it to the last unmatched open bracket and reverse string beetween them.
This approach guarantee that we first reverse innermost parts and only then reverse them one more time on the next layer.
 */

var reverseParentheses = function (s) {
    let indStack = [];
    let res = [];

    for (let char_s of s) {
        if (char_s === '(') {
            indStack.push(res.length);
        } else if (char_s === ')') {
            let startInd = indStack.pop();
            let subArr = res.slice(startInd).reverse();
            res.splice(startInd, subArr.length, ...subArr);
        } else {
            res.push(char_s);
        }
    }

    return res.join('');
};