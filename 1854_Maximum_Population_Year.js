/**
 * 1854. Maximum Population Year
 * Difficulty : Easy
 * 
 * You are given a 2D integer array logs where each logs[i] = [birthi, deathi] indicates the birth and death years of the ith person.
The population of some year x is the number of people alive during that year. The ith person is counted in year x's population if x is in the 
inclusive range [birthi, deathi - 1]. Note that the person is not counted in the year that they die.
Return the earliest year with the maximum population.
Example 1:
Input: logs = [[1993,1999],[2000,2010]]
Output: 1993
Explanation: The maximum population is 1, and 1993 is the earliest year with this population.
Example 2:
Input: logs = [[1950,1961],[1960,1971],[1970,1981]]
Output: 1960
Explanation: 
The maximum population is 2, and it had happened in years 1960 and 1970.
The earlier year between them is 1960.

Constraints:
1 <= logs.length <= 100
1950 <= birthi < deathi <= 2050
 */

/**
 * Approach:
 * Craete an array of the same length, then fill them with 0
 * next mark each birth year with ++ and death by --
 * then make max=0 and then iterate from 1 to 100 of the new array
 * population of that year will be population of last year + of that year.
 * then check if the population is more in that year or the max. and then store the value in max
 * next return 1950+max as the year
 */

var maximumPopulation = function (logs) {
  const count = new Array(101).fill(0);

  for (const [birth, death] of logs) {
    count[birth - 1950]++;
    count[death - 1950]--;
  }

  let max = 0;

  for (let i = 1; i < 101; i++) {
    count[i] += count[i - 1];

    if (count[i] > count[max]) max = i;
  }

  return 1950 + max;
};
