/**
 * 2598. Smallest Missing Non-negative Integer After Operations
 * Difficulty: Medium
 * 
 * You are given a 0-indexed integer array nums and an integer value.

In one operation, you can add or subtract value from any element of nums.

For example, if nums = [1,2,3] and value = 2, you can choose to subtract value from nums[0] to make nums = [-1,2,3].
The MEX (minimum excluded) of an array is the smallest missing non-negative integer in it.

For example, the MEX of [-1,2,3] is 0 while the MEX of [1,0,3] is 2.
Return the maximum MEX of nums after applying the mentioned operation any number of times.

 

Example 1:

Input: nums = [1,-10,7,13,6,8], value = 5
Output: 4
Explanation: One can achieve this result by applying the following operations:
- Add value to nums[1] twice to make nums = [1,0,7,13,6,8]
- Subtract value from nums[2] once to make nums = [1,0,2,13,6,8]
- Subtract value from nums[3] twice to make nums = [1,0,2,3,6,8]
The MEX of nums is 4. It can be shown that 4 is the maximum MEX we can achieve.
Example 2:

Input: nums = [1,-10,7,13,6,8], value = 7
Output: 2
Explanation: One can achieve this result by applying the following operation:
- subtract value from nums[2] once to make nums = [1,-10,0,13,6,8]
The MEX of nums is 2. It can be shown that 2 is the maximum MEX we can achieve.
 

Constraints:

1 <= nums.length, value <= 105
-109 <= nums[i] <= 109
 */

/**
 * 💡 Intuition
The key idea is that adding or subtracting value any number of times doesn’t change a number’s remainder modulo value.
So, each number in nums can represent all integers that share the same remainder when divided by value.
We just need to track how many numbers exist for each remainder — then find the smallest integer we can’t form using those counts. 🚀

🧩 Approach
🔢 Create an array remainderCount of size value to store the frequency of each remainder.

➕ For each num in nums, compute its normalized remainder as
((num % value) + value) % value (this ensures the remainder is non-negative).

📊 Increment the frequency of that remainder.

🧠 Starting from result = 0, repeatedly check if there’s still a number available for the remainder result % value.

If yes, decrement that remainder’s count and increment result.

If no, result is the smallest non-negative integer that can’t be formed.

✅ Return result.

Complexity
Time complexity : O(n) — We process each element once and then increment result linearly until we find the answer.

Space complexity : O(value) — We use an array of size value to track remainder counts.
 */

/**
 * @param {number[]} nums
 * @param {number} value
 * @return {number}
 */
var findSmallestInteger = function (nums, value) {
    const remainderCount = new Array(value).fill(0);

    for (const num of nums) {
        const rem = ((num % value) + value) % value;
        remainderCount[rem]++;
    }

    let result = 0;
    while (remainderCount[result % value] > 0) {
        remainderCount[result % value]--;
        result++;
    }

    return result;
};