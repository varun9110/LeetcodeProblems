/**
 * 1717. Maximum Score From Removing Substrings
 * Difficulty: Medium
 * 
 * You are given a string s and two integers x and y. You can perform two types of operations any number of times.

Remove substring "ab" and gain x points.
For example, when removing "ab" from "cabxbae" it becomes "cxbae".
Remove substring "ba" and gain y points.
For example, when removing "ba" from "cabxbae" it becomes "cabxe".
Return the maximum points you can gain after applying the above operations on s.

 

Example 1:

Input: s = "cdbcbbaaabab", x = 4, y = 5
Output: 19
Explanation:
- Remove the "ba" underlined in "cdbcbbaaabab". Now, s = "cdbcbbaaab" and 5 points are added to the score.
- Remove the "ab" underlined in "cdbcbbaaab". Now, s = "cdbcbbaa" and 4 points are added to the score.
- Remove the "ba" underlined in "cdbcbbaa". Now, s = "cdbcba" and 5 points are added to the score.
- Remove the "ba" underlined in "cdbcba". Now, s = "cdbc" and 5 points are added to the score.
Total score = 5 + 4 + 5 + 5 = 19.
Example 2:

Input: s = "aabbaaxybbaabb", x = 5, y = 4
Output: 20
 

Constraints:

1 <= s.length <= 105
1 <= x, y <= 104
s consists of lowercase English letters.
 */


/**
 * Approach 1: Greedy With Stack
Intuition
If you understand this approach - you will understand all others. Let's look closer at the problem:

First of all, let's say we have string aba. What we want to remove here? Obviously we want to remove ab if x > y and ba in the other case. 
So this suggest that this problem is Greedy - we want to remove first all the substrings that will give us the most points.
Now, you need only one pass to ensure that you removed all possible substrings ab or ba. Here's why, 
for example, if you removed all ab from initial s you will never get any ab while removing ba after that:
When you removed all ab you removed ALL a that have b on the right of it.
Let's say we removed ba now and get ab (character a from the left of the b and character b on the right of the a, 
so after deleting ba strings concatenate into ab).
But stop, "character b on the fight of the a", but didn't I tell you one point back that we deleted ALL a that have b on right? 
This conclude my prove, you can prove so for ba as well, because situations are symmetrical.
Now if you understand this points (and I strongly believe you do, if not - please be free to ask questions in comments), 
all that remains is the way we will remove this "ab" or "ba" which is technical problem. Let's look at the dry run for 
my explanations and then look at two ways to code this problem (second solution has the same logic)
Dry run
As you guys liked the idea of dry run let's look at this example:

s = "axtababab"
x = 3
y = 4

Initial Conditions
String s = "axtababab"
x = 3
y = 4
Determining the Order of Substring Removal
top = "ba", top_score = 4
bot = "ab", bot_score = 3
 */

/**
 * @param {string} s
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var maximumGain = function(s, x, y) {
    let res = 0;
    let top, bot;
    let top_score, bot_score;

    if (y > x) {
        top = "ba";
        top_score = y;
        bot = "ab";
        bot_score = x;
    } else {
        top = "ab";
        top_score = x;
        bot = "ba";
        bot_score = y;
    }

    // Removing first top substrings cause they give more points
    let stack = [];
    for (let char of s) {
        if (char == top[1] && stack.length > 0 && stack[stack.length - 1] == top[0]) {
            res += top_score;
            stack.pop();
        } else {
            stack.push(char);
        }
    }

    // Removing bot substrings cause they give less or equal amount of scores
    let new_stack = [];
    for (let char of stack) {
        if (char == bot[1] && new_stack.length > 0 && new_stack[new_stack.length - 1] == bot[0]) {
            res += bot_score;
            new_stack.pop();
        } else {
            new_stack.push(char);
        }
    }

    return res;
};