/**
 * 1310. XOR Queries of a Subarray
 * Difficulty: Medium
 * 
 * You are given an array arr of positive integers. You are also given the array queries where queries[i] = [lefti, righti].

For each query i compute the XOR of elements from lefti to righti (that is, arr[lefti] XOR arr[lefti + 1] XOR ... XOR arr[righti] ).

Return an array answer where answer[i] is the answer to the ith query.

 

Example 1:

Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
Output: [2,7,14,8] 
Explanation: 
The binary representation of the elements in the array are:
1 = 0001 
3 = 0011 
4 = 0100 
8 = 1000 
The XOR values for queries are:
[0,1] = 1 xor 3 = 2 
[1,2] = 3 xor 4 = 7 
[0,3] = 1 xor 3 xor 4 xor 8 = 14 
[3,3] = 8
Example 2:

Input: arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
Output: [8,0,4,4]
 

Constraints:

1 <= arr.length, queries.length <= 3 * 104
1 <= arr[i] <= 109
queries[i].length == 2
0 <= lefti <= righti < arr.length
 */


/**
 * Intuition
To solve the problem efficiently, we need to calculate the XOR of subarrays for multiple queries. Calculating the XOR for each subarray directly for every query can be slow and inefficient, especially with the given constraints. Instead, we use a preprocessing step to make the query responses faster.

Approach
Preprocessing with Prefix XOR Array:

We first compute a prefix XOR array pre, where pre[i] is the XOR of all elements from the start of the array up to index i. This allows us to quickly compute the XOR for any subarray.
Compute XOR for Queries:

Given the prefix XOR array, for any query that asks for the XOR of the subarray from index lefti to righti, we can efficiently compute the result using:
pre[righti] if lefti is 0.
pre[righti] ^ pre[lefti - 1] otherwise. This is because pre[righti] gives the XOR from the start of the array up to righti, and subtracting pre[lefti - 1] removes the contribution of the elements before lefti.
Step-by-Step Explanation
Let's use the following arrays and queries:

Array (arr): [1, 3, 4, 8]
Queries: [[0, 1], [1, 2], [0, 3], [3, 3]]
1. Compute Prefix XOR Array
First, we compute the prefix XOR array (pre). This array helps us quickly compute the XOR of any subarray.

Initial Array: [1, 3, 4, 8]

Index i	arr[i]	pre[i]	Explanation
0	1	1	pre[0] = arr[0] = 1
1	3	1 ^ 3 = 2	pre[1] = pre[0] ^ arr[1] = 1 ^ 3
2	4	2 ^ 4 = 6	pre[2] = pre[1] ^ arr[2] = 2 ^ 4
3	8	6 ^ 8 = 14	pre[3] = pre[2] ^ arr[3] = 6 ^ 8
So the prefix XOR array is: [1, 2, 6, 14].

2. Answer Queries Using Prefix XOR Array
Now, using the prefix XOR array, we can quickly answer each query.

Queries: [[0, 1], [1, 2], [0, 3], [3, 3]]

For each query [left, right], we calculate:

If left == 0: The result is pre[right].
Otherwise: The result is pre[right] ^ pre[left - 1].
Query	left	right	Calculation	Result
[0, 1]	0	1	pre[1] = 2	2
[1, 2]	1	2	pre[2] ^ pre[0] = 6 ^ 1 = 7	7
[0, 3]	0	3	pre[3] = 14	14
[3, 3]	3	3	pre[3] ^ pre[2] = 14 ^ 6 = 8	8
Explanation
Prefix XOR Array: This array helps to quickly compute the XOR of any subarray. The value at each index i in pre represents the XOR of all elements from the start of the array to index i.

Query Resolution: For each query [left, right]:

If left is 0, the result is simply pre[right] because it represents the XOR from the start to right.
If left is not 0, we need to exclude the part of the array before left. This is done by XORing pre[right] with pre[left - 1], which removes the XOR of elements before left.
Complexity
Time Complexity:

Preprocessing: Building the prefix XOR array takes (O(n)), where (n) is the length of the input array.
Query Processing: Each query is processed in constant time (O(1)) using the precomputed prefix XOR array.
Overall, the time complexity is (O(n + q)), where (q) is the number of queries. This is efficient given the constraints.
Space Complexity:

Prefix XOR Array: Requires (O(n)) space.
Result Array: Requires (O(q)) space.
Overall, the space complexity is (O(n + q)), which is manageable within the given constraints.
 */

/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
var xorQueries = function(arr, queries) {
    const n = arr.length;
    const pre = new Array(n);
    pre[0] = arr[0];
    
    // Compute prefix XOR array
    for (let i = 1; i < n; i++) {
        pre[i] = pre[i - 1] ^ arr[i];
    }
    
    const res = [];
    
    // Answer each query
    for (const [left, right] of queries) {
        if (left === 0) {
            res.push(pre[right]);
        } else {
            res.push(pre[right] ^ pre[left - 1]);
        }
    }
    
    return res;
};