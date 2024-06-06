/**
 * 846. Hand of Straights
 * Difficulty : Medium
 * 
 * Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, 
 * and consists of groupSize consecutive cards.

Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, 
return true if she can rearrange the cards, or false otherwise. 

Example 1:
Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]
Example 2:
Input: hand = [1,2,3,4,5], groupSize = 4
Output: false
Explanation: Alice's hand can not be rearranged into groups of 4.

Constraints:
1 <= hand.length <= 104
0 <= hand[i] <= 109
1 <= groupSize <= hand.length

 */

/**
 * Approach:
Create a map countMap to count the frequency of each card in the hand.
Sort the hand in ascending order.
Iterate through the hand and for each card:
a. If the frequency of the current card is 0, continue to the next card.
b. For each number in a group of size groupSize starting from the current card:
i. If the frequency of the number is 0, return false as it is not possible to form the required group.
ii. Decrement the frequency of the number in the countMap.
If we have successfully formed all groups, return true.
 */

/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function(hand, groupSize) {
  if (hand.length % groupSize !== 0) {
    return false;
  }

  const countMap = new Map();

  // Count the occurrences of each card
  for (const card of hand) {
    countMap.set(card, (countMap.get(card) || 0) + 1);
  }

  // Sort the cards in ascending order
  hand.sort((a, b) => a - b);

  for (const card of hand) {
    if (countMap.get(card) === 0) {
      // Skip cards that have been used in previous groups
      continue;
    }

    // Check if we can form a group of consecutive cards
    for (let i = 0; i < groupSize; i++) {
      const currCard = card + i;

      if (countMap.get(currCard) === undefined || countMap.get(currCard) === 0) {
        // If any card in the group is missing, return false
        return false;
      }

      // Reduce the count of the current card in the map
      countMap.set(currCard, countMap.get(currCard) - 1);
    }
  }

  return true;
}