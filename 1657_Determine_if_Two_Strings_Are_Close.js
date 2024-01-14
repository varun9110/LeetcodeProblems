/**
 * 1657. Determine if Two Strings Are Close
 * Difficulty: Medium
 * 
 * Two strings are considered close if you can attain one from the other using the following operations:
Operation 1: Swap any two existing characters.
For example, abcde -> aecdb
Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.
For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)
You can use the operations on either string as many times as necessary.
Given two strings, word1 and word2, return true if word1 and word2 are close, and false otherwise.
Example 1:
Input: word1 = "abc", word2 = "bca"
Output: true
Explanation: You can attain word2 from word1 in 2 operations.
Apply Operation 1: "abc" -> "acb"
Apply Operation 1: "acb" -> "bca"
Example 2:
Input: word1 = "a", word2 = "aa"
Output: false
Explanation: It is impossible to attain word2 from word1, or vice versa, in any number of operations.
Example 3:
Input: word1 = "cabbba", word2 = "abbccc"
Output: true
Explanation: You can attain word2 from word1 in 3 operations.
Apply Operation 1: "cabbba" -> "caabbb"
Apply Operation 2: "caabbb" -> "baaccc"
Apply Operation 2: "baaccc" -> "abbccc"

Constraints:
1 <= word1.length, word2.length <= 105
word1 and word2 contain only lowercase English letters.
 */

var closeStrings = function(word1, word2) {
    if(word1.length !== word2.length){
        return false;
    }

    let map1 = {};
    for(let i=0; i<word1.length; i++){
        map1[word1[i]] = (map1[word1[i]]) ? map1[word1[i]]+1 : 1;
    }

    let map2 = {};
    for(let i=0; i<word2.length; i++){
        map2[word2[i]] = (map2[word2[i]]) ? map2[word2[i]]+1 : 1;
    }

    if(Object.keys(map1).length !== Object.keys(map2).length) {
        return false;
    }

    for(let i=0; i<word2.length; i++){
        if(!map1[word2[i]]){
            return false;
        }
    }

    let val1= Object.values(map1).sort((a,b) => a-b);
    let val2= Object.values(map2).sort((a,b) => a-b);

    for(let i=0; i<val1.length; i++){
        if(val1[i] !== val2[i]){
            return false
        }
    }
    return true;
};

/**
 * Refined code
 */

var closeStrings = function(word1, word2) {
    if(word1.length!==word2.length)return false
    if (word1 == word2) return true
    let ar1=Array(26).fill(0)
    let ar2=Array(26).fill(0)
    for(i=0;i<word1.length;i++)
    {
       ar1[word1.charCodeAt(i) - 97]++
       ar2[word2.charCodeAt(i) - 97]++
    }
  for(let i=0;i<ar1.length;i++){
      if((ar1[i]==0 && ar2[i]>0) ||  (ar1[i]>0 && ar2[i]==0))return false
  }
  return  ar1.sort().join("") === ar2.sort().join("")
};