/**
 * 494. Target Sum
 * Difficulty:: Medium
 * 
 * You are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

 

Example 1:

Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
Example 2:

Input: nums = [1], target = 1
Output: 1
 

Constraints:

1 <= nums.length <= 20
0 <= nums[i] <= 1000
0 <= sum(nums[i]) <= 1000
-1000 <= target <= 1000
 */

/**
 * Intuition
The problem can be approached by splitting the array into two halves and finding all possible sums of subsets for each half. 
By leveraging the subset sums, we can determine the number of ways to achieve the target value by combining sums from the two halves. 
This approach reduces the complexity compared to directly calculating all subset combinations.

🛠️ Approach
Split the Array:

Divide the input array into two halves: left and right.
Compute Subset Sums:

For both halves, compute all possible sums of subsets using a recursive approach or iterative summation. 
Store these sums in two separate arrays (sums1 for the first half and sums2 for the second half).
Store Frequency of Subset Sums:

Use a hash map (countMap) to count the occurrences of each sum in sums2.
Count Target Combinations:

For each sum in sums1, calculate the complement required to reach the target (target - sum).
Check if this complement exists in countMap. If it does, add its frequency to the total count.
Return the Total Count:

The final count represents the total number of ways to achieve the target sum.
📊 Complexity
Time complexity:

Generating subset sums for each half takes O(2 n/2 ), where n is the size of the array.
Using a hash map for lookup and summation takes O(2 n/2).
Overall complexity is O(2 n/2).
Space complexity:

Storage for subset sums and hash map requires O(2 n/2).
Overall space complexity is O(2 n/2).
 */

 /**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
    const computeSums = (nums, start, end) => {
        const sums = [0];
        for (let i = start; i < end; i++) {
            const num = nums[i];
            const n = sums.length;
            for (let j = 0; j < n; j++) {
                sums.push(sums[j] + num);
                sums[j] -= num;
            }
        }
        return sums;
    };

    const n = nums.length, mid = Math.floor(n / 2);
    const sums1 = computeSums(nums, 0, mid);
    const sums2 = computeSums(nums, mid, n);
    const countMap = new Map();

    for (const sum of sums2) {
        countMap.set(sum, (countMap.get(sum) || 0) + 1);
    }

    let total = 0;
    for (const sum of sums1) {
        const complement = target - sum;
        if (countMap.has(complement)) {
            total += countMap.get(complement);
        }
    }

    return total;
};