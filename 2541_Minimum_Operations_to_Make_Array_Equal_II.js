/*
2541. Minimum Operations to Make Array Equal II
Difficulty: Medium

You are given two integer arrays nums1 and nums2 of equal length n and an integer k. You can perform the following operation on nums1:
Choose two indexes i and j and increment nums1[i] by k and decrement nums1[j] by k. In other words, nums1[i] = nums1[i] + k and nums1[j] = nums1[j] - k.
nums1 is said to be equal to nums2 if for all indices i such that 0 <= i < n, nums1[i] == nums2[i].
Return the minimum number of operations required to make nums1 equal to nums2. If it is impossible to make them equal, return -1.

Example 1:
Input: nums1 = [4,3,1,4], nums2 = [1,3,7,1], k = 3
Output: 2
Explanation: In 2 operations, we can transform nums1 to nums2.
1st operation: i = 2, j = 0. After applying the operation, nums1 = [1,3,4,4].
2nd operation: i = 2, j = 3. After applying the operation, nums1 = [1,3,7,1].
One can prove that it is impossible to make arrays equal in fewer operations.

Example 2:
Input: nums1 = [3,8,5,2], nums2 = [2,4,1,6], k = 1
Output: -1
Explanation: It can be proved that it is impossible to make the two arrays equal.
 
Constraints:
n == nums1.length == nums2.length
2 <= n <= 105
0 <= nums1[i], nums2[j] <= 109
*/

/*
Approach: 
So this question is all about finding the edge cases and covering them.
Iterate through the array and keep finding the difference between the numbers:
    1. if any diff is < k and diff != 0 then return -1
    2. if k>0 and diff%k != 0 , then return -1
    Keep adding the diff to increment or decrement sum

Now after the loop, 
1. if increment and decrement sum arent equal then return -1
2. if increment is === 0 then return 0. Since, increment will be === decrement and no adjustment is requried
3. if k===0, here the increment is definitely > 0, so return -1;
4. last normal case return increment/k

*/


var minOperations = function(nums1, nums2, k) {
    let incrementDifference = 0;
    let decrementDifference = 0;

    for(let i=0; i<nums1.length; i++){
        let diff = 0;
        if(nums1[i] < nums2[i]){
            diff = nums2[i] - nums1[i];
            incrementDifference += diff;
        } else {
            diff = nums1[i] - nums2[i];
            decrementDifference += diff;
        }
        if(diff < k && diff!==0){
            return -1;
        }
        if(k > 0 && diff%k !== 0){
            return -1;
        }
    }
    if(incrementDifference !== decrementDifference) {
        return -1;
    }
    
    if(incrementDifference===0){
        return 0;
    }
    if(k===0){
        return -1;
    }
    return incrementDifference / k;
};

/*
Optimised:
*/

var minOperations = function(nums1, nums2, k) {
    
    let count = 0, balance = 0;
    
    for(let i = 0; i < nums1.length; i++) {
        
        const diff = nums1[i] - nums2[i];
        
        if(diff % k) return -1;
        
        if(k === 0 && diff !== 0) return -1;
        
        count += diff > 0 ? diff / k : 0;
        balance += diff;
    }
    
    return balance === 0 ? count : -1;
};