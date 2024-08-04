/**
 * 1508. Range Sum of Sorted Subarray Sums
 * difficulty : medium
 * 
 * You are given the array nums consisting of n positive integers. You computed the sum of all non-empty continuous 
 * subarrays from the array and then sorted them in non-decreasing order, creating a new array of n * (n + 1) / 2 numbers.

Return the sum of the numbers from index left to index right (indexed from 1), inclusive, in the new array. 
Since the answer can be a huge number return it modulo 109 + 7.

 

Example 1:

Input: nums = [1,2,3,4], n = 4, left = 1, right = 5
Output: 13 
Explanation: All subarray sums are 1, 3, 6, 10, 2, 5, 9, 3, 7, 4. After sorting them in non-decreasing 
order we have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 1 to ri = 5 is 1 + 2 + 3 + 3 + 4 = 13. 
Example 2:

Input: nums = [1,2,3,4], n = 4, left = 3, right = 4
Output: 6
Explanation: The given array is the same as example 1. We have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. 
The sum of the numbers from index le = 3 to ri = 4 is 3 + 3 = 6.
Example 3:

Input: nums = [1,2,3,4], n = 4, left = 1, right = 10
Output: 50
 

Constraints:

n == nums.length
1 <= nums.length <= 1000
1 <= nums[i] <= 100
1 <= left <= right <= n * (n + 1) / 2
 */

/**
 * Sliding Window
Intuition
We don't actually need to generate all possible subarrays, sort them, and then sum the required range. Such an approach would be highly inefficient.

Instead, we can use the properties of subarray sums and use a combination of sliding window and binary search techniques to solve this problem efficiently. 
The core ideas are:

We can calculate the sum of all subarrays ending at a particular index in linear time using a sliding window approach.
We can use binary search to find the Kth smallest subarray sum without actually generating and sorting all subarray sums.
We can use the principle of inclusion-exclusion to calculate the sum of subarrays in a given range.
The intuition behind using a sliding window is that as we move the window, we can efficiently update the sum of subarrays ending at the current index. 
This allows us to count the number of subarrays with sum less than or equal to a given threshold and calculate their total sum.

The binary search comes into play when we need to find the Kth smallest subarray sum. We can binary search on the 
possible sum values (from the minimum possible subarray sum to the maximum possible subarray sum) and use our sliding window method to c
ount how many subarrays have a sum less than or equal to the current mid value.

Finally, the principle of inclusion-exclusion allows us to calculate the sum of subarrays from index left to right by 
subtracting the sum of the first (left-1) subarrays from the sum of the first right subarrays.

Approach
Let's break down the approach:

Initialization:

We define constants and instance variables:
MODULUS: The modulo value (10^9 + 7) to handle large sums.
maxSubarraySum: To store the maximum possible subarray sum.
minSubarraySum: To store the minimum possible subarray sum.
countAndSumSubarrays method:
This method is the core of our sliding window approach. It counts the number of subarrays with sum less than or equal to a given 
threshold and calculates their total sum.

We use two pointers, start and end, to define our window.
As we move the end pointer:
We update runningSum which represents the sum of all subarrays ending at the current index.
We update currentWindowSum which is the sum of elements in the current window.
If currentWindowSum exceeds the threshold, we shrink the window from the left.
We count the number of valid subarrays ending at the current index and add their sums to totalSum.
Finally, we return a pair of the count and total sum.
calculateSumOfFirstKSubarrays method:
This method uses binary search to find the Kth smallest subarray sum.

We perform binary search on the range from minSubarraySum to maxSubarraySum.
For each mid value, we use countAndSumSubarrays to check how many subarrays have sum less than or equal to mid.
We adjust our search range based on this count.
Once we find the correct threshold, we calculate the sum of the first K subarrays.
rangeSum method:
This is our main method that puts everything together.

We initialize minSubarraySum and maxSubarraySum.
We calculate the sum of the first right subarrays and subtract the sum of the first left-1 subarrays.
We handle the modulo arithmetic to avoid overflow.
 */

/**
 * @param {number[]} nums
 * @param {number} n
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var rangeSum = function (nums, n, left, right) {
    const MODULUS = 1000000007;

    function countAndSumSubarrays(array, threshold) {
        let count = 0;
        let totalSum = 0n;
        let currentWindowSum = 0n;
        let runningSum = 0n;
        let start = 0;

        for (let end = 0; end < array.length; end++) {
            runningSum += BigInt(array[end]) * BigInt(end - start + 1);
            currentWindowSum += BigInt(array[end]);
            while (currentWindowSum > threshold) {
                runningSum -= currentWindowSum;
                currentWindowSum -= BigInt(array[start]);
                start++;
            }
            count += end - start + 1;
            totalSum += runningSum;
        }
        return [count, totalSum];
    }

    function calculateSumOfFirstKSubarrays(array, k) {
        let low = BigInt(Math.min(...array));
        let high = BigInt(array.reduce((a, b) => a + b, 0));

        while (low < high) {
            let mid = low + (high - low) / 2n;
            if (countAndSumSubarrays(array, mid)[0] < k) {
                low = mid + 1n;
            } else {
                high = mid;
            }
        }
        const [count, sum] = countAndSumSubarrays(array, low);
        return sum - low * BigInt(count - k);
    }

    const result = (calculateSumOfFirstKSubarrays(nums, right) -
        calculateSumOfFirstKSubarrays(nums, left - 1) +
        BigInt(MODULUS)) % BigInt(MODULUS);
    return Number(result);
};