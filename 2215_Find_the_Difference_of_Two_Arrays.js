/**
 * 2215. Find the Difference of Two Arrays
 * Difficulty: Easy
 * 
 * Given two 0-indexed integer arrays nums1 and nums2, return a list answer of size 2 where:

answer[0] is a list of all distinct integers in nums1 which are not present in nums2.
answer[1] is a list of all distinct integers in nums2 which are not present in nums1.
Note that the integers in the lists may be returned in any order.

 

Example 1:

Input: nums1 = [1,2,3], nums2 = [2,4,6]
Output: [[1,3],[4,6]]
Explanation:
For nums1, nums1[1] = 2 is present at index 0 of nums2, whereas nums1[0] = 1 and nums1[2] = 3 are not present in nums2. Therefore, answer[0] = [1,3].
For nums2, nums2[0] = 2 is present at index 1 of nums1, whereas nums2[1] = 4 and nums2[2] = 6 are not present in nums2. Therefore, answer[1] = [4,6].
Example 2:

Input: nums1 = [1,2,3,3], nums2 = [1,1,2,2]
Output: [[3],[]]
Explanation:
For nums1, nums1[2] and nums1[3] are not present in nums2. Since nums1[2] == nums1[3], their value is only included once and answer[0] = [3].
Every integer in nums2 is present in nums1. Therefore, answer[1] = [].
 

Constraints:

1 <= nums1.length, nums2.length <= 1000
-1000 <= nums1[i], nums2[i] <= 1000
 */

/**
 * Approach: 
 * need 3 for loops. 
 * 1 to get the nums1 array to object
 * 2nd to get the nums2 array to an object and at the same time identify the unique elements in nums2
 * 3rd to identify the unique elements in the nums1
 */

var findDifference = function(nums1, nums2) {
    let nums1Mapper = {};
    let nums2Mapper = {};
    let answer = [[],[]];
    let i = 0;
    for(i=0; i<nums1.length; i++){
        if(!nums1Mapper[nums1[i]]){
            nums1Mapper[nums1[i]]=1;
        }
    }
    for(i=0; i<nums2.length; i++){
        if(!nums2Mapper[nums2[i]]){
            nums2Mapper[nums2[i]]=1;
            if(!nums1Mapper[nums2[i]]){
                answer[1].push(nums2[i]);
            }
        }
        
    }
    for(i=0; i<nums1.length; i++){
        if(!nums2Mapper[nums1[i]] && nums1Mapper[nums1[i]]===1){
            nums1Mapper[nums1[i]] = 2;
            answer[0].push(nums1[i]);
        }
    }
    return answer;

};


/**
 * Redined approach:
 * Let's create a set ofnums1, then DELETE all values innums2.
 */

var findDifference = function (nums1, nums2) {
    let ans1 = new Set(nums1)
    nums2.forEach(v => { ans1.delete(v) });
    let ans2 = new Set(nums2);
    nums1.forEach(v => { ans2.delete(v) });

    return [[...ans1], [...ans2]];

}