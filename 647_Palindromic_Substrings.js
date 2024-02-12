/**
 * 647. Palindromic Substrings
 * Difficulty: Medium
 * 
 * Given a string s, return the number of palindromic substrings in it.
A string is a palindrome when it reads the same backward as forward.
A substring is a contiguous sequence of characters within the string.


Example 1:
Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
Example 2:
Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
 

Constraints:

1 <= s.length <= 1000
s consists of lowercase English letters.
 */

/**
 * Approach :
 * So Basically If I know a string is palindrome and I divide it in two parts ( if length is even ) that would have same characters.
and for odd length except the middle element, all other characters would be same.
So If I pick a character and expand it's left and right side till I have similiar elements. Those would be palindrome. 
But this could be even length palindrome's middle or odd length palindrome's middle. So we will take care of both case.
If it is odd, expand left = (i-1) and right = (i+1)
If it is even, expand left = (i) and right = (i+1)

We have to do this for each character to explore all substrings.

Approach seems good to me. Let's discuss Time and Space Complexity then we can proceed for the code part.

Sure , Here Time Complexity would be O(n^2) because for a character worst case can be to traverse all neighbours.
and Space Complexity would be O(1).

Another Approach ( Using DP )
What about the length 1 ?
Yes, It will always be palindrome.

and What about length 2 ?
It would be palindrome if only both are same.
now let's say I have one string f(a, b) = "nitin"
and I know that f(a+1, b-1) is palindrome, then if the boundary characters are same I can say that this is palindrome.
Here we can say that if I know the answer for length 1, I can build the answer for length 3, how ?
So basically I just need to check boundary elements and middle one I already know if it palindrome or not.
 * 
 */


var countSubstrings = function(s) {
    const n = s.length;
    const palindrome = Array.from(Array(n), () => Array(n).fill(false));
    let ans = 0;

    for (let i = 0; i < n; i++) {
        palindrome[i][i] = true;
        ans++;
    }

    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            palindrome[i][i + 1] = true;
            ans++;
        }
    }

    for (let len = 3; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            if (s[i] === s[i + len - 1] && palindrome[i + 1][i + len - 2]) {
                palindrome[i][i + len - 1] = true;
                ans++;
            }
        }
    }

    return ans;
};

let countSubstrings = function(s) {
    let resLen = 0

    let countPalidrome=function(l,r){
        let res=0
        while (l>=0 && r<s.length && s[l]==s[r]){
            res++
            l--
            r++
        }
    
        return res
    }

    for (let i=0;i<s.length; i++){
        //handle odd length
        resLen+=countPalidrome(i,i)
        //handle even length
        resLen+=countPalidrome(i,i+1)
    }
    return resLen
};
