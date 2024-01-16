/**
 * 380. Insert Delete GetRandom O(1)
 * Difficulty: Medium
 * 
 * Implement the RandomizedSet class:
RandomizedSet() Initializes the RandomizedSet object.
bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise.
bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise.
int getRandom() Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). 
Each element must have the same probability of being returned.
You must implement the functions of the class such that each function works in average O(1) time complexity. 

Example 1:
Input
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output
[null, true, false, true, 2, true, false, 2]
Explanation
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
randomizedSet.insert(2); // 2 was already in the set, so return false.
randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.

Constraints:
-231 <= val <= 231 - 1
At most 2 * 105 calls will be made to insert, remove, and getRandom.
There will be at least one element in the data structure when getRandom is called.
 */


var RandomizedSet = function() {
    this.data = []; // Store the elements in the set
    this.indexMap = new Map(); // Map to store element-to-index mapping
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.indexMap.has(val)) return false; // Element already exists in the set
    this.data.push(val); // Add the element to the end of the array
    this.indexMap.set(val, this.data.length - 1); // Map element to its index
    return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.indexMap.has(val)) return false; // Element doesn't exist in the set

    const index = this.indexMap.get(val); // Get the index of the element to remove
    const lastElement = this.data.pop(); // Remove and get the last element

    // If the element to remove is not the last element, swap it with the last element
    if (index !== this.data.length) {
        this.data[index] = lastElement; // Swap with the removed element
        this.indexMap.set(lastElement, index); // Update indexMap
    }

    this.indexMap.delete(val); // Remove the element from the indexMap
    return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    const i = Math.floor(Math.random() * this.data.length); // Generate a random index
    return this.data[i]; // Return the element at the random index
};

/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */