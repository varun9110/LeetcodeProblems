/**
 * 1869. Longer Contiguous Segments of Ones than Zeros
 * Difficulty: Easy
 * Given a binary string s, return true if the longest contiguous segment of 1's is strictly longer than the longest contiguous segment of 0's in s, or return 
 * false otherwise.
For example, in s = "110100010" the longest continuous segment of 1s has length 2, and the longest continuous segment of 0s has length 3.
Note that if there are no 0's, then the longest continuous segment of 0's is considered to have a length 0. The same applies if there is no 1's.
Example 1:
Input: s = "1101"
Output: true
Explanation:
The longest contiguous segment of 1s has length 2: "1101"
The longest contiguous segment of 0s has length 1: "1101"
The segment of 1s is longer, so return true.
Example 2:
Input: s = "111000"
Output: false
Explanation:
The longest contiguous segment of 1s has length 3: "111000"
The longest contiguous segment of 0s has length 3: "111000"
The segment of 1s is not longer, so return false.
Example 3:
Input: s = "110100010"
Output: false
Explanation:
The longest contiguous segment of 1s has length 2: "110100010"
The longest contiguous segment of 0s has length 3: "110100010"
The segment of 1s is not longer, so return false.

Constraints:
1 <= s.length <= 100
s[i] is either '0' or '1'.
*/

/**
 * Approach:
 * create counters to count the 1s and 0s. and the longest 1 and 0.
 * Now for loop to iterate through all the characters and keep checking if the char is 1 or 0. if 1 then do counter for 0 to 0 and increase the 1 counter.
 * vice versa for 0.
 * Now, at the end check if the counter is longer or the max1 or max0.
 */

var checkZeroOnes = function (s) {
  let max1 = 0;
  let max0 = 0;
  let count1 = 0;
  let count0 = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "1") {
      count0 = 0;
      count1++;
    } else {
      count1 = 0;
      count0++;
    }
    max0 = Math.max(max0, count0);
    max1 = Math.max(max1, count1);
  }
  if (max1 > max0) {
    return true;
  }
  return false;
};
