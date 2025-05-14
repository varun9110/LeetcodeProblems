/**
 * 3337. Total Characters in String After Transformations II
 * Difficulty: Hard
 * 
 * You are given a string s consisting of lowercase English letters, an integer t representing the number of transformations to perform, and an array nums of size 26. In one transformation, every character in s is 
 * replaced according to the following rules:

Replace s[i] with the next nums[s[i] - 'a'] consecutive characters in the alphabet. For example, if s[i] = 'a' and nums[0] = 3, the character 'a' transforms into the next 3 consecutive characters ahead of it, which results in "bcd".
The transformation wraps around the alphabet if it exceeds 'z'. For example, if s[i] = 'y' and nums[24] = 3, the character 'y' transforms into the next 3 consecutive characters ahead of it, which results in "zab".
Return the length of the resulting string after exactly t transformations.

Since the answer may be very large, return it modulo 109 + 7.

Example 1:
Input: s = "abcyy", t = 2, nums = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2]
Output: 7
Explanation:
First Transformation (t = 1):
'a' becomes 'b' as nums[0] == 1
'b' becomes 'c' as nums[1] == 1
'c' becomes 'd' as nums[2] == 1
'y' becomes 'z' as nums[24] == 1
'y' becomes 'z' as nums[24] == 1
String after the first transformation: "bcdzz"
Second Transformation (t = 2):

'b' becomes 'c' as nums[1] == 1
'c' becomes 'd' as nums[2] == 1
'd' becomes 'e' as nums[3] == 1
'z' becomes 'ab' as nums[25] == 2
'z' becomes 'ab' as nums[25] == 2
String after the second transformation: "cdeabab"
Final Length of the string: The string is "cdeabab", which has 7 characters.

Example 2:

Input: s = "azbk", t = 1, nums = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]

Output: 8

Explanation:

First Transformation (t = 1):

'a' becomes 'bc' as nums[0] == 2
'z' becomes 'ab' as nums[25] == 2
'b' becomes 'cd' as nums[1] == 2
'k' becomes 'lm' as nums[10] == 2
String after the first transformation: "bcabcdlm"
Final Length of the string: The string is "bcabcdlm", which has 8 characters.

 

Constraints:

1 <= s.length <= 105
s consists only of lowercase English letters.
1 <= t <= 109
nums.length == 26
1 <= nums[i] <= 25
 */

/**
 * Intuition
Represent transformations as 26×26 transition matrix exponentiated by t

Approach
Build base matrix B where B[i][j] is count of j from one transform of i
Compute B^t via binary exponentiation
Multiply initial count vector by B^t
Sum vector entries mod 1e9+7
Complexity
Time complexity: O(26^3 log t + n)

Space complexity: O(26^2 + n)
 */



/**
 * Matrix exp transform characters
 *
 * @intuition Represent transformations as 26×26 transition matrix exponentiated by t
 * @approach
 *  - Build base matrix B where B[i][j] is count of j from one transform of i
 *  - Compute B^t via binary exponentiation
 *  - Multiply initial count vector by B^t
 *  - Sum vector entries mod 1e9+7
 * @complexity
 *  time O(26^3 log t + n)
 *  space O(26^2 + n)
 *
 * @param {string} s input string
 * @param {number} t number of transformations
 * @param {number[]} nums mapping counts
 * @return {number} final string length mod 1e9+7
 */
const lengthAfterTransformations = (s, t, nums) => {
    const MOD = 1000000007n
    const ALPHA = 26
    const codeA = 'a'.charCodeAt(0)
  
    const initMatrix = () =>
      Array(ALPHA)
        .fill()
        .map(() => Array(ALPHA).fill(0n))
  
    const base = initMatrix()
    nums.forEach((count, i) => {
      for (let k = 1; k <= count; k++) {
        base[i][(i + k) % ALPHA] += 1n
      }
    })
  
    let counts = Array(ALPHA).fill(0n)
  
    for (const ch of s) {
      counts[ch.charCodeAt(0) - codeA] += 1n
    }
  
    const mulMatrix = (A, B) =>
      A.map((row, i) => row.map((_, j) => row.reduce((sum, v, k) => (sum + v * B[k][j]) % MOD, 0n)))
  
    const mulVector = (vec, M) =>
      Array(ALPHA)
        .fill()
        .map((_, j) => vec.reduce((sum, vi, i) => (sum + vi * M[i][j]) % MOD, 0n))
  
    let powerMat = base
    let exp = t
  
    while (exp > 0) {
      if (exp & 1) {
        counts = mulVector(counts, powerMat)
      }
      powerMat = mulMatrix(powerMat, powerMat)
      exp >>= 1
    }
  
    const result = counts.reduce((sum, cnt) => (sum + cnt) % MOD, 0n)
    return Number(result)
  }