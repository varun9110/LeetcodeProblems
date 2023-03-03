/**
 * 2487. Remove Nodes From Linked List
 * Difficulty: Medium
 * 
 * You are given the head of a linked list.
Remove every node which has a node with a strictly greater value anywhere to the right side of it.
Return the head of the modified linked list.

Example 1:
Input: head = [5,2,13,3,8]
Output: [13,8]
Explanation: The nodes that should be removed are 5, 2 and 3.
- Node 13 is to the right of node 5.
- Node 13 is to the right of node 2.
- Node 8 is to the right of node 3.

Example 2:
Input: head = [1,1,1,1]
Output: [1,1,1,1]
Explanation: Every node has value 1, so no nodes are removed.

Constraints:
The number of the nodes in the given list is in the range [1, 105].
1 <= Node.val <= 105
 */

/**
 * Approach : 
 * It's easier if we reverse the list and then check for the elements which are lesser than the current element. if they are then drop them else check the next
 * element
 * then reverse the new list and return the answer
 * Time complexity : O(n)
 * Space Complexity : O(3n)
 */

 var reverseList = (listHead) => {
    let current = listHead;
    let newhead = new ListNode(current.val, null);
    while(current.next){
        current = current.next;
        let newNode = new ListNode(current.val, newhead);
        newhead = newNode;
    }
    return newhead;
};

var removeNodes = function(head) {
    let current = head;
    let newhead = reverseList(current);
    let returnhead = newhead;
    while(newhead.next){
        if(newhead.val > newhead.next.val){
            newhead.next = newhead.next.next;
            continue;
        }
        newhead = newhead.next;
    }
    returnhead = reverseList(returnhead);
    return returnhead;  
};


/**
 * Refined appraoch:
 * use recursion to tackle the problem. Code below is self explainatory
 */

 var removeNodes = function(head) {
    
    if(!head) return null
    
    head.next = removeNodes(head.next)
    
    if(head.next && head.val < head.next.val) return head.next
    
    return head
    
};