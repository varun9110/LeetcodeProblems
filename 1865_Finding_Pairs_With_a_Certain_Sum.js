/**
 * 1865. Finding Pairs With a Certain Sum
 * Difficulty: Medium
 * 
 * You are given two integer arrays nums1 and nums2. You are tasked to implement a data structure that supports queries of two types:

Add a positive integer to an element of a given index in the array nums2.
Count the number of pairs (i, j) such that nums1[i] + nums2[j] equals a given value (0 <= i < nums1.length and 0 <= j < nums2.length).
Implement the FindSumPairs class:

FindSumPairs(int[] nums1, int[] nums2) Initializes the FindSumPairs object with two integer arrays nums1 and nums2.
void add(int index, int val) Adds val to nums2[index], i.e., apply nums2[index] += val.
int count(int tot) Returns the number of pairs (i, j) such that nums1[i] + nums2[j] == tot.
 

Example 1:

Input
["FindSumPairs", "count", "add", "count", "count", "add", "add", "count"]
[[[1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]], [7], [3, 2], [8], [4], [0, 1], [1, 1], [7]]
Output
[null, 8, null, 2, 1, null, null, 11]

Explanation
FindSumPairs findSumPairs = new FindSumPairs([1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]);
findSumPairs.count(7);  // return 8; pairs (2,2), (3,2), (4,2), (2,4), (3,4), (4,4) make 2 + 5 and pairs (5,1), (5,5) make 3 + 4
findSumPairs.add(3, 2); // now nums2 = [1,4,5,4,5,4]
findSumPairs.count(8);  // return 2; pairs (5,2), (5,4) make 3 + 5
findSumPairs.count(4);  // return 1; pair (5,0) makes 3 + 1
findSumPairs.add(0, 1); // now nums2 = [2,4,5,4,5,4]
findSumPairs.add(1, 1); // now nums2 = [2,5,5,4,5,4]
findSumPairs.count(7);  // return 11; pairs (2,1), (2,2), (2,4), (3,1), (3,2), (3,4), (4,1), (4,2), (4,4) make 2 + 5 and pairs (5,3), (5,5) make 3 + 4
 

Constraints:

1 <= nums1.length <= 1000
1 <= nums2.length <= 105
1 <= nums1[i] <= 109
1 <= nums2[i] <= 105
0 <= index < nums2.length
1 <= val <= 105
1 <= tot <= 109
At most 1000 calls are made to add and count each.
 */

/**
 ⚙️ Approach 2: Better Using HashMap on-the-fly
Intuition:
Each count(tot) can use a hashmap of nums2 frequencies (built fresh each time).

from collections import Counter

class FindSumPairs:
    def __init__(self, nums1, nums2):
        self.n1 = nums1
        self.n2 = nums2

    def add(self, index, val):
        self.n2[index] += val

    def count(self, tot):
        freq = Counter(self.n2)
        res = 0
        for x in self.n1:
            res += freq[tot - x]
        return res
Complexity:
Time: O(n^2) for count
Space: O(n^2)
🚀 Approach 3: Optimal (Persistent Frequency Map)
Intuition:
Precompute frequency of elements in nums2 and update on-the-fly.

Complexity:
add(index, val) → O(1)
count(tot) → O(n1)
Space: O(n2) for the frequency map
🔬 Deep Testcase Explanation
Example:
nums1 = [1, 1, 2, 2, 2, 3]
nums2 = [1, 4, 5, 2, 5, 4]
count(7) → Find i, j where nums1[i] + nums2[j] == 7
For each value in nums1, check tot - val in nums2_freq:

1 → need 6 → no
2 → need 5 → exists 3 times
3 → need 4 → exists 2 times
So total: 3*3 + 1*2 = 11
add(3, 2) → index 3 in nums2 becomes 4 → freq of 2--, 4++

count(8) →
Need pairs adding to 8

3 → needs 5 → freq = 3
So only (5,2) and (5,4) → Total = 2
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 */
var FindSumPairs = function(nums1, nums2) {
    this.n1 = nums1;
        this.n2 = nums2;
        this.freq = new Map();
        for (let x of nums2) {
            this.freq.set(x, (this.freq.get(x) || 0) + 1);
        }
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
FindSumPairs.prototype.add = function(index, val) {
    let old = this.n2[index];
        this.freq.set(old, this.freq.get(old) - 1);
        this.n2[index] += val;
        let updated = this.n2[index];
        this.freq.set(updated, (this.freq.get(updated) || 0) + 1);
};

/** 
 * @param {number} tot
 * @return {number}
 */
FindSumPairs.prototype.count = function(tot) {
    let res = 0;
        for (let x of this.n1) {
            res += this.freq.get(tot - x) || 0;
        }
        return res;
};

/** 
 * Your FindSumPairs object will be instantiated and called as such:
 * var obj = new FindSumPairs(nums1, nums2)
 * obj.add(index,val)
 * var param_2 = obj.count(tot)
 */