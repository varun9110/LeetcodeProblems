/**
 * 2163. Minimum Difference in Sums After Removal of Elements
 * Difficulty: Hard
 * 
 * You are given a 0-indexed integer array nums consisting of 3 * n elements.

You are allowed to remove any subsequence of elements of size exactly n from nums. The remaining 2 * n elements will be divided into two equal parts:

The first n elements belonging to the first part and their sum is sumfirst.
The next n elements belonging to the second part and their sum is sumsecond.
The difference in sums of the two parts is denoted as sumfirst - sumsecond.

For example, if sumfirst = 3 and sumsecond = 2, their difference is 1.
Similarly, if sumfirst = 2 and sumsecond = 3, their difference is -1.
Return the minimum difference possible between the sums of the two parts after the removal of n elements.

 

Example 1:

Input: nums = [3,1,2]
Output: -1
Explanation: Here, nums has 3 elements, so n = 1. 
Thus we have to remove 1 element from nums and divide the array into two equal parts.
- If we remove nums[0] = 3, the array will be [1,2]. The difference in sums of the two parts will be 1 - 2 = -1.
- If we remove nums[1] = 1, the array will be [3,2]. The difference in sums of the two parts will be 3 - 2 = 1.
- If we remove nums[2] = 2, the array will be [3,1]. The difference in sums of the two parts will be 3 - 1 = 2.
The minimum difference between sums of the two parts is min(-1,1,2) = -1. 
Example 2:

Input: nums = [7,9,5,8,1,3]
Output: 1
Explanation: Here n = 2. So we must remove 2 elements and divide the remaining array into two parts containing two elements each.
If we remove nums[2] = 5 and nums[3] = 8, the resultant array will be [7,9,1,3]. The difference in sums will be (7+9) - (1+3) = 12.
To obtain the minimum difference, we should remove nums[1] = 9 and nums[4] = 1. The resultant array becomes [7,5,8,3]. The difference in sums of the two parts is (7+5) - (8+3) = 1.
It can be shown that it is not possible to obtain a difference smaller than 1.
 

Constraints:

nums.length == 3 * n
1 <= n <= 105
1 <= nums[i] <= 105
 */

/**
 * Explanation:

Let

n= 
3
nums.length
​
 
​
 
Divide the array into three equal parts:

First n elements
Middle n elements
Last n elements
Use two heaps:

A max heap (simulated using negative values) to track the smallest n elements from the first 2n
A min heap to track the largest n elements from the last 2n
Compute:

leftSum[i]: minimum sum of n elements from the first 2n up to index n+i
rightSum[i]: maximum sum of n elements from the last 2n starting from index 2n−i
Return the minimum value of leftSum[i]−rightSum[i] for i∈[0,n].

Helper functions:

heapify(heap, idx, size)
Maintains the heap property by bubbling down the element at index idx.

const heapify = (heap, idx, size) => {
    while (2 * idx + 2 < size && (heap[idx] > heap[2 * idx + 1] || heap[idx] > heap[2 * idx + 2])) {
        let child = 2 * idx + 1;
        if (heap[child] > heap[child + 1]) child++;
        const temp = heap[child];
        heap[child] = heap[idx];
        heap[idx] = temp;
        idx = child;
    }
    if (2 * idx + 2 !== size) return;
    if (heap[idx] > heap[2 * idx + 1]) {
        const temp = heap[2 * idx + 1];
        heap[2 * idx + 1] = heap[idx];
        heap[idx] = temp;
    }
};
buildHeap(arr, size)
Builds a heap from an array of size size.

const buildHeap = (arr, size) => {
    for (let i = Math.floor((size - 2) / 2); i >= 0; i--) {
        heapify(arr, i, size);
    }
    return arr;
};
replaceRoot(heap, size, newVal)
Replaces the root of the heap with newVal and re-heapifies. Returns the removed root.

const replaceRoot = (heap, size, newVal) => {
    const removed = heap[0];
    heap[0] = newVal;
    heapify(heap, 0, size);
    return removed;
};
Main method:

minimumDifference(nums)
Computes the minimum difference between left and right sums after removing n elements.

const minimumDifference = nums => {
    const len = nums.length / 3;

    const leftHeap = buildHeap(nums.slice(0, len).map(x => -x), len);
    const leftSum = Array(len + 1);
    leftSum[0] = leftHeap.reduce((sum, val) => sum - val, 0);

    for (let i = 1; i <= len; i++) {
        const current = nums[len - 1 + i];
        if (current < -leftHeap[0]) {
            const removed = -replaceRoot(leftHeap, len, -current);
            leftSum[i] = leftSum[i - 1] + current - removed;
        } else {
            leftSum[i] = leftSum[i - 1];
        }
    }

    const rightHeap = buildHeap(nums.slice(2 * len), len);
    const rightSum = Array(len + 1).fill(0);
    rightSum[len] = rightHeap.reduce((sum, val) => sum + val, 0);

    for (let i = 1; i <= len; i++) {
        const current = nums[2 * len - i];
        if (current > rightHeap[0]) {
            const removed = replaceRoot(rightHeap, len, current);
            rightSum[len - i] = rightSum[len - i + 1] - removed + current;
        } else {
            rightSum[len - i] = rightSum[len - i + 1];
        }
    }

    let minDiff = Number.MAX_VALUE;
    for (let i = 0; i <= len; i++) {
        minDiff = Math.min(minDiff, leftSum[i] - rightSum[i]);
    }

    return minDiff;
};
Complexity:

Time Complexity: O(nlogn)
Space Complexity: O(n)
 */


