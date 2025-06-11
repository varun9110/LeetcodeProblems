/**
 * 3445. Maximum Difference Between Even and Odd Frequency II
 * Difficulty: Hard
 * You are given a string s and an integer k. Your task is to find the maximum difference between the frequency of two characters, freq[a] - freq[b], 
 * in a substring subs of s, such that:

subs has a size of at least k.
Character a has an odd frequency in subs.
Character b has an even frequency in subs.
Return the maximum difference.
Note that subs can contain more than 2 distinct characters. 

Example 1:
Input: s = "12233", k = 4
Output: -1
Explanation:
For the substring "12233", the frequency of '1' is 1 and the frequency of '3' is 2. The difference is 1 - 2 = -1.

Example 2:
Input: s = "1122211", k = 3
Output: 1
Explanation:
For the substring "11222", the frequency of '2' is 3 and the frequency of '1' is 2. The difference is 3 - 2 = 1.

Example 3:
Input: s = "110", k = 3
Output: -1

Constraints:

3 <= s.length <= 3 * 104
s consists only of digits '0' to '4'.
The input is generated that at least one substring has a character with an even frequency and a character with an odd frequency.
1 <= k <= s.length
 */

/**
 * we are working with a string of digits and need to find the maximum difference between how often one digit (the first) appears vs. another digit (the second).... but only in substrings of length at least k.

okay, here’s where it gets tricky:
each substring must include at least one second digit, and we also have to check the parity of first and second counts (whether they’re odd or even).

so, it is not just about counting anymore, this time we have to be selective about which substrings even qualify.

for optimal solution, we can use prefix sums to keep track of digit frequencies across the string. Then, to compare segments and keep things fast, we use a Fenwick Tree (aka Binary Indexed Tree) to dynamically track and query the minimum values.

So in the end, it’s a clean combination of smart counting and optimized structure usage.
 */


/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const maxDifference = (s, k) => {
    const length = s.length;
    let result = -Infinity;

    for (let first = 0; first < 5; first++) {
        for (let second = 0; second < 5; second++) {
            if (first === second) continue;

            const diff = Array(length + 1).fill(0);
            const parityA = Array(length + 1).fill(0);
            const parityB = Array(length + 1).fill(0);
            const countB = Array(length + 1).fill(0);

            for (let i = 1; i <= length; i++) {
                const digit = s.charCodeAt(i - 1) - 48;
                diff[i] = diff[i - 1] + (digit === first ? 1 : 0) - (digit === second ? 1 : 0);
                parityA[i] = (parityA[i - 1] + (digit === first ? 1 : 0)) & 1;
                parityB[i] = (parityB[i - 1] + (digit === second ? 1 : 0)) & 1;
                countB[i] = countB[i - 1] + (digit === second ? 1 : 0);
            }

            const storage = Array.from({ length: 2 }, () =>
                Array.from({ length: 2 }, () => new MinBIT(length + 1))
            );

            for (let j = 0; j <= length; j++) {
                if (j >= k) {
                    const back = j - k;
                    const pA = parityA[back];
                    const pB = parityB[back];
                    const bCount = countB[back];
                    storage[pA][pB].insert(bCount, diff[back]);
                }

                if (j > 0 && countB[j] > 0) {
                    const altA = 1 - parityA[j];
                    const curB = parityB[j];
                    const minPrev = storage[altA][curB].getMin(countB[j] - 1);

                    if (minPrev !== MinBIT.MAX) {
                        result = Math.max(result, diff[j] - minPrev);
                    }
                }
            }
        }
    }

    return result === -Infinity ? 0 : result;
};

class MinBIT {
    static MAX = Number.MAX_SAFE_INTEGER;

    constructor(length) {
        this.n = length;
        this.data = Array(length + 2).fill(MinBIT.MAX);
    }

    insert(index, value) {
        for (let i = index + 1; i <= this.n; i += i & -i) {
            this.data[i] = Math.min(this.data[i], value);
        }
    }

    getMin(index) {
        let result = MinBIT.MAX;
        for (let i = index + 1; i > 0; i -= i & -i) {
            result = Math.min(result, this.data[i]);
        }
        return result;
    }
}