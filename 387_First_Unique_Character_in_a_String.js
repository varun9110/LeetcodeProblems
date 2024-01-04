/**
 * 387. First Unique Character in a String
 * Difficulty: Easy
 * 
 * Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.
Example 1:
Input: s = "leetcode"
Output: 0
Example 2:
Input: s = "loveleetcode"
Output: 2
Example 3:
Input: s = "aabb"
Output: -1
Constraints:
1 <= s.length <= 105
s consists of only lowercase English letters.
 */

var firstUniqChar = function(s) {
    let map ={};
    let result = -1;

    for(let i=0; i<s.length; i++){
        if(map[s[i]]){
            map[s[i]].push(i);
        } else {
            map[s[i]] = [i];
        }
    }

    for(let i=0; i<s.length; i++){        
        if(map[s[i]].length === 1){
            result = (result >= 0) ? Math.min(result, map[s[i]][0]) : map[s[i]][0]
        }
    }
    return result;
};


/**
 * Alternate approach
 */

var firstUniqChar = function(s) {
    let arr = new Array(26).fill(0);

    for (let i = 0; i < s.length; i++ ) {
        let index = s.charCodeAt(i) - 97;
        arr[index]++;
    }

    for (let i = 0; i < s.length; i++ ) {
        let index = s.charCodeAt(i) - 97;
        if(arr[index] == 1) {
            return i;
        }
    }

    return -1;
};