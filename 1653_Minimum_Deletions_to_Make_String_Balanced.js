/**
 * 1653. Minimum Deletions to Make String Balanced
 * Difficulty: Medium
 * 
 * You are given a string s consisting only of characters 'a' and 'b'​​​​.

You can delete any number of characters in s to make s balanced. s is balanced if there is no pair of indices (i,j) 
such that i < j and s[i] = 'b' and s[j]= 'a'.

Return the minimum number of deletions needed to make s balanced.

 

Example 1:

Input: s = "aababbab"
Output: 2
Explanation: You can either:
Delete the characters at 0-indexed positions 2 and 6 ("aababbab" -> "aaabbb"), or
Delete the characters at 0-indexed positions 3 and 6 ("aababbab" -> "aabbbb").
Example 2:

Input: s = "bbaaaaabb"
Output: 2
Explanation: The only solution is to delete the first two characters.
 

Constraints:

1 <= s.length <= 105
s[i] is 'a' or 'b'​​.
 */




var minimumDeletions = function (s) {
    let forwardAFrequency = 0;
    let forwardBFrequency = 0;
    let backwardAFrequency = 0;
    let backwardBFrequency = 0;
    const forwardFrequency = { a: [], b: [] };
    const backwardFrequency = { a: [], b: [] };
    for (let index = 0; index < s.length; index++) {
        if (s[index] === 'a') {
            forwardAFrequency += 1;
        } else {
            forwardBFrequency += 1;
        }
        forwardFrequency.a.push(forwardAFrequency);
        forwardFrequency.b.push(forwardBFrequency);
    }

    for (let index = s.length - 1; index >= 0; index--) {
        if (s[index] === 'a') {
            backwardAFrequency += 1;
        } else {
            backwardBFrequency += 1;
        }
        backwardFrequency.b.push(backwardBFrequency);
        backwardFrequency.a.push(backwardAFrequency);
    }
    backwardFrequency.b = backwardFrequency.b.reverse();
    backwardFrequency.a = backwardFrequency.a.reverse();

    let max = -Infinity;

    for (let index = 0; index < s.length; index++) {
        const tempMax = forwardFrequency.a[index] + backwardFrequency.b[index];
        if (max < tempMax) {
            max = tempMax;
        }
    }
    return s.length - max;
};