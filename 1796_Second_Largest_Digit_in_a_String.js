/**
 * 1796. Second Largest Digit in a String
 * Difficulty : Easy
 * 
 * Given an alphanumeric string s, return the second largest numerical digit that appears in s, or -1 if it does not exist.

An alphanumeric string is a string consisting of lowercase English letters and digits.

 

Example 1:

Input: s = "dfa12321afd"
Output: 2
Explanation: The digits that appear in s are [1, 2, 3]. The second largest digit is 2.
Example 2:

Input: s = "abc1111"
Output: -1
Explanation: The digits that appear in s are [1]. There is no second largest digit. 
 

Constraints:

1 <= s.length <= 500
s consists of only lowercase English letters and digits.
 */

/**
 * @param {string} s
 * @return {number}
 */
var secondHighest = function(s) {
    l1=-1;
    l2=-1;
    for(let char of s){
        if(!isNaN(parseInt(char))){
            const digit=parseInt(char)
            if(digit>l1){
              l2=l1;
              l1=digit;
            }
            else if
                (digit<l1 && digit>l2){
                    l2=digit;
                }
                      
           }
           }
    return l2;    
};