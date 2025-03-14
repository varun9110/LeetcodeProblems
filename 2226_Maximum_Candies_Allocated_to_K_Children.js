/**
 * 2226. Maximum Candies Allocated to K Children
 * Difficulty: Medium
 * 
 * You are given a 0-indexed integer array candies. Each element in the array denotes a pile of candies of size candies[i]. 
 * You can divide each pile into any number of sub piles, but you cannot merge two piles together.

You are also given an integer k. You should allocate piles of candies to k children such that each child gets the same number of candies. 
Each child can be allocated candies from only one pile of candies and some piles of candies may go unused.

Return the maximum number of candies each child can get.

 

Example 1:

Input: candies = [5,8,6], k = 3
Output: 5
Explanation: We can divide candies[1] into 2 piles of size 5 and 3, and candies[2] into 2 piles of size 5 and 1. 
We now have five piles of candies of sizes 5, 5, 3, 5, and 1. We can allocate the 3 piles of size 5 to 3 children. 
It can be proven that each child cannot receive more than 5 candies.
Example 2:

Input: candies = [2,5], k = 11
Output: 0
Explanation: There are 11 children but only 7 candies in total, so it is impossible to ensure each child receives at least one candy. 
Thus, each child gets no candy and the answer is 0.
 

Constraints:

1 <= candies.length <= 105
1 <= candies[i] <= 107
1 <= k <= 1012
 */

/**
 * approach: 
 * So basically we need to find maximum value that each pile can be divided so that all children gets the candies.
 * The maximum can be the max of the pile array.
 * 
 * Now, we need to iterate from the max pile to 1 to find at what number does the each pile divides so that k count is achieved.
 * 
 * there has to be a loop that get iterated repeatedly - to count the number of sub piles or max candies for each child.
 * for the series to iterate from max pile count to 1, we can use the binary search. - hint: since it is iterative then binary search reduces the complexity to log(m)
 */


/**
 * @param {number[]} candies
 * @param {number} k
 * @return {number}
 */
var maximumCandies = function(candies, k) {
    let left = 1;
    let right = Math.max(...candies)
    let result =0;

    while(left<=right){
        const mid = Math.floor((left+right) /2);
        let count = 0;
        for(let i=0; i<candies.length; i++){
            count += Math.floor(candies[i]/mid);
        }

        if(count>=k){
            result = mid;
            left = mid+1
        } else {
            right = mid -1
        }
    }

    return result
};