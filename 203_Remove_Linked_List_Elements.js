/**
 * 203. Remove Linked List Elements
 * Difficulty : Easy
 * 
 * Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.

Example 1:
Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]
Example 2:
Input: head = [], val = 1
Output: []
Example 3:
Input: head = [7,7,7,7], val = 7
Output: []

Constraints:
The number of nodes in the list is in the range [0, 104].
1 <= Node.val <= 50
0 <= val <= 50
 */

/**
 * Approach:
 * first edge case is to find if the first number is the val itself, if yes then keep shifting the head
 * if not then we check the start.next.val if it matches the val, if yes then we remove the next and link it to the next one else we move the next value
 */

var removeElements = function(head, val) {
    let start = head;


    while(start && start.val === val){
        head = start.next;
        start = start.next;
    }


    while(start && start.next){
        if(start.next.val === val){
            start.next = start.next.next;
            continue;
        }
        start = start.next;
    }
    return head;
};