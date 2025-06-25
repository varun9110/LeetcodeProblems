/**
 * 2040. Kth Smallest Product of Two Sorted Arrays
 * Difficulty: Hard
 * 
 * Given two sorted 0-indexed integer arrays nums1 and nums2 as well as an integer k, return the kth (1-based) smallest product of nums1[i] * nums2[j] where 0 <= i < nums1.length and 0 <= j < nums2.length.
 

Example 1:

Input: nums1 = [2,5], nums2 = [3,4], k = 2
Output: 8
Explanation: The 2 smallest products are:
- nums1[0] * nums2[0] = 2 * 3 = 6
- nums1[0] * nums2[1] = 2 * 4 = 8
The 2nd smallest product is 8.
Example 2:

Input: nums1 = [-4,-2,0,3], nums2 = [2,4], k = 6
Output: 0
Explanation: The 6 smallest products are:
- nums1[0] * nums2[1] = (-4) * 4 = -16
- nums1[0] * nums2[0] = (-4) * 2 = -8
- nums1[1] * nums2[1] = (-2) * 4 = -8
- nums1[1] * nums2[0] = (-2) * 2 = -4
- nums1[2] * nums2[0] = 0 * 2 = 0
- nums1[2] * nums2[1] = 0 * 4 = 0
The 6th smallest product is 0.
Example 3:

Input: nums1 = [-2,-1,0,1,2], nums2 = [-3,-1,2,4,5], k = 3
Output: -6
Explanation: The 3 smallest products are:
- nums1[0] * nums2[4] = (-2) * 5 = -10
- nums1[0] * nums2[3] = (-2) * 4 = -8
- nums1[4] * nums2[0] = 2 * (-3) = -6
The 3rd smallest product is -6.
 

Constraints:

1 <= nums1.length, nums2.length <= 5 * 104
-105 <= nums1[i], nums2[j] <= 105
1 <= k <= nums1.length * nums2.length
nums1 and nums2 are sorted.
 */

/**
 * 💡 Intuition
The problem requires finding the k-th smallest product formed by multiplying every element of nums1 with every element of nums2. Since the total number of products is n * m (where n and mare the lengths of nums1 and nums2), a brute-force approach (computing all products and sorting them) would take O(nm log(nm)) time, which is inefficient for large inputs.

Instead, we use binary search on the answer space combined with nested binary search to count how many products are ≤ a given value. This reduces the time complexity to O(n log m log(max_product)), where max_product is the range of possible product values.

🤔Approach
1. Binary Search Setup

Initialize left = -1e10 and right = 1e10 (covering all possible products).

While left < right:

Compute mid = left + (right - left) / 2.
Calculate count = countLessOrEqual(nums1, nums2, mid).
If count < k, the k-th smallest product is larger than mid → set left = mid + 1.
Else, it’s ≤ mid → set right = mid.
2. Counting Products ≤ Target(countLessOrEqual)

For each num1 in nums1:

Case 1: num1 == 0
▪ If target ≥ 0, all nums2 elements contribute (count += nums2.length).

Case 2: num1 > 0
▪ Binary search to find the largest nums2[j] where num1 * nums2[j] ≤ target.
▪ The count is low (number of elements ≤ target).

Case 3: num1 < 0
▪ Binary search to find the smallest nums2[j] where num1 * nums2[j] ≤ target.
▪ The count is nums2.length - low (number of elements ≥ target).

3. Termination

When left == right, it is the smallest product with at least k products ≤ it (the k-th smallest).
Example Walkthrough 🚶‍♂️
Given:

nums1 = [2, 5]
nums2 = [3, 4]
k = 2 (Find the 2nd smallest product)
Step 1: Generate All Products

Compute all possible products:
◦ 2 × 3 = 6
◦ 2 × 4 = 8
◦ 5 × 3 = 15
◦ 5 × 4 = 20
• All products: [6, 8, 15, 20]

• Sorted products: [6, 8, 15, 20]

• Goal: The 2nd smallest product is 8.

Step 2: Binary Search Setup

Initial search range:
◦ left = -1_000_000_000_000L (minimum possible product)
◦ right = 1_000_000_000_000L (maximum possible product)
Step 3: Binary Search Iterations

Iteration 1:

mid = (left + right) / 2 = 0

Count products ≤ 0:

For num1 = 2 (positive):
▪ Binary search in nums2 = [3, 4] for 2 * nums2[j] ≤ 0 → No such j → count = 0.
For num1 = 5 (positive):
▪ Binary search in nums2 for 5 * nums2[j] ≤ 0 → No such j → count = 0.

Total count = 0.

• Decision: 0 < 2 → Search right half → left = mid + 1 = 1.

Iteration 2:

left = 1, right = 1_000_000_000_000L

mid = 500_000_000_000L

Count products ≤ 500_000_000_000L:

For num1 = 2:
▪ All products (6, 8) ≤ 500_000_000_000L → count = 2.

For num1 = 5:
▪ All products (15, 20) ≤ 500_000_000_000L → count = 2.

Total count = 4.

• Decision: 4 ≥ 2 → Search left half → right = mid = 500_000_000_000L.

Iteration 3:

left = 1, right = 500_000_000_000L

mid = 250_000_000_000L

Count products ≤ 250_000_000_000L:

All products (6, 8, 15, 20) ≤ 250_000_000_000L → count = 4.
Decision: 4 ≥ 2 → Search left half → right = mid = 250_000_000_000L.

... (Skipping intermediate steps) ...

Iteration N-1:

left = 6, right = 8

mid = 7

Count products ≤ 7:

For num1 = 2:
▪ 2 * 3 = 6 ≤ 7 → count = 1.
▪ 2 * 4 = 8 > 7 → Stop.
For num1 = 5:
▪ 5 * 3 = 15 > 7 → count = 0.
Total count = 1.

Decision: 1 < 2 → Search right half → left = mid + 1 = 8.

Iteration N:

left = 8, right = 8

Terminate: left == right → Answer found!

Final Answer
The 2nd smallest product is 8, which matches the expected result from the sorted list [6, 8, 15, 20].
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var kthSmallestProduct = function(nums1, nums2, k) {
    let left = -1e10, right = 1e10;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (countProducts(nums1, nums2, mid) < k) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
};

function countProducts(nums1, nums2, target) {
    let count = 0;
    for (let num1 of nums1) {
        if (num1 === 0) {
            if (target >= 0) count += nums2.length;
            continue;
        }

        let low = 0, high = nums2.length;
        while (low < high) {
            let mid = Math.floor((low + high) / 2);
            let product = num1 * nums2[mid];
            if (product <= target) {
                if (num1 > 0) low = mid + 1;
                else high = mid;
            } else {
                if (num1 > 0) high = mid;
                else low = mid + 1;
            }
        }

        count += (num1 > 0) ? low : nums2.length - low;
    }
    return count;
}