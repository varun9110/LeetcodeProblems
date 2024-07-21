/**
 * 2392. Build a Matrix With Conditions
 * Difficulty: Hard
 * 
 * You are given a positive integer k. You are also given:

a 2D integer array rowConditions of size n where rowConditions[i] = [abovei, belowi], and
a 2D integer array colConditions of size m where colConditions[i] = [lefti, righti].
The two arrays contain integers from 1 to k.
You have to build a k x k matrix that contains each of the numbers from 1 to k exactly once. The remaining cells should have the value 0.
The matrix should also satisfy the following conditions:
The number abovei should appear in a row that is strictly above the row at which the number belowi appears for all i from 0 to n - 1.
The number lefti should appear in a column that is strictly left of the column at which the number righti appears for all i from 0 to m - 1.
Return any matrix that satisfies the conditions. If no answer exists, return an empty matrix.

Example 1:
Input: k = 3, rowConditions = [[1,2],[3,2]], colConditions = [[2,1],[3,2]]
Output: [[3,0,0],[0,0,1],[0,2,0]]
Explanation: The diagram above shows a valid example of a matrix that satisfies all the conditions.
The row conditions are the following:
- Number 1 is in row 1, and number 2 is in row 2, so 1 is above 2 in the matrix.
- Number 3 is in row 0, and number 2 is in row 2, so 3 is above 2 in the matrix.
The column conditions are the following:
- Number 2 is in column 1, and number 1 is in column 2, so 2 is left of 1 in the matrix.
- Number 3 is in column 0, and number 2 is in column 1, so 3 is left of 2 in the matrix.
Note that there may be multiple correct answers.
Example 2:
Input: k = 3, rowConditions = [[1,2],[2,3],[3,1],[2,3]], colConditions = [[2,1]]
Output: []
Explanation: From the first two conditions, 3 has to be below 1 but the third conditions needs 3 to be above 1 to be satisfied.
No matrix can satisfy all the conditions, so we return the empty matrix.

Constraints:
2 <= k <= 400
1 <= rowConditions.length, colConditions.length <= 104
rowConditions[i].length == colConditions[i].length == 2
1 <= abovei, belowi, lefti, righti <= k
abovei != belowi
lefti != righti
 */


