/**
 * 3531. Count Covered Buildings
 * Difficulty: Medium
 * 
 * You are given a positive integer n, representing an n x n city. You are also given a 2D grid buildings, where buildings[i] = [x, y] denotes a unique building located at coordinates [x, y].

A building is covered if there is at least one building in all four directions: left, right, above, and below.

Return the number of covered buildings.

 

Example 1:



Input: n = 3, buildings = [[1,2],[2,2],[3,2],[2,1],[2,3]]

Output: 1

Explanation:

Only building [2,2] is covered as it has at least one building:
above ([1,2])
below ([3,2])
left ([2,1])
right ([2,3])
Thus, the count of covered buildings is 1.
Example 2:



Input: n = 3, buildings = [[1,1],[1,2],[2,1],[2,2]]

Output: 0

Explanation:

No building has at least one building in all four directions.
Example 3:



Input: n = 5, buildings = [[1,3],[3,2],[3,3],[3,5],[5,3]]

Output: 1

Explanation:

Only building [3,3] is covered as it has at least one building:
above ([1,3])
below ([5,3])
left ([3,2])
right ([3,5])
Thus, the count of covered buildings is 1.
 

Constraints:

2 <= n <= 105
1 <= buildings.length <= 105 
buildings[i] = [x, y]
1 <= x, y <= n
All coordinates of buildings are unique.
 */

/**
 * Intuition
The problem requires us to determine which buildings are "covered," meaning they have at least one building in all four cardinal directions: left, right, above, and below.
At first glance, one might think of scanning entire rows and columns or sorting all coordinates. However, we only need to know if a building lies strictly between the minimum and maximum coordinates in its row and column. If so, it guarantees the presence of neighbors in all four directions.

Approach
Build four hash maps:
rowMin[x] → smallest y in row x
rowMax[x] → largest y in row x
colMin[y] → smallest x in column y
colMax[y] → largest x in column y
For each building [x, y]:
Check if y > rowMin[x] (left exists) and y < rowMax[x] (right exists).
Check if x > colMin[y] (above exists) and x < colMax[y] (below exists).
If all four conditions hold, count the building as covered.
Return the total count.
Complexity
Time complexity:
(O(m)), where (m=buildings.length). We only loop through the buildings once to populate min/max maps and once more to check coverage.

Space complexity:
(O(m)), for storing min/max values in hash maps for rows and columns.
 */

/**
 * @param {number} n - size of the city (n x n)
 * @param {number[][]} buildings - list of building coordinates [x, y]
 * @return {number} - number of covered buildings
 */
function countCoveredBuildings(n, buildings) {
  // Maps to store min/max for each row and column
  let rowMin = new Map();
  let rowMax = new Map();
  let colMin = new Map();
  let colMax = new Map();

  // Step 1: Populate min/max maps
  for (let [x, y] of buildings) {
    // Row min/max
    rowMin.set(x, Math.min(rowMin.get(x) ?? Infinity, y));
    rowMax.set(x, Math.max(rowMax.get(x) ?? -Infinity, y));

    // Column min/max
    colMin.set(y, Math.min(colMin.get(y) ?? Infinity, x));
    colMax.set(y, Math.max(colMax.get(y) ?? -Infinity, x));
  }

  // Step 2: Check each building
  let coveredCount = 0;
  for (let [x, y] of buildings) {
    let hasLeft  = y > rowMin.get(x);
    let hasRight = y < rowMax.get(x);
    let hasAbove = x > colMin.get(y);
    let hasBelow = x < colMax.get(y);

    if (hasLeft && hasRight && hasAbove && hasBelow) {
      coveredCount++;
    }
  }

  return coveredCount;
}