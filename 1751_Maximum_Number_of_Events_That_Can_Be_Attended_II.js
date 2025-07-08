/**
 * 1751. Maximum Number of Events That Can Be Attended II
 * Difficulty: Hard
 * 
 * You are given an array of events where events[i] = [startDayi, endDayi, valuei]. The ith event starts at startDayi and ends at endDayi, 
 * and if you attend this event, you will receive a value of valuei. You are also given an integer k which represents the maximum number of events you can attend.

You can only attend one event at a time. If you choose to attend an event, you must attend the entire event. Note that the end day is inclusive: 
that is, you cannot attend two events where one of them starts and the other ends on the same day.

Return the maximum sum of values that you can receive by attending events.

Example 1:
Input: events = [[1,2,4],[3,4,3],[2,3,1]], k = 2
Output: 7
Explanation: Choose the green events, 0 and 1 (0-indexed) for a total value of 4 + 3 = 7.
Example 2:
Input: events = [[1,2,4],[3,4,3],[2,3,10]], k = 2
Output: 10
Explanation: Choose event 2 for a total value of 10.
Notice that you cannot attend any other event as they overlap, and that you do not have to attend k events.
Example 3:
Input: events = [[1,1,1],[2,2,2],[3,3,3],[4,4,4]], k = 3
Output: 9
Explanation: Although the events do not overlap, you can only attend 3 events. Pick the highest valued three.
 
Constraints:
1 <= k <= events.length
1 <= k * events.length <= 106
1 <= startDayi <= endDayi <= 109
1 <= valuei <= 106
 */

/**
 * Approach: Dynamic Programming + Binary Search
This problem is solved using bottom-up dynamic programming with a binary search to efficiently find the next compatible event.

Step-by-Step Explanation
Handle k = 1 Separately

if (limit == 1) {
    int max = 0;
    for (int[] e : events) {
        max = Math.max(max, e[2]);
    }
    return max;
}
Special case: If only one event can be attended, return the maximum value among all events.
Sort Events by Start Time

Arrays.sort(events, (a, b) -> Integer.compare(a[0], b[0]));
Sorting ensures we can binary search for the next non-overlapping event.
Initialize DP Table

int[][] dp = new int[n + 1][k + 1];
dp[i][j] = max value attainable starting from event i, with j events attended so far.
dp has (n + 1) rows and (k + 1) columns, where n = events.length.
Iterate Backward Over Events

for (int i = n - 1; i >= 0; i--) { ... }
We build the DP table from the end toward the beginning to avoid dependency issues.
Binary Search for Next Non-Overlapping Event

int left = i + 1, right = n;
while (left < right) {
    int mid = (right - left) / 2 + left;
    if (events[mid][0] > events[i][1]) {
        right = mid;
    } else {
        left = mid + 1;
    }
}
int nxt = left;
Finds the index of the next event whose startDay > endDay of the current event i.
Ensures events do not overlap.
DP Transition

dp[i][j] = Math.max(
    dp[i + 1][j],                          // skip current event
    dp[nxt][j + 1] + events[i][2]          // attend current event
);
Option 1: skip current event → move to i + 1, same j.
Option 2: attend current event → jump to nxt, increment event count.
Return the Maximum Value

return dp[0][0];
The result is stored in dp[0][0]: starting from first event, with zero events attended.
Time Complexity O(nlogn)
Space Complexity O(nk)
 */

/**
 * @param {number[][]} events
 * @param {number} k
 * @return {number}
 */
var maxValue = function(events, k) {
    const len = events.length;
    const dp = Array.from({ length: len + 1 }, () => Array(k + 1).fill(0));

    if (k === 1) {
        let maxVal = 0;
        for (const [start, end, val] of events) {
            maxVal = Math.max(maxVal, val);
        }

        return maxVal;
    }

    events.sort((a, b) => a[0] - b[0]);

    for (let i = len - 1; i >= 0; i--) {
        let left = i + 1;
        let right = len;
        const endTime = events[i][1];
        while (left < right) {
            const mid = Math.floor((right - left) / 2) + left;
            if (events[mid][0] > endTime) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        const next = left;

        for (let j = k - 1; j >= 0; j--) {
            dp[i][j] = Math.max(
                dp[i + 1][j],
                dp[next][j + 1] + events[i][2]
            );
        }
    }

    return dp[0][0];
};