/** 
 * 2127. Maximum Employees to Be Invited to a Meeting
 * Difficulty: Hard
 * 
 * A company is organizing a meeting and has a list of n employees, waiting to be invited. They have arranged for a large circular table, capable of seating any number of employees.

The employees are numbered from 0 to n - 1. Each employee has a favorite person and they will attend the meeting only if they can sit next to their favorite person at the table. The favorite person of an employee is not themself.

Given a 0-indexed integer array favorite, where favorite[i] denotes the favorite person of the ith employee, return the maximum number of employees that can be invited to the meeting.

 

Example 1:


Input: favorite = [2,2,1,2]
Output: 3
Explanation:
The above figure shows how the company can invite employees 0, 1, and 2, and seat them at the round table.
All employees cannot be invited because employee 2 cannot sit beside employees 0, 1, and 3, simultaneously.
Note that the company can also invite employees 1, 2, and 3, and give them their desired seats.
The maximum number of employees that can be invited to the meeting is 3. 
Example 2:

Input: favorite = [1,2,0]
Output: 3
Explanation: 
Each employee is the favorite person of at least one other employee, and the only way the company can invite them is if they invite every employee.
The seating arrangement will be the same as that in the figure given in example 1:
- Employee 0 will sit between employees 2 and 1.
- Employee 1 will sit between employees 0 and 2.
- Employee 2 will sit between employees 1 and 0.
The maximum number of employees that can be invited to the meeting is 3.
Example 3:


Input: favorite = [3,0,1,4,1]
Output: 4
Explanation:
The above figure shows how the company will invite employees 0, 1, 3, and 4, and seat them at the round table.
Employee 2 cannot be invited because the two spots next to their favorite employee 1 are taken.
So the company leaves them out of the meeting.
The maximum number of employees that can be invited to the meeting is 4.
 

Constraints:

n == favorite.length
2 <= n <= 105
0 <= favorite[i] <= n - 1
favorite[i] != i
*/

/**
 * Intuition
The solution works by analyzing the given input graph and considering two key cases:
Cycle detection: Detecting and measuring the size of cycles in the graph.
Mutual pairs and their chains: Handling special 2-cycles (mutual favorite pairs) and the longest chains leading to each node in the pair.
Approach
Step 1: Preprocess and Initialize

inDegree: This array keeps track of the number of employees pointing to each employee.
pairs: Collects all mutual favorite pairs (2-cycles). For example, if employee i likes j and j likes i, they form a pair.
reverseMap: Stores all employees pointing to a specific employee (reverse adjacency list).
Step 2: Topological Sort to Remove Dead Ends

Nodes with inDegree = 0 (no one points to them) cannot participate in a cycle or contribute to valid seating.
A stack is used to perform a topological sort, iteratively removing nodes with inDegree = 0.
This process ensures that the remaining nodes are either part of a cycle or directly point to cycles.
Step 3: Detect and Measure Cycles

After the topological sort, nodes with inDegree = 1 are part of a cycle.
For every cycle detected, the length is calculated by following the chain until it loops back to the starting node.
maxResult is updated with the largest cycle length.
Step 4: Handle Mutual Pairs (2-Cycles)

For each mutual pair (e.g., (i, j)): The algorithm calculates the longest chains leading into i and j (excluding the direct connection between the pair).
The reverse map is used to explore all chains leading to a node, updating the maximum chain lengths for both nodes in the pair.
The total contribution of each 2-cycle to the seating is 1 + longestChainTo(i) + 1 + longestChainTo(j).
The sum of contributions from all 2-cycles (pairSum) is compared with the current maxResult.
Step 5: Combine Results

The final result is the larger of:
The size of the largest cycle detected.
The sum of contributions from all 2-cycles (with their chains).
Complexity
Time complexity:

Topological Sort: Each edge is visited once to decrement inDegree values.
This step takes O(n), where n is the number of employees.
Cycle Detection: For each node, the algorithm traverses a cycle (if it exists).
Each edge in the graph is part of exactly one cycle or chain, so this step is also O(n).
Chain Length Calculation for 2-Cycles: For each node in a mutual pair, the algorithm explores all chains leading to that node.
Since each edge is processed once across all chains, this step is O(n).
Overall, the algorithm processes each node and edge at most once, making the time complexity O(n).
Space complexity:

Storage for Arrays: inDegree, reverseMap, and visited arrays/lists require O(n) space.
Call Stack for DFS: In the worst case, the recursive stack (used to explore chains) will require O(n) space.
Thus, the space complexity is O(n).
Code
 */

/**
 * @param {number[]} favorite
 * @return {number}
 */
var maximumInvitations = function(favorite) {
    let n = favorite.length;
    let inDegree = new Array(n).fill(0), pairs = [], reverseMap = {}, maxResult = 0;

    for (let i = 0; i < n; i++) {
        inDegree[favorite[i]]++;
        if (favorite[favorite[i]] === i && favorite[i] > i) {
            pairs.push([i, favorite[i]]);
        }
        if (!(favorite[i] in reverseMap)) {
            reverseMap[favorite[i]] = [];
        }
        reverseMap[favorite[i]].push(i);
    }

    let stack = [];
    for (let i = 0; i < n; i++) {
        if (inDegree[i] === 0) {
            stack.push(i);
        }
    }

    while (stack.length > 0) {
        let current = stack.pop();
        inDegree[favorite[current]]--;
        if (inDegree[favorite[current]] === 0) {
            stack.push(favorite[current]);
        }
    }

    for (let i = 0; i < n; i++) {
        if (inDegree[i] === 1) {
            let count = 1, start = i;
            while (favorite[start] !== i) {
                inDegree[start]--;
                start = favorite[start];
                count++;
            }
            maxResult = Math.max(maxResult, count);
        }
    }

    let pairSum = 0;
    for (let pair of pairs) {
        const maxChain = [1, 1];
        for (let i = 0; i < 2; i++) {
            let stack = [[pair[i], 1]];
            while (stack.length > 0) {
                let [current, length] = stack.pop();
                if (!(current in reverseMap)) {
                    maxChain[i] = Math.max(maxChain[i], length);
                    continue;
                }
                for (let neighbor of reverseMap[current]) {
                    if (neighbor === favorite[pair[i]]) continue;
                    stack.push([neighbor, length + 1]);
                }
            }
        }
        pairSum += maxChain[0] + maxChain[1];
    }

    maxResult = Math.max(maxResult, pairSum);

    return maxResult;
};