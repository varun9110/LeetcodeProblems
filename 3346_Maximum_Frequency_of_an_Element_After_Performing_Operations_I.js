/**
 * 3346. Maximum Frequency of an Element After Performing Operations I
 * Difficulty: Medium
 * 
 * You are given an integer array nums and two integers k and numOperations.

You must perform an operation numOperations times on nums, where in each operation you:

Select an index i that was not selected in any previous operations.
Add an integer in the range [-k, k] to nums[i].
Return the maximum possible frequency of any element in nums after performing the operations.

 

Example 1:

Input: nums = [1,4,5], k = 1, numOperations = 2

Output: 2

Explanation:

We can achieve a maximum frequency of two by:

Adding 0 to nums[1]. nums becomes [1, 4, 5].
Adding -1 to nums[2]. nums becomes [1, 4, 4].
Example 2:

Input: nums = [5,11,20,20], k = 5, numOperations = 1

Output: 2

Explanation:

We can achieve a maximum frequency of two by:

Adding 0 to nums[1].
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
0 <= k <= 105
0 <= numOperations <= nums.length
 */

/**
 * Approach
We want to maximize the frequency of a target value target, to do that, we can transform elements in the range [target−k,target+k] to become target by adding appropriate values.

For example, if target=5 and k=2:

Element 3 can become 5 by adding +2
Element 7 can become 5 by adding −2
Element 4 can become 5 by adding +1
Instead of trying all possible transformations, we use a frequency counting approach combined with prefix sums to efficiently compute how many elements can be transformed to each possible target value.

First, we track how many times each value appears in the original array
Next, Create a prefix sum array for range queries
Then, For each potential target value, calculate how many elements can be transformed to it
he answer is the maximum achievable frequency across all targets
For a target value i, we can calculate:

total=count[i+k]−count[i−k−1]
​
 
This gives us the total number of elements that can be transformed to i.

The maximum frequency for target i is:

res=freq+min(numOps,total−freq)
​
 
Where:

freq = elements already equal to i
total−freq = elements in range that can become i (excluding those already equal)
Try all possible target values:

For each potential target i from 0 to maxVal−1:
Algorithm
Define range boundaries:

left
right
​
  
=max(0,i−k)
=min(maxVal−1,i+k)
​
 
Compute total elements in range:

total=count[right]−count[left−1]
​
 
This gives us all elements in:

[i−k,i+k]
​
 
Calculate original frequency:

freq=count[i]−count[i−1]
​
 
This gives us elements already equal to i.

Update maximum frequency:

res=max(res,freq+min(numOps,total−freq))
​
 
Finally, return the maximum frequency across all target values.

Time Complexity: O(n+m)
Space Complexity: O(m)
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
const maxFrequency = (nums, k, numOps) => {
    const maxVal = Math.max(...nums) + k + 2;
    const count = new Array(maxVal).fill(0);

    for (const v of nums)
        count[v]++;

    for (let i = 1; i < maxVal; i++)
        count[i] += count[i - 1];

    let res = 0;
    for (let i = 0; i < maxVal; i++) {
        const left = Math.max(0, i - k);
        const right = Math.min(maxVal - 1, i + k);
        const total = count[right] - (left ? count[left - 1] : 0);
        const freq = count[i] - (i ? count[i - 1] : 0);
        res = Math.max(res, freq + Math.min(numOps, total - freq));
    }

    return res;
};