/*

2007_Find_Original_Array_From_Doubled_Array
Difficulty : Medium

An integer array original is transformed into a doubled array changed by appending twice the value of every element in original, and then randomly shuffling the resulting array.
Given an array changed, return original if changed is a doubled array. If changed is not a doubled array, return an empty array. The elements in original may be returned in any order.

Example 1:
Input: changed = [1,3,4,2,6,8]
Output: [1,3,4]
Explanation: One possible original array could be [1,3,4]:
- Twice the value of 1 is 1 * 2 = 2.
- Twice the value of 3 is 3 * 2 = 6.
- Twice the value of 4 is 4 * 2 = 8.
Other original arrays could be [4,3,1] or [3,1,4].

Example 2:
Input: changed = [6,3,0,1]
Output: []
Explanation: changed is not a doubled array.

Example 3:
Input: changed = [1]
Output: []
Explanation: changed is not a doubled array.
 
Constraints:
1 <= changed.length <= 105
0 <= changed[i] <= 105

*/

/*
Approach

1. Sorting to find double number is present like [2, 4, 8, 1] -> sorted -> [1, 2, 4, 8]
   then 2 is double of 1 means 1 x 2 = 2 is formed from 1, so we cannot use it then we have 4, 4 * 2 = 8.
    Answer = [1, 4]

2. Hashing to count occurence of number and double number.

*/


var findOriginalArray = function(changed) {
    changed = changed.sort(function(a, b) {
        return a - b;
    });

    let hash = {};
    let cnt = 0;
    let ans = [];

    // counting occurrence of the number
    for (let i = 0; i < changed.length; i++) {
        hash[changed[i]] = hash[changed[i]] ? hash[changed[i]] + 1 : 1;
    }

    for (let i = 0; i < changed.length; i++) {

        // if we have zero in the changed array
        if (changed[i] === 0 && hash[changed[i]] > 1) {
            cnt++;
            hash[changed[i]] -= 2;
            ans.push(changed[i]);
        }

        // if we don't have zero
        if (hash[changed[i]] > 0 && hash[changed[i] * 2] > 0 && changed[i] !== 0) {
            cnt++;
            ans.push(changed[i]);
            hash[changed[i]] -= 1;
            hash[changed[i] * 2] -= 1;
        }

        // checking doubled array size divide by 2 to find original size
        if (cnt === changed.length / 2) {
            return ans;
        }
    }

    // original array not found
    return [];
};