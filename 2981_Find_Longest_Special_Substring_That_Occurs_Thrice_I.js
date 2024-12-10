/**
 * 2981. Find Longest Special Substring That Occurs Thrice I
 * Difficulty: Medium
 * 
 * You are given a string s that consists of lowercase English letters.

A string is called special if it is made up of only a single character. For example, the string "abc" is not special, whereas the strings "ddd", "zz", and "f" are special.

Return the length of the longest special substring of s which occurs at least thrice, or -1 if no special substring occurs at least thrice.

A substring is a contiguous non-empty sequence of characters within a string.

 

Example 1:

Input: s = "aaaa"
Output: 2
Explanation: The longest special substring which occurs thrice is "aa": substrings "aaaa", "aaaa", and "aaaa".
It can be shown that the maximum length achievable is 2.
Example 2:

Input: s = "abcdef"
Output: -1
Explanation: There exists no special substring which occurs at least thrice. Hence return -1.
Example 3:

Input: s = "abcaba"
Output: 1
Explanation: The longest special substring which occurs thrice is "a": substrings "abcaba", "abcaba", and "abcaba".
It can be shown that the maximum length achievable is 1.
 

Constraints:

3 <= s.length <= 50
s consists of only lowercase English letters.
 */


/**
 * Intuition
We are tasked with finding the maximum length ( x ) of a special substring that occurs at least three times in the given string s.
A special substring contains only one unique character (e.g., "aaa", "bbbb").
The solution uses binary search combined with sliding window validation for efficiency.

🧠 Approach
🔍 1. Binary Search
The goal is to identify the largest ( x ) such that a special substring of length ( x ) exists at least three times.
Why binary search?
Binary search is effective because the problem exhibits monotonic behavior:
If ( x ) is valid (i.e., there exists a special substring of length ( x )), then all smaller lengths ( < x ) are also valid.
Conversely, if ( x ) is invalid, then all larger lengths ( > x ) are also invalid.
We search in the range ( [1, n] ), where ( n ) is the length of the string:
Start with ( l = 1 ) (minimum substring length).
End with ( r = n ) (maximum substring length).
🔧 2. Validation (Helper Function)
To check if a given ( x ) is valid:

Use a sliding window of size ( x ) to iterate over all substrings.
For each window:
Ensure that all characters in the substring are identical.
Count the number of occurrences of this substring in the string.
If any substring appears at least three times, ( x ) is valid.
The sliding window approach ensures efficient computation in ( O(n) ) for each validation.

🔄 3. Iterative Binary Search
Perform binary search to find the largest valid ( x ):
Compute the midpoint:
[mid = l + r/2]

Use the helper function to validate ( \text{mid} ):

If mid is valid, move the lower bound up l = mid .
If mid is invalid, move the upper bound down r =mid.
Repeat until ( l + 1 < r ).

After the search:
If ( l ) is valid, return ( l ) as the result.
Otherwise, return -1.
🛑 Edge Cases
If the string contains no repeating characters, return -1.
For single-character strings, ( x ) can equal the entire string length.
📊 Complexity
⏱ Time Complexity
Binary Search: ( O(log n) ) iterations for ( n ) length of the string.
Sliding Window Validation: Each check runs in ( O(n) ).
Total: ( O(nlog n) ).
💾 Space Complexity
A frequency array or sliding window uses ( O(1) ) space.
 */


/**
 * @param {string} s
 * @return {number}
 */
var maximumLength = function(s) {
    let n = s.length;
    let l = 1, r = n;

    if (!helper(s, n, l)) return -1;

    while (l + 1 < r) {
        let mid = Math.floor((l + r) / 2);
        if (helper(s, n, mid)) l = mid;
        else r = mid;
    }

    return l;
};

/**
 * @param {string} s
 * @param {number} n
 * @param {number} x
 * @return {boolean}
 */
function helper(s, n, x) {
    let cnt = new Array(26).fill(0);
    let p = 0;

    for (let i = 0; i < n; i++) {
        while (s[p] !== s[i]) p++;
        if (i - p + 1 >= x) cnt[s[i].charCodeAt(0) - 'a'.charCodeAt(0)]++;
        if (cnt[s[i].charCodeAt(0) - 'a'.charCodeAt(0)] > 2) return true;
    }

    return false;
}