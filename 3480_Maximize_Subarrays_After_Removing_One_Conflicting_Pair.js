/**
 * 3480. Maximize Subarrays After Removing One Conflicting Pair
 * Difficulty: Hard
 * 
 * You are given an integer n which represents an array nums containing the numbers from 1 to n in order. Additionally, you are given a 2D array conflictingPairs, where conflictingPairs[i] = [a, b] indicates that a and b form a conflicting pair.

Remove exactly one element from conflictingPairs. Afterward, count the number of non-empty subarrays of nums which do not contain both a and b for any remaining conflicting pair [a, b].

Return the maximum number of subarrays possible after removing exactly one conflicting pair.

 

Example 1:

Input: n = 4, conflictingPairs = [[2,3],[1,4]]

Output: 9

Explanation:

Remove [2, 3] from conflictingPairs. Now, conflictingPairs = [[1, 4]].
There are 9 subarrays in nums where [1, 4] do not appear together. They are [1], [2], [3], [4], [1, 2], [2, 3], [3, 4], [1, 2, 3] and [2, 3, 4].
The maximum number of subarrays we can achieve after removing one element from conflictingPairs is 9.
Example 2:

Input: n = 5, conflictingPairs = [[1,2],[2,5],[3,5]]

Output: 12

Explanation:

Remove [1, 2] from conflictingPairs. Now, conflictingPairs = [[2, 5], [3, 5]].
There are 12 subarrays in nums where [2, 5] and [3, 5] do not appear together.
The maximum number of subarrays we can achieve after removing one element from conflictingPairs is 12.
 

Constraints:

2 <= n <= 105
1 <= conflictingPairs.length <= 2 * n
conflictingPairs[i].length == 2
1 <= conflictingPairs[i][j] <= n
conflictingPairs[i][0] != conflictingPairs[i][1]
 */

/**
 * Intuition
Find maximum valid subarrays after removing one conflicting pair

Approach
Process pairs in order of right endpoint, tracking contributions of each pair removal

Complexity
Time complexity: O(m log m + n), where m is the number of conflicting pairs and n is the array length
Space complexity: O(m), for storing results for each pair
 */

/**
 * @intuition
 * Find maximum valid subarrays after removing one conflicting pair
 *
 * @approach
 * Process pairs in order of right endpoint, tracking contributions of each pair removal
 *
 * @complexity
 * Time: O(m log m + n), where m is the number of conflicting pairs and n is the array length
 * Space: O(m), for storing results for each pair
 *
 * @param {number} n
 * @param {number[][]} conflictingPairs
 * @return {number}
 */
const maxSubarrays = (n, conflictingPairs) => {
  const pairCount = conflictingPairs.length
  
  // Normalize pairs so left endpoint is always smaller
  const normalizedPairs = conflictingPairs.map(pair => 
    pair[0] > pair[1] ? [pair[1], pair[0]] : [...pair]
  )
  
  // Sort by right endpoint, then left endpoint
  normalizedPairs.sort((a, b) => a[1] !== b[1] ? a[1] - b[1] : a[0] - b[0])
  
  // Track contributions and base answer
  const pairContributions = Array(pairCount).fill(0)
  let baseSubarrayCount = 0
  
  let pairIndex = 0
  let maxLeftBound = 1
  let currentLeftBound = 1
  let currentPair = -1
  
  // Helper function to update state based on current pair
  const updateState = (leftEndpoint) => {
    if (currentPair === -1) {
      // No active pair yet
      if (maxLeftBound <= leftEndpoint) {
        currentLeftBound = leftEndpoint
        currentPair = pairIndex
      }
      return
    }
    
    if (leftEndpoint < currentLeftBound) {
      // Pair overlaps with current active pair
      maxLeftBound = Math.max(maxLeftBound, leftEndpoint + 1)
      return
    }
    
    if (leftEndpoint === currentLeftBound) {
      // Same left endpoint, can't contribute
      maxLeftBound = currentLeftBound + 1
      currentPair = -1
      return
    }
    
    // New pair becomes active
    maxLeftBound = currentLeftBound + 1
    currentLeftBound = leftEndpoint
    currentPair = pairIndex
  }
  
  // Process all positions from 1 to n
  for (let position = 1; position <= n; position++) {
    // Process all pairs with right endpoint <= current position
    while (pairIndex < pairCount && normalizedPairs[pairIndex][1] <= position) {
      const leftEndpoint = normalizedPairs[pairIndex][0]
      updateState(leftEndpoint)
      pairIndex++
    }
    
    // Add contribution to current pair if applicable
    if (currentPair !== -1) {
      pairContributions[currentPair] += currentLeftBound - maxLeftBound + 1
    }
    
    // Add to base answer
    baseSubarrayCount += currentPair === -1
      ? position - maxLeftBound + 1
      : position - currentLeftBound
  }
  
  // Find maximum contribution from removing a single pair
  const maxPairContribution = Math.max(...pairContributions)
  
  return baseSubarrayCount + maxPairContribution
}