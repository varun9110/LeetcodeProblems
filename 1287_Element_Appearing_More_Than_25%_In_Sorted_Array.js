/**
 * 1287. Element Appearing More Than 25% In Sorted Array
 * Difficulty: Easy
 * 
 * Given an integer array sorted in non-decreasing order, there is exactly one integer in the array that occurs more than 25% of the time, return that integer.
Example 1:

Input: arr = [1,2,2,6,6,6,6,7,10]
Output: 6
Example 2:

Input: arr = [1,1]
Output: 1
 

Constraints:

1 <= arr.length <= 104
0 <= arr[i] <= 105
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
var findSpecialInteger = function(arr) {
    let size = arr.length;
    let qtr = Math.floor(size / 4);
    let cnt = 1;
    let p = arr[0];

    for (let i = 1; i < size; i++) {
        if (p === arr[i]) {
            cnt++;
        } else {
            cnt = 1;
        }

        if (cnt > qtr) {
            return arr[i];
        }

        p = arr[i];
    }

    return p;

};