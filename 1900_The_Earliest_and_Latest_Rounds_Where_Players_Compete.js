/**
 * 1900. The Earliest and Latest Rounds Where Players Compete
 * Difficulty: Hard
 * 
 * There is a tournament where n players are participating. The players are standing in a single row and are numbered from 1 to n based on their initial standing position (player 1 is the first player in the row, player 2 is the second player in the row, etc.).

The tournament consists of multiple rounds (starting from round number 1). In each round, the ith player from the front of the row competes against the ith player from the end of the row, and the winner advances to the next round. When the number of players is odd for the current round, the player in the middle automatically advances to the next round.

For example, if the row consists of players 1, 2, 4, 6, 7
Player 1 competes against player 7.
Player 2 competes against player 6.
Player 4 automatically advances to the next round.
After each round is over, the winners are lined back up in the row based on the original ordering assigned to them initially (ascending order).

The players numbered firstPlayer and secondPlayer are the best in the tournament. They can win against any other player before they compete against each other. If any two other players compete against each other, either of them might win, and thus you may choose the outcome of this round.

Given the integers n, firstPlayer, and secondPlayer, return an integer array containing two values, the earliest possible round number and the latest possible round number in which these two players will compete against each other, respectively.

 

Example 1:

Input: n = 11, firstPlayer = 2, secondPlayer = 4
Output: [3,4]
Explanation:
One possible scenario which leads to the earliest round number:
First round: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
Second round: 2, 3, 4, 5, 6, 11
Third round: 2, 3, 4
One possible scenario which leads to the latest round number:
First round: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
Second round: 1, 2, 3, 4, 5, 6
Third round: 1, 2, 4
Fourth round: 2, 4
Example 2:

Input: n = 5, firstPlayer = 1, secondPlayer = 5
Output: [1,1]
Explanation: The players numbered 1 and 5 compete in the first round.
There is no way to make them compete in any other round.
 

Constraints:

2 <= n <= 28
1 <= firstPlayer < secondPlayer <= n
 */

/**
 * HOW TO SOLVE?

1. Symmetry Reduction:
Because matchups are symmetric (front vs. back), we can simplify:

define:

left
right
​
  
=min(firstPlayer, secondPlayer)
=max(firstPlayer, secondPlayer)
​
 
Then flip both if the left side is larger than the right side's mirror:

IF:
​
  
​
  
(left−1)>(n−right)
​
  
⇒mirror both
​
 
This reduces unnecessary branches.

2. Recursive Simulation:

define:

nextRound=⌊ 
2
n+1
​
 ⌋: number of players in the next round

minRound=∞

maxRound=−∞

We now simulate pairings of non-important players. Two cases arise:

CASE A: Both Players on Same Half

IF:

​
  
​
  
​
  
2⋅right≤n+1
​
 
THEN: both are on the left half:

Let:
preLeft=left−1: number of players before left
midGap=right−left−1: players between left and right
We try all possible placements of opponents in front:

For each i=0 to preLeft:
For each j=0 to midGap:
Simulate recursively:
res=earliestAndLatest(⌊ 
2
n+1
​
 ⌋, i+1, i+j+2)
CASE B: Players on Opposite Sides

Otherwise:

Define:

mirrored=n+1−right

Now:

preLeft=left−1
midGap=mirrored−left−1
innerGap=right−mirrored−1
Loop over placements:

For each i=0 to preLeft:
For each j=0 to midGap:
res=earliestAndLatest(⌊ 
2
n+1
​
 ⌋, i+1, i+j+1+⌊ 
2
innerGap+1
​
 ⌋+1)
​
 
3. FINALLY:

After every simulation branch:

minRound
maxRound
​
  
=min(minRound, 1+res[0])
=max(maxRound, 1+res[1])
​
  
​
  
Track minimum round
Track maximum round
​
 
result:  
[minRound, maxRound]
​
 
​
 
Base cases:

If firstPlayer+secondPlayer=n+1, they face each other immediately:
return [1,1]
​
 
If n∈{3,4}, the bracket is too small to allow variation:
return [2,2]
​
 
Time Complexity: O(n 
3
 )(average) or O(2 
n
 )(worst)
Space Complexity: O(n)
 */

/**
 * @param {number} n
 * @param {number} firstPlayer
 * @param {number} secondPlayer
 * @return {number[]}
 */
const earliestAndLatest = (n, firstPlayer, secondPlayer) => {
    let left = Math.min(firstPlayer, secondPlayer);
    let right = Math.max(firstPlayer, secondPlayer);

    if (left + right === n + 1) return [1, 1];
    if (n === 3 || n === 4) return [2, 2];

    if (left - 1 > n - right) {
        const temp = n + 1 - left;
        left = n + 1 - right;
        right = temp;
    }

    const nextRound = (n + 1) >> 1;
    const results = [];

    if (right * 2 <= n + 1) {
        const preLeft = left - 1;
        const midGap = right - left - 1;

        for (let i = 0; i <= preLeft; i++) {
            for (let j = 0; j <= midGap; j++) {
                const [minRes, maxRes] = earliestAndLatest(nextRound, i + 1, i + j + 2);
                results.push([1 + minRes, 1 + maxRes]);
            }
        }

    } else {
        const mirrored = n + 1 - right;
        const preLeft = left - 1;
        const midGap = mirrored - left - 1;
        const innerGap = right - mirrored - 1;

        for (let i = 0; i <= preLeft; i++) {
            for (let j = 0; j <= midGap; j++) {
                const second = i + j + 1 + ((innerGap + 1) >> 1) + 1;
                const [minRes, maxRes] = earliestAndLatest(nextRound, i + 1, second);
                results.push([1 + minRes, 1 + maxRes]);
            }
        }
    }


    return [results.reduce((min, [a]) => Math.min(min, a), n),
            results.reduce((max, [, b]) => Math.max(max, b), 1)]
};


