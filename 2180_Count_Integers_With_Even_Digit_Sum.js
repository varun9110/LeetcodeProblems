/**
 * 2180. Count Integers With Even Digit Sum
 * Difficulty: Easy
 * 
 * Given a positive integer num, return the number of positive integers less than or equal to num whose digit sums are even.
The digit sum of a positive integer is the sum of all its digits.
Example 1:
Input: num = 4
Output: 2
Explanation:
The only integers less than or equal to 4 whose digit sums are even are 2 and 4.    
Example 2:
Input: num = 30
Output: 14
Explanation:
The 14 integers less than or equal to 30 whose digit sums are even are
2, 4, 6, 8, 11, 13, 15, 17, 19, 20, 22, 24, 26, and 28.

Constraints:
1 <= num <= 1000
 */

/**
 * Approach:
 * Basically calculate the sum of all the digits in the num, now if this sum is even then divide num by 2 else subtract 1 and divide by 2.
 * So technically with in each number there would be eactly half of the numbers whose sum of digits will be even.
 */

var countEven = function (num) {
  let sum = 0;
  let temp = num;

  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }

  return sum % 2 ? Math.floor((temp - 1) / 2) : Math.floor(temp / 2);
};
