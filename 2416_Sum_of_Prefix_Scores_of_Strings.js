/**
 * 2416. Sum of Prefix Scores of Strings
 * Difficulty: Hard
 * You are given an array words of size n consisting of non-empty strings.

We define the score of a string term as the number of strings words[i] such that term is a prefix of words[i].

For example, if words = ["a", "ab", "abc", "cab"], then the score of "ab" is 2, since "ab" is a prefix of both "ab" and "abc".
Return an array answer of size n where answer[i] is the sum of scores of every non-empty prefix of words[i].

Note that a string is considered as a prefix of itself.

Example 1:
Input: words = ["abc","ab","bc","b"]
Output: [5,4,3,2]
Explanation: The answer for each string is the following:
- "abc" has 3 prefixes: "a", "ab", and "abc".
- There are 2 strings with the prefix "a", 2 strings with the prefix "ab", and 1 string with the prefix "abc".
The total is answer[0] = 2 + 2 + 1 = 5.
- "ab" has 2 prefixes: "a" and "ab".
- There are 2 strings with the prefix "a", and 2 strings with the prefix "ab".
The total is answer[1] = 2 + 2 = 4.
- "bc" has 2 prefixes: "b" and "bc".
- There are 2 strings with the prefix "b", and 1 string with the prefix "bc".
The total is answer[2] = 2 + 1 = 3.
- "b" has 1 prefix: "b".
- There are 2 strings with the prefix "b".
The total is answer[3] = 2.
Example 2:
Input: words = ["abcd"]
Output: [4]
Explanation:
"abcd" has 4 prefixes: "a", "ab", "abc", and "abcd".
Each prefix has a score of one, so the total is answer[0] = 1 + 1 + 1 + 1 = 4.

Constraints:
1 <= words.length <= 1000
1 <= words[i].length <= 1000
words[i] consists of lowercase English letters.
 */

/**
 * Intuition
The problem asks us to find the sum of scores for each string's prefixes in the list. A brute-force approach would require 
generating all prefixes and counting their occurrences, but this would be inefficient. Instead, we can optimize this by using a Trie (Prefix Tree). 
By inserting each word into the Trie, we can track how many words share a common prefix and efficiently compute the required prefix sums.

Approach
Trie Construction: We will insert each word into a Trie, where each node represents a character. As we insert each character, 
we will count how many times it has been visited.
Prefix Calculation: Once the Trie is constructed, for each word, we traverse its characters and sum the counts stored at the corresponding nodes, 
which represent how many words share that prefix.
Result Storage: For each word, we store the cumulative sum of scores for its prefixes in the result array.
Complexity
Time complexity:
O(n⋅m), where (n) is the number of words and (m) is the average length of the words.
We insert each character of each word into the Trie, and then traverse the Trie again to calculate prefix scores.

Space complexity:
O(n⋅m), where (n) is the number of words and (m) is the average length of the words.
The Trie stores all characters of the words and their corresponding prefix counts.


 */

// Definition of the TrieNode class, which represents a node in the Trie.
class TrieNode {
    constructor() {
        // 'children' stores the next character nodes in the Trie.
        // It is an object (hashmap) where each key is a character and the value is another TrieNode.
        this.children = {};
        // 'count' keeps track of how many times this node has been visited during insertions.
        this.count = 0;
    }
}

// Definition of the Trie class, which encapsulates the root node and Trie operations.
class Trie {
    constructor() {
        // Initialize the root node of the Trie as an empty TrieNode.
        this.root = new TrieNode();
    }

    // Method to insert a word into the Trie.
    insert(word) {
        // Start traversing from the root of the Trie.
        let node = this.root;

        // Traverse each character in the word.
        for (let ch of word) {
            // If the current character is not already a child of the current node, create a new TrieNode.
            if (!node.children[ch]) {
                node.children[ch] = new TrieNode();
            }
            // Move to the next node (child node corresponding to the current character).
            node = node.children[ch];
            // Increment the count for this node, as this prefix (or part of it) has been inserted.
            node.count++;
        }
    }

    // Method to get the sum of scores for all prefixes of the given word.
    getPrefixScoreSum(word) {
        // Start from the root node of the Trie.
        let node = this.root;
        // Variable to accumulate the score (sum of counts for each prefix).
        let scoreSum = 0;

        // Traverse each character in the word to compute the prefix scores.
        for (let ch of word) {
            // Move to the next node corresponding to the current character.
            node = node.children[ch];
            // Add the count of this node to the score sum (count represents how many times this prefix was seen).
            scoreSum += node.count;
        }

        // Return the accumulated score sum.
        return scoreSum;
    }
}

/**
 * Function to compute the sum of prefix scores for an array of words.
 * 
 * @param {string[]} words - The list of words for which we want to calculate prefix scores.
 * @return {number[]} - An array of numbers where each element corresponds to the sum of prefix scores for a word.
 */
var sumPrefixScores = function (words) {
    // Create a new Trie.
    const trie = new Trie();

    // Insert each word from the input array into the Trie.
    for (let word of words) {
        trie.insert(word);
    }

    // Create an array to store the results (sum of prefix scores for each word).
    const result = [];

    // For each word in the input array, calculate the sum of prefix scores.
    for (let word of words) {
        result.push(trie.getPrefixScoreSum(word)); // Get the prefix score sum and store it in the result array.
    }

    // Return the result array containing the sum of prefix scores for each word.
    return result;
};