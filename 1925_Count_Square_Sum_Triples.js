/**
 * 1925. Count Square Sum Triples
 * Difficulty: Easy
 * A square triple (a,b,c) is a triple where a, b, and c are integers and a2 + b2 = c2.
Given an integer n, return the number of square triples such that 1 <= a, b, c <= n.

Example 1:
Input: n = 5
Output: 2
Explanation: The square triples are (3,4,5) and (4,3,5).
Example 2:
Input: n = 10
Output: 4
Explanation: The square triples are (3,4,5), (4,3,5), (6,8,10), and (8,6,10).
Constraints:
1 <= n <= 250
 */

/**
 * Approach:
 * can only be done using the nested loop. outer loop from 1 till n, inner loop as well from 1 till n.
 * find the square root of a*a + b*b
 * then check if the c is a number and lesser than n.
 * If yes then increment count.
 * 
 * return count at the end
 */


var countTriples = function(n) {
    let count = 0;
    for(let a=1; a< n; a++){
        for(let b=1; b< n; b++){
            let c = Math.sqrt((a*a) + (b*b));
            if (Number.isInteger(c) && c <= n) {
                // if (a * a + b * b === c * c)  count ++
                count ++;
            }
        }
    }
    return count;
};