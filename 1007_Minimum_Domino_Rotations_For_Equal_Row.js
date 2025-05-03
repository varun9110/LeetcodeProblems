/**
 * 1007. Minimum Domino Rotations For Equal Row
 * Difficulty: Medium
 * 
 * In a row of dominoes, tops[i] and bottoms[i] represent the top and bottom halves of the ith domino. (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile.)

We may rotate the ith domino, so that tops[i] and bottoms[i] swap values.

Return the minimum number of rotations so that all the values in tops are the same, or all the values in bottoms are the same.

If it cannot be done, return -1.

Example 1:

Input: tops = [2,1,2,4,2,2], bottoms = [5,2,6,2,3,2]
Output: 2
Explanation: 
The first figure represents the dominoes as given by tops and bottoms: before we do any rotations.
If we rotate the second and fourth dominoes, we can make every value in the top row equal to 2, as indicated by the second figure.
Example 2:
Input: tops = [3,5,1,2,3], bottoms = [3,6,3,3,4]
Output: -1
Explanation: 
In this case, it is not possible to rotate the dominoes to make one row of values equal.

Constraints:
2 <= tops.length <= 2 * 104
bottoms.length == tops.length
1 <= tops[i], bottoms[i] <= 6
 */


/**
 * Intuition
This problem requires us to rotate dominoes so that all numbers on either the top (tops) or bottom (bottoms) are the same, and find the minimum number of rotations needed.

We observe that:

To successfully unify the dominoes, the final unified number must come from the first domino, meaning it can only be either tops[0] or bottoms[0].

For each candidate number, we iterate through all dominoes and count the number of rotations needed for the top or bottom:

If a domino cannot match the candidate number on either top or bottom, then that candidate cannot achieve unification.
Otherwise, we count the minimal number of rotations needed for either the top or the bottom.
By separately calculating the rotations needed for the two candidates, we take the minimum as the answer; if neither can achieve unification, we return -1.

Approach
Step 1: Initialize candidate targets
We take the top and bottom numbers from the first domino as candidate targets:

const candidates = [tops[0], bottoms[0]];
Step 2: Calculate the minimum number of rotations
We define a helper function rotations(target: number) to calculate the minimum number of rotations needed to make all dominoes show the specified number:

function rotations(target: number): number {
  let rotateTop = 0;      // number of top rotations
  let rotateBottom = 0;   // number of bottom rotations

  for (let i = 0; i < tops.length; i++) {
    // If neither top nor bottom matches the target, then this target cannot be achieved
    if (tops[i] !== target && bottoms[i] !== target) {
      return Infinity;
    }

    // If the top does not match the target, we need to rotate the top once
    if (tops[i] !== target) {
      rotateTop++;
    }

    // If the bottom does not match the target, we need to rotate the bottom once
    if (bottoms[i] !== target) {
      rotateBottom++;
    }
  }

  // Return the smaller of the two rotation counts
  return Math.min(rotateTop, rotateBottom);
}
Step 3: Calculate and return the final answer
We call the rotations function separately for each candidate number and take the smaller value as the final answer:

const result = Math.min(rotations(candidates[0]), rotations(candidates[1]));
return result === Infinity ? -1 : result;
Complexity
Time complexity:

Each call to rotations needs to iterate through all dominoes, which has length n, and we call it 2 times in total.
Therefore, the total time complexity is O(n).
Space complexity:

The program only uses a few constant-level auxiliary variables (such as counters), and does not occupy additional space proportional to the input size.
Therefore, the total space complexity is O(1).
 */


/**
 * @param {number[]} tops
 * @param {number[]} bottoms
 * @return {number}
 */
function minDominoRotations(tops, bottoms) {
  const candidates = [tops[0], bottoms[0]];

  /**
   * Calculate the number of rotations needed to make all elements in the array equal to target.
   * @param target {number} - The target number to match.
   * @returns {number} - The minimum number of rotations needed.
   */
  function rotations(target) {
    let rotateTop = 0;
    let rotateBottom = 0;

    for (let i = 0; i < tops.length; i++) {
      if (tops[i] !== target && bottoms[i] !== target) {
        return Infinity;
      }

      // Rotate the top or bottom to match the target
      if (tops[i] !== target) {
        rotateTop++;
      }
      
      // Rotate the bottom to match the target
      if (bottoms[i] !== target) {
        rotateBottom++;
      }
    }
    return Math.min(rotateTop, rotateBottom);
  }

  const result = Math.min(rotations(candidates[0]), rotations(candidates[1]));
  return result === Infinity ? -1 : result;
}