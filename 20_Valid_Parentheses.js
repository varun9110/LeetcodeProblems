/**
 * 20. Valid Parentheses
 * Difficulty: Easy
 * 
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if:
Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false
 
Constraints:
1 <= s.length <= 104
s consists of parentheses only '()[]{}'.
*/

/**
 * Approch: 
 * Create a mapper to map the closing paranthesis to the respective opening one
 * Now iterate through the loop of input string and keep adding the character to an array if the character is the opening paran else pop and check if it is the
 * closing paranthesis
 * at the end check if the length of the arr is 0. if not then return false.
 * at the end return true
 */

 var isValid = function(s) {
    let arr = [];
    let mapper = {
        ")" : "(",
        "}" : "{",
        "]" : "["
    }
    for(let i=0; i<s.length; i++){
        let character = s.charAt(i);
        if(character === "(" || character === "{" || character === "["){
            arr.push(character);
        } else {
            const lastCharacter = arr.pop();
            if(mapper[character] !== lastCharacter){
                return false;
            }
        }
    }
    if(arr.length > 0){
        return false;
    }
    return true;
};