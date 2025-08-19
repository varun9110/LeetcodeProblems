/**
 * 2348. Number of Zero-Filled Subarrays
 * Difficulty: Medium
 * 
 * Given an integer array nums, return the number of subarrays filled with 0.

A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: nums = [1,3,0,0,2,0,0,4]
Output: 6
Explanation: 
There are 4 occurrences of [0] as a subarray.
There are 2 occurrences of [0,0] as a subarray.
There is no occurrence of a subarray with a size more than 2 filled with 0. Therefore, we return 6.
Example 2:

Input: nums = [0,0,0,2,0,0]
Output: 9
Explanation:
There are 5 occurrences of [0] as a subarray.
There are 3 occurrences of [0,0] as a subarray.
There is 1 occurrence of [0,0,0] as a subarray.
There is no occurrence of a subarray with a size more than 3 filled with 0. Therefore, we return 9.
Example 3:

Input: nums = [2,10,2019]
Output: 0
Explanation: There is no subarray filled with 0. Therefore, we return 0.
 

Constraints:

1 <= nums.length <= 105
-109 <= nums[i] <= 109
 */

/**
 * Understanding the problem
Input. nums: array of integers.

Output. Count of subarrays that contain only 0 (and have length ≥ 1).

Key observation. A run of k consecutive zeros contributes k*(k+1)/2 zero‑filled subarrays
(e.g., 000 → [0]×3, [0,0]×2, [0,0,0]×1 → 6).

We assume n = len(nums) fits typical constraints (≤ 1e5–1e6); the linear solution is safe.

Intuition
Instead of starting a subarray at every index and extending while zeros last, notice that
only zero runs matter. Sum k*(k+1)/2 over all runs. You can do this explicitly (scan and
jump over runs) or implicitly in one pass by maintaining a running length run of the
current zero streak and adding run to the answer at each zero.

Approach 1 : Naive nested scan (for learning; TLE)
Idea. For each start i, extend j forward while elements are 0, and increment the count for
each j. This mirrors how we usually enumerate subarrays, and it’s helpful to validate small cases.

# Naive nested scan pseudocode
count = 0
for i from 0 to n-1:
    if nums[i] == 0:
        for j from i to n-1:
            if nums[j] == 0:
                count += 1
            else:
                break
return count
We intentionally do not include code here; use this as a mental model only.

Complexity
Time: O(n^2) worst‑case (array is all zeros).
Space: O(1).
Gotchas & Edge Cases
If the array begins with non‑zero, a loop guard like nums[i] == 0 in the outer loop can
mistakenly skip the entire scan.
Worst‑case inputs with huge zero blocks will time‑out.
Approach 2 : One‑pass running count (linear)
How it works
Keep run = length of current zero streak.

For each x in nums:

If x == 0: increment run and add it to ans (the new subarrays are those ending here).
Else: reset run = 0.
This implicitly sums k*(k+1)/2 for every zero run without a second pass.

Graphic: step‑by‑step accumulation
The two figures show how the algorithm builds the answer step by step.

image.png

Figure 1: Zero positions and incremental contributions

Each bar corresponds to an index where the element is 0.
The +k label above a bar means: at this position, k new zero-filled subarrays end.
At index 2, the first 0 starts a run → +1.
At index 3, the run length becomes 2 → +2.
At index 5, a new run starts → +1.
At index 6, run length = 2 → +2.
Reading across, you see how the streak length resets when a non-zero breaks the run.
image.png

Figure 2: Cumulative count after scanning

The line plot accumulates those increments.
Start at 0. After index 2, total = 1.
After index 3, total = 3 (previous 1 + 2).
Index 4 has no zero → total stays 3.
Index 5 adds 1 → total = 4.
Index 6 adds 2 → total = 6.
Index 7 is non-zero, so the total remains 6.
Final result = 6, which matches the problem’s output.
Together, the first graphic shows where the contributions come from, and the second shows how they accumulate into the final answer.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var zeroFilledSubarray = function(nums) {
     let ans = 0, run = 0;
    for (const x of nums) {
        if (x === 0) { run++; ans += run; }
        else run = 0;
    }
    return ans;
};