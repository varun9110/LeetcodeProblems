/**
 * 3013. Divide an Array Into Subarrays With Minimum Cost II
 * Difficulty: Hard
 * 
 * You are given a 0-indexed array of integers nums of length n, and two positive integers k and dist.

The cost of an array is the value of its first element. For example, the cost of [1,2,3] is 1 while the cost of [3,4,1] is 3.

You need to divide nums into k disjoint contiguous subarrays, such that the difference between the starting index of the second subarray and the starting index of the kth subarray should be less than or equal to dist. In other words, if you divide nums into the subarrays nums[0..(i1 - 1)], nums[i1..(i2 - 1)], ..., nums[ik-1..(n - 1)], then ik-1 - i1 <= dist.

Return the minimum possible sum of the cost of these subarrays.

 

Example 1:

Input: nums = [1,3,2,6,4,2], k = 3, dist = 3
Output: 5
Explanation: The best possible way to divide nums into 3 subarrays is: [1,3], [2,6,4], and [2]. This choice is valid because ik-1 - i1 is 5 - 2 = 3 which is equal to dist. The total cost is nums[0] + nums[2] + nums[5] which is 1 + 2 + 2 = 5.
It can be shown that there is no possible way to divide nums into 3 subarrays at a cost lower than 5.
Example 2:

Input: nums = [10,1,2,2,2,1], k = 4, dist = 3
Output: 15
Explanation: The best possible way to divide nums into 4 subarrays is: [10], [1], [2], and [2,2,1]. This choice is valid because ik-1 - i1 is 3 - 1 = 2 which is less than dist. The total cost is nums[0] + nums[1] + nums[2] + nums[3] which is 10 + 1 + 2 + 2 = 15.
The division [10], [1], [2,2,2], and [1] is not valid, because the difference between ik-1 and i1 is 5 - 1 = 4, which is greater than dist.
It can be shown that there is no possible way to divide nums into 4 subarrays at a cost lower than 15.
Example 3:

Input: nums = [10,8,18,9], k = 3, dist = 1
Output: 36
Explanation: The best possible way to divide nums into 4 subarrays is: [10], [8], and [18,9]. This choice is valid because ik-1 - i1 is 2 - 1 = 1 which is equal to dist.The total cost is nums[0] + nums[1] + nums[2] which is 10 + 8 + 18 = 36.
The division [10], [8,18], and [9] is not valid, because the difference between ik-1 and i1 is 3 - 1 = 2, which is greater than dist.
It can be shown that there is no possible way to divide nums into 3 subarrays at a cost lower than 36.
 

Constraints:

3 <= n <= 105
1 <= nums[i] <= 109
3 <= k <= n
k - 2 <= dist <= n - 2
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} dist
 * @return {number}
 */
