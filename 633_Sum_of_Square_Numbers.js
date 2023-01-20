/*
633. Sum of Square Numbers
Difficulty : Medium

Given a non-negative integer c, decide whether there're two integers a and b such that a2 + b2 = c.

Example 1:
Input: c = 5
Output: true
Explanation: 1 * 1 + 2 * 2 = 5

Example 2:
Input: c = 3
Output: false
 

Constraints:
0 <= c <= 231 - 1
Accepted
161.7K

*/

/*

Approach 1 : 
since the c is the addition of 2 squares so the numbers with less than the square root of C (say b)
Now, iterate through 0 to b and then keep storing the squares of the number in a object mapper

Now, again iterate through 0 to b and keep checking if the difference of square of iterator is present in the mapper
If yes then return else return false after the for loop execution
*/

var judgeSquareSum = function(c) {
    let low = 0;
    let high = Math.floor(Math.sqrt(c));
    
    while (low <= high) {
        const sum = low*low + high*high;
        const mid = Math.floor(low + (high - low)/2);
        
        
        if (sum === c) {
            return true
        }
        
        if (sum < c) {
            low = mid*mid + high*high < c ? mid + 1: low +1;
        }
        
        if (sum > c) {
            high = mid * mid + low * low > c ? mid - 1 : high - 1;
        }
        
    }
    
    return false;
};




/*

Approach 2: 
Main logic is same that high will be the square root of the C and low will be 0

now iterate till low is less than high and follow the binary search to find the most probable solution
This time keep finding the addition od squares of low and high and check if it is equal to c
if yes then return true else increase the low or decrease high based on sum of square of mid and high/low

*/

var judgeSquareSum = function(c) {
    let low = 0;
    let high = Math.floor(Math.sqrt(c));
    
    while (low <= high) {
        const sum = low*low + high*high;
        const mid = Math.floor(low + (high - low)/2);
        
        
        if (sum === c) {
            return true
        }
        
        if (sum < c) {
            low = mid*mid + high*high < c ? mid + 1: low +1;
        }
        
        if (sum > c) {
            high = mid * mid + low * low > c ? mid - 1 : high - 1;
        }
        
    }
    
    return false;
};