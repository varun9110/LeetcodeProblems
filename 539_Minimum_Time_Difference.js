/**
 * 539. Minimum Time Difference
 * Difficulty: Medium
 * 
 * Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.
 

Example 1:

Input: timePoints = ["23:59","00:00"]
Output: 1
Example 2:

Input: timePoints = ["00:00","23:59","00:00"]
Output: 0
 

Constraints:

2 <= timePoints.length <= 2 * 104
timePoints[i] is in the format "HH:MM".
 */

/**
 * Intuition
The problem is to find the minimum difference between any two time points in a list of times given in "HH:MM" format. To solve this problem, you need to consider that the times wrap around from "23:59" to "00:00" (effectively forming a circular timeline).

Approach
Convert Time to Minutes:
Convert each time point from "HH:MM" format to the number of minutes since midnight. This simplifies the comparison of time differences to just integer subtraction.

Sort the Time Points:
After converting times to minutes, sort these minutes. The reason for sorting is that the minimum difference between any two times in a circular timeline will be between adjacent elements in the sorted list.

Calculate Differences:
Compute the difference between each pair of adjacent elements in the sorted list. This step finds the minimum difference between consecutive times.

Consider Circular Nature:
Since the times are on a 24-hour circular clock, you must also consider the difference between the last time and the first time (after wrapping around midnight).

Return Minimum Difference:
The result is the smallest difference found among adjacent pairs and the circular wrap-around difference.

Step By Step Explanation
Example: Time Points
Let's use the time points ["23:59", "00:00", "12:34"] as an example to explain the solution.

1. Convert Time to Minutes
First, convert each time point to the total number of minutes since midnight.

Time Point	Hours (H)	Minutes (M)	Total Minutes (H * 60 + M)
23:59	23	59	23 * 60 + 59 = 1439
00:00	0	0	0 * 60 + 0 = 0
12:34	12	34	12 * 60 + 34 = 754
So, the minutes array will be [1439, 0, 754].

2. Sort the Minutes
Sort the minutes array in ascending order:

Sorted Minutes
0
754
1439
3. Calculate Differences Between Adjacent Elements
Compute the difference between each pair of adjacent times in the sorted list:

Pair	Difference (Next - Current)
(0, 754)	754 - 0 = 754
(754, 1439)	1439 - 754 = 685
4. Consider the Circular Difference
Calculate the circular difference between the last and first element:

Circular Difference Calculation
24 * 60 - Last + First
1440 - 1439 + 0 = 1
Here’s how this is calculated:

Total minutes in a day = 1440
Circular difference = 1440 - 1439 + 0 = 1
5. Find the Minimum Difference
The minimum difference is the smallest value among the differences calculated:

Differences
754 (between 0 and 754)
685 (between 754 and 1439)
1 (circular difference)
So, the minimum difference is 1.

Complexity
Time Complexity:

Conversion to Minutes: O(n) where n is the number of time points. Each time point is processed once to convert it to minutes.
Sorting: O(n log n). Sorting the list of time points in minutes.
Finding Minimum Difference: O(n). After sorting, you need to find the minimum difference by checking adjacent elements in the sorted list and the circular wrap-around difference.
Overall, the time complexity is dominated by the sorting step, which is O(n log n).

Space Complexity:

Storage for Minutes: O(n). Storing the converted minutes in an array.
Other Variables: Constant space for variables used in computation.
Overall, the space complexity is O(n) due to the array used to store the minutes.
 */

/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function(timePoints) {
    // Convert times to minutes
    let minutes = timePoints.map(time => {
        let [h, m] = time.split(':').map(Number);
        return h * 60 + m;
    });

    // Sort times in ascending order
    minutes.sort((a, b) => a - b);

    // Find minimum difference across adjacent elements
    let minDiff = Infinity;
    for (let i = 0; i < minutes.length - 1; i++) {
        minDiff = Math.min(minDiff, minutes[i + 1] - minutes[i]);
    }

    // Consider the circular difference between last and first element
    minDiff = Math.min(minDiff, 24 * 60 - minutes[minutes.length - 1] + minutes[0]);

    return minDiff;
};