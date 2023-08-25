/**
 * 1394. Find Lucky Integer in an Array
 * Difficulty : Easy
 * 
Given an array of integers arr, a lucky integer is an integer that has a frequency in the array equal to its value.
Return the largest lucky integer in the array. If there is no lucky integer return -1.
Example 1:
Input: arr = [2,2,3,4]
Output: 2
Explanation: The only lucky number in the array is 2 because frequency[2] == 2.
Example 2:
Input: arr = [1,2,2,3,3,3]
Output: 3
Explanation: 1, 2 and 3 are all lucky numbers, return the largest of them.
Example 3:
Input: arr = [2,2,2,3,3]
Output: -1
Explanation: There are no lucky numbers in the array.

Constraints:
1 <= arr.length <= 500
1 <= arr[i] <= 500

 */

/**
 * Approach 1: sort and then iterate from end to begining
 * Approach 2: create a map and then count
 * Approach 3: Create an object and check the keys and values
 */

var findLucky = function(arr) {
    arr.sort((a,b) => a-b);
    let count = 0;
    for(let i=arr.length-1; i>=0; i--){
        count++;
        if(arr[i-1] !== arr[i]){
            if(count === arr[i]){
                return count;
            }
            count =0;
        }
    }
    return -1;
};

var findLucky = function(arr) {
    const map = new Map();
    for (x of arr) {
        map.has(x) ? map.set(x, map.get(x) + 1) : map.set(x, 1);
    }
    return Math.max(...arr.filter(e => map.get(e) === e), -1);
};