/**
 * 2181. Merge Nodes in Between Zeros
 * Difficulty: Medium
 * You are given the head of a linked list, which contains a series of integers separated by 0's. The beginning and end of the linked list will have Node.val == 0.

For every two consecutive 0's, merge all the nodes lying in between them into a single node whose value is the sum of all the merged nodes. The modified list should not contain any 0's.

Return the head of the modified linked list.

Example 1:

Input: head = [0,3,1,0,4,5,2,0]
Output: [4,11]
Explanation: 
The above figure represents the given linked list. The modified list contains
- The sum of the nodes marked in green: 3 + 1 = 4.
- The sum of the nodes marked in red: 4 + 5 + 2 = 11.
Example 2:

Input: head = [0,1,0,3,0,2,2,0]
Output: [1,3,4]
Explanation: 
The above figure represents the given linked list. The modified list contains
- The sum of the nodes marked in green: 1 = 1.
- The sum of the nodes marked in red: 3 = 3.
- The sum of the nodes marked in yellow: 2 + 2 = 4.

Constraints:

The number of nodes in the list is in the range [3, 2 * 105].
0 <= Node.val <= 1000
There are no two consecutive nodes with Node.val == 0.
The beginning and end of the linked list have Node.val == 0.
 */


/**
 * Intuition
The problem requires modifying a linked list by merging nodes between consecutive zeroes into a single node whose value is the sum of all the nodes being merged. The resulting list should exclude all zeroes.

The key insight is to traverse the list, keep summing values between zeroes, and replace the starting zero's next node with the computed sum. This ensures that the new list is constructed as we traverse, excluding the zeroes.

Approach
Initialization: Start with a dummy node that helps simplify edge cases and begin traversal from the node next to the head.
Traversal and Summation:
Iterate through the list and keep summing values until encountering a zero.
Each time a zero is encountered (indicating the end of a segment), update the next node to hold the computed sum and skip to the next segment.
List Update:
After computing the sum for a segment, link the last node of the current segment to the first node of the next segment to exclude the zeroes.
Termination:
Ensure the new list is properly terminated by setting the next of the last node to null.
Complexity
Time Complexity: O(n) where n is the number of nodes in the linked list. We traverse the list once.
Space Complexity: O(1) because we only use a few additional pointers and integer variables for summing, without extra data structures.
 */


var mergeNodes = function(head) {
    let modify = head.next; // Start from the node after the initial 0
    let nextSum = modify;

    while (nextSum !== null) {
        let sum = 0;
        // Find the sum of all nodes until you encounter a 0.
        while (nextSum.val !== 0) {
            sum += nextSum.val;
            nextSum = nextSum.next;
        }

        // Assign the sum to the current node's value.
        modify.val = sum;
        // Move nextSum to the first non-zero value of the next block.
        nextSum = nextSum.next;
        // Move modify also to this node.
        modify.next = nextSum;
        modify = modify.next;
    }
    return head.next; // Skip the initial 0 node
};