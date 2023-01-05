/*

2311_Longest_Binary_Subsequence_Less_Than_or_Equal_to_K
Difficulty : Medium

You are given a binary string s and a positive integer k.

Return the length of the longest subsequence of s that makes up a binary number less than or equal to k.

Note:

The subsequence can contain leading zeroes.
The empty string is considered to be equal to 0.
A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.
 

Example 1:

Input: s = "1001010", k = 5
Output: 5
Explanation: The longest subsequence of s that makes up a binary number less than or equal to 5 is "00010", as this number is equal to 2 in decimal.
Note that "00100" and "00101" are also possible, which are equal to 4 and 5 in decimal, respectively.
The length of this subsequence is 5, so 5 is returned.
Example 2:

Input: s = "00101001", k = 1
Output: 6
Explanation: "000001" is the longest subsequence of s that makes up a binary number less than or equal to 1, as this number is equal to 1 in decimal.
The length of this subsequence is 6, so 6 is returned.
 

Constraints:

1 <= s.length <= 1000
s[i] is either '0' or '1'.
1 <= k <= 109

*/

//My solution using recurrsion, fails at long iterations:

let getHighestCount = (s, k) => {
    if(s.length === 0){
        return 0;
    }

    if(k.length === 0){
        return (s.replaceAll("1", "").length);
    }

    let result = 0;

    if(s[s.length-1] === k[k.length -1]){
        result = 1 + getHighestCount(s.slice(0,-1) , k.slice(0,-1));
    } else {
        result = 0 + getHighestCount(s.slice(0,-1) , k);
    }

    return result;
};

var longestSubsequence = function(s, k) {
    
    if(s.length < 1 && s.length > 1000){
        return 0;
    }
    if(k < 1 && l.length > 1000000000){
        return "Invalid K";
    }

    let largest = 0;

    let trimmedS = s.replace(/^0+/, '');
    if(trimmedS === ""){
        return s.length;
    }
    let numbericalS = parseInt( trimmedS ,2);
    if(k > numbericalS){
        k = numbericalS;
    }

    console.log(numbericalS);

    for(let i = k; i >= 0; i--){
        let iBinary = i.toString(2);
        let result = getHighestCount(s, iBinary);
        if(result > largest){
            largest = result;
        }
    }

    return largest;
};


// O(n) solution, highly complex:

var longestSubsequence = function(s, k) {
    let ans = 0;
    //We can take all 0s for any case
    for(let i=0;i<s.length;i++){
        if(s[i]==='0'){
            ans++;
        }
    }
    let sum=0n;
    /*Now we will try to take as many 1s as possible.
    We will start taking from the rightmost 1 and keep taking 1s till the sum is less than or equal to k
    We will stop when the sum is greater than k
    */
    for(let i=s.length-1;i>=0;i--){
        let index = s.length-1-i;
        if(s[i]==='1'){
            let addition = BigInt(Math.pow(2,index));
            if(sum+addition<=k){
                sum += addition;
                ans++;
            }else{
                break;
            }
        }
    }
    return ans;
};


//Still read this solution: 
//Complexity O(n log K)

var longestSubsequence = function(s, k) {
    const len = s.length
    const table = new Array(len)
    
    
    for (let i = 0; i < len; i++) {
        const ch = s[i], digit = Number(ch)
        let j = i + 1
        for (let val = digit; j < len; j++) {
            const offset = j - i
            const d = Number(s[j])
            val = 2 * val + d
            
            if (val > k)    break
        }
        
        table[i] = j - i
    }
    
    
    let maxLength = 1
    for (let i = 0, zeroCount = 0; i < len; i++) {
        const lenFR = table[i]
        const outcome = zeroCount + lenFR
        maxLength = Math.max(maxLength, outcome)
        
        const ch = s[i]
        if (ch === '0') zeroCount++
    }
    
    
    return maxLength
};