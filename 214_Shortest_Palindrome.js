/**
 * 214. Shortest Palindrome
 * Difficulty: Hard
 * 
 * You are given a string s. You can convert s to a 
palindrome
 by adding characters in front of it.

Return the shortest palindrome you can find by performing this transformation.

 

Example 1:

Input: s = "aacecaaa"
Output: "aaacecaaa"
Example 2:

Input: s = "abcd"
Output: "dcbabcd"
 

Constraints:

0 <= s.length <= 5 * 104
s consists of lowercase English letters only.
 */

/**
 *  Intuition:
The goal is to make the given string s a palindrome by adding the fewest characters to the front. To do this efficiently, we should find the largest part of s that is already a palindrome starting from the beginning, then just append the necessary characters to the front from the remaining part of s.

By reversing the string, we can check how much of the reversed string matches the original, helping us identify the minimum characters needed.

🔍 Approach:
KMP Algorithm to the Rescue:
We use the Knuth-Morris-Pratt (KMP) algorithm, which helps us find the longest prefix of the string that matches the suffix of its reverse. This is key to minimizing the characters we need to add.

Reversing the String:
First, reverse the string and concatenate it with the original using a special separator (#). The idea is to check the overlap between the string and its reverse.

Prefix Array (Pi Array):
The KMP algorithm constructs a prefix array (pi array) that tells us the length of the longest prefix in the original string that matches the start of the reversed string. This gives us the part of the original string that doesn't need extra characters.

Final Step:
Using the information from the pi array, we append the minimal necessary characters in front of the original string to make it a palindrome.

⏳ Time and Space Complexity:
Time Complexity: O(n)
The KMP algorithm runs in linear time, where n is the length of the string. Both the construction of the pi array and the final string manipulation take linear time.

Space Complexity: O(n)
We use extra space for the pi array and the concatenated string, so the space complexity is also linear.
 */


var shortestPalindrome = function (s) {
    let count = kmp(s.split('').reverse().join(''), s);
    return s.slice(count).split('').reverse().join('') + s;
};

var kmp = function (txt, patt) {
    let newString = patt + '#' + txt;
    let pi = new Array(newString.length).fill(0);
    let i = 1, k = 0;
    while (i < newString.length) {
        if (newString[i] === newString[k]) {
            k++;
            pi[i] = k;
            i++;
        } else {
            if (k > 0) {
                k = pi[k - 1];
            } else {
                pi[i] = 0;
                i++;
            }
        }
    }
    return pi[newString.length - 1];
};