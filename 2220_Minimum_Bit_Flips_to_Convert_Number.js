/**
 * 2220. Minimum Bit Flips to Convert Number
 * Difficulty: Easy
 * 
 * A bit flip of a number x is choosing a bit in the binary representation of x and flipping it from either 0 to 1 or 1 to 0.

For example, for x = 7, the binary representation is 111 and we may choose any bit (including any leading zeros not shown) and flip it. 
We can flip the first bit from the right to get 110, flip the second bit from the right to get 101, 
flip the fifth bit from the right (a leading zero) to get 10111, etc.
Given two integers start and goal, return the minimum number of bit flips to convert start to goal.

Example 1:
Input: start = 10, goal = 7
Output: 3
Explanation: The binary representation of 10 and 7 are 1010 and 0111 respectively. We can convert 10 to 7 in 3 steps:
- Flip the first bit from the right: 1010 -> 1011.
- Flip the third bit from the right: 1011 -> 1111.
- Flip the fourth bit from the right: 1111 -> 0111.
It can be shown we cannot convert 10 to 7 in less than 3 steps. Hence, we return 3.
Example 2:

Input: start = 3, goal = 4
Output: 3
Explanation: The binary representation of 3 and 4 are 011 and 100 respectively. We can convert 3 to 4 in 3 steps:
- Flip the first bit from the right: 011 -> 010.
- Flip the second bit from the right: 010 -> 000.
- Flip the third bit from the right: 000 -> 100.
It can be shown we cannot convert 3 to 4 in less than 3 steps. Hence, we return 3.
 

Constraints:

0 <= start, goal <= 109
 */

/**
 * Intuition
The question asks how few bit flips are necessary to change one integer into another. It follows easily that the bits of the two numbers can be compared. 
The amount of flips required will depend on how the bits in the binary representation of start and aim differ from one another. 
The result of a bitwise XOR operation between start and goal is a number where each 1 denotes a location where the bits of the two numbers differ. 
The necessary number of bit flips can be found by counting the 1s in this XOR result.

Approach
XOR the two numbers: Perform a bitwise XOR between start and goal. The result will have 1 in positions where the bits are different between the two numbers.
Count the number of 1s in the XOR result: This tells us the number of positions where the bits differ and hence the number of bit flips required.
Bit counting: Use a loop to repeatedly check the last bit of the XOR result using & 1. Right shift the XOR result (>> 1) to process the next bit. 
Continue until all bits are processed.
Complexity
Time complexity:
The time complexity is O(k), where k is the number of bits in the binary representation of the larger of the two numbers (start or goal).

Space complexity:
The space complexity is O(1).
 */

/**
 * @param {number} start
 * @param {number} goal
 * @return {number}
 */
var minBitFlips = function(start, goal) {
    // XOR to find differing bits between start and goal
    let xorResult = start ^ goal;
    let ans = 0;
    
    // Count the number of 1's in the XOR result
    while (xorResult > 0) {
        ans += xorResult & 1;  
        xorResult >>= 1;        
    }
    
    return ans;
};