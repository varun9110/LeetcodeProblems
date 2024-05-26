/**
 * 552. Student Attendance Record II
 * Difficulty: Hard
 * 
 * An attendance record for a student can be represented as a string where each character signifies whether the student was absent, 
 * late, or present on that day. The record only contains the following three characters:

'A': Absent.
'L': Late.
'P': Present.
Any student is eligible for an attendance award if they meet both of the following criteria:

The student was absent ('A') for strictly fewer than 2 days total.
The student was never late ('L') for 3 or more consecutive days.
Given an integer n, return the number of possible attendance records of length n that make a student eligible for an attendance award. 
The answer may be very large, so return it modulo 109 + 7.

Example 1:
Input: n = 2
Output: 8
Explanation: There are 8 records with length 2 that are eligible for an award:
"PP", "AP", "PA", "LP", "PL", "AL", "LA", "LL"
Only "AA" is not eligible because there are 2 absences (there need to be fewer than 2).
Example 2:
Input: n = 1
Output: 3
Example 3:
Input: n = 10101
Output: 183236316

Constraints:

1 <= n <= 105
 */

/**
 * Approach 1: Recursion with memoization
🤔 Intuition
Okay, so first thing that come up in my mind is just recursion and this approach is quite simple.

We will start from the empty string and each time we will choose which character to add.
We don't want to pass the string into the function because all we interested in is just how many consecutive "L" we have so far and how many "A" already in the string.
We want to call recursion with this rules
If we reached the end of the string we want to return result (this string is eligable because of steps I describe below)
On every recursion we will call recursion with every of three characters but only if this string will be eligable after we add this new character (So, if there's already 1 "A" we can't add another of if there's already 2 consecutive "L" we can't add another)
We will find the sum of all callings and return it
This is sufficient to write code for this approach but there's some interesting things I want to mention:
Recursion without memoization will give TLE because we recalculate many states wich we've seen already. As was said every state is defined only by 3 parameters: cur_ind, count_a, count_l
I have no idea why but temp[cur_ind][count_a][count_l] is much faster than temp[cur_ind][count_l][count_a].
If you don't take the mod on this step: total: int = (with_a_next + with_l_next + with_p_next) % MOD you will get MLE error.
💻 Coding
Let's code this up and move to the next approach

Define variables temp for memoization and MOD=10**9 + 7.
Define recursive function with this rules:
If we've reached the end of the string then return 1 (we've found new eligable string)
If another case check whether we've already seen this state. If True then just return it and if False calculate with recursion every possible state from this, sum them up, write in memoization and return result
From every total we want to get modulo by MOD and only then memo result.
📒 Complexity
⏰ Time complexity: O(n), due to memoization we will have only 2 * 3 * n unique states which is O(n)
🧺 Space complexity: O(n) we use O(n) for recursion stack and O(2 * 3 * n) for memoization so O(7n) in total or just O(n)

 */

var checkRecord = function(n) {
    const MOD = 1000000007;

    // Initialize the memoization array
    let temp = new Array(n).fill(0).map(() => 
        new Array(2).fill(0).map(() => 
            new Array(3).fill(-1)
        )
    );

    const check_all_records = (cur_ind, count_a, count_l) => {
        if (cur_ind === n) {
            return 1;
        }
        if (temp[cur_ind][count_a][count_l] !== -1) {
            return temp[cur_ind][count_a][count_l];
        }
        let with_a_next = (count_a === 0) ? check_all_records(cur_ind + 1, count_a + 1, 0) : 0;
        let with_l_next = (count_l === 2) ? 0 : check_all_records(cur_ind + 1, count_a, count_l + 1);
        let with_p_next = check_all_records(cur_ind + 1, count_a, 0);
        let total = ((with_a_next + with_l_next) % MOD + with_p_next) % MOD;

        temp[cur_ind][count_a][count_l] = total;
        return total;
    };

    return check_all_records(0, 0, 0);
};


/**
 * Approach 2: Space-optimized DP
🤔 Intuition
After my recursive solution was accepted I thinked about whether there's more optimized approach and here is is - Dynamic Programming (DP)

As was said every state is defined only by count_a, count_l and cur_ind.
But what we can see that for cur_ind we always check in memo for cur_ind - 1 so on step when we calculated all states for cur_ind=3 we don't care about others cur_ind which are lower.
So let's say we have step with cur_ind=n how we will calculate states for it knowing all states for cur_ind=n-1?
We want to iterate trough every legal combination from cur_ind=n-1 of count_a and count_l so (0, 0), (0, 1), (0, 2) and (1, 0), (1, 1), (1, 2) and for every this state we want to try to add "A", "P" and "L" if this possible and add this result to the state with cur_ind=n
On every adding we want to add modulo by MOD to avoid MLE (described above)
On every iteration we copy current state to previous and reset it
After we calculated dp n times our result is stored in dp_last so we just need to sum up every possible state and return the result
💻 Coding
We can use some piece of code from the recursive solution so this will be fast

Initialize 2d dp_last with size 2x3 and 2d dp_current with size 2x3.
initialize base case (empty string which contain 0 "A" and 0 "L")
Write loops as described above
Always add to the result adding "P" (we always can add it)
Add "A" only if previous state have 0 "A"
Add "L" only if previous state have 0 or 1 consecutive "L"
Sum up eligable strings from states and return result
📒 Complexity
⏰ Time complexity: O(n), due to the fact that we have 2 * 3 * n iterations.
🧺 Space complexity: O(1) since we have only two arrays of constant size 2x3
 */

var checkRecord = function(n) {
    const MOD = 1000000007;

    // Initialize dp arrays
    let dp_last = Array.from({ length: 2 }, () => Array(3).fill(0)); // previous state
    let dp_current = Array.from({ length: 2 }, () => Array(3).fill(0)); // current state

    dp_last[0][0] = 1; // empty string

    for (let i = 0; i < n; i++) {
        for (let count_a = 0; count_a < 2; count_a++) {
            for (let count_l = 0; count_l < 3; count_l++) {
                // choose "P"
                dp_current[count_a][0] = (dp_current[count_a][0] + dp_last[count_a][count_l]) % MOD;
                // choose "A"
                if (count_a === 0) {
                    dp_current[count_a + 1][0] = (dp_current[count_a + 1][0] + dp_last[count_a][count_l]) % MOD;
                }
                // Choose "L"
                if (count_l < 2) {
                    dp_current[count_a][count_l + 1] = (dp_current[count_a][count_l + 1] + dp_last[count_a][count_l]) % MOD;
                }
            }
        }
        dp_last = dp_current; // Reference current to previous
        dp_current = Array.from({ length: 2 }, () => Array(3).fill(0)); // make new current
    }

    // Sum up the counts for all combinations of length 'n' with different count_a and count_l.
    let res = 0;
    for (let count_a = 0; count_a < 2; count_a++) {
        for (let count_l = 0; count_l < 3; count_l++) {
            res = (res + dp_last[count_a][count_l]) % MOD;
        }
    }
    return res;
};