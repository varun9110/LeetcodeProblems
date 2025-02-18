/**
 * 2375. Construct Smallest Number From DI String
 * Difficulty: Medium
 * 
 * You are given a 0-indexed string pattern of length n consisting of the characters 'I' meaning increasing and 'D' meaning decreasing.

A 0-indexed string num of length n + 1 is created using the following conditions:

num consists of the digits '1' to '9', where each digit is used at most once.
If pattern[i] == 'I', then num[i] < num[i + 1].
If pattern[i] == 'D', then num[i] > num[i + 1].
Return the lexicographically smallest possible string num that meets the conditions.

 

Example 1:

Input: pattern = "IIIDIDDD"
Output: "123549876"
Explanation:
At indices 0, 1, 2, and 4 we must have that num[i] < num[i+1].
At indices 3, 5, 6, and 7 we must have that num[i] > num[i+1].
Some possible values of num are "245639871", "135749862", and "123849765".
It can be proven that "123549876" is the smallest possible num that meets the conditions.
Note that "123414321" is not possible because the digit '1' is used more than once.
Example 2:

Input: pattern = "DDD"
Output: "4321"
Explanation:
Some possible values of num are "9876", "7321", and "8742".
It can be proven that "4321" is the smallest possible num that meets the conditions.
 

Constraints:

1 <= pattern.length <= 8
pattern consists of only the letters 'I' and 'D'.
 */

/**
 * 🔥 Intuition
We need the smallest lexicographical permutation of digits (1-9) that follows the given pattern of:
✅ I (Increasing) → Append the next smallest digit immediately.
✅ D (Decreasing) → Delay appending, store numbers in a buffer, and add them in reverse order.

How did this idea come up? 🤔
We greedily place the smallest number at each step.
If we see D, we stack numbers in temp until we get I, then flush them in reverse order for the smallest result.
📊 Stepwise Execution Example
Pattern → "IDID"
We track temp (buffer for D sequences) and ans (final answer being built).

Step 🔢	Pattern	temp (🛑 Buffer)	ans (✅ Final String)	Action
1️⃣	I	-	"1"	I → Append '1' immediately
2️⃣	D	"2"	"1"	D → Store '2' in buffer 🛑
3️⃣	I	-	"132"	I → Flush '2' (reverse) & add '3'
4️⃣	D	"4"	"132"	D → Store '4' in buffer 🛑
5️⃣	I	-	"13254"	I → Flush '4' (reverse) & add '5'
✅ Final Answer → "13254"

⏳ Complexity Analysis
Time Complexity: O(n) → Each character is processed once, and flushing temp takes constant time.
Space Complexity: O(n) → temp buffer can hold up to n elements in the worst case.
 */

/**
 * @param {string} pattern
 * @return {string}
 */
var smallestNumber = function(pattern) {
    let ans = ["1"], temp = [];
    for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] === 'I') {
            ans.push(...temp.reverse(), (i + 2).toString());
            temp = [];
        } else {
            temp.push(ans.pop());
            ans.push((i + 2).toString());
        }
    }
    return ans.concat(temp.reverse()).join("");
};