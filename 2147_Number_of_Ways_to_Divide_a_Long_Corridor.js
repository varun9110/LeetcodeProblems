/**
 * 2147. Number of Ways to Divide a Long Corridor
 * Difficulty: Hard
 * 
 * Along a long library corridor, there is a line of seats and decorative plants. You are given a 0-indexed string corridor of length n consisting of letters 'S' and 'P' where each 'S' represents a seat and each 'P' represents a plant.

One room divider has already been installed to the left of index 0, and another to the right of index n - 1. Additional room dividers can be installed. For each position between indices i - 1 and i (1 <= i <= n - 1), at most one divider can be installed.

Divide the corridor into non-overlapping sections, where each section has exactly two seats with any number of plants. There may be multiple ways to perform the division. Two ways are different if there is a position with a room divider installed in the first way but not in the second way.

Return the number of ways to divide the corridor. Since the answer may be very large, return it modulo 109 + 7. If there is no way, return 0.

 

Example 1:


Input: corridor = "SSPPSPS"
Output: 3
Explanation: There are 3 different ways to divide the corridor.
The black bars in the above image indicate the two room dividers already installed.
Note that in each of the ways, each section has exactly two seats.
Example 2:


Input: corridor = "PPSPSP"
Output: 1
Explanation: There is only 1 way to divide the corridor, by not installing any additional dividers.
Installing any would create some section that does not have exactly two seats.
Example 3:


Input: corridor = "S"
Output: 0
Explanation: There is no way to divide the corridor because there will always be a section that does not have exactly two seats.
 

Constraints:

n == corridor.length
1 <= n <= 105
corridor[i] is either 'S' or 'P'.
 */

/**
 * Intuition
The problem requires us to find the number of ways to traverse a corridor that consists of empty spaces (P) and seats (S). The task is to identify the possible ways of moving from one seat to another, following a specific set of rules. We can think of it as a dynamic programming problem where we keep track of the different ways we can encounter seats as we traverse the corridor.

Approach
Initialization: Start by initializing three variables: zero, one, and two. These will track the number of ways to reach a seat while considering various constraints, such as whether the previous seat was occupied, or whether we've reached the end.
Loop Through the Corridor: Iterate through each character in the string representing the corridor. If the current character is a seat (S), update zero, one, and two accordingly.
Dynamic Updates: If the current character is an empty space (P), we accumulate the count of valid moves into the two variable, which represents the possible moves for that particular step.
Modulo Operation: Use modulo operation to prevent overflow of large numbers and to keep the calculations within the specified range.
Return the Result: Finally, return the number of valid moves possible, represented by the zero variable.
Complexity
Time Complexity:
The time complexity of this approach is O(n), where n is the length of the corridor string. This is because we are iterating through the corridor only once.
Space Complexity:
The space complexity is O(1), as we only use a constant amount of extra space for the zero, one, and two variables.
 */

/**
 * @param {string} corridor
 * @return {number}
 */
var numberOfWays = function(corridor) {
    const mod = 10**9 + 7;
    let zero = 0;
    let one = 0;
    let two = 1;
    
    for (let i of corridor) {
        if (i === 'S') {
            zero = one;
            [one, two] = [two, one];
        } else {
            two = (two + zero) % mod;
        }
    }
    return zero;
};