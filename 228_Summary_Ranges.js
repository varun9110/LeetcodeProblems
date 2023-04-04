/**
 * 228. Summary Ranges
 * Difficulty: Easy
 * 
 * You are given a sorted unique integer array nums.
A range [a,b] is the set of all integers from a to b (inclusive).
Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, 
and there is no integer x such that x is in one of the ranges but not in nums.
Each range [a,b] in the list should be output as:
"a->b" if a != b
"a" if a == b
Example 1:
Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
Explanation: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
Example 2:
Input: nums = [0,2,3,4,6,8,9]
Output: ["0","2->4","6","8->9"]
Explanation: The ranges are:
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"

Constraints:
0 <= nums.length <= 20
-231 <= nums[i] <= 231 - 1
All the values of nums are unique.
nums is sorted in ascending order.
 */

/**
 * Approach:
 * Base condition, if the array is empty then return the same;
 * local variables to store the result, string to store each element, count to check if arrow needs to be added or not. Iterate through each number and check if it is +1
 *  from the previous value. if yes then increase the count and continue. else check the count and create the string and push it in the array result. reset the result for
 * string and count and continue with the iteration.
 */
var summaryRanges = function (nums) {
  if (nums.length === 0) return [];
  let result = [];
  let string = "" + nums[0];
  let count = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1] + 1) {
      if (count === 1) {
        result.push(string);
      } else {
        string = string + "->" + nums[i - 1];
        result.push(string);
      }
      string = "" + nums[i];
      count = 1;
    } else {
      count++;
    }
  }

  if (count === 1) {
    result.push(string);
  } else {
    string = string + "->" + nums[nums.length - 1];
    result.push(string);
  }
  console.log(result);
  return result;
};

/**
   * Refined approach:
   * Traverse the entire array
Use a '#' to mark the end of the array, similar to Leetcode 38 Count and Say.
   */

var t = 0;
var ans = [];
nums.push("#");
for (var i = 1; i < nums.length; i++)
  if (nums[i] - nums[t] !== i - t) {
    if (i - t > 1) ans.push(nums[t] + "->" + nums[i - 1]);
    else ans.push(nums[t].toString());
    t = i;
  }
return ans;
