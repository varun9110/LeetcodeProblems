/**
 * 383. Ransom Note
 * Difficulty: Easy
 * 
 * Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.
Each letter in magazine can only be used once in ransomNote.
Example 1:
Input: ransomNote = "a", magazine = "b"
Output: false
Example 2:
Input: ransomNote = "aa", magazine = "ab"
Output: false
Example 3:
Input: ransomNote = "aa", magazine = "aab"
Output: true
Constraints:
1 <= ransomNote.length, magazine.length <= 105
ransomNote and magazine consist of lowercase English letters.
 */

var canConstruct = function(ransomNote, magazine) {
    let map1 = {};
    let map2 = {};
    for(let i=0; i<ransomNote.length; i++){
        map1[ransomNote[i]] = (map1[ransomNote[i]]) ? map1[ransomNote[i]]+1 : 1
    }

    for(let i=0; i<magazine.length; i++){
        map2[magazine[i]] = (map2[magazine[i]]) ? map2[magazine[i]]+1 : 1
    }

    for(let i=0; i<ransomNote.length; i++){
        let character = ransomNote[i];
        if(!map2[character] || map1[character] > map2[character]){
            return false;
        }
    }
    return true;
};


/**
 * Refined code
 */

var canConstruct = function(ransomNote, magazine) {
  let zineCount = Array(26).fill(0) //O(n), O(1)

  let i = 0;
  for(; i < magazine.length; i++) {
    zineCount[magazine.charCodeAt(i) - 'a'.charCodeAt(0)] += 1;
  }

  i = 0;
  for(; i < ransomNote.length; i++) {
    let index = ransomNote[i].charCodeAt(0) - 'a'.charCodeAt(0);
    if(zineCount[index] <= 0) return false;
    zineCount[index] -= 1;
  }

  return true;  
};