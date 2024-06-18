/**
 * 826. Most Profit Assigning Work
 * Difficulty: Medium
 * 
 * You have n jobs and m workers. You are given three arrays: difficulty, profit, and worker where:

difficulty[i] and profit[i] are the difficulty and the profit of the ith job, and
worker[j] is the ability of jth worker (i.e., the jth worker can only complete a job with difficulty at most worker[j]).
Every worker can be assigned at most one job, but one job can be completed multiple times.

For example, if three workers attempt the same job that pays $1, then the total profit will be $3. If a worker cannot complete any job, their profit is $0.
Return the maximum profit we can achieve after assigning the workers to the jobs.

 

Example 1:

Input: difficulty = [2,4,6,8,10], profit = [10,20,30,40,50], worker = [4,5,6,7]
Output: 100
Explanation: Workers are assigned jobs of difficulty [4,4,6,6] and they get a profit of [20,20,30,30] separately.
Example 2:

Input: difficulty = [85,47,57], profit = [24,66,99], worker = [40,25,25]
Output: 0
 

Constraints:

n == difficulty.length
n == profit.length
m == worker.length
1 <= n, m <= 104
1 <= difficulty[i], profit[i], worker[i] <= 105
 */

/**
 * Approach
Initialization:

Determine the maximum job difficulty.
Initialize a maxProfitUpToDifficulty array to store the maximum profit for each difficulty level up to the maximum difficulty.
Fill the Profit Lookup Table:

For each job, update the maxProfitUpToDifficulty array to ensure it holds the maximum profit for the given difficulty.
Convert the maxProfitUpToDifficulty array to a cumulative maximum profit array, where each index i will have the maximum profit possible for difficulties from 0 to i.
Calculate Total Profit:

For each worker, use their ability to look up the corresponding maximum profit from the maxProfitUpToDifficulty array and sum up the total profit.
Complexity
Time Complexity: ( O(n + m + d) ), where ( n ) is the number of jobs, ( m ) is the number of workers, and ( d ) is the maximum difficulty.
Space Complexity: ( O(d) ) for the maxProfitUpToDifficulty array.

 */

var maxProfitAssignment = function(difficulty, profit, worker) {
    let maxDifficulty = Math.max(...difficulty);
    let maxProfitUpToDifficulty = new Array(maxDifficulty + 1).fill(0);

    for (let i = 0; i < difficulty.length; i++) {
        maxProfitUpToDifficulty[difficulty[i]] = Math.max(maxProfitUpToDifficulty[difficulty[i]], profit[i]);
    }

    for (let i = 1; i <= maxDifficulty; i++) {
        maxProfitUpToDifficulty[i] = Math.max(maxProfitUpToDifficulty[i], maxProfitUpToDifficulty[i - 1]);
    }

    let totalProfit = 0;
    for (let ability of worker) {
        if (ability > maxDifficulty) {
            totalProfit += maxProfitUpToDifficulty[maxDifficulty];
        } else {
            totalProfit += maxProfitUpToDifficulty[ability];
        }
    }

    return totalProfit;
};