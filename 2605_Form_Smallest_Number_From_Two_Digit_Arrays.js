/**
 * 2605. Form Smallest Number From Two Digit Arrays
 * Difficulty: Easy
 * Given two arrays of unique digits nums1 and nums2, return the smallest number that contains at least one digit from each array.

Example 1:
Input: nums1 = [4,1,3], nums2 = [5,7]
Output: 15
Explanation: The number 15 contains the digit 1 from nums1 and the digit 5 from nums2. It can be proven that 15 is the smallest number
 we can have.
Example 2:
Input: nums1 = [3,5,2,6], nums2 = [3,1,7]
Output: 3
Explanation: The number 3 contains the digit 3 which exists in both arrays.

Constraints:
1 <= nums1.length, nums2.length <= 9
1 <= nums1[i], nums2[i] <= 9
All digits in each array are unique.
 */

/**
 * Approach:
 * Create a map to store first array. also find the smallest in the first array
 * then create a variable with 100 as the number to store the result.
 * Iterate through the second array and keep checking the common numbers and store the smallest in the result.
 * Also, find the smallest in the second array.
 * 
 * Lastly, find the min between the result and the concat of the 2 numbers
 */


var minNumber = function(nums1, nums2) {
    let map = {};
    let small1 = nums1[0];
    
    for(let i=0; i<nums1.length; i++){
        map[nums1[i]] = true;
        small1 = (nums1[i] < small1) ? nums1[i] : small1;
    }

    let result = 100;

    let small2 = nums2[0];
    for(let j=0; j<nums2.length; j++){
        if(map[nums2[j]]) result = Math.min(result, nums2[j]);;
        small2 = (nums2[j] < small2) ? nums2[j] : small2;
    }
    result = Math.min(result, (small1<small2) ? (10*small1)+small2 : (10*small2)+small1);
    return result;
};

/**
 * Refined appraoch code
 */

const minNumber = (a, b) => {
    let both = [];
    for (const x of a) {
        if (b.includes(x)) both.push(x);
    }
    if (both.length > 0) return Math.min(...both);
    let pa = Math.min(...a), pb = Math.min(...b);
    return pa < pb ? pa + "" + pb : pb + "" + pa; 
};