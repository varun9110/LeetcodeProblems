/**
 * 2948. Make Lexicographically Smallest Array by Swapping Elements
 * Difficulty: Medium
 * 
 * You are given a 0-indexed array of positive integers nums and a positive integer limit.

In one operation, you can choose any two indices i and j and swap nums[i] and nums[j] if |nums[i] - nums[j]| <= limit.

Return the lexicographically smallest array that can be obtained by performing the operation any number of times.

An array a is lexicographically smaller than an array b if in the first position where a and b differ, array a has an element that is less than the 
corresponding element in b. For example, the array [2,10,3] is lexicographically smaller than the array [10,2,3] because they differ at index 0 and 2 < 10.

 

Example 1:

Input: nums = [1,5,3,9,8], limit = 2
Output: [1,3,5,8,9]
Explanation: Apply the operation 2 times:
- Swap nums[1] with nums[2]. The array becomes [1,3,5,9,8]
- Swap nums[3] with nums[4]. The array becomes [1,3,5,8,9]
We cannot obtain a lexicographically smaller array by applying any more operations.
Note that it may be possible to get the same result by doing different operations.
Example 2:

Input: nums = [1,7,6,18,2,1], limit = 3
Output: [1,6,7,18,1,2]
Explanation: Apply the operation 3 times:
- Swap nums[1] with nums[2]. The array becomes [1,6,7,18,2,1]
- Swap nums[0] with nums[4]. The array becomes [2,6,7,18,1,1]
- Swap nums[0] with nums[5]. The array becomes [1,6,7,18,1,2]
We cannot obtain a lexicographically smaller array by applying any more operations.
Example 3:

Input: nums = [1,7,28,19,10], limit = 3
Output: [1,7,28,19,10]
Explanation: [1,7,28,19,10] is the lexicographically smallest array we can obtain because we cannot apply the operation on any two indices.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 109
1 <= limit <= 109
 */

/**
Intuition
The goal is to create the lexicographically smallest array by rearranging the elements of the array while ensuring the difference between consecutive elements in the sorted sequence does not exceed l. Sorting the array and carefully grouping elements based on their indices ensures the smallest order while adhering to the difference constraint.

Approach
Sort the Array: Create a sorted version of the array while maintaining the original indices to know where each element came from.
Group Elements: Iterate through the sorted array and group consecutive elements where the difference between adjacent elements is less than or equal to l.
Rearrange Elements: For each group, restore the original indices and assign the smallest possible order of values.
Fill Result Array: Use the mapped indices and values to populate the result array in lexicographical order.
Complexity
Time complexity: O(nlogn), dominated by the sorting step.
Space complexity: O(n), for storing the sorted array and result.
 */



/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
const lexicographicallySmallestArray = (nums, limit) => {
    const len = nums.length, res = Array(len).fill(0);
    const sorted = nums.map((val, idx) => [val, idx]).sort((a, b) => a[0] - b[0]);
    let i = 0;

    while (i < len) {
        let j = i;
        while (j < len - 1 && sorted[j + 1][0] - sorted[j][0] <= limit) j++;

        const sub = sorted.slice(i, j + 1);
        const subIdx = sub.map(val => val[1]).sort((a, b) => a - b);
        subIdx.forEach((index, k) => res[index] = sub[k][0]);

        i = j + 1;
    }

    return res;
};
