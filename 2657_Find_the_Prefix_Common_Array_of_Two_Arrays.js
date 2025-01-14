/**
 * 2657. Find the Prefix Common Array of Two Arrays
 * Difficulty: Medium,
 * 
 * You are given two 0-indexed integer permutations A and B of length n.

A prefix common array of A and B is an array C such that C[i] is equal to the count of numbers that are present at or before the index i in both A and B.

Return the prefix common array of A and B.

A sequence of n integers is called a permutation if it contains all integers from 1 to n exactly once.

Example 1:

Input: A = [1,3,2,4], B = [3,1,2,4]
Output: [0,2,3,4]
Explanation: At i = 0: no number is common, so C[0] = 0.
At i = 1: 1 and 3 are common in A and B, so C[1] = 2.
At i = 2: 1, 2, and 3 are common in A and B, so C[2] = 3.
At i = 3: 1, 2, 3, and 4 are common in A and B, so C[3] = 4.
Example 2:

Input: A = [2,3,1], B = [3,1,2]
Output: [0,1,3]
Explanation: At i = 0: no number is common, so C[0] = 0.
At i = 1: only 3 is common in A and B, so C[1] = 1.
At i = 2: 1, 2, and 3 are common in A and B, so C[2] = 3.
 

Constraints:

1 <= A.length == B.length == n <= 50
1 <= A[i], B[i] <= n
It is guaranteed that A and B are both a permutation of n integers.
 */

/**
 * 🔍 Intuition
To find the prefix common array ( C[i] ), we need to count how many numbers are common in ( A ) and ( B ) up to index ( i ).

Key observations:

Both ( A ) and ( B ) are permutations, meaning all integers from ( 1 ) to ( n ) are present exactly once.
We can use an auxiliary structure to track which elements have been encountered in both arrays.
🛠️ Approach 1: Using a Frequency Array
Use an array ( {seen} ) of size ( n+1 ) to track numbers encountered in ( A ) and ( B ).
For each index ( i ), check the current elements in ( A[i] ) and ( B[i] ).
If an element is seen once, mark it. If seen twice, increment the common count.
🔑 Key Idea:
Track the occurrences of each number and update the common count when a number is seen twice.

⏱️ Complexity:
Time Complexity: ( O(n) ), as we traverse the arrays once.
Space Complexity: ( O(n) ), for the auxiliary array.
 */

/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var findThePrefixCommonArray = function(A, B) {
    let n = A.length;
    let freq = new Array(n + 1).fill(0);
    let ans = [];
    let common = 0;

    for (let i = 0; i < n; i++) {
        if (++freq[A[i]] === 2) common++;
        if (++freq[B[i]] === 2) common++;
        ans.push(common);
    }
    return ans;
};