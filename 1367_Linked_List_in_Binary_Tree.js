/**
 * 1367. Linked List in Binary Tree
 * Difficulty: Medium
 * 
 * Given a binary tree root and a linked list with head as the first node. 

Return True if all the elements in the linked list starting from the head correspond to some downward path connected in the binary tree otherwise return False.

In this context downward path means a path that starts at some node and goes downwards.

 

Example 1:



Input: head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Explanation: Nodes in blue form a subpath in the binary Tree.  
Example 2:



Input: head = [1,4,2,6], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Example 3:

Input: head = [1,4,2,6,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: false
Explanation: There is no path in the binary tree that contains all the elements of the linked list from head.
 

Constraints:

The number of nodes in the tree will be in the range [1, 2500].
The number of nodes in the list will be in the range [1, 100].
1 <= Node.val <= 100 for each node in the linked list and binary tree.
 */

/**
 * Intuition
The goal is to determine if the elements in the linked list correspond to a downward path in a binary tree. We start from any node in the tree and check if we can find the sequence of values from the linked list along a path down the tree. The search must continue along valid paths and stop when we either find the full sequence or determine it doesn't exist.

The key is to use Depth-First Search (DFS) to explore possible paths in the binary tree while matching the elements in the linked list. We attempt to match the current node's value with the current linked list node's value, and then continue the search down both the left and right children of the binary tree.

Approach
DFS Search: We will perform a DFS on the binary tree, starting from each node, and attempt to match the values of the nodes along the way with the values from the linked list.
Two Pointers (Tree and List): Use two pointers:
One (head) to traverse the linked list starting from the head.
Another (cur) to track the current position in the list as we attempt to match it with the tree node values.
Matching Process:
If the current tree node value matches the linked list node value, we move to the next linked list node and continue the DFS on the left and right children of the tree.
If the values don’t match but the current tree node's value matches the head of the list, we start a new matching attempt from that node.
Base Cases:
If we reach the end of the linked list (cur == null), this means we successfully matched all elements, so return true.
If we reach a null tree node without having matched the entire list (cur != null), return false.
Step By Step Explanation
Problem Breakdown:
We have a Linked List and a Binary Tree.
We need to determine if the linked list corresponds to some downward path in the binary tree (starting from any node in the tree and going downward).
Example:
Linked List: 4 -> 2 -> 8

Binary Tree:

        1
       / \
      4   4
     /   / \
    2   2   1
   /   / \
  6   6   8
Approach:
Perform a DFS for each node in the binary tree.
For each node, check if the current node in the binary tree matches the head of the linked list.
If the value matches, continue to the next node in the linked list and traverse down the tree.
If the current tree node doesn’t match the linked list or a mismatch is found, reset the list pointer and continue searching.
Step	Linked List Node	Binary Tree Node	Action Taken
1	4	1	No match, move to the left child (DFS).
2	4	4	Match found, move to next linked list node (2), explore subtree.
3	2	2	Match found, move to next linked list node (8), explore subtree.
4	8	6	No match, backtrack and try right subtree.
5	8	8	Match found, complete list traversal. Subpath found!
6			End of list reached, return True.
Detailed Table Explanation:
Initial DFS at Root (1):

Linked List starts at 4, Tree Node is 1.
No match, so we move to the left child.
Next DFS at Node (4):

Linked List is still at 4, Tree Node is 4.
Match found. Move the linked list pointer to the next node 2 and explore the left subtree of this 4.
DFS at Node (2):

Linked List is at 2, Tree Node is 2.
Match found. Move to the next linked list node 8, continue exploring.
DFS at Node (6):

Linked List is at 8, Tree Node is 6.
No match. Backtrack to the right child of 2.
DFS at Node (8):

Linked List is at 8, Tree Node is 8.
Match found. The linked list is now fully traversed.
End of List:

The linked list has been fully matched along the path from 4 -> 2 -> 8. Return True.
Another Example with No Match:
Linked List: 1 -> 4 -> 2 -> 6 -> 8
Binary Tree:

        1
       / \
      4   4
     /   / \
    2   2   1
   /   / \
  6   6   8
Step	Linked List Node	Binary Tree Node	Action Taken
1	1	1	Match found, move to next node (4).
2	4	4	Match found, move to next node (2).
3	2	2	Match found, move to next node (6).
4	6	6	Match found, move to next node (8).
5	8	-	No more nodes in the subtree, fail match.
In this example, the binary tree does not contain a path corresponding to the entire linked list (1 -> 4 -> 2 -> 6 -> 8), so we return False.

Complexity
Time Complexity:

In the worst case, we need to start a DFS from each node in the tree, and for each DFS, we may traverse up to the entire linked list.
If n is the number of nodes in the binary tree and m is the number of nodes in the linked list:
The DFS will be performed on each node in the binary tree.
In each DFS call, the maximum number of comparisons is O(m) if we traverse the entire linked list.
Thus, the overall time complexity is O(n * m).
Space Complexity:

The space complexity depends on the depth of the recursion, which is proportional to the depth of the binary tree.
In the worst case, the tree can be fully unbalanced, giving a depth of O(n) for the recursion stack.
Therefore, the space complexity is O(n) for the binary tree recursion. Additionally, no extra space is required for storing values or lists beyond a few pointers.
 */


var isSubPath = function(head, root) {
    return dfs(head, head, root);
};

var dfs = function(head, cur, root) {
    if (cur === null) return true;  // Successfully matched the list
    if (root === null) return false; // Reached the end of the tree without matching
    
    if (cur.val === root.val) {
        cur = cur.next;  // Move to the next list node if value matches
    } else if (head.val === root.val) {
        head = head.next; // Start new matching attempt if the value matches head of list
    } else {
        cur = head;  // Reset the matching pointer
    }
    
    // Recursively check left and right subtrees
    return dfs(head, cur, root.left) || dfs(head, cur, root.right);
};