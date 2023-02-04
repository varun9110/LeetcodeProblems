/*
1015. Smallest Integer Divisible by K
Difficulty : Medium

Given a positive integer k, you need to find the length of the smallest positive integer n such that n is divisible by k, and n only contains the digit 1.
Return the length of n. If there is no such n, return -1.
Note: n may not fit in a 64-bit signed integer.

Example 1:
Input: k = 1
Output: 1
Explanation: The smallest answer is n = 1, which has length 1.

Example 2:
Input: k = 2
Output: -1
Explanation: There is no such positive integer n divisible by 2.

Example 3:
Input: k = 3
Output: 3
Explanation: The smallest answer is n = 111, which has length 3.
 

Constraints:
1 <= k <= 105

*/

/*
Approach: if k is divisible by 2 or 5 then definitly 1,11,111,1111 .... will not be divisible by the number.
for other numbers say if k is 123 then 11 will not be divisble, so generate the minimun number as 111 and then proceed from there
*/

var smallestRepunitDivByK = function(k) {
    if(k%2 === 0 || k%5 === 0){
        return -1;
    }
    let kString = k.toString();
    let len = kString.length;
    let minNumber = "";
    while(len > 0){
        minNumber += "1";
        len--;
    }
    minNumber = parseInt(minNumber);
    while(minNumber % k != 0){
        minNumber = (minNumber*10) +1;
        console.log(minNumber, minNumber.toString().length);
    }
    return minNumber.toString().length;
    
};

/*
Approach:
Now assume that the numbe is 3, then iterate from 1 to 3 and generate the numbers : 1,11,111 
now even if we proceed with 1111 then that is just repition, i.e, 111 then 1 so we see a loop of 1 to 3 and then 1 repeats again
so for k=3 and generating a loop will result as when i=1=4=7=10 and i=2=5=8=11 and same goes for all iterations

Hence, we do not get a number in the iteration from 1 to 3 then we wont get it in next iteration as well.
Hence, we can return -1. else if we do get a number (1,11,111,1111...) % k ==== 0 then we return i
*/

var smallestRepunitDivByK = function(k) {
    for(let i=1,a=0; i<=k; i++){
        a = (a*10+1) % k;
        if(a===0){
            return i;
        }
    }
    return -1;
}