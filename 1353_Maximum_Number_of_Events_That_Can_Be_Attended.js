/**
 * 1353. Maximum Number of Events That Can Be Attended
 * Difficulty: Medium
 * 
 * You are given an array of events where events[i] = [startDayi, endDayi]. Every event i starts at startDayi and ends at endDayi.
You can attend an event i at any day d where startTimei <= d <= endTimei. You can only attend one event at any time d.
Return the maximum number of events you can attend.

Example 1:
Input: events = [[1,2],[2,3],[3,4]]
Output: 3
Explanation: You can attend all the three events.
One way to attend them all is as shown.
Attend the first event on day 1.
Attend the second event on day 2.
Attend the third event on day 3.
Example 2:

Input: events= [[1,2],[2,3],[3,4],[1,2]]
Output: 4

Constraints:
1 <= events.length <= 105
events[i].length == 2
1 <= startDayi <= endDayi <= 105
 */

/**
 * HOW TO SOLVE:
Approach: Greedy + Union-Find (Disjoint Set)
The solution uses a greedy strategy combined with a Disjoint Set (Union-Find) to track the next available day efficiently.

Step-by-Step Explanation
Sort Events by End Day

Arrays.sort(events, (a, b) -> a[1] - b[1]);
Prioritize events that end earlier to keep future days available for later events.
Initialize Disjoint Set

int[] nextDay = new int[maxEnd + 2];
for (int d = 0; d < nextDay.length; d++) {
    nextDay[d] = d;
}
nextDay[d] keeps track of the next available day ≥ d.
Initialized so each day initially points to itself.
Union-Find Search Function

int search(int[] nextDay, int day) {
    if (nextDay[day] != day) {
        nextDay[day] = search(nextDay, nextDay[day]);
    }
    return nextDay[day];
}
Finds the next available day ≥ day.
Uses path compression for efficiency.
Attend Events Greedily

for (int[] evt : events) {
    int start = evt[0];
    int end = evt[1];
    int day = search(nextDay, start);
    if (day <= end) {
        count++;
        nextDay[day] = search(nextDay, day + 1);
    }
}
For each event, try to attend it on the earliest available day within its interval.
After attending on day d, mark day d as unavailable by linking it to the next day.
Return the Maximum Count

return count;
Time Complexity O(nlogn)
Space Complexity O(maxEnd)
 */

/**
 * @param {number[][]} events
 * @return {number}
 */
var maxEvents = function(events) {
    events.sort((a, b) => a[1] - b[1]);

    const maxDay = events.at(-1)[1];
    const nextDay = new Array(maxDay + 2).fill(0).map((_, i) => i);

    const search = day => {
        if (nextDay[day] !== day)
            nextDay[day] = search(nextDay[day]);
        return nextDay[day];
    };

    let count = 0;

    for (const evt of events) {
        const start = evt[0];
        const end = evt[1];
        const day = search(start);
        if (day <= end) {
            count++;
            nextDay[day] = search(day + 1);
        }
    }

    return count;
};