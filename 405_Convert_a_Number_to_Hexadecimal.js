/**
 * 405. Convert a Number to Hexadecimal
 * Difficulty: Easy
 * 
 * Given a 32-bit integer num, return a string representing its hexadecimal representation. For negative integers, two’s complement method is used.

All the letters in the answer string should be lowercase characters, and there should not be any leading zeros in the answer except for the zero itself.

Note: You are not allowed to use any built-in library method to directly solve this problem.

 

Example 1:

Input: num = 26
Output: "1a"
Example 2:

Input: num = -1
Output: "ffffffff"
 

Constraints:

-231 <= num <= 231 - 1
 */

/**
 * @param {number} num
 * @return {string}
 */
var toHex = function (num) {

    const hexas = {
        0: 0, 6: 6, 10: "a",
        1: 1, 7: 7, 11: "b",
        2: 2, 8: 8, 12: "c",
        3: 3, 9: 9, 13: "d",
        4: 4, 14: "e",
        5: 5, 15: "f"
    }
    if (num >= 0 && num <= 15) return hexas[num].toString();
    if (num < 0) num = num >>> 0;

    let newArr = [];
    while (num >= 16) {

        let rest = (num % 16);

        newArr.unshift(hexas[rest]);

        num = Math.floor(num / 16);
    }
    newArr.unshift(hexas[num]);

    return newArr.join("");
};