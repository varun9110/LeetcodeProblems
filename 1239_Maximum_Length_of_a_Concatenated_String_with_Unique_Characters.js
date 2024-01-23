/**
 * 1239. Maximum Length of a Concatenated String with Unique Characters
 * Difficulty: Medium
 * 
 * You are given an array of strings arr. A string s is formed by the concatenation of a subsequence of arr that has unique characters.
Return the maximum possible length of s.
A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

Example 1:

Input: arr = ["un","iq","ue"]
Output: 4
Explanation: All the valid concatenations are:
- ""
- "un"
- "iq"
- "ue"
- "uniq" ("un" + "iq")
- "ique" ("iq" + "ue")
Maximum length is 4.

Example 2:
Input: arr = ["cha","r","act","ers"]
Output: 6
Explanation: Possible longest valid concatenations are "chaers" ("cha" + "ers") and "acters" ("act" + "ers").

Example 3:
Input: arr = ["abcdefghijklmnopqrstuvwxyz"]
Output: 26
Explanation: The only string in arr has all 26 characters.

Constraints:
1 <= arr.length <= 16
1 <= arr[i].length <= 26
arr[i] contains only lowercase English letters.
 */

/**
 * DFS Approach
Intuition:
The idea is to use Depth-First Search (DFS) to explore all possible combinations of strings in the array.
At each step, we concatenate a string to the existing path and check for uniqueness.
We keep track of the maximum length of valid subsequences during the DFS traversal.
Approach:
Initialize the result variable to 0.
Define a DFS function that takes the array, current path, and current index as parameters.
In the DFS function:
a. Check if the current path has unique characters using a helper function isUniqueChars.
b. If the path is unique, update the result with the maximum length.
c. If the current index is equal to the array size or the path is not unique, return.
d. Iterate through the array starting from the current index and make recursive calls to the DFS function.
Call the DFS function with the initial parameters.
Complexity Analysis:
Time Complexity: Exponential, O(2^M), where M is the maximum length of a string in the array. The DFS explores all possible combinations.
Space Complexity: O(M), where M is the maximum length of a string. The space is used for the recursive call stack.
 */


var maxLength = function(arr) {
    let result = [0];
    dfs(arr, "", 0, result);
    return result[0];
};

function dfs(arr, path, idx, result) {
    if (isUniqueChars(path)) {
        result[0] = Math.max(result[0], path.length);
    }

    if (idx === arr.length || !isUniqueChars(path)) {
        return;
    }

    for (let i = idx; i < arr.length; i++) {
        dfs(arr, path + arr[i], i + 1, result);
    }
}

function isUniqueChars(s) {
    let charSet = new Set();
    for (let c of s) {
        if (charSet.has(c)) {
            return false;
        }
        charSet.add(c);
    }
    return true;
}