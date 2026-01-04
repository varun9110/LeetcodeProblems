/**
 * 1390. Four Divisors
 * Difficulty: Medium
 * 
 * Given an integer array nums, return the sum of divisors of the integers in that array that have exactly four divisors. If there is no such integer in the array, return 0.

 

Example 1:

Input: nums = [21,4,7]
Output: 32
Explanation: 
21 has 4 divisors: 1, 3, 7, 21
4 has 3 divisors: 1, 2, 4
7 has 2 divisors: 1, 7
The answer is the sum of divisors of 21 only.
Example 2:

Input: nums = [21,21]
Output: 64
Example 3:

Input: nums = [1,2,3,4,5]
Output: 0
 

Constraints:

1 <= nums.length <= 104
1 <= nums[i] <= 105
 */

/**
 * Approach
I iterate through each number in the array.

For each number, I try to find its divisors from 1 to sqrt(num).

Whenever I find a divisor d, I also include num / d.

I keep:

a count of divisors
a sum of divisors
If divisor count becomes more than 4, I stop early.

If a number ends with exactly 4 divisors, I add its divisor sum to the answer.

Finally, I return the total sum.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var sumFourDivisors = function(nums) {
    let totalSum = 0;

    for (let num of nums) {
        let cnt = 0;
        let sum = 0;

        for (let d = 1; d * d <= num; d++) {
            if (num % d === 0) {
                let other = num / d;

                cnt++;
                sum += d;

                if (other !== d) {
                    cnt++;
                    sum += other;
                }

                if (cnt > 4) break;
            }
        }

        if (cnt === 4) {
            totalSum += sum;
        }
    }

    return totalSum;
};