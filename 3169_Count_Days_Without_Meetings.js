/**
 * 3169. Count Days Without Meetings
 * Difficulty: Medium
 * 
 * You are given a positive integer days representing the total number of days an employee is available for work (starting from day 1). 
 * You are also given a 2D array meetings of size n where, meetings[i] = [start_i, end_i] represents the starting and ending days of meeting i (inclusive).

Return the count of days when the employee is available for work but no meetings are scheduled.
Note: The meetings may overlap.

Example 1:
Input: days = 10, meetings = [[5,7],[1,3],[9,10]]
Output: 2
Explanation:
There is no meeting scheduled on the 4th and 8th days.
Example 2:
Input: days = 5, meetings = [[2,4],[1,3]]
Output: 1
Explanation:
There is no meeting scheduled on the 5th day.
Example 3:
Input: days = 6, meetings = [[1,6]]
Output: 0
Explanation:
Meetings are scheduled for all working days.

Constraints:
1 <= days <= 109
1 <= meetings.length <= 105
meetings[i].length == 2
1 <= meetings[i][0] <= meetings[i][1] <= days
 */

/**
 * Intuition
The key insight is that we need to count days that have no meetings scheduled. Instead of tracking available days directly, it's easier to track days that have meetings and then subtract from the total.

Approach
Sort the meetings by start day to process them in chronological order
Merge overlapping meetings to avoid counting the same day multiple times
For each merged interval, count the days it covers
Subtract the total meeting days from the total available days
Complexity
Time complexity: O(n log n)

Space complexity: O(n)
 */

/**
 * @param {number} days
 * @param {number[][]} meetings
 * @return {number}
 */
var countDays = function(days, meetings) {
    meetings.sort((a, b) => a[0] - b[0]);

    let mergedMeetings = [];
    for (let meeting of meetings) {
        if (mergedMeetings.length === 0 || meeting[0] > mergedMeetings[mergedMeetings.length - 1][1]) {
            mergedMeetings.push(meeting);
        } else {
            mergedMeetings[mergedMeetings.length - 1][1] = Math.max(mergedMeetings[mergedMeetings.length - 1][1], meeting[1]);
        }
    }

    let meetingDaysCount = 0;
    for (let [start, end] of mergedMeetings) {
        meetingDaysCount += (end - start + 1);
    }

    return days - meetingDaysCount;
};