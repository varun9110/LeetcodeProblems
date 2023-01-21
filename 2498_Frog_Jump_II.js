/*

2498_Frog_Jump_II
Difficulty : Medium

You are given a 0-indexed integer array stones sorted in strictly increasing order representing the positions of stones in a river.
A frog, initially on the first stone, wants to travel to the last stone and then return to the first stone. However, it can jump to any stone at most once.
The length of a jump is the absolute difference between the position of the stone the frog is currently on and the position of the stone to which the frog jumps.

More formally, if the frog is at stones[i] and is jumping to stones[j], the length of the jump is |stones[i] - stones[j]|.
The cost of a path is the maximum length of a jump among all jumps in the path.

Return the minimum cost of a path for the frog. 

Example 1:
Input: stones = [0,2,5,6,7]
Output: 5
Explanation: The above figure represents one of the optimal paths the frog can take.
The cost of this path is 5, which is the maximum length of a jump.
Since it is not possible to achieve a cost of less than 5, we return it.

Example 2:
Input: stones = [0,3,9]
Output: 9
Explanation: 
The frog can jump directly to the last stone and come back to the first stone. 
In this case, the length of each jump will be 9. The cost for the path will be max(9, 9) = 9.
It can be shown that this is the minimum achievable cost.
 

Constraints:

2 <= stones.length <= 105
0 <= stones[i] <= 109
stones[0] == 0
stones is sorted in a strictly increasing order.

*/

/*
Approach: 

The frog cannot ever jump the adjacent stone, that way he'll have to jump back from the last to the first and we will not get the correct answer.
The ideal approach is to skip one stone and then jump to the next one.
This is the greedy method

Initialise max = element[1], since element[0] will always be zero as in the constraints
So we just iterate thorugh each index and keeps checking if element[i+2]-element[i] > max 

Time Complexity = O(n)
*/

var maxJump = function(stones) {
    let max=stones[1];
    let n=stones.length;
        for(let i=0;i<stones.length-2;i++)
        {
            if(max<stones[i+2]-stones[i])
            {
                max=stones[i+2]-stones[i];
            }
        }
    return max
};