/**
 * 664. Strange Printer
 * Difficulty: Hard
 * 
 * There is a strange printer with the following two special properties:

The printer can only print a sequence of the same character each time.
At each turn, the printer can print new characters starting from and ending at any place and will cover the original existing characters.
Given a string s, return the minimum number of turns the printer needed to print it.

 

Example 1:

Input: s = "aaabbb"
Output: 2
Explanation: Print "aaa" first and then print "bbb".
Example 2:

Input: s = "aba"
Output: 2
Explanation: Print "aaa" first and then print "b" from the second place of the string, which will cover the existing character 'a'.
 

Constraints:

1 <= s.length <= 100
s consists of lowercase English letters.
 */

/**
 * Intuition
This problem is pretty wild when you first look at it. The printer can only spit out the same character over and over, 
but it can go back and overwrite stuff it's already printed. Our job is to figure out how to use this printer to make any given string 
with the fewest number of "turns" possible.

Now, when we say "turns," we're not talking about each individual keystroke. A turn is basically every time we switch to printing a different character. 
This is key, because it means we can print a group of the same letter in one go, and that counts as just one turn.

Say we want to print "aba". You might think, that's easy. Three turns - print 'a', then 'b', then 'a' again." But, we can do better we can print "aaa" in one turn,
 and then go back and print a "b" in the middle, see just two turns instead of three.

Now For longer strings, it's not always obvious what the best strategy is. Should we print a bunch of one letter and then go back and fill in the others? 
Or is it better to do it in chunks? It's like a puzzle where you have to think several steps ahead.

Now, when we see a problem asking for the "minimum" number of something, it often points to using dynamic programming. 
Why? Because we're dealing with an optimization problem that has optimal substructure (the best solution for the whole string depends on the best 
solutions for parts of the string) and overlapping subproblems (we might need to calculate the same thing multiple times for different parts of the string)
In this case, we'd be looking at how to optimally print smaller parts of the string, and then use that info to figure out the best way for the whole string.

It's not so easy for sure. Even once you get what the problem's asking, coming up with a solution isn't straightforward. 
You've got to think about how to represent the state of the string at each step, how to make decisions about when to overwrite versus when to start fresh, 
and how to keep track of all the possibilities without getting bogged down.

If you're new to dynamic programming, don't sweat it if this doesn't click right away, happens to all us. It's a tough concept that takes practice. 
The key is to start by really understanding the problem, then think about how you can break it down into smaller, similar problems. 
From there, it's about finding patterns and building up your solution step by step.
Now I hope you understand the problem statement so I was thinking about how to minimize the number of turns needed to print a given string. 
The properties of the printer is being able to print sequences of the same character and overwrite existing characters - as mentioned before 
this made me realize that this wasn't a straightforward printing process.
The first idea I had was to simplify the input string by removing consecutive duplicate characters. This doesn't change the minimum number of turns needed, 
but it significantly reduces the problem size, which can lead to significant performance improvements, identifying opportunities 
where we could save turns by printing characters that appear later in the string simultaneously with earlier occurrences. 
This led me to the idea of a dynamic programming (DP) approach, where I could build up the solution by solving smaller subproblems.

The important thing here is that if the first and last characters of a substring match, I can print them together in a single turn, saving one turn. 
This means a DP solution where I would need to quickly identify these potential matching characters.

To further optimize the DP process, I thought about precomputing the next occurrence of each character in the string. 
This would allow me to jump directly to potential matches without having to scan the entire string repeatedly, 
streamlining the DP algorithm and avoiding redundant computations.

So, byy removing consecutive duplicates, identifying matching characters, and using precomputed next occurrences, 
I believed I could develop an efficient dynamic programming solution to this problem.

Approach
Let's break down the approach step by step:

Preprocessing the Input
Removing consecutive duplicate characters:

function removeConsecutiveDuplicates(s):
    result = empty list
    for each character c in s:
        if result is empty or c != last element in result:
            add c to result
    return result
Consecutive identical characters can always be printed in a single turn, so they don't affect our minimum turn count. 
It also potentially reduces the size of our problem, making subsequent steps more efficient.

Setting Up the Dynamic Programming Table
We create a 2D table to store our DP results:

m = length of simplified string
dp = 2D array of size m x m, initialized with MAX_VALUE
for i from 0 to m-1:
    dp[i][i] = 1  // It takes 1 turn to print a single character
Here, dp[i][j] will represent the minimum number of turns needed to print the substring from index i to j (inclusive).

Precomputing Next Occurrences
This is a key optimization in our approach. We create a data structure to quickly find the next occurrence of each character:

function computeNextOccurrences(chars):
    lastSeen = empty map
    nextOccurrence = array of size m, initialized with -1
    for i from m-1 down to 0:
        c = chars[i]
        if c exists in lastSeen:
            nextOccurrence[i] = lastSeen[c]
        lastSeen[c] = i
    return nextOccurrence
This precomputation allows us to jump to the next matching character without searching through the entire string each time we need to find a match.

Filling the DP Table
We fill the DP table in a bottom-up manner:

for length from 2 to m:
    for start from 0 to m - length:
        end = start + length - 1
        
        // Initial case: print each character separately
        dp[start][end] = dp[start+1][end] + 1
        
        // Try to find a better solution by matching characters
        currentChar = chars[start]
        nextPos = nextOccurrence[start]
        
        while nextPos != -1 and nextPos <= end:
            dp[start][end] = min(dp[start][end], 
                                 dp[start][nextPos-1] + 
                                 (nextPos+1 <= end ? dp[nextPos+1][end] : 0))
            nextPos = nextOccurrence[nextPos]
Let's break this down further:

We consider substrings of increasing length, from 2 to the full string length.
For each substring, we start with the assumption that we print the first character separately and then handle the rest (dp[start+1][end] + 1).
Then, we try to optimize by finding matching characters. We use our precomputed nextOccurrence to quickly jump to potential matches.
When we find a match, we consider splitting the problem into three parts:
From start to just before nextPos
The matching characters at start and nextPos
From just after nextPos to end
We calculate the turns needed for parts 1 and 3 using our DP table, and implicitly consider part 2 as free (since we're printing it with the character at start).
We keep doing this for all potential matches, always keeping the minimum number of turns found.
Retrieving the Result
After filling the entire DP table, our answer is in dp[0][m-1], representing the minimum turns needed to print the entire simplified string.

This DP approach allows us to quickly find matching characters. By precomputing the next occurrences, we avoid unnecessary iterations and comparisons.

Complexity
Time complexity: O(n 
3
 )
Let's break this down:

Removing consecutive duplicates: O(n)
Setting up the DP table: O(n^2)
Precomputing next occurrences: O(n)
Filling the DP table: O(n^3)
We have three nested loops:
The outer loop for substring length: O(n)
The middle loop for start positions: O(n)
The inner while loop for finding matches: O(n) in the worst case
The dominant factor here is the O(n^3) from filling the DP table, so that's our overall time complexity.

Space complexity: O(n 
2
 )

The DP table is the main space consumer, requiring O(n^2) space.
The simplified character list, next occurrence array, and lastSeen map each take O(n) space.
Therefore, the overall space complexity is O(n^2).
 */

