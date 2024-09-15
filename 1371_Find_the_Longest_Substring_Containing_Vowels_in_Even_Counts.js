/**
 * 1371. Find the Longest Substring Containing Vowels in Even Counts
 * Difficulty: Medium
 * 
 * Given the string s, return the size of the longest substring containing each vowel an even number of times. That is, 'a', 'e', 'i', 'o', and 'u' 
 * must appear an even number of times.
Example 1:
Input: s = "eleetminicoworoep"
Output: 13
Explanation: The longest substring is "leetminicowor" which contains two each of the vowels: e, i and o and zero of the vowels: a and u.
Example 2:
Input: s = "leetcodeisgreat"
Output: 5
Explanation: The longest substring is "leetc" which contains two e's.
Example 3:
Input: s = "bcbcbc"
Output: 6
Explanation: In this case, the given string "bcbcbc" is the longest because all vowels: a, e, i, o and u appear zero times.

Constraints:
1 <= s.length <= 5 x 10^5
s contains only lowercase English letters.
 */


/**
 * Intuition ✨
The key idea to solve this problem is based on bitmasking. The problem asks for the longest substring where each vowel ('a', 'e', 'i', 'o', 'u') appears an even number of times. Instead of directly counting vowels, we track whether each vowel has appeared an odd or even number of times using bitwise operations.

Here's the approach:

Use a bitmask to represent the even/odd occurrence of vowels. Each vowel is assigned a bit, so the mask is a 5-bit number where each bit represents whether a vowel has appeared an odd number of times.
A bit value of 1 means the vowel has appeared an odd number of times, while a bit value of 0 means it has appeared an even number of times.
The task is to find the longest substring where all the vowels have appeared an even number of times.
Approach 🚀
Track Vowel Occurrences Using Bitmasking:

We initialize a bitmask (mask) with 5 bits, each corresponding to a vowel.
As we traverse the string, we update the bitmask based on the vowel we encounter. For instance, if we encounter an 'a', we flip the 0th bit; if it's 'e', we flip the 1st bit, and so on.
Map to Track Previous Occurrences:

We use a hash map (m) to store the first occurrence of each bitmask value.
If the current bitmask has been seen before, it means the substring between the previous occurrence and the current position contains an even number of each vowel, so we calculate the length of this substring.
Initial Condition:

We initialize the bitmask 0 in the map at index -1 because a bitmask of 0 means all vowels have appeared an even number of times. This helps when we find such a substring starting from the beginning.
Return the Maximum Length:

As we process the string, we keep track of the maximum length of the valid substrings where all vowels appear an even number of times.
Code Walkthrough 📝
Initialize Variables:

mask starts at 0, meaning all vowels have an even count initially.
maxLength tracks the maximum length of valid substrings.
The hash map (m) is initialized with m[0] = -1 to handle cases where the valid substring starts from index 0.
Iterate Through the String:

For each character, update the bitmask based on whether it is a vowel.
If the current bitmask has been seen before, calculate the length of the substring and update maxLength.
If not, store the current index for this bitmask.
Return the Result:

After processing the entire string, return the maximum length of the valid substring.
Time Complexity ⏳
O(n) where n is the length of the string. We traverse the string once, and all operations involving the bitmask and hash map are constant time.
Space Complexity 💾
O(1) for the bitmask and a small number of variables, but O(n) for the hash map storing previous bitmask states.
Summary 🎯
Time Complexity: O(n)
Space Complexity: O(n)
 */

var findTheLongestSubstring = function(s) {
    let n = s.length;
    let mask = 0;
    let maxLength = 0;
    let m = new Map();
    m.set(0, -1);
    
    for (let i = 0; i < n; i++) {
        if (s[i] === 'a') mask ^= (1 << 0);
        else if (s[i] === 'e') mask ^= (1 << 1);
        else if (s[i] === 'i') mask ^= (1 << 2);
        else if (s[i] === 'o') mask ^= (1 << 3);
        else if (s[i] === 'u') mask ^= (1 << 4);
        
        if (m.has(mask)) {
            maxLength = Math.max(maxLength, i - m.get(mask));
        } else {
            m.set(mask, i);
        }
    }
    
    return maxLength;
};