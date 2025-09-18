/**
 * 3408. Design Task Manager
 * Difficulty: Medium
 * 
 * There is a task management system that allows users to manage their tasks, each associated with a priority. The system should efficiently handle adding, modifying, executing, and removing tasks.

Implement the TaskManager class:

TaskManager(vector<vector<int>>& tasks) initializes the task manager with a list of user-task-priority triples. Each element in the input list is of the form [userId, taskId, priority], which adds a task to the specified user with the given priority.

void add(int userId, int taskId, int priority) adds a task with the specified taskId and priority to the user with userId. It is guaranteed that taskId does not exist in the system.

void edit(int taskId, int newPriority) updates the priority of the existing taskId to newPriority. It is guaranteed that taskId exists in the system.

void rmv(int taskId) removes the task identified by taskId from the system. It is guaranteed that taskId exists in the system.

int execTop() executes the task with the highest priority across all users. If there are multiple tasks with the same highest priority, execute the one with the highest taskId. After executing, the taskId is removed from the system. Return the userId associated with the executed task. If no tasks are available, return -1.

Note that a user may be assigned multiple tasks.

 

Example 1:

Input:
["TaskManager", "add", "edit", "execTop", "rmv", "add", "execTop"]
[[[[1, 101, 10], [2, 102, 20], [3, 103, 15]]], [4, 104, 5], [102, 8], [], [101], [5, 105, 15], []]

Output:
[null, null, null, 3, null, null, 5]

Explanation

TaskManager taskManager = new TaskManager([[1, 101, 10], [2, 102, 20], [3, 103, 15]]); // Initializes with three tasks for Users 1, 2, and 3.
taskManager.add(4, 104, 5); // Adds task 104 with priority 5 for User 4.
taskManager.edit(102, 8); // Updates priority of task 102 to 8.
taskManager.execTop(); // return 3. Executes task 103 for User 3.
taskManager.rmv(101); // Removes task 101 from the system.
taskManager.add(5, 105, 15); // Adds task 105 with priority 15 for User 5.
taskManager.execTop(); // return 5. Executes task 105 for User 5.
 

Constraints:

1 <= tasks.length <= 105
0 <= userId <= 105
0 <= taskId <= 105
0 <= priority <= 109
0 <= newPriority <= 109
At most 2 * 105 calls will be made in total to add, edit, rmv, and execTop methods.
The input is generated such that taskId will be valid.
 * 
 */

/**
 * Intuition
Keep [taksId]: {userId, priority, version} in Hash Map and use Priority Queue keep {taskId, priority, version}, add, update and remove, then find first match from Priority Queue by priority and version in Hash Map.

Approach
Define:
this.tasks - Hash Map for mapping taksId with tuple {userId, priority, version};
this.heap - Priority Queue to keep {taskId, priority, version};

Put source tasks data to structures ininialized version as 1;
Version added to let system see difference in case of duplicates within this.heap within exec method;

add method put new ones to the this.tasks and this.heap the same way as in constructor.

edit method updates data for existing taskId in this.tasks, increment version and add new tuple to the this.heap with the updated version from this.tasks.

rmv method just remove element from this.tasks by taskId.

execTop is key method where pulling out elements from this.heap until element get match by taskId, priority, version and return userId or Priority Queue become empty and with no match return -1;

Complexity
Time complexity:
O(log(tasks))
Space complexity:
O(tasks)
 */

/**
 * @param {number[][]} tasks
 */
var TaskManager = function(tasks) {
    this.tasks = {};
    this.heap = new PriorityQueue((a, b) => {
        if (a.priority !== b.priority) {
            return b.priority - a.priority;
        }

        return b.taskId - a.taskId;
    });

    for (let i = 0; i < tasks.length; i++) {
        const [userId, taskId, priority] = tasks[i];

        this.tasks[taskId] = {userId, priority, version: 1};
        this.heap.enqueue({taskId, priority, version: 1});
    }
};

/** 
 * @param {number} userId 
 * @param {number} taskId 
 * @param {number} priority
 * @return {void}
 */
TaskManager.prototype.add = function(userId, taskId, priority) {
    this.tasks[taskId] = {userId, priority, version: 1};
    this.heap.enqueue({taskId, priority, version: 1});
};

/** 
 * @param {number} taskId 
 * @param {number} newPriority
 * @return {void}
 */
TaskManager.prototype.edit = function(taskId, newPriority) {
    const { userId } = this.tasks[taskId];
    this.tasks[taskId].priority = newPriority;
    this.tasks[taskId].version++;
    this.heap.enqueue({ taskId, priority: newPriority, version: this.tasks[taskId].version });
};

/** 
 * @param {number} taskId
 * @return {void}
 */
TaskManager.prototype.rmv = function(taskId) {
    delete this.tasks[taskId];
};

/**
 * @return {number}
 */
TaskManager.prototype.execTop = function() {
    while (!this.heap.isEmpty()) {
        const {taskId, priority, version} = this.heap.dequeue();
        const task = this.tasks[taskId];

        if (task && task.priority === priority && task.version === version) return task.userId;
    }

    return -1;
};

/** 
 * Your TaskManager object will be instantiated and called as such:
 * var obj = new TaskManager(tasks)
 * obj.add(userId,taskId,priority)
 * obj.edit(taskId,newPriority)
 * obj.rmv(taskId)
 * var param_4 = obj.execTop()
 */