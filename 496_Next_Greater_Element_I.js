/**
 * 496. Next Greater Element I
 * Difficulty: Easy
 * 
 * The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.

You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.

For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.

Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.

Example 1:
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
- 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
Example 2:

Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
- 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.
 

Constraints:

1 <= nums1.length <= nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 104
All integers in nums1 and nums2 are unique.
All the integers of nums1 also appear in nums2.
 */


/**
 * Intuition
We want to find the next bigger number for each element in nums1, based on their position in nums2. Instead of checking every pair (which is slow), we use a monotonic stack to speed it up.

Approach
image.png

Loop through nums2:
Keep a stack of decreasing numbers.
If current number is bigger than the top of the stack → that number is its "next greater".
Store results in a map.
For each number in nums1, return the value from the map.
This is a classic use case for stacks and gives a blazing-fast solution.

Complexity
Time Complexity: ( O(n) ) — each element is pushed and popped once.
Space Complexity: ( O(n) ) — for the stack and map.
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
    const stack = [], map = {};
    for (let n of nums2) {
        while (stack.length && n > stack[stack.length - 1]) {
            map[stack.pop()] = n;
        }
        stack.push(n);
    }
    for (let n of stack) {
        map[n] = -1;
    }
    return nums1.map(n => map[n]);
};