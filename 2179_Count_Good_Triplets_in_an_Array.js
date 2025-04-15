/**
 * 2179. Count Good Triplets in an Array
 * Difficulty: Hard
 * 
 * You are given two 0-indexed arrays nums1 and nums2 of length n, both of which are permutations of [0, 1, ..., n - 1].

A good triplet is a set of 3 distinct values which are present in increasing order by position both in nums1 and nums2. In other words, 
if we consider pos1v as the index of the value v in nums1 and pos2v as the index of the value v in nums2, 
then a good triplet will be a set (x, y, z) where 0 <= x, y, z <= n - 1, such that pos1x < pos1y < pos1z and pos2x < pos2y < pos2z.
Return the total number of good triplets.

Example 1:

Input: nums1 = [2,0,1,3], nums2 = [0,1,2,3]
Output: 1
Explanation: 
There are 4 triplets (x,y,z) such that pos1x < pos1y < pos1z. They are (2,0,1), (2,0,3), (2,1,3), and (0,1,3). 
Out of those triplets, only the triplet (0,1,3) satisfies pos2x < pos2y < pos2z. Hence, there is only 1 good triplet.
Example 2:

Input: nums1 = [4,0,1,3,2], nums2 = [4,1,0,2,3]
Output: 4
Explanation: The 4 good triplets are (4,0,3), (4,0,2), (4,1,3), and (4,1,2).
 

Constraints:

n == nums1.length == nums2.length
3 <= n <= 105
0 <= nums1[i], nums2[i] <= n - 1
nums1 and nums2 are permutations of [0, 1, ..., n - 1].
 */

/**
 * Intuition
We're given two permutations of [0, 1, ..., n-1], and we need to count triplets (x, y, z) where the order of values is increasing in both nums1 and nums2.
We reduce this problem to counting increasing subsequences of length 3 in an indexed-mapped array where we:
Convert nums1's values to their position in nums2, resulting in a mapped array.
Then count increasing triplets in that mapped array.
Approach
Preprocessing:

Build a mapping of value -> index from nums2.
Transform nums1 into the mapped array based on the position in nums2.
Counting using Fenwick Tree (Binary Indexed Tree):
Traverse mapped from left to right:

Count how many values to the left are less than the current value (using leftTree).
Count how many values to the right are greater than the current value (using rightTree).
Multiply the two counts to get the number of triplets with the current element in the middle.
Update both trees dynamically as we go.
Complexity
Time complexity:

O(n log n): Mapping + BIT operations (query and update) are O(log n) each.
Space complexity:

O(n): Space used by the trees and auxiliary arrays.
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
class FenwickTree {
    constructor(size) {
        this.tree = Array(size + 1).fill(0);
    }

    update(index, value) {
        index++;
        while (index < this.tree.length) {
            this.tree[index] += value;
            index += index & -index;
        }
    }

    query(index) {
        index++;
        let sum = 0;
        while (index > 0) {
            sum += this.tree[index];
            index -= index & -index;
        }
        return sum;
    }
}

var goodTriplets = function (nums1, nums2) {
    const n = nums1.length;
    const posInNums2 = Array(n);
    for (let i = 0; i < n; i++) {
        posInNums2[nums2[i]] = i;
    }

    // Map nums1 elements to their position in nums2
    const mapped = nums1.map(num => posInNums2[num]);
    const leftTree = new FenwickTree(n);
    const rightTree = new FenwickTree(n);
    const rightCount = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        rightTree.update(mapped[i], 1);
    }

    let goodTripletCount = 0;
    for (let i = 0; i < n; i++) {
        const mid = mapped[i];
        rightTree.update(mid, -1);
        const leftSmaller = leftTree.query(mid - 1);           // elements to the left smaller than mid
        const rightGreater = rightTree.query(n - 1) - rightTree.query(mid); // elements to the right greater than mid
        goodTripletCount += leftSmaller * rightGreater;
        leftTree.update(mid, 1);
    }
    return goodTripletCount;
};