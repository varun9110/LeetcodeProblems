/**
 * 2749. Minimum Operations to Make the Integer Zero
 * Difficulty: Medium
 * 
 * You are given two integers num1 and num2.

In one operation, you can choose integer i in the range [0, 60] and subtract 2i + num2 from num1.

Return the integer denoting the minimum number of operations needed to make num1 equal to 0.

If it is impossible to make num1 equal to 0, return -1.

 

Example 1:

Input: num1 = 3, num2 = -2
Output: 3
Explanation: We can make 3 equal to 0 with the following operations:
- We choose i = 2 and subtract 22 + (-2) from 3, 3 - (4 + (-2)) = 1.
- We choose i = 2 and subtract 22 + (-2) from 1, 1 - (4 + (-2)) = -1.
- We choose i = 0 and subtract 20 + (-2) from -1, (-1) - (1 + (-2)) = 0.
It can be proven, that 3 is the minimum number of operations that we need to perform.
Example 2:

Input: num1 = 5, num2 = 7
Output: -1
Explanation: It can be proven, that it is impossible to make 5 equal to 0 with the given operation.
 

Constraints:

1 <= num1 <= 109
-109 <= num2 <= 109
 */

/**
 * Intuition
Suppose we perform k operations. Each operation subtracts (2 
i
 +num2).

After k operations:

x=num1−k⋅num2
​
 
We need to check if x can be written as the sum of exactly k powers of two.

Let f(x) = number of ones in the binary representation of x.

Non-negativity:

x≥0
​
 
Lower bound:

k≥f(x)
​
 
because we need at least that many powers of two.
Upper bound:

k≤x
​
 
because at most x ones are possible.
Thus, the condition is:

f(x)≤k≤x
​
 
Algorithm
Iterate k from 1 to 60.

60 is enough because 2 
60
  already exceeds the problem constraints.
For each k, compute x=num1−k⋅num2.

If x≥0 and f(x)≤k≤x, return k.

If no valid k exists, return −1.

Time Complexity: O(60)=O(1).
Space Complexity: O(1).
 */

/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var makeTheIntegerZero = function(num1, num2) {
    const countOnes = n => n.toString(2).replace(/0/g, '').length;

    for (let k = 1; k <= 60; k++) {
        let d = num1 - num2 * k;
        if (d < k) {
            return -1;
        }
        if (k >= countOnes(d)) {
            return k;
        }
    }
    return -1;
};