/**
 * 2654. Minimum Number of Operations to Make All Array Elements Equal to 1
 * Difficulty: Medium
 * 
 * You are given a 0-indexed array nums consisiting of positive integers. You can do the following operation on the array any number of times:

Select an index i such that 0 <= i < n - 1 and replace either of nums[i] or nums[i+1] with their gcd value.
Return the minimum number of operations to make all elements of nums equal to 1. If it is impossible, return -1.

The gcd of two integers is the greatest common divisor of the two integers.

 

Example 1:

Input: nums = [2,6,3,4]
Output: 4
Explanation: We can do the following operations:
- Choose index i = 2 and replace nums[2] with gcd(3,4) = 1. Now we have nums = [2,6,1,4].
- Choose index i = 1 and replace nums[1] with gcd(6,1) = 1. Now we have nums = [2,1,1,4].
- Choose index i = 0 and replace nums[0] with gcd(2,1) = 1. Now we have nums = [1,1,1,4].
- Choose index i = 2 and replace nums[3] with gcd(1,4) = 1. Now we have nums = [1,1,1,1].
Example 2:

Input: nums = [2,10,6,14]
Output: -1
Explanation: It can be shown that it is impossible to make all the elements equal to 1.
 

Constraints:

2 <= nums.length <= 50
1 <= nums[i] <= 106
 */

/**
 * Intuition
1. Goal:

We want all elements to become 1. The operation lets us take the GCD of a subarray and replace the whole subarray with that GCD value.
2. Key Observation:

If the array already contains some 1s, we can use them to "spread" 1s across the array using minimal operations.

Otherwise, we must find a subarray whose GCD equals 1 — because only then can we generate a 1 that can be used to make others 1.

3. Idea:

If there are already cnt1 ones, we can make all elements 1 in (n - cnt1) operations (each non-1 can be merged with a nearby 1).

Otherwise, find the shortest subarray whose GCD is 1.

Once you find such a subarray of length L, you can make one 1 in L - 1 operations, and then make all others 1 in (n - 1) more operations.
Hence total = (L - 1) + (n - 1) = L + n - 2.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
    const n = nums.length;
    let num1 = 0;
    let g = 0;

    const gcd = (a, b) => {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    };

    for (const x of nums) {
        if (x === 1) {
            num1++;
        }
        g = gcd(g, x);
    }

    if (num1 > 0) {
        return n - num1;
    }
    if (g > 1) {
        return -1;
    }

    let minLen = n;
    for (let i = 0; i < n; i++) {
        let currentGcd = 0;
        for (let j = i; j < n; j++) {
            currentGcd = gcd(currentGcd, nums[j]);
            if (currentGcd === 1) {
                minLen = Math.min(minLen, j - i + 1);
                break;
            }
        }
    }
    return minLen + n - 2;
};