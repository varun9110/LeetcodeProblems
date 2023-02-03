/*
507. Perfect Number
Difficulty : Easy

A perfect number is a positive integer that is equal to the sum of its positive divisors, excluding the number itself. A divisor of an integer x is an integer that can divide x evenly.

Given an integer n, return true if n is a perfect number, otherwise return false.

Example 1:
Input: num = 28
Output: true
Explanation: 28 = 1 + 2 + 4 + 7 + 14
1, 2, 4, 7, and 14 are all divisors of 28.

Example 2:
Input: num = 7
Output: false
 
Constraints:
1 <= num <= 108
*/

/*
Approach : 
This one was pretty simple. take sum as 1 as 1 will always divide the number. Then iterate till num/2 since post that no number will divide other tham
itself and condition says that the numbe itself should not be included
*/

var checkPerfectNumber = function(num) {
    if(num <= 1) return false;
    let sum = 1;
    let i=2;
    while(i <= Math.floor((num/2))) {
        if(num%i === 0){
            sum += i;
        }
        i++;
    }

    return (sum === num); 
};

/*
OR use below approach
*/

var checkPerfectNumber = function(num) {
    if (num <= 1) { return false; }
    let divisorsSum = 0;
    for (let i = 1; i <= Math.floor(Math.sqrt(num)); i++) {
        if (num % i ===0) {
            divisorsSum += i + num / i;
        }
    }
    
    return divisorsSum === 2 * num ? true : false;
};