/**
 * 168. Excel Sheet Column Title
 * Difficulty : Easy
 * 
 * Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.
For example:
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28 
...
 Example 1:
Input: columnNumber = 1
Output: "A"

Example 2:
Input: columnNumber = 28
Output: "AB"

Example 3:
Input: columnNumber = 701
Output: "ZY"
 
Constraints:
1 <= columnNumber <= 231 - 1
 */

/**
 * Approach: create a mapper to map numbers to the letters
 * then while loop till the number is greater than 26, keep finding the mod and map it against the mapper to find the equivanlent letter.
 * divide to find the divisor, if the remainder is 0 then subtract 1 from the divisor.
 * after the loop map the number to the respective letter
 */

var convertToTitle = function (columnNumber) {
  let result = "";
  let mapper = {
    0: "Z",
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "J",
    11: "K",
    12: "L",
    13: "M",
    14: "N",
    15: "O",
    16: "P",
    17: "Q",
    18: "R",
    19: "S",
    20: "T",
    21: "U",
    22: "V",
    23: "W",
    24: "X",
    25: "Y",
    26: "Z",
  };

  while (columnNumber > 26) {
    let remainder = columnNumber % 26;
    result = mapper[remainder] + result;
    columnNumber = Math.floor(columnNumber / 26);
    if (remainder === 0) {
      columnNumber--;
    }
  }
  result = mapper[columnNumber] + result;
  return result;
};

/**
 * refined code but same appraoch.
 */

var convertToTitle = function (columnNumber) {
  let n = columnNumber;
  if (n < 27) return String.fromCharCode(n + 64);
  var s = "";
  while (n > 0) {
    var temp = n % 26;
    temp = temp == 0 ? 26 : temp;
    s = String.fromCharCode(temp + 64) + s;
    n -= temp;
    n /= 26;
  }
  return s;
};

/**
 * Refined approach:
 * by using the charcode
 */

var greatestLetter = function (s) {
  let set = new Set(s.split(""));
  // ASCII(A-Z, a-z)=(65-90, 97-122).
  for (let i = 90; i >= 65; i--) {
    if (
      set.has(String.fromCharCode(i)) &&
      set.has(String.fromCharCode(i + 32))
    ) {
      return String.fromCharCode(i);
    }
  }
  return "";
};
