/**
 * 2601. Prime Subtraction Operation
 * Difficulty: Medium
 * 
 * You are given a 0-indexed integer array nums of length n.
You can perform the following operation as many times as you want:
Pick an index i that you haven’t picked before, and pick a prime p strictly less than nums[i], then subtract p from nums[i].
Return true if you can make nums a strictly increasing array using the above operation and false otherwise.
A strictly increasing array is an array whose each element is strictly greater than its preceding element.

Example 1:
Input: nums = [4,9,6,10]
Output: true
Explanation: In the first operation: Pick i = 0 and p = 3, and then subtract 3 from nums[0], so that nums becomes [1,9,6,10].
In the second operation: i = 1, p = 7, subtract 7 from nums[1], so nums becomes equal to [1,2,6,10].
After the second operation, nums is sorted in strictly increasing order, so the answer is true.
Example 2:
Input: nums = [6,8,11,12]
Output: true
Explanation: Initially nums is sorted in strictly increasing order, so we don't need to make any operations.
Example 3:
Input: nums = [5,8,3]
Output: false
Explanation: It can be proven that there is no way to perform operations to make nums sorted in strictly increasing order, so the answer is false.
 

Constraints:

1 <= nums.length <= 1000
1 <= nums[i] <= 1000
nums.length == n
 */

/**
 * Prime Number Generation:
Uses the Sieve of Eratosthenes algorithm to generate prime numbers up to the maximum element in the input array
alternative is Sieve of Atkin or just list of Prime Numbers (probably won't pass the interview) but probably won't require you to memorize Sieve, idk.
List of Prime numbers 1-1024 if you dont like Eratosthenes and AOL Atkin :
2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021
Creates a boolean array sieve where True indicates prime numbers
Efficiently marks non-prime numbers as False
Animation_Sieve_of_Eratosth.gif

Array Transformation Check:
Iterates through the array while maintaining a currValue that represents the minimum required value for strict increase
For each number, calculates the difference between current number and required value
Makes decisions based on the difference:
If difference < 0: Returns False as we can't make it increasing
If difference is prime or 0: Moves to next number
If difference is not prime: Increases required value and tries again
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */

var primeSubOperation = function(nums) {
    const getMaxElement = (nums) => {
        let max = -1;
        for (let num of nums) {
            if (num > max) {
                max = num;
            }
        }
        return max;
    };
    
    const fill = (arr, value) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = value;
        }
    };
    
    const maxElement = getMaxElement(nums);
    
    // Create Sieve of Eratosthenes array
    const sieve = new Array(maxElement + 1);
    fill(sieve, true);
    sieve[1] = false;
    
    for (let i = 2; i <= Math.sqrt(maxElement + 1); i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= maxElement; j += i) {
                sieve[j] = false;
            }
        }
    }
    
    // Check if array can be made strictly increasing
    let currValue = 1;
    let i = 0;
    
    while (i < nums.length) {
        const difference = nums[i] - currValue;
        
        if (difference < 0) {
            return false;
        }
        
        if (sieve[difference] === true || difference === 0) {
            i++;
            currValue++;
        } else {
            currValue++;
        }
    }
    
    return true;
};