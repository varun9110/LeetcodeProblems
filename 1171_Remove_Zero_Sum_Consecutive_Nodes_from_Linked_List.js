/**
1171. Remove Zero Sum Consecutive Nodes from Linked List
Difficulty: Medium

Given the head of a linked list, we repeatedly delete consecutive sequences of nodes that sum to 0 until there are no such sequences.
After doing so, return the head of the final linked list.  You may return any such answer.

(Note that in the examples below, all sequences are serializations of ListNode objects.)
Example 1:
Input: head = [1,2,-3,3,1]
Output: [3,1]
Note: The answer [1,2,1] would also be accepted.
Example 2:
Input: head = [1,2,3,-3,4]
Output: [1,2,4]
Example 3:
Input: head = [1,2,3,-3,-2]
Output: [1]

Constraints:
The given linked list will contain between 1 and 1000 nodes.
Each node in the linked list has -1000 <= node.val <= 1000.
*/

/**
 * Approach:
 * https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/solutions/4862064/mastering-efficiency-beat-92-31-with-full-explanation-and-visuals/
 */

var removeZeroSumSublists = function(head) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prefix_sum = 0;
    const prefix_sums = { 0: dummy };
    let current = head;

    while (current) {
        prefix_sum += current.val;
        if (prefix_sum in prefix_sums) {
            let to_delete = prefix_sums[prefix_sum].next;
            let temp_sum = prefix_sum + to_delete.val;
            while (to_delete !== current) {
                delete prefix_sums[temp_sum];
                to_delete = to_delete.next;
                temp_sum += to_delete.val;
            }
            prefix_sums[prefix_sum].next = current.next;
        } else {
            prefix_sums[prefix_sum] = current;
        }
        current = current.next;
    }

    return dummy.next;
};