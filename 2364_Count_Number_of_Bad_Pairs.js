/**
 * 2364. Count Number of Bad Pairs
 * Difficulty: Medium
 * 
 * You are given a 0-indexed integer array nums. A pair of indices (i, j) is a bad pair if i < j and j - i != nums[j] - nums[i].

Return the total number of bad pairs in nums.

Example 1:
Input: nums = [4,1,3,3]
Output: 5
Explanation: The pair (0, 1) is a bad pair since 1 - 0 != 1 - 4.
The pair (0, 2) is a bad pair since 2 - 0 != 3 - 4, 2 != -1.
The pair (0, 3) is a bad pair since 3 - 0 != 3 - 4, 3 != -1.
The pair (1, 2) is a bad pair since 2 - 1 != 3 - 1, 1 != 2.
The pair (2, 3) is a bad pair since 3 - 2 != 3 - 3, 1 != 0.
There are a total of 5 bad pairs, so we return 5.
Example 2:
Input: nums = [1,2,3,4,5]
Output: 0
Explanation: There are no bad pairs.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 109
 */

/**
 * Intuition
Here's an efficient JavaScript solution using a hash map to count the number of bad pairs in
Approach
Total Pairs Calculation: The total number of pairs is calculated as n(n−1)/2, which represents all possible pairs.
Transformation: We use the transformation key = nums[i] - i, which helps in determining good pairs efficiently.
Using a Hash Map: The map keeps track of occurrences of each transformed value.
Counting Good Pairs: If a transformed value has appeared before, we increment goodPairs by its count in the map.
Subtracting from Total: The number of bad pairs is simply the total pairs minus the good pairs.
Complexity
Time complexity:

It's having O(n) time complexity
Space complexity:

It's having O(n) space complexity
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var countBadPairs = function (nums) {
    let n = nums.length;
    let totalPairs = (n * (n - 1)) / 2; // Total possible pairs
    let goodPairs = 0;
    let map = new Map();

    for (let i = 0; i < n; i++) {
        let key = nums[i] - i;
        if (map.has(key)) {
            goodPairs += map.get(key);
            map.set(key, map.get(key) + 1);
        } else {
            map.set(key, 1);
        }
    }

    return totalPairs - goodPairs;
};