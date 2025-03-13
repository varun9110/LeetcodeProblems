/**
 * 3356. Zero Array Transformation II
 * Difficulty: Medium
 * 
 * You are given an integer array nums of length n and a 2D array queries where queries[i] = [li, ri, vali].

Each queries[i] represents the following action on nums:

Decrement the value at each index in the range [li, ri] in nums by at most vali.
The amount by which each value is decremented can be chosen independently for each index.
A Zero Array is an array with all its elements equal to 0.

Return the minimum possible non-negative value of k, such that after processing the first k queries in sequence, nums becomes a Zero Array. 
If no such k exists, return -1. 

Example 1:
Input: nums = [2,0,2], queries = [[0,2,1],[0,2,1],[1,1,3]]
Output: 2
Explanation:
For i = 0 (l = 0, r = 2, val = 1):
Decrement values at indices [0, 1, 2] by [1, 0, 1] respectively.
The array will become [1, 0, 1].
For i = 1 (l = 0, r = 2, val = 1):
Decrement values at indices [0, 1, 2] by [1, 0, 1] respectively.
The array will become [0, 0, 0], which is a Zero Array. Therefore, the minimum value of k is 2.
Example 2:

Input: nums = [4,3,2,1], queries = [[1,3,2],[0,2,1]]

Output: -1

Explanation:

For i = 0 (l = 1, r = 3, val = 2):
Decrement values at indices [1, 2, 3] by [2, 2, 1] respectively.
The array will become [4, 1, 0, 0].
For i = 1 (l = 0, r = 2, val = 1):
Decrement values at indices [0, 1, 2] by [1, 1, 0] respectively.
The array will become [3, 0, 0, 0], which is not a Zero Array.
 

Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 5 * 105
1 <= queries.length <= 105
queries[i].length == 3
0 <= li <= ri < nums.length
1 <= vali <= 5
 */


/**
 * Brute force with Map Complexity O(m*n)
 */

var minZeroArray = function(nums, queries) {
    let numbers = new Map();
    for(let i=0; i<nums.length; i++){
        if(nums[i] > 0){
            numbers.set(i, nums[i])
        }
    }

    if(numbers.size === 0){
        return 0;
    }
    for(let i=0; i<queries.length; i++){
        let query = queries[i]
        for(let j=query[0]; j<=query[1]; j++){
            if(numbers.has(j)){
                let count = numbers.get(j);
                count -= query[2]
                if(count <= 0){
                    numbers.delete(j)
                } else {
                    numbers.set(j, count)
                }
            }
        }
        if(numbers.size === 0){
            return i+1;
        }
    }
    return -1
};

var minZeroArray = function(nums, queries) {
    let maxIndex = 0;
    let k = 0;
    for(let i=0; i<nums.length; i++){
        
        let count = nums[i];
        let j=0;
        while(count > 0 && j<queries.length){
            let query = queries[j];
            if(i>=query[0] && i<=query[1]){
                count -= query[2]
            }
            j++;
        }
        if(count>0){
            return -1
        }
        k = Math.max(k,j);
    }

    return k;
}


/**
 * Refined approach:
 * 
 * Intuition
The problem asks us to find the minimum number of queries (k) required to transform nums into a Zero Array.
We use binary search and a difference array (sweep line) for an efficient solution.
Binary Search Process

Initialize: l = 0, r = queries.length + 1 (since k can be from 0 to queries.length).
Binary search for the minimum k:
Compute mid = Math.floor((l + r) / 2).
If isGood(mid) (i.e., nums can be zeroed using mid queries), move r = mid to try for a smaller k.
Otherwise, move l = mid + 1 to search for a larger k.
Approach
Step 1: Understanding Binary Search on k

Instead of applying all queries and checking when nums becomes zero, we use binary search on k, the number of queries to apply.
The range of k is from 0 to queries.length + 1, meaning we check whether we can make nums zero using 0 to queries.length queries.
We try to find the smallest valid k.
Step 2: Checking if k Queries Can Zero the Array (isGood(k))

We check whether nums can be zeroed using the first k queries.
Instead of modifying nums directly, we use a difference array (sweep line technique), which allows us to apply range updates efficiently in O(n).
Step 3: Difference Array (Sweep Line)

Instead of iterating over each element for every query (O(q * n) complexity), we use a difference array to apply multiple range updates efficiently.
Concept: Instead of updating each element separately, we store the increment at the start and the decrement at the end.
The prefix sum of this difference array gives the actual updated values.
Complexity
Time complexity:

We binary search for the minimum valid k, reducing the problem space logarithmically.
For each isGood(k) check, we:
Apply range updates using O(k)
Compute the prefix sum using O(n)
Since we run isGood(k) O(log q) times, the total complexity is O(n log q).
Space complexity:

O(n log q) (much better than naive O(n * q) brute force)
 */


var minZeroArray = function (nums, queries) {
    let l = 0, r = queries.length + 1; // Binary search range

    while (l < r) {
        const mid = Math.floor((l + r) / 2);
        if (isGood(mid)) {
            r = mid; // Try to minimize k
        } else {
            l = mid + 1;
        }
    }

    return l === queries.length + 1 ? -1 : l;

    function isGood(k) {
        const sweepLine = Array(nums.length + 1).fill(0);

        for (let i = 0; i < k; i++) {
            const [s, e, val] = queries[i];
            sweepLine[s] += val;
            sweepLine[e + 1] -= val;
        }

        let acc = 0;
        for (let i = 0; i < nums.length; i++) {
            acc += sweepLine[i];
            if (acc < nums[i]) return false; // Can't fully zero this index
        }

        return true;
    }
};