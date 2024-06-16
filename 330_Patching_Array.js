/**
 * 330. Patching Array
 * Difficulty: Hard
 * 
 * Given a sorted integer array nums and an integer n, add/patch elements to the array such that any number in the range [1, n] 
 * inclusive can be formed by the sum of some elements in the array.

Return the minimum number of patches required.

Example 1:
Input: nums = [1,3], n = 6
Output: 1
Explanation:
Combinations of nums are [1], [3], [1,3], which form possible sums of: 1, 3, 4.
Now if we add/patch 2 to nums, the combinations are: [1], [2], [3], [1,3], [2,3], [1,2,3].
Possible sums are 1, 2, 3, 4, 5, 6, which now covers the range [1, 6].
So we only need 1 patch.
Example 2:
Input: nums = [1,5,10], n = 20
Output: 2
Explanation: The two patches can be [2, 4].
Example 3:
Input: nums = [1,2,2], n = 5
Output: 0

Constraints:
1 <= nums.length <= 1000
1 <= nums[i] <= 104
nums is sorted in ascending order.
1 <= n <= 231 - 1
 */

/**
 * Brute Force:
 * Find out the combination of arrays, then find the sum of each of them. and add them to an object.
 * Then keep checking for the values, if all the values till n are there then return true else false
 * 
 * Finally keep repeating the above steps till the everything is found.
 */

const getAllSubsets = (array) => {
    const subsets = [[]];
    
    for (let el=0; el<array.length; el++) {
        const last = subsets.length-1;
        for (let i = 0; i <= last; i++) {
            subsets.push( [...subsets[i], array[el]] );
        }
    }
    subsets.shift();
    return subsets;
}

const getSum = (arr) => {
    return arr.reduce((accumulator, curValue) => accumulator + curValue, 0)
}

const checkForCombination = (obj, n) => {
    let values = Object.keys(obj);
    values.sort((a,b) => a-b);
    for(let i=0; i<n; i++){
        if(Number(values[i]) !== i+1){
            return {num: i+1, result: false};
        }
    }
    return {num: 0, result: true};
};

var minPatches = function(nums, n) {
    let map = {};
    let count = 0;
    
    let finalised = false;

    while(!finalised){
        let sub = getAllSubsets(nums);
        // console.log("1 here : ",sub)
        for(let i=0; i<sub.length; i++){
            map[getSum(sub[i])] = 1
        }
        // console.log("2 here : ",map)
        let checkForCompleteness = checkForCombination(map, n);
        // console.log(checkForCompleteness)
        finalised = checkForCompleteness.result;
        if(!finalised){
            // console.log("4 here : ",checkForCompleteness.num)
            nums.push(checkForCompleteness.num)
            count++;
        }
    }

    return count;
};


/**
 * Intuition
The code works like providing change with limited coin denominations. Suppose you need to cover every amount up to 𝑛 cents. 
If you can't make exact change for a particular amount miss, it indicates you lack a coin of value less than or equal to miss. 
To fill this gap, you add a coin of that exact missing amount. This addition allows you to now cover new amounts up to 2 * miss. 
Repeat this process until you can provide change for every amount up to 𝑛. This method ensures you add the minimum number of new coins needed to cover any shortages.
Approach
If its hard to understand the approach, I have clear explanation here.

Initialize Variables: Start with miss set to 1, added to 0, and index i at 0 to track the smallest sum that cannot be formed and the number of patches added.

Iterate with Condition: Continue the loop as long as miss (the target sum we need to achieve) is less than or equal to n.

Use Existing Numbers: Check if the current number in the list (nums[i]) can be used to form miss. If yes, add it to miss to extend the range of formable sums and increment the index i.

Add Necessary Numbers: If nums[i] is greater than miss or all numbers are already used, add miss itself to cover the smallest unformable sum, and double the value of miss.

Increment Added Count: Whenever a number is added to cover a gap, increase the added counter.

Return Total Patches: Once miss exceeds n, return the total count of added numbers as the result, representing the minimum patches needed to form every number up to n.

 */

var minPatches = function (nums, n) {
    let miss = 1; // JavaScript uses let for block scope variables
    let result = 0;
    let i = 0;

    while (miss <= n) {
        if (i < nums.length && nums[i] <= miss) {
            miss += nums[i];
            i++;
        } else {
            miss += miss;
            result++;
        }
    }

    return result;
};