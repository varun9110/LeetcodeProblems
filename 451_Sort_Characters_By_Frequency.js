/**
 * 451. Sort Characters By Frequency
 * Difficulty: Medium
 * 
 * Given a string s, sort it in decreasing order based on the frequency of the characters. T
 * he frequency of a character is the number of times it appears in the string.

Return the sorted string. If there are multiple answers, return any of them.

Example 1:
Input: s = "tree"
Output: "eert"
Explanation: 'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
Example 2:
Input: s = "cccaaa"
Output: "aaaccc"
Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
Note that "cacaca" is incorrect, as the same characters must be together.
Example 3:
Input: s = "Aabb"
Output: "bbAa"
Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
Note that 'A' and 'a' are treated as two different characters.

Constraints:
1 <= s.length <= 5 * 105
s consists of uppercase and lowercase English letters and digits.
 */

/**
 * Approach: 
 * Create an array of object to store the frequency of each letter then sort them in descending and then merge them back
 */


var frequencySort = function(s) {
    let map = {};
    for(let i=0; i<s.length; i++){
        map[s[i]] = (map[s[i]]) ? map[s[i]]+1 : 1;
    }
    
    let keys = Object.keys(map);
    let sortArray = [];

    for(let i=0; i<keys.length; i++){
        let key = keys[i];
        let val = map[key];
        sortArray.push({key, val});
    }
   sortArray.sort((a,b) => (b.val - a.val));
   let result = "";
   for(let i=0; i<sortArray.length; i++){
       let key = sortArray[i].key;
       let j=0;
       while(j<sortArray[i].val){
           result += key;
           j++;
       }
   }
   return result
};

/**
 * Refined code
 */

var frequencySort = function(s) {
    let freq = {}
    s = s.split("")
    s.forEach(element => {
        freq[element] = freq[element]?freq[element]+1:1
    })
    let arr = Object.keys(freq).map(element => [element, freq[element]])
    arr = arr.sort((a,b) => b[1]-a[1])
    let res = ""
    for(const i of arr) {
        res += i[0].repeat(i[1])
    }
    return res
};