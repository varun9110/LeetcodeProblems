/**
 * 3477. Fruits Into Baskets II
 * Difficulty: Easy
 * 
 * You are given two arrays of integers, fruits and baskets, each of length n, where fruits[i] represents the quantity of the ith type of fruit, and baskets[j] represents the capacity of the jth basket.

From left to right, place the fruits according to these rules:

Each fruit type must be placed in the leftmost available basket with a capacity greater than or equal to the quantity of that fruit type.
Each basket can hold only one type of fruit.
If a fruit type cannot be placed in any basket, it remains unplaced.
Return the number of fruit types that remain unplaced after all possible allocations are made.

 

Example 1:

Input: fruits = [4,2,5], baskets = [3,5,4]

Output: 1

Explanation:

fruits[0] = 4 is placed in baskets[1] = 5.
fruits[1] = 2 is placed in baskets[0] = 3.
fruits[2] = 5 cannot be placed in baskets[2] = 4.
Since one fruit type remains unplaced, we return 1.

Example 2:

Input: fruits = [3,6,1], baskets = [6,4,7]

Output: 0

Explanation:

fruits[0] = 3 is placed in baskets[0] = 6.
fruits[1] = 6 cannot be placed in baskets[1] = 4 (insufficient capacity) but can be placed in the next available basket, baskets[2] = 7.
fruits[2] = 1 is placed in baskets[1] = 4.
Since all fruits are successfully placed, we return 0.

 

Constraints:

n == fruits.length == baskets.length
1 <= n <= 100
1 <= fruits[i], baskets[i] <= 1000
 */

/**
 * 🔍 Intuition
Imagine you’re placing fruits into baskets one by one. Each fruit has a size (quantity), and each basket has a fixed capacity.

The rule is simple:

Place the fruit in the first basket (from left to right) that can hold it.
Each basket can only be used once.
If no basket can fit the fruit, it remains unplaced.
This naturally leads us to a greedy approach — always try to place each fruit in the earliest basket that fits.

🧠 Approach
Loop through each fruit in the given order.
For every fruit, scan from left to right through all baskets.
If you find a basket that hasn't been used and its capacity is greater than or equal to the fruit:
Place the fruit there.
Mark the basket as used (set its capacity to -1).
Move to the next fruit.
Keep a count of how many fruits got placed.
Finally, return total fruits - placed fruits → this gives the number of unplaced fruits.
📦 Example
🍇 Example 1
fruits = [4, 2, 5]
baskets = [3, 5, 4]

Step 1: fruit 4 → basket 5 ✅
Step 2: fruit 2 → basket 3 ✅
Step 3: fruit 5 → basket 4 ❌ (not enough)

Result: 1 fruit unplaced

fruits = [3, 6, 1]
baskets = [6, 4, 7]

Step 1: fruit 3 → basket 6 ✅
Step 2: fruit 6 → basket 4 ❌ → basket 7 ✅
Step 3: fruit 1 → basket 4 ✅

Result: 0 fruits unplaced

⏱️ Complexity
Time Complexity:
O(n 
2
 )
We use a nested loop: for each of the n fruits, we potentially scan up to n baskets to find a suitable one. Since n ≤ 100, this is acceptable and fast in practice.

Space Complexity:
O(1)
We do not use any extra data structures. We modify the baskets array in-place to mark used baskets, so the space usage stays constant regardless of input size.
 */

/**
 * @param {number[]} fruits
 * @param {number[]} baskets
 * @return {number}
 */
var numOfUnplacedFruits = function(fruits, baskets) {
    let n = fruits.length, alloted = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (fruits[i] <= baskets[j]) {
                baskets[j] = -1; // mark used
                alloted++;
                break;
            }
        }
    }
    return n - alloted;
};