/**
 * 2410. Maximum Matching of Players With Trainers
 * Difficulty: Medium
 * 
 * You are given a 0-indexed integer array players, where players[i] represents the ability of the ith player. You are also given a 0-indexed integer array trainers, where trainers[j] represents the training capacity of the jth trainer.

The ith player can match with the jth trainer if the player's ability is less than or equal to the trainer's training capacity. Additionally, the ith player can be matched with at most one trainer, and the jth trainer can be matched with at most one player.

Return the maximum number of matchings between players and trainers that satisfy these conditions.

 

Example 1:

Input: players = [4,7,9], trainers = [8,2,5,8]
Output: 2
Explanation:
One of the ways we can form two matchings is as follows:
- players[0] can be matched with trainers[0] since 4 <= 8.
- players[1] can be matched with trainers[3] since 7 <= 8.
It can be proven that 2 is the maximum number of matchings that can be formed.
Example 2:

Input: players = [1,1,1], trainers = [10]
Output: 1
Explanation:
The trainer can be matched with any of the 3 players.
Each player can only be matched with one trainer, so the maximum answer is 1.
 

Constraints:

1 <= players.length, trainers.length <= 105
1 <= players[i], trainers[j] <= 109
 
 */

/**
 * 🧠 Intuition
A player p can train with a trainer t only if p ≤ t (the trainer’s capacity is at least the player’s ability).
To maximise the number of pairings we should always give the weakest still‑unmatched player to the weakest still‑available trainer who can handle them.
Greedy sorting plus two pointers achieves exactly that and is the approach recommended in most editorial write‑ups for LeetCode 2410 “Maximum Matching of Players With Trainers”. ([leetcode.com][1], [AlgoMonster][2])

✅ Approach
Sort players and trainers in non‑decreasing order.

Maintain two indices i (players) and j (trainers).

While both arrays have elements left

If players[i] ≤ trainers[j], we have a match → increment answer and move to next player (i++).
Whether matched or not, always move to next trainer (j++) because a trainer has now been considered.
The loop finishes when either all players are matched/checked or all trainers are used.

This “two‑pointer after sort” pattern is the standard greedy solution. ([GitHub][3], [Leetcode][4])

📊 Complexity
Metric	Value	Reason
Time	O(PlogP+TlogT)	Sorting players of size P and trainers of size T. The subsequent scan is linear. ([GitHub][5])
Space	O(1)	Sorting can be done in‑place; only a few integers are stored.

 */

/**
 * @param {number[]} players
 * @param {number[]} trainers
 * @return {number}
 */
var matchPlayersAndTrainers = function(players, trainers) {
    players.sort((a, b) => a - b);
  trainers.sort((a, b) => a - b);

  let i = 0, j = 0, matches = 0;
  while (i < players.length && j < trainers.length) {
    if (players[i] <= trainers[j]) {
      ++matches;
      ++i;
    }
    ++j;
  }
  return matches;
};