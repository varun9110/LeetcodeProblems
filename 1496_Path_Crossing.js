/**
 * 1496. Path Crossing
 * Given a string path, where path[i] = 'N', 'S', 'E' or 'W', each representing moving one unit north, south, east, or west, respectively. 
 * You start at the origin (0, 0) on a 2D plane and walk on the path specified by path.
Return true if the path crosses itself at any point, that is, if at any time you are on a location you have previously visited. Return false otherwise.

Example 1:
Input: path = "NES"
Output: false 
Explanation: Notice that the path doesn't cross any point more than once.
Example 2:
Input: path = "NESWW"
Output: true
Explanation: Notice that the path visits the origin twice.

Constraints:
1 <= path.length <= 104
path[i] is either 'N', 'S', 'E', or 'W'.
 */


var isPathCrossing = function(path) {
    // Store coordinate pairs as a string such as "0,1"
    let visitedCoordinates = new Set();
    
    let currentX = 0;
    let currentY = 0;
    
    // Add intial 0,0 coordinate to our Set
    visitedCoordinates.add(currentX + "," + currentY);
    
    // Go through each direction in the path and increment/decrement where applicable
    for (let i = 0; i < path.length; i++) {
        
        switch (path[i]) {             
            case "N":
                currentY++;
                break;              
            case "S":
                currentY--;
                break;                
            case "E":
                currentX++;
                break;                
            case "W":
                currentX--;
                break;               
        }
        
        // Check if the current coordinate has been visited already and return true if so
        // Otherwise, add current coordinate to our Set
        if (visitedCoordinates.has(currentX + "," + currentY))
            return true;
        else 
            visitedCoordinates.add(currentX + "," + currentY);

    }
    
    // If nothing triggered the retrun within the above loop, the return false
    return false;
};