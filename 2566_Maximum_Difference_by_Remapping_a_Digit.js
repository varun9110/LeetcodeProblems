/**
 * 2566. Maximum Difference by Remapping a Digit
 * Difficulty: Easy
 * You are given an integer num. You know that Danny Mittal will sneakily remap one of the 10 possible digits (0 to 9) to another digit.
Return the difference between the maximum and minimum values Danny can make by remapping exactly one digit in num.
Notes:
When Danny remaps a digit d1 to another digit d2, Danny replaces all occurrences of d1 in num with d2.
Danny can remap a digit to itself, in which case num does not change.
Danny can remap different digits for obtaining minimum and maximum values respectively.
The resulting number after remapping can contain leading zeroes.
We mentioned "Danny Mittal" to congratulate him on being in the top 10 in Weekly Contest 326.
Example 1:
Input: num = 11891
Output: 99009
Explanation: 
To achieve the maximum value, Danny can remap the digit 1 to the digit 9 to yield 99899.
To achieve the minimum value, Danny can remap the digit 1 to the digit 0, yielding 890.
The difference between these two numbers is 99009.
Example 2:
Input: num = 90
Output: 99
Explanation:
The maximum value that can be returned by the function is 99 (if 0 is replaced by 9) and the minimum value 
that can be returned by the function is 0 (if 9 is replaced by 0).
Thus, we return 99.
Constraints:
1 <= num <= 108
 */

const getMinMaxCombo = (num, digit) => {
	let max = num.toString().replaceAll(digit, '9');
	let min = num.toString().replaceAll(digit, '0');
	return [max, min].map(Number);
};

var minMaxDifference = (num) => {
	let [min, max] = [Infinity, -Infinity];
	for (const digit of num.toString()) {
		const [maxCombo, minCombo] = getMinMaxCombo(num, digit);
		min = Math.min(minCombo, min);
		max = Math.max(maxCombo, max);
	}
	return max - min;
};


/**
Refined approach
 */

var minMaxDifference = function(num) {
    // tc - On, sc - On
    // EXAMPLE: 11891
    const nums = num.toString().split('') 

    let nonZero
    let nonNine
    
    // tc - On
    // After this for loop nonZero = 1
    for (const num of nums) {
        if (num !== '0') {
            nonZero = num
            break
        }
    }

    // tc - On
    // After this for loop nonNine = 1
    for (const num of nums) {
        if (num !== '9') {
            nonNine = num
            break
        }
    }

    // tc - On, sc - On
    // After this for loop all 1-s will be changed to 9
    // and nums = 99899
    const max = Number(nums.map(num => {
        if (num === nonNine) return '9'
        return num
    }).join(''))

    // tc - On, sc - On
    // After this for loop all 1-s will be changed to 0
    // and nums = 00890. parse int and get 890
    const min = Number.parseInt(nums.map(num => {
        if (num === nonZero) return '0'
        return num
    }).join(''))

    return max - min
};