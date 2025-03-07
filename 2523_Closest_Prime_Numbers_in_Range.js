/**
 * 2523. Closest Prime Numbers in Range
 * Difficulty: Medium
 * 
 Given two positive integers left and right, find the two integers num1 and num2 such that:
left <= num1 < num2 <= right .
Both num1 and num2 are prime numbers.
num2 - num1 is the minimum amongst all other pairs satisfying the above conditions.
Return the positive integer array ans = [num1, num2]. If there are multiple pairs satisfying these conditions, return the one with the smallest num1 value. If no such numbers exist, return [-1, -1].

Example 1:
Input: left = 10, right = 19
Output: [11,13]
Explanation: The prime numbers between 10 and 19 are 11, 13, 17, and 19.
The closest gap between any pair is 2, which can be achieved by [11,13] or [17,19].
Since 11 is smaller than 17, we return the first pair.
Example 2:
Input: left = 4, right = 6
Output: [-1,-1]
Explanation: There exists only one prime number in the given range, so the conditions cannot be satisfied.

Constraints:

1 <= left <= right <= 106
 * 
 */


/**
 * Need of Sieve of Eratosthenes?
The approach to find prime numbers using Nested For Loops has a time complexity of O(n 
2
 ) which can be optimised using the sieve of eratosthenes method to O(nlog(log(n)).

Lets discuss the basic recursive approach first using Nested For ->

    vector<int> Primes(int n) {
    vector<int> prime_vector;
    for (int num = 2; num <= n; num++) {
        bool prime = true;
        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                prime = false;
                break;
            }
        }
        if (prime) prime_vector.push_back(num);
    }
    return prime_vector;
}
Now the issue with this code is that for the set of numbers initially looking like
image.png

This method basically checks for the same set of numbers again and again starting from 2 i.e for it performs these calculations after reaching each number
image.png

Here certain calculations that we have already made are being repeated if we analyse carefully -->
image.png

Calculating these pre-calculated things again and again would be very tedious and time expensive wouldn't it? Well don't worry , Eratosthenes from Alexandria is there to save your precious time.
💡 Sieve of Eratosthenes
The Sieve of Eratosthenes basically starts by maintaining a bool vector from 2 upto the number n each marked as true initially. We can then traverse through the vector and for every number 
in the vector we traverse through every number and terminate its future multiples so we need not recalculate for them later. Lets look at how this will look
for 2 -->
image.png

Similarly for 3 now -->
image.png

Now as we can see that we have already significantly reduced the total numbers we need to traverse from 2 to n. Using this method by eliminating future multiples we can write the optimal code to find the Primes numbers.
 */


/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var closestPrimes = function(left, right) {
    const sieve = Array(right + 1).fill(true);
    sieve[0] = sieve[1] = false;

    for (let i = 2; i * i <= right; i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= right; j += i) {
                sieve[j] = false;
            }
        }
    }

    let res = [-1, -1];
    let temp = -1;
    let mini = Infinity;

    for (let i = left; i <= right; i++) {
        if (sieve[i]) {
            if (temp !== -1 && i - temp < mini) {
                res = [temp, i];
                mini = i - temp;
            }
            temp = i;
        }
    }

    return res;
};