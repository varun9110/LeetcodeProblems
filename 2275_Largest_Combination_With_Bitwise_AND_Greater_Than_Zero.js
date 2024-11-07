/**
 * 2275. Largest Combination With Bitwise AND Greater Than Zero
 * Difficulty: Medium
 * The bitwise AND of an array nums is the bitwise AND of all integers in nums.

For example, for nums = [1, 5, 3], the bitwise AND is equal to 1 & 5 & 3 = 1.
Also, for nums = [7], the bitwise AND is 7.
You are given an array of positive integers candidates. Evaluate the bitwise AND of every combination of numbers of candidates. 
Each number in candidates may only be used once in each combination.

Return the size of the largest combination of candidates with a bitwise AND greater than 0.

Example 1:
Input: candidates = [16,17,71,62,12,24,14]
Output: 4
Explanation: The combination [16,17,62,24] has a bitwise AND of 16 & 17 & 62 & 24 = 16 > 0.
The size of the combination is 4.
It can be shown that no combination with a size greater than 4 has a bitwise AND greater than 0.
Note that more than one combination may have the largest size.
For example, the combination [62,12,24,14] has a bitwise AND of 62 & 12 & 24 & 14 = 8 > 0.
Example 2:
Input: candidates = [8,8]
Output: 2
Explanation: The largest combination [8,8] has a bitwise AND of 8 & 8 = 8 > 0.
The size of the combination is 2, so we return 2.

Constraints:
1 <= candidates.length <= 105
1 <= candidates[i] <= 107
 */

/**
 * Intuition
The problem asks us to find the largest combination of numbers in the list candidates whose AND is greater than 0 so if all the numbers in a combination has 
a ith bit set , it means their AND will surely be greater than 0 , so the problem breaks down to find the largest combination of numbers in the list candidates 
where a specific bit position (from 0 to 31) is set to 1. In other words, we want to find the maximum number of elements in candidates that share a common bit 
position set to 1.

Approach
Initialize Variables:
We start by defining a variable ans to store the maximum count of elements that share the same bit position with a bit set to 1.
Iterate Over Bit Positions:
Since integers are 32 bits in length, we loop from 0 to 31 to cover all possible bit positions.
Count Set Bits for Each Position:
For each bit position i (from 0 to 31), we count how many elements in candidates have that specific bit set to 1.
To check if the i-th bit of a number candidate is set, we use the expression candidate & (1 << i).
1 << i shifts 1 to the i-th bit position, creating a mask (like 00010000 for i = 4).
candidate & (1 << i) checks if this bit is set by applying the mask; if the result is non-zero, then this bit is set in candidate.
Update Maximum Count:
After counting the elements with the i-th bit set, we update ans to hold the maximum of ans and cnt.
Return the Result:
After iterating over all bit positions, ans holds the largest combination of elements with a common set bit, which is returned as the answer.
Complexity
Time complexity:
O(n*32) where n is the size of candidates

Space complexity:
O(1)


 */

/**
 * @param {number[]} candidates
 * @return {number}
 */
var largestCombination = function(candidates) {
    let ans = 0;
        for (let i = 0; i < 32; i++) {
            let cnt = 0;
            for (const candidate of candidates) {
                if (candidate & (1 << i)) cnt++;
            }
            ans = Math.max(ans, cnt);
        }
        return ans;
};