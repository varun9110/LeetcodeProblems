/*

2211_Count_Collisions_on_a_Road
Difficulty : Medium

There are n cars on an infinitely long road. The cars are numbered from 0 to n - 1 from left to right and each car is present at a unique point.

You are given a 0-indexed string directions of length n. directions[i] can be either 'L', 'R', or 'S' denoting whether the ith car is moving towards the left, towards the right, or staying at its current point respectively. Each moving car has the same speed.

The number of collisions can be calculated as follows:

When two cars moving in opposite directions collide with each other, the number of collisions increases by 2.
When a moving car collides with a stationary car, the number of collisions increases by 1.
After a collision, the cars involved can no longer move and will stay at the point where they collided. Other than that, cars cannot change their state or direction of motion.

Return the total number of collisions that will happen on the road.

 

Example 1:
Input: directions = "RLRSLL"
Output: 5
Explanation:
The collisions that will happen on the road are:
- Cars 0 and 1 will collide with each other. Since they are moving in opposite directions, the number of collisions becomes 0 + 2 = 2.
- Cars 2 and 3 will collide with each other. Since car 3 is stationary, the number of collisions becomes 2 + 1 = 3.
- Cars 3 and 4 will collide with each other. Since car 3 is stationary, the number of collisions becomes 3 + 1 = 4.
- Cars 4 and 5 will collide with each other. After car 4 collides with car 3, it will stay at the point of collision and get hit by car 5. The number of collisions becomes 4 + 1 = 5.
Thus, the total number of collisions that will happen on the road is 5. 

Example 2:
Input: directions = "LLRR"
Output: 0
Explanation:
No cars will collide with each other. Thus, the total number of collisions that will happen on the road is 0.
 

Constraints:
1 <= directions.length <= 105
directions[i] is either 'L', 'R', or 'S'.

*/

/*
Approach : 2 for loops one after the another.
in first for loop check of the collision based on the 3 conditions:
if(directionsArray[i]+directionsArray[i+1] === 'RL')
else if(directionsArray[i]+directionsArray[i+1] === 'SL')
else if(directionsArray[i]+directionsArray[i+1] === 'RS')

it is one of these conditions that collision will occur and then add the number of collisions accordingly

After completion of this for loop run another for loop but in reverse
This time to identify which further collisions were caused due to the first collisions

so j = length -1, J>=1, j--
if(directionsArray[i]+directionsArray[i+1] === 'RL')
else if(directionsArray[i]+directionsArray[i+1] === 'SL')
else if(directionsArray[i]+directionsArray[i+1] === 'RS')

these conditions again and keep incrementing the number of collisions

Time complexity : O(2n)

*/

var countCollisions = function(directions) {
    let directionsArray  = directions.split("");
    let collisions = 0;
    for(let i=0; i<=directionsArray.length -2; i++) {
        if(directionsArray[i]+directionsArray[i+1] === 'RL'){
            collisions += 2;
            directionsArray[i] = 'S';
            directionsArray[i+1] = 'S';
        } else if(directionsArray[i]+directionsArray[i+1] === 'SL'){ 
            collisions += 1;
            directionsArray[i+1] = 'S';
        } else if(directionsArray[i]+directionsArray[i+1] === 'RS'){ 
            collisions += 1;
            directionsArray[i] = 'S';
            directionsArray[i+1] = 'S';
        }
    }

    for(let j=directionsArray.length-1; j >= 1; j--) {
        if(directionsArray[j-1]+directionsArray[j] === 'RL'){
            collisions += 2;
            directionsArray[j] = 'S';
            directionsArray[j-1] = 'S';
        } else if(directionsArray[j-1]+directionsArray[j] === 'SL'){ 
            collisions += 1;
            directionsArray[j] = 'S';
        } else if(directionsArray[j-1]+directionsArray[j] === 'RS'){ 
            collisions += 1;
            directionsArray[j] = 'S';
            directionsArray[j-1] = 'S';
        }
    }

    return collisions;
};

/*

Better approach:

*/

function countCollisions(directions) {
	// Count left cars turning further left - they not collide.
	// Lucky pythonistas have lstrip(), but JS dev has to write htis manually.
	let start;
	for (start = 0; start < directions.length; start++) {
		if (directions[start] !== 'L') {
			break;
		}
	}
	
	// Count right cars turning further right - they not collide.
	let end;
	for (end = directions.length - 1; end >= 0; end--) {
		if (directions[end] !== 'R') {
			break;
		}
	}
	
	// Each remaining turning car (not 'S') produce 1 collide point .
	let counter = 0;
	for (let i = start; i <= end; i++) {
		if (directions[i] !== 'S') {
			counter++;
		}
	}
	
	return counter;
}


