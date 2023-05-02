/**
 * 2496. Maximum Value of a String in an Array
 * Difficulty : Easy
 * 
 * The value of an alphanumeric string can be defined as:
The numeric representation of the string in base 10, if it comprises of digits only.
The length of the string, otherwise.
Given an array strs of alphanumeric strings, return the maximum value of any string in strs.
Example 1:
Input: strs = ["alic3","bob","3","4","00000"]
Output: 5
Explanation: 
- "alic3" consists of both letters and digits, so its value is its length, i.e. 5.
- "bob" consists only of letters, so its value is also its length, i.e. 3.
- "3" consists only of digits, so its value is its numeric equivalent, i.e. 3.
- "4" also consists only of digits, so its value is 4.
- "00000" consists only of digits, so its value is 0.
Hence, the maximum value is 5, of "alic3".
Example 2:
Input: strs = ["1","01","001","0001"]
Output: 1
Explanation: 
Each string in the array has value 1. Hence, we return 1.

Constraints:
1 <= strs.length <= 100
1 <= strs[i].length <= 9
strs[i] consists of only lowercase English letters and digits.
*/

/**
 * Approach:
 * Iterate through all the items and keep checking if any of the item has a character whose charCodeValue is <48 and > 57 (non numberic) then in that case raise the
 * flag and use the length of that item or else convert the item to and use that to find the max and store it in the max variable.
 */

var maximumValue = function (strs) {
  let max = 0;
  for (let i = 0; i < strs.length; i++) {
    let stringValue = strs[i];
    let flag = false;
    for (let j = 0; j < stringValue.length; j++) {
      let charCodeValue = stringValue.charCodeAt(j);
      if (charCodeValue < 48 || charCodeValue > 57) {
        max = Math.max(max, stringValue.length);
        flag = true;
      }
    }
    if (!flag) {
      max = Math.max(max, Number(stringValue));
    }
  }
  return max;
};

/**
 * Refined approach:
 * use the isNaN - is Not a Number function.
 * if not a number then use the length of the item else convert the item to number and use it to calculte the max
 */

var maximumValue = function (strs) {
  let ans = 0;
  for (let i of strs) {
    if (isNaN(i)) {
      ans = Math.max(i.length, ans);
    } else {
      ans = Math.max(Number(i), ans);
    }
  }
  return ans;
};
