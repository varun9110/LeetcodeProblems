/**
 * 3479. Fruits Into Baskets III
 * Difficulty: Medium
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
1 <= n <= 105
1 <= fruits[i], baskets[i] <= 109
 */

/**
 * Step by Step Explanation
Segment Tree Initialization
We build a segment tree to allow efficient range maximum queries and updates.

Let:

tree: segment tree array of size 4n
Build Rule:

Recursive build of segment tree from the baskets array:

Leaf nodes: basket capacities
Internal nodes: maximum capacity in their respective segments
Update recurrence:

tree[i]=max(tree[2i+1],tree[2i+2])
​
 
Place Each Fruit
Iterate over each fruit:

Query the segment tree for the leftmost index where:
tree[i]≥fruit
​
 
If found:

Set that leaf to 0 (used)
Update segment tree from bottom-up
If not found:

Increment unplaced fruit counter
Segment Tree Search
During recursive placement:

If the current node’s max is less than fruit, return False
If at a leaf, set to 0 and return True
Otherwise:
Try left subtree first
If left fails, try right subtree
Maintain the segment tree property after update:

tree[i]=max(tree[2i+1],tree[2i+2])
​
 
​
 
Return the number of fruit types that could not be placed into any basket.

Time Complexity: O(nlogn)
Space Complexity: O(n)

 */

/**
 * @param {number[]} fruits
 * @param {number[]} baskets
 * @return {number}
 */
const numOfUnplacedFruits = (fruits, baskets) => {
    if (!fruits || !baskets) return -1;
    const size = fruits.length;
    if (size !== baskets.length) return -2;

    const tree = new Array(4 * size).fill(0);
    buildTree(tree, baskets, 0, 0, size - 1);

    let count = 0;
    for (const fruit of fruits) {
        if (!placeFruit(tree, 0, 0, size - 1, fruit)) count++;
    }
    return count;
};

const buildTree = (tree, baskets, i, low, high) => {
    if (low === high) {
        tree[i] = baskets[low];
        return;
    }

    const mid = (low + high) >> 1;
    const left = 2 * i + 1;
    const right = left + 1;

    buildTree(tree, baskets, left, low, mid);
    buildTree(tree, baskets, right, mid + 1, high);

    tree[i] = Math.max(tree[left], tree[right]);
};

const placeFruit = (tree, i, low, high, value) => {
    if (tree[i] < value) return false;

    if (low === high) {
        tree[i] = 0;
        return true;
    }

    const mid = (low + high) >> 1;
    const left = (i << 1) + 1;
    const right = left + 1;

    let found;
    if (tree[left] >= value) {
        found = placeFruit(tree, left, low, mid, value);
    } else {
        found = placeFruit(tree, right, mid + 1, high, value);
    }

    tree[i] = Math.max(tree[left], tree[right]);
    return found;
};