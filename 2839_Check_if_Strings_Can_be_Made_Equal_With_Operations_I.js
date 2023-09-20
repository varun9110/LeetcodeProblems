/**
 * 2839. Check if Strings Can be Made Equal With Operations I
 * You are given two strings s1 and s2, both of length 4, consisting of lowercase English letters.
You can apply the following operation on any of the two strings any number of times:
Choose any two indices i and j such that j - i = 2, then swap the two characters at those indices in the string.
Return true if you can make the strings s1 and s2 equal, and false otherwise.
Example 1:
Input: s1 = "abcd", s2 = "cdab"
Output: true
Explanation: We can do the following operations on s1:
- Choose the indices i = 0, j = 2. The resulting string is s1 = "cbad".
- Choose the indices i = 1, j = 3. The resulting string is s1 = "cdab" = s2.
Example 2:
Input: s1 = "abcd", s2 = "dacb"
Output: false
Explanation: It is not possible to make the two strings equal.
Constraints:
s1.length == s2.length == 4
s1 and s2 consist only of lowercase English letters.
 */

/**
 * Approach: 
 * create arrays for odd and even for both the strings
 * iterate through the length and keep pushing the character to the respective array
 * 
 * sort and join and compare
 */


var canBeEqual = function(s1, s2) {
    let s1Even = [];
    let s2Even = [];
    let s1Odd = [];
    let s2Odd = [];

    for(let i=0; i<4; i++){
      if(i%2 === 0){
        s1Even.push(s1[i]);
        s2Even.push(s2[i]);
      } else {
        s1Odd.push(s1[i]);
        s2Odd.push(s2[i]);
      }
    }
    const a = (s1Odd.sort().join(""));
    const b = (s2Odd.sort().join(""));
    const c = (s1Even.sort().join(""));
    const d = (s2Even.sort().join(""));

    return (a===b && c===d)
};

/**
 * Refined approach:
 * just need to iterate thorugh half the array. check if the ith and i+2 position are equal or vice-versa. if yes then continue else return false.
 * 
 * at the end return true
 */

var canBeEqual = function(s1, s2) {
    for(let i = 0 ; i < 2 ; i++){
        if((s1[i] == s2[i] && s1[i+2] == s2[i+2] ) || 
            (s1[i+2] == s2[i] && s1[i] == s2[i+2]) ){

        }else{
            return false
        }
    }
    return true
};