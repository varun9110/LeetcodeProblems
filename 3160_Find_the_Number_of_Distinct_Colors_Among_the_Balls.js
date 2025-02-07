/**
 * 3160. Find the Number of Distinct Colors Among the Balls
 * Difficulty: Medium
 * 
 * You are given an integer limit and a 2D array queries of size n x 2.

There are limit + 1 balls with distinct labels in the range [0, limit]. Initially, all balls are uncolored. 
For every query in queries that is of the form [x, y], you mark ball x with the color y. After each query, 
you need to find the number of distinct colors among the balls.

Return an array result of length n, where result[i] denotes the number of distinct colors after ith query.
Note that when answering a query, lack of a color will not be considered as a color.


Example 1:
Input: limit = 4, queries = [[1,4],[2,5],[1,3],[3,4]]
Output: [1,2,2,3]
Explanation:

After query 0, ball 1 has color 4.
After query 1, ball 1 has color 4, and ball 2 has color 5.
After query 2, ball 1 has color 3, and ball 2 has color 5.
After query 3, ball 1 has color 3, ball 2 has color 5, and ball 3 has color 4.
Example 2:
Input: limit = 4, queries = [[0,1],[1,2],[2,2],[3,4],[4,5]]
Output: [1,2,2,3,4]
Explanation:

After query 0, ball 0 has color 1.
After query 1, ball 0 has color 1, and ball 1 has color 2.
After query 2, ball 0 has color 1, and balls 1 and 2 have color 2.
After query 3, ball 0 has color 1, balls 1 and 2 have color 2, and ball 3 has color 4.
After query 4, ball 0 has color 1, balls 1 and 2 have color 2, ball 3 has color 4, and ball 4 has color 5.
 

Constraints:

1 <= limit <= 109
1 <= n == queries.length <= 105
queries[i].length == 2
0 <= queries[i][0] <= limit
1 <= queries[i][1] <= 109
 */

/**
 * Intuition:
Track Colors: Maintain a map recording each ball’s current color.
Count Frequencies: Keep a frequency map for how many balls have each color.
Update on Repaint: For every query, if a ball is repainted, decrement the count of its old color (removing it if zero) and increment the new color’s count.
Example
Query Index	Query	Operation	Mapping (Ball: Color)	Distinct Colors
1	[1, 🔴]	Paint ball 1 with 🔴	1: 🔴	{🔴} → 1
2	[2, 🟢]	Paint ball 2 with 🟢	1: 🔴, 2: 🟢	{🔴, 🟢} → 2
3	[3, 🔵]	Paint ball 3 with 🔵	1: 🔴, 2: 🟢, 3: 🔵	{🔴, 🟢, 🔵} → 3
4	[1, 🟡]	Repaint ball 1 from 🔴 to 🟡	1: 🟡, 2: 🟢, 3: 🔵	{🟡, 🟢, 🔵} → 3
5	[4, 🔴]	Paint ball 4 with 🔴	1: 🟡, 2: 🟢, 3: 🔵, 4: 🔴	{🟡, 🟢, 🔵, 🔴} → 4
6	[2, 🔵]	Repaint ball 2 from 🟢 to 🔵	1: 🟡, 2: 🔵, 3: 🔵, 4: 🔴	{🟡, 🔵, 🔴} → 3
7	[3, 🟢]	Repaint ball 3 from 🔵 to 🟢	1: 🟡, 2: 🔵, 3: 🟢, 4: 🔴	{🟡, 🔵, 🟢, 🔴} → 4
8	[5, 🟣]	Paint ball 5 with 🟣	1: 🟡, 2: 🔵, 3: 🟢, 4: 🔴, 5: 🟣	{🟡, 🔵, 🟢, 🔴, 🟣} → 5
9	[1, 🔴]	Repaint ball 1 from 🟡 to 🔴	1: 🔴, 2: 🔵, 3: 🟢, 4: 🔴, 5: 🟣	{🔴, 🔵, 🟢, 🟣} → 4
10	[2, 🟡]	Repaint ball 2 from 🔵 to 🟡	1: 🔴, 2: 🟡, 3: 🟢, 4: 🔴, 5: 🟣	{🔴, 🟡, 🟢, 🟣} → 4
Complexity:

Time: (O(n)) on average for processing (n) queries.
Space: (O(n)) in the worst case for the maps.
 */

/**
 * @param {number} limit
 * @param {number[][]} queries
 * @return {number[]}
 */
var queryResults = function(limit, queries) {
    const ball = new Map(), color = new Map(), ans = [];
    let distinct = 0;
    for (const [pos, c] of queries) {
        if (ball.has(pos)) {
            let cnt = color.get(ball.get(pos)) - 1;
            if (cnt === 0) { color.delete(ball.get(pos)); distinct--; }
            else color.set(ball.get(pos), cnt);
        }
        ball.set(pos, c);
        let cnt = (color.get(c) || 0) + 1;
        color.set(c, cnt);
        if (cnt === 1) distinct++;
        ans.push(distinct);
    }
    return ans;
};