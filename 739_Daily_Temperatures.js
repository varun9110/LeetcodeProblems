/**
 * 739. Daily Temperatures
 * Difficulty: Medium
 * 
 * Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] 
 * is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, 
 * keep answer[i] == 0 instead.

Example 1:
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
Example 2:
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
Example 3:
Input: temperatures = [30,60,90]
Output: [1,1,0]

Constraints:
1 <= temperatures.length <= 105
30 <= temperatures[i] <= 100
 */

/**
 * Approach 1:
 * Brute force; nested loop to find the number of days
 * Probably will time out
 */

var dailyTemperatures = function(temperatures) {
    let arr = [];
    for(let i=0; i<temperatures.length; i++){
        let skip =0;
        let flag = false
        // console.log(temperatures[i])
        for(let j=i+1; j<temperatures.length; j++){
            skip++;
            if(temperatures[j]>temperatures[i]){
                flag = true
                // console.log(temperatures[j])
                break;
            }
        }
        if(flag){
            arr.push(skip)
        } else {
            arr.push(0)
        }
        // console.log(skip)
    }

    return arr;
};

/**
 * Refined approach
 * Approach 1
Initialize a deque to store indices of temperatures.
Initialize a result vector to store the days until a warmer temperature is encountered.
Iterate through the temperatures in reverse order.
If the deque is empty, push the current index and set the result for that index to 0.
If the deque is not empty, pop indices from the front of the deque while the current temperature is greater than or equal to the temperature at the front.
If the deque is empty after the above step, set the result for the current index to 0.
If the deque is not empty, set the result for the current index to the difference between the front of the deque and the current index.
Push the current index to the front of the deque.
Continue these steps for all temperatures.
Return the result vector.
 */

var dailyTemperatures = function(temperatures) {
    const stack = [];
    const result = new Array(temperatures.length).fill(0);

    for (let i = temperatures.length - 1; i >= 0; --i) {
        while (stack.length > 0 && temperatures[i] >= temperatures[stack[0]]) {
            stack.shift();
        }

        if (stack.length === 0) {
            result[i] = 0;
        } else {
            result[i] = stack[0] - i;
        }

        stack.unshift(i);
    }

    return result;
};
