/**
 * 1422. Maximum Score After Splitting a String
 * Difficulty: Easy
 * 
 * Given a string s of zeros and ones, return the maximum score after splitting the string into two non-empty 
 * substrings (i.e. left substring and right substring).

The score after splitting a string is the number of zeros in the left substring plus the number of ones in the right substring.

Example 1:
Input: s = "011101"
Output: 5 
Explanation: 
All possible ways of splitting s into two non-empty substrings are:
left = "0" and right = "11101", score = 1 + 4 = 5 
left = "01" and right = "1101", score = 1 + 3 = 4 
left = "011" and right = "101", score = 1 + 2 = 3 
left = "0111" and right = "01", score = 1 + 1 = 2 
left = "01110" and right = "1", score = 2 + 1 = 3
Example 2:
Input: s = "00111"
Output: 5
Explanation: When left = "00" and right = "111", we get the maximum score = 2 + 3 = 5
Example 3:

Input: s = "1111"
Output: 3
 
Constraints:

2 <= s.length <= 500
The string s consists of characters '0' and '1' only.
 */

/**
 * Intuition
The problem involves splitting a binary string into two non-empty substrings to maximize the score, 
which is defined as the number of zeros in the left substring plus the number of ones in the right substring. To achieve this, 
we need to find the best split point such that this score is maximized.

Approach
Understanding the Score Calculation:

If we split the string at position i, the score is:
Number of zeros in the left substring (zerosCount) + Number of ones in the right substring (totalOnes - onesCount).
totalOnes is the total count of '1's in the string, and onesCount is the count of '1's encountered so far up to position i.
Optimizing the Calculation:

Traverse the string while maintaining counts of zerosCount and onesCount for the left substring as we iterate.
For each split point, calculate the score using the above formula:
[ score = zerosCount + (totalOnes - onesCount) ]
Update the bestScore whenever a higher score is found.
Edge Cases:

Avoid splitting at the very first or last character because both substrings must be non-empty.
The loop stops at inputStr.length() - 1 for this reason.
Implementation:

Count the total number of '1's (totalOnes) in the string initially.
Traverse the string and maintain zerosCount and onesCount.
Compute and update bestScore at each split point.
Complexity
Time Complexity:

Counting the total number of '1's requires (O(n)), where (n) is the length of the string.
Traversing the string to calculate the score also requires (O(n)).
Total time complexity: (O(n)).
Space Complexity:

Only a few integer variables (onesCount, zerosCount, totalOnes, and bestScore) are used.
Total space complexity: (O(1)).
 */

var maxScore = function(s) {
    let totalOnes = 0, zerosCount = 0, onesCount = 0, bestScore = -Infinity;

    // Count total number of ones
    for (const char of s) {
        if (char === '1') totalOnes++;
    }

    // Traverse the string and calculate scores
    for (let i = 0; i < s.length - 1; i++) { // Stop before the last character
        if (s[i] === '0') zerosCount++;
        else onesCount++;

        // Calculate score
        const currentScore = zerosCount + (totalOnes - onesCount);
        bestScore = Math.max(bestScore, currentScore);
    }

    return bestScore;
};
