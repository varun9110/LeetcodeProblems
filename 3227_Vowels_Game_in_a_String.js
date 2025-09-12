/**
* 3227. Vowels Game in a String
* Difficulty: Medium
Alice and Bob are playing a game on a string.

You are given a string s, Alice and Bob will take turns playing the following game where Alice starts first:

On Alice's turn, she has to remove any non-empty substring from s that contains an odd number of vowels.
On Bob's turn, he has to remove any non-empty substring from s that contains an even number of vowels.
The first player who cannot make a move on their turn loses the game. We assume that both Alice and Bob play optimally.

Return true if Alice wins the game, and false otherwise.

The English vowels are: a, e, i, o, and u.
Example 1:

Input: s = "leetcoder"

Output: true

Explanation:
Alice can win the game as follows:

Alice plays first, she can delete the underlined substring in s = "leetcoder" which contains 3 vowels. The resulting string is s = "der".
Bob plays second, he can delete the underlined substring in s = "der" which contains 0 vowels. The resulting string is s = "er".
Alice plays third, she can delete the whole string s = "er" which contains 1 vowel.
Bob plays fourth, since the string is empty, there is no valid play for Bob. So Alice wins the game.
Example 2:
Input: s = "bbcd"
Output: false
Explanation:
There is no valid play for Alice in her first turn, so Alice loses the game.

Constraints:

1 <= s.length <= 105
s consists only of lowercase English letters.

*/

/**
* Intuition and proof
So why does the existence of a vowel guarantee that Alice wins?

For example

s=‘‘baabbbba"
​
 
Alice can greedily take the entire string because it has 3 vowels (odd).

Another case:

Initially:

s=‘‘babbbabb"
​
 
Alice can remove any substring with an odd number of vowels.

Current state:

s=‘‘ba" or ‘‘abb"
​
 
It seems Bob cannot make a move...
But not yet, he is allowed to remove substrings with an even (0) number of vowels.

Current state:

s=‘‘a"
​
 
Now the remaining string is a single vowel, which is odd. Alice can freely take it.

ALICE WINS because she is the first one to remove all of the string.

Since Alice is always the first one to make a move:

She can make sure Bob will NOT get EVEN number of vowels
Effectively, Bob cannot take control of the board, and he can never remove the last vowel.
So no matter what Bob does, if a vowel exists, Alice will always have a valid move.
Conclusion:

If there are no vowels, Alice cannot start and loses immediately.
If there is at least one vowel, Alice can always win by eventually taking all vowels each turn.

Time Complexity: O(n)
Space Complexity: O(1)
*
*/


/**
 * @param {string} s
 * @return {boolean}
 */
var doesAliceWin = function(s) {
    for (let i = 0; i < s.length; i++)
        if ("aeiou".includes(s[i]))
            return 1;
    return 0;
};
