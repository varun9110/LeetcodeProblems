/**
 * 752. Open the Lock
 * Difficulty: Medium
 * You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'. 
 * The wheels can rotate freely and wrap around: for example we can turn '9' to be '0', or '0' to be '9'. 
 * Each move consists of turning one wheel one slot.

The lock initially starts at '0000', a string representing the state of the 4 wheels.

You are given a list of deadends dead ends, meaning if the lock displays any of these codes, 
the wheels of the lock will stop turning and you will be unable to open it.

Given a target representing the value of the wheels that will unlock the lock, return the 
minimum total number of turns required to open the lock, or -1 if it is impossible.


Example 1:
Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
Output: 6
Explanation: 
A sequence of valid moves would be "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202".
Note that a sequence like "0000" -> "0001" -> "0002" -> "0102" -> "0202" would be invalid,
because the wheels of the lock become stuck after the display becomes the dead end "0102".
Example 2:
Input: deadends = ["8888"], target = "0009"
Output: 1
Explanation: We can turn the last wheel in reverse to move from "0000" -> "0009".
Example 3:
Input: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
Output: -1
Explanation: We cannot reach the target without getting stuck.

Constraints:
1 <= deadends.length <= 500
deadends[i].length == 4
target.length == 4
target will not be in the list deadends.
target and deadends[i] consist of digits only.
 */


/**
 * We start from the "0000" combination and then moves to the adjacent combinations. 
 * Basically turn up and down each of the wheels to generate "1000", "9000", "0100", "0900", "0010", "0090", "0001", "0009".

You can think of this problem as graph, where the node "0000" will have 8 edges. 
Each one of the new combinations will have 8 more adjacent nodes. However, we will start to have duplicates. For instance:

"0000" -> ["1000", "9000", "0100", "0900", "0010", "0090", "0001", "0009"]
"0001" -> ["1001", "9001", "0101", "0901", "0011", "0091", "0002", "0000"]
As you can see "0001" will lead to "0000", again! So we have to keep track of seen combinations.

Since, it's a graph problem we can use BFS to fine the combination.
 */

var openLock = function(deadends, target) {
    const dead = new Set(deadends);
    const queue = [['0000', 0]];
    const seen = new Set(['0000']);
    
    for (let [curr, turns] of queue) {
        if (curr === target) return turns;
        if (dead.has(curr)) continue;    
        for (let next of getNextStates(curr)) {
        if (seen.has(next)) continue;
        seen.add(next);
        queue.push([next, turns + 1]);
        }
    }
    
    return -1;
    };
    
    function getNextStates(s = '0000') {
    const ans = [];
    
    for (let i = 0; i < s.length; i++) {
        ans.push(s.slice(0, i) + ((+s[i] + 1) % 10).toString() + s.slice(i + 1));
        ans.push(s.slice(0, i) + ((+s[i] + 9) % 10).toString() + s.slice(i + 1));
    }
    
    return ans;
};