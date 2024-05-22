/**
 * 131. Palindrome Partitioning
 * Difficulty: Medium
 * 
 * Given a string s, partition s such that every 
substring
 of the partition is a 
palindrome
. Return all possible palindrome partitioning of s.

 

Example 1:

Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
Example 2:

Input: s = "a"
Output: [["a"]]
 

Constraints:

1 <= s.length <= 16
s contains only lowercase English letters.
 */

/**
 * @param {string} s
 * @return {string[][]}
 */
const isPalindrome = str => ( str === str.split('').reverse().join('') );


var dfs = function(s, partition, result){
    
    // Base case:
    // Empty string must be palindrome
    if( 0 == s.length ){
        
        result.push( [...partition] );
        return;
    }
    
    
    // General cases:
    
    for( let i = 1; i <= s.length ; i++ ){
        
        let prefix = s.substring(0, i);
        let postfix = s.substring(i);
        
        // Current prefix is palindrome, keep trying to make more partition in postfix by DFS
        if( isPalindrome(prefix) ){
            
            partition.push( prefix );
            
            dfs( postfix, partition, result);
            
            partition.pop();
        }
        
    }
    return
};

var partition = function(s) {
    
    // buffer for partition in DFS
    let partition = [];
    
    // final output of palindrome substrings
    let result = [];
    
    dfs(s, partition, result);
    
    return result;
};