/**
 * 670. Maximum Swap
 * Difficulty: Medium
 * 
 * You are given an integer num. You can swap two digits at most once to get the maximum valued number.
Return the maximum valued number you can get.


Example 1:
Input: num = 2736
Output: 7236
Explanation: Swap the number 2 and the number 7.
Example 2:
Input: num = 9973
Output: 9973
Explanation: No swap.
 

Constraints:

0 <= num <= 108
 */


/**
 * Intuition
The problem asks us to find the maximum possible number by swapping two digits in the given number at most once. Intuitively, to maximize the number, 
we want to place the largest digits in the most significant positions. By scanning through the digits, we aim to swap the smallest possible significant 
digit with the largest possible digit that appears after it in the number.

Approach
Track the last occurrence of each digit: We store the last position of every digit (from 0 to 9) in an array, allowing us to know where the highest digits appear.
Identify a potential swap: As we traverse the number, for each digit, we check if there's a larger digit appearing later. If we find one, we swap the two digits.
Return the result: Once the optimal swap is performed (if any), return the new number. If no swap is needed, return the original number.
Complexity
Time complexity:
O(n), where (n) is the number of digits in the input number. We traverse the number twice: once to store the last occurrence of each digit, 
and once to find the optimal swap.

Space complexity:
O(1), since we only use an array of fixed size (10) to store the last occurrences of digits.
 */

/**
 * @param {number} num
 * @return {number}
 */
var maximumSwap = function(num) {
    // Convert the number to a string array
    let numArr = num.toString().split('');
    
    // Track the last occurrence of each digit
    let last = new Array(10).fill(-1);
    for (let i = 0; i < numArr.length; i++) {
        last[parseInt(numArr[i])] = i;
    }

    // Traverse the digits from left to right
    for (let i = 0; i < numArr.length; i++) {
        // Check if a larger digit can be swapped later
        for (let d = 9; d > numArr[i]; d--) {
            if (last[d] > i) {
                // Swap the digits and return the new number
                [numArr[i], numArr[last[d]]] = [numArr[last[d]], numArr[i]];
                return parseInt(numArr.join(''));
            }
        }
    }
    
    // Return the original number if no swap was performed
    return num;
};