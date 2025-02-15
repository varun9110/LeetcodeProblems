/**
 * 2698. Find the Punishment Number of an Integer
 * Difficulty: Medium
 * 
 * Given a positive integer n, return the punishment number of n.

The punishment number of n is defined as the sum of the squares of all integers i such that:

1 <= i <= n
The decimal representation of i * i can be partitioned into contiguous substrings such that the sum of the integer values of these substrings equals i.
 

Example 1:

Input: n = 10
Output: 182
Explanation: There are exactly 3 integers i in the range [1, 10] that satisfy the conditions in the statement:
- 1 since 1 * 1 = 1
- 9 since 9 * 9 = 81 and 81 can be partitioned into 8 and 1 with a sum equal to 8 + 1 == 9.
- 10 since 10 * 10 = 100 and 100 can be partitioned into 10 and 0 with a sum equal to 10 + 0 == 10.
Hence, the punishment number of 10 is 1 + 81 + 100 = 182
Example 2:

Input: n = 37
Output: 1478
Explanation: There are exactly 4 integers i in the range [1, 37] that satisfy the conditions in the statement:
- 1 since 1 * 1 = 1. 
- 9 since 9 * 9 = 81 and 81 can be partitioned into 8 + 1. 
- 10 since 10 * 10 = 100 and 100 can be partitioned into 10 + 0. 
- 36 since 36 * 36 = 1296 and 1296 can be partitioned into 1 + 29 + 6.
Hence, the punishment number of 37 is 1 + 81 + 100 + 1296 = 1478
 

Constraints:

1 <= n <= 1000
 */

/**
 * Approach
Iterate through numbers from 1 to n
Compute i * i and convert it to a string.
Check if the square can be partitioned
Use a recursive function to check if i * i can be split into contiguous substrings that sum to i.
Recursive Partitioning Strategy (canPartition)
Try forming numbers by taking substrings from left to right.
Subtract each formed number from i and continue checking the remaining digits.
If a valid partition is found, return true.
Summing Valid Squares
If a valid partition is found, add i * i to the punishment number sum.
Complexity
Time complexity:

Outer Loop: Runs from 1 to n → O(n)
Recursive Partitioning (canPartition)
Each number i has at most O(log(n)) digits.
Exponential branching (O(2^d), where d = log(n²) = 2 log(n)).
Worst case complexity → O(2^(2 log(n))) = O(n²)
Overall Complexity: O(n × n²) = O(n³)
Space complexity:

Recursive Stack Depth: Maximum depth → O(log(n))
Space for Storing Variables: Constant extra space → O(1)
Total Space Complexity: O(log(n)) (due to recursion)

 */

/**
 * @param {number} n
 * @return {number}
 */
var punishmentNumber = function(n) {
    function canPartition(num, target, start) {
        if (target === 0 && start === num.length) return true;
        if (start >= num.length) return false;
        
        let sum = 0;
        for (let i = start; i < num.length; i++) {
            sum = sum * 10 + parseInt(num[i], 10);
            if (sum > target) break;
            if (canPartition(num, target - sum, i + 1)) return true;
        }
        
        return false;
    }
    
    let totalSum = 0;
    for (let i = 1; i <= n; i++) {
        let squareStr = (i * i).toString();
        if (canPartition(squareStr, i, 0)) {
            totalSum += i * i;
        }
    }
    
    return totalSum;
};