/**
 * 904. Fruit Into Baskets
 * Difficulty: Medium
 * 
 * You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
Given the integer array fruits, return the maximum number of fruits you can pick.

 

Example 1:

Input: fruits = [1,2,1]
Output: 3
Explanation: We can pick from all 3 trees.
Example 2:

Input: fruits = [0,1,2,2]
Output: 3
Explanation: We can pick from trees [1,2,2].
If we had started at the first tree, we would only pick from trees [0,1].
Example 3:

Input: fruits = [1,2,3,2,2]
Output: 4
Explanation: We can pick from trees [2,3,2,2].
If we had started at the first tree, we would only pick from trees [1,2].
 

Constraints:

1 <= fruits.length <= 105
0 <= fruits[i] < fruits.length
 */

/**
 * 💡 Intuition
We are allowed to collect fruits from at most 2 different types of trees.
Instead of using a map to track counts (which adds overhead), we only need to track the last two types of fruits we picked and the number of times the most recent fruit was seen at the end.

That way, we can always calculate the length of the current valid window in O(1) time as we iterate.

🧠 Approach
We keep these variables:

last: the last fruit type seen
secondLast: the previous fruit type
lastCount: how many times in a row we've seen the last fruit
curr: the length of current valid window
max: the maximum window length found
🔁 Step-by-step:
Loop through the array.
If current fruit is same as last or secondLast, extend window (curr++).
Else, we have a third fruit → reset window to lastCount + 1.
Update last, secondLast, and lastCount accordingly.
Track the maximum window length in max.
🍌 Example
Input: [1, 2, 3, 2, 2]

We walk through the array:

1 → valid
2 → new fruit → window = [1,2]
3 → third type → reset window to [2,3]
2 → allowed → extend
2 → extend → max = 4
Result: 4 (we collect fruits from trees at indices [2, 3, 4, 5])

⏱️ Complexity
Time Complexity: O(n)
We process each element of the fruits array exactly once in a single pass.

Space Complexity: O(1)
We use only a constant number of variables (last, secondLast, lastCount, etc.), regardless of input size.
 */

/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(fruits) {
    let last = -1, secondLast = -1;
    let lastCount = 0, curr = 0, maxFruits = 0;

    for (let fruit of fruits) {
        if (fruit === last || fruit === secondLast) {
            curr++;
        } else {
            curr = lastCount + 1;
        }

        if (fruit === last) {
            lastCount++;
        } else {
            lastCount = 1;
            secondLast = last;
            last = fruit;
        }

        maxFruits = Math.max(maxFruits, curr);
    }

    return maxFruits;
};