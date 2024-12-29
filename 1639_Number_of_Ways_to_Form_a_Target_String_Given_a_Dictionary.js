/**
 * 1639. Number of Ways to Form a Target String Given a Dictionary
 * Difficulty: Hard
 * 
 * You are given a list of strings of the same length words and a string target.

Your task is to form target using the given words under the following rules:

target should be formed from left to right.
To form the ith character (0-indexed) of target, you can choose the kth character of the jth string in words if target[i] = words[j][k].
Once you use the kth character of the jth string of words, you can no longer use the xth character of any string in words where x <= k. 
In other words, all characters to the left of or at index k become unusuable for every string.
Repeat the process until you form the string target.
Notice that you can use multiple characters from the same string in words provided the conditions above are met.

Return the number of ways to form target from words. Since the answer may be too large, return it modulo 109 + 7.

 

Example 1:

Input: words = ["acca","bbbb","caca"], target = "aba"
Output: 6
Explanation: There are 6 ways to form target.
"aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("caca")
"aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("caca")
"aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("acca")
"aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("acca")
"aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("acca")
"aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("caca")
Example 2:

Input: words = ["abba","baab"], target = "bab"
Output: 4
Explanation: There are 4 ways to form target.
"bab" -> index 0 ("baab"), index 1 ("baab"), index 2 ("abba")
"bab" -> index 0 ("baab"), index 1 ("baab"), index 3 ("baab")
"bab" -> index 0 ("baab"), index 2 ("baab"), index 3 ("baab")
"bab" -> index 1 ("abba"), index 2 ("baab"), index 3 ("baab")
 

Constraints:

1 <= words.length <= 1000
1 <= words[i].length <= 1000
All strings in words have the same length.
1 <= target.length <= 1000
words[i] and target contain only lowercase English letters.
 */

/**
 * Intuition
minIndex: the minimum of index of word that can be chosen to form the target string

From beginning to end of the target string, for each character, find its position in words that greater than minIndex and update minIndex

Approach
I had to do this problem many times to pass all the test cases! This is my thinking process to solve the problem. You can skip this and go directly 
to the Final Code part to see the solution code.

First, I wrote a function that has 3 parameters targetIndex, minIndex, wordsIndex (wordsIndex is the position of current word in words array). 
With each wordsIndex and targetIndex, we have 2 options:

Don't use words[wordsIndex] to form the target[targetIndex]
Use if it includes target[targetIndex] and its index >= minIndex
Complexity
Time complexity: O(N∗M∗W)
N: target length
M: words length
W: word length
Space complexity: O(1)
 */

/**
 * @param {string[]} words
 * @param {string} target
 * @return {number}
 */
var numWays = function(words, target) {
    const MOD = 1e9 + 7;
    const m = target.length;
    const n = words[0].length;

    const dp = new Array(m + 1).fill(0);
    dp[0] = 1;

    const count = Array.from({ length: n }, () => Array(26).fill(0));
    
    for (const word of words) {
        for (let i = 0; i < n; i++) {
            count[i][word.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        }
    }
    
    for (let i = 0; i < n; i++) {
        for (let j = m - 1; j >= 0; j--) {
            dp[j + 1] = (dp[j + 1] + dp[j] * count[i][target.charCodeAt(j) - 'a'.charCodeAt(0)]) % MOD;
        }
    }
    
    return dp[m];
};