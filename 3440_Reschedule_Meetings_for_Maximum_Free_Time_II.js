/**
 * 3440. Reschedule Meetings for Maximum Free Time II
 * Difficulty: Medium
 * 
 * You are given an integer eventTime denoting the duration of an event. You are also given two integer arrays startTime and endTime, each of length n.

These represent the start and end times of n non-overlapping meetings that occur during the event between time t = 0 and time t = eventTime, where the ith meeting occurs during the time [startTime[i], endTime[i]].

You can reschedule at most one meeting by moving its start time while maintaining the same duration, such that the meetings remain non-overlapping, to maximize the longest continuous period of free time during the event.

Return the maximum amount of free time possible after rearranging the meetings.

Note that the meetings can not be rescheduled to a time outside the event and they should remain non-overlapping.

Note: In this version, it is valid for the relative ordering of the meetings to change after rescheduling one meeting.

 

Example 1:

Input: eventTime = 5, startTime = [1,3], endTime = [2,5]

Output: 2

Explanation:



Reschedule the meeting at [1, 2] to [2, 3], leaving no meetings during the time [0, 2].

Example 2:

Input: eventTime = 10, startTime = [0,7,9], endTime = [1,8,10]

Output: 7

Explanation:
Reschedule the meeting at [0, 1] to [8, 9], leaving no meetings during the time [0, 7].

Example 3:
Input: eventTime = 10, startTime = [0,3,7,9], endTime = [1,4,8,10]
Output: 6
Explanation:

Reschedule the meeting at [3, 4] to [8, 9], leaving no meetings during the time [1, 7].
Example 4:
Input: eventTime = 5, startTime = [0,1,2,3,4], endTime = [1,2,3,4,5]
Output: 0
Explanation:
There is no time during the event not occupied by meetings.

Constraints:
1 <= eventTime <= 109
n == startTime.length == endTime.length
2 <= n <= 105
0 <= startTime[i] < endTime[i] <= eventTime
endTime[i] <= startTime[i + 1] where i lies in the range [0, n - 2].
 */

/**
 * Quick recap:

given:

eventTime - denotes the interval [0,eventTime],
startTime[i] and endTime[i] representing n non-overlapping meetings,
we're allowed to reschedule at most one meeting (change its start time, but keep duration fixed) to maximize the longest continuous free time.

constraints:

meetings must remain non-overlapping.
only one meeting can be moved.
the relative order may change after moving one meeting.
assume:

d 
i
​
 =endTime[i]−startTime[i] be the duration of meeting i.
Let the meetings form time gaps between them. Define:
gap 
i
​
 = 
⎩
⎨
⎧
​
  
startTime[0]−0
startTime[i]−endTime[i−1]
eventTime−endTime[n−1]
​
  
i=0
1≤i<n
i=n
​
 
How to solve:

this approach uses prefix and suffix gap tracking to determine where a single meeting can be placed for maximum free space.

since only one move is allowed and that meetings may be reordered as long as they remain non-overlapping and within the global time window.

maxFreeTime= 
i
max
​
 (gap 
i−1
​
 +d 
i
​
 +gap 
i
​
 )
​
 
where d 
i
​
  can be inserted into either the left or right gap.

Concept:

We attempt to move each individual meeting into either:

A left-side gap: gap before the meeting
A right-side gap: gap after the meeting
Check whether the gap is large enough to fit the duration of that meeting.

If so, the maximum possible free time created is:

the original gap on one side
the inserted meeting (that fills a gap)
the gap on the other side
Resulting free interval:

gap 
i−1
​
 +d 
i
​
 +gap 
i

We keep track of:

The maximum left gap up to current position
The maximum right gap from future positions
Update the maximum free time accordingly.

STEP BY STEP:

Construct all gap 
i
​
 ∈[0,n]
Precompute maximum suffix gaps:
maxRight[i]=max(gap 
i+1
​
 ,…,gap 
n
​
 )
Iterate over meetings:
If the duration fits in the left or right adjacent gap, simulate the movement:
newFreeTime=gap 
i−1
​
 +d 
i
​
 +gap 
i
​ 
Also, compare with free space if no move is performed:
newFreeTime=gap 
i−1
​
 +gap 
i
​
 
Track the maximum value obtained.
For each meeting i:

IF:
THEN:
ALWAYS:

  
d 
i
​ 
res
res

≤max(maxLeft,maxRight[i])
=max(res,gap 
i−1
​
 +d 
i
​
 +gap 
i
​
 )
=max(res,gap 
i−1
​
 +gap 
i
​
 )​
 
Time Complexity: O(n)
Space Complexity: O(n)
 */

/**
 * @param {number} eventTime
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @return {number}
 */
var maxFreeTime = function(eventTime, startTime, endTime) {
    const len = startTime.length;
    const gaps = new Array(len + 1);
    let lastEnd = 0;

    startTime.forEach((s, i) => {
        gaps[i] = s - lastEnd;
        lastEnd = endTime[i];
    });

    gaps[len] = eventTime - lastEnd;

    const rightMax = new Array(len + 1).fill(0);
    rightMax.reduceRight((a, val, i) => {
        if (i < len) rightMax[i] = Math.max(rightMax[i + 1], gaps[i + 1]);
        return a;
    }, 0);

    let leftMax = 0;
    let maxGap = 0;

    startTime.map((s, i) => i + 1).forEach(i => {
        const dur = endTime[i - 1] - startTime[i - 1];
        const gapL = gaps[i - 1];
        const gapR = gaps[i];

        if (leftMax >= dur || rightMax[i] >= dur)
            maxGap = Math.max(maxGap, gapL + dur + gapR);

        maxGap = Math.max(maxGap, gapL + gapR);
        leftMax = Math.max(leftMax, gapL);
    });

    return maxGap;
};