/**
 * 1720. Decode XORed Array
 * Difficulty : Easy
 * There is a hidden integer array arr that consists of n non-negative integers.
It was encoded into another integer array encoded of length n - 1, such that encoded[i] = arr[i] XOR arr[i + 1]. For example, if arr = [1,0,2,1], 
then encoded = [1,2,3].
You are given the encoded array. You are also given an integer first, that is the first element of arr, i.e. arr[0].
Return the original array arr. It can be proved that the answer exists and is unique.

Example 1:
Input: encoded = [1,2,3], first = 1
Output: [1,0,2,1]
Explanation: If arr = [1,0,2,1], then first = 1 and encoded = [1 XOR 0, 0 XOR 2, 2 XOR 1] = [1,2,3]

Example 2:
Input: encoded = [6,2,7,3], first = 4
Output: [4,2,0,7,4]

Constraints:
2 <= n <= 104
encoded.length == n - 1
0 <= encoded[i] <= 105
0 <= first <= 105
*/

/**
 * Approach:
 * create a newArray and push the first in that.
 * Then create a loop from 1 to the lenght of the encoded length. Then keep finding the XOR of the ecoded[i] and newarray[i] and push it in the newArray
 * the newArray is the result.
 * 
 * PS: c = (a ^ b)   is the XOR of 2 variables
 * to reverse this c ^ a will give the b value
 * Time complexity : O(n);
 */

 var decode = function(encoded, first) {
    let newArray = [first];
    for(let i=0; i<encoded.length; i++){
        newArray.push((encoded[i] ^ newArray[i]));
    }
    return newArray;
};