/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDifference = function(nums) {
    const heapify = (heap, idx, size) => {
        while (2 * idx + 2 < size && (heap[idx] > heap[2 * idx + 1] || heap[idx] > heap[2 * idx + 2])) {
            let child = 2 * idx + 1;
            if (heap[child] > heap[child + 1]) child++;
            const temp = heap[child];
            heap[child] = heap[idx];
            heap[idx] = temp;
            idx = child;
        }
        if (2 * idx + 2 !== size) return;
        if (heap[idx] > heap[2 * idx + 1]) {
            const temp = heap[2 * idx + 1];
            heap[2 * idx + 1] = heap[idx];
            heap[idx] = temp;
        }
    };

    const buildHeap = (arr, size) => {
        for (let i = Math.floor((size - 2) / 2); i >= 0; i--) {
            heapify(arr, i, size);
        }
        return arr;
    };

    const replaceRoot = (heap, size, newVal) => {
        const removed = heap[0];
        heap[0] = newVal;
        heapify(heap, 0, size);
        return removed;
    };

    const len = nums.length / 3;

    const leftHeap = buildHeap(nums.slice(0, len).map(x => -x), len);
    const leftSum = Array(len + 1);
    leftSum[0] = leftHeap.reduce((sum, val) => sum - val, 0);

    for (let i = 1; i <= len; i++) {
        const current = nums[len - 1 + i];
        if (current < -leftHeap[0]) {
            const removed = -replaceRoot(leftHeap, len, -current);
            leftSum[i] = leftSum[i - 1] + current - removed;
        } else {
            leftSum[i] = leftSum[i - 1];
        }
    }

    const rightHeap = buildHeap(nums.slice(2 * len), len);
    const rightSum = Array(len + 1).fill(0);
    rightSum[len] = rightHeap.reduce((sum, val) => sum + val, 0);

    for (let i = 1; i <= len; i++) {
        const current = nums[2 * len - i];
        if (current > rightHeap[0]) {
            const removed = replaceRoot(rightHeap, len, current);
            rightSum[len - i] = rightSum[len - i + 1] - removed + current;
        } else {
            rightSum[len - i] = rightSum[len - i + 1];
        }
    }

    let minDiff = Number.MAX_VALUE;
    for (let i = 0; i <= len; i++) {
        minDiff = Math.min(minDiff, leftSum[i] - rightSum[i]);
    }

    return minDiff;
};