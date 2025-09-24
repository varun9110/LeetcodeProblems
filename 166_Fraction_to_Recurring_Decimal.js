/**
 * 166. Fraction to Recurring Decimal
 * Difficulty: Medium
 * 
 * Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.
If the fractional part is repeating, enclose the repeating part in parentheses.
If multiple answers are possible, return any of them.
It is guaranteed that the length of the answer string is less than 104 for all the given inputs.


Example 1:

Input: numerator = 1, denominator = 2
Output: "0.5"
Example 2:

Input: numerator = 2, denominator = 1
Output: "2"
Example 3:

Input: numerator = 4, denominator = 333
Output: "0.(012)"
 

Constraints:

-231 <= numerator, denominator <= 231 - 1
denominator != 0
 */

/**
 * Approach
If numerator is 0 return "0".
Determine the sign of the result. If numerator and denominator have different signs, the result is negative.
Work with absolute values (use 64-bit / BigInt when needed to avoid overflow).
Compute integer part = abs(numerator) / abs(denominator) and the initial remainder = abs(numerator) % abs(denominator).
If remainder is 0, return integer part (with sign).
Otherwise append . and simulate long division: multiply remainder by 10, compute next digit = remainder / denominator, update remainder = remainder % denominator. Before generating a digit for a remainder, record the position (index) where this remainder first appears. If a remainder repeats, insert ( at its first position and append ) at the end — then stop.
Return the built string.
 */

/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
var fractionToDecimal = function(numerator, denominator) {
    if (numerator === 0) return "0";

    let n = BigInt(numerator);
    let d = BigInt(denominator);

    let res = "";
    if ((n < 0n) !== (d < 0n)) res += "-";

    if (n < 0n) n = -n;
    if (d < 0n) d = -d;

    res += (n / d).toString();
    let rem = n % d;
    if (rem === 0n) return res;

    res += ".";
    const seen = new Map();

    while (rem !== 0n) {
        if (seen.has(rem)) {
            const pos = seen.get(rem);
            res = res.slice(0, pos) + "(" + res.slice(pos) + ")";
            break;
        }
        seen.set(rem, res.length);
        rem *= 10n;
        res += (rem / d).toString();
        rem = rem % d;
    }
    return res;
};