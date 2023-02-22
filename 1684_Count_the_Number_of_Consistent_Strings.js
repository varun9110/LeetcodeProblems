/*
1684. Count the Number of Consistent Strings
Difficulty: Easy

You are given a string allowed consisting of distinct characters and an array of strings words. A string is consistent if all characters in the string appear in the string allowed.

Return the number of consistent strings in the array words.

 

Example 1:

Input: allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
Output: 2
Explanation: Strings "aaab" and "baa" are consistent since they only contain characters 'a' and 'b'.
Example 2:

Input: allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
Output: 7
Explanation: All strings are consistent.
Example 3:

Input: allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"]
Output: 4
Explanation: Strings "cc", "acd", "ac", and "d" are consistent.
 

Constraints:

1 <= words.length <= 104
1 <= allowed.length <= 26
1 <= words[i].length <= 10
The characters in allowed are distinct.
words[i] and allowed contain only lowercase English letters.

*/

/*
Approach :
Straight forward approad is to create a mapper of the allowed string.
and then iterate through all the strings in the word array. if any of the string doesnt match the mapper then break and do not increment the counter
if all of them matches then increase the counter and return the value at the end.

*/

var countConsistentStrings = function(allowed, words) {
    let allowedArray = allowed.split("");
    let mapper = {};
    for(let i=0; i<allowedArray.length; i++){
        if(!mapper[allowedArray[i]]){
            mapper[allowedArray[i]] = allowedArray[i];
        }
    }
    let count = 0;
    for(let j=0; j<words.length; j++){
        let wordArray = words[j].split("");
        let flag = true;
        for(let k=0; k<wordArray.length; k++){
            if(!mapper[wordArray[k]]){
                flag = false;
                break;
            }
        }
        if(flag){
            count++;
        }
    }
    return count;
};


