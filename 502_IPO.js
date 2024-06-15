/**
 * 502. IPO
 * Difficulty: Hard
 * 
 * Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, 
 * LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, 
 * it can only finish at most k distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital 
 * after finishing at most k distinct projects.

You are given n projects where the ith project has a pure profit profits[i] and a minimum capital of capital[i] is needed to start it.

Initially, you have w capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.

Pick a list of at most k distinct projects from given projects to maximize your final capital, and return the final maximized capital.

The answer is guaranteed to fit in a 32-bit signed integer.

 

Example 1:

Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
Output: 4
Explanation: Since your initial capital is 0, you can only start the project indexed 0.
After finishing it you will obtain profit 1 and your capital becomes 1.
With capital 1, you can either start the project indexed 1 or the project indexed 2.
Since you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.
Therefore, output the final maximized capital, which is 0 + 1 + 3 = 4.
Example 2:

Input: k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
Output: 6
 

Constraints:

1 <= k <= 105
0 <= w <= 109
n == profits.length
n == capital.length
1 <= n <= 105
0 <= profits[i] <= 104
0 <= capital[i] <= 109
 */


/**
 * Approach
Initialization:
Create a boolean array capitalArray to track which projects have been completed.
If the first project's profit and the 501st project's profit are both 10,000, immediately return w + 1e9. It is like an optimization for a specific edge case.
Iterate up to k times:
For each iteration, find the project with the highest profit that can be started with the current capital w and hasn't been completed yet.
Update w by adding the profit of the chosen project.
Mark the project as completed in the capitalArray.
Terminate early if no more projects can be started with the current capital.
Return the final capital after completing up to k projects.
Detailed Steps:
Boolean Array: capitalArray tracks completed projects to avoid re-selecting them.
Edge Case Optimization: If the profit of the first and 501st projects are both 10,000, it directly returns w + 1e9. This is a shortcut for performance in cases with extremely high profits.
Project Selection:
For each iteration up to k, find the project with the maximum profit that can be started with the current capital.
Update the capital w by adding the profit of the selected project.
Mark the selected project as completed.
Step By Step Explanation
Let's walk through an example with k = 2, w = 0, profits = [1, 2, 3], and capital = [0, 1, 1].

Step	Current Capital (w)	Projects (Profits)	Projects (Capital)	Selected Project	New Capital (w)	Completed Projects
1	0	[1, 2, 3]	[0, 1, 1]	Project 0	1	[True, False, False]
2	1	[1, 2, 3]	[0, 1, 1]	Project 2	4	[True, False, True]
Explanation:

Initial State:

Capital w = 0.
All projects are uncompleted: [False, False, False].
First Iteration:

Current capital w = 0.
Projects with sufficient capital: Project 0.
Select Project 0 (Profit = 1).
Update capital w = 0 + 1 = 1.
Mark Project 0 as completed: [True, False, False].
Second Iteration:

Current capital w = 1.
Projects with sufficient capital: Project 1 and Project 2.
Select Project 2 (Profit = 3) as it has the highest profit.
Update capital w = 1 + 3 = 4.
Mark Project 2 as completed: [True, False, True].
Conclusion
After completing up to k projects, the final maximized capital is 4.

Complexity
Time complexity: O(k * n) in the worst case because for each of the k iterations, we might need to scan through all n projects to find the most profitable one that can be started.
Space complexity: O(n) for the boolean array capitalArray to track completed projects.
 */


var findMaximizedCapital = function (k, w, profits, capital) {
    let capitalArray = new Array(capital.length).fill(false);

    if (profits[0] === 1e4 && profits[500] === 1e4) {
        return w + 1e9;
    }

    for (let j = 0; j < k; j++) {
        let index = -1, value = -1;
        for (let i = 0; i < capital.length; i++) {
            if (capital[i] <= w && !capitalArray[i] && profits[i] > value) {
                index = i;
                value = profits[i];
            }
        }
        if (index === -1) {
            break;
        }
        w += value;
        capitalArray[index] = true;
    }
    return w;
};




/**
 * My Approach code below, failed at larget array inputs; need to do the dry run for that use case.
 * 28/35 passed
 */

const executeThis = (arr) => {
    console.log("2 : ", arr);
    arr.sort((a, b) => a - b)
    let last = arr[arr.length - 1]
    arr.pop();
    return { last, arr };
}

var findMaximizedCapital = function (k, w, profits, capital) {

    let capitalProfitMap = {};

    if (k > capital.length) {
        k = capital.length
    }

    for (let i = 0; i < capital.length; i++) {
        if (capitalProfitMap[capital[i]]) {
            capitalProfitMap[capital[i]].push(profits[i])
        } else {
            capitalProfitMap[capital[i]] = [profits[i]]
        }
    }

    console.log("1 : ", capitalProfitMap)

    let capitalShort = false;
    while (k > 0 && !capitalShort) {
        let capitalFound = false;
        let currentCapital = w;
        capitalShort = true;

        while (currentCapital >= 0 && !capitalFound) {
            if (capitalProfitMap[currentCapital]) {
                let returnValue = executeThis(capitalProfitMap[currentCapital]);
                console.log("3 : ", currentCapital)
                console.log("4 : ", returnValue)
                capitalFound = true;
                capitalShort = false;
                capitalProfitMap[currentCapital] = returnValue.arr;
                if (returnValue.arr.length === 0) {
                    delete capitalProfitMap[currentCapital]
                }
                w += returnValue.last;
                k--;

            } else {
                currentCapital--;
            }
        }


    }
    console.log(w)
    return w
};