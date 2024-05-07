/**
 * 2816. Double a Number Represented as a Linked List
 * Difficulty: Medium
 * 
 * You are given the head of a non-empty linked list representing a non-negative integer without leading zeroes.

Return the head of the linked list after doubling it.

 

Example 1:


Input: head = [1,8,9]
Output: [3,7,8]
Explanation: The figure above corresponds to the given linked list which represents the number 189. Hence, the returned linked 
list represents the number 189 * 2 = 378.
Example 2:


Input: head = [9,9,9]
Output: [1,9,9,8]
Explanation: The figure above corresponds to the given linked list which represents the number 999. 
Hence, the returned linked list reprersents the number 999 * 2 = 1998. 
 

Constraints:

The number of nodes in the list is in the range [1, 104]
0 <= Node.val <= 9
The input is generated such that the list represents a number that does not have leading zeros, except the number 0 itself.
 */

/**
 * Approach:
 * 
 * Define a recursive function twice that doubles the value of each node and returns the carry generated.
Traverse the linked list recursively using the twice function, starting from the head node.
At each step, compute the doubled value of the current node and propagate any resulting carry to the next node.
Update the value of the current node with the remainder of the doubled value modulo 10.
If there's a carry after traversing the entire list, prepend a new node with the carry as its value to the beginning of the list.
 */

var twice = function(head) {
    if (!head) {
        return 0;
    }
    var doubledValue = head.val * 2 + twice(head.next);
    head.val = doubledValue % 10;
    return Math.floor(doubledValue / 10);
};

var doubleIt = function(head) {
    var carry = twice(head);
    if (carry > 0) {
        head = new ListNode(carry, head);
    }
    return head;
};