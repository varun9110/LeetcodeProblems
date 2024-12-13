/**
 * 2593. Find Score of an Array After Marking All Elements
 * Difficulty: Medium
 * 
 * You are given an array nums consisting of positive integers.

Starting with score = 0, apply the following algorithm:

Choose the smallest integer of the array that is not marked. If there is a tie, choose the one with the smallest index.
Add the value of the chosen integer to score.
Mark the chosen element and its two adjacent elements if they exist.
Repeat until all the array elements are marked.
Return the score you get after applying the above algorithm.

 

Example 1:

Input: nums = [2,1,3,4,5,2]
Output: 7
Explanation: We mark the elements as follows:
- 1 is the smallest unmarked element, so we mark it and its two adjacent elements: [2,1,3,4,5,2].
- 2 is the smallest unmarked element, so we mark it and its left adjacent element: [2,1,3,4,5,2].
- 4 is the only remaining unmarked element, so we mark it: [2,1,3,4,5,2].
Our score is 1 + 2 + 4 = 7.
Example 2:

Input: nums = [2,3,5,1,3,2]
Output: 5
Explanation: We mark the elements as follows:
- 1 is the smallest unmarked element, so we mark it and its two adjacent elements: [2,3,5,1,3,2].
- 2 is the smallest unmarked element, since there are two of them, we choose the left-most one, so we mark the one at index 0 and its 
right adjacent element: [2,3,5,1,3,2].
- 2 is the only remaining unmarked element, so we mark it: [2,3,5,1,3,2].
Our score is 1 + 2 + 2 = 5.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 106
 */

/**
 * Use Set to look up marked indexes
Use tuples to store [num, index]
Use sort() to sort by number

 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findScore = function(nums) {
    let res = [];
    for(let i = 0; i < nums.length; i++) {
        res.push([nums[i], i]);
    }

    res.sort((a,b) => {
        if(a[0] > b[0]) {
            return -1;
        } else if(a[0] === b[0]) {
             if(a[1] > b[1]) {
                return -1;
             } else if(a[1] === b[1]) {
                return 0;
             } else {
                return 1;
             }
        } else {
            return 1;
        }
    });
    const markedIndex = new Set();

    let score = 0;
    while(res.length > 0) {
        let [smallNum, smallIndex] = res.pop();
        // skip popped, num was already marked
        if(markedIndex.has(smallIndex)) {
            continue;
        }

        // add to score
        score += smallNum;

        // mark this index and the indexes next to it
        if(smallIndex - 1 >= 0) markedIndex.add(smallIndex - 1);
        if(smallIndex + 1 < nums.length) markedIndex.add(smallIndex + 1);
        markedIndex.add(smallIndex);
    }

    return score;
};