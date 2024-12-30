/**
 * 2466. Count Ways To Build Good Strings
 * Difficulty: Medium
 * 
 * Given the integers zero, one, low, and high, we can construct a string by starting with an empty string, 
 * and then at each step perform either of the following:

Append the character '0' zero times.
Append the character '1' one times.
This can be performed any number of times.

A good string is a string constructed by the above process having a length between low and high (inclusive).

Return the number of different good strings that can be constructed satisfying these properties. Since the answer can be large, return it modulo 109 + 7.

 

Example 1:

Input: low = 3, high = 3, zero = 1, one = 1
Output: 8
Explanation: 
One possible valid good string is "011". 
It can be constructed as follows: "" -> "0" -> "01" -> "011". 
All binary strings from "000" to "111" are good strings in this example.
Example 2:

Input: low = 2, high = 3, zero = 1, one = 2
Output: 5
Explanation: The good strings are "00", "11", "000", "110", and "011".
 

Constraints:

1 <= low <= high <= 105
1 <= zero, one <= low
 */

/**
 * Intuition: Building a Staircase Analogy
Imagine you're standing at the base of a staircase. The goal is to climb up to a specific height (length of a string), but each step you take can either be:

Adding a '1', which increases your height by one step.
Skipping the current step (i.e., appending zero '0's), which doesn't change your height.
Each time you step, you can either add a '1' (climb one step) or stay at the same height (by adding '0's). 
You are interested in counting how many ways you can reach a height between low and high, where the height corresponds to the length of the string.

For example, if low = 3 and high = 3, you're only interested in counting how many ways you can form strings of length 3, 
starting with an empty string and using these two operations (adding a '1' or staying at the same height).

🛠 Approach: Dynamic Programming with Iteration
To solve this problem, we use a dynamic programming (DP) approach, which helps us efficiently count the number of ways to reach each string length. 
Here's how we can break it down step-by-step:

1. Problem Setup:
We are given:

zero: the number of '0's that we can append to the string at each step (which results in no increase in length).
one: the number of '1's we can append to the string at each step (which increases the length by 1).
low and high: the range of lengths we are interested in.
2. Dynamic Programming Table Setup:
We create a vector ways[] to store the number of ways to construct strings of each length from 0 to high. Initially, ways[0] = 1, 
because there is exactly one way to construct a string of length 0 — the empty string.

3. State Transition:
Now, for every valid length i (where ways[i] > 0), we try to extend the string to two possible lengths:

Appending '0' zero times: This means you stay at the same length. If you are at length i, you can also reach i + zero (if i + zero is within bounds).
Appending '1' one time: This increases your length by 1. If you are at length i, you can go to length i + one (if i + one is within bounds).
For each valid length i, if ways[i] > 0, we:

Add ways[i] to ways[i + zero] (if i + zero <= high).
Add ways[i] to ways[i + one] (if i + one <= high).
4. Final Count:
After filling out the ways[] vector, we sum the values from ways[low] to ways[high]. This gives the total number of valid strings that can be formed with 
lengths in the range [low, high].

5. Modulo Operation:
Since the result can be large, we use modulo (10^9 + 7) to prevent overflow and ensure the result is within the required bounds.

📊 Complexity Analysis
Time complexity: (O(high))

We loop through every length from 0 to high, and for each length, we update the next possible lengths based on the operations. 
Thus, the time complexity is linear in terms of high.
Space complexity: (O(\text{high}))

We only need to store the ways[] vector, which has a size of high + 1 (to account for all possible lengths from 0 to high).
 */

/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
var countGoodStrings = function(low, high, zero, one) {
    const MOD = 1e9 + 7;
    let ways = new Array(high + 1).fill(0);
    ways[0] = 1;

    for (let length = 0; length <= high; length++) {
        if (ways[length] === 0) continue;
        if (length + zero <= high) {
            ways[length + zero] = (ways[length + zero] + ways[length]) % MOD;
        }
        if (length + one <= high) {
            ways[length + one] = (ways[length + one] + ways[length]) % MOD;
        }
    }

    let count = 0;
    for (let i = low; i <= high; i++) {
        count = (count + ways[i]) % MOD;
    }

    return count;
};