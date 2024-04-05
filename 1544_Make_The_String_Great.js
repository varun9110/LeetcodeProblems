/**
 * 1544. Make The String Great
 * Difficulty: Easy
 * Given a string s of lower and upper case English letters.

A good string is a string which doesn't have two adjacent characters s[i] and s[i + 1] where:

0 <= i <= s.length - 2
s[i] is a lower-case letter and s[i + 1] is the same letter but in upper-case or vice-versa.
To make the string good, you can choose two adjacent characters that make the string bad and remove them. 
You can keep doing this until the string becomes good.
Return the string after making it good. The answer is guaranteed to be unique under the given constraints.
Notice that an empty string is also good.
Example 1:
Input: s = "leEeetcode"
Output: "leetcode"
Explanation: In the first step, either you choose i = 1 or i = 2, both will result "leEeetcode" to be reduced to "leetcode".
Example 2:
Input: s = "abBAcC"
Output: ""
Explanation: We have many possible scenarios, and all lead to the same answer. For example:
"abBAcC" --> "aAcC" --> "cC" --> ""
"abBAcC" --> "abBA" --> "aA" --> ""
Example 3:

Input: s = "s"
Output: "s"
 
Constraints:
1 <= s.length <= 100
s contains only lower and upper case English letters.
 */

/**
 * Approach
1. Initialize an empty stack.
2. Iterate through each character in the input string.
3. For each character, check if it forms a bad pair with the top character of the stack. If it does, pop the character from the stack.
4. If the character doesn't form a bad pair, push it onto the stack.
5. Finally, join the characters left in the stack to form the resultant string.
 */

var makeGood = function(s) {
    const stack = [];
    
    for (const char of s) {
        if (stack.length > 0 && Math.abs(char.charCodeAt() - stack[stack.length - 1].charCodeAt()) === 32) {
            stack.pop();
        } else {
            stack.push(char);
        }
    }
    
    return stack.join('');
};