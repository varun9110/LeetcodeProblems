/**
 * 1524. Number of Sub-arrays With Odd Sum
 * Difficulty: Medium
 * 
 * Given an array of integers arr, return the number of subarrays with an odd sum.

Since the answer can be very large, return it modulo 109 + 7.


Example 1:
Input: arr = [1,3,5]
Output: 4
Explanation: All subarrays are [[1],[1,3],[1,3,5],[3],[3,5],[5]]
All sub-arrays sum are [1,4,9,3,8,5].
Odd sums are [1,9,3,5] so the answer is 4.
Example 2:
Input: arr = [2,4,6]
Output: 0
Explanation: All subarrays are [[2],[2,4],[2,4,6],[4],[4,6],[6]]
All sub-arrays sum are [2,6,12,4,10,6].
All sub-arrays have even sum and the answer is 0.
Example 3:
Input: arr = [1,2,3,4,5,6,7]
Output: 16

Constraints:
1 <= arr.length <= 105
1 <= arr[i] <= 100
 */

/**
 * Intuition
Here's a JavaScript solution for the problem "Number of Sub-arrays With Odd Sum", along with an explanation of the approach and time complexity analysis.
We need to count subarrays with an odd sum, not just the number of times the prefix sum is odd.
Instead of brute-forcing through all possible subarrays (which would be too slow), we use a prefix sum approach with counting odd/even sums.
Approach
Observation

If a subarray sum is odd, it means the number of odd numbers in the subarray is odd.
The sum of an even-length sequence of odd numbers is even, and the sum of an odd-length sequence of odd numbers is odd.
We can use prefix sums to track the count of even and odd prefix sums.
Maintain two counters:

oddCount → Counts how many prefix sums have been odd so far.
evenCount → Counts how many prefix sums have been even so far. (Initialize to 1 because an empty prefix sum is even)
Use prefix sum properties:

If the current prefix sum is odd, it can form an odd sum subarray with all previous even prefix sums.
If the current prefix sum is even, it can form an odd sum subarray with all previous odd prefix sums.
Corrected Counting:

If currentSum is odd, add evenCount to totalCount and increase oddCount.
If currentSum is even, add oddCount to totalCount and increase evenCount.
Modulo Handling

Since the answer can be large, we take results modulo 10^9 + 7.
Complexity
Time complexity:

O(N) → We iterate through the array once.
Space complexity:

O(1) Space → Uses only a few variables.
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
var numOfSubarrays = function (arr) {
    const MOD = 1e9 + 7;
    let oddCount = 0, evenCount = 1; // evenCount starts from 1 because empty prefix sum is even
    let currentSum = 0, totalCount = 0;
    for (let num of arr) {
        currentSum += num;

        if (currentSum % 2 === 0) { // If prefix sum is even
            totalCount = (totalCount + oddCount) % MOD;
            evenCount++;
        } else { // If prefix sum is odd
            totalCount = (totalCount + evenCount) % MOD;
            oddCount++;
        }
    }
    return totalCount;
};