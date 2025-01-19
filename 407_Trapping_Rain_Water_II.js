/**
 * 407. Trapping Rain Water II
 * Difficulty: Hard
 * 
 * Given an m x n integer matrix heightMap representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.

 

Example 1:


Input: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
Output: 4
Explanation: After the rain, water is trapped between the blocks.
We have two small ponds 1 and 3 units trapped.
The total volume of water trapped is 4.
Example 2:


Input: heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]
Output: 10
 

Constraints:

m == heightMap.length
n == heightMap[i].length
1 <= m, n <= 200
0 <= heightMap[i][j] <= 2 * 104
 */

/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function (heightMap) {
    if (heightMap.length < 3) return 0;
    if (heightMap[0].length < 3) return 0;
    let arr = new Array(heightMap.length);
    let pq = new PQ();
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(heightMap[i].length).fill(false);
    }

    for (let i = 0; i < heightMap.length; i++) {
        for (let j = 0; j < heightMap[i].length; j++) {
            if (i === 0 || i === heightMap.length - 1) {
                pq.push([i, j, heightMap[i][j]]);
            } else if (j === 0 || j === arr[i].length - 1) {
                pq.push([i, j, heightMap[i][j]]);
            }
        }
    }

    while (!pq.isEmpty()) {
        let [i, j, height] = pq.pop();
        arr[i][j] = true;
        const dir = [[0, 1], [0, -1], [-1, 0], [1, 0]];
        for (let [nI, nJ] of dir) {
            if ((i + nI) >= heightMap.length) continue;
            if ((i + nI) < 0) continue;
            if ((j + nJ) >= heightMap[i].length) continue;
            if ((j + nJ) < 0) continue;
            if (arr[i + nI][j + nJ]) continue;
            if (heightMap[i + nI][j + nJ] < height) {
                total += (height - heightMap[i + nI][j + nJ]);
                heightMap[i + nI][j + nJ] = height;
            }
            arr[i + nI][j + nJ] = true;
            pq.push([i + nI, j + nJ, heightMap[i + nI][j + nJ]])
        }
    }
    return total;
};

class PQ {
    constructor() {
        this.heap = [];
    }

    push(element) {
        this.heap.push(element);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        const top = this.heap[0];
        const last = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.sinkDown(0);
        }

        return top;
    }

    peek() {
        return this.heap[0];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    bubbleUp(index) {
        let element = this.heap[index];

        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];

            if (element[2] >= parent[2]) break;

            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }

    sinkDown(index) {
        let length = this.heap.length;
        let element = this.heap[index];
        let elementPriority = element[2];

        while (true) {
            let smallestChildIndex = null;
            let smallestChildPriority = Infinity;

            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;

            if (leftChildIndex < length) {
                let leftChild = this.heap[leftChildIndex];
                let leftChildPriority = leftChild[2];

                if (leftChildPriority < smallestChildPriority) {
                    smallestChildIndex = leftChildIndex;
                    smallestChildPriority = leftChildPriority;
                }
            }

            if (rightChildIndex < length) {
                let rightChild = this.heap[rightChildIndex];
                let rightChildPriority = rightChild[2];

                if (rightChildPriority < smallestChildPriority) {
                    smallestChildIndex = rightChildIndex;
                    smallestChildPriority = rightChildPriority;
                }
            }

            if (smallestChildIndex === null || elementPriority < smallestChildPriority) break;

            this.heap[index] = this.heap[smallestChildIndex];
            this.heap[smallestChildIndex] = element;
            index = smallestChildIndex;
        }
    }
}