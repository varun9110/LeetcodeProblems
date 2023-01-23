/*

319_Bulb_Switcher
Difficulty : Medium

There are n bulbs that are initially off. You first turn on all the bulbs, then you turn off every second bulb.
On the third round, you toggle every third bulb (turning on if it's off or turning off if it's on). For the ith round, you toggle every i bulb. For the nth round, you only toggle the last bulb.
Return the number of bulbs that are on after n rounds.

Example 1:
Input: n = 3
Output: 1
Explanation: At first, the three bulbs are [off, off, off].
After the first round, the three bulbs are [on, on, on].
After the second round, the three bulbs are [on, off, on].
After the third round, the three bulbs are [on, off, off]. 
So you should return 1 because there is only one bulb is on.

Example 2:
Input: n = 0
Output: 0

Example 3:
Input: n = 1
Output: 1
 
Constraints:
0 <= n <= 109

*/

/*
Approach 1 :
nested too  to do the on and off on the mapper object.
then when all the iterations are done get the values from the mapper object and check for the true values and return the answer.


Drawback : runs in time exceed on high value;
Complexity : O(n2)
*/

var bulbSwitch = function(n) {
    let mapper = {};
    if(n===0){
        return 0;
    }

    for(let k=1; k<=n; k++){
        mapper[k] = false;
    }

    

    for(let i=1; i<=n; i++){
        let count=i;
        for(let j=count; j<=n; j=j+count){
            mapper[j] = !mapper[j];
        }
        count++;
    }

    let values = Object.values(mapper);
    let result = 0;
    for(let m=0; m<values.length; m++){
        (values[m]) ? result++ : null;
    }
    return result;
};


/*
Approach 2: 

from the above we see a pattern that after 2*i time the true bulb is received so just iterate till (m + 1 : 2*1 ) is less than the n and then return the ith value;

Complexity O(n)
*/
var bulbSwitch = function(n) {

    if(n <= 1){
        return n;
    }

    let i=1;
    let m = 1 + (2*i);
    while( m < n){
        i++;
        m = m + 1 + (2*i);
    }
    return i;
};


/*
Approach 3: 
Upon further observation we could see that the answer is always the square root of the number given. Hence just find the square root of the number and you are done
*/

var bulbSwitch = function(n) {
    return Math.floor(Math.sqrt(n));    
};