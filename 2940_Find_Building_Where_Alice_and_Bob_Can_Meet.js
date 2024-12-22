/**
 * 2940. Find Building Where Alice and Bob Can Meet
 * Difficulty: Hrad
 * 
 * You are given a 0-indexed array heights of positive integers, where heights[i] represents the height of the ith building.

If a person is in building i, they can move to any other building j if and only if i < j and heights[i] < heights[j].
You are also given another array queries where queries[i] = [ai, bi]. On the ith query, Alice is in building ai while Bob is in building bi.

Return an array ans where ans[i] is the index of the leftmost building where Alice and Bob can meet on the ith query. If Alice and Bob cannot move to a 
common building on query i, set ans[i] to -1.

Example 1:

Input: heights = [6,4,8,5,2,7], queries = [[0,1],[0,3],[2,4],[3,4],[2,2]]
Output: [2,5,-1,5,2]
Explanation: In the first query, Alice and Bob can move to building 2 since heights[0] < heights[2] and heights[1] < heights[2]. 
In the second query, Alice and Bob can move to building 5 since heights[0] < heights[5] and heights[3] < heights[5]. 
In the third query, Alice cannot meet Bob since Alice cannot move to any other building.
In the fourth query, Alice and Bob can move to building 5 since heights[3] < heights[5] and heights[4] < heights[5].
In the fifth query, Alice and Bob are already in the same building.  
For ans[i] != -1, It can be shown that ans[i] is the leftmost building where Alice and Bob can meet.
For ans[i] == -1, It can be shown that there is no building where Alice and Bob can meet.
Example 2:

Input: heights = [5,3,8,2,6,1,4,6], queries = [[0,7],[3,5],[5,2],[3,0],[1,6]]
Output: [7,6,-1,4,6]
Explanation: In the first query, Alice can directly move to Bob's building since heights[0] < heights[7].
In the second query, Alice and Bob can move to building 6 since heights[3] < heights[6] and heights[5] < heights[6].
In the third query, Alice cannot meet Bob since Bob cannot move to any other building.
In the fourth query, Alice and Bob can move to building 4 since heights[3] < heights[4] and heights[0] < heights[4].
In the fifth query, Alice can directly move to Bob's building since heights[1] < heights[6].
For ans[i] != -1, It can be shown that ans[i] is the leftmost building where Alice and Bob can meet.
For ans[i] == -1, It can be shown that there is no building where Alice and Bob can meet.

Constraints:
1 <= heights.length <= 5 * 104
1 <= heights[i] <= 109
1 <= queries.length <= 5 * 104
queries[i] = [ai, bi]
0 <= ai, bi <= heights.length - 1
 */


/**
 * Intuition
The problem requires finding the leftmost building taller than a given building within a specified range. To solve this efficiently, we need to:

Preprocess the heights of buildings to allow for quick access to the maximum height in any given range.
Use binary search to find the leftmost taller building, based on the results of range queries.
To answer range maximum queries efficiently, we will use a Sparse Table structure, which allows for constant-time query processing after an O(nlogn) preprocessing step.

⚙️ Approach
1. Preprocessing with Sparse Table 📊
We build a Sparse Table for the heights array. This allows us to efficiently find the maximum value in any given range. The preprocessing step takes O(nlogn) time.
Each range query can then be answered in constant time O(1) by simply looking up the appropriate entry in the sparse table.
2. Logarithmic Precomputation for Fast Access 🔢
We precompute the logarithmic values for fast access during sparse table queries. These values are stored in the logValues[] array and allow us to quickly compute the maximum power of 2 that fits into a range.
This array helps determine the maximum range we can query within the sparse table using binary lifting.
3. Binary Search to Find Leftmost Taller Building 🔍
For each query, perform a binary search within the range between the rightmost building R and the last building n. The goal is to find the first building taller than the building at position R.
The binary search takes O(logn) time.
4. Query Handling 📋
For each query:
If the building at position R is taller than the building at position L, we directly return the position R.
Otherwise, we perform a binary search to find the leftmost building taller than the given building.
If L == R, we return L immediately.
5. Edge Case Handling ⚠️
If the two positions L and R are the same, the result is L because the building at position L is the only building being considered.
⏱️ Complexity
🕒 Time Complexity:
Preprocessing the sparse table takes O(nlogn).
For each query, we perform:
Binary Search: O(logn).
Sparse Table Query: O(1).
Hence, the total time complexity for q queries is:
O(nlogn+qlogn).
💾 Space Complexity:
The space complexity is mainly dominated by the Sparse Table and logarithmic array:
Sparse Table: O(nlogn) space.
Logarithmic Array: O(n) space.
Therefore, the total space complexity is:
O(nlogn).
 */

/**
 * @param {number[]} heights
 * @param {number[][]} queries
 * @return {number[]}
 */
var leftmostBuildingQueries = function(heights, queries) {
    const n = heights.length;
    const st = Array.from({ length: n }, () => Array(20).fill(0));
    const Log = Array(n + 1).fill(0);
    Log[0] = -1;

    for (let i = 1; i <= n; i++) {
        Log[i] = Log[i >> 1] + 1;
    }

    for (let i = 0; i < n; i++) {
        st[i][0] = heights[i];
    }

    for (let i = 1; i < 20; i++) {
        for (let j = 0; j + (1 << i) <= n; j++) {
            st[j][i] = Math.max(st[j][i - 1], st[j + (1 << (i - 1))][i - 1]);
        }
    }

    const res = [];

    for (let i = 0; i < queries.length; i++) {
        let [l, r] = queries[i];
        if (l > r) {
            [l, r] = [r, l];
        }

        if (l === r) {
            res.push(l);
            continue;
        }

        if (heights[r] > heights[l]) {
            res.push(r);
            continue;
        }

        const maxHeight = Math.max(heights[l], heights[r]);
        let left = r + 1, right = n, mid;

        while (left < right) {
            mid = Math.floor((left + right) / 2);
            const k = Log[mid - r + 1];
            const maxInRange = Math.max(st[r][k], st[mid - (1 << k) + 1][k]);

            if (maxInRange > maxHeight) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        res.push(left === n ? -1 : left);
    }

    return res;
};