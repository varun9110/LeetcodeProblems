/**
 * 3085. Minimum Deletions to Make String K-Special
 * Difficulty: Medium
 * 
 * You are given a string word and an integer k.

We consider word to be k-special if |freq(word[i]) - freq(word[j])| <= k for all indices i and j in the string.

Here, freq(x) denotes the frequency of the character x in word, and |y| denotes the absolute value of y.

Return the minimum number of characters you need to delete to make word k-special.

 

Example 1:

Input: word = "aabcaba", k = 0

Output: 3

Explanation: We can make word 0-special by deleting 2 occurrences of "a" and 1 occurrence of "c". Therefore, word becomes equal to "baba" where freq('a') == freq('b') == 2.

Example 2:

Input: word = "dabdcbdcdcd", k = 2

Output: 2

Explanation: We can make word 2-special by deleting 1 occurrence of "a" and 1 occurrence of "d". Therefore, word becomes equal to "bdcbdcdcd" where freq('b') == 2, freq('c') == 3, and freq('d') == 4.

Example 3:

Input: word = "aaabaaa", k = 2

Output: 1

Explanation: We can make word 2-special by deleting 1 occurrence of "b". Therefore, word becomes equal to "aaaaaa" where each letter's frequency is now uniformly 6.

 

Constraints:

1 <= word.length <= 105
0 <= k <= 105
word consists only of lowercase English letters.
 */

/**
 *  Problem Understanding
Input: A string word and integer k.
Goal: Modify character frequencies such that no two frequencies differ by more than k using the minimum deletions.
Constraints:
Only deletions allowed (no additions).
Return the smallest number of deletions required.
🤔 Approach
1 . Count Frequencies:

First, we count how many times each character appears in the string using a frequency map.
2 . Sort Frequencies:

We collect these frequency counts into a list and sort them in ascending order. This helps us systematically analyze the frequencies.
3 . Find Minimum Deletions:

For each frequency in the sorted list, we treat it as a potential "base" frequency.
We then calculate how many deletions would be needed to make all other frequencies fall within the range [base, base + k]:
For frequencies smaller than the base: We must delete all of them (since we can't increase frequencies, only decrease)
For frequencies larger than base + k: We reduce them to exactly base + k by deleting the excess characters
We keep track of the minimum deletions needed across all possible base frequencies
Example Walkthrough 🚶‍♂️
Input
word: "aabcaba" k: 0

Map<Character, Integer> freqMap = new HashMap<>();
for (char c : word.toCharArray()) {
    freqMap.put(c, freqMap.getOrDefault(c, 0) + 1);
}
word = "aabcaba" → Frequencies: {'a':4, 'b':2, 'c':1}
k = 0 (all frequencies must be exactly equal after deletions).
Result:
{'a': 4, 'b': 2, 'c': 1}
image.png

2 . Sorting Frequencies (Step 2)

List<Integer> frequencies = new ArrayList<>(freqMap.values());
Collections.sort(frequencies);
Sorts to [1, 2, 4] (ascending order).
image.png

Step 3: Calculate Deletions for Each Base
For each frequency (base), compute deletions to make all frequencies exactly equal to base (since k=0).

Iteration 1: Base = 1

Target Frequency: 1

Actions:

1 (c): Already matches → 0 deletions
2 (b): Reduce to 1 → Delete 2 - 1 = 1
4 (a): Reduce to 1 → Delete 4 - 1 = 3
Total Deletions: 0 + 1 + 3 = 4

image.png

Iteration 2: Base = 2

Target Frequency: 2

Actions:

1 (c): Below target → Delete all (1)
2 (b): Already matches → 0 deletions
4 (a): Reduce to 2 → Delete 4 - 2 = 2
Total Deletions: 1 + 0 + 2 = 3
image.png

Iteration 3: Base = 4

Target Frequency: 4

Actions:

1 (c): Below target → Delete all (1)
2 (b): Below target → Delete all (2)
4 (a): Already matches → 0 deletions
Total Deletions: 1 + 2 + 0 = 3

image.png

Base	Deletions	Resulting Frequencies
1	4	All frequencies = 1
2	3	a=2, b=2 (delete c)
4	3	Only a=4 (delete b, c)
Minimum Deletions = 3

Optimal Solution
Two possible outcomes with 3 deletions:

1 . Base=2:

Delete 1 'c' and reduce 'a' from 4→2.
Result: "aabbaa" (freq: a=2, b=2).
2 . Base=4:

Delete all 'b' and 'c'.
Result: "aaaa" (freq: a=4).
image.png
 */

/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var minimumDeletions = function(word, k) {
    const freqMap = new Map();
    for (const c of word) {
        freqMap.set(c, (freqMap.get(c) || 0) + 1);
    }
    
    const frequencies = Array.from(freqMap.values()).sort((a, b) => a - b);
    let minDeletions = Infinity;
    const n = frequencies.length;
    
    for (let i = 0; i < n; i++) {
        const base = frequencies[i];
        let totalDeletions = 0;
        
        for (let j = 0; j < i; j++) {
            totalDeletions += frequencies[j];
        }
        
        for (let j = i; j < n; j++) {
            if (frequencies[j] > base + k) {
                totalDeletions += frequencies[j] - (base + k);
            }
        }
        
        if (totalDeletions < minDeletions) {
            minDeletions = totalDeletions;
        }
    }
    
    return minDeletions;
};