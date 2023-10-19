/**
 * 2287. Rearrange Characters to Make Target String
 * Difficulty: Easy
 * 
 * You are given two 0-indexed strings s and target. You can take some letters from s and rearrange them to form new strings.
Return the maximum number of copies of target that can be formed by taking letters from s and rearranging them.
Example 1:
Input: s = "ilovecodingonleetcode", target = "code"
Output: 2
Explanation:
For the first copy of "code", take the letters at indices 4, 5, 6, and 7.
For the second copy of "code", take the letters at indices 17, 18, 19, and 20.
The strings that are formed are "ecod" and "code" which can both be rearranged into "code".
We can make at most two copies of "code", so we return 2.
Example 2:
Input: s = "abcba", target = "abc"
Output: 1
Explanation:
We can make one copy of "abc" by taking the letters at indices 0, 1, and 2.
We can make at most one copy of "abc", so we return 1.
Note that while there is an extra 'a' and 'b' at indices 3 and 4, we cannot reuse the letter 'c' at index 2, so we cannot make a second copy of "abc".
Example 3:
Input: s = "abbaccaddaeea", target = "aaaaa"
Output: 1
Explanation:
We can make one copy of "aaaaa" by taking the letters at indices 0, 3, 6, 9, and 12.
We can make at most one copy of "aaaaa", so we return 1.
Constraints:
1 <= s.length <= 100
1 <= target.length <= 10
s and target consist of lowercase English letters.
 */

var rearrangeCharacters = function(s, target) {
    let targetMapper = {};
    let wholeMapper = {};
    let num=Number.POSITIVE_INFINITY;
    for(let i=0; i<target.length; i++){
        targetMapper[target[i]] = (targetMapper[target[i]]) ? targetMapper[target[i]]+1 : 1;
    }
    for(let i=0; i<s.length; i++){
        wholeMapper[s[i]] = (wholeMapper[s[i]]) ? wholeMapper[s[i]]+1 : 1;
    }
    let arr = Object.keys(targetMapper);
    for(let i=0; i<arr.length; i++){
        
        if(!wholeMapper[arr[i]]) wholeMapper[arr[i]] = 0;
        let number = wholeMapper[arr[i]]/targetMapper[arr[i]];
        num = Math.floor(Math.min(num, number));
    }
    return num
};

var rearrangeCharacters = function(s, target) {
    let min=s.length
    for(let l of target){
        let re = new RegExp(l, 'g')
        min=Math.min(min,Math.trunc((s.match(re)?.length || 0)/target.match(re).length))
    }
    return min
};