var minimumCost = function(nums, k, dist) {
    const n = nums.length;
    if (k < 1) return -1;
    if (k === 1) return nums[0];            // only one subarray -> cost is nums[0]
    if (k > n) return -1;                   // impossible to split into more subarrays than elements

    const Kminus = k - 1;                   // number of split-start indices we must choose (from indices 1..n-1)
    if (Kminus === 0) return nums[0];

    // Simple binary-heap implementation
    class Heap {
        constructor(cmp) {
            this.cmp = cmp;
            this.data = [];
        }
        size() { return this.data.length; }
        peek() { return this.data.length ? this.data[0] : null; }
        push(x) {
            this.data.push(x);
            this._siftUp(this.data.length - 1);
        }
        pop() {
            if (this.data.length === 0) return null;
            const top = this.data[0];
            const last = this.data.pop();
            if (this.data.length) {
                this.data[0] = last;
                this._siftDown(0);
            }
            return top;
        }
        _siftUp(i) {
            const a = this.data;
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (this.cmp(a[i], a[p]) < 0) {
                    [a[i], a[p]] = [a[p], a[i]];
                    i = p;
                } else break;
            }
        }
        _siftDown(i) {
            const a = this.data, n = a.length;
            while (true) {
                let l = i * 2 + 1, r = l + 1, best = i;
                if (l < n && this.cmp(a[l], a[best]) < 0) best = l;
                if (r < n && this.cmp(a[r], a[best]) < 0) best = r;
                if (best === i) break;
                [a[i], a[best]] = [a[best], a[i]];
                i = best;
            }
        }
    }

    // We'll store entries as {val, id} where id is the index in nums (unique)
    // smallHeap: max-heap (we store comparator to act as max by reversing cmp)
    // largeHeap: min-heap
    const smallHeap = new Heap((a, b) => {
        // max-heap: larger val should come earlier => compare b.val - a.val for min-heap structure
        return b.val - a.val;
    });
    const largeHeap = new Heap((a, b) => {
        // min-heap: smaller val first
        return a.val - b.val;
    });

    const removed = new Map();    // id -> true if element has left the window (lazy deletion)
    const inSmall = new Set();    // ids currently counted inside smallHeap (logical membership)
    let smallCount = 0;           // number of live elements in small
    let sumSmall = 0;             // sum of values of elements in small

    // helper: prune lazy-removed elements from heap top
    function pruneTop(heap) {
        while (heap.size() > 0) {
            const top = heap.peek();
            if (removed.has(top.id)) {
                heap.pop(); // discard
            } else {
                break;
            }
        }
    }

    // pop a valid top entry (pruning removed ones first)
    function popValid(heap) {
        pruneTop(heap);
        return heap.pop();
    }

    // peek valid top (after pruning)
    function peekValid(heap) {
        pruneTop(heap);
        return heap.peek();
    }

    // add element with index id into window (place in small or large appropriately)
    function addElement(id) {
        const val = nums[id];
        // if we still need elements in small to reach Kminus, push directly
        if (smallCount < Kminus) {
            smallHeap.push({ val, id });
            inSmall.add(id);
            smallCount++;
            sumSmall += val;
            return;
        }
        // else push to small first, then pop the largest from small to large (this keeps small as Kminus smallest)
        // But if smallCount == 0 (possible when Kminus>0 but due to lazy removals smallHeap currently empty),
        // the above smallCount check handles that because smallCount represents live elements.
        // We still follow push-then-pop approach to keep logic simple:
        // push into small
        smallHeap.push({ val, id });
        inSmall.add(id);
        smallCount++;
        sumSmall += val;
        // now pop the largest from small and move it to large
        const moved = popValid(smallHeap);
        if (moved) {
            // moved is the current largest in small
            inSmall.delete(moved.id);
            smallCount--;
            sumSmall -= moved.val;
            largeHeap.push(moved);
        }
    }

    // remove element with index id from window (lazy). If it was in small, adjust sums and rebalance.
    function removeElement(id) {
        // mark removed
        removed.set(id, true);
        if (inSmall.has(id)) {
            inSmall.delete(id);
            smallCount--;
            sumSmall -= nums[id];
            // now try to move one element from large to small if we need to maintain smallCount==Kminus
            while (smallCount < Kminus && largeHeap.size() > 0) {
                const cand = popValid(largeHeap);
                if (!cand) break;
                // skip if cand removed (popValid pruned that)
                inSmall.add(cand.id);
                smallHeap.push(cand);
                smallCount++;
                sumSmall += cand.val;
            }
        }
        // if it was in large, lazy deletion will discard it when it reaches top
        // also if smallCount > Kminus (shouldn't happen), we would move top of small to large - but our operations maintain invariants
    }

    // Initialize sliding window: s from 1 to n-1, e = min(n-1, s+dist)
    let s = 1;
    let e = Math.min(n - 1, s + dist);
    // Add initial elements [1..e]
    for (let i = 1; i <= e; i++) addElement(i);

    let ans = Infinity;
    // Check initial window
    if (e - s + 1 >= Kminus) {
        ans = Math.min(ans, nums[0] + sumSmall);
    }

    // Slide window: increment s until s > n-1
    while (s < n - 1) {
        // move window forward by 1: remove s, increment s, possibly add new e+1 if within bounds
        removeElement(s);
        s++;
        // compute new e
        const newE = Math.min(n - 1, s + dist);
        if (newE > e) {
            // add all new indices (only at most 1 per step until we hit n-1)
            for (let i = e + 1; i <= newE; i++) addElement(i);
        }
        e = newE;

        // After adjustments, prune tops so peek/pop operations are correct next time
        pruneTop(smallHeap);
        pruneTop(largeHeap);

        const winSize = e - s + 1;
        if (winSize >= Kminus) {
            // Ensure smallCount actually equals Kminus (if possible). It's possible smallCount < Kminus when window shrank.
            // If smallCount < Kminus, we couldn't pick enough indices from this window; skip.
            if (smallCount === Kminus) {
                ans = Math.min(ans, nums[0] + sumSmall);
            }
        }
    }

    return (ans === Infinity) ? -1 : ans;
};