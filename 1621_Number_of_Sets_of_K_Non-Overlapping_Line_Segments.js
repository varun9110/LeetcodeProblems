/*
1621. Number of Sets of K Non-Overlapping Line Segments
Difficulty: Medium

Given n points on a 1-D plane, where the ith point (from 0 to n-1) is at x = i, find the number of ways we can draw exactly k non-overlapping line segments such that each segment covers two or more points. The endpoints of each segment must have integral coordinates. The k line segments do not have to cover all n points, and they are allowed to share endpoints.
Return the number of ways we can draw k non-overlapping line segments. Since this number can be huge, return it modulo 109 + 7.

Example 1:
Input: n = 4, k = 2
Output: 5
Explanation: The two line segments are shown in red and blue.
The image above shows the 5 different ways {(0,2),(2,3)}, {(0,1),(1,3)}, {(0,1),(2,3)}, {(1,2),(2,3)}, {(0,1),(1,2)}.

Example 2:
Input: n = 3, k = 1
Output: 3
Explanation: The 3 ways are {(0,1)}, {(0,2)}, {(1,2)}.

Example 3:
Input: n = 30, k = 7
Output: 796297179
Explanation: The total number of possible ways to draw 7 line segments is 3796297200. Taking this number modulo 109 + 7 gives us 796297179.

Constraints:
2 <= n <= 1000
1 <= k <= n-1
*/

/*
Approach :

This is a dynamic proble where we can solve by using recurrsion.
To better understand the logic kindly watch the below two videos:
https://www.youtube.com/watch?v=B29hS-VuqVI&ab_channel=codeExplainer
https://www.youtube.com/watch?v=ie4yXjA13L4&ab_channel=CodeJS

Dynamic Problem becase we save the funture values to a cache and use them further in the problem. (Called cache array in this solution)

*/

var numberOfSets = function(n, k) {
    //Building mem
    const cache = [];
    for(let i =0; i<n; i++){
        cache[i] = [];
    }

    const findNum = function ( len , num) {
        let count = 0;

        //check cache first
        if(cache[len][num]){
            return cache[len][num];
        }

        if(len < num) {
            return 0;
        }

        if(len === num){
            return 1;
        }

        //only one line, return sum of 1 to n which is n * n+1 / 2    (premutation formula of nC2)
        if(num === 1){
            return (len * (len+1))/2;
        }

        //Case for the first block is not covered by a line
        if(len > num) {
            count += findNum(len-1, num);
        }

        //case for the first line starts from the first block
        // i is he number of blocks this line will use
        for(let i=1; i< len - num + 1; i++){
            count = (count + findNum(len - 1, num-1)) % 1000000007;
        }

        cache[len][num] = count % 1000000007;
        return cache[len][num];

    };

    return findNum(n-1, k) % 1000000007;
    
};