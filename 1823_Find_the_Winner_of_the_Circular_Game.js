/**
 * 1823. Find the Winner of the Circular Game
 * Difficulty: Medium
 * 
 * There are n friends that are playing a game. The friends are sitting in a circle and are numbered from 1 to n in clockwise order. 
 * More formally, moving clockwise from the ith friend brings you to the (i+1)th friend for 1 <= i < n, and moving 
 * clockwise from the nth friend brings you to the 1st friend.

The rules of the game are as follows:

Start at the 1st friend.
Count the next k friends in the clockwise direction including the friend you started at. The counting wraps around the circle and 
may count some friends more than once.
The last friend you counted leaves the circle and loses the game.
If there is still more than one friend in the circle, go back to step 2 starting from the friend immediately clockwise of 
the friend who just lost and repeat.
Else, the last friend in the circle wins the game.
Given the number of friends, n, and an integer k, return the winner of the game.

 Example 1:

Input: n = 5, k = 2
Output: 3
Explanation: Here are the steps of the game:
1) Start at friend 1.
2) Count 2 friends clockwise, which are friends 1 and 2.
3) Friend 2 leaves the circle. Next start is friend 3.
4) Count 2 friends clockwise, which are friends 3 and 4.
5) Friend 4 leaves the circle. Next start is friend 5.
6) Count 2 friends clockwise, which are friends 5 and 1.
7) Friend 1 leaves the circle. Next start is friend 3.
8) Count 2 friends clockwise, which are friends 3 and 5.
9) Friend 5 leaves the circle. Only friend 3 is left, so they are the winner.
Example 2:

Input: n = 6, k = 5
Output: 1
Explanation: The friends leave in this order: 5, 4, 6, 2, 3. The winner is friend 1.
 
Constraints:

1 <= k <= n <= 500

Follow up:

Could you solve this problem in linear time with constant space?
 */


/**
 * Conventional way: Do as the problem says
 */

var findTheWinner = function(n, k) {
    let obj = {};

    for(let i=1; i<=n; i++){
        obj[i] = true
    }
    let gameIsOn = true;
    let playerStart = 0;

    while(gameIsOn){
        let arr = Object.keys(obj);
        const len = arr.length;
        if(len != 1){
            let findDiff = k % len;
            let sum = (findDiff !== 0) ? findDiff-1 : len-1;
            
            if(playerStart === len){
                playerStart = 0
            }

            let playerEliminated = playerStart + sum;
            if(playerEliminated > (len-1)){
                playerEliminated = playerEliminated % len
            }

            delete obj[arr[playerEliminated]]
            playerStart = playerEliminated
        } else {
            gameIsOn = false
        }
    }
    return Object.keys(obj)[0]
    
};

/**
 * Refined approach :
 * Approach 2: Recursion With Subproblems
🤔 Intuition
This approach in much harder to understand but if you do the most oprimized solution (next) will be easy for you

If you have circle [1, 2, 3, 4] and start index now 0 (0-indexed). Let's say k = 2. Then, as said earlier index (0-indexed) 
of element we want to remove will be (0 + 2 - 1) % 4 = 1.
After removing we will have [1, 3, 4] and start index is 1 (0-indexed). But this is circle, so we can rearange 
this as [3, 4, 1] and now say that our start index is one more time 0. Can you see how indeces was changed? 
Every index ind (from the [1, 2, 3, 4]) was changed to ind - k in this new array. Next state will be [1, 3]
After removing 3 we will have [1] which is our answer we want to return after returning index to normal.
This example lead us to observation that we can divide problem on small subproblems (in fact, bottom-up DP) - if we 
know relative index of the winner let's say winner(n, k) then we can find winner(n + 1, k) as (winner(n, k) + k) % (n + 1). 
So if we have winner(1, 2) = 2 then winner(2, 2) = (2 + 2) % 2 = 0 -> winner(3, 2) = (0 + 2) % 3 = 3 and winner(4, 2) = (3 + 2) % 4 = 1 which was 
answer we've found above.
Some more explanations for you competely understand why this works:
As was shown every time we remove some friend we reduce our subproblem to (n - 1, k).
But as we move to smaller subproblem we also change every index on -k (and so result index too), so we want to add this 
k after we calculated smaller subproblem so as we haven't changed indexes at all.
We find modulo n because we don't want to exceed the size of the array (as shown above winner(n - 1, k) + k can be bigger or equal to n)
 */

var findTheWinner = function(n, k) {
    let winner = 0;
    for (let i = 2; i <= n; i++) {
        winner = (winner + k) % i;
    }
    return winner+1
};