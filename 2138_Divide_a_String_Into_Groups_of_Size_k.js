/**
 * 2138. Divide a String Into Groups of Size k
 * A string s can be partitioned into groups of size k using the following procedure:

The first group consists of the first k characters of the string, the second group consists of the next k characters of the string, and so on. 
Each character can be a part of exactly one group.
For the last group, if the string does not have k characters remaining, a character fill is used to complete the group.
Note that the partition is done so that after removing the fill character from the last group (if it exists) and concatenating all the groups in order, 
the resultant string should be s.

Given the string s, the size of each group k and the character fill, return a string array denoting the composition of every group s has been divided into, 
using the above procedure.

Example 1:
Input: s = "abcdefghi", k = 3, fill = "x"
Output: ["abc","def","ghi"]
Explanation:
The first 3 characters "abc" form the first group.
The next 3 characters "def" form the second group.
The last 3 characters "ghi" form the third group.
Since all groups can be completely filled by characters from the string, we do not need to use fill.
Thus, the groups formed are "abc", "def", and "ghi".
Example 2:
Input: s = "abcdefghij", k = 3, fill = "x"
Output: ["abc","def","ghi","jxx"]
Explanation:
Similar to the previous example, we are forming the first three groups "abc", "def", and "ghi".
For the last group, we can only use the character 'j' from the string. To complete this group, we add 'x' twice.
Thus, the 4 groups formed are "abc", "def", "ghi", and "jxx".
 
Constraints:
1 <= s.length <= 100
s consists of lowercase English letters only.
1 <= k <= 100
fill is a lowercase English letter.
 */

/**
 * Approach:
 * Brute force: first iterate through the string and keep pushing the substring into the array.
 * Lastly check if there are some letters remaining, if yes the add the fillers to it and return
 */

/**
 * @param {string} s
 * @param {number} k
 * @param {character} fill
 * @return {string[]}
 */
var divideString = function(s, k, fill) {
    let arr = [];
    let i=0;
    let count = 0;
    let sub = ""
    while(i<s.length){
      if(count === k){
        arr.push(sub);
        count = 0;
        sub = "";
      }
      count++;
      sub += s[i];
      i++;
    }
    
    if(count === k){
      arr.push(sub);
    }

    if(count>0 && count < k){
      while(count < k){
        sub += fill;
        count++
      }
      arr.push(sub);
    }
    return arr;
};

/**
 * Another approach: 
 * Basically find the length of the string, then if there is remainder then add the filler to the end of the string so that the string is divisible by the number
 * then one logic to divide the string into the number of substring and return the resulting array
 */

var divideString = function (s, k, fill) {
    let result = [];
    let remainLetter = s.length % k;
    if (remainLetter !== 0) {
        s += fill.repeat(k - remainLetter);
    }

    let i = 0;
    while (i < s.length) {
        result.push(s.substring(i, i + k));
        i += k
    }
    return result;
}