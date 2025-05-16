/**
 * 2901. Longest Unequal Adjacent Groups Subsequence II
 * Difficulty: Medium
 * 
 * You are given a string array words, and an array groups, both arrays having length n.

The hamming distance between two strings of equal length is the number of positions at which the corresponding characters are different.
You need to select the longest subsequence from an array of indices [0, 1, ..., n - 1], such that for the subsequence denoted as [i0, i1, ..., ik-1] having length k, the following holds:
For adjacent indices in the subsequence, their corresponding groups are unequal, i.e., groups[ij] != groups[ij+1], for each j where 0 < j + 1 < k.
words[ij] and words[ij+1] are equal in length, and the hamming distance between them is 1, where 0 < j + 1 < k, for all indices in the subsequence.
Return a string array containing the words corresponding to the indices (in order) in the selected subsequence. If there are multiple answers, return any of them.

Note: strings in words may be unequal in length.

Example 1:

Input: words = ["bab","dab","cab"], groups = [1,2,2]

Output: ["bab","cab"]

Explanation: A subsequence that can be selected is [0,2].

groups[0] != groups[2]
words[0].length == words[2].length, and the hamming distance between them is 1.
So, a valid answer is [words[0],words[2]] = ["bab","cab"].

Another subsequence that can be selected is [0,1].

groups[0] != groups[1]
words[0].length == words[1].length, and the hamming distance between them is 1.
So, another valid answer is [words[0],words[1]] = ["bab","dab"].

It can be shown that the length of the longest subsequence of indices that satisfies the conditions is 2.

Example 2:

Input: words = ["a","b","c","d"], groups = [1,2,3,4]

Output: ["a","b","c","d"]

Explanation: We can select the subsequence [0,1,2,3].
It satisfies both conditions.
Hence, the answer is [words[0],words[1],words[2],words[3]] = ["a","b","c","d"].
It has the longest length among all subsequences of indices that satisfy the conditions.
Hence, it is the only answer.

Constraints:

1 <= n == words.length == groups.length <= 1000
1 <= words[i].length <= 10
1 <= groups[i] <= n
words consists of distinct strings.
words[i] consists of lowercase English letters.
 */

