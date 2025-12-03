/**
 * 3625. Count Number of Trapezoids II
 * Difficulty: Hard
 * 
 * You are given a 2D integer array points where points[i] = [xi, yi] represents the coordinates of the ith point on the Cartesian plane.
Return the number of unique trapezoids that can be formed by choosing any four distinct points from points.
A trapezoid is a convex quadrilateral with at least one pair of parallel sides. Two lines are parallel if and only if they have the same slope.

Example 1:
Input: points = [[-3,2],[3,0],[2,3],[3,2],[2,-3]]

Output: 2
Explanation:
There are two distinct ways to pick four points that form a trapezoid:

The points [-3,2], [2,3], [3,2], [2,-3] form one trapezoid.
The points [2,3], [3,2], [3,0], [2,-3] form another trapezoid.
Example 2:
Input: points = [[0,0],[1,0],[0,1],[2,1]]
Output: 1
Explanation:

There is only one trapezoid which can be formed.

Constraints:

4 <= points.length <= 500
–1000 <= xi, yi <= 1000
All points are pairwise distinct.
 */

/**
 * Approach
Loop over all pairs of points (i, j), i < j.

For each pair, compute:

dx = xj − xi, dy = yj − yi.

Normalize direction so we have a canonical sign
(for example, make dx > 0, or if dx == 0 then dy > 0).

g = gcd(|dx|, |dy|)

reduced direction: (ux, uy) = (dx/g, dy/g) → this describes the slope.
A value that uniquely identifies the line with that slope.
For direction (ux, uy) and a point (x, y) on the line,
the quantity ux * y − uy * x is constant for the whole line,
so I use it as the line id / “offset”.

Maintain two nested maps:

bySlope[(ux,uy)][lineId] = how many segments have this slope and lie on this line.
byVector[(dx,dy)][lineId] = how many segments have this exact vector and lie on this line.
After filling these maps, define a helper:

For a given outer map:

For each outer key (slope or vector):

Collect counts c₁, c₂, … for all its lines.
S = Σ cᵢ, sumSq = Σ cᵢ².
Number of pairs of segments on different lines is
Σ_{i<j} cᵢ cⱼ = (S² − sumSq)/2.
Add all slopes/vectors together.

Let:

A = countPairs(bySlope) → all quadrilaterals with at least one parallel pair (parallelograms counted twice).
B = countPairs(byVector) → each parallelogram contributes 2 (one for each direction), so total B = 2 * #parallelograms.
Return A − B/2.

Use 64-bit (long long / long) for the counts to avoid overflow.
 */

/**
 * @param {number[][]} points
 * @return {number}
 */
var countTrapezoids = function(points) {
    const n = points.length;
    const SHIFT = 3000;
    
    const encodePair = (a, b) => ((a + SHIFT) << 13) ^ (b + SHIFT);
    
    const gcd = (a, b) => {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b !== 0) {
            const t = a % b;
            a = b;
            b = t;
        }
        return a;
    };
    
    const bySlope = new Map();
    const byVector = new Map();
    
    const addTo = (outer, key, lineId) => {
        if (!outer.has(key)) outer.set(key, new Map());
        const inner = outer.get(key);
        inner.set(lineId, (inner.get(lineId) || 0) + 1);
    };
    
    for (let i = 0; i < n; ++i) {
        const [x1, y1] = points[i];
        for (let j = i + 1; j < n; ++j) {
            const [x2, y2] = points[j];
            
            let dx = x2 - x1;
            let dy = y2 - y1;
            
            if (dx < 0 || (dx === 0 && dy < 0)) {
                dx = -dx;
                dy = -dy;
            }
            
            const g = gcd(dx, dy);
            const ux = dx / g;
            const uy = dy / g;
            
            const lineId = ux * y1 - uy * x1;
            
            const slopeKey  = encodePair(ux, uy);
            const vectorKey = encodePair(dx, dy);
            
            addTo(bySlope, slopeKey, lineId);
            addTo(byVector, vectorKey, lineId);
        }
    }
    
    function countPairs(map) {
        let res = 0;
        for (const inner of map.values()) {
            let sum = 0;
            let sumSq = 0;
            for (const c of inner.values()) {
                sum += c;
                sumSq += c * c;
            }
            res += (sum * sum - sumSq) / 2;
        }
        return res;
    }
    
    const withParallel = countPairs(bySlope);
    const parallelogramTwo = countPairs(byVector);
    
    return withParallel - Math.floor(parallelogramTwo / 2);
};