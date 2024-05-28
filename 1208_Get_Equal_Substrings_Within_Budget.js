/**
 * 1208. Get Equal Substrings Within Budget
 * Difficulty: Medium
 * 
 * You are given two strings s and t of the same length and an integer maxCost.

You want to change s to t. Changing the ith character of s to ith character of t costs |s[i] - t[i]| 
(i.e., the absolute difference between the ASCII values of the characters).

Return the maximum length of a substring of s that can be changed to be the same as the corresponding substring of t with a 
cost less than or equal to maxCost. If there is no substring from s that can be changed to its corresponding substring from t, return 0.

Example 1:
Input: s = "abcd", t = "bcdf", maxCost = 3
Output: 3
Explanation: "abc" of s can change to "bcd".
That costs 3, so the maximum length is 3.
Example 2:
Input: s = "abcd", t = "cdef", maxCost = 3
Output: 1
Explanation: Each character in s costs 2 to change to character in t,  so the maximum length is 1.
Example 3:
Input: s = "abcd", t = "acde", maxCost = 0
Output: 1
Explanation: You cannot make any change, so the maximum length is 1.

Constraints:
1 <= s.length <= 105
t.length == s.length
0 <= maxCost <= 106
s and t consist of only lowercase English letters.
 */


/**
 * Approach 1: 
 * Brute Force.
 * create a loop through the string and then add a cost counter, followed by inner while loop to interate through from i till the end of the length
 * check if the cost is <= maxCost in that case find the substring length and compare it with the result and store it in the result
 * 
 * return the result
 * Complexity of O(n^2)
 */

var equalSubstring = function(s, t, maxCost) {
    let result = 0;
    for(let i=0; i<s.length; i++){
        let cost = 0;
        let j=i;
        while(cost<=maxCost && j<s.length){
            cost += Math.abs(s.charCodeAt(j) - t.charCodeAt(j))
            if(cost<= maxCost){
                result = Math.max(result, (j-i+1))
            }
            j++;
        }
    }
    return result
};


/**
 * Approach - Sliding Window approach
 * 
1. Initialize Variables:
start to mark the beginning of the sliding window.
current_cost to keep track of the total transformation cost of the current window.
max_length to store the maximum length of a valid window found.

2. Iterate through the String:
Use end as the current end of the window.
For each character at end, compute the cost to convert s[end] to t[end] and add it to current_cost.

3. Adjust the Window:
If current_cost exceeds maxCost, increment start to shrink the window from the left, 
subtracting the cost of the character at start from current_cost, until the total cost is within the allowed limit.

4. Update the Maximum Length:
After adjusting the window, compare its size (end - start + 1) with max_length and update max_length if the current window is larger.

5. Return the Result:
The maximum valid window length found during the iteration is returned as the result.

Complexity
Time complexity:
O(n)O(n)O(n), where n is the length of the string s (or t). This is because each character is processed at most 
twice (once when expanding the window and once when shrinking it).

Space complexity:
O(1)O(1)O(1), as we are using a constant amount of extra space regardless of the input size.
 */

var equalSubstring = function(s, t, maxCost) {
    let n = s.length;
    let start = 0;
    let currentCost = 0;
    let maxLength = 0;

    for (let end = 0; end < n; end++) {
        currentCost += Math.abs(s.charCodeAt(end) - t.charCodeAt(end));

        while (currentCost > maxCost) {
            currentCost -= Math.abs(s.charCodeAt(start) - t.charCodeAt(start));
            start++;
        }

        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
};