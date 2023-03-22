/**
 * 929. Unique Email Addresses
 * Difficulty: Easy
 * Every valid email consists of a local name and a domain name, separated by the '@' sign. Besides lowercase letters, the email may contain one or more '.' or '+'.
For example, in "alice@leetcode.com", "alice" is the local name, and "leetcode.com" is the domain name.
If you add periods '.' between some characters in the local name part of an email address, mail sent there will be forwarded to the same address without dots in the local name. Note that this rule does not apply to domain names.
For example, "alice.z@leetcode.com" and "alicez@leetcode.com" forward to the same email address.
If you add a plus '+' in the local name, everything after the first plus sign will be ignored. This allows certain emails to be filtered. Note that this rule does not apply to domain names.
For example, "m.y+name@email.com" will be forwarded to "my@email.com".
It is possible to use both of these rules at the same time.
Given an array of strings emails where we send one email to each emails[i], return the number of different addresses that actually receive mails.

Example 1:
Input: emails = ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
Output: 2
Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com" actually receive mails.

Example 2:
Input: emails = ["a@leetcode.com","b@leetcode.com","c@leetcode.com"]
Output: 3
 
Constraints:
1 <= emails.length <= 100
1 <= emails[i].length <= 100
emails[i] consist of lowercase English letters, '+', '.' and '@'.
Each emails[i] contains exactly one '@' character.
All local and domain names are non-empty.
Local names do not start with a '+' character.
Domain names end with the ".com" suffix.
 */

/**
 * Approach: 
 * Split the value with @ and then compute the first part as per the instructions, i.e. if + is encountered then break the inner loop, is . is encountered the
 * ignore that and continue else keep adding the character to the first part. finally create the forwarding email and store it in the mapper.
 * if it already exists then do not increase the counter else do.
 */

 var numUniqueEmails = function(emails) {
    let mapper = {};
    let count =0;

    for(let i=0; i<emails.length; i++){
        let parts = emails[i].split("@");
        let firstPart = "";
        for(let j=0; j<parts[0].length; j++){
            if(parts[0][j] === "+"){
                break;
            } else if(parts[0][j] === "."){
                continue;
            }
            firstPart += parts[0][j];
        }
        let fullEmail = firstPart+"@"+parts[1];
        if(!mapper[fullEmail]){
            mapper[fullEmail] = 1;
            count++;
        }
    }
    return count;
};