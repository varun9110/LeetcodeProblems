/**
 * 2597. The Number of Beautiful Subsets
 * Difficulty: Medium
 * 
 * You are given an array nums of positive integers and a positive integer k.

A subset of nums is beautiful if it does not contain two integers with an absolute difference equal to k.

Return the number of non-empty beautiful subsets of the array nums.

A subset of nums is an array that can be obtained by deleting some (possibly none) elements from nums. 
Two subsets are different if and only if the chosen indices to delete are different.

 

Example 1:

Input: nums = [2,4,6], k = 2
Output: 4
Explanation: The beautiful subsets of the array nums are: [2], [4], [6], [2, 6].
It can be proved that there are only 4 beautiful subsets in the array [2,4,6].
Example 2:

Input: nums = [1], k = 1
Output: 1
Explanation: The beautiful subset of the array nums is [1].
It can be proved that there is only 1 beautiful subset in the array [1].
 

Constraints:

1 <= nums.length <= 20
1 <= nums[i], k <= 1000
 */

/**
 * Intuition 🤔
As we see this is the same problem as we solved yesterday 

and day before yesterday.

This perticular problem is saying --> 

1. We need to give the count of subArray of a given array

2. by considering the condition that 

3. no such two element present in our sub array 

4. whose absolute deffrence is equal to the given variable (k)
-------Considering you all now understand the problem -------
Approach 🔥 Let's discuss the approach
We are going to use our basic fanda of backtracking only ...

Yes yes only basic fanda 🥳
-----------------------What is BackTracking -->----------------

Every element have 2 choice either it will come with us
Or it will go alone in the tree 
Or you can say we have to choose one path if it gets wrong 
we can backtrack to any where

- This contain only 4 steps ...

1. Add the value    (choose one path)
2. Go to next step  (go forword on same path)
3. remove the value (take a one step back)
4. Go to next step  (choose another path)
2597 que.png

We will use only backtracking but with modification 🚀🚀🚀

We will add our value only if it will follow our given condition

Else we will not gonna add that 
UnderStand with code 💯
We will use Only backtracking Approach

- In which we have 5 works to do

1. Write the base case and make count variable with part array
2. Add the value after checking the condition with our isSafe fun
3. if safe then take first step (add) then one step ahead
4. Then backtrack our self by one step ( remove the last added)
5. call for the next step because every single step (element)
    will be our part except null array (Given)
Step 1. Make Global count variable and part and make our base case

Base case will hit if we reach to the last of index from which

no forword step gonna remain ...

Base case -->
    IF base case hit our count variable inc by one 

// Global count varibale
let count = 0;

var beautifulSubsets = function (nums, k) {
    count = 0;
    // Part array
    part = [];

    var subSetArr = function (i) {
        //base case
        if (i >= nums.length) {
            count++;
            return;
        }
    }

    subSetArr(0);
    return count - 1;
};
Step 2 - 3 - 4 Add if isSafe and implement isSafe and Go for the next step

isSafe function EXPLAIN -->

1. This function will check is upcoming number from nums array
2. will be our part of our part array or not
3. By sub next number to existing element of part array
4. If it comes equal to GIEVN (k) it will return false els true
var isSafe = function (nums, part, j, k) {
    for (let i = 0; i < part.length; i++) {
        if (Math.abs(nums[j] - part[i]) == k) {
            return false;
        }
    }

    return true;
}

var beautifulSubsets = function (nums, k) {
    // Backtracking if safe to add 
    if (isSafe(nums, part, i, k)) {
        part.push(nums[i]);
        subSetArr(i + 1);
        part.pop();
    }
    subSetArr(i + 1);

};
Step 5. Call our function and return the count


    subSetArr(0);
    return count - 1;
 */







var isSafe = function (nums, part, j, k) {
    for (let i = 0; i < part.length; i++) {
        if (Math.abs(nums[j] - part[i]) == k) {
            return false;
        }
    }

    return true;
}
let count = 0;

var beautifulSubsets = function (nums, k) {
    count = 0;
    part = [];

    var subSetArr = function (i) {
        if (i >= nums.length) {
            count++;
            return;
        }
        if (isSafe(nums, part, i, k)) {
            part.push(nums[i]);
            subSetArr(i + 1);
            part.pop();
        }
        subSetArr(i + 1);
    }

    subSetArr(0);
    return count - 1;
};