/*

954_Array_of_Doubled_Pairs
Difficulty : Medium

Given an integer array of even length arr, return true if it is possible to reorder arr such that arr[2 * i + 1] = 2 * arr[2 * i] for every 0 <= i < len(arr) / 2, or false otherwise.

Example 1:
Input: arr = [3,1,3,6]
Output: false

Example 2:
Input: arr = [2,1,2,6]
Output: false

Example 3:
Input: arr = [4,-2,2,-4]
Output: true
Explanation: We can take two groups, [-2,-4] and [2,4] to form [-2,-4,2,4] or [2,4,-2,-4].
 

Constraints:
2 <= arr.length <= 3 * 104
arr.length is even.
-105 <= arr[i] <= 105


*/

/* Approach :
We saw that basically we are finding the double of the element inside the array.
if each of the element has a double inside the array then we can successfully implement the asked question. 
if any extra element is ther or any 1 element is missing the double then the condition goes false.
Time Complexity : O(n log n)
*/




var canReorderDoubled = function(arr) {

    let positiveArray = [];
    let positiveArrayHash = {};
    let negativeArray = [];
    let negativeArrayHash = {};
    let zeroCount = 0;

    for(let i=0; i<arr.length; i++){
        if(arr[i]===0){
            zeroCount++;
        } else if(arr[i]<0){
            negativeArray.push(arr[i]);
            (negativeArrayHash[arr[i]])?  negativeArrayHash[arr[i]]=negativeArrayHash[arr[i]]+1 : negativeArrayHash[arr[i]]=1;
        } else {
            positiveArray.push(arr[i]);
            (positiveArrayHash[arr[i]])?  positiveArrayHash[arr[i]]=positiveArrayHash[arr[i]]+1 : positiveArrayHash[arr[i]]=1;
        }
        
    }
    if(zeroCount%2 !== 0 ){
        return false;
    }
    negativeArray = negativeArray.sort(function(a, b) {
        return b - a;
    });

    positiveArray = positiveArray.sort(function(a, b) {
        return a - b;
    });

    for(let j=0; j<negativeArray.length; j++){
        let element = negativeArray[j];
        if( negativeArrayHash[element]>0){
            negativeArrayHash[element] = negativeArrayHash[element]-1;
            if( (negativeArrayHash[2*element])>0 ){
                negativeArrayHash[2*element] = negativeArrayHash[2*element]-1
            } else {
                return false;
            }
        }
    }

    for(let j=0; j<positiveArray.length; j++){
        let element = positiveArray[j];
        if( positiveArrayHash[element]>0){
            positiveArrayHash[element] = positiveArrayHash[element]-1;
            if( (positiveArrayHash[2*element])>0 ){
                positiveArrayHash[2*element] = positiveArrayHash[2*element]-1
            } else {
                return false;
            }
        }
    }
    return true;
};