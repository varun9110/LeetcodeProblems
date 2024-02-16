/**
 * 1481. Least Number of Unique Integers after K Removals
 * Difficulty: Medium
 * 
 * Given an array of integers arr and an integer k. Find the least number of unique integers after removing exactly k elements.

Example 1:
Input: arr = [5,5,4], k = 1
Output: 1
Explanation: Remove the single 4, only 5 is left.
Example 2:
Input: arr = [4,3,1,1,3,3,2], k = 3
Output: 2
Explanation: Remove 4, 2 and either one of the two 1s or three 3s. 1 and 3 will be left.

Constraints:
1 <= arr.length <= 10^5
1 <= arr[i] <= 10^9
0 <= k <= arr.length
 */


/**
 * Approach:
 * Used a unordered map mp to keep track of the frequencies.
Seperately stored frequencies in a vector v and sort them.
Screenshot 2024-02-16 063724.png

To get the array of minimum unique elements, there will be only 2 condition which we have to look after:
Screenshot 2024-02-16 063746.png

First Condition (k > v[i]):

If the remaining removal count k is greater than the current frequency v[i], it implies that we can completely remove all occurrences of the 
current element represented by v[i] from the array without exhausting k.
In this case, we subtract v[i] from k (indicating that we have accounted for removing v[i] occurrences of the current element) and set v[i] 
to 0 (indicating that this element is fully removed).
We do not increment the counter 'cnt' because the element v[i] has been fully removed.
Second Condition (k <= v[i]):

If the remaining removal count k is less than or equal to the current frequency v[i], it means that we can only partially remove the occurrences 
of the current element represented by v[i] from the array without exhausting k.
In this case, we subtract k from v[i] (indicating that we have partially removed k occurrences of the current element) and set k to 0 
(indicating that we have exhausted our removal count k).
We increment the counter cnt because even though the element v[i] remains partially, it still contributes to the count of unique integers that need to be removed.
 */


var findLeastNumOfUniqueInts = function(arr, k) {
    let mp = new Map();
    for (let a of arr) {
        mp.set(a, (mp.get(a) || 0) + 1);
    }
    
    let v = Array.from(mp.values());
    let cnt = 0;
    v.sort((a, b) => a - b);
    for (let i = 0; i < v.length; i++) {
        if (k > v[i]) {
            k -= v[i];
            v[i] = 0;
        } else {
            v[i] -= k;
            k = 0;
        }
        if (v[i] !== 0) cnt++;
    }
    return cnt;
};