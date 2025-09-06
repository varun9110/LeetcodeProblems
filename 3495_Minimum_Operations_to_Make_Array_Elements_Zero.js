/**
 * 3495. Minimum Operations to Make Array Elements Zero
 * Difficulty: Hard
 * 
 * You are given a 2D array queries, where queries[i] is of the form [l, r]. Each queries[i] defines an array of integers nums consisting of elements ranging from l to r, both inclusive.

In one operation, you can:

Select two integers a and b from the array.
Replace them with floor(a / 4) and floor(b / 4).
Your task is to determine the minimum number of operations required to reduce all elements of the array to zero for each query. Return the sum of the results for all queries.

 

Example 1:

Input: queries = [[1,2],[2,4]]

Output: 3

Explanation:

For queries[0]:

The initial array is nums = [1, 2].
In the first operation, select nums[0] and nums[1]. The array becomes [0, 0].
The minimum number of operations required is 1.
For queries[1]:

The initial array is nums = [2, 3, 4].
In the first operation, select nums[0] and nums[2]. The array becomes [0, 3, 1].
In the second operation, select nums[1] and nums[2]. The array becomes [0, 0, 0].
The minimum number of operations required is 2.
The output is 1 + 2 = 3.

Example 2:

Input: queries = [[2,6]]

Output: 4

Explanation:

For queries[0]:

The initial array is nums = [2, 3, 4, 5, 6].
In the first operation, select nums[0] and nums[3]. The array becomes [0, 3, 4, 1, 6].
In the second operation, select nums[2] and nums[4]. The array becomes [0, 3, 1, 1, 1].
In the third operation, select nums[1] and nums[2]. The array becomes [0, 0, 0, 1, 1].
In the fourth operation, select nums[3] and nums[4]. The array becomes [0, 0, 0, 0, 0].
The minimum number of operations required is 4.
The output is 4.

 

Constraints:

1 <= queries.length <= 105
queries[i].length == 2
queries[i] == [l, r]
1 <= l < r <= 109
 */

/**
 * Intuition
This problem is about repeatedly replacing numbers with their integer division by 4 (i.e., floor(x/4)) until they become 0. Dividing by 4 is equivalent to shifting the binary representation two positions to the right. Therefore the number of times you must divide a positive integer x by 4 until it becomes 0 depends only on how many binary digits (bit_length) x has.

A compact formula for a single number is:

Div4Steps(x) = ceil(bit_length(x) / 2)
In words: each division by 4 removes 2 binary digits, so the number of steps is how many 2-bit chunks are needed to cover the bits of x.

When we are given an array (or a range [l, r]), the total work needed is a function of the per-number Div4Steps(x) values. One operation picks two elements and reduces each by one division step. So if the sum of required single-element steps over the whole array is S and the maximum single-element requirement is dMax, the minimum number of operations to reduce all elements to 0 is:

operations = max(dMax, ceil(S / 2))
Why that formula? Because:

each operation can reduce at most two single-element steps → need at least ceil(S/2) operations; and
the element that needs the most reductions can only be reduced once per operation → need at least dMax operations.
There are two natural approaches to implement queries based on the above idea:

Approach One (simple): For each query range [l, r], iterate over possible bit lengths and count how many numbers in the range have that bit length; multiply by Div4Steps for that bit length, accumulate S, track dMax, compute ops. This is simple and runs in O(#bits) per query (≈ 31 iterations for 32-bit inputs).
Approach Two (optimized O(1) per query): Precompute per-bit-length counts and weighted prefix sums. Then each query computes two partial-block contributions and one prefix-difference for middle full blocks — constant time per query after precomputation.
Approach One (Straightforward)
This approach follows the intuition directly and is easy to understand and implement.

High-level steps (per query [l, r])

Initialize S = 0 (total single-element reductions) and dMax = 0 (maximum single-element reductions in the range).

For each bit-length k from 1 up to a fixed maximum (e.g., 31 for inputs ≤ 1e9):

Determine the block of integers with bit-length k: [2^{k-1}, 2^k - 1].
Compute how many integers from [l, r] fall into that block: cnt_k.
Compute steps_k = ceil(k / 2) (this is Div4Steps for any number in that block).
Add cnt_k * steps_k to S.
Update dMax = max(dMax, steps_k).
After the loop, compute ops = max(dMax, ceil(S / 2)) and return that as the answer for the query.

Why this works

Every number in [l, r] belongs to exactly one block (defined by its bit length). All numbers in the same block share the same Div4Steps value.
Summing cnt_k * steps_k over all k gives S, the total number of single-element reductions required.
Example (walkthrough)
Query: [2, 4] (numbers 2, 3, 4)

k = 2 block is [2, 3]: contains 2 numbers → steps_k = ceil(2 / 2) = 1 → contributes 2 * 1 = 2 to S.
k = 3 block is [4, 7]: overlapped fraction has 1 number (just 4) → steps_k = ceil(3 / 2) = 2 → contributes 1 * 2 = 2 to S.
Total S = 2 + 2 = 4. dMax = 2 (from k=3).
ops = max(2, ceil(4/2)) = max(2, 2) = 2 → this matches the example.
Implementation notes

Use a fixed upper bound for k (e.g., 31 for r ≤ 1e9 or 60 for 64-bit safety).
Use integer arithmetic and be careful with shifts and ranges.
 */

/**
 * @param {number[][]} queries
 * @return {number}
 */
var minOperations = function(queries) {
    let ans = 0n;
    for (let [l, r] of queries) {
        let S = 0n;
        let dMax = 0n;
        for (let k = 1; k <= 31; k++) {
            let low = 1n << BigInt(k - 1);
            let high = (1n << BigInt(k)) - 1n;
            if (low > BigInt(r)) break;
            let a = BigInt(Math.max(l, Number(low)));
            let b = BigInt(Math.min(r, Number(high)));
            if (a > b) continue;
            let cnt = b - a + 1n;
            let stepsForK = BigInt(Math.floor((k + 1) / 2));
            S += cnt * stepsForK;
            if (stepsForK > dMax) dMax = stepsForK;
        }
        let ops = dMax > (S + 1n) / 2n ? dMax : (S + 1n) / 2n;
        ans += ops;
    }
    return Number(ans);
};