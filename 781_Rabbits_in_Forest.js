/**
 * 781. Rabbits in Forest
 * Difficulty: Medium
 * 
 * There is a forest with an unknown number of rabbits. We asked n rabbits "How many rabbits have the same color as you?" 
 * and collected the answers in an integer array answers where answers[i] is the answer of the ith rabbit.

Given the array answers, return the minimum number of rabbits that could be in the forest.

 

Example 1:

Input: answers = [1,1,2]
Output: 5
Explanation:
The two rabbits that answered "1" could both be the same color, say red.
The rabbit that answered "2" can't be red or the answers would be inconsistent.
Say the rabbit that answered "2" was blue.
Then there should be 2 other blue rabbits in the forest that didn't answer into the array.
The smallest possible number of rabbits in the forest is therefore 5: 3 that answered plus 2 that didn't.
Example 2:

Input: answers = [10,10,10]
Output: 11
 

Constraints:

1 <= answers.length <= 1000
0 <= answers[i] < 1000
 */

/**
 * Glad you liked the solution! If it helped, a support or upvote would be much appreciated! 😊💙
Stay curious, keep coding, and feel free to ask if you need more help! 🚀🔥
🔍 Problem Understanding
You’re in a forest 🌳 full of colorful rabbits 🐰. You ask some rabbits:

"How many other rabbits have the same color as you?"

Their answers are stored in an array answers[].

for example
answers = [1, 1, 2]
🧠 What does answers[i] = x mean?
It means the i-th rabbit says:

"There are x other rabbits 🐰 that are the same color 🎨 as me."

So, there are (x + 1) rabbits of the same color (including this one).

🔎 Key Insight
If multiple rabbits say the same number x, you can group at most x + 1 rabbits with that same answer into one color group.

But if there are more such rabbits, you need another color group.

example-1 [1,1,2]
Two rabbits say 1 → Each says 1 other like them, i.e., group of size 1 + 1 = 2.

✅ We can group them together. Total: 2 rabbits.

One rabbit says 2 → So group size must be 2 + 1 = 3.

But we have only 1 rabbit answering that!

So we assume there are 2 more rabbits not in the input.

Total: 3 rabbits.

Total minimum rabbits = 2 (for 1's) + 3 (for 2) = 5 ✅
Complexity
Time complexity:
O(N)

Space complexity:
O(N)
 */

/**
 * @param {number[]} answers
 * @return {number}
 */
var numRabbits = function(answers) {
    const count = {};
    for (let a of answers) count[a] = (count[a] || 0) + 1;

    let res = 0;
    for (let [k, v] of Object.entries(count)) {
        let x = parseInt(k);
        res += Math.ceil(v / (x + 1)) * (x + 1);
    }
    return res;
};