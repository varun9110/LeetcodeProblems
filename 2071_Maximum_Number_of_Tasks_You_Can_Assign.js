/**
 * 2071. Maximum Number of Tasks You Can Assign
 * Difficulty: Hard
 * 
 * You have n tasks and m workers. Each task has a strength requirement stored in a 0-indexed integer array tasks, with the ith task requiring tasks[i] strength to complete. 
 * The strength of each worker is stored in a 0-indexed integer array workers, with the jth worker having workers[j] strength. Each worker can only be assigned to a single task and must have a 
 * strength greater than or equal to the task's strength requirement (i.e., workers[j] >= tasks[i]).

Additionally, you have pills magical pills that will increase a worker's strength by strength. You can decide which workers receive the magical pills, however, you may only give each worker at most one magical pill.

Given the 0-indexed integer arrays tasks and workers and the integers pills and strength, return the maximum number of tasks that can be completed.

Example 1:

Input: tasks = [3,2,1], workers = [0,3,3], pills = 1, strength = 1
Output: 3
Explanation:
We can assign the magical pill and tasks as follows:
- Give the magical pill to worker 0.
- Assign worker 0 to task 2 (0 + 1 >= 1)
- Assign worker 1 to task 1 (3 >= 2)
- Assign worker 2 to task 0 (3 >= 3)
Example 2:

Input: tasks = [5,4], workers = [0,0,0], pills = 1, strength = 5
Output: 1
Explanation:
We can assign the magical pill and tasks as follows:
- Give the magical pill to worker 0.
- Assign worker 0 to task 0 (0 + 5 >= 5)
Example 3:

Input: tasks = [10,15,30], workers = [0,10,10,10,10], pills = 3, strength = 10
Output: 2
Explanation:
We can assign the magical pills and tasks as follows:
- Give the magical pill to worker 0 and worker 1.
- Assign worker 0 to task 0 (0 + 10 >= 10)
- Assign worker 1 to task 1 (10 + 10 >= 15)
The last pill is not given because it will not make any worker strong enough for the last task.
 
Constraints:
n == tasks.length
m == workers.length
1 <= n, m <= 5 * 104
0 <= pills <= m
0 <= tasks[i], workers[j], strength <= 109
 */


/**
 * Intuition
The problem requires us to assign as many tasks as possible to available workers. Each task has a minimum strength requirement, and each worker has their own strength level. Additionally, we can use up to pills number of magical potions, where each potion increases a worker's strength by strength. Each worker may consume at most one potion.

To solve this efficiently, we combine sorting with binary search. The detailed strategy includes:

Sort the tasks and workers by strength in ascending order to facilitate greedy matching.
Handle special cases:
If there are no potions or if potions have no effect, we directly use a two-pointer greedy approach.
If we have enough potions for all workers, we can greedily match boosted workers.
Precompute each worker's strength after taking the potion.
Use binary search to determine the maximum number of tasks that can be completed:
For each candidate number of tasks, use a greedy check to verify feasibility.
Prioritize assigning the strongest available worker without using potions; only use a potion if necessary, and assign it to the weakest viable worker.
This method leads to an efficient solution with clear logic and structure.

Approach
Step 1: Sort and Initialize
Sort both the tasks and workers arrays in ascending order for efficient matching later:

const taskCount = tasks.length;
const workerCount = workers.length;

// Use Uint32Array for performance
const sortedTasks = new Uint32Array(tasks).sort();
const sortedWorkers = new Uint32Array(workers).sort();
Step 2: Handle Special Cases
If no potions are available (pills === 0) or if the potion has no effect (pillStrength === 0), use a two-pointer greedy approach:

if (pills === 0 || pillStrength === 0) {
  let taskPtr = taskCount - 1;
  let workerPtr = workerCount - 1;
  let completed = 0;

  while (taskPtr >= 0 && workerPtr >= 0) {
    if (sortedWorkers[workerPtr] >= sortedTasks[taskPtr]) {
      completed++;
      workerPtr--;
      taskPtr--;
    } else {
      taskPtr--;
    }
  }
  return completed;
}
Similarly, if we have enough potions for all workers, use only the boosted worker strengths for matching:

const boostedWorkers = new Uint32Array(workerCount);
for (let i = 0; i < workerCount; i++) {
  boostedWorkers[i] = sortedWorkers[i] + pillStrength;
}

if (pills >= workerCount) {
  let taskPtr = taskCount - 1;
  let boostPtr = workerCount - 1;
  let completed = 0;

  while (taskPtr >= 0 && boostPtr >= 0) {
    if (boostedWorkers[boostPtr] >= sortedTasks[taskPtr]) {
      completed++;
      boostPtr--;
      taskPtr--;
    } else {
      taskPtr--;
    }
  }
  return completed;
}
Step 3: Binary Search + Greedy Validation
Use binary search to find the maximum number of tasks that can be completed:

const candidateBuffer = new Uint32Array(workerCount);
let low = 0;
let high = Math.min(taskCount, workerCount);
let best = 0;

while (low <= high) {
  const trialCount = (low + high) >>> 1;
  
  if (trialCount === 0) {
    best = 0;
    low = 1;
    continue;
  }

  const windowStart = workerCount - trialCount;
  let workerPtr = workerCount - 1;
  let head = 0, tail = 0;
  let remainingPills = pills;
  let feasible = true;

  // Greedy validation: assign tasks from hardest to easiest
  for (let taskIdx = trialCount - 1; taskIdx >= 0; taskIdx--) {
    const need = sortedTasks[taskIdx];

    // Gather all workers strong enough with potion
    while (workerPtr >= windowStart && boostedWorkers[workerPtr] >= need) {
      candidateBuffer[tail++] = sortedWorkers[workerPtr--];
    }

    if (head === tail) {
      feasible = false;
      break;
    }

    if (candidateBuffer[head] >= need) {
      head++; // assign without potion
    } else {
      tail--; // assign weakest with potion
      if (--remainingPills < 0) {
        feasible = false;
        break;
      }
    }
  }

  if (feasible) {
    best = trialCount;
    low = trialCount + 1;
  } else {
    high = trialCount - 1;
  }
}

return best;
Complexity
Time complexity:

Sorting tasks and workers takes O(nlogn+mlogm).
Binary search performs up to O(logmin(n,m)) iterations.
Each greedy validation traverses up to O(m) workers.
O(nlogn+mlogm+mlogmin(n,m))≈O((n+m)log(n+m))
Space complexity:

Extra arrays: sortedTasks, sortedWorkers, boostedWorkers, and candidateBuffer use O(n+m) space.
All other variables use constant space.
Total is O(n+m)
 */


