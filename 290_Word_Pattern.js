/**
 * 290. Word Pattern
 * Difficulty: Easy
 * 
 * Given a pattern and a string s, find if s follows the same pattern.
Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.
Example 1:
Input: pattern = "abba", s = "dog cat cat dog"
Output: true
Example 2:
Input: pattern = "abba", s = "dog cat cat fish"
Output: false
Example 3:
Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false
Constraints:
1 <= pattern.length <= 300
pattern contains only lower-case English letters.
1 <= s.length <= 3000
s contains only lowercase English letters and spaces ' '.
s does not contain any leading or trailing spaces.
All the words in s are separated by a single space.
 */

var wordPattern = function(pattern, s) {
    const words = s.split(' ')
    const dictionary = new Map()
    const set = new Set()

    if (pattern.length !== words.length) {
        return false
    }

    for (let i = 0; i < pattern.length; i++) {
        const key = pattern[i]
        const word = words[i]
    
        if (dictionary.has(key)) {
            const value = dictionary.get(key)

            if (value !== word) {
                return false
            }
        } else {
            if (!set.has(word)) {
                dictionary.set(key, word)
                set.add(word)
            } else {
                return false
            }
        }
    }

    return true
};