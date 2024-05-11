/**
 * 857. Minimum Cost to Hire K Workers
 * Difficulty: Hard
 * 
 * There are n workers. You are given two integer arrays quality and wage where quality[i] is the quality of the ith worker and wage[i] is the 
 * minimum wage expectation for the ith worker.

We want to hire exactly k workers to form a paid group. To hire a group of k workers, we must pay them according to the following rules:

Every worker in the paid group must be paid at least their minimum wage expectation.
In the group, each worker's pay must be directly proportional to their quality. This means if a worker’s quality is double that of another worker in the group, 
then they must be paid twice as much as the other worker.
Given the integer k, return the least amount of money needed to form a paid group satisfying the above conditions. Answers within 10-5 of the actual 
answer will be accepted.

 

Example 1:

Input: quality = [10,20,5], wage = [70,50,30], k = 2
Output: 105.00000
Explanation: We pay 70 to 0th worker and 35 to 2nd worker.
Example 2:

Input: quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3
Output: 30.66667
Explanation: We pay 4 to 0th worker, 13.33333 to 2nd and 3rd workers separately.
 

Constraints:

n == quality.length == wage.length
1 <= k <= n <= 104
1 <= quality[i], wage[i] <= 104
 */

/**
 * Approach
Initialization:

qualityTillNow: Tracks the sum of qualities of the workers currently considered for hiring.
wageQualityRatio: A min-heap (priority queue) based on each worker's wage-to-quality ratio. This helps us extract workers with the lowest ratio efficiently.
highQualityWorkers: A max-heap to store the qualities of the workers being considered for hiring, allowing easy removal of the worker with the highest quality 
when we exceed k workers.
minCost: Variable to track the minimum possible cost of hiring k workers.
Building the wage-to-quality ratio heap:

Calculate the ratio for each worker and push (ratio, quality) tuples into the wageQualityRatio heap.

Selecting Workers:

Iterate over each worker sorted by their wage-to-quality ratio (popping from the wageQualityRatio heap):

Add the worker's quality to the qualityTillNow.

Push the negative of the worker's quality into highQualityWorkers to maintain it as a max-heap.

If the size of highQualityWorkers exceeds k, remove the worker with the highest quality from highQualityWorkers and adjust qualityTillNow accordingly.

If we have exactly k workers in highQualityWorkers, calculate the potential cost using the current ratio and qualityTillNow. 
Update minCost if this new cost is lower than the previously recorded minimum cost.

Complexity
Time complexity:
O(nlogn+nlogk)
 */

/**
 * @param {number[]} quality
 * @param {number[]} wage
 * @param {number} k
 * @return {number}
 */

class Worker {
    constructor(ratio, quality) {
        this.ratio = ratio;
        this.quality = quality;
    }
}

var mincostToHireWorkers = function (quality, wage, k) {
    const n = quality.length;
    let minCost = Number.MAX_VALUE;
    let qualityTillNow = 0;
    let workers = [];

    for (let i = 0; i < n; i++) {
        workers.push(new Worker(wage[i] / quality[i], quality[i]));
    }

    // Sorting workers by their wage-quality ratio
    workers.sort((a, b) => a.ratio - b.ratio);

    // Max-heap to store qualities, implemented using a min-heap and inverting the values
    let highQualityWorkers = [];

    for (let worker of workers) {
        let ratio = worker.ratio;
        let qua = worker.quality;

        qualityTillNow += qua;
        highQualityWorkers.push(-qua);  // Push negative to simulate max-heap
        highQualityWorkers.sort((a, b) => a - b);  // Sort to maintain heap properties

        if (highQualityWorkers.length > k) {
            qualityTillNow += highQualityWorkers.shift();  // Remove largest quality (which is negative)
        }

        if (highQualityWorkers.length === k) {
            minCost = Math.min(minCost, qualityTillNow * ratio);
        }
    }

    return minCost;
};