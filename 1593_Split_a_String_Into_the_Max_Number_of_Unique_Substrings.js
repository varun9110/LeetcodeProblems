/**
 * 1593. Split a String Into the Max Number of Unique Substrings
 * Difficulty:  Medium
 * Given a string s, return the maximum number of unique substrings that the given string can be split into.

You can split string s into any list of non-empty substrings, where the concatenation of the substrings forms the original string. 
However, you must split the substrings such that all of them are unique.

A substring is a contiguous sequence of characters within a string.


Example 1:
Input: s = "ababccc"
Output: 5
Explanation: One way to split maximally is ['a', 'b', 'ab', 'c', 'cc']. Splitting like ['a', 'b', 'a', 'b', 'c', 'cc'] is not valid as you have 'a' and 'b' multiple times.
Example 2:
Input: s = "aba"
Output: 2
Explanation: One way to split maximally is ['a', 'ba'].
Example 3:
Input: s = "aa"
Output: 1
Explanation: It is impossible to split the string any further.

Constraints:

1 <= s.length <= 16

s contains only lower case English letters.
 */

/**
 * Initialization:
seen: A set to store the unique substrings encountered during the process.

max_count: A list with one element (initially set to 0) to store the maximum number of unique substrings found (using a list for mutability).

Calling Backtrack: Start the process by calling the backtrack function with initial parameters: the string s, starting index 0, the seen set, 
current count 0, and the max_count list.

Backtrack Function:

Pruning: Check if the sum of the current count and the remaining characters can't exceed the maximum count found so far. If so, return early to avoid unnecessary work.

Base Case: If the start index reaches the end of the string, update max_count if the current count is higher than the recorded maximum.

Exploring Substrings: Iterate over possible substring ending positions from start + 1 to len(s) + 1:

Extract the substring s[start:end].

If the substring is not in the seen set (meaning it's unique):

Add it to the seen set.

Recursively call backtrack with updated parameters: new start index end, updated seen set, incremented count, and max_count.

Remove the substring from the seen set after backtracking to allow for other combinations.

Return Result: The maxUniqueSplit function returns the maximum count of unique substrings found, stored in max_count[0].

 */

  // JavaScript

function maxUniqueSplit(s) {
  // Initialize the result to 1 (minimum possible split)
  let res = 1;
  // Create a Set to store unique substrings
  let strings = new Set();

  // Define a recursive search function
  function search(s) {
    // If the current string is not in the Set
    if (!strings.has(s)) {
      // Add it to the Set
      strings.add(s);
      // Update the result with the maximum of current result and Set size
      res = Math.max(res, strings.size);
      // Remove the string from the Set (backtracking)
      strings.delete(s);
    }

    // Iterate through all possible split positions
    for (let i = 1; i < s.length; i++) {
      // Get the substring from start to current position
      const sub = s.substring(0, i);
      // If this substring is already in the Set, skip this iteration
      if (strings.has(sub)) continue;
      // Add the substring to the Set
      strings.add(sub);
      // Recursively search the remaining part of the string
      search(s.substring(i));
      // Remove the substring from the Set (backtracking)
      strings.delete(sub);
    }
  }

  // Start the search with the entire input string
  search(s);
  // Return the maximum number of unique substrings found
  return res;
}