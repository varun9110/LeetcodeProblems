/**
 * 1217. Minimum Cost to Move Chips to The Same Position
 * Difficulty: Easy
 * We have n chips, where the position of the ith chip is position[i].
We need to move all the chips to the same position. In one step, we can change the position of the ith chip from position[i] to:
position[i] + 2 or position[i] - 2 with cost = 0.
position[i] + 1 or position[i] - 1 with cost = 1.
Return the minimum cost needed to move all the chips to the same position.

Example 1:
Input: position = [1,2,3]
Output: 1
Explanation: First step: Move the chip at position 3 to position 1 with cost = 0.
Second step: Move the chip at position 2 to position 1 with cost = 1.
Total cost is 1.
Example 2:
Input: position = [2,2,2,3,3]
Output: 2
Explanation: We can move the two chips at position  3 to position 2. Each move has cost = 1. The total cost = 2.
Example 3:
Input: position = [1,1000000000]
Output: 1
 
Constraints:
1 <= position.length <= 100
1 <= position[i] <= 10^9
 */

/**
 * Approach:
 * Basically we have to find the count of odd and evens. which ever is min basically it'll be that much count of moves that we have to make.
 *
 */

var minCostToMoveChips = function (position) {
  var odd = 0;
  var even = 0;
  position.map((x) => (x % 2 ? (odd += 1) : (even += 1)));
  return Math.min(odd, even);
};
