/*
2404. Most Frequent Even Element
Difficulty : Easy

Given an integer array nums, return the most frequent even element.
If there is a tie, return the smallest one. If there is no such element, return -1.

Example 1:
Input: nums = [0,1,2,2,4,4,1]
Output: 2
Explanation:
The even elements are 0, 2, and 4. Of these, 2 and 4 appear the most.
We return the smallest one, which is 2.

Example 2:
Input: nums = [4,4,4,9,2,4]
Output: 4
Explanation: 4 is the even element appears the most.

Example 3:
Input: nums = [29,47,21,41,13,37,25,7]
Output: -1
Explanation: There is no even element.
 
Constraints:
1 <= nums.length <= 2000
0 <= nums[i] <= 105
*/




/*
Approach:
iterate thorugh the array and add the count to the mapper if the number is even.
Then extract the keys and iterate throgh it to check if the count is greater than the existing.
if yes then store the number in the result.
if the high is same then check which value is smaller.
at the end return the result
*/

var mostFrequentEven = function(nums) {
    let mapper = {};
    for(let i=0; i<nums.length; i++){
        if(nums[i] % 2 === 0){
            if(mapper[nums[i]]){
                mapper[nums[i]] = mapper[nums[i]] + 1;
            } else {
                mapper[nums[i]] = 1;
            }
        }
    }

    let result = -1;
    let high = 0;
    let keys = Object.keys(mapper);
    // console.log(keys);
    // console.log(mapper);

    for(let j=0; j<keys.length; j++){
        let jNumber = Number(keys[j]);
        if(mapper[keys[j]] > high){
            high = mapper[jNumber];
            result = jNumber;
            // console.log("here",result);
        }
        if(mapper[jNumber] === high){
            if(jNumber < result){
                // console.log("here1",keys[j]);
                result = jNumber;
            }
        }
    }

    return result;

};