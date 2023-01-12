/*

709. To Lower Case
Difficulty : Easy

Given a string s, return the string after replacing every uppercase letter with the same lowercase letter.

Example 1:
Input: s = "Hello"
Output: "hello"
Example 2:

Input: s = "here"
Output: "here"
Example 3:

Input: s = "LOVELY"
Output: "lovely"
 

Constraints:

1 <= s.length <= 100
s consists of printable ASCII characters.

*/

var toLowerCase = function(s) {
    let res = "";
    
    for (let i = 0; i < s.length; i++) {
        let ascii = s.charCodeAt(i);
        if (ascii >= 65 && ascii <= 90) {
            res += String.fromCharCode(ascii + 32);
        }
        else {
            res += s.charAt(i);
        }
    }
    
    return res;
};