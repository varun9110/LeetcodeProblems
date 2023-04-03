/**
 * 1464. Maximum Product of Two Elements in an Array
 * Difficulty: Easy
 * Given the array of integers nums, you will choose two different indices i and j of that array. Return the maximum value of (nums[i]-1)*(nums[j]-1).
Example 1:
Input: nums = [3,4,5,2]
Output: 12 
Explanation: If you choose the indices i=1 and j=2 (indexed from 0), you will get the maximum value, that is, (nums[1]-1)*(nums[2]-1) = (4-1)*(5-1) = 3*4 = 12. 
Example 2:
Input: nums = [1,5,4,5]
Output: 16
Explanation: Choosing the indices i=1 and j=3 (indexed from 0), you will get the maximum value of (5-1)*(5-1) = 16.
Example 3:
Input: nums = [3,7]
Output: 12

Constraints:
2 <= nums.length <= 500
1 <= nums[i] <= 10^3
 */

/**
 * Approach:
 * first iterate throguh the array to find the highest number then remove that number for the array, then do the same thing and find the second largest number.
 */

var maxProduct = function(nums) {
    let first = nums[0]
    let firstI = 0;
    for(let i=1; i<nums.length; i++){
        if(nums[i]>first){
            first = nums[i];
            firstI = i;
        }
    }
    nums.splice(firstI, 1);
    let second = nums[0];
    for(let j=0; j<nums.length; j++){
        if(nums[j]>second){
            second = nums[j];
        }
    }
    return (first-1)*(second-1);
    
};


/**
 * Refined code:
 */

 const maxProduct = nums => {
    let m1 = 0, m2 = 0;
    for (const val of nums) {
      m2 = Math.max(m2, Math.min(m1, val));
      m1 = Math.max(m1, val);
    }
    return (m1 - 1) * (m2 - 1);
  };