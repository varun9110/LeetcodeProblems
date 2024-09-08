/**
 * 725. Split Linked List in Parts
 * Difficulty: Medium
 * 
 * Given the head of a singly linked list and an integer k, split the linked list into k consecutive linked list parts.

The length of each part should be as equal as possible: no two parts should have a size differing by more than one. 
This may lead to some parts being null.

The parts should be in the order of occurrence in the input list, and parts occurring earlier should always have a size 
greater than or equal to parts occurring later.

Return an array of the k parts.


Example 1:
Input: head = [1,2,3], k = 5
Output: [[1],[2],[3],[],[]]
Explanation:
The first element output[0] has output[0].val = 1, output[0].next = null.
The last element output[4] is null, but its string representation as a ListNode is [].
Example 2:


Input: head = [1,2,3,4,5,6,7,8,9,10], k = 3
Output: [[1,2,3,4],[5,6,7],[8,9,10]]
Explanation:
The input has been split into consecutive parts with size difference at most 1, and earlier parts are a larger size than the later parts.

Constraints:

The number of nodes in the list is in the range [0, 1000].
0 <= Node.val <= 1000
1 <= k <= 50
 */

/**
 * Intuition
The problem is about splitting a linked list into k parts such that the sizes of the parts are as equal as possible. 
Some parts may have a size that differs by at most 1. The goal is to achieve this without creating extra space and by modifying the input linked list itself.

Approach
Calculate the Size of the Linked List:

Traverse the linked list and count the total number of nodes (size).
Determine the Split Sizes:

Each part will have a minimum size of size // k.
There may be some leftover nodes (size % k) which need to be distributed to the first few parts. 
Therefore, the first size % k parts will have an extra node.
Splitting the List into Parts:

Initialize a ListNode[] ans of size k to store the resulting parts.
For each part, calculate its size. For the first size % k parts, the size will be splitSize + 1. For the remaining parts, the size will be splitSize.
For each part, traverse the corresponding number of nodes, and then break the list by setting the next pointer of the last node in the current part to null.
Continue this process for all parts and assign the heads of each part to ans[i].
Return the Result:

Return the array ans which contains the heads of the k parts.
Complexity
Time complexity:
The algorithm traverses the list twice. Once to calculate the total size (O(n)), and once to divide it into k parts by reassigning pointers (O(n)).
Therefore, the time complexity is O(n), where n is the number of nodes in the linked list.
Space complexity:
The space complexity is O(k) for the result array ans of size k.
Since we are modifying the input linked list and not using any additional space for new nodes, the space complexity remains low.
Step By Step Explanation
Example Input:
Linked List: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10
k: 3
Step 1: Determine the Length of the Linked List
Traverse the linked list to calculate its total length.

Node	Value
Node 1	1
Node 2	2
Node 3	3
Node 4	4
Node 5	5
Node 6	6
Node 7	7
Node 8	8
Node 9	9
Node 10	10
Total Length: 10
Step 2: Calculate Size of Each Part
Compute the basic size and handle any remaining nodes.

Basic Size of Each Part: Total Length ÷ k
splitSize = 10 ÷ 3 = 3
Remaining Nodes: Total Length % k
remainder = 10 % 3 = 1
Thus, the sizes of the parts are:

Part Sizes: [4, 3, 3]
Step 3: Splitting the List into Parts
Traverse the list and split it based on the calculated sizes.

Part 1 (Size = 4)
Nodes: 1 → 2 → 3 → 4
Cut Point: After node 4
Part 2 (Size = 3)
Nodes: 5 → 6 → 7
Cut Point: After node 7
Part 3 (Size = 3)
Nodes: 8 → 9 → 10
Cut Point: After node 10
Summary Table for Each Part:
Part Number	Nodes in Part
Part 1	1 → 2 → 3 → 4
Part 2	5 → 6 → 7
Part 3	8 → 9 → 10
Key Points to Explain:
Basic Size Calculation: The size of each part is determined by dividing the total length of the list by k.
Distribute Extra Nodes: The first remainder number of parts get one extra node.
Cutting the List: For each part, traverse the required number of nodes and then cut the list by setting the last node’s next pointer to null.
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
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function(head, k) {
    let ans = new Array(k).fill(null);

    // Calculate total size of the linked list
    let size = 0;
    let current = head;
    while (current) {
        size++;
        current = current.next;
    }

    // Minimum size of each part
    let splitSize = Math.floor(size / k);
    let remainder = size % k; // Remaining nodes to distribute

    current = head;
    let prev = null;
    for (let i = 0; i < k; i++) {
        ans[i] = current;
        let currentSize = splitSize + (remainder > 0 ? 1 : 0);
        remainder--;

        // Traverse to the end of the current part
        for (let j = 0; j < currentSize; j++) {
            prev = current;
            current = current.next;
        }

        // Cut the list
        if (prev) prev.next = null;
    }

    return ans;
};