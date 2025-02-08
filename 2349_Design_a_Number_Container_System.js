/**
 * 2349. Design a Number Container System
 * Difficulty: Medium
 * 
 * Design a number container system that can do the following:

Insert or Replace a number at the given index in the system.
Return the smallest index for the given number in the system.
Implement the NumberContainers class:

NumberContainers() Initializes the number container system.
void change(int index, int number) Fills the container at index with the number. If there is already a number at that index, replace it.
int find(int number) Returns the smallest index for the given number, or -1 if there is no index that is filled by number in the system.
 

Example 1:

Input
["NumberContainers", "find", "change", "change", "change", "change", "find", "change", "find"]
[[], [10], [2, 10], [1, 10], [3, 10], [5, 10], [10], [1, 20], [10]]
Output
[null, -1, null, null, null, null, 1, null, 2]

Explanation
NumberContainers nc = new NumberContainers();
nc.find(10); // There is no index that is filled with number 10. Therefore, we return -1.
nc.change(2, 10); // Your container at index 2 will be filled with number 10.
nc.change(1, 10); // Your container at index 1 will be filled with number 10.
nc.change(3, 10); // Your container at index 3 will be filled with number 10.
nc.change(5, 10); // Your container at index 5 will be filled with number 10.
nc.find(10); // Number 10 is at the indices 1, 2, 3, and 5. Since the smallest index that is filled with 10 is 1, we return 1.
nc.change(1, 20); // Your container at index 1 will be filled with number 20. Note that index 1 was filled with 10 and then replaced with 20. 
nc.find(10); // Number 10 is at the indices 2, 3, and 5. The smallest index that is filled with 10 is 2. Therefore, we return 2.
 

Constraints:

1 <= index, number <= 109
At most 105 calls will be made in total to change and find.
 */

/**
 * 🔹 Implement NumberContainers Class Efficiently | O(log N) 🔹
🧠 Intuition
The problem requires us to efficiently track indices and values so that we can:

Update an index with a new number (change(index, number)).
Find the smallest index storing a specific number (find(number)).
Key Observations:
Use a HashMap (index_val) to store index -> number.
Use a MinHeap (Priority Queue) (res) to keep track of the smallest index for each number.
If we update an index with a new number, we remove it from the old number’s heap.
💡 Approach
Use HashMaps & MinHeap for Efficiency
index_val: Stores the number at each index.
res: Maps each number to a MinHeap of indices.
Efficient Updates
If an index changes, remove the old value from its heap.
Add the new index to the heap of its new number.
Find the smallest index of a number in O(log N) using a MinHeap.
📌 Heap operations are log-time, making this approach optimal.
 */

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this._bubbleUp();
    }

    pop() {
        if (this.heap.length === 0) return -1;
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this._heapifyDown();
        }
        return min;
    }

    peek() {
        return this.heap.length ? this.heap[0] : -1;
    }

    _bubbleUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[parentIdx] <= this.heap[idx]) break;
            [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
            idx = parentIdx;
        }
    }

    _heapifyDown() {
        let idx = 0;
        while (true) {
            let left = 2 * idx + 1,
                right = 2 * idx + 2,
                smallest = idx;

            if (left < this.heap.length && this.heap[left] < this.heap[smallest]) smallest = left;
            if (right < this.heap.length && this.heap[right] < this.heap[smallest]) smallest = right;
            if (smallest === idx) break;

            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
}

class NumberContainers {
    constructor() {
        this.indexMap = new Map();
        this.numberMap = new Map();
    }

    change(index, number) {
        if (this.indexMap.has(index)) {
            let prevNumber = this.indexMap.get(index);
            if (prevNumber === number) return;
            let prevHeap = this.numberMap.get(prevNumber);
            if (prevHeap) prevHeap.push(Number.MAX_SAFE_INTEGER);
        }

        this.indexMap.set(index, number);
        if (!this.numberMap.has(number)) this.numberMap.set(number, new MinHeap());
        this.numberMap.get(number).push(index);
    }

    find(number) {
        if (!this.numberMap.has(number) || this.numberMap.get(number).heap.length === 0) return -1;

        let heap = this.numberMap.get(number);
        while (heap.heap.length > 0) {
            let idx = heap.peek();
            if (this.indexMap.get(idx) === number) return idx;
            heap.pop();
        }
        return -1;
    }
}