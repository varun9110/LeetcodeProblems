/**
 * 992. Subarrays with K Different Integers
 * Difficulty: Hard
 * Given an integer array nums and an integer k, return the number of good subarrays of nums.

A good array is an array where the number of different integers in that array is exactly k.

For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.
A subarray is a contiguous part of an array.

Example 1:
Input: nums = [1,2,1,2,3], k = 2
Output: 7
Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]
Example 2:
Input: nums = [1,2,1,3,4], k = 3
Output: 3
Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].

Constraints:
1 <= nums.length <= 2 * 104
1 <= nums[i], k <= nums.length
 */

/**
 * Intuition

The sliding window technique is a powerful approach for efficiently finding subarrays within a larger array 
that meet specific criteria. In this case, we're interested in subarrays containing exactly k distinct integers.

Here's the basic idea:
Two Pointers (i and j) represent the start and end of the current subarray window.
Hashmap (mp) keeps track of the frequency of each element encountered within the window.
Iterate using j to expand the window rightward, adding elements to the hashmap.
Maintain Condition:
If the number of distinct elements in mp exceeds k (meaning the window contains more than k distinct integers), 
shrink the window by moving i forward and removing elements from mp until the condition is satisfied.
Count Valid Subarrays:
For each valid subarray with exactly k distinct elements (determined by mp.size() being equal to k), 
add the window size (j - i + 1) to a count variable.
Approach (Breakdown with Images)

Initialization:

Set i and j to 0.

Initialize count to 0.

Create an empty hashmap mp.

Iteration and Window Expansion:

While j is less than the array length n:

Increment the frequency of the current element nums[j] in the hashmap mp.

Check for Subarray Validity:

While mp.size() (number of distinct elements) is greater than k:
Decrement the frequency of the element at nums[i] in mp.

If the frequency becomes 0, remove the element from mp using mp.erase(nums[i]).

Move i forward to shrink the window and maintain the condition.

Count Valid Subarrays:

For each valid subarray:

Add the current window size (j - i + 1) to the count variable. This represents the number of possible 
subarrays within the current window that all have exactly k distinct elements.

Move j forward to expand the window for the next iteration.

Return the Final Count:

The final count variable stores the total number of subarrays in the input array that contain exactly k distinct integers.
Complexity

Time Complexity: O(n)
Both i and j iterate through the array at most once, resulting in linear time complexity.
Space Complexity: O(n)
The hashmap mp can potentially store up to n distinct elements in the worst case, leading to linear space complexity.
 */

var subarraysWithKDistinct = function(nums, k) {
    const slidingWindow = (nums, k) => {
        let i = 0, j = 0, count = 0;
        const map = new Map();
        
        while (j < nums.length) {
            map.set(nums[j], (map.get(nums[j]) || 0) + 1);
            
            while (map.size > k) {
                map.set(nums[i], map.get(nums[i]) - 1);
                if (map.get(nums[i]) === 0) map.delete(nums[i]);
                i++;
            }
            
            count += j - i + 1;
            j++;
        }
        
        return count;
    };
    
    return slidingWindow(nums, k) - slidingWindow(nums, k - 1);
};