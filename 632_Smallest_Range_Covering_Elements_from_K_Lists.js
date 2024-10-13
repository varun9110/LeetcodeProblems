/**
 * 632. Smallest Range Covering Elements from K Lists
 * Difficulty: Hard
 * 
 * You have k lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the k lists.

We define the range [a, b] is smaller than range [c, d] if b - a < d - c or a < c if b - a == d - c.

 

Example 1:

Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation: 
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].
Example 2:

Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]
 

Constraints:

nums.length == k
1 <= k <= 3500
1 <= nums[i].length <= 50
-105 <= nums[i][j] <= 105
nums[i] is sorted in non-decreasing order.
 */

/**
 * Intuition
The key idea is to leverage the fact that all lists are sorted, which allows us to maintain a current range using one element from each list. 
By utilizing a min-heap (priority queue), we can always pick the smallest element across the lists. 
The challenge is to minimize the difference between the smallest and largest elements in the current range while making 
sure the range includes elements from all lists.

Approach
Min-Heap: We use a min-heap to keep track of the smallest element in the current range.
Track the maximum element: At every step, track the largest element in the current range to compute the smallest possible range.
Expand the range: Extract the smallest element from the heap and replace it with the next element from the same list, updating the range.
Stop condition: Once any of the lists is exhausted (i.e., there are no more elements to consider), the process stops.
Complexity
Time complexity:
The time complexity is (O(n \log k)), where (n) is the total number of elements across all lists and (k) is the number of lists. 
This is because we process every element and use a heap, which takes (O(\log k)) time for insertions and deletions.

Space complexity:
The space complexity is (O(k)), where (k) is the number of lists, as the heap contains one element from each list at any point in time.
 */

/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange = function(nums) {
    const k = nums.length;
    const minHeap = new MinPriorityQueue({priority: x => x[0]});
    let maxValue = -Infinity;
    
    // Initialize heap with first element from each list
    for (let i = 0; i < k; i++) {
        minHeap.enqueue([nums[i][0], i, 0]);
        maxValue = Math.max(maxValue, nums[i][0]);
    }
    
    let rangeStart = 0, rangeEnd = Infinity;
    
    while (!minHeap.isEmpty()) {
        const [minValue, row, col] = minHeap.dequeue().element;
        
        // Update the smallest range
        if (maxValue - minValue < rangeEnd - rangeStart) {
            rangeStart = minValue;
            rangeEnd = maxValue;
        }
        
        // Move to the next element in the current list
        if (col + 1 < nums[row].length) {
            minHeap.enqueue([nums[row][col + 1], row, col + 1]);
            maxValue = Math.max(maxValue, nums[row][col + 1]);
        } else {
            break; // One list is exhausted
        }
    }
    
    return [rangeStart, rangeEnd];
};