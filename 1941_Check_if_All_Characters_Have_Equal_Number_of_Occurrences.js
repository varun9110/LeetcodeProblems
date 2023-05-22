/**
 * 1941. Check if All Characters Have Equal Number of Occurrences
 * Difficulty: Easy
 * 
 * Given a string s, return true if s is a good string, or false otherwise.
A string s is good if all the characters that appear in s have the same number of occurrences (i.e., the same frequency).

Example 1:
Input: s = "abacbc"
Output: true
Explanation: The characters that appear in s are 'a', 'b', and 'c'. All characters occur 2 times in s.
Example 2:
Input: s = "aaabb"
Output: false
Explanation: The characters that appear in s are 'a' and 'b'.
'a' occurs 3 times while 'b' occurs 2 times, which is not the same number of times.
Constraints:

1 <= s.length <= 1000
s consists of lowercase English letters.
 */

/**
 * Approach:
 * Create a mapper object to record all values and they number of occurrences.
 * then extract all the values and check if they all are equal or not
 */

var areOccurrencesEqual = function(s) {
    let mapper = {};
    for(let i=0; i<s.length; i++){
        mapper[s[i]] = (mapper[s[i]]) ? mapper[s[i]]+1 : 1;
    }
    let values = Object.values(mapper);
    let commonValue = values[0];
    for(let i=1; i<values.length; i++){
        if (values[i] !== commonValue){
            return false;
        } 
    }
    return true;
};

//Similar approaches but different style of coding

var areOccurrencesEqual = function(s) {
    var freq = {}
    for (let c of s) freq[c] = (freq[c] || 0) + 1
    var val = freq[s[0]]
    for (let c in freq) if (freq[c] && freq[c] != val) return false;
    return true;
};

var areOccurrencesEqual = function(s) {
    let map = {};
    for(let i of s) map[i] = map[i] + 1 || 1;
    let arr = new Set(Object.values(map))
    return arr.size == 1;
};