/**
 * 3507. Minimum Pair Removal to Sort Array I
 * Difficulty: Easy
 * 
 * Given an array nums, you can perform the following operation any number of times:

Select the adjacent pair with the minimum sum in nums. If multiple such pairs exist, choose the leftmost one.
Replace the pair with their sum.
Return the minimum number of operations needed to make the array non-decreasing.

An array is said to be non-decreasing if each element is greater than or equal to its previous element (if it exists).

 

Example 1:

Input: nums = [5,2,3,1]

Output: 2

Explanation:

The pair (3,1) has the minimum sum of 4. After replacement, nums = [5,2,4].
The pair (2,4) has the minimum sum of 6. After replacement, nums = [5,6].
The array nums became non-decreasing in two operations.

Example 2:

Input: nums = [1,2,2]

Output: 0

Explanation:

The array nums is already sorted.

 

Constraints:

1 <= nums.length <= 50
-1000 <= nums[i] <= 1000
 */


/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumPairRemoval = function(nums) {
    let arr = [...nums];
    let ops = 0;

    const isSorted = (a) => {
        for (let i = 1; i < a.length; i++)
            if (a[i] < a[i-1]) return false;
        return true;
    };

    while (!isSorted(arr)) {
        let minSum = Infinity, idx = 0;
        for (let i = 0; i + 1 < arr.length; i++) {
            let s = arr[i] + arr[i+1];
            if (s < minSum) {
                minSum = s;
                idx = i;
            }
        }
        arr[idx] = minSum;
        arr.splice(idx + 1, 1);
        ops++;
    }
    return ops;
};