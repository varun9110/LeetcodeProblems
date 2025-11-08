/**
 * 1611. Minimum One Bit Operations to Make Integers Zero
 * Difficulty: Hard
 * Given an integer n, you must transform it into 0 using the following operations any number of times:

Change the rightmost (0th) bit in the binary representation of n.
Change the ith bit in the binary representation of n if the (i-1)th bit is set to 1 and the (i-2)th through 0th bits are set to 0.
Return the minimum number of operations to transform n into 0.

Example 1:

Input: n = 3
Output: 2
Explanation: The binary representation of 3 is "11".
"11" -> "01" with the 2nd operation since the 0th bit is 1.
"01" -> "00" with the 1st operation.
Example 2:
Input: n = 6
Output: 4
Explanation: The binary representation of 6 is "110".
"110" -> "010" with the 2nd operation since the 1st bit is 1 and 0th through 0th bits are 0.
"010" -> "011" with the 1st operation.
"011" -> "001" with the 2nd operation since the 0th bit is 1.
"001" -> "000" with the 1st operation.
 
Constraints:
0 <= n <= 109
 */

/**
 * This method is essentially computing the inverse Gray code.

To find the the i−th Gray code, we can apply the formula:

G(i)=i⊕⌊ 
2
i
​
 ⌋
​
 
In this case we are reversing that process:

given the “Gray code”, we compute the i or the binary number that represents the number of operations
The inverse Gray code can be expressed recursively in terms of integer division:

i=G+2⌊ 
2
i
​
 ⌋
​
 
Or equivalently, in closed form:

i=G 
0
​
 +2G 
1
​
 +4G 
2
​
 +8G 
3
​
 +…
​
 
Where G 
k
​
  are computed recursively from the Gray code digits g 
k
​
  (most significant bit first):

i 
0
​
 =g 
0
​
 ,i 
k
​
 =g 
k
​
 +2⌊ 
2
i 
k−1
​
 
​
 ⌋ for k≥1
​
 
Thus, that is why building the resulting bit produces a string whose decimal value is the minimum number of operations.

Therefore, it is essentially the inverse Gray code mapping applied to n.

Algorithm
The minimum number of flips can be derived by comparing each bit to the previously processed bit:

If they are the same, no new flip is needed
if they differ, a flip is required.
First, let's initialize a string bit with the first character of s.
Then, iterate over the remaining characters of s.
If the previous bit in bit equals the current bit in s, append 0 to bit.
Otherwise, append 1.
Finally, we convert the final bit string back to an integer.
This integer is the minimum number of operations needed.
 */

/**
 * @param {number} n
 * @return {number}
 */
var minimumOneBitOperations = function(n) {
    const s = n.toString(2);

    let b =  s[0];

    for (let i = 1; i < s.length; i++)
        if (b[i - 1] === s[i])
            b += '0';
        else
            b += '1';

    return parseInt(b, 2);
};