/**
 * @param {string} s
 * @return {number}
 */
var strangePrinter = function(s) {
    if (s.length === 0) {
        return 0;
    }

    // Remove consecutive duplicates
    let filteredChars = [];
    for (const char of s) {
        if (filteredChars.length === 0 || char !== filteredChars[filteredChars.length - 1]) {
            filteredChars.push(char);
        }
    }

    const m = filteredChars.length;
    const dp = Array.from({ length: m }, () => Array(m).fill(Infinity));
    const nextOccurrence = Array(m).fill(-1);
    
    // Fill the DP table with base cases
    for (let i = 0; i < m; i++) {
        dp[i][i] = 1;
    }

    // Precompute the next occurrence for each character
    const lastSeen = new Map();
    for (let i = m - 1; i >= 0; i--) {
        const char = filteredChars[i];
        if (lastSeen.has(char)) {
            nextOccurrence[i] = lastSeen.get(char);
        }
        lastSeen.set(char, i);
    }

    // Fill the DP table
    for (let length = 2; length <= m; length++) {
        for (let start = 0; start <= m - length; start++) {
            const end = start + length - 1;
            dp[start][end] = dp[start + 1][end] + 1;
            let nextPos = nextOccurrence[start];
            while (nextPos !== -1 && nextPos <= end) {
                dp[start][end] = Math.min(dp[start][end], dp[start][nextPos - 1] + (nextPos + 1 <= end ? dp[nextPos + 1][end] : 0));
                nextPos = nextOccurrence[nextPos];
            }
        }
    }

    return dp[0][m - 1];
};
