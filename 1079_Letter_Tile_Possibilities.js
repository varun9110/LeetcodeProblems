/**
 * 1079. Letter Tile Possibilities
 * Difficulty: Medium
 * 
 * You have n  tiles, where each tile has one letter tiles[i] printed on it.
Return the number of possible non-empty sequences of letters you can make using the letters printed on those tiles.

Example 1:
Input: tiles = "AAB"
Output: 8
Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".
Example 2:
Input: tiles = "AAABBC"
Output: 188
Example 3:
Input: tiles = "V"
Output: 1

Constraints:
1 <= tiles.length <= 7
tiles consists of uppercase English letters.
 */

/**
 * Intuition
The problem requires us to generate all possible non-empty sequences using the given tiles, considering repeated characters and avoiding duplicate sequences.

To achieve this, we can use backtracking:

Generate all possible sequences by permuting characters.
Avoid counting duplicate sequences by tracking previously used characters at each recursive level.
Approach
The approach uses backtracking with pruning to avoid duplicate calculations.

Step 1: Convert String to Character Array
Convert tiles to a character array arr to easily swap elements and generate permutations.
Step 2: Recursive Backtracking
Use a recursive function permute(start, arr):
Base Case: If start == arr.length, return 0 (no further permutations possible).
Recursive Case:
Iterate through each character from index start to arr.length.
Swap the current character with start to fix it in place.
Call permute(start + 1, arr) to generate permutations for the remaining characters.
Swap back to restore the original order.
Step 3: Avoid Duplicate Permutations
The function isPermutedBefore(start, i-1, arr[i], arr) ensures we don’t use the same character in the same recursive level multiple times.
It checks if arr[i] has already appeared in arr[start:i].
Step 4: Count Unique Sequences
Each valid permutation adds 1 to the count.
The final result is the total number of unique sequences.
Complexity
Time Complexity:
The worst-case scenario occurs when all characters in tiles are unique (e.g., "ABCDEFG"), leading to O(N!) permutations.
If characters repeat, the complexity reduces due to pruning but is still exponential.
Thus, the worst-case time complexity is O(N!).
Space Complexity:
O(N) space is used for recursion depth.
O(1) extra space (apart from input storage).
Overall, space complexity is O(N).
 */

/**
 * @param {string} tiles
 * @return {number}
 */
var numTilePossibilities = function(tiles) {
    tiles = tiles.split("").sort().join("");
    let used = new Array(tiles.length).fill(false);
    
    const backtrack = () => {
        let count = 0;
        for (let i = 0; i < tiles.length; i++) {
            if (used[i] || (i > 0 && tiles[i] === tiles[i - 1] && !used[i - 1])) continue;
            used[i] = true;
            count += 1 + backtrack();
            used[i] = false;
        }
        return count;
    };

    return backtrack();
};