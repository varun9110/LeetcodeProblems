/**
 * 3208. Alternating Groups II
 * Difficulty: Medium
 * 
 * There is a circle of red and blue tiles. You are given an array of integers colors and an integer k. The color of tile i is represented by colors[i]:

colors[i] == 0 means that tile i is red.
colors[i] == 1 means that tile i is blue.
An alternating group is every k contiguous tiles in the circle with alternating colors (each tile in the group except the first and last one has a different color from its left and right tiles).
Return the number of alternating groups.
Note that since colors represents a circle, the first and the last tiles are considered to be next to each other.

Example 1:
Input: colors = [0,1,0,1,0], k = 3
Output: 3
Explanation:

Alternating groups:
Example 2:
Input: colors = [0,1,0,0,1,0,1], k = 6
Output: 2
Explanation:
Alternating groups:
Example 3:
Input: colors = [1,1,0,1], k = 4
Output: 0
Explanation:
Constraints:

3 <= colors.length <= 105
0 <= colors[i] <= 1
3 <= k <= colors.length

 */

/**
 * Intuition
The problem requires finding alternating groups of length k. A key observation is that we can extend the array to simulate a cyclic sequence, ensuring we check all possible groups without worrying about wrapping around.

Approach
Extend the array
We append the first (k-1) elements to the end of the array. This simulates a cyclic sequence, allowing us to check alternating groups that might wrap around.
Sliding Window Technique:
Maintain two pointers: left and right, where right iterates over the array.
If two consecutive elements are the same, reset left = right, breaking the alternating sequence.
Whenever the window size reaches at least k, count it as a valid alternating group.
Complexity
Time complexity: O(n + k)

Space complexity: O(k)
 */

/**
 * @param {number[]} colors
 * @param {number} k
 * @return {number}
 */
var numberOfAlternatingGroups = function(colors, k) {
    colors.push(...colors.slice(0, k - 1)); 
    let count = 0;
    let left = 0;
    
    for (let right = 0; right < colors.length; right++) {
        if (right > 0 && colors[right] === colors[right - 1]) {
            left = right;  
        }
        
        if (right - left + 1 >= k) {
            count++;  
        }
    }
    
    return count;
};