/**
 * 1292. Maximum Side Length of a Square with Sum Less than or Equal to Threshold
 * Difficulty: Medium
 * 
 * Given a m x n matrix mat and an integer threshold, return the maximum side-length of a square with a sum less than or equal to threshold or return 0 if there is no such square.

Example 1:

Input: mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], threshold = 4
Output: 2
Explanation: The maximum side length of square with sum less than 4 is 2 as shown.
Example 2:
Input: mat = [[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], threshold = 1
Output: 0
 
Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 300
0 <= mat[i][j] <= 104
0 <= threshold <= 105
 */

/**
 * 🧠 Intuition
The problem asks us to find the largest possible square submatrix whose sum of elements does not exceed a given threshold.

A brute-force approach would be to:

Try all possible square sizes
Try all positions for each square
Compute the sum every time
But this would be too slow, because recalculating sums repeatedly costs a lot.

So the key ideas are:

Use Prefix Sum → so we can compute the sum of any submatrix in O(1)
Binary Search on square size → because if a square of size k is valid, then all sizes < k are also valid
This combination gives us an efficient and clean solution.

🚀 Approach
🔹 Step 1: Build a 2D Prefix Sum Matrix
We convert the original matrix into a prefix sum matrix pref where:

pref[i][j] = sum of all elements in rectangle (0,0) → (i,j)

This allows us to calculate the sum of any submatrix using the formula:

sum = pref[x2][y2] - pref[x1-1][y2] - pref[x2][y1-1] + pref[x1-1][y1-1]

This calculation works in constant time.

🔹 Step 2: Check if a Square of Size k is Valid
For a given side length k, we:

Slide a k × k window across the matrix
Use the prefix sum formula to compute the sum
If any such square has sum ≤ threshold, then size k is valid
This logic is implemented in the helper function isValid().

🔹 Step 3: Binary Search on the Answer
The smallest possible square size is 1
The largest possible square size is min(n, m)
Using binary search:

If a square of size mid is valid → try larger sizes
Otherwise → try smaller sizes
This reduces the number of checks dramatically.

⏱️ Complexity
✅ Time Complexity
Prefix sum construction: O(n × m)
Each validity check: O(n × m)
Binary search over sizes: O(log(min(n, m)))
📌 Total Time Complexity:
O(N × M × K^2)

✅ Space Complexity
Prefix sum matrix: O(n × m)
📌 Total Space Complexity:
O(n × m)
 */


/**
 * @param {number[][]} mat
 * @param {number} threshold
 * @return {number}
 */

var isValid = function (pref, k, limit) {
        const n = pref.length;
        const m = pref[0].length;

        for (let i = k - 1; i < n; i++) {
            for (let j = k - 1; j < m; j++) {
                const x1 = i - k + 1;
                const y1 = j - k + 1;

                let sum = pref[i][j];
                if (x1 > 0) sum -= pref[x1 - 1][j];
                if (y1 > 0) sum -= pref[i][y1 - 1];
                if (x1 > 0 && y1 > 0) sum += pref[x1 - 1][y1 - 1];

                if (sum <= limit)
                    return true;
            }
        }
        return false;
    }

    var maxSideLength = function(mat, threshold) {
        const n = mat.length;
        const m = mat[0].length;

        const pref = mat.map(row => [...row]);

        // Row-wise prefix sum
        for (let i = 0; i < n; i++) {
            for (let j = 1; j < m; j++) {
                pref[i][j] += pref[i][j - 1];
            }
        }

        // Column-wise prefix sum
        for (let j = 0; j < m; j++) {
            for (let i = 1; i < n; i++) {
                pref[i][j] += pref[i - 1][j];
            }
        }

        let low = 1, high = Math.min(n, m);
        let ans = 0;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (isValid(pref, mid, threshold)) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }