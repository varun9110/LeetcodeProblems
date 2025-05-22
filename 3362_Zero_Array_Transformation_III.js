/**
 * 3362. Zero Array Transformation III
 * Difficulty: Medium
 * 
 * You are given an integer array nums of length n and a 2D array queries where queries[i] = [li, ri].

Each queries[i] represents the following action on nums:

Decrement the value at each index in the range [li, ri] in nums by at most 1.
The amount by which the value is decremented can be chosen independently for each index.
A Zero Array is an array with all its elements equal to 0.
Return the maximum number of elements that can be removed from queries, such that nums can still be converted to a zero array using the remaining queries. If it is not possible to convert nums to a zero array, return -1.


Example 1:
Input: nums = [2,0,2], queries = [[0,2],[0,2],[1,1]]
Output: 1
Explanation:
After removing queries[2], nums can still be converted to a zero array.
Using queries[0], decrement nums[0] and nums[2] by 1 and nums[1] by 0.
Using queries[1], decrement nums[0] and nums[2] by 1 and nums[1] by 0.
Example 2:
Input: nums = [1,1,1,1], queries = [[1,3],[0,2],[1,3],[1,2]]
Output: 2
Explanation:
We can remove queries[2] and queries[3].

Example 3:
Input: nums = [1,2,3,4], queries = [[0,3]]
Output: -1
Explanation:
nums cannot be converted to a zero array even after using all the queries.

Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 105
1 <= queries.length <= 105
queries[i].length == 2
0 <= li <= ri < nums.length
 */


/**
Intuition
The earlier approches for iterating through the 'prefix array' doesn't work here.
I want to exhaust the nums[i] from the query covering the maximum range. If nums[i] is still > 0, I will exhaust by smaller queries.

Approach
I iterate through all the elements of nums array.
Accumulate all the queries covering i such that the query with largest end comes on the top. Use priority queue for the above.
Till now I have not started to exhaust the nums[i]
On all the queries in priority queue, start exhausting the nums[i] till the pq is empty or the nums[i]+prefix[i] becomes 0.
Complexity
Time complexity:
O(nLog(n))

Space complexity:
O(n)
 */



/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var maxRemoval = function (nums, queries) {
    queries.sort((a, b) => a[0] - b[0]);
    const heap = new MaxPriorityQueue();
    const deltaArray = new Array(nums.length + 1).fill(0);
    let operations = 0;

    for (let i = 0, j = 0; i < nums.length; i++) {
        operations += deltaArray[i];
        while (j < queries.length && queries[j][0] === i) {
            heap.push(queries[j][1]);
            j++;
        }
        while (operations < nums[i] && !heap.isEmpty() && heap.front() >= i) {
            operations += 1;
            deltaArray[heap.pop() + 1] -= 1;
        }
        if (operations < nums[i]) {
            return -1;
        }
    }
    return heap.size();
};