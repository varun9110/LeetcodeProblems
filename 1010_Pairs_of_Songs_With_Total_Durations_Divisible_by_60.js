/**
 * 1010. Pairs of Songs With Total Durations Divisible by 60
 * Difficulty: Medium
 * 
 * You are given a list of songs where the ith song has a duration of time[i] seconds.

Return the number of pairs of songs for which their total duration in seconds is divisible by 60. Formally, we want the number of indices i, j such that i < j with (time[i] + time[j]) % 60 == 0.

 

Example 1:

Input: time = [30,20,150,100,40]
Output: 3
Explanation: Three pairs have a total duration divisible by 60:
(time[0] = 30, time[2] = 150): total duration 180
(time[1] = 20, time[3] = 100): total duration 120
(time[1] = 20, time[4] = 40): total duration 60
Example 2:

Input: time = [60,60,60]
Output: 3
Explanation: All three pairs have a total duration of 120, which is divisible by 60.
 

Constraints:

1 <= time.length <= 6 * 104
1 <= time[i] <= 500
 */

/**
 * Hint & abstract model:

This one is similar to classical two-sum problem. where math objective function is x + y = target

The difference is that what we want this time is (x + y) % 60 = target = 0
 */

/**
 * @param {number[]} time
 * @return {number}
 */
var numPairsDivisibleBy60 = function(time) {
    
    var mod_60 = ( x => x % 60 );
    
    // key: remainder of mod 60
    // value: occurrence of remainder
    let congurenceDict = {}
    
    // counter of ( song i + song j ) % 60 == 0 
    let pairCount = 0
    
   
   for(const remainder of time.map( mod_60 ) ){     
       
        complement = mod_60( 60 - remainder );
        
        // update pair count with complement
        pairCount += congurenceDict[complement] || 0;
        
       // update occurrence of current remainder
        congurenceDict[remainder] = (congurenceDict[remainder] || 0) + 1;
        
    }

    return pairCount;
};