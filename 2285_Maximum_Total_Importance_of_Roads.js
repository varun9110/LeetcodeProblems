/**
 * 2285. Maximum Total Importance of Roads
 * Difficulty: Medium
 * 
 * You are given an integer n denoting the number of cities in a country. The cities are numbered from 0 to n - 1.

You are also given a 2D integer array roads where roads[i] = [ai, bi] denotes that there exists a bidirectional road connecting cities ai and bi.

You need to assign each city with an integer value from 1 to n, where each value can only be used once. The importance of a road 
is then defined as the sum of the values of the two cities it connects.

Return the maximum total importance of all roads possible after assigning the values optimally.

Example 1:
Input: n = 5, roads = [[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]
Output: 43
Explanation: The figure above shows the country and the assigned values of [2,4,5,3,1].
- The road (0,1) has an importance of 2 + 4 = 6.
- The road (1,2) has an importance of 4 + 5 = 9.
- The road (2,3) has an importance of 5 + 3 = 8.
- The road (0,2) has an importance of 2 + 5 = 7.
- The road (1,3) has an importance of 4 + 3 = 7.
- The road (2,4) has an importance of 5 + 1 = 6.
The total importance of all roads is 6 + 9 + 8 + 7 + 7 + 6 = 43.
It can be shown that we cannot obtain a greater total importance than 43.
Example 2:
Input: n = 5, roads = [[0,3],[2,4],[1,3]]
Output: 20
Explanation: The figure above shows the country and the assigned values of [4,3,2,5,1].
- The road (0,3) has an importance of 4 + 5 = 9.
- The road (2,4) has an importance of 2 + 1 = 3.
- The road (1,3) has an importance of 3 + 5 = 8.
The total importance of all roads is 9 + 3 + 8 = 20.
It can be shown that we cannot obtain a greater total importance than 20.

Constraints:

2 <= n <= 5 * 104
1 <= roads.length <= 5 * 104
roads[i].length == 2
0 <= ai, bi <= n - 1
ai != bi
There are no duplicate roads.
 */


/**
 * Intuition
To maximize the total importance of all roads, the cities with the highest degree (i.e., the cities that are connected to the most other cities) 
should be assigned the highest values. This ensures that the most frequently used roads contribute the highest possible sums to the total importance.

Approach
Calculate Degrees: First, calculate the degree (number of connections) of each city.
Assign Values: Sort cities based on their degrees in descending order and assign the highest values to the cities with the highest degrees.
Calculate Importance: Compute the total importance of the roads based on the assigned values.
Complexity
Time Complexity:

Calculating degrees takes (O(m)), where (m) is the number of roads.
Sorting the cities based on degrees takes (O(n log n)), where (n) is the number of cities.
Assigning values and calculating the total importance takes (O(m)).
Thus, the overall time complexity is (O(n log n + m)).

Space Complexity:

Storing degrees and the sorted list of cities takes (O(n)).
 */

/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var maximumImportance = function(n, roads) {
    let degree = new Array(n).fill(0);
    
    // Calculate the degree of each city
    for (const road of roads) {
        degree[road[0]]++;
        degree[road[1]]++;
    }
    
    // Create a list of cities and sort by degree
    let cities = Array.from({length: n}, (_, i) => i);
    cities.sort((a, b) => degree[b] - degree[a]);
    
    // Assign values to cities starting from the highest degree
    let totalImportance = 0;
    for (let i = 0; i < n; i++) {
        totalImportance += (n - i) * degree[cities[i]];
    }
    
    return totalImportance;
};