/**
 * 2182. Construct String With Repeat Limit
 * Difficulty: Medium
 * 
 * You are given a string s and an integer repeatLimit. Construct a new string repeatLimitedString using the characters of s such that 
 * no letter appears more than repeatLimit times in a row. You do not have to use all characters from s.

Return the lexicographically largest repeatLimitedString possible.

A string a is lexicographically larger than a string b if in the first position where a and b differ, string a has a letter that 
appears later in the alphabet than the corresponding letter in b. If the first min(a.length, b.length) characters do not differ, 
then the longer string is the lexicographically larger one.

Example 1:

Input: s = "cczazcc", repeatLimit = 3
Output: "zzcccac"
Explanation: We use all of the characters from s to construct the repeatLimitedString "zzcccac".
The letter 'a' appears at most 1 time in a row.
The letter 'c' appears at most 3 times in a row.
The letter 'z' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "zzcccac".
Note that the string "zzcccca" is lexicographically larger but the letter 'c' appears more than 3 times in a row, so it is not a valid repeatLimitedString.
Example 2:

Input: s = "aababab", repeatLimit = 2
Output: "bbabaa"
Explanation: We use only some of the characters from s to construct the repeatLimitedString "bbabaa". 
The letter 'a' appears at most 2 times in a row.
The letter 'b' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "bbabaa".
Note that the string "bbabaaa" is lexicographically larger but the letter 'a' appears more than 2 times in a row, so it is not a valid repeatLimitedString.
 

Constraints:

1 <= repeatLimit <= s.length <= 105
s consists of lowercase English letters.
 */

/**
 * Intuition
We are tasked with constructing the lexicographically largest string possible from the string s, while ensuring that no character appears more than repeatLimit times consecutively.

To achieve this, we need to:

Maximize lexicographical order: We prioritize placing the lexicographically largest characters in the result first.
Avoid exceeding the repeat limit: We need to carefully manage the addition of characters to avoid placing any character more than repeatLimit times consecutively.
Key Insights:
Sorting in Descending Order: Sorting the characters of the string in descending order allows us to first try to place the largest characters. This helps in creating the lexicographically largest string.
Consecutive Occurrences: We need to ensure that we don't violate the constraint that no character appears more than repeatLimit times consecutively. If we try to add a character that would exceed this limit, we must skip it and use another character.
🚀 Approach
Sort the String:

We first sort the string s in descending order using sort(s.rbegin(), s.rend()). This ensures that the largest characters appear first, giving us the lexicographically largest possible result when constructing the string.
Iterate Over the Sorted String:

We need to iterate through the sorted string and build the result string, while managing the consecutive occurrences of characters.
For each character in the string:
If it's the same as the last character added to the result, we check if it has already appeared repeatLimit times consecutively. If it has, we skip it and attempt to add a different character.
If it's a different character, we add it directly to the result string.
Handling the Repeat Limit:

For every character added to the result, we track how many times that character has appeared using a variable freq.
If a character appears repeatLimit times consecutively, we move on to the next available character, which may involve skipping over repeated characters using a pointer.
Pointer Management:

If we encounter a character that has already appeared repeatLimit times consecutively, we use a pointer to find the next distinct character in the sorted string and add that to the result.
The pointer ensures that we don't violate the repeat limit and helps us find the next valid character to place.
Final Output:

After processing all the characters and carefully managing the repeat limit, we return the constructed string as the result.
⏳ Complexity
Time complexity:

Sorting the string takes O(n log n), where n is the length of the string s.
The iteration through the string takes O(n). Hence, the overall time complexity is dominated by the sorting step, giving a total of O(n log n).
Space complexity:

We use a few variables (e.g., freq, pointer) and store the result string, which gives a space complexity of O(n), where n is the length of the string.
 */

/**
 * @param {string} s
 * @param {number} repeatLimit
 * @return {string}
 */
var repeatLimitedString = function(s, repeatLimit) {
    const alphabet = Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
        const charCode = s[i].charCodeAt(0) - 97;
        alphabet[charCode]++;
    }

    let limit;
    let left = alphabet.length - 2;
    let right = alphabet.length - 1;
    let string = '';

    while (right > 0) {
        while (right > 0 && !alphabet[right]) right--;
        left = right - 1;
        while (left >= 0 && !alphabet[left]) left--;

        limit = repeatLimit;

        while (alphabet[right] && limit--) {
            string += String.fromCharCode(right + 97);
            alphabet[right]--;
        }

        if (alphabet[right] && left >= 0) {
            string += String.fromCharCode(left + 97);
            alphabet[left]--;
        } else if (alphabet[right] > 0) {
            break;
        }
    }

    return string;
};