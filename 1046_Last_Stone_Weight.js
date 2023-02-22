/*
1046. Last Stone Weight
Difficulty : Easy

You are given an array of integers stones where stones[i] is the weight of the ith stone.
We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:
If x == y, both stones are destroyed, and
If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
At the end of the game, there is at most one stone left.
Return the weight of the last remaining stone. If there are no stones left, return 0.

Example 1:
Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation: 
We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.

Example 2:
Input: stones = [1]
Output: 1

Constraints:
1 <= stones.length <= 30
1 <= stones[i] <= 1000
*/

/*
Approach: Brute force
While loop till the length of the array is greater than 1. 
Then pop out the last 2 and push back the diff if it is greater than 0

Lastly, if the length is 0 then return 0 else return the value at the 0th index
*/

var lastStoneWeight = function(stones) {
    while(stones.length > 1){
        stones.sort(function(a, b) {
            return a - b;
        });
        let first = stones.pop();
        let second = stones.pop();
        let diff = first - second;
        if(diff>0){
            stones.push(diff);
        }
    }
    if(stones.length === 0 ){
        return 0;
    }
    return stones[0];
};