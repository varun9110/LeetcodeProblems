/**
 * 769. Max Chunks To Make Sorted
 * Difficulty: Medium
 * 
 * You are given an integer array arr of length n that represents a permutation of the integers in the range [0, n - 1].
We split arr into some number of chunks (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.
Return the largest number of chunks we can make to sort the array.

Example 1:
Input: arr = [4,3,2,1,0]
Output: 1
Explanation:
Splitting into two or more chunks will not return the required result.
For example, splitting into [4, 3], [2, 1, 0] will result in [3, 4, 0, 1, 2], which isn't sorted.
Example 2:
Input: arr = [1,0,2,3,4]
Output: 4
Explanation:
We can split into two chunks, such as [1, 0], [2, 3, 4].
However, splitting into [1, 0], [2], [3], [4] is the highest number of chunks possible.
 

Constraints:

n == arr.length
1 <= n <= 10
0 <= arr[i] < n
All the elements of arr are unique.
 */

/**
 * Intuition
To divide the array into chunks, ensure that sorting each chunk individually and concatenating them gives the entire array sorted.
Key Observations:

The position of an element in the sorted array determines its final position.
By comparing the current index with the maximum index seen so far (based on sorted positions), we can determine valid chunk boundaries.
🛠️ Approach
Sort the Array

Create a sorted copy of the array. This acts as the reference for where elements belong in the final sorted order.
Track Maximum Index

Use a variable ind to store the farthest index seen so far in the sorted array.
Count Chunks

Iterate through the original array.
For each element, determine its position in the sorted array.
Update ind as the maximum of its current value and this position.
If the current index equals ind, it means we can safely form a chunk.
Return the Count

The total count of such chunks gives the solution.
⏱️ Complexity
Time Complexity:

Sorting the array takes O(nlogn).
Finding the position of an element in the sorted array takes O(n) for each element, leading to an overall O(n 
2
 ).
Space Complexity:
The sorted copy of the array takes O(n) space.

 */

/**
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted = function(arr) {
    let s = [...arr].sort((a, b) => a - b);
    let ind = -1, c = 0;
    for (let i = 0; i < arr.length; i++) {
        ind = Math.max(ind, s.indexOf(arr[i]));
        if (ind === i) {
            c++;
        }
    }
    return c;
};