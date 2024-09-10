/**
 * 2807. Insert Greatest Common Divisors in Linked List
 * Difficulty: Medium
 * 
 * Given the head of a linked list head, in which each node contains an integer value.

Between every pair of adjacent nodes, insert a new node with a value equal to the greatest common divisor of them.

Return the linked list after insertion.

The greatest common divisor of two numbers is the largest positive integer that evenly divides both numbers.

 

Example 1:


Input: head = [18,6,10,3]
Output: [18,6,6,2,10,1,3]
Explanation: The 1st diagram denotes the initial linked list and the 2nd diagram denotes the linked list after inserting the new nodes 
(nodes in blue are the inserted nodes).
- We insert the greatest common divisor of 18 and 6 = 6 between the 1st and the 2nd nodes.
- We insert the greatest common divisor of 6 and 10 = 2 between the 2nd and the 3rd nodes.
- We insert the greatest common divisor of 10 and 3 = 1 between the 3rd and the 4th nodes.
There are no more adjacent nodes, so we return the linked list.
Example 2:


Input: head = [7]
Output: [7]
Explanation: The 1st diagram denotes the initial linked list and the 2nd diagram denotes the linked list after inserting the new nodes.
There are no pairs of adjacent nodes, so we return the initial linked list.
 

Constraints:

The number of nodes in the list is in the range [1, 5000].
1 <= Node.val <= 1000
 */

/**
 * Intuition
The task is to insert a new node with the greatest common divisor (GCD) of each pair of adjacent nodes in a singly linked list. To solve this problem, you need to:

Traverse the list from the head.
For each adjacent pair of nodes, compute their GCD.
Insert a new node with the computed GCD between the current pair of nodes.
Continue this process until you've processed the entire list.
Approach
Initialization: Start by checking if the linked list contains only one node. If so, no insertions are needed, so return the head as it is.

Traversal and Insertion:

Use two pointers: node1 to represent the current node and node2 to represent the next node.
Compute the GCD of the values in node1 and node2.
Create a new node with the computed GCD and insert it between node1 and node2.
Update the pointers:
Set node1.next to the new GCD node.
Set the new GCD node's next to node2.
Move node1 to node2 and node2 to the next node of node2.
Repeat this until node2 is null.
Return: Once the traversal is complete and all necessary nodes are inserted, return the head of the modified list.

Complexity
Time complexity:
Traversal: Each node in the list is visited once, making the traversal O(n), where n is the number of nodes in the list.
Insertion: Each insertion operation takes constant time O(1), and since we perform this operation n-1 times (for each adjacent pair), the overall insertion complexity is O(n).
GCD Calculation: The GCD calculation for two integers is O(log(min(a, b))), where a and b are the values of the nodes. Given the constraints (values between 1 and 1000), the GCD calculation can be considered a constant-time operation for practical purposes.
Combining these, the overall time complexity is O(n), where n is the number of nodes in the original list.
Space complexity:
The space complexity is O(1) in terms of additional space used. We are only using a few extra variables for computation and node creation. The new nodes are added to the original list, so the space used by the nodes is accounted for in the input list itself.
Step By Step Explanation
Initial Linked List: [18, 6, 10, 3]

Initial Linked List

Node Position	Value
1	18
2	6
3	10
4	3
Calculate and Insert GCD Between Node 1 and Node 2

GCD Calculation: GCD(18, 6) = 6
Insert Node with Value 6 Between Node 1 and Node 2
Node Position	Value
1	18
2	6
3	6
4	10
5	3
Here, the new list is [18, 6, 6, 10, 3].

Calculate and Insert GCD Between Node 2 and Node 3

GCD Calculation: GCD(6, 10) = 2
Insert Node with Value 2 Between Node 2 and Node 3
Node Position	Value
1	18
2	6
3	6
4	2
5	10
6	3
Now, the list is [18, 6, 6, 2, 10, 3].

Calculate and Insert GCD Between Node 3 and Node 4

GCD Calculation: GCD(10, 3) = 1
Insert Node with Value 1 Between Node 3 and Node 4
Node Position	Value
1	18
2	6
3	6
4	2
5	10
6	1
7	3
The final linked list is [18, 6, 6, 2, 10, 1, 3].


 */


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertGreatestCommonDivisors = function(head) {
    if (!head || !head.next) return head;

        const gcd = (a, b) => {
            while (b !== 0) {
                [a, b] = [b, a % b];
            }
            return a;
        };

        let node1 = head;
        while (node1.next) {
            let node2 = node1.next;
            let gcdValue = gcd(node1.val, node2.val);
            let gcdNode = new ListNode(gcdValue);
            node1.next = gcdNode;
            gcdNode.next = node2;
            node1 = node2;
        }

        return head;
};