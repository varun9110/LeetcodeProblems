/**
 * 1358. Number of Substrings Containing All Three Characters
 * Difficulty: Medium
 * 
 * Given a string s consisting only of characters a, b and c.

Return the number of substrings containing at least one occurrence of all these characters a, b and c.

Example 1:
Input: s = "abcabc"
Output: 10
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again). 
Example 2:
Input: s = "aaacb"
Output: 3
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb". 
Example 3:
Input: s = "abc"
Output: 1
 
Constraints:
3 <= s.length <= 5 x 10^4
s only consists of a, b or c characters.
 */

/**
 * Approach:
 * 
 * Find out the codition where a, b and c is found atleast once and keep storing the min index of either of the three. Then add the min and all the Permutations before that index to the result.
 * 
 */

/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function(s) {
    let a = b = c= -1;
    let result = 0;
    for(let i=0; i<s.length; i++){
        switch(s[i]){
            case "a" :
                a = i
                break;
            case "b" : 
                b =i;
                break
            case "c" : 
                c = i;
                break;
        }

        if(a>=0 && b >= 0 && c>=0){
            let min = Math.min(a,b,c);
            result = result + 1 + min
        }
    }

    return result
};