/**
 * 1442. Count Triplets That Can Form Two Arrays of Equal XOR
 * Difficulty: Medium
 * 
 * Given an array of integers arr.

We want to select three indices i, j and k where (0 <= i < j <= k < arr.length).

Let's define a and b as follows:

a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]
b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]
Note that ^ denotes the bitwise-xor operation.

Return the number of triplets (i, j and k) Where a == b.

Example 1:
Input: arr = [2,3,1,6,7]
Output: 4
Explanation: The triplets are (0,1,2), (0,2,2), (2,3,4) and (2,4,4)
Example 2:

Input: arr = [1,1,1,1,1]
Output: 10
 

Constraints:

1 <= arr.length <= 300
1 <= arr[i] <= 108
 */


/**
 * Intuition
The problem asks for triplets (i, j, k) such that the XOR of elements from index i to j-1 is equal to the XOR of elements from index j to k. 
Leveraging the properties of the XOR operation, we can transform this condition into a simpler one: the XOR of the entire segment from i to k must be zero. 
Using cumulative XOR, we can efficiently compute and check this condition for all valid triplets.
Approach
1. Cumulative XOR Array:
Construct a cumulative XOR array prefix where prefix[i] represents the XOR of all elements from arr[0] to arr[i-1].
 This allows us to compute the XOR of any subarray arr[l] to arr[r] as prefix[r+1] ^ prefix[l].
2. Finding Valid Triplets:
Iterate over all pairs of indices (i, k) where 0<i<k<n0<i<k<n0<i<k<n.
Check if prefix[i] is equal to prefix[k+1]. If they are equal, the XOR of the elements from i to k is zero.
For each pair (i, k) where this condition holds, every j in the range [i+1, k] will satisfy the triplet condition.
Count all such valid j values by adding (k - i) to the result for each valid pair (i, k).
Complexity
Time complexity:
Constructing the cumulative XOR array takes O(n)O(n)O(n).
Space complexity:
The cumulative XOR array requires O(n)O(n)O(n) additional space.
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
var countTriplets = function(arr) {
    let n = arr.length;
    let prefix = new Array(n + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] ^ arr[i];
    }
    
    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let k = i + 1; k < n; k++) {
            if (prefix[i] === prefix[k + 1]) {
                count += (k - i);
            }
        }
    }
    
    return count;
};