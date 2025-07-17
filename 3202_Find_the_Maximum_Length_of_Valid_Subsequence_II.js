/**
 * 3202. Find the Maximum Length of Valid Subsequence II
 * Difficulty: Medium
 * 
 * You are given an integer array nums and a positive integer k.
A subsequence sub of nums with length x is called valid if it satisfies:

(sub[0] + sub[1]) % k == (sub[1] + sub[2]) % k == ... == (sub[x - 2] + sub[x - 1]) % k.
Return the length of the longest valid subsequence of nums.
 

Example 1:

Input: nums = [1,2,3,4,5], k = 2

Output: 5

Explanation:

The longest valid subsequence is [1, 2, 3, 4, 5].

Example 2:

Input: nums = [1,4,2,3,1,4], k = 3

Output: 4

Explanation:

The longest valid subsequence is [1, 4, 1, 4].

 

Constraints:

2 <= nums.length <= 103
1 <= nums[i] <= 107
1 <= k <= 103
 */

/**
 * How to solve using dynamic progamming?

Let the common value of (a+b) be j.
since j must be in the range [0,k−1], we iterate over all possible values of j.

For each j, let us do the following:

we start by creating dp[] of size k, where dp[r] tracks the maximum length of subsequence ending with a number having remainder r modulo k.
then, we process each element in nums;
Let mod=nums[i]
Let pos=(j−mod+k) which ensures that (pos+mod)
Then we can extend any subsequence ending in remainder pos with nums[i] then set
dp[mod]=dp[pos]+1
​
 
after going through all elements, we update the result with the maximum of all dp[r] values

and then finally, we return the maximum result over all j.


 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumLength = function(nums, k) {
    let res=2;
    const n = nums.length;
    if (k === 1) return n;

    const modArr = nums.map(x => x % k);
    
    for (let j = 0; j < k; j++) {
        const dp = new Array(k).fill(0);
        modArr.forEach(mod => {
            const pos = (j - mod + k) % k;
            dp[mod] = dp[pos] + 1;
            res = Math.max(res, dp[mod]);
        });
    }

    return res;
};