/**
 * 557. Reverse Words in a String III
 * Difficulty: Easy
 * 
 * Given a string s, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.

Example 1:

Input: s = "Let's take LeetCode contest"
Output: "s'teL ekat edoCteeL tsetnoc"
Example 2:

Input: s = "Mr Ding"
Output: "rM gniD"

Constraints:

1 <= s.length <= 5 * 104
s contains printable ASCII characters.
s does not contain any leading or trailing spaces.
There is at least one word in s.
All the words in s are separated by a single space.
 */

/**
 * Approach:
 * 1. s.split(): The input string s is first split into words using the default whitespace delimiter. This creates a list of words from the input string.
2. lambda word: word[::-1]: For each word in the list, a lambda function is applied to reverse the order of characters within the word. 
This is done using slicing with [::-1].
3. map(...): The map function applies the lambda function to each word in the list, effectively reversing the characters in each word.
4. ' '.join(...): Finally, the reversed words are joined back together into a single string, with spaces between them, using the ' '.join(...) method. 
This preserves the original whitespace and word order.

 */

var reverseWords = function(s) {
    const words = s.split(' '); 
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].split('').reverse().join('');
    }
    return words.join(' ');
};