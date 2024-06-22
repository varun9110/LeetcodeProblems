/**
 * 1248. Count Number of Nice Subarrays
 * Difficulty: Medium
 * 
 * Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it.
Return the number of nice sub-arrays.

Example 1:

Input: nums = [1,1,2,1,1], k = 3
Output: 2
Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].
Example 2:

Input: nums = [2,4,6], k = 1
Output: 0
Explanation: There are no odd numbers in the array.
Example 3:

Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
Output: 16
 

Constraints:

1 <= nums.length <= 50000
1 <= nums[i] <= 10^5
1 <= k <= nums.length
 */

/**
 * Intuition
The problem requires counting the number of continuous subarrays with exactly k odd numbers. To achieve this, we can use a prefix sum approach. 
The key idea is to keep track of the number of odd numbers encountered so far while iterating through the array, 
and use this information to count subarrays with the desired property efficiently.

Approach
Initialize Variables:

n: Length of the input array nums.
cnt: An array to keep track of the count of prefix sums (number of odd numbers encountered).
cnt[0]: Set to 1 initially, since a prefix sum of 0 (no odd numbers encountered) occurs once by default.
ans: Variable to store the final result (number of nice subarrays).
t: Variable to store the current count of odd numbers while iterating through the array.
Iterate Through the Array:

For each element v in nums, update the count of odd numbers (t) encountered so far. This is done by checking if v is odd using v & 1.
Check if there exists a prefix sum t - k (i.e., a previous state where there were t - k odd numbers). If so, add the count of such prefix sums to ans.
Increment the count of the current prefix sum (t) in the cnt array.
Return the Result:

After iterating through the entire array, ans will contain the number of nice subarrays.
Complexity
Time Complexity: The solution iterates through the array once and performs constant time operations in each iteration. 
Thus, the time complexity is (O(n)), where (n) is the length of the array.
Space Complexity: The space complexity is (O(n)) due to the additional cnt array used to store the count of prefix sums.
 */


var numberOfSubarrays = function(nums, k) {
    let n = nums.length;
    let cnt = new Array(n + 1).fill(0);
    cnt[0] = 1;
    let ans = 0, t = 0;
    for (let v of nums) {
        t += v & 1;
        if (t - k >= 0) {
            ans += cnt[t - k];
        }
        cnt[t]++;
    }
    return ans;
};