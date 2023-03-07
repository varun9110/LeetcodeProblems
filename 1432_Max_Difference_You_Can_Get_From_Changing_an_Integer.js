/**
 * 1432. Max Difference You Can Get From Changing an Integer
 * Difficulty: Easy
 * 
 * You are given an integer num. You will apply the following steps exactly two times:
Pick a digit x (0 <= x <= 9).
Pick another digit y (0 <= y <= 9). The digit y can be equal to x.
Replace all the occurrences of x in the decimal representation of num by y.
The new integer cannot have any leading zeros, also the new integer cannot be 0.
Let a and b be the results of applying the operations to num the first and second times, respectively.

Return the max difference between a and b.
Example 1:

Input: num = 555
Output: 888
Explanation: The first time pick x = 5 and y = 9 and store the new integer in a.
The second time pick x = 5 and y = 1 and store the new integer in b.
We have now a = 999 and b = 111 and max difference = 888

Example 2:
Input: num = 9
Output: 8
Explanation: The first time pick x = 9 and y = 9 and store the new integer in a.
The second time pick x = 9 and y = 1 and store the new integer in b.
We have now a = 9 and b = 1 and max difference = 8
 
Constraints:

1 <= num <= 10 ^ 8
*/

/**
 * Approach:
 * Basically, we need to change the characters twice. to replace them we first convert the number to string and then use ReplaceAll function to replace the number
 * in the first iteration : check where in the number we are not getting the "9" digit, where the digit is different. capture that number and repalce all 
 * occurences with 9
 * 
 * for 2nd iteratin:
 * check if the first number is "1" or not:
 * If yes then create a loop to find where the number is != 0 and != 1, then store the values of the replace number and to be replaces by 0
 * outside call the  replace function to replace with the value from above or first number by 1.
 * 
 * find the different and return the answer.
 * 
 */

 var maxDiff = function(num) {
    let string = num.toString();

    //first iteration
    let firstCharacter = string[0];
    for(let i=0; i<string.length; i++){
        if(string[i] !== "9"){
            firstCharacter = string[i];
            break;
        }
    }
    let a = string.replaceAll(firstCharacter, "9");
    a = Number(a);

    //second iteration
    firstCharacter = string[0];
    let replaceCharacter = "1";
    if(firstCharacter === "1"){
        //loop
        for(let i=1; i<string.length; i++){
            if(string[i] !== "0" && string[i]!== firstCharacter){
                firstCharacter = string[i];
                replaceCharacter = "0";
                break;
            }
        }
    }
    let b = string.replaceAll(firstCharacter, replaceCharacter);
    b = Number(b);
    return (a-b);
};

/**
 * refined code but same approach
 */

 var maxDiff = function(num) {
    let numString = num.toString();
    let max = numString;
    let min = numString;
    let digits = numString.split("");
    let firstDigit = digits[0];

    
    //max
    if(firstDigit != 9) {
        max = max.replaceAll(digits[0],"9");
    }
    console.log(max);

    //min
    if(firstDigit != 1) {
        min = min.replaceAll(digits[0],"1");
    }
    
    for(let i = 1; i < digits.length; i++) {
        if(Number(max) == num) {
            max = max.replaceAll(digits[i],"9");
        }        

        if(Number(min) == num) {
            if(firstDigit == digits[i]) continue;
            min = min.replaceAll(digits[i],"0");
        }
        
        if(Number(max) != num && Number(min) != num) break;
    }
    
    return Number(max) - Number(min);
};