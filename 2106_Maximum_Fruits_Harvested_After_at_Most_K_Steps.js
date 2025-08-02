/**
 * 2106. Maximum Fruits Harvested After at Most K Steps
 * Difficulty: Hard
 * 
 * Fruits are available at some positions on an infinite x-axis. You are given a 2D integer array fruits where fruits[i] = [positioni, amounti] depicts amounti fruits at the position positioni. fruits is already sorted by positioni in ascending order, and each positioni is unique.

You are also given an integer startPos and an integer k. Initially, you are at the position startPos. From any position, you can either walk to the left or right. It takes one step to move one unit on the x-axis, and you can walk at most k steps in total. For every position you reach, you harvest all the fruits at that position, and the fruits will disappear from that position.
Return the maximum total number of fruits you can harvest.

Example 1:
Input: fruits = [[2,8],[6,3],[8,6]], startPos = 5, k = 4
Output: 9
Explanation: 
The optimal way is to:
- Move right to position 6 and harvest 3 fruits
- Move right to position 8 and harvest 6 fruits
You moved 3 steps and harvested 3 + 6 = 9 fruits in total.
Example 2:
Input: fruits = [[0,9],[4,1],[5,7],[6,2],[7,4],[10,9]], startPos = 5, k = 4
Output: 14
Explanation: 
You can move at most k = 4 steps, so you cannot reach position 0 nor 10.
The optimal way is to:
- Harvest the 7 fruits at the starting position 5
- Move left to position 4 and harvest 1 fruit
- Move right to position 6 and harvest 2 fruits
- Move right to position 7 and harvest 4 fruits
You moved 1 + 3 = 4 steps and harvested 7 + 1 + 2 + 4 = 14 fruits in total.
Example 3:
Input: fruits = [[0,3],[6,4],[8,5]], startPos = 3, k = 2
Output: 0
Explanation:
You can move at most k = 2 steps and cannot reach any position with fruits.
 
Constraints:
1 <= fruits.length <= 105
fruits[i].length == 2
0 <= startPos, positioni <= 2 * 105
positioni-1 < positioni for any i > 0 (0-indexed)
1 <= amounti <= 104
0 <= k <= 2 * 105
 */

/**
 * 🧠 # Intuition
Imagine you're standing on a long straight road, and you see fruit baskets placed at different positions — some ahead of you and some behind.

You can walk a total of at most k steps, no matter which direction you go. At each position you visit, you collect all the fruits there.

So, the real question is:
➡️ What is the best set of positions to visit within k steps to collect the most fruits?

Since the positions are already sorted, we can treat them like a number line.
This gives us the idea of using a sliding window to explore different ranges of positions.

We try all ranges where the minimum number of steps needed to cover them is within k, and track which range gives us the highest fruit total.

The key trick is to calculate the steps cleverly for each window using math and only consider valid windows — this avoids checking unnecessary paths.

🚶 # Approach
We use two pointers, left and right, to represent a window of fruit positions we're currently looking at.

For each window, we calculate:

How many total fruits are inside this range (by adding them up).
The minimum number of steps it would take to visit all positions from the starting point.
There are two ways:
Go left first, then all the way to the right:
(startPos - left) + (right - left)
Go right first, then swing back to the left:
(right - startPos) + (right - left)
We choose the cheapest option (fewer steps).
If the total steps required is more than k, it means the window is too far—so we shrink it by moving the left pointer forward.

While doing this, we keep track of the maximum fruits collected across all valid windows.

✅ This method is efficient because:

We only scan the array once.
We adjust the window size instead of checking every possible path.
It balances step limits and fruit collection smartly.
⏱️ # Complexity
Time Complexity: O(n)
We use a sliding window approach. Each fruit is added and removed from the window at most once, making the entire traversal linear.

Space Complexity: O(1)
We only use a few variables (sum, max, left, right), and don't use any extra data structures, so the space remains constant.
 */

var maxTotalFruits = function(fruits, startPos, k) {
    let left = 0, sum = 0, max = 0;
    for (let right = 0; right < fruits.length; right++) {
        sum += fruits[right][1];
        while (left <= right && minSteps(fruits[left][0], fruits[right][0], startPos) > k) {
            sum -= fruits[left][1];
            left++;
        }
        max = Math.max(max, sum);
    }
    return max;
};

function minSteps(left, right, start) {
    return Math.min(
        Math.abs(start - left) + (right - left),
        Math.abs(start - right) + (right - left)
    );
}