/**
 * 🧠 Building the Intuition: Walkthrough Step-by-Step
Let’s break down the problem systematically to develop an efficient solution. We’ll explore the conditions, identify patterns, and build an optimized approach.

🔍 Step 1: Understand the Problem Requirements
We need to find the longest subsequence of indices such that:

Group Condition: Adjacent indices [ij, ij+1] must have groups[ij] != groups[ij+1].
Length Condition: words[ij] and words[ij+1] must have the same length.
Hamming Distance Condition: The Hamming distance between words[ij] and words[ij+1] must be exactly 1.
We return the words corresponding to the indices in the subsequence.
Key Observations 📋:
Subsequence: We can skip indices (unlike a substring), so we’re looking for a chain of indices [i0, i1, ..., ik-1] that satisfies the conditions.
Hamming Distance 1: Two strings have a Hamming distance of 1 if they differ in exactly one position. This implies that for two strings of length L, we can transform one into the other by changing one character.
Groups Constraint: The alternating groups requirement suggests a pattern where we alternate between different group values (e.g., group 1 to group 2, then back to a different group).
Unequal Lengths: We can only compare strings of the same length, so we can group words by their lengths and solve for each length independently.
🚀 Step 2: Naive Approach – Try All Subsequences
A naive approach would be to try all possible subsequences of indices and check if they satisfy the conditions:

Use a recursive approach to generate all subsequences.
For each subsequence, verify the group and Hamming distance conditions.
Keep track of the longest valid subsequence and return the corresponding words.
Challenges with Naive Approach ⚠️:
Time Complexity:
There are 2^n possible subsequences for n indices.
Checking each subsequence takes O(k * L) time (where k is the subsequence length, L is the string length), leading to an exponential complexity of O(2^n * n * L).
With n <= 1000, this is infeasible.
Space Complexity:
Storing all subsequences or recursive calls would require significant memory.
Insight 💡:
The naive approach is too slow. We need a more efficient way to find the longest subsequence, likely using dynamic programming (DP) since we’re looking for an optimal subsequence.

🛤️ Step 3: Reframe as a Dynamic Programming Problem
This problem resembles a longest path problem in a directed acyclic graph (DAG), where:

Nodes: Each index i from 0 to n-1.
Edges: There’s a directed edge from index i to index j (where i < j) if:
groups[i] != groups[j].
words[i] and words[j] have the same length.
Hamming distance between words[i] and words[j] is 1.
Goal: Find the longest path in this DAG, where the path length is the number of nodes (indices) in the subsequence.
DP Formulation 📊:
State: dp[i] = length of the longest valid subsequence starting at index i.
Transition: For each index i, look at all indices j > i:
If groups[i] != groups[j], words[i].length == words[j].length, and Hamming distance is 1, then dp[i] = max(dp[i], 1 + dp[j]).
Base Case: dp[i] = 1 (a single index is a valid subsequence of length 1).
Answer: The longest subsequence length is max(dp[i]), and we need to reconstruct the subsequence.
Challenge ⚠️:
Computing the Hamming distance between all pairs of indices takes O(n^2 * L) time, which is still too slow (n <= 1000, L <= 10).
We need a way to efficiently find pairs of words with Hamming distance 1.
🧩 Step 4: Optimize – Group by Length and Use Bitmask for Hamming Distance
To make the solution more efficient:

Group by Length: Since words in the subsequence must have equal length, we can solve the problem independently for each length. Words of different lengths cannot be part of the same subsequence.
Efficient Hamming Distance Check: Instead of comparing each pair of words, encode each word into a bitmask and use a hash map to find words that differ by exactly one character (Hamming distance 1).
Encoding Words into Bitmasks 🔢:
For a word of length L, encode each character into 5 bits (since there are 26 letters, and 2^5 = 32 > 26).
'a' = 1, 'b' = 2, ..., 'z' = 26.
Position j in the string contributes (char - 'a' + 1) << (5 * j) to the bitmask.
Total bitmask for a word: OR of all position bitmasks.
To find a word with Hamming distance 1:
If two words differ at position j, their bitmasks differ by charMasks[j].
XOR the full bitmask with charMasks[j] to get the bitmask of a word that differs at position j.
Use a Hash Map 📍:
For each length, maintain a hash map maskMap[bitmask] -> list of indices.
For each word, compute its bitmask and all possible bitmasks that differ by one character (Hamming distance 1).
Use the hash map to quickly find candidate indices that could form the next step in the subsequence.
⚙️ Step 5: Dynamic Programming with Bitmask Optimization
DP Approach 🔄:
State: dp[i] = length of the longest subsequence starting at index i.
Next Index: next[i] = the next index in the longest subsequence starting at i, or n if none exists.
Process indices from right to left (i from n-1 to 0):
For each index i, compute its bitmask and all Hamming-1 bitmasks.
Look up these Hamming-1 bitmasks in the hash map to find candidate indices j > i.
Among candidates, select j where groups[i] != groups[j] and dp[j] is maximized.
Set dp[i] = 1 + dp[j], next[i] = j.
Keep track of the starting index bestStart that gives the maximum dp[i].
Reconstruct the subsequence using the next array.
Why Process Right to Left? 🧐:
By processing from right to left, when we’re at index i, we’ve already computed dp[j] for all j > i.
This allows us to build the longest subsequence starting at i by looking at future indices.
🔄 Step 6: Handle Length Grouping
Since words must have equal length in the subsequence:

Group indices by the length of their words.
Solve the DP problem independently for each length group.
Take the longest subsequence among all length groups.
🏁 Step 7: Finalize the Approach
Group indices by word length.
For each length group:
Use DP with bitmask optimization to find the longest subsequence.
Reconstruct the subsequence using the next array.
Return the longest subsequence found across all length groups.
🧩 Detailed Approach
🛠️ Step 1: Group Indices by Length
Create a map lengthMap[len] -> list of indices where words[i] has length len.
Process each length independently.
🚀 Step 2: Dynamic Programming for Each Length
For each length group:

Initialize:
dp[i] = 1: Base case, each index is a subsequence of length 1.
next[i] = n: Default next index (out of bounds).
maskMap: Hash map mapping bitmasks to lists of indices.
Process Indices: From i = n-1 to 0 (only for indices in this length group):
Compute the bitmask for words[i].
Compute all Hamming-1 bitmasks by XORing with each position’s bitmask.
For each Hamming-1 bitmask, look up candidate indices in maskMap.
Among candidates j > i, if groups[i] != groups[j], update dp[i] = max(dp[i], 1 + dp[j]) and next[i] = j.
Add the current word’s Hamming-1 bitmasks to maskMap.
Find Best Start: Track the index bestStart with the maximum dp[i].
Reconstruct: Follow the next array from bestStart to build the result.
🛑 Step 3: Combine Results
Among all length groups, select the longest subsequence.
Return the corresponding words.
Edge Cases 🔍:
Single Word: If n = 1, return [words[0]] (length 1).
No Valid Pairs: If no two words satisfy the conditions, return a single word.
All Same Group: If all indices have the same group, the subsequence can only have length 1.
 */

/**
 * @param {string[]} words
 * @param {number[]} groups
 * @return {string[]}
 */
var getWordsInLongestSubsequence = function(words, groups) {
    const n = words.length;
    const next = Array(n).fill(n);
    const dp = Array(n).fill(1);
    const maskMap = new Map();
    let bestStart = 0;

    for (let i = n - 1; i >= 0; i--) {
        const word = words[i];
        const len = word.length;
        let fullMask = BigInt(0);
        const charMasks = Array(len).fill(BigInt(0));

        // Encode word into bitmask
        for (let j = 0; j < len; j++) {
            const shift = BigInt(word.charCodeAt(j) - 'a'.charCodeAt(0) + 1) << BigInt(5 * j);
            charMasks[j] = shift;
            fullMask |= shift;
        }

        let maxLen = 1;
        let nextIndex = n;

        // Try all Hamming-1 mutations
        for (let j = 0; j < len; j++) {
            const alteredMask = fullMask ^ charMasks[j];
            if (maskMap.has(alteredMask)) {
                const candidates = maskMap.get(alteredMask);
                for (const idx of candidates) {
                    if (groups[i] !== groups[idx] && dp[idx] + 1 > maxLen) {
                        maxLen = dp[idx] + 1;
                        nextIndex = idx;
                    }
                }
            }
        }

        dp[i] = maxLen;
        next[i] = nextIndex;
        if (dp[i] > dp[bestStart]) bestStart = i;

        // Insert this word's altered masks into map
        for (let j = 0; j < len; j++) {
            const alteredMask = fullMask ^ charMasks[j];
            if (!maskMap.has(alteredMask)) {
                maskMap.set(alteredMask, []);
            }
            maskMap.get(alteredMask).push(i);
        }
    }

    const result = [];
    for (let i = bestStart; i < n; i = next[i]) {
        result.push(words[i]);
    }

    return result;
};