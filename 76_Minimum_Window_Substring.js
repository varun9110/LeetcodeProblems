/**
 * 76. Minimum Window Substring
 * Difficulty: Hard
 * 
 * Given two strings s and t of lengths m and n respectively, return the minimum window 
substring
 of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
The testcases will be generated such that the answer is unique.

Example 1:
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:
Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:
Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
Constraints:
m == s.length
n == t.length
1 <= m, n <= 105
s and t consist of uppercase and lowercase English letters.
 

Follow up: Could you find an algorithm that runs in O(m + n) time?
 */

/**
 * Approaches
(Also explained in the code)

Problem Objective:

The goal is to find the minimum window in string s that contains all the characters in string t in any order.
Sliding Window Technique:

Utilizes the sliding window technique where two pointers (l and r) represent the left and right ends of the current window.
Counting Characters:

dictT is used to count the occurrences of characters in string t.
windowCounts keeps track of the characters within the current window.
Maintaining the Window:

Move the right pointer r to expand the window.
Check if the characters in the current window satisfy the required counts from t.
If satisfied, increment formed (count of characters satisfying the required counts).
Shrinking the Window:

Move the left pointer l to shrink the window.
Update the minimum window size (ans) if a smaller valid window is found.
Continue this process until a smaller valid window is not possible.
Repeat until the right pointer r reaches the end of the string.
 */

var minWindow = function (s, t) {
    if (!s || !t) {
        return "";
    }

    let dictT = new Map();
    for (let c of t) {
        dictT.set(c, (dictT.get(c) || 0) + 1);
    }

    let required = dictT.size;
    let l = 0, r = 0;
    let formed = 0;

    let windowCounts = new Map();
    let ans = [-1, 0, 0];

    while (r < s.length) {
        let c = s.charAt(r);
        windowCounts.set(c, (windowCounts.get(c) || 0) + 1);

        if (dictT.has(c) && windowCounts.get(c) === dictT.get(c)) {
            formed++;
        }

        while (l <= r && formed === required) {
            c = s.charAt(l);

            if (ans[0] === -1 || r - l + 1 < ans[0]) {
                ans[0] = r - l + 1;
                ans[1] = l;
                ans[2] = r;
            }

            windowCounts.set(c, windowCounts.get(c) - 1);
            if (dictT.has(c) && windowCounts.get(c) < dictT.get(c)) {
                formed--;
            }

            l++;
        }

        r++;
    }

    return ans[0] === -1 ? "" : s.substring(ans[1], ans[2] + 1);
};