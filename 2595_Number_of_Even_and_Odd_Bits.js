/**
 * 2595. Number of Even and Odd Bits
 * Difficulty: Easy
 * You are given a positive integer n.
Let even denote the number of even indices in the binary representation of n (0-indexed) with value 1.
Let odd denote the number of odd indices in the binary representation of n (0-indexed) with value 1.
Return an integer array answer where answer = [even, odd].

Example 1:
Input: n = 17
Output: [2,0]
Explanation: The binary representation of 17 is 10001. 
It contains 1 on the 0th and 4th indices. 
There are 2 even and 0 odd indices.
Example 2:
Input: n = 2
Output: [0,1]
Explanation: The binary representation of 2 is 10.
It contains 1 on the 1st index. 
There are 0 even and 1 odd indices.

Constraints:
1 <= n <= 1000
 */

/**
 * Approach: 
 * create a counter and an array for result.
 * iterate till n>0
 * check if n%2===1 then check if counter (i %2) === 0 then if even the increase the even index of the result array else increase the odd index of the 
 * array.
 * 
 * divide the number by 2 and floor
 * return result
 */

var evenOddBit = function(n) {
    let i=0;
    let result = [0, 0];
    while(n>0){
        ((n%2) === 1) ? ((i%2 === 0) ? result[0]++ : result[1]++) : null;
        i++;
        n = Math.floor(n/2);
    }
    return result;
};