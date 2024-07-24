/**
 * 2191. Sort the Jumbled Numbers
 * Difficulty: Medium
 * 
 * You are given a 0-indexed integer array mapping which represents the mapping rule of a shuffled decimal system. mapping[i] = j means digit 
 * i should be mapped to digit j in this system.

The mapped value of an integer is the new integer obtained by replacing each occurrence of digit i in the integer with mapping[i] for all 0 <= i <= 9.

You are also given another integer array nums. Return the array nums sorted in non-decreasing order based on the mapped values of its elements.

Notes:

Elements with the same mapped values should appear in the same relative order as in the input.
The elements of nums should only be sorted based on their mapped values and not be replaced by them.
 

Example 1:

Input: mapping = [8,9,4,0,2,1,3,5,7,6], nums = [991,338,38]
Output: [338,38,991]
Explanation: 
Map the number 991 as follows:
1. mapping[9] = 6, so all occurrences of the digit 9 will become 6.
2. mapping[1] = 9, so all occurrences of the digit 1 will become 9.
Therefore, the mapped value of 991 is 669.
338 maps to 007, or 7 after removing the leading zeros.
38 maps to 07, which is also 7 after removing leading zeros.
Since 338 and 38 share the same mapped value, they should remain in the same relative order, so 338 comes before 38.
Thus, the sorted array is [338,38,991].
Example 2:

Input: mapping = [0,1,2,3,4,5,6,7,8,9], nums = [789,456,123]
Output: [123,456,789]
Explanation: 789 maps to 789, 456 maps to 456, and 123 maps to 123. Thus, the sorted array is [123,456,789].
 

Constraints:

mapping.length == 10
0 <= mapping[i] <= 9
All the values of mapping[i] are unique.
1 <= nums.length <= 3 * 104
0 <= nums[i] < 109
 */

/**
 * Approach 1: Data Type Conversion
🤔 Intuition
So, as it turns out, it’s impossible to solve this problem without “translating” each number (or at least I haven’t found such a way, would be grateful if you share one if you found)
Thus, the task becomes quite easy (you just need "translate" every number and map to it the original), although the effectiveness of the solutions remains in question (converting every number digit by digit even with second approach seems very unefficient and probably would fail with really big number).
Okay, this is quite uncomfortable to change digits in the number as integer (though possible, check next approach) so let's convert every number to the str (or array in Python, for example) and then back to integer
👩🏻‍💻 Coding
Inside sortJumbled, define a helper function translate_integer:
Convert the integer num to a array of its digits as strings.
Replace each digit with the corresponding value from the mapping array.
Join the modified digits back into a single string and convert it to an integer.
Create an empty hashmap number_mapping.
Iterate over each number in nums:
Use the translate_integer function to convert the number.
Store the result in number_mapping with the original number as the key.
Sort the nums array using a lambda function that sorts based on the translated values from number_mapping.
Return the sorted nums array.
📗 Complexity Analysis
⏰ Time complexity: O(n * log n), since we use built-in sort functions (usually n * log n) and also perform many strings/array manipulations
🧺 Space complexity: O(n), since sorts algorithms usually take extra space (O(n) of O(log n) depending on language) and we use number_mapping with size n -> O(n) anyway
 */

/**
 * @param {number[]} mapping
 * @param {number[]} nums
 * @return {number[]}
 */
var sortJumbled = function(mapping, nums) {
    const translateInteger = (num) => {
        let digits = num.toString().split('');
        for (let i = 0; i < digits.length; i++) {
            digits[i] = mapping[digits[i]];
        }
        return parseInt(digits.join(''));
    };

    const numberMapping = {};
    for (let num of nums) {
        if (!(num in numberMapping)) {
            numberMapping[num] = translateInteger(num);
        }
    }

    nums.sort((a, b) => numberMapping[a] - numberMapping[b]);

    return nums;
};