/**
 * 3443. Maximum Manhattan Distance After K Changes
 * Difficulty: Medium
 * 
 * You are given a string s consisting of the characters 'N', 'S', 'E', and 'W', where s[i] indicates movements in an infinite grid:

'N' : Move north by 1 unit.
'S' : Move south by 1 unit.
'E' : Move east by 1 unit.
'W' : Move west by 1 unit.
Initially, you are at the origin (0, 0). You can change at most k characters to any of the four directions.
Find the maximum Manhattan distance from the origin that can be achieved at any time while performing the movements in order.
The Manhattan Distance between two cells (xi, yi) and (xj, yj) is |xi - xj| + |yi - yj|.

Example 1:
Input: s = "NWSE", k = 1

Output: 3
Explanation:
Change s[2] from 'S' to 'N'. The string s becomes "NWNE".
Movement	Position (x, y)	Manhattan Distance	Maximum
s[0] == 'N'	(0, 1)	0 + 1 = 1	1
s[1] == 'W'	(-1, 1)	1 + 1 = 2	2
s[2] == 'N'	(-1, 2)	1 + 2 = 3	3
s[3] == 'E'	(0, 2)	0 + 2 = 2	3
The maximum Manhattan distance from the origin that can be achieved is 3. Hence, 3 is the output.
Example 2:
Input: s = "NSWWEW", k = 3
Output: 6
Explanation:
Change s[1] from 'S' to 'N', and s[4] from 'E' to 'W'. The string s becomes "NNWWWW".
The maximum Manhattan distance from the origin that can be achieved is 6. Hence, 6 is the output.

Constraints:

1 <= s.length <= 105
0 <= k <= s.length
s consists of only 'N', 'S', 'E', and 'W'.
 */

/**
 * Intuition💡
We need to maximize the Manhattan Distance (|x| + |y|) from the origin (0, 0) after performing movements from the string s, with the option to change at most k directions.

Approach
1 . Movement Impact:

'N' → y += 1
'S' → y -= 1
'E' → x += 1
'W' → x -= 1
2 . Effect of Changing Directions:

Changing 'S' to 'N' converts y -= 1 to y += 1 → net effect: y += 2.
Similarly, changing 'W' to 'E' gives x += 2.
Each optimal change can increase the Manhattan Distance by 2.
3 . Optimal Strategy:

Track counts of each direction (north, south, east, west).

At each step, compute current x and y displacements.

Calculate the current Manhattan Distance (MD = |x| + |y|).

Determine the maximum possible increase in MD using k changes:

Each change can contribute +2 to MD.
The number of changes is limited by k and remaining movements.
✅IF YOU LIKE THIS SOLUTION, PLEASE UPVOTE AT THE END😊 ✅

Step-by-Step Approach
1 . Initialize Counters (north, south, east, west) to 0.

2 . Iterate Through Each Movement in s:

Update the respective direction counter.
Calculate x = east - west and y = north - south.
Compute MD = |x| + |y|.
3 . Maximize MD Using k Changes:

The potential increase is 2 * k (if all changes optimally increase MD).
However, we cannot change more directions than movements processed (i + 1).
Hence, the actual increase is min(2 * k, (i + 1) - MD).
Update Maximum Distance (ans) if the computed distance (MD + increase) is greater.

Why (i + 1) - MD?
i + 1 = number of movements processed.
MD = current Manhattan Distance.
(i + 1) - MD =** number of changes needed** to align all movements in the same direction (maximizing MD).
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxDistance = function(s, k) {
    let ans = 0;
    let north = 0, south = 0, east = 0, west = 0;
    
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === 'N') north++;
        else if (c === 'S') south++;
        else if (c === 'E') east++;
        else if (c === 'W') west++;
        
        const x = Math.abs(north - south);
        const y = Math.abs(east - west);
        const MD = x + y;
        const dis = MD + Math.min(2 * k, i + 1 - MD);
        ans = Math.max(ans, dis);
    }
    
    return ans;
};