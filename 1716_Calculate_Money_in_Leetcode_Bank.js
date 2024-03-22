/**
 * 1716. Calculate Money in Leetcode Bank
 * Difficulty: Easy
 * 
 * Hercy wants to save money for his first car. He puts money in the Leetcode bank every day.

He starts by putting in $1 on Monday, the first day. Every day from Tuesday to Sunday, 
he will put in $1 more than the day before. On every subsequent Monday, he will put in $1 more than the previous Monday.
Given n, return the total amount of money he will have in the Leetcode bank at the end of the nth day. 

Example 1:
Input: n = 4
Output: 10
Explanation: After the 4th day, the total is 1 + 2 + 3 + 4 = 10.
Example 2:
Input: n = 10
Output: 37
Explanation: After the 10th day, the total is (1 + 2 + 3 + 4 + 5 + 6 + 7) + (2 + 3 + 4) = 37. Notice that on the 2nd Monday, Hercy only puts in $2.
Example 3:
Input: n = 20
Output: 96
Explanation: After the 20th day, the total is (1 + 2 + 3 + 4 + 5 + 6 + 7) + (2 + 3 + 4 + 5 + 6 + 7 + 8) + (3 + 4 + 5 + 6 + 7 + 8) = 96.

Constraints:

1 <= n <= 1000
 */

var totalMoney = function(n) {
    let r = 0;
    for(let i=1; i<=n; i++){
        let multi = Math.floor(i/7);
        let mod = i%7
        if(i%7 === 0 ) mod += 6
        r = r + multi + (mod);
    }
    return r
};

var totalMoney = function(n) {
    let weekCount = 1;
    let increment = weekCount;
    let r = 0
    for(let i=1; i<=n; i++){
        if(i%7 === 1) {
            increment = weekCount;
            weekCount++;
        }
        r = r + increment;
        increment++;
    }
    return r
};

var totalMoney = function(n) {
    // keep track of the total
    let total = 0;
    // loop n days
    let amountToAdd = 1;
    for (let i = 1; i < n + 1; i++) {
        total += amountToAdd;
        amountToAdd += 1;
        if (i % 7 === 0) {
            // set amountToAdd to previous Monday + 1
            // number of Mondays is n/7
            amountToAdd = i/7 + 1;
        }
    }
    return total;
};