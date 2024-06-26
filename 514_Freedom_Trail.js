/**
 * 514. Freedom Trail
 * Difficulty: Hard
 * 
 * In the video game Fallout 4, the quest "Road to Freedom" requires players to reach a metal dial called the 
 * "Freedom Trail Ring" and use the dial to spell a specific keyword to open the door.

Given a string ring that represents the code engraved on the outer ring and another string key that represents 
the keyword that needs to be spelled, return the minimum number of steps to spell all the characters in the keyword.

Initially, the first character of the ring is aligned at the "12:00" direction. You should spell all the 
characters in key one by one by rotating ring clockwise or anticlockwise to make each character of the string key 
aligned at the "12:00" direction and then by pressing the center button.

At the stage of rotating the ring to spell the key character key[i]:

You can rotate the ring clockwise or anticlockwise by one place, which counts as one step. 
The final purpose of the rotation is to align one of ring's characters at the "12:00" direction, where this character must equal key[i].
If the character key[i] has been aligned at the "12:00" direction, press the center button to spell, 
which also counts as one step. After the pressing, you could begin to spell the next character in the key (next stage). 
Otherwise, you have finished all the spelling.
 
Example 1:

Input: ring = "godding", key = "gd"
Output: 4
Explanation:
For the first key character 'g', since it is already in place, we just need 1 step to spell this character. 
For the second key character 'd', we need to rotate the ring "godding" anticlockwise by two steps to make it become "ddinggo".
Also, we need 1 more step for spelling.
So the final output is 4.
Example 2:
Input: ring = "godding", key = "godding"
Output: 13

Constraints:
1 <= ring.length, key.length <= 100
ring and key consist of only lower case English letters.
It is guaranteed that key could always be spelled by rotating ring.
 */

/**
 * 🛠️ Approach
We first convert the ring string into a character array for easier manipulation.
We create a list array p to store the positions of each character in the ring. Each index of p corresponds to a character in the alphabet, 
and the list at that index contains the positions of occurrences of that character in the ring.
We use memoization to optimize the recursion.
We define a recursive function helper to calculate the minimum number of steps needed to spell the keyword. 
The function takes the current index in the keyword in, the current position of the ring pos, the list array p, 
the keyword array k, the ring string r, and the memoization array memo.
If we have spelled all the characters in the keyword (in == k.length), we return 0.
If the result for the current state is already memoized, we return it.
Otherwise, we iterate through the positions of the current character in the ring and calculate the minimum steps 
needed to align the current character at the "12:00" direction.
We recursively call the helper function for the next character in the keyword and update the minimum steps accordingly.
We memoize the result for the current state and return it.
 */

var findRotateSteps = function(ring, key) {
    const positions = new Map();
    for (let i = 0; i < ring.length; i++) {
        if (!positions.has(ring[i])) {
            positions.set(ring[i], []);
        }
        positions.get(ring[i]).push(i);
    }
    const memo = new Array(key.length).fill(null).map(() => new Array(ring.length).fill(-1));
    return helper(0, 0, positions, key, ring, memo);
};

function helper(in_index, pos, positions, key, ring, memo) {
    if (in_index === key.length) {
        return 0;
    }
    if (memo[in_index][pos] !== -1) {
        return memo[in_index][pos];
    }
    let min_steps = Infinity;
    for (const i of positions.get(key[in_index])) {
        let steps;
        if (i >= pos) {
            steps = Math.min(i - pos, pos + ring.length - i);
        } else {
            steps = Math.min(pos - i, i + ring.length - pos);
        }
        const next_steps = helper(in_index + 1, i, positions, key, ring, memo);
        min_steps = Math.min(min_steps, steps + next_steps);
    }
    memo[in_index][pos] = min_steps + 1;
    return min_steps + 1;
}