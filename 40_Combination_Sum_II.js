/**
 * 40. Combination Sum II
 * Difficulty: Medium
 * 
 * Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.
Each number in candidates may only be used once in the combination.
Note: The solution set must not contain duplicate combinations.

Example 1:
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
Example 2:
Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]

Constraints:
1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30
 */

/**
 * Approach:
 * Firstly we can sort the array in ascending order, this way we can definitly find the point after which no other element after this will result in sum lower to the target.
 * Next, we need recurrsion to find the possible combinations.
 * Now, iterate through the recurrsive functions to parsing index, sum and the current array as the parameters.
 * Exit conditions are : 1. if the sum is greater than sum then simply return. 2. if sum===target then push the  sub array in the result and return.
 *
 * now inside the function iterate through the current index to the last and keep recurrsion call with i+1 as new index, sum+ arryay[element] and adding the element to the
 * temp array.
 *
 * Best way to understand is dry run the algo below.
 */

var combinationSum2 = function (candidates, target) {
  candidates.sort((a, b) => a - b);
  let res = [];

  let iterate = (index, sum, temp) => {
    if (sum > target) return;
    if (sum == target) {
      res.push(temp);
      return;
    }
    // 1 1 2 5 6 7 10
    for (let i = index; i < candidates.length; i++) {
      if (i != index && candidates[i] == candidates[i - 1]) continue;
      iterate(i + 1, sum + candidates[i], [...temp, candidates[i]]);
    }
  };
  iterate(0, 0, []);
  return res;
};