/**
 * Approach: Topological Sorting With DFS
🤔 Intuition
First of all - graphs is hard. Okay, now forget about the graphs and let me explain how to think about this problem.

Let's make problem easier for us, what if we will consider only rowConditions and for a second forget about colConditions? Like imagine we have matrix K x 1 so all we need to do is place numbers correctly according to row ordering in rowConditions. Let's say somehow we created this matrixes (now this doesn't matter how, because you want to understand the logic of the problem)
image.png

Okay, good, we know in which row every element will go, but what about columns? We want columns also to be sorted with colConditions. Can we do the same thing we did to rows? Absolutely, let's do this.
image.png

Let's say now we have correct orders for both rows and columns, we know for sure in which row element must be and in which column, can we now esaily construct matrix with this? Sure
image.png

In fact, this is the whole logic for this problem. But let's think about some edge cases and implementing details.
First of all - we created these sortings for rows and columns by magic in the example but in fact behind this approach is algorithm Topological Sorting. Topological sorting - graph algorithm for directed graphs without cycles which just sort graph vertixes in manner first comes my prerequisites (parents) then I come myself and only then come my childrens
This is an example for topological sorting (source)

image.png

The sequence created above is just one of the possible sorting. Topological sort isn't unique which means that there can be multiple answers for one graph.

How we will apply topological sort to our problem? Well, look at the my pictures above where I've drawn relations between values as arrows. In fact, we can imagine for both rows and columns conditions as graph where given to us rowConditions and colConditions are edges for graph. This will look like this:
image.png

And now if you think about topological sorting of the row graph you will see that in fact there's actually two possible sorting.

The one edge case I want to consider before we move on to the code - when there will be the case where matrix is impossible to create? Well, let's look on one more example from the description:
image.png

Do you see the problem? When I was explaining topological sorting I mentioned that it works only for graphs with no cycle (Acyclic) but there's actually the cycle and also logic drawback if you think about it - 1 must be higher than 2, 2 must be higher than 3 (so this can be [1, 2, 3]) but now what?.... 3 must be higher than 1 which is impossible because of previous conditions.

Hope this all makes sense - if not or you have any doubts feel free to ask questions in the comments!❤️

👩🏻‍💻 Coding
Define a nested helper function dfs for depth-first search:

dfs takes five arguments: src (current node), graph (adjacency list), visited (set of visited nodes), cur_path (current path nodes), and res (result list).
Return False if a cycle is detected (node is in cur_path) and True otherwise.
Mark the node as visited and add it to the current path.
Recursively call dfs for each neighbor; if any call returns False, return False.
Backtrack by removing the node from the current path and add it to the result list. (so last nodes visited will be first at list, that's why we reverse list in topo_sort)
Define another helper function topo_sort for topological sorting:

topo_sort takes edges (list of edges) as input.
Build an adjacency list graph from the edges.
Initialize visited and cur_path as empty sets, and res as an empty list.
Perform DFS on all nodes from 1 to k using the dfs function.
Return an empty list if a cycle is detected, otherwise return the result list reversed.
Perform topological sorting on rowConditions and colConditions using topo_sort and store the results in row_sorting and col_sorting.

If either sorting result is an empty list (there was a cycle), return an empty list.

Create a dictionary value_position to store the row and column indices for each value from 1 to k.

Assign row indices to the values based on row_sorting.

Assign column indices to the values based on col_sorting.

Initialize the result matrix res as a k x k matrix filled with zeros.

Populate the matrix res using the positions from value_position.

Return the populated matrix res.

📕 Complexity Analysis
⏰ Time complexity: O(k), since you will run 2 dfs on k nodes and visit each exactly once -> O(2k) -> O(k) (You can also consider O(k^2) since you're created matrix k x k but there's no way to return matrix without creating it, so this doesn't make sense)
🧺 Space complexity: O(k), since we use several data structures like arrays and hashmaps with size up to k and there's dfs call stack which is also linear for k
 */


/**
 * @param {number} k
 * @param {number[][]} rowConditions
 * @param {number[][]} colConditions
 * @return {number[][]}
 */
var buildMatrix = function(k, rowConditions, colConditions) {
    // return True if all okay and return False if cycle was found
    function dfs(src, graph, visited, cur_path, res) {
        if (cur_path.has(src)) return false;  // cycle detected
        if (visited.has(src)) return true;  // all okay, but we've already visited this node

        visited.add(src);
        cur_path.add(src);

        for (let neighbor of (graph.get(src) || [])) {
            if (!dfs(neighbor, graph, visited, cur_path, res))  // if any child returns false
                return false;
        }

        cur_path.delete(src);  // backtrack path
        res.push(src);
        return true;
    }

    // if there will be cycle - return empty array, in other case return 1d array as described above
    function topo_sort(edges) {
        let graph = new Map();
        for (let [src, dst] of edges) {
            if (!graph.has(src)) graph.set(src, []);
            graph.get(src).push(dst);
        }

        let visited = new Set();
        let cur_path = new Set();
        let res = [];

        for (let src = 1; src <= k; ++src) {
            if (!dfs(src, graph, visited, cur_path, res))
                return [];
        }

        return res.reverse();  // we will have res as reversed so we need to reverse it one more time
    }

    let row_sorting = topo_sort(rowConditions);
    let col_sorting = topo_sort(colConditions);
    if (!row_sorting.length || !col_sorting.length)
        return [];

    let value_position = {};
    for (let n = 1; n <= k; ++n) {
        value_position[n] = [0, 0];  // element -> [row_index, col_index]
    }
    row_sorting.forEach((val, ind) => value_position[val][0] = ind);
    col_sorting.forEach((val, ind) => value_position[val][1] = ind);

    let res = Array.from({ length: k }, () => Array(k).fill(0));
    for (let value = 1; value <= k; ++value) {
        let [row, column] = value_position[value];
        res[row][column] = value;
    }

    return res;
};