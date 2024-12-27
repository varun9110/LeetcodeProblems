/**
 * 1014. Best Sightseeing Pair
 * Difficulty: medium
 * 
 * You are given an integer array values where values[i] represents the value of the ith sightseeing spot. Two sightseeing spots i and j have a distance j - i between them.
The score of a pair (i < j) of sightseeing spots is values[i] + values[j] + i - j: the sum of the values of the sightseeing spots, minus the distance between them.
Return the maximum score of a pair of sightseeing spots.

Example 1:

Input: values = [8,1,5,2,6]
Output: 11
Explanation: i = 0, j = 2, values[i] + values[j] + i - j = 8 + 5 + 0 - 2 = 11
Example 2:

Input: values = [1,2]
Output: 2
 

Constraints:

2 <= values.length <= 5 * 104
1 <= values[i] <= 1000

 */

/**
 * @param {number[]} values
 * @return {number}
 */
var maxScoreSightseeingPair = function(values) {
    // Given formula is values[i] + values[j] + i - j;
    // Break it as values[i] + i + values[j] - j;
    
    // take the first element of the pair with the formula values[i] + i for i = 0
    let firstElementInPair = values[0] + 0;
    
    // final result;
    let resultPairValue = 0;
    
    for(let i = 1; i < values.length; i++) {
        
        // values[i] + i is computed in firstElementInPair.
        
        // Compute secondElementInPair with the formula Values[j] - j for our current i;
        const secondElementInPair = values[i] - i;
        
        // calculate the pairValue with the formula values[i] + i (FirstElementInPair) + values[j] - j (SecondElementInPair);
        const currentPairValue = firstElementInPair + secondElementInPair;
        
        // keep the best pair found so far.
        resultPairValue = Math.max(resultPairValue, currentPairValue);
        
        // update firstElementInPair, if any other better element is found
        firstElementInPair = Math.max(firstElementInPair, values[i] + i);
    }
    return resultPairValue;
};