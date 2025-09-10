/**
 * 1733. Minimum Number of People to Teach
 * Difficulty: MEdium
 * 
 * On a social network consisting of m users and some friendships between users, two users can communicate with each other if they know a common language.

You are given an integer n, an array languages, and an array friendships where:

There are n languages numbered 1 through n,
languages[i] is the set of languages the i​​​​​​th​​​​ user knows, and
friendships[i] = [u​​​​​​i​​​, v​​​​​​i] denotes a friendship between the users u​​​​​​​​​​​i​​​​​ and vi.
You can choose one language and teach it to some users so that all friends can communicate with each other. Return the minimum number of users you need to teach.

Note that friendships are not transitive, meaning if x is a friend of y and y is a friend of z, this doesn't guarantee that x is a friend of z.
 

Example 1:

Input: n = 2, languages = [[1],[2],[1,2]], friendships = [[1,2],[1,3],[2,3]]
Output: 1
Explanation: You can either teach user 1 the second language or user 2 the first language.
Example 2:

Input: n = 3, languages = [[2],[1,3],[1,2],[3]], friendships = [[1,4],[1,2],[3,4],[2,3]]
Output: 2
Explanation: Teach the third language to users 1 and 3, yielding two users to teach.
 

Constraints:

2 <= n <= 500
languages.length == m
1 <= m <= 500
1 <= languages[i].length <= n
1 <= languages[i][j] <= n
1 <= u​​​​​​i < v​​​​​​i <= languages.length
1 <= friendships.length <= 500
All tuples (u​​​​​i, v​​​​​​i) are unique
languages[i] contains only unique values
 */

/**
 * Intuition
Think of a world where people speak different languages. Each person may know one or more languages, and some pairs of people are friends. For friends to truly communicate, they must share at least one common language.

Our task: choose exactly one language to teach, to the minimum number of people, so that all friendships can communicate.

So the big picture looks like this:

For each friendship, check if they can already talk. If yes → good. If no → they become candidates (at least one must learn a new language).
Once all candidates are identified, we test: If we choose language X, how many candidates already know it? The rest must be taught.
Answer = candidates.Count – maxOverlap.
This remains the same pipeline in every approach, only the efficiency of the “friendship check” changes.

Approach
Step 0: Naive (Lists)
Represent each user’s languages as a simple list.
To check if two users can talk: nested loops compare every language of user U with every language of user V.
This is simple, but expensive.
Candidate Selection Example:

candidates.png

Here, red nodes are candidates (users in bad friendships), red edges are friendships with no shared language, green edges are already fine.

Flowchart:

flow_step0.png

This shows the naive pipeline with the friendship check done via nested loops.

Step 1: HashSet Optimization
Convert each user’s languages into a HashSet.
Now, for each friendship (u,v): loop over u’s languages, and for each language, check if it exists in v’s set in O(1).
Cuts out the inner loop.
Flowchart:

flow_step1.png

The only change: the friendship check is now more efficient (HashSet membership instead of nested loops).

Step 2: Bitmask Optimization
Encode each user’s languages as a bitmask.

Example: Language 1 → bit0, Language 2 → bit1, etc.
Then user’s knowledge becomes a single integer/bit array.
Friendship check reduces to: (mask[u] & mask[v]) != 0.

Constant-time bitwise operations make this extremely fast.

Flowchart:

flow_step2.png

Language Overlap Bar Chart:

lang_overlap.png

This chart shows how many candidate users already know each language. The orange bar is the maximum, that’s the best teaching choice. Answer = candidates.Count – maxOverlap.


 */

/**
 * @param {number} n
 * @param {number[][]} languages
 * @param {number[][]} friendships
 * @return {number}
 */
var minimumTeachings = function(n, languages, friendships) {
    let m = languages.length;
    let masks = Array(m+1).fill(0);
    
    for (let i=0; i<m; i++) {
        let mask = 0n;
        for (let lang of languages[i]) {
            mask |= 1n << BigInt(lang-1);
        }
        masks[i+1] = mask;
    }
    
    let candidates = new Set();
    for (let [u,v] of friendships) {
        if ((masks[u] & masks[v]) === 0n) {
            candidates.add(u);
            candidates.add(v);
        }
    }
    if (candidates.size === 0) return 0;
    
    let count = Array(n+1).fill(0);
    for (let u of candidates) {
        for (let lang=1; lang<=n; lang++) {
            if ((masks[u] & (1n << BigInt(lang-1))) !== 0n) count[lang]++;
        }
    }
    let maxOverlap = Math.max(...count);
    return candidates.size - maxOverlap;
};