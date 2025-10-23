/**
 * 3461. Check If Digits Are Equal in String After Operations I
 * Difficulty: Easy
 * 
 * You are given a string s consisting of digits. Perform the following operation repeatedly until the string has exactly two digits:

For each pair of consecutive digits in s, starting from the first digit, calculate a new digit as the sum of the two digits modulo 10.
Replace s with the sequence of newly calculated digits, maintaining the order in which they are computed.
Return true if the final two digits in s are the same; otherwise, return false.

 

Example 1:

Input: s = "3902"

Output: true

Explanation:

Initially, s = "3902"
First operation:
(s[0] + s[1]) % 10 = (3 + 9) % 10 = 2
(s[1] + s[2]) % 10 = (9 + 0) % 10 = 9
(s[2] + s[3]) % 10 = (0 + 2) % 10 = 2
s becomes "292"
Second operation:
(s[0] + s[1]) % 10 = (2 + 9) % 10 = 1
(s[1] + s[2]) % 10 = (9 + 2) % 10 = 1
s becomes "11"
Since the digits in "11" are the same, the output is true.
Example 2:

Input: s = "34789"

Output: false

Explanation:

Initially, s = "34789".
After the first operation, s = "7157".
After the second operation, s = "862".
After the third operation, s = "48".
Since '4' != '8', the output is false.
 

Constraints:

3 <= s.length <= 100
s consists of only digits.
 */

/**
 * APPROACH
To solve this in linear time complexity. We can use Pascal's Triangle and binomial coefficients.

When we repeatedly apply the consecutive sum operation, the final two digits can be computed directly using a mathematical formula based on binomial coefficients.

WHAT'S IS THE PATTERN
Consider how each final digit is formed from the original string:

For a string of length n+1, after all operations:

The left final digit is a weighted sum of original digits at positions 0 to n−1
The right final digit is a weighted sum of original digits at positions 1 to n
The weights follow binomial coefficients from Pascal's Triangle row n−1.

For example, with s=‘‘3902" (length: 4, so n=3):

After operations, we get two final digits:
Left Digit:
    uses positions [0,1,2] with weights from:

( 
0
2
​
 ),( 
1
2
​
 ),( 
2
2
​
 )
​
 
Right Digit:
     Similarly, it uses positions [0,1,2] with weights from:

( 
0
2
​
 ),( 
1
2
​
 ),( 
2
2
​
 )
​
 
Since we only care about digits mod10, we compute everything modulo 10.

Let's take a look at the examples:
image.png

image.png

In this problem, we need ( 
k
n
​
 )mod10.

Since 10=2×5, we use the Chinese Remainder Theorem:

Compute ( 
k
n
​
 )mod2 using Lucas' Theorem with p=2
Compute ( 
k
n
​
 )mod5 using Lucas' Theorem with p=5
Combine results to get ( 
k
n
​
 )mod10
The getMod10 function implements this by converting n and k to base-2 and base-5, computing binomial coefficients for each digit pair, then reconstructing the result modulo 10

LUCAS ALGORITHM FULL EXPLANATION:
The algorithm directly computes the final two digits without simulation:

left
right
​
  
= 
i=0
∑
n−1
​
 ( 
i
n−1
​
 )⋅s[i](mod10)
= 
i=1
∑
n
​
 ( 
i−1
n−1
​
 )⋅s[i](mod10)
​
 
Where ( 
i
n−1
​
 ) represents the binomial coefficient computed modulo 10.

Algorithm
Putting everything together:

Initialize variables:

n= length of string −1
left=0 (accumulator for left final digit)
right=0 (accumulator for right final digit)
Process each digit: For each position i from 0 to n:

• Get digit value:

val=s[i]−48
​
 
• Contribute to left digit (if i≤n−1):

left=(left+getMod10(n−1,i)×val)mod10
​
 
• Contribute to right digit (if i≥1):

right=(right+getMod10(n−1,i−1)×val)mod10
​
 
Finally, if left=right, return true. Otherwise, false.

Actual Simulation Approach: O(n 
2
 )
 */

 /**
 * @param {string} s
 * @return {boolean}
 */

const getMod10 = (n, i) => {
    const fast5 = [
        [1,0,0,0,0],
        [1,1,0,0,0],
        [1,2,1,0,0],
        [1,3,3,1,0],
        [1,4,1,4,1]
    ];

    const xunzhi = [
        [0,6,2,8,4],
        [5,1,7,3,9]
    ];

    let mod2 = 1;
    let mod5 = 1;

    let a = n, b = i;
    while (a > 0 || b > 0) {
        const na = a & 1;
        const nb = b & 1;
        if (nb && !na) {
            mod2 = 0;
            break;
        }
        a >>= 1;
        b >>= 1;
    }

    a = n;
    b = i;
    while (a > 0 || b > 0) {
        const na = a % 5;
        const nb = b % 5;
        mod5 = (mod5 * fast5[na][nb]) % 5;
        a = (a / 5) | 0;
        b = (b / 5) | 0;
    }

    return xunzhi[mod2][mod5];
};

var hasSameDigits = function(s) {
    const n = s.length - 1;
    let left = 0;
    let right = 0;

    for (let i = 0; i <= n; i++) {
        const val = s.charCodeAt(i) - 48;
        if (i <= n - 1)
            left = (left + getMod10(n - 1, i) * val) % 10;
        if (i >= 1)
            right = (right + getMod10(n - 1, i - 1) * val) % 10;
    }

    return left === right;
};