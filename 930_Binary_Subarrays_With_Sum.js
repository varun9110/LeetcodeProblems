/**
 * 930. Binary Subarrays With Sum
 * Difficulty: Medium
 * Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.

A subarray is a contiguous part of the array.

Example 1:
Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: The 4 subarrays are bolded and underlined below:
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
Example 2:
Input: nums = [0,0,0,0,0], goal = 0
Output: 15

Constraints:

1 <= nums.length <= 3 * 104
nums[i] is either 0 or 1.
0 <= goal <= nums.length
 */


/**
 * Brute force approach :
 * Nested loop
 */

var numSubarraysWithSum = function(nums, goal) {
  let count = 0;
  for(let i=0; i<nums.length; i++){
    let sum = 0;
    for(let j=i; j<nums.length; j++){
        sum += nums[j];
        if(sum > goal){
            break;
        }
        if(sum === goal){
            count++;
        }
    }
  }
  return count
};

/**
 * refined:
 * Intuition
To count the number of non-empty subarrays with a sum equal to the given goal, we iterate through 
the array while maintaining two pointers, i and j, representing the start and end of the subarray respectively. 
We update the goal variable based on the elements encountered and count the number of valid subarrays along the way.

Approach
Initialize variables i, count, and res to 0. i represents the start of the subarray, count keeps track of the number 
of subarrays with the sum equal to the goal, and res stores the total count.
Iterate through the array using pointer j.
If the current element nums[j] is 1, decrement the goal variable and reset count to 0.
While goal is 0 and i is less than or equal to j, update goal by adding nums[i], increment i, increment count, 
and check if i exceeds j - goal + 1. If so, break the loop.
While goal is less than 0, update goal by adding nums[i] and increment i.
Add count to res.
Return res as the result.

 */

var numSubarraysWithSum = function(nums, goal) {
    let i = 0, count = 0, res = 0;
    for (let j = 0; j < nums.length; ++j) {
        if (nums[j] === 1) {
            goal--;
            count = 0;
        }
        
        while (goal === 0 && i <= j) {
            goal += nums[i];
            i++;
            count++;
            if (i > j - goal + 1)
                break;
        }
        
        while (goal < 0) {
            goal += nums[i];
            i++;
        }
        
        res += count;
    }
    return res;
};