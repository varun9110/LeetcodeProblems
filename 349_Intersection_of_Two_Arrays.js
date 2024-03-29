/**
 * 349. Intersection of Two Arrays
 * Difficulty: Easy
 * 
 * Given two integer arrays nums1 and nums2, return an array of their intersection. 
 * Each element in the result must be unique and you may return the result in any order.
Example 1:
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
Example 2:
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Explanation: [4,9] is also accepted.
Constraints:
1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000
 */

var intersection = function(nums1, nums2) {
    let map = new Map();
    for(let num of nums1){
        if(!map.has(num))
            map.set(num, 1);
    }
    
    return nums2.filter(n => {
        if(map.has(n)){
            map.delete(n);
            return true;
        }
        else return false;
    });
};

/**
 * Refined code
 */

var intersection = function(nums1, nums2) {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);
    const arr = [];
    for(const key of set2) {
        if(set1.has(key)) arr.push(key);
    }
    return arr;
};