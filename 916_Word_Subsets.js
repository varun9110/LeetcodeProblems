/**
 * 916. Word Subsets
 * Difficulty: Medium
 * 
 * You are given two string arrays words1 and words2.

A string b is a subset of string a if every letter in b occurs in a including multiplicity.

For example, "wrr" is a subset of "warrior" but is not a subset of "world".
A string a from words1 is universal if for every string b in words2, b is a subset of a.

Return an array of all the universal strings in words1. You may return the answer in any order.

 

Example 1:

Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["e","o"]
Output: ["facebook","google","leetcode"]
Example 2:

Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["l","e"]
Output: ["apple","google","leetcode"]
 

Constraints:

1 <= words1.length, words2.length <= 104
1 <= words1[i].length, words2[i].length <= 10
words1[i] and words2[i] consist only of lowercase English letters.
All the strings of words1 are unique.
 */

/**
 * 🧠 Intuition
The problem revolves around determining which words in words1 meet the frequency requirements defined by the words in words2. A word in words1 is considered universal if it contains all the characters from each word in words2 with at least the same frequency.
For instance, if a word from words2 contains two es, then a valid word in words1 must contain at least two es. The main challenge is to efficiently compare all words in words1 against the frequency conditions set by words2.
Telegram

Key Insights:
🔄 Maximum Frequency Requirement: We need to figure out the maximum frequency required for each character across all words in words2. This ensures that we don't miss any critical character frequency.
🔍 Checking Each Word in words1: After determining the required frequencies, we can check each word in words1 to see if it satisfies the frequency requirements for all characters in words2.
🔍 Approach
Step 1: 🧮 Calculate Maximum Frequency of Characters in words2
To ensure that any word from words1 is universal, we first need to compute the maximum frequency of each character that must be present across all words in words2.
For example, if one word in words2 requires 2 occurrences of 'a', and another requires 1 occurrence of 'a', we set the required frequency of 'a' to 2.Because then all smaller 'a' requirment will be completed.

We initialize an array maxCharFreq[26] to store the maximum frequency for each letter in the alphabet.
For each word in words2, we calculate its character frequencies and update maxCharFreq for each letter based on the highest frequency found.
Example:
Given:

words2 = ["e", "o"]
We compute the frequencies for each word:

"e": Frequency of e = 1
"o": Frequency of o = 1
So, maxCharFreq will be updated to [0, 0, 0, 0, ..., 1 (e), ..., 1 (o), ..., 0].

Step 2: 📝 Check Each Word in words1
Once we have the maximum required frequencies for all characters, we move on to verifying each word in words1. For each word:

We compute the frequency of its characters.
We compare the computed frequency with the required frequency in maxCharFreq. If for any character the frequency in the word is less than the required frequency, 
the word is not universal.
If a word satisfies all the frequency conditions, we consider it universal and add it to the result.
Example:
Given:

words1 = ["amazon", "apple", "facebook", "google", "leetcode"]
maxCharFreq from the previous step is [0, 0, 0, ..., 1 (e), ..., 1 (o), ..., 0]
We check each word:

"amazon" does not contain e and o, so it is not universal ❌.
"apple" does not contain o, so it is not universal ❌.
"facebook", "google", and "leetcode" all contain at least 1 e and 1 o, so they are universal ✅.
📊 Time and Space Complexity
⏱️ Time Complexity
Step 1 - Building the Frequency Array for words2:
This step processes each word in words2 and counts character frequencies, resulting in a time complexity of O(m⋅k), where:
m is the number of words in words2
k is the average length of the words in words2
Step 2 - Checking Each Word in words1:
For each word in words1, we compute character frequencies and compare them with the required frequencies, resulting in a time complexity of O(n⋅k), where:
n is the number of words in words1
k is the average length of the words in words1
Total Time Complexity:
The total time complexity is:
O(n⋅k+m⋅k)
This accounts for both processing words1 and words2.
💾 Space Complexity
We use two arrays maxCharFreq[26] and tempCharFreq[26] to store character frequencies. Both have a fixed size of 26 (since we are working with the English alphabet), so the space complexity is O(1).
The space complexity for storing the result is proportional to the number of universal words, which in the worst case can be all words from words1. So the overall space complexity is O(n).
 */

/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {string[]}
 */
var wordSubsets = function(words1, words2) {
    const maxCharFreq = new Array(26).fill(0);
    
    for (const word of words2) {
        const tempCharFreq = new Array(26).fill(0);
        
        for (const char of word) {
            tempCharFreq[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        
        for (let i = 0; i < 26; i++) {
            maxCharFreq[i] = Math.max(maxCharFreq[i], tempCharFreq[i]);
        }
    }
    
    const result = [];
    
    for (const word of words1) {
        const tempCharFreq = new Array(26).fill(0);
        
        for (const char of word) {
            tempCharFreq[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        
        let isUniversal = true;
        
        for (let i = 0; i < 26; i++) {
            if (maxCharFreq[i] > tempCharFreq[i]) {
                isUniversal = false;
                break;
            }
        }
        
        if (isUniversal) {
            result.push(word);
        }
    }
    
    return result;
};