/**
 * 884. Uncommon Words from Two Sentences
 * Difficulty: Easy
 * 
 * A sentence is a string of single-space separated words where each word consists only of lowercase letters.

A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.

Given two sentences s1 and s2, return a list of all the uncommon words. You may return the answer in any order.

 

Example 1:

Input: s1 = "this apple is sweet", s2 = "this apple is sour"

Output: ["sweet","sour"]

Explanation:

The word "sweet" appears only in s1, while the word "sour" appears only in s2.

Example 2:

Input: s1 = "apple apple", s2 = "banana"

Output: ["banana"]

 

Constraints:

1 <= s1.length, s2.length <= 200
s1 and s2 consist of lowercase English letters and spaces.
s1 and s2 do not have leading or trailing spaces.
All the words in s1 and s2 are separated by a single space.
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function(s1, s2) {
    const s1Words = s1.split(" ");
    const s2Words = s2.split(" ")

    let s1Mapper = {};
    let s2Mapper = {};

    for(let i=0; i<s1Words.length; i++){
        s1Mapper[s1Words[i]] = s1Mapper[s1Words[i]] ? s1Mapper[s1Words[i]]+1 : 1
    }

    for(let i=0; i<s2Words.length; i++){
        s2Mapper[s2Words[i]] = s2Mapper[s2Words[i]] ? s2Mapper[s2Words[i]]+1 : 1
    }

    let uniqueWords = [];
    for(let i=0; i<s1Words.length; i++){
        if(s1Mapper[s1Words[i]] === 1 && s2Mapper[s1Words[i]] === undefined){
            uniqueWords.push(s1Words[i])
        }
    }

    for(let i=0; i<s2Words.length; i++){
        if(s2Mapper[s2Words[i]] === 1 && s1Mapper[s2Words[i]] === undefined){
            uniqueWords.push(s2Words[i])
        }
    }

    return uniqueWords

};


/**
 * Refined code.
 * Basically we need to check the occurence of each word, if it occurs just once in comibed strings then it satisfies the situation else not
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function(s1, s2) {
    let a = s1.split(' ')
    let b = s2.split(' ')
    let ref = new Map()
    for (let words of a) {
        if (!ref.has(words)) ref.set(words, 1) 
        else ref.set(words, ref.get(words)+1) 
    }
    for (let words of b) {
        if (!ref.has(words)) ref.set(words, 1) 
        else ref.set(words, ref.get(words)+1)
    }
    let ans =[]
    ref.forEach((value, key)=>{
        value===1 ? ans.push(key) : null
    })
    return ans
};