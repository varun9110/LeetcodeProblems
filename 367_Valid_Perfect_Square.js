/*

367. Valid Perfect Square
Difficulty : Easy

Given a positive integer num, return true if num is a perfect square or false otherwise.

A perfect square is an integer that is the square of an integer. In other words, it is the product of some integer with itself.

You must not use any built-in library function, such as sqrt.

 

Example 1:

Input: num = 16
Output: true
Explanation: We return true because 4 * 4 = 16 and 4 is an integer.
Example 2:

Input: num = 14
Output: false
Explanation: We return false because 3.742 * 3.742 = 14 and 3.742 is not an integer.
 

Constraints:

1 <= num <= 231 - 1
*/

/*
Approach 1 :
Create a while loop with i=1 and I,=num.
Keep finding if num is divisible by i , if yes then find the square of the i, if matches then return true if exceeds num then return false
*/

var isPerfectSquare = function(num) {
    let i =1;
    while(i<=num){
        if(num%i === 0){
            if(i*i > num) return false;
            if(i*i === num) return true;
        }
        i++;
    }
};


/*
Approach 2: 
Create a for loop while i<= num and keep incrementing with 2. 
keep adding the i to sum variable. 
if at any time the sum === num then return true else return false at the end
*/

var isPerfectSquare = function(num) {
    var sum = 0;
    for(let i = 1; i <= num; i += 2){
        sum += i;
        if(sum === num){
            return true;
        }
    }
    return false;
};