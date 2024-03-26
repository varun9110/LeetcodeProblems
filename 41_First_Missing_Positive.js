/**
 * 41. First Missing Positive
 * Difficulty: hard
 * Given an unsorted integer array nums. Return the smallest positive integer that is not present in nums.

You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.

Example 1:
Input: nums = [1,2,0]
Output: 3
Explanation: The numbers in the range [1,2] are all in the array.
Example 2:
Input: nums = [3,4,-1,1]
Output: 2
Explanation: 1 is in the array but 2 is missing.
Example 3:
Input: nums = [7,8,9,11,12]
Output: 1
Explanation: The smallest positive integer 1 is missing.

Constraints:
1 <= nums.length <= 105
-231 <= nums[i] <= 231 - 1
 */

/**
 * Approach:
 * Use a mapper to create the keys for all the values in the array, then start the count from 1 and if there isnt any key with this count then return 
 * that count.
 * 
 * The map object is still with O(1) but take additional space.
 * Time complexity remains O(n)
 */

var firstMissingPositive = function(nums) {
    let map ={};
    for(let i=0; i<nums.length; i++){
        map[nums[i]] = (map[nums[i]]) ? map[nums[i]]+1 : 1;
    }
    let count = 1;
    while(map[count]){
        count++;
    }
     return count
};

/**
 * in this we sort the array with the indexes, since the values needs to be sorted based on the values and then shuffle them based on the values -1
 * We would also have to cheeck that 2 values aren't equal and that the value is within the range of 0 to n.
 * 
 * then iterate through the array again with starting from 0 index with checking index+1 with the value. if both doesnt match then return that index+1 
 */
    

var firstMissingPositive = function(nums) {
    
    for(let i =0; i< nums.length;){
        const n = nums[i] -1
        if(nums[i] > 0 && nums[i] < nums.length && nums[n] != nums[i]){
            const temp = nums[n]
            nums[n] = nums[i]
            nums[i] = temp
        }else{
            i++
        }
    }

    for(let i =0; i< nums.length; i++){
        if((nums[i]) != i+1){
            return i+1
        }
    }



    return nums.length+1
};