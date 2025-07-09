/**
 * 3439. Reschedule Meetings for Maximum Free Time I
 * Difficulty: Medium
 * 
 * You are given an integer eventTime denoting the duration of an event, where the event occurs from time t = 0 to time t = eventTime.

You are also given two integer arrays startTime and endTime, each of length n. These represent the start and end time of n non-overlapping meetings, where the ith meeting occurs during the time [startTime[i], endTime[i]].

You can reschedule at most k meetings by moving their start time while maintaining the same duration, to maximize the longest continuous period of free time during the event.

The relative order of all the meetings should stay the same and they should remain non-overlapping.

Return the maximum amount of free time possible after rearranging the meetings.

Note that the meetings can not be rescheduled to a time outside the event.

 

Example 1:

Input: eventTime = 5, k = 1, startTime = [1,3], endTime = [2,5]

Output: 2

Explanation:



Reschedule the meeting at [1, 2] to [2, 3], leaving no meetings during the time [0, 2].

Example 2:

Input: eventTime = 10, k = 1, startTime = [0,2,9], endTime = [1,4,10]

Output: 6

Explanation:



Reschedule the meeting at [2, 4] to [1, 3], leaving no meetings during the time [3, 9].

Example 3:

Input: eventTime = 5, k = 2, startTime = [0,1,2,3,4], endTime = [1,2,3,4,5]

Output: 0

Explanation:

There is no time during the event not occupied by meetings.

 

Constraints:

1 <= eventTime <= 109
n == startTime.length == endTime.length
2 <= n <= 105
1 <= k <= n
0 <= startTime[i] < endTime[i] <= eventTime
endTime[i] <= startTime[i + 1] where i lies in the range [0, n - 2].
 */

/**
 * How to solve:

Prefix sum to quickly compute the duration of k meetings
Window logic to define allowable slots for shifting
Greedy maximization of the free interval:
max free= 
i
max
​
 (next start−previous end− 
durations
∑
​
 )
​
 
This yields the optimal free time achievable under all given constraints.

STEP BY STEP:

Compute Prefix Occupied Time:

Let d 
i
​
 =endTime[i]−startTime[i] be the duration of meeting i.

Define a prefix sum:

prefixSum[i+1]= 
j=0
∑
i
​
 d 
j
​
 
​
 
This allows fast access to total occupied time within any subarray of meetings:

occupied 
[a,b]
​
 =prefixSum[b+1]−prefixSum[a]
​
 
Sliding Window Over Meetings:

We want to reschedule k consecutive meetings in such a way that the gap between their enclosing times is maximized.

For each possible window of size k:

• Index range: i−k+1 to i
• Total duration moved:

occupied=prefixSum[i+1]−prefixSum[i−k+1]
​
 
• Available window bounds:

Left:
windowStart={ 
0
endTime[i−k]
​
  
if i=k−1
otherwise
​
 
Right:
windowEnd={ 
eventTime
startTime[i+1]
​
  
if i=n−1
otherwise
​
 
• Total window size:

windowSize=windowEnd−windowStart
​
 
• Free time gained in this configuration:

freeTime=windowSize−occupied
​
 
• Update maximum over all such windows.

• Finally, maximum free time is:

max(windowEnd 
i
​
 −windowStart 
i
​
 −occupied 
i
​
 )over all i∈[k−1,n−1]
​
 
Time Complexity: O(n)
Space Complexity: O(n)
 */



/**
 * @param {number} eventTime
 * @param {number} k
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @return {number}
 */
var maxFreeTime = function(eventTime, k, startTime, endTime) {
    let max = 0;
    const count = startTime.length;
    const prefixSum = new Array(count + 1).fill(0);

    for (let i = 0; i < count; i++) {
        prefixSum[i + 1] = prefixSum[i] + endTime[i] - startTime[i];
    }

    for (let i = k - 1; i < count; i++) {
        const occupied = prefixSum[i + 1] - prefixSum[i - k + 1];
        const windowEnd = (i === count - 1) ? eventTime : startTime[i + 1];
        const windowStart = (i === k - 1) ? 0 : endTime[i - k];
        max = Math.max(max, windowEnd - windowStart - occupied);
    }

    return max;
};