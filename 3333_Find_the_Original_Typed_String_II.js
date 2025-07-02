/**
 * 3333. Find the Original Typed String II
 * Difficulty: Hard
 * 
 * Alice is attempting to type a specific string on her computer. However, she tends to be clumsy and may press a key for too long, resulting in a character being typed multiple times.

You are given a string word, which represents the final output displayed on Alice's screen. You are also given a positive integer k.

Return the total number of possible original strings that Alice might have intended to type, if she was trying to type a string of size at least k.

Since the answer may be very large, return it modulo 109 + 7.

 

Example 1:

Input: word = "aabbccdd", k = 7

Output: 5

Explanation:

The possible strings are: "aabbccdd", "aabbccd", "aabbcdd", "aabccdd", and "abbccdd".

Example 2:

Input: word = "aabbccdd", k = 8

Output: 1

Explanation:

The only possible string is "aabbccdd".

Example 3:

Input: word = "aaabbb", k = 3

Output: 8

 

Constraints:

1 <= word.length <= 5 * 105
word consists only of lowercase English letters.
1 <= k <= 2000
 */

/**
 * A word representing what was typed.
An integer k, the minimum intended length of the original string.
Alice might have long-pressed some characters. Each such pressed group (a block of equal characters) could have been typed only once or multiple times.

Return the total number of possible original strings Alice could have intended to type, where:

The length of the original string is at least k.
Modulo: 10 
9
 +7.

How to Solve?

Step 1: Run-Length Decomposition
Split the typed word into blocks of repeated characters.

Let:

word= 
3
aaa
​
 
​
  
2
bb
​
 
​
  
3
ccc
​
 
​
 ⇒block=[3,2,3]
​
 
Each block can be "collapsed" to a character count from 1 up to its size.

Step 2: Combinatorial Counting
We want to compute how many ways to pick a number of characters from each block such that:

sum of picks≥k
​
 
Given:

cnt = number of blocks
total number of possible subsequences of exactly cnt blocks = pick at least 1 character per block
This reduces to counting integer compositions with bounded values and a minimal sum constraint.

Formulation

Let the block array be:

B=[b 
0
​
 ,b 
1
​
 ,…,b 
n−1
​
 ]
​
 
Each b 
i
​
  represents a group of equal characters.

Let:

x 
i
​
  be the number of characters selected from block i
Each x 
i
​
  must be at least 1 and at most b 
i
​
 
The total number of valid (x 
0
​
 ,...,x 
n−1
​
 ) such that:
∑x 
i
​
 ≥k
​
 
is the desired answer.

Dynamic Programming Approach

Let:

dp[i][j]: number of ways to assign characters from blocks i to n-1 such that total extra characters used = j
Where:

"extra" = total characters beyond the minimum (1 per block)
Range of j: from 0 to k - n (since n characters are already used minimally)
Transition
From block i, you can choose up to b 
i
​
 −1 extra characters.

We use suffix sum optimizations to ensure transitions are O(1).

Algorithm Flow
Run-length encode the string → block[]
If k <= block.length, return product of block[i]
This means every block contributes exactly 1 character → total length ≥ k
Else initialize dp with:
dp[i][j]: number of assignments for blocks i to n-1 with j extra characters to use
Build dp table bottom-up using suffix sums
Final result is dp[0][0]
 */

/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
const possibleStringCount = (word, k) => {
    const MOD = 1e9 + 7;
    const len = word.length;
    if (len === k) return 1;

    const block = [];
    let i = 0;
    while (i < len) {
        let j = i + 1;
        while (j < len && word[j] === word[j - 1]) j++;
        block.push(j - i);
        i = j;
    }

    const cnt = block.length;
    const mult = Array(cnt).fill(0);
    mult[cnt - 1] = block[cnt - 1];
    for (i = cnt - 2; i >= 0; i--) {
        mult[i] = (mult[i + 1] * block[i]) % MOD;
    }

    if (cnt >= k) return mult[0];

    const dp = Array.from({ length: cnt }, () => Array(k - cnt + 1).fill(0));
    for (i = 0; i <= k - cnt; i++) {
        if (block[cnt - 1] + i + cnt > k) {
            dp[cnt - 1][i] = block[cnt - 1] - (k - cnt - i);
        }
    }

    for (i = cnt - 2; i >= 0; i--) {
        let sum = (dp[i + 1][k - cnt] * block[i]) % MOD;
        for (let j = k - cnt; j >= 0; j--) {
            sum = (sum + dp[i + 1][j]) % MOD;
            const next = j + block[i];
            if (next > k - cnt) {
                sum = (sum - dp[i + 1][k - cnt] + MOD) % MOD;
            } else {
                sum = (sum - dp[i + 1][next] + MOD) % MOD;
            }
            dp[i][j] = sum;
        }
    }

    return dp[0][0];
    
};