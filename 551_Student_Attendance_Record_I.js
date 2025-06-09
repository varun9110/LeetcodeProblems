/**
 * 551. Student Attendance Record I
 * Difficulty: Easy
 * 
 * You are given a string s representing an attendance record for a student where each character signifies whether the student was absent, late, or present on that day. 
 * The record only contains the following three characters:

'A': Absent.
'L': Late.
'P': Present.
The student is eligible for an attendance award if they meet both of the following criteria:

The student was absent ('A') for strictly fewer than 2 days total.
The student was never late ('L') for 3 or more consecutive days.
Return true if the student is eligible for an attendance award, or false otherwise.

Example 1:
Input: s = "PPALLP"
Output: true
Explanation: The student has fewer than 2 absences and was never late 3 or more consecutive days.
Example 2:

Input: s = "PPALLL"
Output: false
Explanation: The student was late 3 consecutive days in the last 3 days, so is not eligible for the award.

Constraints:
1 <= s.length <= 1000
s[i] is either 'A', 'L', or 'P'.
 */

/**
 * Intuition
To determine if a student's record is eligible for a reward, we just check two rules:

No more than 1 'A' (Absent).
No 3 or more consecutive 'L' (Late).
Approach
image.png

Use two counters:
One to count total 'A'.
One to track streak of 'L'.
Reset L streak if character is not 'L'.
If 'A' ≥ 2 or L streak ≥ 3, return false.
Otherwise, return true.
Complexity
Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var checkRecord = function(s) {
    let aCount = 0, lStreak = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === 'A') {
            aCount++;
            if (aCount >= 2) return false;
        }

        if (c === 'L') {
            lStreak++;
            if (lStreak >= 3) return false;
        } else {
            lStreak = 0;
        }
    }
    return true;
};