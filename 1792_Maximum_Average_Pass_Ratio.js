/**
 * 1792. Maximum Average Pass Ratio
 * Difficulty: Medium
 * 
 * There is a school that has classes of students and each class will be having a final exam. You are given a 2D integer array classes, where classes[i] = [passi, totali]. 
 * You know beforehand that in the ith class, there are totali total students, but only passi number of students will pass the exam.

You are also given an integer extraStudents. There are another extraStudents brilliant students that are guaranteed to pass the exam of any class they are assigned to. 
You want to assign each of the extraStudents students to a class in a way that maximizes the average pass ratio across all the classes.

The pass ratio of a class is equal to the number of students of the class that will pass the exam divided by the total number of students of the class. 
The average pass ratio is the sum of pass ratios of all the classes divided by the number of the classes.

Return the maximum possible average pass ratio after assigning the extraStudents students. Answers within 10-5 of the actual answer will be accepted.

Example 1:
Input: classes = [[1,2],[3,5],[2,2]], extraStudents = 2
Output: 0.78333
Explanation: You can assign the two extra students to the first class. The average pass ratio will be equal to (3/4 + 3/5 + 2/2) / 3 = 0.78333.
Example 2:

Input: classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4
Output: 0.53485

Constraints:

1 <= classes.length <= 105
classes[i].length == 2
1 <= passi <= totali <= 105
1 <= extraStudents <= 105
 */

/**
 * Intuition
Use a greedy approach to prioritize distributing students where the impact is highest.

Approach
Calculate marginal gain, use a max-heap for efficiency, and update iteratively.

Complexity
Time complexity: 𝑂(𝑛+𝑘log𝑛)

Space complexity: O(n)

 */

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    // Pushes a new class into the heap
    push(classData) {
        this.heap.push(classData);
        this._heapifyUp();
    }

    // Pops the class with the highest gain from the heap
    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown();
        return root;
    }

    // Adjusts the heap upwards after a push
    _heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index][2] <= this.heap[parentIndex][2]) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    // Adjusts the heap downwards after a pop
    _heapifyDown() {
        let index = 0;
        const length = this.heap.length;
        while (index < length) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            let largest = index;
            if (leftIndex < length && this.heap[leftIndex][2] > this.heap[largest][2]) largest = leftIndex;
            if (rightIndex < length && this.heap[rightIndex][2] > this.heap[largest][2]) largest = rightIndex;
            if (largest === index) break;
            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }

    // Get the class with the highest gain
    peek() {
        return this.heap[0];
    }
}

/**
 * @param {number[][]} classes
 * @param {number} extraStudents
 * @return {number}
 */
var maxAverageRatio = function(classes, extraStudents) {
    const heap = new MaxHeap();
    
    // Initialize the heap with classes and their respective gain
    for (let [pass, total] of classes) {
        const gain = (pass + 1) / (total + 1) - pass / total;
        heap.push([pass, total, gain]); // store class info and the calculated gain
    }
    
    // Allocate extra students to maximize the average ratio
    while (extraStudents > 0) {
        const [pass, total, gain] = heap.pop();
        
        // Add a student to the class with the highest gain
        const newPass = pass + 1;
        const newTotal = total + 1;
        const newGain = (newPass + 1) / (newTotal + 1) - newPass / newTotal;
        
        // Push the updated class back into the heap with the new gain
        heap.push([newPass, newTotal, newGain]);
        
        extraStudents--;
    }

    // Calculate the final average ratio
    let totalRatio = 0;
    heap.heap.forEach(([pass, total]) => {
        totalRatio += pass / total;
    });

    return totalRatio / classes.length;
};