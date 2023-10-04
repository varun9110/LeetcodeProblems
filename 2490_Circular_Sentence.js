/**
 * 2490. Circular Sentence
 * Difficulty: Easy
 * 
 * A sentence is a list of words that are separated by a single space with no leading or trailing spaces.
For example, "Hello World", "HELLO", "hello world hello world" are all sentences.
Words consist of only uppercase and lowercase English letters. Uppercase and lowercase English letters are considered different.
A sentence is circular if:
The last character of a word is equal to the first character of the next word.
The last character of the last word is equal to the first character of the first word.
For example, "leetcode exercises sound delightful", "eetcode", "leetcode eats soul" are all circular sentences. However, "Leetcode is cool", 
"happy Leetcode", "Leetcode" and "I like Leetcode" are not circular sentences.
Given a string sentence, return true if it is circular. Otherwise, return false.

Example 1:
Input: sentence = "leetcode exercises sound delightful"
Output: true
Explanation: The words in sentence are ["leetcode", "exercises", "sound", "delightful"].
- leetcode's last character is equal to exercises's first character.
- exercises's last character is equal to sound's first character.
- sound's last character is equal to delightful's first character.
- delightful's last character is equal to leetcode's first character.
The sentence is circular.
Example 2:
Input: sentence = "eetcode"
Output: true
Explanation: The words in sentence are ["eetcode"].
- eetcode's last character is equal to eetcode's first character.
The sentence is circular.
Example 3:
Input: sentence = "Leetcode is cool"
Output: false
Explanation: The words in sentence are ["Leetcode", "is", "cool"].
- Leetcode's last character is not equal to is's first character.
The sentence is not circular.
Constraints:
1 <= sentence.length <= 500
sentence consist of only lowercase and uppercase English letters and spaces.
The words in sentence are separated by a single space.
There are no leading or trailing spaces.
 */

var isCircularSentence = function(sentence) {
    let arr = sentence.split(" ");
    let last = arr.length-1;
    if(arr[0][0] !== arr[last][arr[last].length-1]){
        return false
    }
    for(let i=0; i<last; i++){
        let current = arr[i];
        let next  = arr[i+1];
        if(current[current.length-1] !== next[0]){
            return false
        }
    }

    return true;
};

/**
 * Same approach lettle refined code
 */

var isCircularSentence = function(sentence) {
    const words = sentence.split(' ');
    const lastWord = words[words.length - 1];
    let lastChar = lastWord[lastWord.length - 1];
    
    for (const word of words) {
        if (word[0] !== lastChar) {
            return false;
        }
        lastChar = word[word.length - 1];
    }
    
    return true;
};