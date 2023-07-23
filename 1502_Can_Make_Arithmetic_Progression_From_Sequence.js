/**
 * 1502. Can Make Arithmetic Progression From Sequence
 * A sequence of numbers is called an arithmetic progression if the difference between any two consecutive elements is the same.

Given an array of numbers arr, return true if the array can be rearranged to form an arithmetic progression. Otherwise, return false.
Example 1:
Input: arr = [3,5,1]
Output: true
Explanation: We can reorder the elements as [1,3,5] or [5,3,1] with differences 2 and -2 respectively, between each consecutive elements.
Example 2:
Input: arr = [1,2,4]
Output: false
Explanation: There is no way to reorder the elements to obtain an arithmetic progression.

Constraints:
2 <= arr.length <= 1000
-106 <= arr[i] <= 106
 */

var canMakeArithmeticProgression = function(arr) {
    arr.sort((a,b) => a-b);
    for(let i=1; i<arr.length-1; i++){
        if( (arr[i-1]-arr[i]) !==  (arr[i]-arr[i+1])){
            return false;
        }
    }

    return true;
};


// SOLUTION 3
// It's an update for solution 2. We use an in-place strategy to optimize space complexity.

// The in-place strategy is:

// We could check if the value of current index is the same as the sorting result since we know the min and diff already.
// If it's not the same, we make it the same and use the value of the current index to get the next correct index.
// Loop this, until the condition in step 1 is passed.
// There are 3 situations to stop and return false:

// The diff is not an integer.
// The nextIdx is not an integer.
// We end at a bigger index after loop.
// O(n) time and O(1) space.

function canMakeArithmeticProgression(arr) {
    const max = Math.max(...arr);
    let current = Math.min(...arr);
    const gap = (max - current) / (arr.length - 1);
    const set = new Set(arr);
    
    while (current < max) {
        current += gap;
        if (!set.has(current)) return false;
    }
    return true;
};