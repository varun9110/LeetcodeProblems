/**
 * 2471. Minimum Number of Operations to Sort a Binary Tree by Level
 * Difficulty: Medium
 * 
 * You are given the root of a binary tree with unique values.

In one operation, you can choose any two nodes at the same level and swap their values.

Return the minimum number of operations needed to make the values at each level sorted in a strictly increasing order.

The level of a node is the number of edges along the path between it and the root node.

 

Example 1:
Input: root = [1,4,3,7,6,8,5,null,null,null,null,9,null,10]
Output: 3
Explanation:
- Swap 4 and 3. The 2nd level becomes [3,4].
- Swap 7 and 5. The 3rd level becomes [5,6,8,7].
- Swap 8 and 7. The 3rd level becomes [5,6,7,8].
We used 3 operations so return 3.
It can be proven that 3 is the minimum number of operations needed.
Example 2:
Input: root = [1,3,2,7,6,5,4]
Output: 3
Explanation:
- Swap 3 and 2. The 2nd level becomes [2,3].
- Swap 7 and 4. The 3rd level becomes [4,6,5,7].
- Swap 6 and 5. The 3rd level becomes [4,5,6,7].
We used 3 operations so return 3.
It can be proven that 3 is the minimum number of operations needed.
Example 3:
Input: root = [1,2,3,4,5,6]
Output: 0
Explanation: Each level is already sorted in increasing order so return 0.
 

Constraints:

The number of nodes in the tree is in the range [1, 105].
1 <= Node.val <= 105
All the values of the tree are unique.
 */

/**
 * Intuition 💡
The task is to make the values at each level of a binary tree sorted in strictly increasing order by performing the minimum number of operations, where in each operation, we can swap any two nodes that are at the same level.

At a high level, we can solve this by:

Performing a level-order traversal to gather the node values at each level.
Sorting these values at each level while tracking their original indices.
Detecting the minimum number of swaps needed to rearrange the node values in sorted order.
The key observation here is that sorting the values can be reduced to counting the number of cycles in the permutation of values, and the minimum number of swaps needed to fix each cycle is cycle size - 1.

Approach 🚀
1. Level-Order Traversal 🌲
We traverse the binary tree level by level using BFS (Breadth-First Search).
At each level, we gather all the node values into a list for sorting.
This ensures that all nodes at a given depth are processed together.
The BFS ensures that we explore each node once, allowing us to collect node values at each level efficiently.
2. Sorting the Values at Each Level 🔄
Once we have all the values of nodes at a level, we need to sort them.
To minimize the swaps, we must track the positions of the values after sorting, so we can figure out where each element originally belonged.
We can achieve this by storing each node’s value along with its original index and then sorting this list by the node values.
After sorting, the original indices tell us where the values should move to.
3. Cycle Detection to Find Minimum Swaps 🔍
To compute the minimum number of swaps, we must identify cycles in the index mapping:
If a node is already in the correct position or has already been visited, we skip it.
If a node is out of place, it belongs to a cycle where it needs to be swapped into its correct position.
For a cycle of size k, the minimum number of swaps required is k - 1.
We can track visited nodes using a visited array and process each cycle individually.
4. Total Swaps for All Levels ➕
Once we calculate the number of swaps for each level, we sum them up to get the total minimum operations required for the entire tree.
Complexity 📊
Time Complexity:

Tree Traversal: O(n), where n is the total number of nodes in the tree. Every node is processed once during the BFS.
Sorting Each Level: Sorting at each level requires O(k log k) time, where k is the number of nodes at that level.
Overall, the time complexity is dominated by the sorting operations. Since the total number of nodes across all levels is n, the overall time complexity is O(n log n).
Space Complexity:

We store the values and their indices for each level, so the space complexity for storing node values at a level is O(k), where k is the number of nodes at that level.
The BFS queue also uses O(n) space, as it holds nodes at all levels.
Hence, the total space complexity is O(n).
 */

var minSwapsToSort = function(arr) {
    const n = arr.length;
    const indexedArr = arr.map((val, index) => [val, index]);
    indexedArr.sort((a, b) => a[0] - b[0]);
    const visited = Array(n).fill(false);
    let swaps = 0;

    for (let i = 0; i < n; i++) {
        if (visited[i] || indexedArr[i][1] === i) {
            continue;
        }

        let cycleSize = 0;
        let j = i;
        while (!visited[j]) {
            visited[j] = true;
            j = indexedArr[j][1];
            cycleSize++;
        }

        if (cycleSize > 1) {
            swaps += cycleSize - 1;
        }
    }

    return swaps;
};

var minimumOperations = function(root) {
    if (!root) return 0;

    let queue = [root];
    let operations = 0;

    while (queue.length) {
        const levelSize = queue.length;
        const level = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            level.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        operations += minSwapsToSort(level);
    }

    return operations;
};