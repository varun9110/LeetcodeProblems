/**
 * 953. Verifying an Alien Dictionary
 * Difficlty : easy
 * In an alien language, surprisingly, they also use English lowercase letters, but possibly in a different order. The order of the alphabet is some 
 * permutation of lowercase letters.
Given a sequence of words written in the alien language, and the order of the alphabet, return true if and only if the given words are sorted 
lexicographically in this alien language.

Example 1:
Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
Output: true
Explanation: As 'h' comes before 'l' in this language, then the sequence is sorted.
Example 2:
Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
Output: false
Explanation: As 'd' comes after 'l' in this language, then words[0] > words[1], hence the sequence is unsorted.
Example 3:
Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
Output: false
Explanation: The first three characters "app" match, and the second string is shorter (in size.) According to lexicographical rules "apple" > "app", because 'l' > '∅', where '∅' is defined as the blank character which is less than any other character (More info).

Constraints:
1 <= words.length <= 100
1 <= words[i].length <= 20
order.length == 26
All characters in words[i] and order are English lowercase letters.
 */


/**
 * Approach:
 * 
 */

var isAlienSorted = function(W, O) {
    let alpha = new Map([["",-1]])
    for (let i = 0; i < O.length; i++)
        alpha.set(O.charAt(i), i)
    for (let i = 1; i < W.length; i++) {
        let a = W[i-1], b = W[i]
        for (let j = 0; j < a.length; j++) {
            let achar = a.charAt(j), bchar = b.charAt(j),
                aix = alpha.get(achar), bix = alpha.get(bchar)
            if (aix < bix) break
            if (aix > bix) return false
        }
    }
    return true
    
};