/*

1968_Array_With_Elements_Not_Equal_to_Average_of_Neighbors.js
Diffculty: Medium

You are given a 0-indexed array nums of distinct integers. You want to rearrange the elements in the array such that every element in the rearranged array is not equal to the average of its neighbors.
More formally, the rearranged array should have the property such that for every i in the range 1 <= i < nums.length - 1, (nums[i-1] + nums[i+1]) / 2 is not equal to nums[i].
Return any rearrangement of nums that meets the requirements.

Example 1:
Input: nums = [1,2,3,4,5]
Output: [1,2,4,5,3]
Explanation:
When i=1, nums[i] = 2, and the average of its neighbors is (1+4) / 2 = 2.5.
When i=2, nums[i] = 4, and the average of its neighbors is (2+5) / 2 = 3.5.
When i=3, nums[i] = 5, and the average of its neighbors is (4+3) / 2 = 3.5.

Example 2:
Input: nums = [6,2,0,9,7]
Output: [9,7,6,2,0]
Explanation:
When i=1, nums[i] = 7, and the average of its neighbors is (9+6) / 2 = 7.5.
When i=2, nums[i] = 6, and the average of its neighbors is (7+2) / 2 = 4.5.
When i=3, nums[i] = 2, and the average of its neighbors is (6+0) / 2 = 3.
 

Constraints:
3 <= nums.length <= 105
0 <= nums[i] <= 105
*/

/*
Approach: 
So basically first tried the burte force method to keep finding the average but that wont help.
Dont waste time in that.

Better approach : 
Since we know that to find the average the number has to lie between the 2 numbers
So we need an array where we get elements in the pattern like  : [ Small Big Small ]  OR [ Big Small Big ]
This the resulting array will be [ Small Big Small Big Small Big ....]

So to achieve this sort the array and then use 12 pointers from the 0 and last keep pushing them to another array. the result will be this format.
*/

var rearrangeArray = function(nums) {
    let result = [];
    nums.sort((a, b) => a-b);
    let left=0;
    let right = nums.length-1;
    while(left < right){
        result.push(nums[left++]);
        result.push(nums[right--]);
    }
    if(left === right){
        result.push(nums[left]);
    }

    return result;

};