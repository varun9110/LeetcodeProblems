/**
 * 234. Palindrome Linked List
 * Given the head of a singly linked list, return true if it is a 
palindrome
 or false otherwise.

Example 1:
Input: head = [1,2,2,1]
Output: true
Example 2:
Input: head = [1,2]
Output: false
 
Constraints:
The number of nodes in the list is in the range [1, 105].
0 <= Node.val <= 9
 Follow up: Could you do it in O(n) time and O(1) space?
 */


 /**
  * Idea:
The naive approach here would be to run through the linked list and create an array of its values, then compare the array to its reverse to find out if it's a palindrome. Though this is easy enough to accomplish, we're challenged to find an approach with a space complexity of only O(1) while maintaining a time complexity of O(N).

The only way to check for a palindrome in O(1) space would require us to be able to access both nodes for comparison at the same time, rather than storing values for later comparison. This would seem to be a challenge, as the linked list only promotes travel in one direction.

But what if it didn't?

The answer is to reverse the back half of the linked list to have the next attribute point to the previous node instead of the next node. (Note: we could instead add a prev attribute as we iterate through the linked list, rather than overwriting next on the back half, but that would technically use O(N) extra space, just as if we'd created an external array of node values.)

The first challenge then becomes finding the middle of the linked list in order to start our reversing process there. For that, we can look to Floyd's Cycle Detection Algorithm.

With Floyd's, we'll travel through the linked list with two pointers, one of which is moving twice as fast as the other. When the fast pointer reaches the end of the list, the slow pointer must then be in the middle.
Diagram 1Withslow now at the middle, we can reverse the back half of the list with the help of another variable to contain a reference to the previous node (prev) and a three-way swap. Before we do this, however, we'll want to set prev.next = null, so that we break the reverse cycle and avoid an endless loop.
Diagram 2Once the back half is properly reversed andslow is once again at the end of the list, we can now start fast back over again at the head and compare the two halves simultaneously, with no extra space required.
Diagram 3If the two pointers ever disagree in value, we canreturn false, otherwise we can return true if both pointers reach the middle successfully.

(Note: This process works regardless of whether the length of the linked list is odd or even, as the comparison will stop when slow reaches the "dead-end" node.)
  */

var isPalindrome = function(head) {
    let slow = head, fast = head, prev, temp
    while (fast && fast.next)
        slow = slow.next, fast = fast.next.next
    prev = slow, slow = slow.next, prev.next = null
    while (slow)
        temp = slow.next, slow.next = prev, prev = slow, slow = temp
    fast = head, slow = prev
    while (slow)
        if (fast.val !== slow.val) return false
        else fast = fast.next, slow = slow.next
    return true

};