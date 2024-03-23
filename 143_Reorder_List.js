/**
 * 143. Reorder List
 * Difficulty: Medium
 * 
 * You are given the head of a singly linked-list. The list can be represented as:
L0 → L1 → … → Ln - 1 → Ln
Reorder the list to be on the following form:
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
You may not modify the values in the list's nodes. Only nodes themselves may be changed.

Example 1:
Input: head = [1,2,3,4]
Output: [1,4,2,3]
Example 2:
Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]

Constraints:
The number of nodes in the list is in the range [1, 5 * 104].
1 <= Node.val <= 1000
 */


var reorderList = function (head) {
  let stack = [], node = head
  if (!node) return
  while (node) {
    stack.push(node)
    node = node.next
  }

  let len = stack.length
  node = head
  for (let i = 0; i < len; i++) {
    if (i % 2 === 0)
      node.next = stack.shift()
    else
      node.next = stack.pop()
    node = node.next
  }
  node.next = null
};



/**
 * OR
 */

/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    // find middle
	// by moving "fast" twice, we'll have "slow" in the middle
    let slow = head
    let fast = head
    while (fast.next && fast.next.next) {
        slow = slow.next
        fast = fast.next.next
    }

    // reverse second half
	// with reverse linked list solution
    let prev = null
    let cur = slow.next
    while (cur) {
        let temp = cur.next
        cur.next = prev
        prev = cur
        cur = temp
    }

    slow.next = null

    // combine two halves
    let h1 = head
    let h2 = prev

    // if even, second half will be smaller
	while (h2) {
        let temp = h1.next
        h1.next = h2
        h1 = h2
        h2 = temp
    }
};