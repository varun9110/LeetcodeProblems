/**
 * 2438. Range Product Queries of Powers
 * Difficutly: Medium
 * 
 * Given a positive integer n, there exists a 0-indexed array called powers, composed of the minimum number of powers of 2 that sum to n. The array is sorted in non-decreasing order, and there is only one way to form the array.

You are also given a 0-indexed 2D integer array queries, where queries[i] = [lefti, righti]. Each queries[i] represents a query where you have to find the product of all powers[j] with lefti <= j <= righti.

Return an array answers, equal in length to queries, where answers[i] is the answer to the ith query. Since the answer to the ith query may be too large, each answers[i] should be returned modulo 109 + 7.

 

Example 1:

Input: n = 15, queries = [[0,1],[2,2],[0,3]]
Output: [2,4,64]
Explanation:
For n = 15, powers = [1,2,4,8]. It can be shown that powers cannot be a smaller size.
Answer to 1st query: powers[0] * powers[1] = 1 * 2 = 2.
Answer to 2nd query: powers[2] = 4.
Answer to 3rd query: powers[0] * powers[1] * powers[2] * powers[3] = 1 * 2 * 4 * 8 = 64.
Each answer modulo 109 + 7 yields the same answer, so [2,4,64] is returned.
Example 2:

Input: n = 2, queries = [[0,0]]
Output: [2]
Explanation:
For n = 2, powers = [2].
The answer to the only query is powers[0] = 2. The answer modulo 109 + 7 is the same, so [2] is returned.
 

Constraints:

1 <= n <= 109
1 <= queries.length <= 105
0 <= starti <= endi < powers.length
 */

/**
 * Intuition
According to the problem description, we need to decompose n into the smallest number of powers of 2, which suggests writing n in binary form. If the k-th binary digit from low to high (where k≥0) is 1, then 2 
k
  is included in the decomposition.

For example, when n=11, its binary representation is (1011) 
2
​
 , and the 0th, 1st, and 3rd binary digits from low to high are 1. So, it is decomposed as [2 
0
 ,2 
1
 ,2 
3
 ]=[1,2,8].

After obtaining the decomposition of n, and since the problem guarantees that n≥10 
9
 <2 
30
 −1, the decomposition array will contain at most 29 elements. For each query [left,right], we can directly traverse the corresponding elements in the decomposition array and compute the answer, with the time complexity of a single query being O(logn).

Furthermore, since the total number of different queries is at most  
2
29×28
​
 +29=435, we can also precompute the answer to each query in advance. This results in a preprocessing time complexity of O(log 
2
 n), reducing the time complexity of each query to O(1) thereafter.
 */

 /**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var productQueries = function(n, queries) {
    const mod = 1000000007;
    const bins = [];
    let rep = 1;
    while (n > 0) {
        if (n % 2 === 1) {
            bins.push(rep);
        }
        n = Math.floor(n / 2);
        rep *= 2;
    }

    const ans = [];
    for (const [start, end] of queries) {
        let cur = 1;
        for (let i = start; i <= end; i++) {
            cur = (cur * bins[i]) % mod;
        }
        ans.push(cur);
    }
    return ans;
};