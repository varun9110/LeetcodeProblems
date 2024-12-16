/**
 * 3264. Final Array State After K Multiplication Operations I
 * Difficulty: Easy
 * 
 * You are given an integer array nums, an integer k, and an integer multiplier.

You need to perform k operations on nums. In each operation:

Find the minimum value x in nums. If there are multiple occurrences of the minimum value, select the one that appears first.
Replace the selected minimum value x with x * multiplier.
Return an integer array denoting the final state of nums after performing all k operations.

 

Example 1:

Input: nums = [2,1,3,5,6], k = 5, multiplier = 2

Output: [8,4,6,5,6]

Explanation:

Operation	Result
After operation 1	[2, 2, 3, 5, 6]
After operation 2	[4, 2, 3, 5, 6]
After operation 3	[4, 4, 3, 5, 6]
After operation 4	[4, 4, 6, 5, 6]
After operation 5	[8, 4, 6, 5, 6]
Example 2:

Input: nums = [1,2], k = 3, multiplier = 4

Output: [16,8]

Explanation:

Operation	Result
After operation 1	[4, 2]
After operation 2	[4, 8]
After operation 3	[16, 8]
 

Constraints:

1 <= nums.length <= 100
1 <= nums[i] <= 100
1 <= k <= 10
1 <= multiplier <= 5
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} multiplier
 * @return {number[]}
 */
var getFinalState = function(nums, k, multiplier) {
    // Priority queue implementation using a Min-Heap
    const heap = [];
    
    // Helper functions for the heap
    const heapPush = (val, idx) => {
        heap.push({ val, idx });
        let currentIndex = heap.length - 1;
        while (currentIndex > 0) {
            let parentIndex = Math.floor((currentIndex - 1) / 2);
            if (heap[parentIndex].val > heap[currentIndex].val ||
                (heap[parentIndex].val === heap[currentIndex].val && heap[parentIndex].idx > heap[currentIndex].idx)) {
                [heap[parentIndex], heap[currentIndex]] = [heap[currentIndex], heap[parentIndex]];
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    };

    const heapPop = () => {
        const top = heap[0];
        const end = heap.pop();
        if (heap.length > 0) {
            heap[0] = end;
            let index = 0;
            while (true) {
                let left = 2 * index + 1;
                let right = 2 * index + 2;
                let smallest = index;

                if (left < heap.length && (heap[left].val < heap[smallest].val ||
                    (heap[left].val === heap[smallest].val && heap[left].idx < heap[smallest].idx))) {
                    smallest = left;
                }
                if (right < heap.length && (heap[right].val < heap[smallest].val ||
                    (heap[right].val === heap[smallest].val && heap[right].idx < heap[smallest].idx))) {
                    smallest = right;
                }
                if (smallest === index) break;
                [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
                index = smallest;
            }
        }
        return top;
    };

    // Initialize the heap with the array values and indices
    nums.forEach((num, idx) => heapPush(num, idx));

    // Perform k operations
    while (k-- > 0) {
        let smallest = heapPop();
        heapPush(smallest.val * multiplier, smallest.idx);
    }

    // Update the original array based on the heap state
    while (heap.length > 0) {
        let { val, idx } = heapPop();
        nums[idx] = val;
    }

    return nums;
};