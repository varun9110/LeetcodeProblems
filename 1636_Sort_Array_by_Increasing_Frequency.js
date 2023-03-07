/**
 * 1636. Sort Array by Increasing Frequency
 * Difficulty : Easy
 * 
 * Given an array of integers nums, sort the array in increasing order based on the frequency of the values. If multiple values have the same frequency, sort them in decreasing order.
Return the sorted array.

Example 1:
Input: nums = [1,1,2,2,2,3]
Output: [3,1,1,2,2,2]
Explanation: '3' has a frequency of 1, '1' has a frequency of 2, and '2' has a frequency of 3.

Example 2:
Input: nums = [2,3,1,3,2]
Output: [1,3,3,2,2]
Explanation: '2' and '3' both have a frequency of 2, so they are sorted in decreasing order.

Example 3:
Input: nums = [-1,1,-6,4,5,-6,1,4,1]
Output: [5,-1,4,4,-6,-6,1,1,1]

Constraints:
1 <= nums.length <= 100
-100 <= nums[i] <= 100
*/

/**
 * Approach : 
 * Brute Force, create a mapper to count the occurences of the number in the array
 * then verse the object such that keys represents the number of occurences and the values are the array of those numbers
 * finally iterate through all the keys and keep adding them to a result array while sorting them in decreasing order
 */


var frequencySort = function(nums) {
    let mapper = {};
    for(let i=0; i<nums.length; i++){
        if(mapper[nums[i]]){
            mapper[nums[i]] = mapper[nums[i]] +1;
        } else {
            mapper[nums[i]] = 1;
        }
    }

    let reverseMapper = {};
    for(let i=0; i<nums.length; i++){
        let key = mapper[nums[i]];
        let value = nums[i];
        if(reverseMapper[key]){
            reverseMapper[key].push(value);
        } else {
            reverseMapper[key] = [value]
        }
    }
    let result = [];
    let keys = Object.keys(reverseMapper);
    for(let i=0; i<keys.length; i++){
        let valueArray = reverseMapper[keys[i]];
        valueArray.sort((a, b) => b - a);
        result = [...result, ...valueArray];
    }
    return result;
};

/**
 * Refined approach:
 * Use Map data structure. create a map with the keys as the numbers and the values as their count.
 * now sort the original array (nums) based on the map.get method of a and b. if both are same then apply b-a
 */

 var frequencySort = function(nums) {
    const map = new Map();
    for (let n of nums) {
        map.set(n, (map.get(n) + 1) || 1);
    }
    return nums.sort((a, b) => map.get(a) - map.get(b) || b - a)
};