/**
 * 2096. Step-By-Step Directions From a Binary Tree Node to Another
 * Difficulty: Medium
 * 
 * You are given the root of a binary tree with n nodes. Each node is uniquely assigned a value from 1 to n. 
 * You are also given an integer startValue representing the value of the start node s, and a different integer 
 * destValue representing the value of the destination node t.

Find the shortest path starting from node s and ending at node t. Generate step-by-step directions of such path as a 
string consisting of only the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific direction:

'L' means to go from a node to its left child node.
'R' means to go from a node to its right child node.
'U' means to go from a node to its parent node.
Return the step-by-step directions of the shortest path from node s to node t.

Example 1:
Input: root = [5,1,2,3,null,6,4], startValue = 3, destValue = 6
Output: "UURL"
Explanation: The shortest path is: 3 → 1 → 5 → 2 → 6.
Example 2:
Input: root = [2,1], startValue = 2, destValue = 1
Output: "L"
Explanation: The shortest path is: 2 → 1.

Constraints:
The number of nodes in the tree is n.
2 <= n <= 105
1 <= Node.val <= n
All the values in the tree are unique.
1 <= startValue, destValue <= n
startValue != destValue
 */

/**
 * Approach 1: Graph Converting and BFS
🤔 Intuition
The problem becomes very easy if this would be graph, isn't it? So can we just convert this binary tree to graph adding 
some information about every child's parent so we can go through them easily?
We can do so and solve this problem in four steps:
We're given only values of start and destination, but to run any graph search algorithm we do need the node itself, 
so first of all we will find start node
Then for every child node we want to remember its parent so we can move up easily
We want to run BFS (or DFS) starting from start_node and as soon as we reached destination node we want to end searching
We need to construct path in such a way it was asked in the problem
In fact, this logic is enough for you to write the code for this approach, but let's look at some short dry 
run (Hide it to details as I made it quite big)
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
var getDirections = function(root, startValue, destValue) {
    let startNode = null;
    const findStartNode = (node) => {
        if (!node) return false;
        if (node.val === startValue) {
            startNode = node;
            return true;
        }
        return findStartNode(node.left) || findStartNode(node.right);
    };

    findStartNode(root);

    const nodesParents = {};
    const queue = [root];

    while (queue.length > 0) {
        const node = queue.shift();
        if (node.left) {
            nodesParents[node.left.val] = node;
            queue.push(node.left);
        }
        if (node.right) {
            nodesParents[node.right.val] = node;
            queue.push(node.right);
        }
    }

    const visited = new Set();
    const trackedPath = {};
    let destinationNode = null;
    const bfs = (start) => {
        const queue = [start];
        visited.add(start);

        while (queue.length > 0) {
            const node = queue.shift();

            if (node.val === destValue) {
                destinationNode = node;
                break;
            }

            if (nodesParents[node.val] && !visited.has(nodesParents[node.val].val)) {
                const parent = nodesParents[node.val];
                queue.push(parent);
                trackedPath[parent.val] = [node, "U"];
                visited.add(parent.val);
            }

            if (node.left && !visited.has(node.left.val)) {
                queue.push(node.left);
                trackedPath[node.left.val] = [node, "L"];
                visited.add(node.left.val);
            }

            if (node.right && !visited.has(node.right.val)) {
                queue.push(node.right);
                trackedPath[node.right.val] = [node, "R"];
                visited.add(node.right.val);
            }
        }
    };

    bfs(startNode);

    const resultPath = [];
    let curNode = destinationNode;

    while (curNode !== startNode) {
        const [sourceNode, direction] = trackedPath[curNode.val];
        resultPath.push(direction);
        curNode = sourceNode;
    }

    resultPath.reverse();
    return resultPath.join("");
};


/**
 * Approach 2:
 * 
 * Intuition
First of all, before I explain you this approach I recommend you solving first this problem to understand basic concept of the LCA: problem

In the tree there's exactly one path from node to node and if we look at some examples here's pattern how we're reaching destination node
This is pattern: we go up to LCA of the nodes given to us and then go from it to destination node, so "U" will never be at the end of 
the path if path contains anything except "U"
But in fact we don't need to explicitly find LCA, all we want to do is to find paths from root to given nodes and then "cut" their common path
When we found the length from the root to LCA or the length of common paths to start node and destination node we want to first go up 
as disscussed above up to LCA so length_from_root_to_start_node - length_from_root_to_LCA "U" and then go to the right node which is just 
part of path that is not common between start_node and destination_node
👩🏻‍💻 Coding
Define Helper Function: find_path_from_root is defined to recursively find the path from the root to a specified target node (target_value). 
It appends "R" or "L" to path_to_append to denote right or left moves, respectively.
Calculate Paths: Initialize path_to_start and path_to_destination as empty lists. Populate them using find_path_from_root with startValue 
and destValue, respectively.
Find Common Path Length: Initialize common_path_len to determine the length of the shared path between path_to_start and path_to_destination. 
Iterate until paths differ or reach the end.
Construct Result:
Initialize res with "U" repeated for each step from startValue to the lowest common ancestor (LCA) with destValue.
Append the path from the LCA to destValue excluding the common path.
Return Constructed String: Join res into a single string and return it as the result.
 */

var getDirections = function(root, startValue, destValue) {
    const findPathFromRoot = (curNode, targetValue, pathToAppend) => {
        if (!curNode) return false;
        if (curNode.val === targetValue) return true;

        pathToAppend.push("R");
        if (findPathFromRoot(curNode.right, targetValue, pathToAppend)) return true;
        pathToAppend.pop();

        pathToAppend.push("L");
        if (findPathFromRoot(curNode.left, targetValue, pathToAppend)) return true;
        pathToAppend.pop();

        return false;
    };

    const pathToStart = [];
    const pathToDestination = [];

    findPathFromRoot(root, startValue, pathToStart);
    findPathFromRoot(root, destValue, pathToDestination);

    let commonPathLen = 0;
    while (commonPathLen < pathToStart.length &&
           commonPathLen < pathToDestination.length &&
           pathToStart[commonPathLen] === pathToDestination[commonPathLen]) {
        commonPathLen++;
    }

    const res = [];
    for (let i = 0; i < pathToStart.length - commonPathLen; i++) {
        res.push("U");
    }
    res.push(...pathToDestination.slice(commonPathLen));

    return res.join("");
};