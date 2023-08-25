/**
 * 876. Middle of the Linked List
 * Difficulty : Easy
 * 
 * Given the head of a singly linked list, return the middle node of the linked list.
If there are two middle nodes, return the second middle node.

Example 1:
Input: head = [1,2,3,4,5]
Output: [3,4,5]
Explanation: The middle node of the list is node 3.
Example 2:
Input: head = [1,2,3,4,5,6]
Output: [4,5,6]
Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.

Constraints:
The number of nodes in the list is in the range [1, 100].
1 <= Node.val <= 100
 */

/**
 * Approach : 
 * count the number of nodes in the linked list and then find the mid and return the same
 */

var middleNode = function(head) {
    let count = 0;
    let start = head;
    while(start){
        count++;
        start=start.next;
    }
    let mid = (count%2 === 0) ? (count/2) + 1 : Math.ceil(count/2);
    let count1 = 0;
    while(head){
        count1++;
        if(count1 === mid){
            return head;
        }
        head = head.next;
    }
};

/**
 * Refined approach:
 * 
Fast pointer will move two steps at a time while slow pointer move one step at a time. So when fast pointer reach at the end of the linked list, 
 slow pointer will be at the middle of the linked list.

 initial state
f
1 -> 2 -> 3 -> 4 -> 5
s

1st loop
		  f
1 -> 2 -> 3 -> 4 -> 5
     s
	 
2nd loop
		            f
1 -> 2 -> 3 -> 4 -> 5
          s

when f reach end of the linked list, s will be at the middle.

f = fast pointer
s = slow pointer
 */

var middleNode = function(head) {
    let fast = slow = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow;
};