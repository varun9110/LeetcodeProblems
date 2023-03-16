/**
 * 2578. Split With Minimum Sum
 * Difficulty: Easy
 * Given a positive integer num, split it into two non-negative integers num1 and num2 such that:
The concatenation of num1 and num2 is a permutation of num.
In other words, the sum of the number of occurrences of each digit in num1 and num2 is equal to the number of occurrences of that digit in num.
num1 and num2 can contain leading zeros.
Return the minimum possible sum of num1 and num2.
Notes:
It is guaranteed that num does not contain any leading zeros.
The order of occurrence of the digits in num1 and num2 may differ from the order of occurrence of num.

Example 1:
Input: num = 4325
Output: 59
Explanation: We can split 4325 so that num1 is 24 and num2 is 35, giving a sum of 59. We can prove that 59 is indeed the minimal possible sum.

Example 2:
Input: num = 687
Output: 75
Explanation: We can split 687 so that num1 is 68 and num2 is 7, which would give an optimal sum of 75.

Constraints:
10 <= num <= 109
*/

/**
 * Approach:
 * Basically we just have to sort the number with the smallest digits and then keep adding each digit to 2 numbes alternatively and the add both the numbers
 * 
 */

 var splitNum = function(num) {
    let arr = num.toString().split("").sort((a,b) => a-b);
    let num1 =""; 
    let num2 = "";
    let flag = true;
    for(let i=0; i<arr.length; i++){
        if(flag){
            num1 += arr[i];
            flag = false;
        } else {
            num2 += arr[i];
            flag = true;
        }
    }
    return ( Number(num1) + Number(num2));
};

/**
 * Refinement:
 * instead of taking a flag take the condition to be % of i
 */

 var splitNum = function (n) {
    // Convert to string
    let str = "" + n;

    // Collect digits, convert to numbers, sort ascending
    let arr = str
        .split("")
        .map((x) => +x)
        .sort((a, b) => a - b);

    // Concatenate into 2 strings, alternatively
    let str1 = "";
    let str2 = "";

    let i = 0;
    for (let digit of arr) {
        if (i % 2 === 0) {
            str1 += digit;
        } else {
            str2 += digit;
        }
        i++;
    }

    // Convert 2 strings to numbers, add & return
    return +str1 + +str2;
};