/**
 * 165. Compare Version Numbers
 * Difficulty: Medium
 * 
 * Given two version numbers, version1 and version2, compare them.

Version numbers consist of one or more revisions joined by a dot '.'. Each revision consists of digits and may 
contain leading zeros. Every revision contains at least one character. Revisions are 0-indexed from left to right, 
with the leftmost revision being revision 0, the next revision being revision 1, and so on. For example 2.5.33 and 0.1 are valid version numbers.

To compare version numbers, compare their revisions in left-to-right order. Revisions are compared using their 
integer value ignoring any leading zeros. This means that revisions 1 and 001 are considered equal. 
If a version number does not specify a revision at an index, then treat the revision as 0. For example, version 1.0 
is less than version 1.1 because their revision 0s are the same, but their revision 1s are 0 and 1 respectively, and 0 < 1.

Return the following:

If version1 < version2, return -1.
If version1 > version2, return 1.
Otherwise, return 0.
 

Example 1:

Input: version1 = "1.01", version2 = "1.001"
Output: 0
Explanation: Ignoring leading zeroes, both "01" and "001" represent the same integer "1".
Example 2:

Input: version1 = "1.0", version2 = "1.0.0"
Output: 0
Explanation: version1 does not specify revision 2, which means it is treated as "0".
Example 3:

Input: version1 = "0.1", version2 = "1.1"
Output: -1
Explanation: version1's revision 0 is "0", while version2's revision 0 is "1". 0 < 1, so version1 < version2.
 

Constraints:

1 <= version1.length, version2.length <= 500
version1 and version2 only contain digits and '.'.
version1 and version2 are valid version numbers.
All the given revisions in version1 and version2 can be stored in a 32-bit integer.
 */

/**
 * Approach
Define a helper function to extract the next version component and its index from a given string.
Helper function takes version string s and starting index idx as input parameters.
Initialise num with 0.
While idx is less than length of s. If s[idx] equal to . means version component ended so break the loop, else its integer so add it to 10*num.
Return component version num and next starting index idx as array.
Iterate through the version components of both input strings, comparing them component by component.
If a component in version1 is greater than the corresponding component in version2, return 1. If it's smaller, return -1.
If all components are equal, return 0.
 */

var compareVersion = function(version1, version2) {
    const helper = function(s, idx) {
        let num = 0;
        while (idx < s.length) {
            if (s[idx] === '.') break;
            else num = num * 10 + parseInt(s[idx]);
            idx++;
        }
        return [num, idx + 1];
    };

    let i = 0, j = 0;
    result1 = [], result2 = [];
    while (i < version1.length || j < version2.length) {
        result1 = helper(version1, i);
        result2 = helper(version2, j);
        const v1 = result1[0], v2 = result2[0];
        i = result1[1]; j = result2[1];
        if (v1 > v2) return 1;
        else if (v1 < v2) return -1;
    }
    return 0;
};