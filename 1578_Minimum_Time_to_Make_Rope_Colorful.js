/**
 * 1578. Minimum Time to Make Rope Colorful
 * Difficulty: Medium
 * 
 * Alice has n balloons arranged on a rope. You are given a 0-indexed string colors where colors[i] is the color of the ith balloon.

Alice wants the rope to be colorful. She does not want two consecutive balloons to be of the same color, so she asks Bob for help. Bob can remove some balloons from the rope to make it colorful. You are given a 0-indexed integer array neededTime where neededTime[i] is the time (in seconds) that Bob needs to remove the ith balloon from the rope.

Return the minimum time Bob needs to make the rope colorful.

 

Example 1:


Input: colors = "abaac", neededTime = [1,2,3,4,5]
Output: 3
Explanation: In the above image, 'a' is blue, 'b' is red, and 'c' is green.
Bob can remove the blue balloon at index 2. This takes 3 seconds.
There are no longer two consecutive balloons of the same color. Total time = 3.
Example 2:


Input: colors = "abc", neededTime = [1,2,3]
Output: 0
Explanation: The rope is already colorful. Bob does not need to remove any balloons from the rope.
Example 3:


Input: colors = "aabaa", neededTime = [1,2,3,4,1]
Output: 2
Explanation: Bob will remove the balloons at indices 0 and 4. Each balloons takes 1 second to remove.
There are no longer two consecutive balloons of the same color. Total time = 1 + 1 = 2.
 

Constraints:

n == colors.length == neededTime.length
1 <= n <= 105
1 <= neededTime[i] <= 104
colors contains only lowercase English letters.
 */

/**
 * We group the balloons on the rope by their colors. Note that there are contiguous balloons of the same color. When we have a contiguous group, we can only keep one balloon from that group and remove the rest.

The minimum removal time for that group is the sum of the removal times of all balloons in the group minus the maximum removal time in the group. This yields the minimum cost for that group.

image.png

Why is it not optimal to delete all balloons in a group?
Imagine we remove a whole group group and end up with a total removal time t .

Now suppose that we keep one balloon from group , the string is still colorful and we end up with a smaller removal time t 
′
  (t 
′
 <t), since we remove one less balloon this time:

image.png

Therefore, we just keep exactly one balloon from each group.

Which balloon should we keep from each group?
We should always keep the balloon with the largest removal time, and remove the others. That leads to the minimum removal time for the group.

image.png

The most intuitive method is to calculate the removal time of each group of balloons separately, we can use a two-pointer method to locate each group.

Algorithm
Initalize totalTime=0 , left=0, and right=0.
Iterate over balloons, for each group of balloons, we record the total removal time as currTotal and the maximum removal time as currMax .
While the balloon indexed at right has the same color as the balloon indexed at left , we update currTotal and currMax, and increment right by 1.
Otherwise, it means that we have finished iterating this group, we should add the removal time for this group currTotal−currMax to totalTime , and reset left as right .
Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
var minCost = function(colors, neededTime) {
     let totalTime = 0;
    let i = 0, j = 0;

    while (i < neededTime.length && j < neededTime.length) {
        let currTotal = 0, currMax = 0;

        while (j < neededTime.length && colors[i] === colors[j]) {
            currTotal += neededTime[j];
            currMax = Math.max(currMax, neededTime[j]);
            j++;
        }

        totalTime += currTotal - currMax;
        i = j;
    }

    return totalTime;
};