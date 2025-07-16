/**
 * 3201. Find the Maximum Length of Valid Subsequence I
 * Difficulty: Medium
 * 
 * You are given an integer array nums.
A subsequence sub of nums with length x is called valid if it satisfies:

(sub[0] + sub[1]) % 2 == (sub[1] + sub[2]) % 2 == ... == (sub[x - 2] + sub[x - 1]) % 2.
Return the length of the longest valid subsequence of nums.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

 

Example 1:

Input: nums = [1,2,3,4]

Output: 4

Explanation:

The longest valid subsequence is [1, 2, 3, 4].

Example 2:

Input: nums = [1,2,1,1,2,1,2]

Output: 6

Explanation:

The longest valid subsequence is [1, 2, 1, 2, 1, 2].

Example 3:

Input: nums = [1,3]

Output: 2

Explanation:

The longest valid subsequence is [1, 3].

 

Constraints:

2 <= nums.length <= 2 * 105
1 <= nums[i] <= 107
 */

/**
 *  Problem Understanding (Detailed Theory)
You're given an array of integers nums.
You need to find the longest subsequence such that the sum of every two adjacent elements has the same parity — either all sums are even or all sums are odd.

🔑 Definitions:
Even + Even = Even ✅

Odd + Odd = Even ✅

Odd + Even = Odd ✅

Even + Odd = Odd ✅

So for the sums to be consistently even, the subsequence must consist of same parity elements.
For the sums to be consistently odd, the subsequence must be alternating even and odd elements.

🧪 2 Valid Subsequence Types
We must explore both strategies:

1️⃣ Same-Parity Subsequence
👉 Valid when all adjacent elements have same parity
✔️ All Even or All Odd
➡️ Just count the max number of same-parity elements

Example:
Input: [1, 2, 4, 6]
Valid Same-Parity Subseq: [2, 4, 6] → All even
All sums = even

2️⃣ Alternating-Parity Subsequence
👉 Valid when parity alternates, i.e., odd → even → odd...
✔️ All adjacent sums will be odd
➡️ We use dynamic programming here

Build longest sequence where:

Even follows odd, or

Odd follows even

Example:
Input: [1, 2, 1, 2]
Valid Alternating Subseq: [1, 2, 1, 2]
All sums = odd (1+2, 2+1, 1+2)

💡 Intuition:
We are asked to find the longest subsequence such that the sum of every two consecutive elements has the same parity (either always even or always odd).

This naturally leads to two valid types of subsequences:

Same parity subsequence — All even or all odd numbers.

Alternating parity subsequence — Even, odd, even, odd... (or vice versa), ensuring that (a + b) % 2 is the same throughout.

🔍 Approach:
Count all even and odd numbers in the array — this gives the max length for same parity subsequences.

Use dynamic tracking (greedy-like) for alternating subsequence:

Use two variables:

even_dp: max alternating sequence ending in even

odd_dp: max alternating sequence ending in odd

Traverse the array, for each number:

If it's even, update even_dp = max(even_dp, odd_dp + 1)

If it's odd, update odd_dp = max(odd_dp, even_dp + 1)

Return the maximum among:

count of evens

count of odds

even_dp

odd_dp

🧮 Complexity:
Time Complexity: O(n)
(One pass for counting, another for building DP tracking)

Space Complexity: O(1)
(Only variables used, no extra data structures)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumLength = function(nums) {
    let count_even = 0, count_odd = 0;
    for (let num of nums) {
        if (num % 2 === 0) count_even++;
        else count_odd++;
    }

    let even_dp = 0, odd_dp = 0;
    for (let num of nums) {
        if (num % 2 === 0)
            even_dp = Math.max(even_dp, odd_dp + 1);
        else
            odd_dp = Math.max(odd_dp, even_dp + 1);
    }

    return Math.max(count_even, count_odd, even_dp, odd_dp);
};