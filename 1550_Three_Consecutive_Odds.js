/**
 * 1550. Three Consecutive Odds
 * Difficulty: Easy
 * 
 * Given an integer array arr, return true if there are three consecutive odd numbers in the array. Otherwise, return false.
 

Example 1:

Input: arr = [2,6,4,1]
Output: false
Explanation: There are no three consecutive odds.
Example 2:

Input: arr = [1,2,34,3,4,5,7,23,12]
Output: true
Explanation: [5,7,23] are three consecutive odds.
 

Constraints:

1 <= arr.length <= 1000
1 <= arr[i] <= 1000
 */

var threeConsecutiveOdds = function(arr) {
    let count = 0; // Initialize count to keep track of consecutive odd numbers

    for (let num of arr) { // Iterate through each element in the array
        if (num % 2 !== 0) { // Check if the current element is odd
            count++; // Increment the count if it's odd
            if (count === 3) { // If we have found three consecutive odds, return true
                return true;
            }
        } else { // If the element is even, reset the count to 0
            count = 0;
        }
    }

    return false; // If we finish the loop without finding three consecutive odds, return false
};


/**
 * Code in python
 */

// class Solution:
//     def threeConsecutiveOdds(self, arr: List[int]) -> bool:
//         count = 0
//         for val in arr:
//             if val%2 == 0:
//                 count=0
//             else :
//                 count +=1
//                 if(count == 3):
//                     return True
//         return False
