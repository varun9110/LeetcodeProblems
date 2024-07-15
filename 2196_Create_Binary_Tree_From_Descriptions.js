/**
 * 2196. Create Binary Tree From Descriptions
 * Difficulty: Medium
 * 
 * You are given a 2D integer array descriptions where descriptions[i] = [parenti, childi, isLefti] indicates 
 * that parenti is the parent of childi in a binary tree of unique values. Furthermore,

If isLefti == 1, then childi is the left child of parenti.
If isLefti == 0, then childi is the right child of parenti.
Construct the binary tree described by descriptions and return its root.

The test cases will be generated such that the binary tree is valid.


Example 1:

Input: descriptions = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]]
Output: [50,20,80,15,17,19]
Explanation: The root node is the node with value 50 since it has no parent.
The resulting binary tree is shown in the diagram.
Example 2:

Input: descriptions = [[1,2,1],[2,3,0],[3,4,1]]
Output: [1,2,null,null,3,4]
Explanation: The root node is the node with value 1 since it has no parent.
The resulting binary tree is shown in the diagram.

Constraints:
1 <= descriptions.length <= 104
descriptions[i].length == 3
1 <= parenti, childi <= 105
0 <= isLefti <= 1
The binary tree described by descriptions is valid.
 */

/**
 * Approach:
 *  Intuition
Constructing binary tree with recursion is a simple task but we have a problem there - we can't start to create tree from random node.
The easiest way to construct binary tree - from root node to the bottom.
What we can say about root? How can we know for sure that exactly this node is the root? The answer is - root must appear 
in the descriptions at least once as parent (because if it's not, then binary tree is empty, there's no nodes at all). 
This is how we can find root node - it appears as parent but never appears as child.
After defining root node we can easily create binary tree using recursion and for easy and fast access to children nodes 
values we'll use hashmap where keys are parent nodes and value is the array of two elements - one for left child node value and one for right.

 */

var createBinaryTree = function(descriptions) {
    let childrenSet = new Set();
    let childrenHashmap = new Map();

    for (let [parent, child, isLeft] of descriptions) {
        if (!childrenHashmap.has(parent)) {
            childrenHashmap.set(parent, [-1, -1]);
        }

        childrenSet.add(child);

        if (isLeft === 1) {
            childrenHashmap.get(parent)[0] = child;
        } else {
            childrenHashmap.get(parent)[1] = child;
        }
    }

    let headNodeVal;
    for (let parent of childrenHashmap.keys()) {
        if (!childrenSet.has(parent)) {
            headNodeVal = parent;
            break;
        }
    }

    return constructTree(headNodeVal, childrenHashmap);
};

function constructTree(curNodeVal, childrenHashmap) {
    let newNode = new TreeNode(curNodeVal);
    if (childrenHashmap.has(curNodeVal)) {
        let [left, right] = childrenHashmap.get(curNodeVal);
        if (left !== -1) {
            newNode.left = constructTree(left, childrenHashmap);
        }
        if (right !== -1) {
            newNode.right = constructTree(right, childrenHashmap);
        }
    }
    return newNode;
}