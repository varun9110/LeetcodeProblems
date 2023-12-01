/**
 * 2843. Count Symmetric Integers
 * Difficulty: Easy
 * 
 * You are given two positive integers low and high.
An integer x consisting of 2 * n digits is symmetric if the sum of the first n digits of x is 
equal to the sum of the last n digits of x. Numbers with an odd number of digits are never symmetric.
Return the number of symmetric integers in the range [low, high].
Example 1:
Input: low = 1, high = 100
Output: 9
Explanation: There are 9 symmetric integers between 1 and 100: 11, 22, 33, 44, 55, 66, 77, 88, and 99.
Example 2:
Input: low = 1200, high = 1230
Output: 4
Explanation: There are 4 symmetric integers between 1200 and 1230: 1203, 1212, 1221, and 1230.
Constraints:
1 <= low <= high <= 104
 */

var countSymmetricIntegers = function(low, high) {
    let count = 0

  for (let number = low; number <= high; number++) {
    let strNumber = String(number)
    let length = strNumber.length

    if (length % 2 === 0) {
      let leftHalf = strNumber.slice(0, length / 2)
      let rightHalf = strNumber.slice(length / 2)

      let leftHalfDigitSum = leftHalf
        .split('')
        .reduce((sum, digit) => sum + Number(digit), 0)
      let rightHalfDigitSum = rightHalf
        .split('')
        .reduce((sum, digit) => sum + Number(digit), 0)

      if (leftHalfDigitSum === rightHalfDigitSum) {
        count++
      }
    }
  }

  return count
};

/**
 * refined code
 */


let countSymmetricIntegers = (l, h) => {
  let c = 0;
  while (l <= h) {
    if (l < 1000) Math.floor(l / 10) == l % 10 && c++;
    else {
      let f = Math.floor(l / 100), b = l % 100;
      Math.floor(f / 10) + (f % 10) == Math.floor(b / 10) + (b % 10) && c++}
    l++}
  return c}