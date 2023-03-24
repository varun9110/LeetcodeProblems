/**
 * 258. Add Digits
 * Difficulty: Easy
 * 
 * Given an integer num, repeatedly add all its digits until the result has only one digit, and return it.
Example 1:
Input: num = 38
Output: 2
Explanation: The process is
38 --> 3 + 8 --> 11
11 --> 1 + 1 --> 2 
Since 2 has only one digit, return it.
Example 2:
Input: num = 0
Output: 0

Constraints:
0 <= num <= 231 - 1

Follow up: Could you do it without any loop/recursion in O(1) runtime?
 */

/**
 * Approach: Initial with the loop, run till num > 9 and the inner loop till num>0 and keep finding the sum of the digits
 */

var addDigits = function(num) {
    
    while(num>9){
        let sum = 0;
        while(num>0){
            sum += num%10;
            num = Math.floor(num/10);
        }
        num = sum;
    }
    return num;
};

/**
 * Refined Approach: cover the base conditions first.
 * Then basically if you observe you'll see that the sum of the digits is the mod of 9. so if the mod of num by 9 is 0 then sun is 9 else num%9 
 * 
 */

var addDigits = function(num) {
    if (isNaN(num) || num === 0) return 0;
    if (num < 10) return num;
    return num % 9 === 0 ? 9 : num % 9;
};