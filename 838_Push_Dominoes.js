/**
 * 838. Push Dominoes
 * Difficulty: Medium
 *
 * There are n dominoes in a line, and we place each domino vertically upright. In the beginning, we simultaneously push some of the dominoes either to the left or to the right.

After each second, each domino that is falling to the left pushes the adjacent domino on the left. Similarly, the dominoes falling to the right push their adjacent dominoes standing on the right.

When a vertical domino has dominoes falling on it from both sides, it stays still due to the balance of the forces.

For the purposes of this question, we will consider that a falling domino expends no additional force to a falling or already fallen domino.

You are given a string dominoes representing the initial state where:

dominoes[i] = 'L', if the ith domino has been pushed to the left,
dominoes[i] = 'R', if the ith domino has been pushed to the right, and
dominoes[i] = '.', if the ith domino has not been pushed.
Return a string representing the final state.

Example 1:

Input: dominoes = "RR.L"
Output: "RR.L"
Explanation: The first domino expends no additional force on the second domino.
Example 2:

Input: dominoes = ".L.R...LR..L.."
Output: "LL.RR.LLRRLL.."

Constraints:

n == dominoes.length
1 <= n <= 105
dominoes[i] is either 'L', 'R', or '.'. 
 * 
 */

/**
 * Intuition
Hey there, domino fans! 😎

When you push dominoes, they fall and push others in the direction they were pushed. If a domino is pushed to the right (R), it continues pushing the next one on its right unless it meets a domino pushed to the left (L). Similarly, a domino pushed to the left keeps pushing leftward unless it meets an R.

Key idea: Dominoes influenced by only one side (L or R) fall that way, while those between R...L fall inward, potentially leaving the center upright if the gap is odd.

Instead of simulating second-by-second, we jump directly between segments of non-. forces.

The Game Plan: Domino Domination in 4 Steps 🕹️
Pad boundaries. Add L at start and R at end: transforms "..R...L.R.." → "L..R...L.R..R".
Listify. Convert string to a mutable list (e.g. char[] or Python list).
Sweep and fill. Track the index of the last non-. (force). For each new force:
Same direction (R...R or L...L): fill all dots in between.
Inward (R...L): fill half the gap with R (left) and half with L (right); leave middle dot if gap odd.
Outward (L...R): leave dots unchanged.
Unpad. Drop the first and last characters from the result.
Optimization: In-Place Domino Cascade
Approach Overview
Virtual Boundaries

Treat an implicit L before index 0 and an implicit R after index n-1.
Single-Pass Sweep

Maintain:
prev: index of last force
prevChar: its direction ('L' or 'R')
Loop i from 0 to n:
If i < n, curChar = arr[i]
Else (i == n), curChar = 'R' (right boundary)
Handle Each New Force

Same Direction (L…L or R…R)
Fill all dominoes between prev+1 and i-1 with curChar.
Inward Facing (R…L)
Two-pointer fill from both ends toward center; if the gap is odd, leave the middle upright.
Outward Facing (L…R)
Do nothing—dominoes remain upright.
In-Place Updates

Modify the original char[] directly.
Extra space: only integers (prev, i, l, r) and prevChar → O(1).
Result Extraction

After the sweep, convert the modified array back to a string; this is the final state.
🧩 Check out the pseudocode hidden in the comments below 👇
Alright code warriors—your mission, should you choose to accept it: craft that fighter-jet slick in-place domino cascade in O(1) space. No padding buffer, no excuses—show me your magic! 🌟🔥

Code Visualization
For "..R...L.R.." padded to "L..R...L.R..R":

Segment	Index Range	Pattern	Dots Indices	Action	Result
[0 → 3]	0…3	L . . R	1, 2	Outward (L...R): no change	L..R
[3 → 7]	3…7	R . . . L	4, 5, 6	Inward (R...L): gap=3 → half=1 → R . L	RR.L
[7 → 9]	7…9	L . R	8	Outward (L.R): no change	L.R
[9 → 12]	9…12	R . . R	10, 11	Same (R...R): fill both with R	RRR
Concatenate segments: L..R + RR.L + L.R + RRR → L..RR.LRRR → strip padding → ..RR.LL.RRR.

Example Walkthrough
Let’s apply these steps to "..R...L.R..":

Pad: L..R...L.R..R
Identify forces at positions 0:L, 3:R, 7:L, 9:R.
Process segments:
[0→3] (L..R): outward → .. stays.
[3→7] (R...L): inward, gap=3 → half=1 → R.R.
[7→9] (L.R): outward → . stays.
[9→12] (R..R): same → RR.
Assemble & unpad: L..R R.R L.R RR → ..RR.LRRR.
Complexity
Time complexity: O(n) 🏃‍♂️ — single pass, each domino touched once.

Space complexity: O(n) 💾 — storing the padded list of size n+2.

If you found this helpful or enjoyed the vibe, would you mind giving it an upvote? It’s like a virtual high-five, and it helps others find this content too! Thanks for being awesome! 🚀
 */


/**
 * @param {string} dominoes
 * @return {string}
 */
var pushDominoes = function(dominoes) {
    const s = 'L' + dominoes + 'R';
    const arr = s.split('');
    let prev = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === '.') continue;
        if (arr[prev] === arr[i]) {
            for (let k = prev + 1; k < i; k++) arr[k] = arr[i];
        } else if (arr[prev] === 'R' && arr[i] === 'L') {
            let l = prev + 1, r = i - 1;
            while (l < r) {
                arr[l++] = 'R';
                arr[r--] = 'L';
            }
        }
        prev = i;
    }
    return arr.slice(1, -1).join('');
};