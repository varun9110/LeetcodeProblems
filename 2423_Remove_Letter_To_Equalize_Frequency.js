/**
 * 2423. Remove Letter To Equalize Frequency
 * Difficulty: Easy
 * 
 * You are given a 0-indexed string word, consisting of lowercase English letters. You need to select one index and 
 * remove the letter at that index from word so that the frequency of every letter present in word is equal.
Return true if it is possible to remove one letter so that the frequency of all letters in word are equal, and false otherwise.
Note:
The frequency of a letter x is the number of times it occurs in the string.
You must remove exactly one letter and cannot chose to do nothing.

Example 1:
Input: word = "abcc"
Output: true
Explanation: Select index 3 and delete it: word becomes "abc" and each character has a frequency of 1.
Example 2:
Input: word = "aazz"
Output: false
Explanation: We must delete a character, so either the frequency of "a" is 1 and the frequency of "z" is 2, or vice versa. It is impossible to make all present letters have equal frequency.

Constraints:
2 <= word.length <= 100
word consists of lowercase English letters only.
 */


/**
 * Approach:
 * craete a map from the whole string
 * then iterate through the whole map
 *      copy the map into another map.
 *      now if the value is 1 remmove the object and store the values of this new map in a set. if the legth of this new set is 1 (all else length is same)
 *      then save the output value as true;
 *      else if the keep reduing each key value by 1 and keep checking in the set if others are same
 * at the end return the value of the output
 * 
 */

var equalFrequency = function(word) {
    const hashmap = new Map();
    
    for (let i = 0; i < word.length; i++) {
        const character = word[i];
        if (hashmap.has(character)) {
            hashmap.set(character, hashmap.get(character) + 1);
        } else {
            hashmap.set(character, 1);
        }
    }
    let output = false;
    hashmap.forEach((value, key) => {
        const newMap = new Map(hashmap);
        if (value === 1) {
            newMap.delete(key)
        } else {
            newMap.set(key, newMap.get(key) - 1);
        }
        if (new Set([...newMap.values()]).size === 1) output = true;
    })
    return output;
};