/**
 * 2264. Largest 3-Same-Digit Number in String
 * Difficulty: Easy
 * You are given a string num representing a large integer. An integer is good if it meets the following conditions:
It is a substring of num with length 3.
It consists of only one unique digit.
Return the maximum good integer as a string or an empty string "" if no such integer exists.
Note:
A substring is a contiguous sequence of characters within a string.
There may be leading zeroes in num or a good integer.
Example 1:
Input: num = "6777133339"
Output: "777"
Explanation: There are two distinct good integers: "777" and "333".
"777" is the largest, so we return "777".
Example 2:
Input: num = "2300019"
Output: "000"
Explanation: "000" is the only good integer.
Example 3:
Input: num = "42352338"
Output: ""
Explanation: No substring of length 3 consists of only one unique digit. Therefore, there are no good integers.
Constraints:
3 <= num.length <= 1000
num only consists of digits.
 */


/**
 * iterate through the loop and check i,i+1 and i+2 value if they all are same then create a number of it and check if that is higher than 
 * the existing value.
 * return the result at the end
 */

var largestGoodInteger = function(num) {
    let result = "";
    for(let i=0; i<num.length-2; i++){
        if(num[i]===num[i+1] && num[i]===num[i+2]){
            let a = num[i]+num[i+1]+num[i+2];
            result = Math.max(Number(result), Number(a));
        }
    }
    result = (result===0) ? "000" : result+"";
    return result;
};

/**
 * refined code
 */

var largestGoodInteger = function(num) {
    let max = "";
    for (let i = 2; i < num.length; i++) {
        if (num[i] === num[i - 1] && num[i] === num[i - 2]) {
            const subString = num[i].repeat(3);
            if (subString > max) {
                max = subString;
            }
        }
    }
    return max;
};