/**
 * 2190. Most Frequent Number Following Key In an Array
 * You are given a 0-indexed integer array nums. You are also given an integer key, which is present in nums.

For every unique integer target in nums, count the number of times target immediately follows an occurrence of key in nums. 
In other words, count the number of indices i such that:

0 <= i <= nums.length - 2,
nums[i] == key and,
nums[i + 1] == target.
Return the target with the maximum count. The test cases will be generated such that the target with maximum count is unique.

Example 1:
Input: nums = [1,100,200,1,100], key = 1
Output: 100
Explanation: For target = 100, there are 2 occurrences at indices 1 and 4 which follow an occurrence of key.
No other integers follow an occurrence of key, so we return 100.
Example 2:
Input: nums = [2,2,2,2,3], key = 2
Output: 2
Explanation: For target = 2, there are 3 occurrences at indices 1, 2, and 3 which follow an occurrence of key.
For target = 3, there is only one occurrence at index 4 which follows an occurrence of key.
target = 2 has the maximum number of occurrences following an occurrence of key, so we return 2.

Constraints:
2 <= nums.length <= 1000
1 <= nums[i] <= 1000
The test cases will be generated such that the answer is unique.
 */

/**
 * Approach:
 * create a mapper to store the unique numbers and their count
 * run the loop to find the key and store the next indexed number to the above mapper
 * after this loop run a loop on all the keys of the mapper object to find the value and return the key with the highest value
 */

var mostFrequent = function(nums, key) {
    let mapper = {}
    for(let i=0; i<nums.length-1; i++){
        if(nums[i] === key){
            mapper[nums[i+1]] = (mapper[nums[i+1]]) ? mapper[nums[i+1]]+1 : 1
        }
    }

    let objs = Object.keys(mapper);
    let highest = 0;
    let result;
    for(let j=0; j<objs.length; j++){
        if( mapper[objs[j]] > highest){
            result = objs[j];
            highest = mapper[objs[j]]
        }
    }
    console.log(result);
    return result;
};

/**
 * slightly better code, in this the max is used to find the highest value while running the loop itself
 */

const mostFrequent = (nums, key) => {
  const freq = {};
  let ret = 0;
  for (let i = 0, max = 0; i < nums.length - 1; ++i) {
    if (nums[i] !== key) continue;
    const target = nums[i + 1];
    freq[target] = (freq[target] || 0) + 1;
    if (freq[target] > max) {
      max = freq[target];
      ret = target;
    }
  }
  return ret;
};