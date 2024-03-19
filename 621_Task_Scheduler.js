/**
 * 621. Task Scheduler
 * Difficulty: Medium
 * 
 * You are given an array of CPU tasks, each represented by letters A to Z, and a cooling time, n. 
 * Each cycle or interval allows the completion of one task. Tasks can be completed in any order, 
 * but there's a constraint: identical tasks must be separated by at least n intervals due to cooling time.

​Return the minimum number of intervals required to complete all tasks.

Example 1:
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.
After completing task A, you must wait two cycles before doing A again. The same applies to task B. 
In the 3rd interval, neither A nor B can be done, so you idle. By the 4th cycle, you can do A again as 2 intervals have passed.
Example 2:
Input: tasks = ["A","C","A","B","D","B"], n = 1
Output: 6
Explanation: A possible sequence is: A -> B -> C -> D -> A -> B.
With a cooling interval of 1, you can repeat a task after just one other task.
Example 3:
Input: tasks = ["A","A","A", "B","B","B"], n = 3
Output: 10
Explanation: A possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.
There are only two types of tasks, A and B, which need to be separated by 3 intervals. This leads to idling twice between repetitions of these tasks.
Constraints:
1 <= tasks.length <= 104
tasks[i] is an uppercase English letter.
0 <= n <= 100
 */

/**
 * Approach
Count the frequency of each task using an array.
Sort the frequencies in descending order to prioritize tasks with higher frequency.
Calculate the number of intervals needed based on the task 4. with the maximum frequency, considering the cooling time constraint.
Return the total number of intervals required.
Complexity
Time complexity:O(n)
Counting task frequencies: O(n), where n is the number of tasks.
Sorting the frequency array: O(26 log 26) ≈ O(1)
Loop to calculate intervals: O(26) ≈ O(1)
Overall: O(n + 1) ≈ O(n)
Space complexity:Array for frequency: O(26) ≈ O(1)
 */

var leastInterval = function(tasks, n) {
    let freq = Array(26).fill(0);
    for (let task of tasks) {
        freq[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
    }
    freq.sort((a, b) => b - a);
    let chunk = freq[0] - 1;
    let idle = chunk * n;

    for (let i = 1; i < 26; i++) {
        idle -= Math.min(chunk, freq[i]);
    }

    return idle < 0 ? tasks.length : tasks.length + idle;
};