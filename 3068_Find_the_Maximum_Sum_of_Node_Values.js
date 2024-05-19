/**
 * 3068. Find the Maximum Sum of Node Values
 * Difficulty: Hard
 * 
 * There exists an undirected tree with n nodes numbered 0 to n - 1. 
 * You are given a 0-indexed 2D integer array edges of length n - 1, where edges[i] = [ui, vi] indicates that there is an 
 * edge between nodes ui and vi in the tree. You are also given a positive integer k, and a 0-indexed array of
 *  non-negative integers nums of length n, where nums[i] represents the value of the node numbered i.

Alice wants the sum of values of tree nodes to be maximum, for which Alice can perform the following operation any 
number of times (including zero) on the tree:

Choose any edge [u, v] connecting the nodes u and v, and update their values as follows:
nums[u] = nums[u] XOR k
nums[v] = nums[v] XOR k
Return the maximum possible sum of the values Alice can achieve by performing the operation any number of times.

Example 1:
Input: nums = [1,2,1], k = 3, edges = [[0,1],[0,2]]
Output: 6
Explanation: Alice can achieve the maximum sum of 6 using a single operation:
- Choose the edge [0,2]. nums[0] and nums[2] become: 1 XOR 3 = 2, and the array nums becomes: [1,2,1] -> [2,2,2].
The total sum of values is 2 + 2 + 2 = 6.
It can be shown that 6 is the maximum achievable sum of values.
Example 2:
Input: nums = [2,3], k = 7, edges = [[0,1]]
Output: 9
Explanation: Alice can achieve the maximum sum of 9 using a single operation:
- Choose the edge [0,1]. nums[0] becomes: 2 XOR 7 = 5 and nums[1] become: 3 XOR 7 = 4, and the array nums becomes: [2,3] -> [5,4].
The total sum of values is 5 + 4 = 9.
It can be shown that 9 is the maximum achievable sum of values.
Example 3:
Input: nums = [7,7,7,7,7,7], k = 3, edges = [[0,1],[0,2],[0,3],[0,4],[0,5]]
Output: 42
Explanation: The maximum achievable sum is 42 which can be achieved by Alice performing no operations.
 

Constraints:

2 <= n == nums.length <= 2 * 104
1 <= k <= 109
0 <= nums[i] <= 109
edges.length == n - 1
edges[i].length == 2
0 <= edges[i][0], edges[i][1] <= n - 1
The input is generated such that edges represent a valid tree.
 */

/**
 * Approach 1: Recursion with memoization
First of all - don't give up if you don't understand this approach. It's quite hard to come up with or understand so 
just move on to the next approach if you don't like this.

We will do something like Fibonacci numbers - we will go from top to the bottom, calculating all possible states of 
the problem using recursion and memoization
We want to apply this steps to write code for recursion solution:
Initialize memoization array temp
We want to choose "root" of our tree so we can be sure that we traverse it all so let's just start with 0. 
In recursion we want to know on which node we currently are and parity of number of nodes we have XORed all the way to this node.
If we've gone through last node and now we are on the non-existing node then we want to return -inf if number of nodes 
we XORed is odd (because we can XOR only pair of them) or 0 if it's even (non-existing node mustn't affect the sum).
If we already encountered this state then return its maximum result from temp.
Call recursion for both occasions - we are XORing this node and we aren't.
Find maximum from two values, write it to the memoization array and return it.
Just return result from our recursion function using node 0 as root and is_even to true (we have XORed 0 nodes which is even)
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number[][]} edges
 * @return {number}
 */
var maximumValueSum = function(nums, k, edges) {
    const n = nums.length;
    const temp = Array.from({ length: n }, () => [-1, -1]);

    // calculate_max -> cur_ind -> cur_index of the tree and is_even represents whether we have already changed (XOR) even or odd number of nodes 
    function calculateMax(curInd, isEven) {
        if (curInd === n) {  // if we go to node which doesn't exist
            return isEven === 1 ? 0 : -Infinity;
        }
        if (temp[curInd][isEven] !== -1) {  // if we've already encountered this state
            return temp[curInd][isEven];
        }

        // checking all possible variants (no XOR or XOR)
        const noXor = nums[curInd] + calculateMax(curInd + 1, isEven);  // we don't change the number of XOR nodes
        const withXor = (nums[curInd] ^ k) + calculateMax(curInd + 1, 1 - isEven);  // we added 1 XORed node

        const mxPossible = Math.max(noXor, withXor);
        temp[curInd][isEven] = mxPossible;
        return mxPossible;
    }

    return calculateMax(0, 1);  // is_even == 1 because we have XORed 0 nodes which is even
};