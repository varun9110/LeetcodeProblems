/**
 * 1110. Delete Nodes And Return Forest
 * Difficulty: Medium
 * 
 * Given the root of a binary tree, each node in the tree has a distinct value.

After deleting all nodes with a value in to_delete, we are left with a forest (a disjoint union of trees).
Return the roots of the trees in the remaining forest. You may return the result in any order.

Example 1:
Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
Output: [[1,2,null,4],[6],[7]]
Example 2:
Input: root = [1,2,4,null,3], to_delete = [3]
Output: [[1,2,4]]

Constraints:
The number of nodes in the given tree is at most 1000.
Each node has a distinct value between 1 and 1000.
to_delete.length <= 1000
to_delete contains distinct values between 1 and 1000.
 */

/**
 * Approach 1: Recursion
🤔 Intuition
The first way to solve problem I've came up with - recursion, let's look at this approach

First of all, general for every approach it's good to convert to_delete into hashset (set) because we are going to check for every node if its value is in to_delete and looking for this value in array would be O(n) which will be in total O(n * m) where n - number of nodes and m - number of nodes to delete, so we convert to_delete in the set to have ability to search for element in O(1) time.
Let's imagine that we've hidden every node in tree except current node, its parent and children. Let's think about logic we want to apply for every single node - this is a key to solve almost any recursion problem.
For every node we want to do so:
In any case we have to delete this node or not we want to continue our recursion - so we will call recursive function on both our children.
In general this is all we want to do in case this node will be saved. Now let's think what we need to do in case when we need to delete this node:
First of all we want to disconnect this node from its parent (so we'll pass as parameters to our function parent node and whether current node is left child of parent)
Then, we know that after deleting both our children will be roots for two trees if they exist, but here's a problem - what if we already deleted parent node and now looking at child we want to delete too? We just need to delete this node as root from result and add its children - all is simple.
In fact, this is whole logic for recursion approach, it's not hard to come up with, let's make a quick dry run and move on to the code.
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

var delNodes = function(root, to_delete) {
    let res = {};
    let to_delete_set = new Set(to_delete);
    res[root.val] = root;

    function recursion(parent, cur_node, isleft) {
        if (cur_node === null) return;

        recursion(cur_node, cur_node.left, true);
        recursion(cur_node, cur_node.right, false);

        if (to_delete_set.has(cur_node.val)) {
            delete res[cur_node.val];

            if (parent !== null) {
                if (isleft) {
                    parent.left = null;
                } else {
                    parent.right = null;
                }
            }

            if (cur_node.left !== null) {
                res[cur_node.left.val] = cur_node.left;
            }
            if (cur_node.right !== null) {
                res[cur_node.right.val] = cur_node.right;
            }
        }
    }

    recursion(null, root, false);

    return Object.values(res);
};


/**
 * Approach 2: Iterative BFS
🤔 Intuition
This approach is following quite the same logic as previous, but it's a little cleaner. Here is a trick - we won't add node at res at all if we know we will delete it after.
If we go from top to bottom then with logic above we can not think about res at all - all added nodes will be valid roots.
Considering the model we want to follow we will use BFS to traverse the tree, other logic is the same as it was in Approach 1, but let's make the same dry run but with this approach.
 */

var delNodes = function(root, to_delete) {
    if (!root) return [];

    let toDeleteSet = new Set(to_delete);
    let result = [];
    let queue = [root];

    while (queue.length > 0) {
        let curNode = queue.shift();

        if (curNode.left) {
            queue.push(curNode.left);
            if (toDeleteSet.has(curNode.left.val)) {
                curNode.left = null;
            }
        }

        if (curNode.right) {
            queue.push(curNode.right);
            if (toDeleteSet.has(curNode.right.val)) {
                curNode.right = null;
            }
        }

        if (toDeleteSet.has(curNode.val)) {
            if (curNode.left) {
                result.push(curNode.left);
            }
            if (curNode.right) {
                result.push(curNode.right);
            }
        } else if (result.length === 0) {
            result.push(curNode);
        }
    }

    return result;
};