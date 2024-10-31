/**
 * 2463. Minimum Total Distance Traveled
 * Difficulty: Hard
 * 
 * There are some robots and factories on the X-axis. You are given an integer array robot where robot[i] is the position of the ith robot. You are also given a 2D integer array factory where factory[j] = [positionj, limitj] indicates that positionj is the position of the jth factory and that the jth factory can repair at most limitj robots.

The positions of each robot are unique. The positions of each factory are also unique. Note that a robot can be in the same position as a factory initially.

All the robots are initially broken; they keep moving in one direction. The direction could be the negative or the positive direction of the X-axis. When a robot reaches a factory that did not reach its limit, the factory repairs the robot, and it stops moving.

At any moment, you can set the initial direction of moving for some robot. Your target is to minimize the total distance traveled by all the robots.

Return the minimum total distance traveled by all the robots. The test cases are generated such that all the robots can be repaired.

Note that

All robots move at the same speed.
If two robots move in the same direction, they will never collide.
If two robots move in opposite directions and they meet at some point, they do not collide. They cross each other.
If a robot passes by a factory that reached its limits, it crosses it as if it does not exist.
If the robot moved from a position x to a position y, the distance it moved is |y - x|.
 

Example 1:


Input: robot = [0,4,6], factory = [[2,2],[6,2]]
Output: 4
Explanation: As shown in the figure:
- The first robot at position 0 moves in the positive direction. It will be repaired at the first factory.
- The second robot at position 4 moves in the negative direction. It will be repaired at the first factory.
- The third robot at position 6 will be repaired at the second factory. It does not need to move.
The limit of the first factory is 2, and it fixed 2 robots.
The limit of the second factory is 2, and it fixed 1 robot.
The total distance is |2 - 0| + |2 - 4| + |6 - 6| = 4. It can be shown that we cannot achieve a better total distance than 4.
Example 2:


Input: robot = [1,-1], factory = [[-2,1],[2,1]]
Output: 2
Explanation: As shown in the figure:
- The first robot at position 1 moves in the positive direction. It will be repaired at the second factory.
- The second robot at position -1 moves in the negative direction. It will be repaired at the first factory.
The limit of the first factory is 1, and it fixed 1 robot.
The limit of the second factory is 1, and it fixed 1 robot.
The total distance is |2 - 1| + |(-2) - (-1)| = 2. It can be shown that we cannot achieve a better total distance than 2.
 

Constraints:

1 <= robot.length, factory.length <= 100
factory[j].length == 2
-109 <= robot[i], positionj <= 109
0 <= limitj <= robot.length
The input will be generated such that it is always possible to repair every robot.
 */

/**
 * 
 * Intuition
Each robot needs to be repaired at a factory
Factories have repair limits
Robots can move in either direction
Goal is to minimize total distance traveled
Approach
The solution uses dynamic programming with the following approach:
Sort both robots and factories by position to make optimal assignments easier
Create a DP table where:
dp[i][j] represents minimum distance needed for robots[i:] using factories[j:]
i represents robot index
j represents factory index
Step by Step
Initial Setup
# Sort both arrays to enable optimal matching
robot.sort()
factory.sort()
m, n = len(robot), len(factory)
DP Table Creation
# Create DP table and initialize base case
dp = [[0]*(n+1) for _ in range(m+1)]
for i in range(m): 
    dp[i][-1] = float('inf')
Main DP Loop Structure
# Outer loop: process each factory right to left
for j in range(n-1, -1, -1):
    prefix = 0
    qq = deque([(m, 0)])
    
    # Inner loop: process each robot right to left
    for i in range(m-1, -1, -1):
Distance Calculation
# Calculate cumulative distance for current robot to factory
prefix += abs(robot[i] - factory[j][0])
Queue Management
# Remove elements outside factory limit
if qq[0][0] > i+factory[j][1]: 
    qq.popleft()

# Maintain monotonic property
while qq and qq[-1][1] >= dp[i][j+1] - prefix:
    qq.pop()
State Update
# Add new state and calculate minimum distance
qq.append((i, dp[i][j+1] - prefix))
dp[i][j] = qq[0][1] + prefix
Key
Sorting ensures we can process positions in order
DP table stores minimum distances for subproblems
Double loop processes all robot-factory combinations
Prefix sum tracks cumulative distances
Deque optimization maintains valid factory assignments
Final state gives minimum total distance
Optimalization
Processing factories from right to left
Considering each robot's potential assignments
Using the deque to maintain factory capacity constraints
Tracking minimum distances in the DP table
The final answer dp[0][0] represents the minimum total distance for all robots to reach their optimal factories.

Still dont understand Dynamic Programming
Video with IMO best explained: google "15. Dynamic Programming, Part 1: SRTBOT, Fib, DAGs, Bowling" , "Dynamic Programming - Learn to Solve Algorithmic Problems & Coding Challenges"
(leetscode flag video in solution :)

List DP for begginers: https://leetcode.com/problem-list/atwflvk7/
 */

// JavaScript

var minimumTotalDistance = function(robot, factory) {
    // Sort positions
    robot.sort((a, b) => a - b);
    factory.sort((a, b) => a[0] - b[0]);
    
    const m = robot.length;
    const n = factory.length;
    
    // Create DP table
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Base case initialization
    for (let i = 0; i < m; i++) {
        dp[i][n] = Infinity;
    }
    
    // Process each factory from right to left
    for (let j = n - 1; j >= 0; j--) {
        let prefix = 0;
        const qq = [[m, 0]];
        
        // Process each robot from right to left
        for (let i = m - 1; i >= 0; i--) {
            // Add distance to current factory
            prefix += Math.abs(robot[i] - factory[j][0]);
            
            // Remove elements outside factory limit window
            if (qq[0][0] > i + factory[j][1]) {
                qq.shift();
            }
            
            // Maintain monotonic queue property
            while (qq.length && qq[qq.length - 1][1] >= dp[i][j + 1] - prefix) {
                qq.pop();
            }
            
            qq.push([i, dp[i][j + 1] - prefix]);
            dp[i][j] = qq[0][1] + prefix;
        }
    }
    
    return dp[0][0];
};