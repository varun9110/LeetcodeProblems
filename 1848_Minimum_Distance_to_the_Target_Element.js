/**
 * 1848. Minimum Distance to the Target Element
 * Difficulty: Easy
 * Given an integer array nums (0-indexed) and two integers target and start, find an index i such that nums[i] == target and abs(i - start) is minimized. 
 * Note that abs(x) is the absolute value of x.

Return abs(i - start).
It is guaranteed that target exists in nums.

Example 1:
Input: nums = [1,2,3,4,5], target = 5, start = 3
Output: 1
Explanation: nums[4] = 5 is the only value equal to target, so the answer is abs(4 - 3) = 1.
Example 2:
Input: nums = [1], target = 1, start = 0
Output: 0
Explanation: nums[0] = 1 is the only value equal to target, so the answer is abs(0 - 0) = 0.
Example 3:
Input: nums = [1,1,1,1,1,1,1,1,1,1], target = 1, start = 0
Output: 0
Explanation: Every value of nums is 1, but nums[0] minimizes abs(i - start), which is abs(0 - 0) = 0.

Constraints:
1 <= nums.length <= 1000
1 <= nums[i] <= 104
0 <= start < nums.length
target is in nums.
 */

/**
 * Approch:
 * Iterate through all the elements and check if the element is === target. if yes then find the abs as per the formula. check if the result is undefined.
 * If yes then store this value to the result and if not then check if the current evaluation is smaller than the result.
 * If yes then store that in the result
 */

var getMinDistance = function(nums, target, start) {
    let result;
    for(let i=0; i<nums.length; i++){
        if(nums[i] === target){
            console.log(i, Math.abs(i-start));
            if(result === undefined){
                result = Math.abs(i-start);
            }
            result = Math.min(result, Math.abs(i-start));
        }
    }
    return result;
};


/**
 * This appraoch is a little refined, where we are marking values that are not equal to target to null and then iterating on the new array and then doing the same 
 * functionality 
 */

var getMinDistance = function(nums, target, start) {
  let dif;

  nums
    .map((num) => (num == target ? num : null))
    .forEach((el, i) => {
      if (el !== null) {
        const currDif = Math.abs(i - start);

        if (dif == undefined) {
          dif = currDif;
        } else if (currDif < dif) {
          dif = currDif;
        }
      }
    });

  return dif;  
};