/**
 * 912. Sort an Array
 * Difficulty: Medium
 * 
 * Given an array of integers nums, sort the array in ascending order and return it.

You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.

Example 1:
Input: nums = [5,2,3,1]
Output: [1,2,3,5]
Explanation: After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed 
(for example, 1 and 5).
Example 2:

Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]
Explanation: Note that the values of nums are not necessairly unique.
 
Constraints:

1 <= nums.length <= 5 * 104
-5 * 104 <= nums[i] <= 5 * 104
 */

/**
 * Intuition
Intuition
Merge sort is quite resemble to quick sort but uses another technique - here we want to break our array on subarrays with 1 elements and then recursively 
reconstruct our array sorted.
You break problem on smaller parts - first break it on sorted arrays with 1 element, then "merge" this arrays comparing their elements one-by-one.
This works because we know that these smaller parts are already sorted when they came back from recursive function.
Unlike the quick sort here we do need to create new arrays so space complexity will be bigger in the average case.
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    mergeSort(nums, 0, nums.length - 1);
    return nums;
};

function mergeSort(array, low, high) {
    if (low >= high) return;
    
    const mid = Math.floor((low + high) / 2);
    mergeSort(array, low, mid);
    mergeSort(array, mid + 1, high);
    merge(array, low, mid, high);
}

function merge(array, low, mid, high) {
    const n1 = mid - low + 1;
    const n2 = high - mid;
    const leftPart = array.slice(low, mid + 1);
    const rightPart = array.slice(mid + 1, high + 1);
    
    let p1 = 0, p2 = 0, writeInd = low;
    
    while (p1 < n1 && p2 < n2) {
        if (leftPart[p1] <= rightPart[p2]) {
            array[writeInd++] = leftPart[p1++];
        } else {
            array[writeInd++] = rightPart[p2++];
        }
    }
    
    while (p1 < n1) {
        array[writeInd++] = leftPart[p1++];
    }
    
    while (p2 < n2) {
        array[writeInd++] = rightPart[p2++];
    }
}