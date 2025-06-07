/**
 * 3170. Lexicographically Minimum String After Removing Stars
 * Difficulty: Medium
 * 
 * You are given a string s. It may contain any number of '*' characters. Your task is to remove all '*' characters.

While there is a '*', do the following operation:
Delete the leftmost '*' and the smallest non-'*' character to its left. If there are several smallest characters, you can delete any of them.
Return the lexicographically smallest resulting string after removing all '*' characters.

Example 1:

Input: s = "aaba*"
Output: "aab"
Explanation:
We should delete one of the 'a' characters with '*'. If we choose s[3], s becomes the lexicographically smallest.

Example 2:
Input: s = "abc"
Output: "abc"
Explanation:

There is no '*' in the string.
Constraints:

1 <= s.length <= 105
s consists only of lowercase English letters and '*'.
The input is generated such that it is possible to delete all '*' characters.
 */

/**
 * Intuition
Very clear intuition is do what it asks for. You will get accepted.

Approach
Firstly you need to keep track of the smallest character with largest index till the current 'star'. This can be easily done using map data structure, create a map of char and vector in which put indexes of the current character at the back so the closest one is the last element of the vector of that char. Because we are using map data structure so it automatically sorts the characters in it. So just by accessing the first characters last index does the work. Now mark the indexes of 'star' and the characters index.
Now iterate through the string and create your answer by not taking the indexes you marked.

Complexity
Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {string} s
 * @return {string}
 */
var clearStars = function(s) {
    const mp = new Map();
        const n = s.length;
        const v = new Array(n).fill(0);

        for (let i = 0; i < n; i++) {
            if (s[i] !== '*') {
                if (!mp.has(s[i])) {
                    mp.set(s[i], []);
                }
                mp.get(s[i]).push(i);
            } else {
                v[i] = 1;
                const sortedEntries = Array.from(mp.entries()).sort((a, b) => a[0].localeCompare(b[0]));
                for (let [key, indices] of sortedEntries) {
                    const m = indices.length;
                    v[indices[m - 1]] = 1;
                    indices.pop();
                    if (indices.length === 0) {
                        mp.delete(key);
                    }
                    break;
                }
            }
        }

        let ans = "";
        for (let i = 0; i < n; i++) {
            if (v[i] !== 1) {
                ans += s[i];
            }
        }
        return ans;
};