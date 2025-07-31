/**
 * 898. Bitwise ORs of Subarrays
 * Difficulty: Medium
 * Given an integer array arr, return the number of distinct bitwise ORs of all the non-empty subarrays of arr.

The bitwise OR of a subarray is the bitwise OR of each integer in the subarray. The bitwise OR of a subarray of one integer is that integer.

A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: arr = [0]
Output: 1
Explanation: There is only one possible result: 0.
Example 2:

Input: arr = [1,1,2]
Output: 3
Explanation: The possible subarrays are [1], [1], [2], [1, 1], [1, 2], [1, 1, 2].
These yield the results 1, 1, 2, 1, 3, 3.
There are 3 unique values, so the answer is 3.
Example 3:

Input: arr = [1,2,4]
Output: 6
Explanation: The possible results are 1, 2, 3, 4, 6, and 7.
 

Constraints:

1 <= arr.length <= 5 * 104
0 <= arr[i] <= 109
 * 
 */

/**
 * Intuition
Bitwise OR only sets bits to 1 and never unsets them. Thus, once a particular bit is turned on in a running OR, it stays on for any longer subarray. To find all distinct OR-values of subarrays, we only need to track, at each index, the set of OR-results for subarrays ending at that index.

Approach
Data Structures
cur: a set storing OR-results of all subarrays ending at the previous position.
res: a set storing all OR-results encountered so far.
Iteration
res = set()
cur = set()
for x in arr:
    # Start new subarray with x, and extend each previous OR by x
    nxt = {x}              
    for prev_or in cur:
        nxt.add(prev_or | x)
    # Record new OR-values globally
    res |= nxt            
    # Update for next iteration
    cur = nxt             
return len(res)
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
var subarrayBitwiseORs = function(arr) {
    let res = new Set();
    let cur = new Set();
    for (const x of arr) {
        let nxt = new Set([x]);
        for (const v of cur) {
            nxt.add(v | x);
        }
        for (const v of nxt) {
            res.add(v);
        }
        cur = nxt;
    }
    return res.size;
};