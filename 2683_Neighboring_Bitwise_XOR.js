/**
 * 2683. Neighboring Bitwise XOR
 * Difficulty: Medium
 * 
 * A 0-indexed array derived with length n is derived by computing the bitwise XOR (⊕) of adjacent values in a binary array original of length n.

Specifically, for each index i in the range [0, n - 1]:

If i = n - 1, then derived[i] = original[i] ⊕ original[0].
Otherwise, derived[i] = original[i] ⊕ original[i + 1].
Given an array derived, your task is to determine whether there exists a valid binary array original that could have formed derived.

Return true if such an array exists or false otherwise.

A binary array is an array containing only 0's and 1's
 

Example 1:

Input: derived = [1,1,0]
Output: true
Explanation: A valid original array that gives derived is [0,1,0].
derived[0] = original[0] ⊕ original[1] = 0 ⊕ 1 = 1 
derived[1] = original[1] ⊕ original[2] = 1 ⊕ 0 = 1
derived[2] = original[2] ⊕ original[0] = 0 ⊕ 0 = 0
Example 2:

Input: derived = [1,1]
Output: true
Explanation: A valid original array that gives derived is [0,1].
derived[0] = original[0] ⊕ original[1] = 1
derived[1] = original[1] ⊕ original[0] = 1
Example 3:

Input: derived = [1,0]
Output: false
Explanation: There is no valid original array that gives derived.
 
 */

/**
 * Intuition
The problem requires us to determine if there exists a binary array original such that the derived array can be formed using the XOR operation on adjacent elements. 
The derived array has a cyclic nature, meaning the last element is derived from the last and the first elements of the original array. 
The key insight is that the XOR of all elements in the derived array must equal zero for a valid original array to exist. 
This is because each element in the derived array represents a relationship between two elements in the original array, and for the relationships to be consistent, 
the overall XOR must cancel out.

Approach
XOR Calculation: We will compute the XOR of all elements in the derived array. If the result is zero, it indicates that there is a consistent way to 
assign values to the original array that satisfies all the XOR relationships defined by the derived array.
Return Result: If the total XOR is zero, we return true, indicating that a valid original array exists. Otherwise, we return false.
The implementation iterates through the derived array once, performing the XOR operation, which is efficient.

Complexity
Time complexity: O(n), where n is the length of the derived array. We traverse the array once to compute the total XOR.

Space complexity: O(1), as we are using a constant amount of space for the total variable, regardless of the input size.
 */

/**
 * @param {number[]} derived
 * @return {boolean}
 */
var doesValidArrayExist = function(derived) {
    let total = 0;
    // Calculate the XOR of all elements in the derived array
    for (let num of derived) {
        total ^= num; // XOR operation
    }
    // A valid original array exists if the total XOR is 0
    return total === 0;
};