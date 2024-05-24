/**
 * 1255. Maximum Score Words Formed by Letters
 * 
 * Difficulty: Hard
 * 
 * Given a list of words, list of  single letters (might be repeating) and score of every character.

Return the maximum score of any valid set of words formed by using the given letters (words[i] cannot be used two or more times).

It is not necessary to use all characters in letters and each letter can only be used once. Score of letters 'a', 'b', 'c', ... ,'z' is given by score[0], score[1], ... , score[25] respectively.

 

Example 1:

Input: words = ["dog","cat","dad","good"], letters = ["a","a","c","d","d","d","g","o","o"], score = [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
Output: 23
Explanation:
Score  a=1, c=9, d=5, g=3, o=2
Given letters, we can form the words "dad" (5+1+5) and "good" (3+2+2+5) with a score of 23.
Words "dad" and "dog" only get a score of 21.
Example 2:

Input: words = ["xxxz","ax","bx","cx"], letters = ["z","a","b","c","x","x","x"], score = [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10]
Output: 27
Explanation:
Score  a=4, b=4, c=4, x=5, z=10
Given letters, we can form the words "ax" (4+5), "bx" (4+5) and "cx" (4+5) with a score of 27.
Word "xxxz" only get a score of 25.
Example 3:

Input: words = ["leetcode"], letters = ["l","e","t","c","o","d"], score = [0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0]
Output: 0
Explanation:
Letter "e" can only be used once.
 

Constraints:

1 <= words.length <= 14
1 <= words[i].length <= 15
1 <= letters.length <= 100
letters[i].length == 1
score.length == 26
0 <= score[i] <= 10
words[i], letters[i] contains only lower case English letters.
 */

/**
 * 🧠 Approach 1: Brute force with bit-mask
🤔 Intuition
Okay, let's talk about intuition I had when first looked at this problem

Firstly, description isn't very clear about what score means so I will. Score[i] mean that character with i + 1 number in alphabet has this score. So score[0] will be score of letter "a", score[1] will be score of letter "b" and so on.
Secondly, it's not that convinient to store letters we have as list of string since we have repetitions I thought it would be easier to create list of size 26 with counts of letters.
Next question - how we will find score for letter "a" for example? We will use its ASCII number with ord in Python and subtract from it 97 (number of letter "a") so we will have index in array score which represents score of this character.
Notice that the words.length is very small (up to 14) that means we probably can use brute force solution to solve this problem. Let's try it but to avoid additional compution we will count overall score for each word and store this in dictionary.
We will look on every subset of words from words (up to 2^14) and calculate its total score in case we can form all this words. But how exactly we will find every subset of words? We will use quite standard approach for this problem - bit-mask.
We can form all words in subset if we have enough letters so we will count total letters of this subset and then check for every letter that its number is smaller of exactly the same as the number of this letter we have.
💻 Coding
This is quite naive approach and so a little slow so let's code it up and move to the next approach.

Firstly, as was said, we need to count letters and scores for each word
Secondly we will iterate through numbers from 0 to 2^n - 1 as mask and binary representation of this number will be our mask (at index i 1 will mean that words[i] is used in subset and 0 will mean that it isn't)
If we iterating through words ever encounter state where we already have invalid number of letters - we will exit the loop and move to the next mask
If this state is valid and calculated score is bigger than it was we will change result to it and continue.
📒 Complexity
⏰ Time complexity: O(2^n * n), we will iterate 2^n times to check every subset and every this subset has up to n words so I think 2^n * n is
fair assessment.
🧺 Space complexity: O(n) where n is the length of the words but in fact this is too small so very close to be O(1) (all other arrays have constant size so O(1) complexity)
 */

var maxScoreWords = function(words, letters, score) {
    let n = words.length;
    let res = 0;

    // count letters
    let letters_count = new Array(26).fill(0);
    for (let letter of letters) {
        let ind = letter.charCodeAt(0) - 97;
        letters_count[ind]++;
    }

    // calculate words
    let words_scores = {};
    for (let word of words) {
        let s = 0;
        for (let c of word) {
            let ind = c.charCodeAt(0) - 97;
            s += score[ind];
        }
        words_scores[word] = s;
    }

    for (let mask = 0; mask < (1 << n); ++mask) { // There will be exactly 2^n different states
        let cur_count = new Array(26).fill(0);
        let can_create = true;
        let cur_score = 0;

        for (let word_ind = 0; word_ind < n; ++word_ind) {
            if (mask & (1 << word_ind)) { // if in mask bit of this word is 1
                let word = words[word_ind];
                cur_score += words_scores[word];
                for (let c of word) {
                    let ind = c.charCodeAt(0) - 97;
                    cur_count[ind]++;
                    if (cur_count[ind] > letters_count[ind]) {
                        can_create = false;
                        break;
                    }
                }
            }
            if (!can_create) {
                break;
            }
        }
        if (can_create && cur_score > res) {
            res = cur_score;
        }
    }

    return res;
};



/**
 * 
 * Approach 2: Recursion with backtracking
🤔 Intuition
In my opinion the backtracking intuition for this problem is even easier that for the brute force one.

Firstly, we will keep letters_count and words_scores the same.
For every word we can either include this word in subset or not (including is only OK if letters_count is valid).
After we've included this word and checked all possible states with it we want to return letters we wasted on it. (backtracking)
💻 Coding
Okay, now let's implement recursion with backtracking

Firstly, as was said, we need to count letters and scores for each word (as in first approach).
Secondly, let's write our recursion function recursion as this:
We will track our cur_ind and if we've checked all the words and still this state is valid so we will check whether cur_score is bigger than is was.
In the next block of code we will check whether we can add this word to our current subset based on number of letters we have now (code is simillar to last approach).
So if it's possible to add this word let's check all subsets with adding it (we apply backtracking here) and in any occasion let's check case where we don't add this word.
Call recursion with parameters cur_ind=0, cur_score=0 and return result.
📒 Complexity
⏰ Time complexity: O(2^n), for every word we call recursion up to 2 times.
🧺 Space complexity: O(n), for recursive stack and keeping arrays
 */

var maxScoreWords = function(words, letters, score) {
    let n = words.length;
    let res = 0;

    let letters_count = new Array(26).fill(0);
    for (let letter of letters) {
        letters_count[letter.charCodeAt(0) - 97]++;
    }

    let words_scores = {};
    for (let word of words) {
        let s = 0;
        for (let ch of word) {
            s += score[ch.charCodeAt(0) - 97];
        }
        words_scores[word] = s;
    }

    function recursion(cur_ind, cur_score) {
        if (cur_ind === n) {
            res = Math.max(res, cur_score);
            return;
        }

        let can_add_this_word = true;
        let word = words[cur_ind];
        let word_count = new Array(26).fill(0);

        for (let ch of word) {
            word_count[ch.charCodeAt(0) - 97]++;
            if (word_count[ch.charCodeAt(0) - 97] > letters_count[ch.charCodeAt(0) - 97]) {
                can_add_this_word = false;
                break;
            }
        }

        if (can_add_this_word) {
            for (let i = 0; i < 26; i++) {
                letters_count[i] -= word_count[i];
            }
            recursion(cur_ind + 1, cur_score + words_scores[word]);
            for (let i = 0; i < 26; i++) {
                letters_count[i] += word_count[i];
            }
        }
        recursion(cur_ind + 1, cur_score);
    }

    recursion(0, 0);
    return res;
};