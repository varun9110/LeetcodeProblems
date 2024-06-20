/**
 * 1552. Magnetic Force Between Two Balls
 * Difficulty: Medium
 * 
 * In the universe Earth C-137, Rick discovered a special form of magnetic force between two balls if they are put in his new invented basket. 
 * Rick has n empty baskets, the ith basket is at position[i], Morty has m balls and needs to distribute the balls into the 
 * baskets such that the minimum magnetic force between any two balls is maximum.

Rick stated that magnetic force between two different balls at positions x and y is |x - y|.
Given the integer array position and the integer m. Return the required force.

Example 1:
Input: position = [1,2,3,4,7], m = 3
Output: 3
Explanation: Distributing the 3 balls into baskets 1, 4 and 7 will make the magnetic force between ball pairs [3, 3, 6]. 
The minimum magnetic force is 3. We cannot achieve a larger minimum magnetic force than 3.
Example 2:
Input: position = [5,4,3,2,1,1000000000], m = 2
Output: 999999999
Explanation: We can use baskets 1 and 1000000000.
 
Constraints:
n == position.length
2 <= n <= 105
1 <= position[i] <= 109
All integers in position are distinct.
2 <= m <= position.length
 */

/**
 * Brute Force:
 * 
 * Sort the array first and then calculate the difference between the 2 consecutive indexes:
 * Now we need m-1 position and need to find the combination of all the possibilities from this case.
 * Run a loop from i to length and keep adding i and i+1 index, can pass the array in the recurssion. 
 * If the length of the array is less than m then find the min gap and add that to the array,
 * Else follow the same steps
 * this code will work but will result in time out. Probably execute this when you have time limit
 */


/**
 * @param {number[]} position
 * @param {number} m
 * @return {number}
 */
var maxDistance = function(position, m) {
    position.sort((a,b) => a-b)
    let diffArr = [];
    for(let i=0; i<position.length-1; i++){
        diffArr.push(position[i+1] - position[i])
    }

    let map = {};
    let resultArr = [];

    const func = (arr) => {
        if(arr.length < m){
            let min = Math.min(...arr);
            if(map[min] === undefined){
                map[min] = 1;
                resultArr.push(min);
            }
            return;
        }

        for(let i=0; i<arr.length-1; i++){
            let newArr = [];
            for(let j=0; j<i; j++){
                newArr.push(arr[j]);
            }

            newArr.push(arr[i]+arr[i+1]);

            for(let j=i+2; j<arr.length; j++){
                newArr.push(arr[j]);
            }
            func(newArr);
        }
    };
    func(diffArr);
    return Math.max(...resultArr)
};

let a = [94, 95, 37, 30, 67, 7, 5, 44, 26, 55, 42, 28, 97, 19, 100, 74, 13, 88, 18];
let m = 7;

console.log(maxDistance(a, m))


/**
 * Refined approach:
 * Use binary search to solve the problem:
 * 
 * Intuition
The problem is to distribute m balls into n baskets such that the minimum magnetic force between any two balls is maximized. 
The magnetic force between two balls at positions x and y is defined as |x - y|.

This can be approached as a maximization problem where we want to find the largest possible minimum distance between any two balls. 
Binary search is a suitable technique for this type of optimization problem because it allows us to efficiently explore the range of 
possible minimum distances.

Approach
Sorting:

First, we sort the array of basket positions. This helps us to efficiently check the possible placement of balls in increasing order of positions.
Binary Search:

We perform binary search on the possible values of the minimum distance (dist) between two balls.
The lower bound (lo) of our search range is 1 (the smallest possible distance).
The upper bound (hi) is (position[n-1] - position[0]) / (m-1), which is the maximum possible minimum distance when placing m balls in n baskets.
Placement Check:

For each mid value in our binary search, we check if it is possible to place m balls such that the minimum distance between any two balls is at least mid.
We start by placing the first ball in the first basket and then attempt to place each subsequent ball in the next available basket that is at least 
mid distance away from the last placed ball.
If we successfully place all m balls, it means mid is a feasible distance, and we try for a larger distance. If not, we try a smaller distance.
Complexity
Time Complexity:

Sorting the position array takes (O(n \log n)).
Binary search involves (O(\log((position[n-1] - position[0]) / (m-1)))) iterations.
Each iteration of binary search involves a linear scan through the baskets to check the feasibility, which takes (O(n)).
Combining these, the overall time complexity is (O(n \log n + n \log ((position[n-1] - position[0]) / (m-1)))).
Space Complexity:

The space complexity is (O(1)) as we are only using a few extra variables for binary search and placement check.
 */

var maxDistance = function(position, m) {
    position.sort((a, b) => a - b);
    let lo = 1;
    let hi = Math.floor((position[position.length - 1] - position[0]) / (m - 1));
    let ans = 1;

    while (lo <= hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        if (canWePlace(position, mid, m)) {
            ans = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    
    return ans;
};

function canWePlace(arr, dist, balls) {
    let countBalls = 1;
    let lastPlaced = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] - lastPlaced >= dist) {
            countBalls++;
            lastPlaced = arr[i];
        }
        if (countBalls >= balls) {
            return true;
        }
    }
    return false;
}