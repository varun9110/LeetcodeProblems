/**
 * 1399. Count Largest Group
 * Difficulty : Easy
 * 
 * You are given an integer n.
Each number from 1 to n is grouped according to the sum of its digits.
Return the number of groups that have the largest size.

Example 1:
Input: n = 13
Output: 4
Explanation: There are 9 groups in total, they are grouped according sum of its digits of numbers from 1 to 13:
[1,10], [2,11], [3,12], [4,13], [5], [6], [7], [8], [9].
There are 4 groups with largest size.
Example 2:
Input: n = 2
Output: 2
Explanation: There are 2 groups [1], [2] of size 1.

Constraints:
1 <= n <= 104
 */


/**
 * @param {number} n
 * @return {number}
 */
var countLargestGroup = function(n) {
    const groups = new Map();

    for (let i = 1; i <= n; i++) {
        let sum = 0, num = i;
        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        groups.set(sum, (groups.get(sum) || 0) + 1);
    }

    const maxSize = Math.max(...groups.values());

    let res = 0;
    for (let count of groups.values()) {
        if (count === maxSize) res++;
    }

    return res;
};

