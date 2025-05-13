/**
 * 3335. Total Characters in String After Transformations I
 * Difficulty: Medium
 * 
 * You are given a string s and an integer t, representing the number of transformations to perform. In one transformation, every character in s is replaced according to the following rules:

If the character is 'z', replace it with the string "ab".
Otherwise, replace it with the next character in the alphabet. For example, 'a' is replaced with 'b', 'b' is replaced with 'c', and so on.
Return the length of the resulting string after exactly t transformations.

Since the answer may be very large, return it modulo 109 + 7.

 

Example 1:

Input: s = "abcyy", t = 2

Output: 7

Explanation:

First Transformation (t = 1):
'a' becomes 'b'
'b' becomes 'c'
'c' becomes 'd'
'y' becomes 'z'
'y' becomes 'z'
String after the first transformation: "bcdzz"
Second Transformation (t = 2):
'b' becomes 'c'
'c' becomes 'd'
'd' becomes 'e'
'z' becomes "ab"
'z' becomes "ab"
String after the second transformation: "cdeabab"
Final Length of the string: The string is "cdeabab", which has 7 characters.
Example 2:

Input: s = "azbk", t = 1

Output: 5

Explanation:

First Transformation (t = 1):
'a' becomes 'b'
'z' becomes "ab"
'b' becomes 'c'
'k' becomes 'l'
String after the first transformation: "babcl"
Final Length of the string: The string is "babcl", which has 5 characters.
 

Constraints:

1 <= s.length <= 105
s consists only of lowercase English letters.
1 <= t <= 105
 */


/**
 * Intuition
Approach
The approach counts character frequencies and updates them for t transformations to calculate the final length without creating a large string, making it more efficient than brute force.

Complexity
Time complexity:

0(T*26)

Space complexity:
O(26)
 */


/**
 * @param {string} s
 * @param {number} t
 * @return {number}
 */
var lengthAfterTransformations = function (s, t) {
    const MOD = 1e9 + 7;
    const cnt = new Array(26).fill(0);

    for (const c of s) {
        cnt[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    for (let j = 0; j < t; j++) {
        const tmp = new Array(26).fill(0);
        for (let i = 0; i < 26; i++) {
            if (i === 25) {
                tmp[0] = (tmp[0] + cnt[i]) % MOD;
                tmp[1] = (tmp[1] + cnt[i]) % MOD;
            } else {
                tmp[i + 1] = (tmp[i + 1] + cnt[i]) % MOD;
            }
        }
        cnt.splice(0, 26, ...tmp); // Update cnt with tmp values
    }

    return cnt.reduce((len, c) => (len + c) % MOD, 0);
};