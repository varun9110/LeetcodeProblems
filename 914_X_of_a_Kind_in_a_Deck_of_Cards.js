/**
 * 914. X of a Kind in a Deck of Cards
 * Difficulty: Easy
 * 
 * You are given an integer array deck where deck[i] represents the number written on the ith card.

Partition the cards into one or more groups such that:

Each group has exactly x cards where x > 1, and
All the cards in one group have the same integer written on them.
Return true if such partition is possible, or false otherwise.

 

Example 1:

Input: deck = [1,2,3,4,4,3,2,1]
Output: true
Explanation: Possible partition [1,1],[2,2],[3,3],[4,4].
Example 2:

Input: deck = [1,1,1,2,2,2,3,3]
Output: false
Explanation: No possible partition.
 

Constraints:

1 <= deck.length <= 104
0 <= deck[i] < 104
 */

/**
 * Greatest Common Divisor
 * 
 * Time complexity:
O(n×log 
2
 (n))

Space complexity:
O(n)
 */

/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function(deck) {
    const gcd = (x, y) => x === 0 ? y : gcd(y % x, x);
    const map = deck.reduce((m, num) => m.set(num, (m.get(num) || 0) + 1), new Map());
    const counts = Array.from(map.values()), c = counts.length;
    let x = counts[0], i = 1;
    while (i < c) x = gcd(x, counts[i++]);
    return x >= 2;
};