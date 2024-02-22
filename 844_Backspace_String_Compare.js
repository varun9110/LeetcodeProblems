/**
 * 844. Backspace String Compare
 * Difficulty: Easy
 * 
 * Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.
Note that after backspacing an empty text, the text will continue empty.

Example 1:

Input: s = "ab#c", t = "ad#c"
Output: true
Explanation: Both s and t become "ac".
Example 2:

Input: s = "ab##", t = "c#d#"
Output: true
Explanation: Both s and t become "".
Example 3:

Input: s = "a#c", t = "b"
Output: false
Explanation: s becomes "c" while t becomes "b".
 

Constraints:

1 <= s.length, t.length <= 200
s and t only contain lowercase letters and '#' characters.
 

Follow up: Can you solve it in O(n) time and O(1) space?
 */

/**
 * Approach 1: Two Pointers
Processing the String: To emulate the "typing" and "erasing" action, we navigate through each string with two pointers. 
The main pointer (i) traverses each character, while the auxiliary pointer (k for s and p for t) indicates the effective position 
of the last character post backspaces.

If the character at the main pointer isn't #, it's "typed" at the location of the auxiliary pointer, which is then incremented.
If the character is #, the preceding character is "erased" by decrementing the auxiliary pointer.
The concluding value of the auxiliary pointer after processing gives the effective string length after considering backspaces.
Comparing the Strings: After processing, the effective lengths (final values of k and p) are compared. A difference in lengths directly implies the strings aren't equal. If the lengths align, a character-by-character comparison is performed up to their effective lengths.

Pros
This approach is space efficient since it uses a constant amount of space.
Directly manipulates the input strings without creating new ones.
Cons
Might be a bit harder to conceptualize for someone unfamiliar with the two-pointer technique.
 */


var backspaceCompare = function(s, t) {
    let sChars = s.split('');
    let tChars = t.split('');
    
    let k = processString(sChars);
    let p = processString(tChars);

    if (k !== p) return false;

    for (let i = 0; i < k; i++) {
        if (sChars[i] !== tChars[i]) return false;
    }

    return true;
};

function processString(chars) {
    let k = 0;
    for (let c of chars) {
        if (c !== '#') {
            chars[k++] = c;
        } else if (k > 0) {
            k--;
        }
    }
    return k;
};