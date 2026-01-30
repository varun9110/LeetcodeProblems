/**
 * 2977. Minimum Cost to Convert String II
 * Difficulty: Hard
 * 
 * You are given two 0-indexed strings source and target, both of length n and consisting of lowercase English characters. You are also given two 0-indexed string arrays original and changed, and an integer array cost, where cost[i] represents the cost of converting the string original[i] to the string changed[i].

You start with the string source. In one operation, you can pick a substring x from the string, and change it to y at a cost of z if there exists any index j such that cost[j] == z, original[j] == x, and changed[j] == y. You are allowed to do any number of operations, but any pair of operations must satisfy either of these two conditions:

The substrings picked in the operations are source[a..b] and source[c..d] with either b < c or d < a. In other words, the indices picked in both operations are disjoint.
The substrings picked in the operations are source[a..b] and source[c..d] with a == c and b == d. In other words, the indices picked in both operations are identical.
Return the minimum cost to convert the string source to the string target using any number of operations. If it is impossible to convert source to target, return -1.

Note that there may exist indices i, j such that original[j] == original[i] and changed[j] == changed[i].

 

Example 1:

Input: source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20]
Output: 28
Explanation: To convert "abcd" to "acbe", do the following operations:
- Change substring source[1..1] from "b" to "c" at a cost of 5.
- Change substring source[2..2] from "c" to "e" at a cost of 1.
- Change substring source[2..2] from "e" to "b" at a cost of 2.
- Change substring source[3..3] from "d" to "e" at a cost of 20.
The total cost incurred is 5 + 1 + 2 + 20 = 28. 
It can be shown that this is the minimum possible cost.
Example 2:

Input: source = "abcdefgh", target = "acdeeghh", original = ["bcd","fgh","thh"], changed = ["cde","thh","ghh"], cost = [1,3,5]
Output: 9
Explanation: To convert "abcdefgh" to "acdeeghh", do the following operations:
- Change substring source[1..3] from "bcd" to "cde" at a cost of 1.
- Change substring source[5..7] from "fgh" to "thh" at a cost of 3. We can do this operation because indices [5,7] are disjoint with indices picked in the first operation.
- Change substring source[5..7] from "thh" to "ghh" at a cost of 5. We can do this operation because indices [5,7] are disjoint with indices picked in the first operation, and identical with indices picked in the second operation.
The total cost incurred is 1 + 3 + 5 = 9.
It can be shown that this is the minimum possible cost.
Example 3:

Input: source = "abcdefgh", target = "addddddd", original = ["bcd","defgh"], changed = ["ddd","ddddd"], cost = [100,1578]
Output: -1
Explanation: It is impossible to convert "abcdefgh" to "addddddd".
If you select substring source[1..3] as the first operation to change "abcdefgh" to "adddefgh", you cannot select substring source[3..7] as the second operation because it has a common index, 3, with the first operation.
If you select substring source[3..7] as the first operation to change "abcdefgh" to "abcddddd", you cannot select substring source[1..3] as the second operation because it has a common index, 3, with the first operation.
 

Constraints:

1 <= source.length == target.length <= 1000
source, target consist only of lowercase English characters.
1 <= cost.length == original.length == changed.length <= 100
1 <= original[i].length == changed[i].length <= source.length
original[i], changed[i] consist only of lowercase English characters.
original[i] != changed[i]
1 <= cost[i] <= 106
 */


/**
 * Approach
Step 1: Treat each unique substring as a graph node
Every string in original and changed becomes a node

Each operation is a directed edge

original[i] → changed[i] with weight cost[i]
Multiple edges may exist → keep the minimum cost

Step 2: Floyd Warshall on substring graph
I run Floyd Warshall to compute:

minimum cost to convert any substring A → any substring B
This allows chaining operations on the same interval

This is the core fix compared to wrong approaches

Step 3: DP on the source string
Let
dp[i] = minimum cost to convert source[0..i-1] → target[0..i-1]

Transition:

Single character match

If source[i] == target[i]
I can move forward freely
dp[i+1] = min(dp[i+1], dp[i])
Try all valid substring lengths

Only lengths that appear in original

For length L:

s = source[i .. i+L-1]

t = target[i .. i+L-1]

If both exist in graph and dist[s][t] is finite:

dp[i+L] = min(dp[i+L], dp[i] + dist[s][t])
Step 4: Final answer
If dp[n] is still infinity → return -1
Else return dp[n]
 */

/**
 * @param {string} source
 * @param {string} target
 * @param {string[]} original
 * @param {string[]} changed
 * @param {number[]} cost
 * @return {number}
 */
var minimumCost = function(source, target, original, changed, cost) {
    const INF = BigInt("18446744073709551615");
    const id = new Map();
    const lens = new Set();
    let sz = 0;

    const dist = Array.from({ length: 201 }, () =>
        Array(201).fill(INF)
    );

    for (let i = 0; i < original.length; i++) {
        if (!id.has(original[i])) {
            id.set(original[i], sz++);
            lens.add(original[i].length);
        }
        if (!id.has(changed[i])) {
            id.set(changed[i], sz++);
        }
        const u = id.get(original[i]);
        const v = id.get(changed[i]);
        dist[u][v] = BigInt(Math.min(Number(dist[u][v]), cost[i]));
    }

    for (let i = 0; i < sz; i++) dist[i][i] = 0n;

    for (let k = 0; k < sz; k++)
        for (let i = 0; i < sz; i++)
            if (dist[i][k] !== INF)
                for (let j = 0; j < sz; j++)
                    if (dist[k][j] !== INF)
                        dist[i][j] = BigInt(Math.min(
                            Number(dist[i][j]),
                            Number(dist[i][k] + dist[k][j])
                        ));

    const n = source.length;
    const dp = Array(n + 1).fill(INF);
    dp[0] = 0n;

    for (let i = 0; i < n; i++) {
        if (dp[i] === INF) continue;

        if (source[i] === target[i])
            dp[i + 1] = dp[i + 1] < dp[i] ? dp[i + 1] : dp[i];

        for (const L of lens) {
            if (i + L > n) continue;
            const s = source.substr(i, L);
            const t = target.substr(i, L);

            if (id.has(s) && id.has(t)) {
                const d = dist[id.get(s)][id.get(t)];
                if (d !== INF)
                    dp[i + L] = dp[i + L] < dp[i] + d ? dp[i + L] : dp[i] + d;
            }
        }
    }

    return dp[n] === INF ? -1 : Number(dp[n]);
};