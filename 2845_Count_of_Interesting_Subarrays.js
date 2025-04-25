/**
 * 2845. Count of Interesting Subarrays
 * Difficulty: Medium
 * 
 * You are given a 0-indexed integer array nums, an integer modulo, and an integer k.

Your task is to find the count of subarrays that are interesting.

A subarray nums[l..r] is interesting if the following condition holds:

Let cnt be the number of indices i in the range [l, r] such that nums[i] % modulo == k. Then, cnt % modulo == k.
Return an integer denoting the count of interesting subarrays.

Note: A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: nums = [3,2,4], modulo = 2, k = 1
Output: 3
Explanation: In this example the interesting subarrays are: 
The subarray nums[0..0] which is [3]. 
- There is only one index, i = 0, in the range [0, 0] that satisfies nums[i] % modulo == k. 
- Hence, cnt = 1 and cnt % modulo == k.  
The subarray nums[0..1] which is [3,2].
- There is only one index, i = 0, in the range [0, 1] that satisfies nums[i] % modulo == k.  
- Hence, cnt = 1 and cnt % modulo == k.
The subarray nums[0..2] which is [3,2,4]. 
- There is only one index, i = 0, in the range [0, 2] that satisfies nums[i] % modulo == k. 
- Hence, cnt = 1 and cnt % modulo == k. 
It can be shown that there are no other interesting subarrays. So, the answer is 3.
Example 2:

Input: nums = [3,1,9,6], modulo = 3, k = 0
Output: 2
Explanation: In this example the interesting subarrays are: 
The subarray nums[0..3] which is [3,1,9,6]. 
- There are three indices, i = 0, 2, 3, in the range [0, 3] that satisfy nums[i] % modulo == k. 
- Hence, cnt = 3 and cnt % modulo == k. 
The subarray nums[1..1] which is [1]. 
- There is no index, i, in the range [1, 1] that satisfies nums[i] % modulo == k. 
- Hence, cnt = 0 and cnt % modulo == k. 
It can be shown that there are no other interesting subarrays. So, the answer is 2.
 

Constraints:

1 <= nums.length <= 105 
1 <= nums[i] <= 109
1 <= modulo <= 109
0 <= k < modulo
 */


/**
 * Intuition
We can probably do better, but how? Probably by removing one of the loops. So if we remove inner loop, 
then outer loop will have to count all arrays that start with i? Or we can remove outer loop, 
then on every iteration we'll count all interesting arrays that end at i.

Lets check how many values [0..i] array has, and if it has more values than needed, then we can check if 
we already saw arrays with this amount of values, and if we did, then we can start out interesting array not at 0, 
but at the end of one of the arrays that we saw before, since we don't care where exactly the ends of these arrays are 
(since we only care about number of such arrays) we can store counts of such arrays in a HashMap.

We initialize HashMap with 0 => 1 because we know that if [0..i] has correct number of interesting values, then it needs 0 values from previous array, 
and we should count it as 1 interesting array.

Complexity
Time complexity:
O(n)

Space complexity:
O(n)
 */


/**
 * @param {number[]} nums
 * @param {number} modulo
 * @param {number} k
 * @return {number}
 */
var countInterestingSubarrays = function(nums, modulo, k) {
    const interestingValues = nums.map(n => n % modulo === k ? 1 : 0);
    const prefix = new Array(nums.length + 1).fill(0);
    for (let i = 1; i <= nums.length; i++) {
        prefix[i] = prefix[i - 1] + interestingValues[i - 1];
    }

    let interestingArrays = 0;

    const counters = { 0: 1 };
    for (let i = 0; i < nums.length; i++) {
        // `k` is how many values our array needs (case when number of values is higher or equal to modulo will be handled later)
        // we know that array [0..i] has `prefix[i + 1]` interesting values
        // then `prefix[i + 1] - k` is how many extra interesting values array [0..i] has
        let extraValues = prefix[i + 1] - k;

        // `extraValues` can be negative - [0..i] has less values than needed, it's not possible to have an interesting array yet
        if (extraValues >= 0) {
            // `extraValues` can be 0 - [0..i] is an interesting array
            // `extraValues` can be positive - [0..i] has more values than needed (we should start our array not at 0, but somewhere further)

            // Handle the case when [0..i] has more values than modulo, we can divide by modulo and work only with remainder
            extraValues = extraValues % modulo

            // Our `counters` map will store counts of arrays that have X values, so if [0..i] has extra values, then we can start not at 0, but at the end of one of the arrays that has X values
            interestingArrays += (counters[extraValues] || 0)
        }

        // Count our [0..i] array in counters map, so that later array can skip this number of values
        const n = prefix[i + 1] % modulo
        counters[n] = (counters[n] || 0) + 1
    }

    return interestingArrays;
};