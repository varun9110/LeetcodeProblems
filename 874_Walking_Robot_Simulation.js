/**
 * 874. Walking Robot Simulation
 * Difficulty: Medium
 * 
 * A robot on an infinite XY-plane starts at point (0, 0) facing north. The robot can receive a sequence of these three possible types of commands:

-2: Turn left 90 degrees.
-1: Turn right 90 degrees.
1 <= k <= 9: Move forward k units, one unit at a time.
Some of the grid squares are obstacles. The ith obstacle is at grid point obstacles[i] = (xi, yi). If the robot runs into an obstacle, then it will instead stay in its current location and move on to the next command.

Return the maximum Euclidean distance that the robot ever gets from the origin squared (i.e. if the distance is 5, return 25).

Note:

North means +Y direction.
East means +X direction.
South means -Y direction.
West means -X direction.
There can be obstacle in [0,0].
 

Example 1:

Input: commands = [4,-1,3], obstacles = []
Output: 25
Explanation: The robot starts at (0, 0):
1. Move north 4 units to (0, 4).
2. Turn right.
3. Move east 3 units to (3, 4).
The furthest point the robot ever gets from the origin is (3, 4), which squared is 32 + 42 = 25 units away.
Example 2:

Input: commands = [4,-1,4,-2,4], obstacles = [[2,4]]
Output: 65
Explanation: The robot starts at (0, 0):
1. Move north 4 units to (0, 4).
2. Turn right.
3. Move east 1 unit and get blocked by the obstacle at (2, 4), robot is at (1, 4).
4. Turn left.
5. Move north 4 units to (1, 8).
The furthest point the robot ever gets from the origin is (1, 8), which squared is 12 + 82 = 65 units away.
Example 3:

Input: commands = [6,-1,-1,6], obstacles = []
Output: 36
Explanation: The robot starts at (0, 0):
1. Move north 6 units to (0, 6).
2. Turn right.
3. Turn right.
4. Move south 6 units to (0, 0).
The furthest point the robot ever gets from the origin is (0, 6), which squared is 62 = 36 units away.
 

Constraints:

1 <= commands.length <= 104
commands[i] is either -2, -1, or an integer in the range [1, 9].
0 <= obstacles.length <= 104
-3 * 104 <= xi, yi <= 3 * 104
The answer is guaranteed to be less than 231.
 */


/**
 * Intuition and approach
To solve this problem, we need to simulate the movement of the robot according to the commands provided while keeping track of the maximum squared Euclidean distance from the origin that the robot reaches during its journey. We also need to ensure that the robot stops when it encounters an obstacle.
Here's the step-by-step intuition:

Handling Directions:
The robot can face four possible directions: North, East, South, and West.
We can represent these directions as vectors:
North: (0, 1) - Moves up along the Y-axis.
East: (1, 0) - Moves right along the X-axis.
South: (0, -1) - Moves down along the Y-axis.
West: (-1, 0) - Moves left along the X-axis.
Use a list (array) of these direction vectors to manage the robot's current direction.
By using an index currentDirection to represent the current facing direction, we can easily change the direction:
Turn left (-2): Move one step counter-clockwise in the direction list.

Turn right (-1): Move one step clockwise in the direction list.

Processing Commands:

Iterate through each command in the list:

If the command is -2 or -1, update the robot's direction.
If the command is a number between 1 and 9, move the robot k steps in its current direction.
- For each step:
Calculate the next position.
Check if the next position is an obstacle.
If it is an obstacle, stop moving.
If it's not, update the robot's position and calculate the squared Euclidean distance from the origin.
Keep track of the maximum distance squared encountered so far.
Handling Obstacles:
Use a Set to store the coordinates of the obstacles. This allows for constant time (O(1)) checks to determine if a position is an obstacle.
Approach
Here's how we implement the solution step-by-step in JavaScript:

Initialize the Directions:
Define an array directions to represent North, East, South, and West.
Initialize Variables:
currentDirection: An index to keep track of the robot's current facing direction.
x and y: Variables to track the robot's current position.
maxDistanceSquared: Variable to store the maximum squared distance from the origin.
Convert Obstacles to a Set:
Convert the array of obstacle coordinates to a set of strings. This enables fast lookup to check if the robot's next move hits an obstacle.
Process Commands:

Loop through each command:
If the command is -2, turn left.
If the command is -1, turn right.
If the command is a number between 1 and 9, move forward step-by-step while checking for obstacles.
Calculate Distance:
After processing each command, compute the squared distance from the origin and update maxDistanceSquared if the new distance is greater.

example
Explanation of the Example
Example 1:
Commands: [4, -1, 3]

Move 4 steps north: (0, 0) -> (0, 4)
Turn right: Now facing East
Move 3 steps east: (0, 4) -> (3, 4)
Maximum distance squared from origin is 3^2 + 4^2 = 25.
Example 2:
Commands: [4, -1, 4, -2, 4]

Move 4 steps north: (0, 0) -> (0, 4)
Turn right: Now facing East
Move 4 steps east: (0, 4) -> (4, 4) (Obstacle at (2, 4), so stops at (2, 4))
Turn left: Now facing North
Move 4 steps north: (2, 4) -> (2, 8)
Maximum distance squared from origin is 2^2 + 8^2 = 68.
Complexity
Time complexity:
he time complexity is O(n + k) where n is the number of commands and k is the number of total steps to be moved.

Space complexity:
 */

/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function(commands, obstacles) {
    // Define the four directions: North, East, South, West
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let currentDirection = 0; // Start facing North
    let x = 0, y = 0; // Starting position
    let maxDistanceSquared = 0;

    // Convert obstacles to a set of strings for O(1) lookup
    const obstacleSet = new Set(obstacles.map(obstacle => obstacle.toString()));

    // Process each command
    for (let command of commands) {
        if (command === -2) {
            // Turn left: (currentDirection - 1) mod 4
            currentDirection = (currentDirection + 3) % 4;
        } else if (command === -1) {
            // Turn right: (currentDirection + 1) mod 4
            currentDirection = (currentDirection + 1) % 4;
        } else {
            // Move forward 'command' steps
            for (let step = 0; step < command; step++) {
                // Calculate the next step
                const nextX = x + directions[currentDirection][0];
                const nextY = y + directions[currentDirection][1];

                // Check if the next step is an obstacle
                if (obstacleSet.has([nextX, nextY].toString())) {
                    break; // Stop if there's an obstacle
                }

                // Update the robot's position
                x = nextX;
                y = nextY;

                // Calculate the current distance squared from the origin
                maxDistanceSquared = Math.max(maxDistanceSquared, x * x + y * y);
            }
        }
    }

    return maxDistanceSquared;
};