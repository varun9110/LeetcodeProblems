/**
 * 3542. Minimum Operations to Convert All Elements to Zero
 * Difficulty: Medium
 * 
 * You are given an array nums of size n, consisting of non-negative integers. Your task is to apply some (possibly zero) operations on the array so that all elements become 0.

In one operation, you can select a subarray [i, j] (where 0 <= i <= j < n) and set all occurrences of the minimum non-negative integer in that subarray to 0.

Return the minimum number of operations required to make all elements in the array 0.

 

Example 1:

Input: nums = [0,2]

Output: 1

Explanation:

Select the subarray [1,1] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0].
Thus, the minimum number of operations required is 1.
Example 2:

Input: nums = [3,1,2,1]

Output: 3

Explanation:

Select subarray [1,3] (which is [1,2,1]), where the minimum non-negative integer is 1. Setting all occurrences of 1 to 0 results in [3,0,2,0].
Select subarray [2,2] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [3,0,0,0].
Select subarray [0,0] (which is [3]), where the minimum non-negative integer is 3. Setting all occurrences of 3 to 0 results in [0,0,0,0].
Thus, the minimum number of operations required is 3.
Example 3:

Input: nums = [1,2,1,2,1,2]

Output: 4

Explanation:

Select subarray [0,5] (which is [1,2,1,2,1,2]), where the minimum non-negative integer is 1. Setting all occurrences of 1 to 0 results in [0,2,0,2,0,2].
Select subarray [1,1] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,2,0,2].
Select subarray [3,3] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,0,0,2].
Select subarray [5,5] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,0,0,0].
Thus, the minimum number of operations required is 4.
 

Constraints:

1 <= n == nums.length <= 105
0 <= nums[i] <= 105
 */

/**
 * Monotonic Stack
This problem seems unrelated to monotonic stacks.
However, the crucial observation is, when we select a subarray and set its minimum to zero:

We are essentially "deleting" all elements equal to that minimum from that range.

Consider what happens when we process elements left to right:

If we encounter a larger value, we need a new operation to handle it (since it wasn't the minimum in any previous operation)
If we encounter a smaller or equal value, it could have been handled by a previous operation that processed a larger value
This leads to the insight:

We only need to count the number of "increasing steps" in the array (ignoring zeros).
A monotonic stack naturally tracks these increasing steps by maintaining values in non-decreasing order from bottom to top.

The Intuition
Let us imagine we are building layers of operations:

Each operation creates a "layer" that can cover all elements ≥ its minimum value in its range
When we see a smaller value, it can be covered by an existing layer
When we see a larger value, we need a new layer (new operation)
The monotonic stack maintains these active "layers" we're building as we scan left to right.

For each element num in the array:

Operations= 
⎩
⎨
⎧
​
  
skip
increment res
no change
​
  
if num=0
if stack is empty or stack.top()<num
if stack.top()=num
​
 
​
 
The stack maintains elements in non-decreasing order, representing the "active layers" of values we're tracking.

Putting everything together, we get the following algorithm:

Initialize: Create an empty stack and set res=0

Process each element: For each num in nums:

Remove larger values:
while stack.top()>num: pop from stack

       This removes values that would be eliminated before num when processing right to left.

Skip zeros:
if num=0: continue
       Zeros don't require operations.

Check if new operation needed:
if stack is empty or stack.top()<num:

Increment res (need new operation)
Push num to stack
Otherwise: num is equal to stack.top(), already covered by existing operation

Finally, return res as the minimum number of operations.

Example:
anigif.gif

Time Complexity: O(n)
Space Complexity: O(n)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function(nums) {
    const stk = [];
    let res = 0;
    for (const n of nums) {
        while (stk.length && stk.at(-1) > n)
            stk.pop();
        if (n === 0)
            continue;
        if (!stk.length || stk.at(-1) < n) {
            res++;
            stk.push(n);
        }
    }
    return res;
};