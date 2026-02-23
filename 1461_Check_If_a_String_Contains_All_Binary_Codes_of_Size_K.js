/**
 * 1461. Check If a String Contains All Binary Codes of Size K
 * Difficulty: Medium
 * 
 * Given a binary string s and an integer k, return true if every binary code of length k is a substring of s. Otherwise, return false.
 * 
Example 1:
Input: s = "00110110", k = 2
Output: true
Explanation: The binary codes of length 2 are "00", "01", "10" and "11". They can be all found as substrings at indices 0, 1, 3 and 2 respectively.
Example 2:
Input: s = "0110", k = 1
Output: true
Explanation: The binary codes of length 1 are "0" and "1", it is clear that both exist as a substring. 
Example 3:
Input: s = "0110", k = 2
Output: false
Explanation: The binary code "00" is of length 2 and does not exist in the array.

Constraints:
1 <= s.length <= 5 * 105
s[i] is either '0' or '1'.
1 <= k <= 20
 */

/**
 * Building Intuition
Here's the question in plain English: does this binary string contain every possible k-digit binary combination as a substring?

For k = 2, there are exactly 4 possible codes: "00", "01", "10", "11"

My first instinct was to generate all possible codes and check each one. But that's backwards thinking.

The flip: Instead of checking if each code exists, just collect all k-length substrings we find and count them. If we found all 2^k unique combinations, we're done.

Example: s = "00110110", k = 2

Substrings: "00", "01", "11", "10", "01", "11", "10"
Unique ones: {"00", "01", "11", "10"} → 4 codes
Need: 2^2 = 4 codes
Match! Return true
Using a Set automatically handles duplicates for us. The whole algorithm becomes: scan all k-length windows, add to Set, check if Set size equals 2^k.

Simple. Elegant. Fast.

Approach
⏱️ 30 sec overview

Create an empty Set to collect unique k-length substrings
Slide a window of size k across the string
Add each k-length substring to the Set
Check: does Set.size === 2^k?
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
var hasAllCodes = function(s, k) {
    const set = new Set();
    
    for (let i = 0; i <= s.length - k; i++) {
        set.add(s.substring(i, i + k));
    }

    return set.size === Math.pow(2, k);
};