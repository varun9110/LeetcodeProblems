/**
 * 1760. Minimum Limit of Balls in a Bag
 * Diffiult: medium
 * 
 * You are given an integer array nums where the ith bag contains nums[i] balls. You are also given an integer maxOperations.

You can perform the following operation at most maxOperations times:

Take any bag of balls and divide it into two new bags with a positive number of balls.
For example, a bag of 5 balls can become two new bags of 1 and 4 balls, or two new bags of 2 and 3 balls.
Your penalty is the maximum number of balls in a bag. You want to minimize your penalty after the operations.

Return the minimum possible penalty after performing the operations.

 

Example 1:

Input: nums = [9], maxOperations = 2
Output: 3
Explanation: 
- Divide the bag with 9 balls into two bags of sizes 6 and 3. [9] -> [6,3].
- Divide the bag with 6 balls into two bags of sizes 3 and 3. [6,3] -> [3,3,3].
The bag with the most number of balls has 3 balls, so your penalty is 3 and you should return 3.
Example 2:

Input: nums = [2,4,8,2], maxOperations = 4
Output: 2
Explanation:
- Divide the bag with 8 balls into two bags of sizes 4 and 4. [2,4,8,2] -> [2,4,4,4,2].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,4,4,4,2] -> [2,2,2,4,4,2].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,2,2,4,4,2] -> [2,2,2,2,2,4,2].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,2,2,2,2,4,2] -> [2,2,2,2,2,2,2,2].
The bag with the most number of balls has 2 balls, so your penalty is 2, and you should return 2.
 

Constraints:

1 <= nums.length <= 105
1 <= maxOperations, nums[i] <= 109
 */

/**
 * 🌟 Intuition
The goal of this problem is to minimize the maximum number of balls in any bag after performing a maximum of maxOperations splits. We can solve this problem using binary search on the possible penalty values. The intuition behind the solution is to find the smallest maximum bag size that allows us to split the bags optimally within the allowed number of operations.

🧠 Approach
Binary Search Setup:

Start by defining the search space for the penalty:
The minimum possible penalty is 1 (smallest possible bag size).
The maximum possible penalty is the largest element in the nums array (the size of the largest bag).
We will perform binary search within this range to find the smallest possible maximum penalty that can be achieved.
Feasibility Check:

For each mid-point during the binary search, we calculate the required number of splits to ensure no bag exceeds the mid-point value. If we can achieve this with at most maxOperations splits, we continue searching for a smaller penalty.
If the number of splits exceeds the allowed maxOperations, we try a larger penalty.
🚀 Time Complexity
Binary Search Time Complexity: O(log(max(nums))), where max(nums) is the largest element in the input array.
Feasibility Check Time Complexity: O(n), where n is the size of the array, since we are iterating through all elements to calculate the number of splits.
Thus, the overall time complexity of the algorithm is O(n log(max(nums))).


 */

var minimumSize = function(nums, maxOperations) {
    const canDivide = (nums, maxOperations, penalty) => {
        let operations = 0;
        for (let num of nums) {
            if (num > penalty) {
                operations += Math.floor((num - 1) / penalty);
                if (operations > maxOperations) return false;
            }
        }
        return true;
    };

    let left = 1, right = Math.max(...nums), result = right;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (canDivide(nums, maxOperations, mid)) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return result;
};