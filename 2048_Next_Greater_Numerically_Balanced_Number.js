/**
 * 2048. Next Greater Numerically Balanced Number
 * Difficulty: Medium
 * 
 * An integer x is numerically balanced if for every digit d in the number x, there are exactly d occurrences of that digit in x.

Given an integer n, return the smallest numerically balanced number strictly greater than n.

 

Example 1:

Input: n = 1
Output: 22
Explanation: 
22 is numerically balanced since:
- The digit 2 occurs 2 times. 
It is also the smallest numerically balanced number strictly greater than 1.
Example 2:

Input: n = 1000
Output: 1333
Explanation: 
1333 is numerically balanced since:
- The digit 1 occurs 1 time.
- The digit 3 occurs 3 times. 
It is also the smallest numerically balanced number strictly greater than 1000.
Note that 1022 cannot be the answer because 0 appeared more than 0 times.
Example 3:

Input: n = 3000
Output: 3133
Explanation: 
3133 is numerically balanced since:
- The digit 1 occurs 1 time.
- The digit 3 occurs 3 times.
It is also the smallest numerically balanced number strictly greater than 3000.
 

Constraints:

0 <= n <= 106
 */

/**
 * Intuition
A number is numerically balanced if each digit d occurs exactly d times in the number.
For example:
22 → digit 2 appears 2 times
1333 → digit 1 appears 1 time, and digit 3 appears 3 times
Instead of checking each number one by one after n, generate all possible numerically balanced numbers first. Since there are only a few such numbers, precomputing them makes it easy to just pick the smallest one greater than n.
Approach
Use backtracking to generate all valid numerically balanced numbers.
Maintain an array count[d] to track how many times each digit d has been used.
Only add a digit d if it has been used fewer than d times.
Stop recursion once the number exceeds a reasonable upper bound (e.g., 1224444), since all valid balanced numbers are smaller than this.
During generation, if the current number is valid (each non-zero digit d appears exactly d times), add it to the list.
After generating all numbers, sort them and return the smallest number that is strictly greater than n.
Complexity
Time complexity: O(1)
Space complexity: O(1)
 */

/**
 * @param {number} n
 * @return {number}
 */
var nextBeautifulNumber = function(n) {
    const list = [];
    
    function isBeautiful(count) {
        for (let d = 1; d <= 7; d++) {
            if (count[d] !== 0 && count[d] !== d) return false;
        }
        return true;
    }

    function generate(num, count) {
        if (num > 0 && isBeautiful(count)) list.push(num);
        if (num > 1224444) return;

        for (let d = 1; d <= 7; d++) {
            if (count[d] < d) {
                count[d]++;
                generate(num * 10 + d, count);
                count[d]--;
            }
        }
    }

    generate(0, Array(10).fill(0));
    list.sort((a,b)=>a-b);
    for (let num of list) {
        if (num > n) return num;
    }
    return -1;
};