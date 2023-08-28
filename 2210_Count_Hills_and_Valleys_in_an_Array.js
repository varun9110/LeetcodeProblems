/**
 * 2210. Count Hills and Valleys in an Array
 * Difficulty : Easy
 * 
 * You are given a 0-indexed integer array nums. An index i is part of a hill in nums if the closest non-equal neighbors of i are smaller than nums[i]. 
 * Similarly, an index i is part of a valley in nums if the closest non-equal neighbors of i are larger than nums[i]. Adjacent indices i and j are part 
 * of the same hill or valley if nums[i] == nums[j].
Note that for an index to be part of a hill or valley, it must have a non-equal neighbor on both the left and right of the index.
Return the number of hills and valleys in nums.
Example 1:
Input: nums = [2,4,1,1,6,5]
Output: 3
Explanation:
At index 0: There is no non-equal neighbor of 2 on the left, so index 0 is neither a hill nor a valley.
At index 1: The closest non-equal neighbors of 4 are 2 and 1. Since 4 > 2 and 4 > 1, index 1 is a hill. 
At index 2: The closest non-equal neighbors of 1 are 4 and 6. Since 1 < 4 and 1 < 6, index 2 is a valley.
At index 3: The closest non-equal neighbors of 1 are 4 and 6. Since 1 < 4 and 1 < 6, index 3 is a valley, but note that it is part of the same valley as index 2.
At index 4: The closest non-equal neighbors of 6 are 1 and 5. Since 6 > 1 and 6 > 5, index 4 is a hill.
At index 5: There is no non-equal neighbor of 5 on the right, so index 5 is neither a hill nor a valley. 
There are 3 hills and valleys so we return 3.
Example 2:
Input: nums = [6,6,5,5,4,1]
Output: 0
Explanation:
At index 0: There is no non-equal neighbor of 6 on the left, so index 0 is neither a hill nor a valley.
At index 1: There is no non-equal neighbor of 6 on the left, so index 1 is neither a hill nor a valley.
At index 2: The closest non-equal neighbors of 5 are 6 and 4. Since 5 < 6 and 5 > 4, index 2 is neither a hill nor a valley.
At index 3: The closest non-equal neighbors of 5 are 6 and 4. Since 5 < 6 and 5 > 4, index 3 is neither a hill nor a valley.
At index 4: The closest non-equal neighbors of 4 are 5 and 1. Since 4 < 5 and 4 > 1, index 4 is neither a hill nor a valley.
At index 5: There is no non-equal neighbor of 1 on the right, so index 5 is neither a hill nor a valley.
There are 0 hills and valleys so we return 0.
 Constraints:
3 <= nums.length <= 100
1 <= nums[i] <= 100
 */

/**
 * Approach 1:
 * By removing side-by-side duplicates, we can shorten the array and remove the need for code that would tell us if a number was part of a previous valley or hill. 
 * We then have our loop ignore the edges of the array, as our code tests each number against the one before & after it.
*/

var countHillValley = function(nums) {
    let answer = 0;
    nums = nums.filter((a, i, b) => a !== b[i + 1]); // Remove Flatlands
    for (let i = 1; i < nums.length - 1; i++) {
        if (nums[i - 1] > nums [i] && nums[i] < nums[i + 1]) answer++; // Valley
        if (nums[i - 1] < nums [i] && nums[i] > nums[i + 1]) answer++; // Hill
    }
    return answer;
};

/**
 * Approach 2:
 * Strategy:

So, to find if a number is a hill or a valley, we need to see if the neighboring values that aren't the same are both an increase or
decrease relative to this number.
Step 1:
Make sure that there are no neighboring nodes of the same values, so turning something like [6,7,7,7,8,8,9,2] -> [6,7,8,9,2].
Step 2:
Loop through the array starting at the 2nd index and up to the 2nd last index, and increase the return value if a nodes neighbors are 
both greater than or less than the node.
 */

var countHillValley = function(ns) {
    //Step 1
    nums = [];
    let l = ns[0];
    nums.push(l);
    for (let i = 0; i < ns.length; i++) {
        n = ns[i];
        if (n != l) {
            l = n;
            nums.push(n);
        }
    }

    
    //Step 2
    let ret = 0;
    for (let i = 1; i < nums.length - 1; i++) {
        if (nums[i-1] < nums[i] == nums[i+1] < nums[i]) ret++;
    }
    
    return ret;   
};