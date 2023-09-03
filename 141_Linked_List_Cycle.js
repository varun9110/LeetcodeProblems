/**
 * 141. Linked List Cycle
 * Difficulty: Easy
 * Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. 
Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

 

Example 1:


Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
Example 2:


Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
Example 3:


Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
 

Constraints:

The number of the nodes in the list is in the range [0, 104].
-105 <= Node.val <= 105
pos is -1 or a valid index in the linked-list.
 

Follow up: Can you solve it using O(1) (i.e. constant) memory?
 */

/**
 * Approach: follow rabbit tortoise algo to find the cyclic linked list
 */



/**
 * Core Strategy
For this problem, let's see what will happen if there's a circle.
If it's a little abstract, then let's think about we are running on a circular track.

If the track is 100m long, your speed is 10m/s, your friend's speed is 5m/s. Then after 20s, you've run 200m, your friend has run 100m. But because the track is circular, so you will be at the same place with your friend since the difference between your distances is exactly 100m.

How about we change another track, change the speed of you and your friend? As long as your speeds are not the same, the faster person will always catch up with the slower person again.

That's the key point for this problem.

Solution
We just need to follow the strategy above - make a slower pointer and a faster pointer. Then we loop and loop again:

if the fast pointer catch up with slow pointer, then it's a circular linked list
if the fast pointer get to the end, then it's not a circular linked list
 */

const hasCycle = (head) => {
  let fast = head;
  while (fast && fast.next) {
    head = head.next;
    fast = fast.next.next;
    if (head === fast) return true;
  }
  return false;
};