/*

2124_Check_if_All_A's_Appears_Before_All_B's
Difficulty : Easy

Given a string s consisting of only the characters 'a' and 'b', return true if every 'a' appears before every 'b' in the string. Otherwise, return false.

Example 1:

Input: s = "aaabbb"
Output: true
Explanation:
The 'a's are at indices 0, 1, and 2, while the 'b's are at indices 3, 4, and 5.
Hence, every 'a' appears before every 'b' and we return true.
Example 2:

Input: s = "abab"
Output: false
Explanation:
There is an 'a' at index 2 and a 'b' at index 1.
Hence, not every 'a' appears before every 'b' and we return false.
Example 3:

Input: s = "bbb"
Output: true
Explanation:
There are no 'a's, hence, every 'a' appears before every 'b' and we return true.

*/

var checkString = function(s) {

    var arr = s.split("");
    for(let i =0; i<=arr.length-2; i++){
        if(arr[i] === "b" && arr[i+1] === "a"){
            return false;
        }
    }
    return true;

};