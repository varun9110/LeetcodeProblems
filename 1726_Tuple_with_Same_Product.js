/**
 * 1726. Tuple with Same Product
 * Difficulty: Medium
 * 
 * Given an array nums of distinct positive integers, return the number of tuples (a, b, c, d) such that a * b = c * d where a, b, c, and d 
 * are elements of nums, and a != b != c != d.

Example 1:

Input: nums = [2,3,4,6]
Output: 8
Explanation: There are 8 valid tuples:
(2,6,3,4) , (2,6,4,3) , (6,2,3,4) , (6,2,4,3)
(3,4,2,6) , (4,3,2,6) , (3,4,6,2) , (4,3,6,2)
Example 2:
Input: nums = [1,2,4,5,10]
Output: 16
Explanation: There are 16 valid tuples:
(1,10,2,5) , (1,10,5,2) , (10,1,2,5) , (10,1,5,2)
(2,5,1,10) , (2,5,10,1) , (5,2,1,10) , (5,2,10,1)
(2,10,4,5) , (2,10,5,4) , (10,2,4,5) , (10,2,5,4)
(4,5,2,10) , (4,5,10,2) , (5,4,2,10) , (5,4,10,2)
 

Constraints:

1 <= nums.length <= 1000
1 <= nums[i] <= 104
All elements in nums are distinct.
 */


/**
 *  Intuition
We need to count (a, b, c, d) such that: a * b = c * d
Instead of checking all 4-tuples, use a hashmap to track product frequencies pairwise.

🚀 Approach
1️⃣ Compute all pairs (i, j) and their products.
2️⃣ Store product frequencies in a hashmap.
3️⃣ For each new pair (x, y), if product = x * y exists in the map:

We can pair it with all previous occurrences → forming 8 × count(product) new tuples.
4️⃣ Update the hashmap for future pairs.
🧠 Why 8 × count(product)?
Each matching pair (p1, p2) & (q1, q2) can be arranged as:
✅ (p1, p2, q1, q2), (p2, p1, q1, q2), (p1, p2, q2, q1), … (8 ways).
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var tupleSameProduct = function(nums) {
    let productCount = new Map(), result = 0;

    for (let i = 0; i < nums.length; i++)
        for (let j = i+1; j < nums.length; j++) {
            let product = nums[i] * nums[j];
            result += 8 * (productCount.get(product) || 0);
            productCount.set(product, (productCount.get(product) || 0) + 1);
        }

    return result;
};