/**
 * @param {number[]} tasks
 * @param {number[]} workers
 * @param {number} pills
 * @param {number} strength
 * @return {number}
 */
function maxTaskAssign(
  tasks,
  workers,
  pills,
  pillStrength
) {
  // 1. Cache lengths
  const taskCount = tasks.length;
  const workerCount = workers.length;

  // 2. Sort into typed arrays (numeric sort)
  const sortedTasks = new Uint32Array(tasks);
  sortedTasks.sort();
  const sortedWorkers = new Uint32Array(workers);
  sortedWorkers.sort();

  // 3. Special case: no effective pills → simple two-pointer greedy
  if (pills === 0 || pillStrength === 0) {
    let taskPtr = taskCount - 1;
    let workerPtr = workerCount - 1;
    let completed = 0;
    while (taskPtr >= 0 && workerPtr >= 0) {
      if (sortedWorkers[workerPtr] >= sortedTasks[taskPtr]) {
        completed++;
        workerPtr--;
        taskPtr--;
      } else {
        taskPtr--;
      }
    }
    return completed;
  }

  // 4. Precompute boosted strengths (still sorted ascending)
  const boostedWorkers = new Uint32Array(workerCount);
  for (let i = 0; i < workerCount; i++) {
    boostedWorkers[i] = sortedWorkers[i] + pillStrength;
  }

  // 5. Special case: enough pills to boost every worker → greedy on boosted only
  if (pills >= workerCount) {
    let taskPtr = taskCount - 1;
    let boostPtr = workerCount - 1;
    let completed = 0;
    while (taskPtr >= 0 && boostPtr >= 0) {
      if (boostedWorkers[boostPtr] >= sortedTasks[taskPtr]) {
        completed++;
        boostPtr--;
        taskPtr--;
      } else {
        taskPtr--;
      }
    }
    return completed;
  }

  // 6. Prepare for binary-search + greedy check
  const candidateBuffer = new Uint32Array(workerCount);
  const requirements = sortedTasks;
  const originals    = sortedWorkers;
  const boosted      = boostedWorkers;

  let low = 0;
  let high = Math.min(taskCount, workerCount);
  let best = 0;

  // 7. Binary search for maximum assignable count
  while (low <= high) {
    const trialCount = (low + high) >>> 1;
    if (trialCount === 0) {
      best = 0;
      low = 1;
      continue;
    }

    // Greedy feasibility test for 'trialCount' easiest tasks
    const windowStart = workerCount - trialCount;
    let workerPtr = workerCount - 1;
    let head = 0;
    let tail = 0;
    let remainingPills = pills;
    let feasible = true;

    // Assign tasks from hardest (of the easiest 'trialCount') down
    for (let taskIdx = trialCount - 1; taskIdx >= 0; taskIdx--) {
      const need = requirements[taskIdx];

      // Enqueue all workers in the window whose boosted strength ≥ need
      while (workerPtr >= windowStart && boosted[workerPtr] >= need) {
        candidateBuffer[tail++] = originals[workerPtr--];
      }

      // No candidates → fail
      if (head === tail) {
        feasible = false;
        break;
      }

      // If the strongest unboosted candidate suffices, use them
      if (candidateBuffer[head] >= need) {
        head++;
      } else {
        // Otherwise boost the weakest
        tail--;
        if (--remainingPills < 0) {
          feasible = false;
          break;
        }
      }
    }

    if (feasible) {
      best = trialCount;
      low = trialCount + 1;
    } else {
      high = trialCount - 1;
    }
  }

  return best;
}