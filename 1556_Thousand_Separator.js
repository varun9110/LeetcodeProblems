/**
 * 1556. Thousand Separator
 * Difficulty: Easy
 * Given an integer n, add a dot (".") as the thousands separator and return it in string format.
Example 1:
Input: n = 987
Output: "987"
Example 2:
Input: n = 1234
Output: "1.234"
Constraints:
0 <= n <= 231 - 1
 */

/**
 * Approach:
 * Create a while loop till the number is greater than 999.
 * Keep finding the mod. if the mod is <100 then add a 0 and the rest of tbe number and the prvious number.
 * then divide the number by 1000;
 * Lastly, after the iteration add the remaining number to the string array.
 */
 var thousandSeparator = function(n) {
    let an = "";
    while(n>999){
        let rem = n%1000;
        an = (rem<100) ? ".0"+rem+an : "."+rem+an;
        n=Math.floor(n/1000);
    }
    an = n+an;
    return an;
};

/**
 * Another approach:
 * If the number is < 1000 then return the number (base condition)
 * 
 * else convert the number to array of string
 * then loop from i=3 to length.
 * keep adding a "." after every 3 characters.
 * Lastly, join the array into a string.
 */

 var thousandSeparator = function(n) {
    if (n<1000)
        return n.toString();
    let arr = Array.from(String(n), Number);
    for (let i=3; i<arr.length; i+=4) {
        arr.splice(arr.length-i, 0, '.');
    }
    return arr.join("");
};