/**
 * 2140. Solving Questions With Brainpower
 * Difficulty: Medium
 * 
 * You are given a 0-indexed 2D integer array questions where questions[i] = [pointsi, brainpoweri].

The array describes the questions of an exam, where you have to process the questions in order (i.e., starting from question 0) and 
make a decision whether to solve or skip each question. Solving question i will earn you pointsi points but you will be unable to solve each of the next brainpoweri questions. 
If you skip question i, you get to make the decision on the next question.

For example, given questions = [[3, 2], [4, 3], [4, 4], [2, 5]]:
If question 0 is solved, you will earn 3 points but you will be unable to solve questions 1 and 2.
If instead, question 0 is skipped and question 1 is solved, you will earn 4 points but you will be unable to solve questions 2 and 3.
Return the maximum points you can earn for the exam.

Example 1:
Input: questions = [[3,2],[4,3],[4,4],[2,5]]
Output: 5
Explanation: The maximum points can be earned by solving questions 0 and 3.
- Solve question 0: Earn 3 points, will be unable to solve the next 2 questions
- Unable to solve questions 1 and 2
- Solve question 3: Earn 2 points
Total points earned: 3 + 2 = 5. There is no other way to earn 5 or more points.
Example 2:
Input: questions = [[1,1],[2,2],[3,3],[4,4],[5,5]]
Output: 7
Explanation: The maximum points can be earned by solving questions 1 and 4.
- Skip question 0
- Solve question 1: Earn 2 points, will be unable to solve the next 2 questions
- Unable to solve questions 2 and 3
- Solve question 4: Earn 5 points
Total points earned: 2 + 5 = 7. There is no other way to earn 7 or more points.
 

Constraints:

1 <= questions.length <= 105
questions[i].length == 2
1 <= pointsi, brainpoweri <= 105
 */


/**
 * 🧠 Intuition
The problem can be seen as a Dynamic Programming (DP) problem where at each question, we have two choices:
1️⃣ Take the question → Earn points and skip the next questions[idx][1] questions.
2️⃣ Skip the question → Move to the next question without earning points.
We need to maximize the total points earned while following these rules.

🚀 Approach
We use recursion with memoization (Top-Down DP) to avoid redundant calculations.

Steps:
🔹 Define a function solve(idx), which calculates the maximum points starting from idx.
🔹 If idx >= n, return 0 (base case).
🔹 If the result for idx is already computed, return it from dp.
🔹 Otherwise, compute the max score by:

Taking the question: solve(idx + questions[idx][1] + 1) + questions[idx][0]
Skipping the question: solve(idx + 1)
🔹 Store the result in dp[idx] and return the maximum of the two choices.
📌 Test Case Explanation
⏳ Complexity
Time complexity:

Since each index is computed once and stored in dp, the complexity is O(n).
Space complexity:

We use O(n) space for the dp array and O(n) recursive stack calls (in the worst case).
 */


/**
 * @param {number[][]} questions
 * @return {number}
 */

// Function to calculate the maximum points using recursion + memoization
var solve= (idx, n, questions, dp) => {
    // Base Case: If index exceeds number of questions, return 0 (No more questions left)
    if (idx >= n) {
        return 0;
    }

    // If already computed, return stored result (Memoization step)
    if (dp[idx] !== -1) {
        return dp[idx];
    }

    // **Choice 1: Take the current question**
    // - Add the points from the current question
    // - Move to the next question after skipping `questions[idx][1]` questions
    let take = questions[idx][0] + solve(idx + questions[idx][1] + 1, n, questions, dp);

    // **Choice 2: Skip the current question**
    let notTake = solve(idx + 1, n, questions, dp);

    // Store the maximum result in dp array and return it
    dp[idx] = Math.max(take, notTake);
    return dp[idx];
}

var mostPoints = function(questions) {
    let n = questions.length; // Get total number of questions
    let dp = new Array(n + 1).fill(-1); // DP array to store results

    return solve(0, n, questions, dp); // Start solving from the first question
};