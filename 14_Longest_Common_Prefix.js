/*
14. Longest Common Prefix
Difficulty : Easy

Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string "".

Example 1:
Input: strs = ["flower","flow","flight"]
Output: "fl"

Example 2:
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
 
Constraints:
1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters.
*/

/*
Approach: Brute force
Base condition:  if the length of the array is 1 then just return the same string
if more than 1 then do the following
first compare the first 2 strings to get the common string in them. Use while loop to get that common string

Then create a loop from k=2 to the end of the string array (strs).
Now, match characters of these strs[k] with the common string, and keep storing the matched string to a new string. 
Whenever that loop breaks then overwrite the common with the new common.

finally return the common string.
*/

var longestCommonPrefix = function(strs) {
    if(strs.length === 1){
        return strs[0]
    }

    let first = strs[0];
    let second  = strs[1];

    let common = "";
    let i=0;
    while(i<first.length && first.charAt(i) === second.charAt(i)){
        common += first.charAt(i);
        i++;
    }

    let commonLength = common.length;

    for(let j=2; j<strs.length; j++){
        let newCommon = "";
        let k=0;

        while(k<commonLength && strs[j].charAt(k) === common.charAt(k)){
            newCommon += strs[j].charAt(k);
            k++;
        }
        common = newCommon;
    }
    return common;
};


/*

A little refined but same complexity:
Approach:
base condition: if the array is empty then return ""
if not then iterate through all the charaters in the first index in the string array.
Keep matching each character with character at the same position in strings in the complete array.
where ever they dont match, return that substring.

If all of them matches then return the first string.

*/

function longestCommonPrefix(strs) {
	// Return early on empty input
	if (!strs.length) return '';

	// Loop through the characters of the first string
	for (let i = 0; i < strs[0].length; i++) {
		// Loop through all strings
		for (let str of strs) {
			// Check if the character is present in the same position in all strings
			if (str[i] !== strs[0][i]) {
				// If not, return the first string, up to the character that was not found
				return str.slice(0, i);
			}
		}
	}

	// All characters were found, return the entire first string
	return strs[0];
}