/**
 * 717. 1-bit and 2-bit Characters
 * We have two special characters:
The first character can be represented by one bit 0.
The second character can be represented by two bits (10 or 11).
Given a binary array bits that ends with 0, return true if the last character must be a one-bit character.

Example 1:
Input: bits = [1,0,0]
Output: true
Explanation: The only way to decode it is two-bit character and one-bit character.
So the last character is one-bit character.
Example 2:
Input: bits = [1,1,1,0]
Output: false
Explanation: The only way to decode it is two-bit character and two-bit character.
So the last character is not one-bit character.
 
Constraints:
1 <= bits.length <= 1000
bits[i] is either 0 or 1.
 */

/**
 * Approach:
 * First check the edge condition, if the length is 1 then return true.
 * else create a while loop, check if the bit is 1 then add 2 to i else 1.
 * at any time if the i is at the last character then return true. else at the end of the loop return false;
 */

var isOneBitCharacter = function(bits) {
    let length = bits.length;
    if(length === 1){
        return true
    }
    let i=0;

    while(i<length){
        if(bits[i] === 1){
            i += 2;
        } else {
            i++;
        }
        if(i === length-1) {
            return true;
        }
    }
    return false;
};

/**
 * Same approach but better code:
 */

var isOneBitCharacter = function (bits) {
    
    let i = 0;
    while (i < bits.length - 1) {
        if (bits[i] === 1) i++;
        i++;
    }
    return bits[i] === 0;
};