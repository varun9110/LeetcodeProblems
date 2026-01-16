/**
 * 2975. Maximum Square Area by Removing Fences From a Field
 * Difficulty: Medium
 * 
 * There is a large (m - 1) x (n - 1) rectangular field with corners at (1, 1) and (m, n) containing some horizontal and vertical fences given in arrays hFences and vFences respectively.

Horizontal fences are from the coordinates (hFences[i], 1) to (hFences[i], n) and vertical fences are from the coordinates (1, vFences[i]) to (m, vFences[i]).

Return the maximum area of a square field that can be formed by removing some fences (possibly none) or -1 if it is impossible to make a square field.

Since the answer may be large, return it modulo 109 + 7.

Note: The field is surrounded by two horizontal fences from the coordinates (1, 1) to (1, n) and (m, 1) to (m, n) and two vertical fences from the coordinates (1, 1) to (m, 1) and (1, n) to (m, n). These fences cannot be removed.

 

Example 1:



Input: m = 4, n = 3, hFences = [2,3], vFences = [2]
Output: 4
Explanation: Removing the horizontal fence at 2 and the vertical fence at 2 will give a square field of area 4.
Example 2:



Input: m = 6, n = 7, hFences = [2], vFences = [4]
Output: -1
Explanation: It can be proved that there is no way to create a square field by removing fences.
 

Constraints:

3 <= m, n <= 109
1 <= hFences.length, vFences.length <= 600
1 < hFences[i] < m
1 < vFences[i] < n
hFences and vFences are unique.
 */

/**
 * 🧠 Intuition
We have fences placed on two sides (height + width).
The gaps between fences create possible square sides.

So:
✔ If a horizontal gap = vertical gap → we can build a square with that side.
✔ We want the largest such matching gap.
✔ If none match → answer = -1.

🔧 Approach
Sort fences.
Add boundary fences at start (1) and end (limit).
Compute all possible horizontal distances and store in a set.
For every vertical distance, check if it exists in horizontal set.
Track maximum, square it, mod it.
🪜 Step-by-Step
✂️ Cut fences horizontally + vertically
📏 Calculate all gap lengths on horizontal side
📦 Store them in a set for quick lookup
🕵️ Search vertical gaps, check matches
🏆 Keep biggest matching gap (square side)
🧮 Square it and mod
❌ If none match → return -1

📌 Example
Suppose:

height = 10, width = 12  
hFences = [2, 8]  
vFences = [3, 6, 10]
Horizontal distances → {1,6,8}
Vertical distances → {3,4,7,10}

Largest match = none → return -1

If vertical had a 6, result → 6² = 36

Complexity
Time complexity: O(M∗N+(M 
2
 +N 
2
 ))
Space complexity: O(M 
2
 +N 
2
 )
 */



/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} hFences
 * @param {number[]} vFences
 * @return {number}
 */
var maximizeSquareArea = function(m, n, hFences, vFences) {
     const MOD = 1000000007n;

    const prep = (cuts, limit) => [1, ...cuts.sort((a,b)=>a-b), limit];

    const h = prep(hFences, m);
    const v = prep(vFences, n);

    const set = new Set();

    for (let i=0; i<h.length; i++)
        for (let j=i+1; j<h.length; j++)
            set.add(h[j]-h[i]);

    let best = 0;

    for (let i=0; i<v.length; i++)
        for (let j=i+1; j<v.length; j++) {
            const d = v[j]-v[i];
            if (d > best && set.has(d)) best = d;
        }

    if (best === 0) return -1;

    return Number((BigInt(best) * BigInt(best)) % MOD);
};