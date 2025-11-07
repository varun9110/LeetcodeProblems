/**
 * 2528. Maximize the Minimum Powered City
 * Difficulty: Hard
 * 
 * You are given a 0-indexed integer array stations of length n, where stations[i] represents the number of power stations in the ith city.
Each power station can provide power to every city in a fixed range. In other words, if the range is denoted by r, then a power station at city i can provide power to all cities j such that |i - j| <= r and 0 <= i, j <= n - 1.
Note that |x| denotes absolute value. For example, |7 - 5| = 2 and |3 - 10| = 7.
The power of a city is the total number of power stations it is being provided power from.
The government has sanctioned building k more power stations, each of which can be built in any city, and have the same range as the pre-existing ones.
Given the two integers r and k, return the maximum possible minimum power of a city, if the additional power stations are built optimally.
Note that you can build the k power stations in multiple cities.

Example 1:
Input: stations = [1,2,4,5,0], r = 1, k = 2
Output: 5
Explanation: 
One of the optimal ways is to install both the power stations at city 1. 
So stations will become [1,4,4,5,0].
- City 0 is provided by 1 + 4 = 5 power stations.
- City 1 is provided by 1 + 4 + 4 = 9 power stations.
- City 2 is provided by 4 + 4 + 5 = 13 power stations.
- City 3 is provided by 5 + 4 = 9 power stations.
- City 4 is provided by 5 + 0 = 5 power stations.
So the minimum power of a city is 5.
Since it is not possible to obtain a larger power, we return 5.

Example 2:
Input: stations = [4,4,4,4], r = 0, k = 3
Output: 4
Explanation: 
It can be proved that we cannot make the minimum power of a city greater than 4.
 
Constraints:
n == stations.length
1 <= n <= 105
0 <= stations[i] <= 105
0 <= r <= n - 1
0 <= k <= 109
 */

/**
 * Approach
Precompute base power per city
Use a prefix-sum / difference trick to convert “each station covers a window of length 2r+1” into O(n) preprocessing.

Binary search the answer T

Lower bound can be 0 or the minimum current power.
Upper bound can be sum(stations) + k (nobody can exceed this much total coverage).
Feasibility check (greedy with difference array)

Keep addedDiff[] to represent the coverage contribution from newly placed stations.

Sweep i = 0..n-1, maintain extraRunning = cumulative added coverage at i.

current = base[i] + extraRunning.
If current < T, add need = T - current stations at pos = min(n-1, i + r):

extraRunning += need
addedDiff[ min(n, i + 2r + 1) ] -= need
used += need (fail if used > k)
Add the pending negative diff as we move forward.

Return the largest feasible T from the binary search.
 */


/**
 * @param {number[]} stations
 * @param {number} r
 * @param {number} k
 * @return {number}
 */
var maxPower = function (stations, r, k) {
  const n = stations.length;

  const diff = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    const L = Math.max(0, i - r);
    const R = Math.min(n, i + r + 1);
    diff[L] += stations[i];
    diff[R] -= stations[i];
  }
  const base = Array(n).fill(0);
  let run = 0;
  for (let i = 0; i < n; i++) {
    run += diff[i];
    base[i] = run;
  }

  let lo = 0;
  let hi = stations.reduce((s, v) => s + v, 0) + k;
  let ans = 0;

  const feasible = (T) => {
    const add = Array(n + 1).fill(0);
    let extra = 0;
    let used = 0;
    for (let i = 0; i < n; i++) {
      extra += add[i];
      let curr = base[i] + extra;
      if (curr < T) {
        const need = T - curr;
        used += need;
        if (used > k) return false;
        extra += need;
        const end = Math.min(n, i + 2 * r + 1);
        add[end] -= need;
      }
    }
    return true;
  };

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (feasible(mid)) {
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return ans;
};