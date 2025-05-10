/**
 * 2918. Minimum Equal Sum of Two Arrays After Replacing Zeros
 * Difficulty: Medium
 * 
 * You are given two arrays nums1 and nums2 consisting of positive integers.

You have to replace all the 0's in both arrays with strictly positive integers such that the sum of elements of both arrays becomes equal.

Return the minimum equal sum you can obtain, or -1 if it is impossible.

 

Example 1:

Input: nums1 = [3,2,0,1,0], nums2 = [6,5,0]
Output: 12
Explanation: We can replace 0's in the following way:
- Replace the two 0's in nums1 with the values 2 and 4. The resulting array is nums1 = [3,2,2,1,4].
- Replace the 0 in nums2 with the value 1. The resulting array is nums2 = [6,5,1].
Both arrays have an equal sum of 12. It can be shown that it is the minimum sum we can obtain.
Example 2:

Input: nums1 = [2,0,2,0], nums2 = [1,4]
Output: -1
Explanation: It is impossible to make the sum of both arrays equal.
 

Constraints:

1 <= nums1.length, nums2.length <= 105
0 <= nums1[i], nums2[i] <= 106
 */

/**
 * Approaches
(Also explained in the code)

The minSum function takes two vectors of integers, nums1 and nums2, as input.

It initializes sum1 and count1 to keep track of the sum and count of zeros in nums1. Similarly, it initializes sum2 and count2 for nums2.

The function calculates sum1 and count1 by iterating through nums1. For each element in nums1:

If the element is non-zero, it adds it to sum1.
If the element is zero, it increments both sum1 and count1.
It then calculates sum2 and count2 in the same way by iterating through nums2.

The function compares sum1 and sum2:

If they are equal, it means the sums are already equal, and it returns either sum as the result.
If sum1 is greater than sum2, it checks if count2 is zero:

If count2 is zero, it's not possible to make sum1 equal to sum2, so it returns -1.
Otherwise, it returns sum1 as the result because it can be increased to match or exceed sum2.
If sum2 is greater than sum1, it checks if count1 is zero:

If count1 is zero, it's not possible to make sum2 equal to sum1, so it returns -1.
Otherwise, it returns sum2 as the result because it can be increased to match or exceed sum1.
Complexity
Time complexity:
O(n)

Space complexity:
O(1)
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minSum = function (nums1, nums2) {
    let sum1 = 0, cnt1 = 0;
    let sum2 = 0, cnt2 = 0;

    for (let ele of nums1) {
        if (ele !== 0) {
            sum1 += ele;
        } else {
            sum1++;
            cnt1++;
        }
    }

    for (let ele of nums2) {
        if (ele !== 0) {
            sum2 += ele;
        } else {
            sum2++;
            cnt2++;
        }
    }

    if (sum1 === sum2)
        return sum1;
    else if (sum1 > sum2) {
        if (cnt2 === 0)
            return -1;
        return sum1;
    }

    if (cnt1 === 0)
        return -1;
    return sum2;
};