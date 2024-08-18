/**
 *  264. Ugly Number II
 * Difficulty: Medium
 * 
 * An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

Given an integer n, return the nth ugly number.

 

Example 1:

Input: n = 10
Output: 12
Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.
Example 2:

Input: n = 1
Output: 1
Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
 

Constraints:

1 <= n <= 1690
 */

/**
 * Approach
Three Pointers (i2, i3, i5): These pointers track the indices for the next multiples of 2, 3, and 5.
Ugly Array: Stores the sequence of ugly numbers.
Next Values: next2, next3, and next5 store the next possible ugly number derived by multiplying by 2, 3, and 5, respectively.
Efficiency: The solution ensures that every ugly number is generated in order by incrementing the appropriate pointer whenever
 a new ugly number is added to the sequence. This avoids generating duplicates and ensures minimal operations.
Complexity
Time complexity: O(N)
Space complexity: O(N)
 */

var nthUglyNumber = function(n) {
    let ugly = new Array(n);
    ugly[0] = 1;
    let i2 = 0, i3 = 0, i5 = 0;
    let next2 = 2, next3 = 3, next5 = 5;

    for (let i = 1; i < n; i++) {
        let nextUgly = Math.min(next2, Math.min(next3, next5));
        ugly[i] = nextUgly;

        if (nextUgly === next2) {
            i2++;
            next2 = ugly[i2] * 2;
        }
        if (nextUgly === next3) {
            i3++;
            next3 = ugly[i3] * 3;
        }
        if (nextUgly === next5) {
            i5++;
            next5 = ugly[i5] * 5;
        }
    }

    return ugly[n - 1];
};