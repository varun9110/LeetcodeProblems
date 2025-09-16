/**
 * 2197. Replace Non-Coprime Numbers in Array
 * Difficulty: Hard
 * 
 * You are given an array of integers nums. Perform the following steps:

Find any two adjacent numbers in nums that are non-coprime.
If no such numbers are found, stop the process.
Otherwise, delete the two numbers and replace them with their LCM (Least Common Multiple).
Repeat this process as long as you keep finding two adjacent non-coprime numbers.
Return the final modified array. It can be shown that replacing adjacent non-coprime numbers in any arbitrary order will lead to the same result.

The test cases are generated such that the values in the final array are less than or equal to 108.

Two values x and y are non-coprime if GCD(x, y) > 1 where GCD(x, y) is the Greatest Common Divisor of x and y.

 

Example 1:

Input: nums = [6,4,3,2,7,6,2]
Output: [12,7,6]
Explanation: 
- (6, 4) are non-coprime with LCM(6, 4) = 12. Now, nums = [12,3,2,7,6,2].
- (12, 3) are non-coprime with LCM(12, 3) = 12. Now, nums = [12,2,7,6,2].
- (12, 2) are non-coprime with LCM(12, 2) = 12. Now, nums = [12,7,6,2].
- (6, 2) are non-coprime with LCM(6, 2) = 6. Now, nums = [12,7,6].
There are no more adjacent non-coprime numbers in nums.
Thus, the final modified array is [12,7,6].
Note that there are other ways to obtain the same resultant array.
Example 2:

Input: nums = [2,2,1,1,3,3,3]
Output: [2,1,1,3]
Explanation: 
- (3, 3) are non-coprime with LCM(3, 3) = 3. Now, nums = [2,2,1,1,3,3].
- (3, 3) are non-coprime with LCM(3, 3) = 3. Now, nums = [2,2,1,1,3].
- (2, 2) are non-coprime with LCM(2, 2) = 2. Now, nums = [2,1,1,3].
There are no more adjacent non-coprime numbers in nums.
Thus, the final modified array is [2,1,1,3].
Note that there are other ways to obtain the same resultant array.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
The test cases are generated such that the values in the final array are less than or equal to 108.
 */

/**
 * Intuition
We’re given a list of numbers and asked to repeatedly replace adjacent non-coprime numbers (numbers that share a common factor greater than 1) with their LCM (Least Common Multiple).
This means we keep combining numbers until all adjacent numbers are coprime (GCD = 1).

To do this efficiently, we need a way to look at the previous number and decide whether to combine it with the current one — a stack is perfect for this kind of problem.

Approach
We go through the list one number at a time.

We use a stack to keep track of the final sequence of numbers.

For each number:

While the top number on the stack and the current number are not coprime (i.e. their GCD is greater than 1):

Pop the top number off the stack.
Combine it with the current number by finding their LCM.
Now check again with the new number and the new top of the stack.
After all possible merges, we push the final number onto the stack.

In the end, the stack will contain numbers where all adjacent values are coprime.

Complexity
Time Complexity:

O(nlogM)

Where n is the number of elements in the list and M is the largest number.
We might do multiple merges, but each merge is efficient due to using GCD.
Space Complexity:

O(n) for the stack in the worst case (when no numbers are merged).
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var replaceNonCoprimes = function(nums) {
    const stack = [];
    
    const gcd = (a, b) => {
        while (b !== 0) {
            const t = b;
            b = a % b;
            a = t;
        }
        return a;
    };
    
    for (let num of nums) {
        while (stack.length > 0) {
            const top = stack[stack.length - 1];
            const g = gcd(top, num);
            if (g === 1) {
                break;
            }
            stack.pop();
            num = (top / g) * num;
        }
        stack.push(num);
    }
    
    return stack;
};