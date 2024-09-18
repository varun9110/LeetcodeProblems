/**
 * 179. Largest Number
 * Difficulty: Medium
 * 
 * Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.
Since the result may be very large, so you need to return a string instead of an integer.

Example 1:
Input: nums = [10,2]
Output: "210"
Example 2:
Input: nums = [3,30,34,5,9]
Output: "9534330"

Constraints:
1 <= nums.length <= 100
0 <= nums[i] <= 109
 */

/**
 * Intuition
To solve this, convert numbers to strings, sort them by custom logic (comparing concatenated values), and join them to form the largest possible number, 
handling leading zeros.

Approach
Convert Integers to Strings: Since comparing individual digits of integers won't work directly for concatenation, first convert the integer array 
into an array of strings. This allows us to concatenate and compare the results of a + b and b + a.

Custom Sorting: Use a custom comparator to sort the string array. The comparator should compare two strings a and b by checking the 
results of a + b vs b + a. If a + b is larger, then a should come before b in the sorted array.

Edge Case: After sorting, if the largest number is "0" (i.e., if the first element in the sorted array is "0"), return "0", since this means all numbers were zeros.

Construct the Result: Use a StringBuilder to concatenate all the strings in the sorted array into the final result.

Complexity
Time complexity:
the total complexity is: O(nlogn)

Space complexity:
the overall space complexity is: O(n)
 */

/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
    // Convert integers to strings
    let array = nums.map(String);

    // Custom sorting with a comparator function
    array.sort((a, b) => (b + a).localeCompare(a + b));

    // Handle the case where the largest number is "0"
    if (array[0] === "0") {
        return "0";
    }

    // Build the largest number from the sorted array
    return array.join('');
};