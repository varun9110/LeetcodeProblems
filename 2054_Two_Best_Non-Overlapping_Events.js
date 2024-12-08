/**
 * 2054. Two Best Non-Overlapping Events
 * Difficulty: Medium
 * 
 * You are given a 0-indexed 2D integer array of events where events[i] = [startTimei, endTimei, valuei]. 
 * The ith event starts at startTimei and ends at endTimei, and if you attend this event, you will receive a value of valuei.
 *  You can choose at most two non-overlapping events to attend such that the sum of their values is maximized.

Return this maximum sum.

Note that the start time and end time is inclusive: that is, you cannot attend two events where one of them starts and the other ends at the same time. 
More specifically, if you attend an event with end time t, the next event must start at or after t + 1.

Example 1:
Input: events = [[1,3,2],[4,5,2],[2,4,3]]
Output: 4
Explanation: Choose the green events, 0 and 1 for a sum of 2 + 2 = 4.
Example 2:
Example 1 Diagram
Input: events = [[1,3,2],[4,5,2],[1,5,5]]
Output: 5
Explanation: Choose event 2 for a sum of 5.
Example 3:
Input: events = [[1,5,3],[1,5,1],[6,6,5]]
Output: 8
Explanation: Choose events 0 and 2 for a sum of 3 + 5 = 8.

Constraints:
2 <= events.length <= 105
events[i].length == 3
1 <= startTimei <= endTimei <= 109
1 <= valuei <= 106
 */

/**
 * Intuition 💡
The problem asks us to select at most two non-overlapping events such that the sum of their values is maximized. The key challenge is ensuring that the two selected events do not overlap. We need an approach that allows us to efficiently find the best combination of two events.

Thought Process 🧠:
Event Structure: Each event is represented by three values: the start time, the end time, and the value. The goal is to choose two events where one starts strictly after the other ends. The more valuable the event, the better, so we want to maximize the sum of their values.

Sorting by Start Time 📅: One of the first things we can do to organize the events is to sort them by their start time. This makes it easier to look ahead at events that may be a valid candidate for pairing.

Avoid Redundancy with a Suffix Array 🔄: Instead of searching for the best second event for every single event, we can create a suffix array that stores the maximum possible value for non-overlapping events that occur after a given event. This allows us to quickly get the best possible event for pairing, saving us from redundant checks.

Efficient Searching with Binary Search 🔍: After sorting the events, we can use binary search to find the next valid event that starts after the current event ends. This ensures that we can efficiently check for valid pairs without having to iterate over all subsequent events.

Approach 🔧
1. Sort Events by Start Time 📊
The first step is to sort the events based on their start time. This way, we process each event in chronological order, making it easy to find the subsequent event that starts after the current event ends. Sorting ensures that we can quickly identify events that may or may not overlap with the current one.

2. Create a Suffix Array 🗂
We create a suffix array to keep track of the maximum possible value of non-overlapping events from the current event to the last event. The idea behind the suffix array is simple:

Start by initializing the last event’s value as the maximum value.
Then, working backwards through the list of events, update the suffix array with the highest event value encountered so far.
This array allows us to quickly access the best possible future event without needing to repeatedly check all future events.
3. Binary Search for Non-overlapping Events 🔍
For each event, we need to find the first event that starts after the current event ends. Since the events are sorted by start time, we can use binary search to efficiently find this next valid event. If no such event exists, we just move on to the next one. If a valid event is found, we can easily retrieve its value from the suffix array and calculate the total value.

4. Maximize the Total Value 💸
For each event:

First, we check if attending only this event yields a higher value than the current maximum sum.
Then, if a valid second event is found (using the binary search), we calculate the sum of the current event’s value and the best possible future event value (from the suffix array).
We update the maximum sum accordingly, ensuring that we track the best combination of non-overlapping events.
Complexity 📈
Time Complexity ⏱️:

Sorting the events by their start time takes (O(n \log n)).
For each event, binary search is used to find the next event that starts after the current event ends, which takes (O(\log n)).
Therefore, the overall time complexity is (O(n \log n)), where (n) is the number of events.
Space Complexity 📦:

We use an array of size (n) to store the suffix maximum values. This space is necessary to store the maximum values of non-overlapping events starting from each index.
Therefore, the space complexity is (O(n)).
 */

/**
 * @param {number[][]} events
 * @return {number}
 */
var maxTwoEvents = function(events) {
    const n = events.length;
    
    // Step 1: Sort the events by their start time
    events.sort((a, b) => a[0] - b[0]);
    
    // Step 2: Create the suffix array for the maximum event value from each event onward
    let suffixMax = new Array(n);
    suffixMax[n - 1] = events[n - 1][2];  // Initialize the last event's value
    
    // Populate the suffixMax array
    for (let i = n - 2; i >= 0; i--) {
        suffixMax[i] = Math.max(events[i][2], suffixMax[i + 1]);
    }
    
    // Step 3: For each event, find the next event that starts after it ends
    let maxSum = 0;
    
    for (let i = 0; i < n; i++) {
        let left = i + 1, right = n - 1;
        let nextEventIndex = -1;
        
        // Perform binary search to find the next non-overlapping event
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (events[mid][0] > events[i][1]) {
                nextEventIndex = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        // If a valid next event is found, update the max sum
        if (nextEventIndex !== -1) {
            maxSum = Math.max(maxSum, events[i][2] + suffixMax[nextEventIndex]);
        }
        
        // Also consider the case where we take only the current event
        maxSum = Math.max(maxSum, events[i][2]);
    }
    
    return maxSum;
};