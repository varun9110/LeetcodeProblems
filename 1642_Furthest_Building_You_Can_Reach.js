/**
 * 1642. Furthest Building You Can Reach
 * Difficulty: Medium
 * 
 * You are given an integer array heights representing the heights of buildings, some bricks, and some ladders.

You start your journey from building 0 and move to the next building by possibly using bricks or ladders.

While moving from building i to building i+1 (0-indexed),

If the current building's height is greater than or equal to the next building's height, you do not need a ladder or bricks.
If the current building's height is less than the next building's height, you can either use one ladder or (h[i+1] - h[i]) bricks.
Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.

 

Example 1:


Input: heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
Output: 4
Explanation: Starting at building 0, you can follow these steps:
- Go to building 1 without using ladders nor bricks since 4 >= 2.
- Go to building 2 using 5 bricks. You must use either bricks or ladders because 2 < 7.
- Go to building 3 without using ladders nor bricks since 7 >= 6.
- Go to building 4 using your only ladder. You must use either bricks or ladders because 6 < 9.
It is impossible to go beyond building 4 because you do not have any more bricks or ladders.
Example 2:

Input: heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2
Output: 7
Example 3:

Input: heights = [14,3,19,3], bricks = 17, ladders = 0
Output: 3
 

Constraints:

1 <= heights.length <= 105
1 <= heights[i] <= 106
0 <= bricks <= 109
0 <= ladders <= heights.length
 */

/**
 * Priority Queue Setup:

The code defines a function furthestBuilding that takes a vector h representing the heights of buildings, an integer b representing the initial number of bricks, and an integer l representing the maximum number of steps you can use ladders.
Inside the function, a priority queue p is created to store the bricks used in each step in decreasing order. This queue is a max heap, meaning the largest element is at the top.
Iterating Through Buildings:

The code iterates through each pair of adjacent buildings using a for loop, starting from the first building (i=0) and ending at the second-to-last building (i<h.size()-1).
Calculating Height Difference:

At each step, the code calculates the height difference (diff) between the current building and the next building.
Checking Bricks and Ladders:

If the height difference (diff) is less than or equal to 0, it means no additional bricks are required to climb to the next building, so the loop continues to the next iteration.
If the height difference (diff) is greater than 0, it means additional bricks are required to climb to the next building. These bricks are deducted from the available bricks (b) and added to the priority queue (p).
If the remaining number of bricks (b) becomes negative after deducting the required bricks, it means the available bricks are not sufficient to climb to the next building. In this case, the code uses a ladder from the priority queue (p) by adding the largest previously deducted number of bricks to the available bricks and reducing the number of available ladders (l) by 1.
If the remaining number of ladders (l) becomes negative, it means there are no ladders left, and the loop breaks.
Returning Furthest Building:

The function returns the index (i) of the furthest building that can be reached with the given number of bricks and ladders.
 */

var furthestBuilding = function(heights, bricks, ladders) {
     let lgestjumps=new Array(ladders).fill(0)
    let i;
    for(i=1;i<heights.length;i++){
        let jump=heights[i]-heights[i-1]
        if(jump>0){
            if(jump>lgestjumps[0]){
                let j=lgestjumps.length-1
                while(j>=0 && lgestjumps[j]>jump){
                    j--
                }
                bricks-=lgestjumps.shift()
                lgestjumps.splice(j,0,jump)
            }else{
                bricks-=jump
            }
            if(bricks<0) return i-1
        }
    }
    return i-1
};