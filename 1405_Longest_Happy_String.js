/**
 * 1405. Longest Happy String
 * Difficulty: Medium
 * A string s is called happy if it satisfies the following conditions:

s only contains the letters 'a', 'b', and 'c'.
s does not contain any of "aaa", "bbb", or "ccc" as a substring.
s contains at most a occurrences of the letter 'a'.
s contains at most b occurrences of the letter 'b'.
s contains at most c occurrences of the letter 'c'.
Given three integers a, b, and c, return the longest possible happy string. If there are multiple longest happy strings, return any of them. 
If there is no such string, return the empty string "".

A substring is a contiguous sequence of characters within a string.

 

Example 1:

Input: a = 1, b = 1, c = 7
Output: "ccaccbcc"
Explanation: "ccbccacc" would also be a correct answer.
Example 2:

Input: a = 7, b = 1, c = 0
Output: "aabaa"
Explanation: It is the only correct answer in this case.
 

Constraints:

0 <= a, b, c <= 100
a + b + c > 0
 */

/**
 * Intuition
The problem asks to construct the longest possible string using the letters 'a', 'b', and 'c' such that:

No three consecutive characters are the same.
The counts of 'a', 'b', and 'c' do not exceed the given values a, b, and c respectively.
The intuition here is that we should always aim to use the character with the highest count, 
while ensuring that it does not violate the "no three consecutive characters" rule. A greedy approach works well here because we can construct 
the string step by step by selecting the most available character, and if adding that character leads to three consecutive letters, we switch to the next 
most available character.

Approach
Greedy Strategy: Always try to use the character with the highest remaining count. If that character has been used twice consecutively, switch to the next most 
frequent character.
Priority Queue: Use a max-heap (or priority queue) to keep track of the character counts. This ensures that at every step, we can easily pick the character with the 
highest remaining count.
Condition Handling: If the character with the highest count has been used twice in a row, we temporarily switch to the second-highest character to avoid 
three consecutive characters.
Stop When No Characters Left: The process stops when no more characters can be added without violating the conditions.
Complexity
Time complexity:
O(n) where (n = a + b + c) since each character is processed at most once and we make at most 3 log operations per step (for the heap).

Space complexity:
O(1) for the priority queue, as we store a maximum of three characters. The result string takes (O(n)), but that is required for the output, 
so the effective auxiliary space is constant.

 */

var longestDiverseString = function(a, b, c) {
    // Priority queue to keep the characters sorted by count.
    const pq = [];
    if (a > 0) pq.push([a, 'a']);
    if (b > 0) pq.push([b, 'b']);
    if (c > 0) pq.push([c, 'c']);
    pq.sort((x, y) => y[0] - x[0]);  // Sort in descending order.

    let result = "";

    while (pq.length > 0) {
        let [count1, char1] = pq.shift();

        // If last two characters are the same as char1, pick the next one.
        if (result.length >= 2 && result[result.length - 1] === char1 && result[result.length - 2] === char1) {
            if (pq.length === 0) break;

            let [count2, char2] = pq.shift();
            result += char2;
            if (--count2 > 0) pq.push([count2, char2]);

            pq.push([count1, char1]);  // Push char1 back for later use.
        } else {
            result += char1;
            if (--count1 > 0) pq.push([count1, char1]);
        }

        pq.sort((x, y) => y[0] - x[0]);  // Sort after each modification.
    }

    return result;
};