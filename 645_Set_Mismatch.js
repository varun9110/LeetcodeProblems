/**
 * 645. Set Mismatch
 * Difficulty : Easy
 * 
 * You have a set of integers s, which originally contains all the numbers from 1 to n. 
 * Unfortunately, due to some error, one of the numbers in s got duplicated to another number in the set, which results in repetition of 
 * one number and loss of another number.

You are given an integer array nums representing the data status of this set after the error.
Find the number that occurs twice and the number that is missing and return them in the form of an array.

Example 1:
Input: nums = [1,2,2,4]
Output: [2,3]
Example 2:
Input: nums = [1,1]
Output: [1,2]

Constraints:
2 <= nums.length <= 104
1 <= nums[i] <= 104
 */

/**
 * Idea:
(Note: I've added another solution that has a better space complexity at O(1) extra space vs. the original solution below at O(N) extra space, but it does so at the cost of an extra iteration through nums, though the time complexity remains O(N). Skip down to the Alternate Idea section for the breakdown.)

For this problem, we can take advantage of some math, because one thing we know about a sequence of numbers from 1 to N is that their sum should equal the Nth triangular number (N * (N + 1) / 2).

Since the only difference between the ideal array ranging from 1 to N and our input array nums is the duplicated number, that means that the difference between the sum of nums and the Nth triangular number is the same as the difference between our duplicated number (dupe) and the missing number.

We can easily find the duplicated number by utilizing a boolean array (seen) to keep track of which numbers have already been seen. While iterating through nums, whenever we come across a number for the second time, that number must be our dupe. We can also use this iteration to find the difference in the sums.

Then we can just return the dupe and the sum difference applied to the dupe to identify the missing number.

Altnerate Idea:
In order to solve this problem with O(1) extra space, we can use nums directly to keep track of which numbers have been seen so far. To do so, we need to be able to modify the elements of nums in such a way as to be easily able to obtain the original value again.

One of the easiest ways to do this is with the use of the mod operator (%). Since the largest value nums[i] is 10^4, we can use that number as our base. By adding 10^4 to the value of an element, it can now tell us two things: the original value of the element (num % 10^4) and whether or not the number equal to the index has been seen (num > 10^4).

Since the values in nums are 1-indexed and nums itself is 0-indexed, however, we'll have to shift the mod function to (nums - 1) % 10^4.

If we iterate through nums and apply this addition, then at the end, we'll know that the value that was seen twice will be > 20000 and the number that was never seen is < 10001.

So we just have to iterate through nums a second time, check for these values, add them to our answer (ans), and then return ans.

Implementation:
Javascript doesn't have a boolean array, so we can use the typed Uint8Array() as the closest stand-in. Python likewise doesn't have a boolean array, so we'll have to use a normal list.
 */



var findErrorNums = function(nums) {
    let N = nums.length, dupe, sum = N * (N + 1) / 2,
        seen = new Uint8Array(N+1)
    for (let i = 0; i < N; i++) {
        let num = nums[i]
        sum -= num
        if (seen[num]) dupe = num
        seen[num]++
    }
    return [dupe, sum + dupe]
};