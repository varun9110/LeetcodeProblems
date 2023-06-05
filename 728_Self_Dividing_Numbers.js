/**
 * 728. Self Dividing Numbers
 * A self-dividing number is a number that is divisible by every digit it contains.
For example, 128 is a self-dividing number because 128 % 1 == 0, 128 % 2 == 0, and 128 % 8 == 0.
A self-dividing number is not allowed to contain the digit zero.
Given two integers left and right, return a list of all the self-dividing numbers in the range [left, right].

Example 1:
Input: left = 1, right = 22
Output: [1,2,3,4,5,6,7,8,9,11,12,15,22]
Example 2:
Input: left = 47, right = 85
Output: [48,55,66,77]

Constraints:
1 <= left <= right <= 104
 */

/**
 * Approach:
 * Create a function that will check if the number is self divisible by all its digits, if any of the condition is marked flase then return false.
 * in the main function run the loop from left till right and keep calling the above defined function for each element
 */

var checkSelfDivision = (number) => {
    let n = number;
    while(n>0){
        let remainder = n%10;
        n=Math.floor(n/10);
        if(remainder === 0) return;
        if((number%remainder) !== 0) return;
    }
    return true;
};

var selfDividingNumbers = function(left, right) {
    let result = [];
    for(let i=left; i<=right; i++){
        if(checkSelfDivision(i)){
            result.push(i);
        }
    }
    return result;
};