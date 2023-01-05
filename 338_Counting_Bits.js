/*

338_Counting_Bits.js
Difficulty : easy

Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

Example 1:

Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10


Example 2:
Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
 

Constraints:

0 <= n <= 105
 

Follow up:

It is very easy to come up with a solution with a runtime of O(n log n). Can you do it in linear time O(n) and possibly in a single pass?
Can you do it without using any built-in function (i.e., like __builtin_popcount in C++)?

*/



/* 
Answer 1
Approach : 
Iterate through all the numbers from 0 to n. Keep calling the below function with the each number.
Create a function that find and check the mod's value of the number. if it is 1 then increase the counter. Divide the number by 2. Repeat until the number is less than 1.
Return the count to the parent function.
Push it to the ans array and return the ans after the for loop

Complexity = O(n log n)
*/

 /**
 * @param {number} n
 * @return {number[]}
 */

var countNumberOfOnes = (number) => {
    if(number === 0){
        return 0;
    }
    let count = 0;

    while(number >= 1){
        let mod = number % 2;

        (mod === 1) ? count++ : null;

        number = Math.floor(number / 2);
    }
    return count;
} 


var countBits = function(n) {

    if(n < 0 || n > 100000){
        return "Invalid input";
    }

    let ans = [];

    for(let i = 0; i <= n; i++){
        let count = countNumberOfOnes(i);
        ans.push(count);
    }

    return ans;
};


/*
Approach 2
Using Dynamic Programming

We initialize the array counter till 2 post that we know in binary for all 2^n the count for 1 will be 1.
And the values between 2^n and 2^n-1 will be twice of the previous.

hence, we initialze c as 2, then add ans[c] number of 1s from the base then add the number of 1 counted in the previuos number.
example  7 can be written as 4 + 3, we would have already calculated the base value of 4 then add 3 to it
4 -> 100
3 - > 11

7 -> 111

So take the number of 1s from the already calculated array. and push that in the ans array


Complexity : O(n)
*/ 


var countBits = function(n) {

    let ans = new Array(n+1);
    ans[0] = 0;
    ans[1] = 1;
    ans[2] = 1;

    if (num < 3) {
        return ans.slice(0, num+1);
    }

    let c = 2;
    for(let i = 3; i<=num; i++){
        if(i==c*2){
            c=c*2;
            ans[i] = 1;
        } else {
            ans[i] = ans[c] + ans[i-c];
        }
    }

    return ans;
};



