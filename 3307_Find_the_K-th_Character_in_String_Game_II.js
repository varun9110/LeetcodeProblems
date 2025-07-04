/**
 * 3307. Find the K-th Character in String Game II
 * Difficulty: Hard
 * 
 * Alice and Bob are playing a game. Initially, Alice has a string word = "a".

You are given a positive integer k. You are also given an integer array operations, where operations[i] represents the type of the ith operation.

Now Bob will ask Alice to perform all operations in sequence:

If operations[i] == 0, append a copy of word to itself.
If operations[i] == 1, generate a new string by changing each character in word to its next character in the English alphabet, 
and append it to the original word. For example, performing the operation on "c" generates "cd" and performing the operation on "zb" generates "zbac".
Return the value of the kth character in word after performing all the operations.

Note that the character 'z' can be changed to 'a' in the second type of operation.

Example 1:
Input: k = 5, operations = [0,0,0]
Output: "a"
Explanation:
Initially, word == "a". Alice performs the three operations as follows:
Appends "a" to "a", word becomes "aa".
Appends "aa" to "aa", word becomes "aaaa".
Appends "aaaa" to "aaaa", word becomes "aaaaaaaa".
Example 2:
Input: k = 10, operations = [0,1,0,1]
Output: "b"
Explanation:
Initially, word == "a". Alice performs the four operations as follows:

Appends "a" to "a", word becomes "aa".
Appends "bb" to "aa", word becomes "aabb".
Appends "aabb" to "aabb", word becomes "aabbaabb".
Appends "bbccbbcc" to "aabbaabb", word becomes "aabbaabbbbccbbcc".

Constraints:
1 <= k <= 1014
1 <= operations.length <= 100
operations[i] is either 0 or 1.
The input is generated such that word has at least k characters after all operations.
 */

/**
 * 💡 Intuition
You're given:

A starting string: "a"
A list of operations:
0: Duplicate the string
1: Append a version of the string where every character is shifted to the next letter
(e.g., 'a' → 'b', 'z' → 'a')
Each operation doubles the length of the string.
You need to return the k-th character (1-indexed) after all operations — without building the full string,
because it grows exponentially.

🤔Approach
Track the length of the string after each operation:

Since each operation doubles the string, use an array to store the length at each step.
Stop once the length becomes greater than or equal to k.
Work backwards from the final operation to trace where the k-th character came from:

If k is in the first half of the string at this step, move to the previous operation.
If k is in the second half:
Subtract half the length to map k back to its corresponding position in the first half.
If the operation was type 1, record that a shift happened to this character.
Repeat step 2 until you reach the initial string ("a").

Apply the number of recorded shifts to the character 'a', using modulo 26 to handle wrap-around.

Return the final character after applying the shifts.

Step-by-Step Visualization 🔍
image.pngimage.pngimage.pngimage.pngimage.pngimage.pngimage.pngimage.pngimage.png
 */

/**
 * @param {number} k
 * @param {number[]} operations
 * @return {character}
 */
function kthCharacter(k, operations) {
    let shift = 0;
    let lengths = [];
    let len = 1;

    for (let op of operations) {
        len *= 2;
        lengths.push(len);
        if (len >= k) break;
    }

    for (let i = lengths.length - 1; i >= 0; i--) {
        let half = lengths[i] / 2;
        if (k > half) {
            k -= half;
            if (operations[i] === 1) shift++;
        }
    }

    const baseCharCode = 'a'.charCodeAt(0);
    return String.fromCharCode((shift % 26) + baseCharCode);
}