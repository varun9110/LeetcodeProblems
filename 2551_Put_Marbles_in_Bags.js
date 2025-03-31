/**
 * 2551. Put Marbles in Bags
 * Difficulty: Hard
 * 
 * You have k bags. You are given a 0-indexed integer array weights where weights[i] is the weight of the ith marble. You are also given the integer k.

Divide the marbles into the k bags according to the following rules:

No bag is empty.
If the ith marble and jth marble are in a bag, then all marbles with an index between the ith and jth indices should also be in that same bag.
If a bag consists of all the marbles with an index from i to j inclusively, then the cost of the bag is weights[i] + weights[j].
The score after distributing the marbles is the sum of the costs of all the k bags.

Return the difference between the maximum and minimum scores among marble distributions.

 

Example 1:

Input: weights = [1,3,5,1], k = 2
Output: 4
Explanation: 
The distribution [1],[3,5,1] results in the minimal score of (1+1) + (3+1) = 6. 
The distribution [1,3],[5,1], results in the maximal score of (1+3) + (5+1) = 10. 
Thus, we return their difference 10 - 6 = 4.
Example 2:

Input: weights = [1, 3], k = 2
Output: 0
Explanation: The only distribution possible is [1],[3]. 
Since both the maximal and minimal score are the same, we return 0.
 

Constraints:

1 <= k <= weights.length <= 105
1 <= weights[i] <= 109
 */

/**
 * Intuition
The key insight is to understand what happens when we divide the marbles into different bags. When we split the array between indices i and i+1, we create a boundary where weights[i] and weights[i+1] will be at the ends of their respective bags, contributing to the cost.
For k bags, we need (k-1) cutting points. To maximize the score, we want to cut at positions that result in the highest boundary costs, and to minimize the score, we want to cut at positions with the lowest boundary costs.

Approach
First, handle the edge case where k=1 (only one possible distribution).
For each potential cutting point between adjacent elements, calculate the pair sum (weights[i] + weights[i+1]).
Sort these pair sums.
For minimum score: use the (k-1) smallest pair sums.
For maximum score: use the (k-1) largest pair sums.
Return their difference.
Complexity
Time complexity: O(n log n)

Space complexity: O(n)
 */


/**
 * @param {number[]} weights
 * @param {number} k
 * @return {number}
 */
var putMarbles = function(weights, k) {
    if (k === 1) {
        return 0;
    }

    let pairSums = [];
    for (let i = 0; i < weights.length - 1; i++) {
        pairSums.push(weights[i] + weights[i + 1]);
    }

    pairSums.sort((a, b) => a - b);

    let minScore = 0, maxScore = 0;
    for (let i = 0; i < k - 1; i++) {
        minScore += pairSums[i];
        maxScore += pairSums[pairSums.length - 1 - i];
    }

    return maxScore - minScore;
};