/**
 * 791. Custom Sort String
 * Difficulty: Medium
 * 
 * You are given two strings order and s. All the characters of order are unique and were sorted in some custom order previously.

Permute the characters of s so that they match the order that order was sorted. More specifically, if a character x 
occurs before a character y in order, then x should occur before y in the permuted string.

Return any permutation of s that satisfies this property.

Example 1:
Input:  order = "cba", s = "abcd" 
Output:  "cbad" 
Explanation: "a", "b", "c" appear in order, so the order of "a", "b", "c" should be "c", "b", and "a".
Since "d" does not appear in order, it can be at any position in the returned string. "dcba", "cdba", "cbda" are also valid outputs.

Example 2:
Input:  order = "bcafg", s = "abcd" 
Output:  "bcad" 
Explanation: The characters "b", "c", and "a" from order dictate the order for the characters in s. 
The character "d" in s does not appear in order, so its position is flexible.

Following the order of appearance in order, "b", "c", and "a" from s should be arranged as "b", "c", "a". "d" can be 
placed at any position since it's not in order. The output "bcad" correctly follows this rule. 
Other arrangements like "bacd" or "bcda" would also be valid, as long as "b", "c", "a" maintain their order.

Constraints:
1 <= order.length <= 26
1 <= s.length <= 200
order and s consist of lowercase English letters.
All the characters of order are unique.
 */

/**
 * Approach :
 * Create a map of the string and then iterate through the order string and create the new string and keep deleting that Key
 * Lastly, iterate through the remainig keys and append them to the string
 */

const createString = (chr, count) => {
    let result = "";
    for(let i=0; i<count; i++){
        result += chr
    }
    return result;
};

var customSortString = function(order, s) {
    let mapS = {};

    for(let i=0; i<s.length; i++){
        mapS[s[i]] = (mapS[s[i]]) ? mapS[s[i]]+1 : 1;
    }

    let result = "";

    for(let i=0; i<order.length; i++){
        if(mapS[order[i]]){
            result += createString(order[i], mapS[order[i]]);
            delete mapS[order[i]];
        }
    }
    let remain = Object.keys(mapS);
    for(let i=0; i<remain.length; i++){
        if(mapS[remain[i]]){
            result += createString(remain[i], mapS[remain[i]]);
            delete mapS[remain[i]];
        }
    }

    return result
    
};

