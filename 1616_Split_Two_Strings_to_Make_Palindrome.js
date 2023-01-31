/*
1616. Split Two Strings to Make Palindrome
Difficulty: Medium

You are given two strings a and b of the same length. Choose an index and split both strings at the same index, splitting a into two strings: aprefix and asuffix where a = aprefix + asuffix, and splitting b into two strings: bprefix and bsuffix where b = bprefix + bsuffix. Check if aprefix + bsuffix or bprefix + asuffix forms a palindrome.
When you split a string s into sprefix and ssuffix, either ssuffix or sprefix is allowed to be empty. For example, if s = "abc", then "" + "abc", "a" + "bc", "ab" + "c" , and "abc" + "" are valid splits.
Return true if it is possible to form a palindrome string, otherwise return false.
Notice that x + y denotes the concatenation of strings x and y.

 

Example 1:
Input: a = "x", b = "y"
Output: true
Explaination: If either a or b are palindromes the answer is true since you can split in the following way:
aprefix = "", asuffix = "x"
bprefix = "", bsuffix = "y"
Then, aprefix + bsuffix = "" + "y" = "y", which is a palindrome.

Example 2:
Input: a = "xbdef", b = "xecab"
Output: false

Example 3:
Input: a = "ulacfd", b = "jizalu"
Output: true
Explaination: Split them at index 3:
aprefix = "ula", asuffix = "cfd"
bprefix = "jiz", bsuffix = "alu"
Then, aprefix + bsuffix = "ula" + "alu" = "ulaalu", which is a palindrome.
 

Constraints:
1 <= a.length, b.length <= 105
a.length == b.length
a and b consist of lowercase English letters

*/

/*
Approach 1: Brute Force
Proceed as the steps says. 
i index frmo 0 to the end of length, then keep creating a new string by the prefix and suffix of the both the strings and then keep finding the palindrom in that
*/

var checkPalindromeFormation = function(a, b) {
    let len = a.length;
    let i=0;
    while(i<len){
        let aPrefix = a.substring(0,i);
        let bPrefix = b.substring(0,i);
        let aSuffix = a.substring(i,len);
        let bSuffix = b.substring(i,len);

        let first = aPrefix + bSuffix;
        let second = bPrefix + aSuffix;

        console.log("i: ", i);
        console.log("first: ", first);
        console.log("second: ", second);

         
        var firstArray = first.split("");
        var reverseFirstArray = firstArray.reverse()
        var firstReverse = reverseFirstArray.join("");

        var secondArray = second.split("");
        var reverseSecondArray = secondArray.reverse()
        var secondReverse = reverseSecondArray.join("");

        console.log("firstReverse: ", firstReverse);
        console.log("secondReverse: ", secondReverse);

        if( first === firstReverse || second === secondReverse ){
            return true;
        }
        i++;
    }

    return false;
};

/*
Approach 2: 
Find in the two string that the start of 1st and ending of the last is same. from the time they start to differ,
if in that range in any of the string is Palindrome then it is a palindrome.
*/

const checkPalindromeFormation = (a, b) => {
    
    //checks whether range i, j in string s is a palindrome
    const rangeIsPalindrome = (s, i, j) => {
        while (i < j){
            if (s[i] !== s[j])
                return false;
            i++;
            j--;
        }
        return true;
    };
    
    //a is the prefix string, b is the suffix string; remove leading and trailing letter sequence from a and trailing letter sequence from b that matches, check if the unaccounted middle portion is a palindrome in either a or b
    const findSplicedPalindrome = (a, b) => {
        let i = 0, j = a.length - 1;
        while (i < j && a[i] === b[j]){       
            i++;
            j--;
        }
        return rangeIsPalindrome(a, i, j) || rangeIsPalindrome(b, i, j);
    };
    
    //Try the palindrome search with each of the strings a and b as both the prefix string and the suffix string
    return findSplicedPalindrome(a, b) || findSplicedPalindrome(b, a);
};