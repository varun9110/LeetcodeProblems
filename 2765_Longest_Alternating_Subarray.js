/**
 * 2765. Longest Alternating Subarray
 * Difficulty: Easy
 * 
 * You are given a 0-indexed integer array nums. A subarray s of length m is called alternating if:
m is greater than 1.
s1 = s0 + 1.
The 0-indexed subarray s looks like [s0, s1, s0, s1,...,s(m-1) % 2]. 
In other words, s1 - s0 = 1, s2 - s1 = -1, s3 - s2 = 1, s4 - s3 = -1, and so on up to s[m - 1] - s[m - 2] = (-1)m.
Return the maximum length of all alternating subarrays present in nums or -1 if no such subarray exists.
A subarray is a contiguous non-empty sequence of elements within an array.
Example 1:
Input: nums = [2,3,4,3,4]
Output: 4
Explanation: The alternating subarrays are [3,4], [3,4,3], and [3,4,3,4]. The longest of these is [3,4,3,4], which is of length 4.
Example 2:
Input: nums = [4,5,6]
Output: 2
Explanation: [4,5] and [5,6] are the only two alternating subarrays. They are both of length 2.
Constraints:
2 <= nums.length <= 100
1 <= nums[i] <= 104
 */

/**
 * Approach
The solution utilizes a sliding window approach to analyze the array and identify alternating subarrays. 
The main steps of the approach are as follows:

Initialization: Initialize three variables:
curr (current length of the alternating subarray) with a value of 1.
check (pattern check) with a value of 1, representing the expected difference between adjacent elements.
max (maximum length of alternating subarrays) with a value of -1, indicating no alternating subarrays found yet.
Iteration: Iterate through the array, starting from the second element (index 1). For each element:
Compare the difference between the current element nums[i] and the previous element nums[i - 1] with the check value.
If the difference matches the expected pattern (nums[i] - nums[i - 1] == check), then:
Increment the curr value (current subarray length).
Update the check to its opposite value (flip the sign) to maintain the alternating pattern.
Update the max value by taking the larger of the current max and curr. This keeps track of the maximum alternating subarray length encountered so far.
If the difference doesn't match the expected pattern, then:
Check if the difference is equal to 1. If true, start a new alternating subarray with length 2 and a descending pattern.
If the difference is not equal to 1, start a new alternating subarray with length 1 and an ascending pattern.
Result: After iterating through the entire array, the max value will represent the maximum length of alternating subarrays found. Return the max value.

 */

var alternatingSubarray = function(nums) {
    let [curr, check] = [1, 1];
  let max = -1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] == check) {
      curr++;
      check *= -1;
      max = Math.max(max, curr);
    } else {
      if (nums[i] - nums[i - 1] == 1) {
        [curr, check] = [2, -1];
      } else {
        [curr, check] = [1, 1];
      }
    }
  }
  return max;
};