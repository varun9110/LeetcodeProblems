/**
 * 2962. Count Subarrays Where Max Element Appears at Least K Times
 * Difficulty: Medium
 * 
 * You are given an integer array nums and a positive integer k.
Return the number of subarrays where the maximum element of nums appears at least k times in that subarray.
A subarray is a contiguous sequence of elements within an array.

Example 1:
Input: nums = [1,3,2,3,3], k = 2
Output: 6
Explanation: The subarrays that contain the element 3 at least 2 times are: [1,3,2,3], [1,3,2,3,3], [3,2,3], [3,2,3,3], [2,3,3] and [3,3].
Example 2:
Input: nums = [1,4,2,1], k = 3
Output: 0
Explanation: No subarray contains the element 4 at least 3 times.

Constraints:
1 <= nums.length <= 105
1 <= nums[i] <= 106
1 <= k <= 105
 */

/**
 * Intuition
The problem requires counting the number of subarrays where the maximum element of the array appears at least k times. 
This can be approached using a sliding window technique.

Approach
Find max element.
l,r starting and ending point of current window.
Iterate through the array with the r pointer, decrementing k whenever the element at r equals the maximum element.
When k becomes zero, it indicates that the frequency of the maximum element in the current window has reached to k.
Increment the l pointer until the frequency of the maximum element in the window becomes k-1.
During this process, count the number of subarrays that can be formed using the current window. 
This count is equal to the number of elements to the left of the window with the maximum element included.
Add this count to the answer.
Continue this process until the r pointer reaches the end of the array.

Complexity
Time complexity:O(n)
Space complexity:
O(1)
O(n)

Code

Screenshot from 2024-03-29 14-19-45.png

Let array= [1, 2, 4, 4, 2, 3] and k=2
In my initial answer, I found the subarray [4, 4]. Now, I need to consider how many different ways I can add 
elements to both the left and right sides to create different types of arrays.

If there are 2 elements on the left side, I can create 3 different types of arrays: 
[1, 2, 4, 4], [2, 4, 4], and [4, 4].

if i move right by one it will create 3 new arrays
[1, 2, 4, 4, 1],  [2, 4, 4, 1], and [4, 4, 1]

[1, 2, 4, 4, 1, 3],  [2, 4, 4, 1, 3], and [4, 4, 1, 3]
as i move right by one 3 new arrays are creating
that's why every time i am incrementing ans by l

As I move to the right of this window by adding a new element to each subarray, 
I can create 3 different types of arrays each time I encounter a new element on the right side. 
So, I will add 3 each time I encounter a new element on the right side
 */

var countSubarrays = function(nums, k) {
    let max = Math.max(...nums);
    let ans = 0;
    let l = 0;
    let r = 0;
    const n = nums.length;

    while (r < n) {
        if(nums[r] === max){
            k -= 1;
        }
        r++;
        while (k === 0) {
            if(nums[l] === max){
                k += 1;
            }
            l++;
        }
        ans += l;
    }

    return ans;
};