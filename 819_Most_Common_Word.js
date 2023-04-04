/**
 * 819. Most Common Word
 * Difficulty: Easy
 * Given a string paragraph and a string array of the banned words banned, return the most frequent word that is not banned. It is guaranteed there is at least one 
 * word that is not banned, and that the answer is unique.
The words in paragraph are case-insensitive and the answer should be returned in lowercase.
Example 1:
Input: paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.", banned = ["hit"]
Output: "ball"
Explanation: 
"hit" occurs 3 times, but it is a banned word.
"ball" occurs twice (and no other word does), so it is the most frequent non-banned word in the paragraph. 
Note that words in the paragraph are not case sensitive,
that punctuation is ignored (even if adjacent to words, such as "ball,"), 
and that "hit" isn't the answer even though it occurs more because it is banned.
Example 2:
Input: paragraph = "a.", banned = []
Output: "a"
Constraints:
1 <= paragraph.length <= 1000
paragraph consists of English letters, space ' ', or one of the symbols: "!?',;.".
0 <= banned.length <= 100
1 <= banned[i].length <= 10
banned[i] consists of only lowercase English letters.
 */

/**
 * Approach:
 * Add a space to the end of the paragraph to count the last word as well. Create a bannedMapeer to track that easily, wordMapper to track each word. breaker to check for
 * the word break.
 * maxCount to calculate the max occurences of a word. and result to store the reuslt.
 * 
 * for loop to generate the banned woed mapper
 * 
 * for loop to extract each word. Then check if it is not a part of the banned word, the create/update the entry in the word mapper. check the count against the maxCount 
 * if more then store it in the result.
 */

 var mostCommonWord = function(paragraph, banned) {
    paragraph += " ";
    paragraph = paragraph.toLowerCase();
    let bannedMapper = {};
    let wordMapper = {};
    let breaker = {
        "!" : 1,
        "?" : 1,
        "'" : 1,
        "," : 1,
        ";" : 1,
        "." : 1,
    }
    let maxCount = 0;
    let result ="";
    
    for(let i=0; i<banned.length; i++){
        bannedMapper[banned[i]] = 1;
    }

    let word = "";
    for(let j=0; j<paragraph.length; j++){
        if( (paragraph[j] === " " || breaker[paragraph[j]])){
            if(!bannedMapper[word] && word.length>0){
                let currentCount = ( wordMapper[word]) ? wordMapper[word]+1 : 1;
                wordMapper[word] = currentCount;
                if(currentCount > maxCount){
                    maxCount = currentCount;
                    result = word;
                }
            }
            word ="";
        } else {
            word += paragraph[j];
        }
    }
    return result;
};



/**
 * Almost same approah but a little refined code
 */

 const mostCommonWord = (paragraph, banned) => {
    const bannedSet = new Set(banned);
    const words = paragraph.toLowerCase().split(/\W+/);
    const map = {};
    let answer = {count: 0, word: ''}
    
    for (const w of words) {
      if (!bannedSet.has(w)) {
        if (map[w] == null) map[w] = 0;
        map[w]++;
          
        if(map[w] > answer.count) {
            answer.count = map[w]
            answer.word = w
        }
      }
    }
  
    return answer.word;
  };