/**
 * 2561. Rearranging Fruits
 * Difficulty: Hard
 * 
 * You have two fruit baskets containing n fruits each. You are given two 0-indexed integer arrays basket1 and basket2 representing the cost of fruit in each basket. You want to make both baskets equal. To do so, you can use the following operation as many times as you want:

Chose two indices i and j, and swap the ith fruit of basket1 with the jth fruit of basket2.
The cost of the swap is min(basket1[i],basket2[j]).
Two baskets are considered equal if sorting them according to the fruit cost makes them exactly the same baskets.

Return the minimum cost to make both the baskets equal or -1 if impossible.

 

Example 1:

Input: basket1 = [4,2,2,2], basket2 = [1,4,1,2]
Output: 1
Explanation: Swap index 1 of basket1 with index 0 of basket2, which has cost 1. Now basket1 = [4,1,2,2] and basket2 = [2,4,1,2]. Rearranging both the arrays makes them equal.
Example 2:

Input: basket1 = [2,3,4,1], basket2 = [3,2,5,1]
Output: -1
Explanation: It can be shown that it is impossible to make both the baskets equal.
 

Constraints:

basket1.length == basket2.length
1 <= basket1.length <= 105
1 <= basket1[i],basket2[i] <= 109
 */

/**]First, we count the occurrences in basket 
1
​
  and basket 
2
​
 .

If any fruit type has an odd total frequency, it becomes impossible to make both baskets identical through swapping.

In that case, return immediately −1.

Next, since the combined total number of fruits is even, identify the fruits in basket 
1
​
  and basket 
2
​
  that need to be swapped.

Important point:

The cost of the swap is:

min(basket1[i],basket2[j])
Example:

basket1 = [1, 1, 20, 20, 20]
basket2 = [100, 100, 20, 8, 8]
1. Direct Swap

Choose one fruit from two baskets to direct swap, very straightforward.

The minimum cost is

min(basket1[i], basket2[i])
image.png

2. Indirect Swap

The other way is to use the smallest value in basket 
1
​
  and basket 
2
​
 , and swap two times.

image.png

Hence, we need to compare which swap way is the minimum cost. */

/**
 * @param {number[]} basket1
 * @param {number[]} basket2
 * @return {number}
 */
const minCost = (basket1, basket2) => {
    const n = basket1.length;

    const map1 = new Map();
    const map2 = new Map();
    let minVal = Infinity;

    for (let i = 0; i < n; i++) {
        map1.set(basket1[i], (map1.get(basket1[i]) || 0) + 1);
        map2.set(basket2[i], (map2.get(basket2[i]) || 0) + 1);
        minVal = Math.min(minVal, basket1[i]);
        minVal = Math.min(minVal, basket2[i]);
    }

    const swapList1 = [];
    for (const [key, count1] of map1.entries()) {
        const count2 = map2.get(key) || 0;
        if ((count1 + count2) % 2 === 1) return -1;
        if (count1 > count2) {
            let addCnt = (count1 - count2) / 2;
            while (addCnt-- > 0) {
                swapList1.push(key);
            }
        }
    }

    const swapList2 = [];
    for (const [key, count2] of map2.entries()) {
        const count1 = map1.get(key) || 0;
        if ((count1 + count2) % 2 === 1) return -1;
        if (count2 > count1) {
            let addCnt = (count2 - count1) / 2;
            while (addCnt-- > 0) {
                swapList2.push(key);
            }
        }
    }

    swapList1.sort((a, b) => a - b);
    swapList2.sort((a, b) => b - a);

    let res = 0;
    for (let i = 0; i < swapList1.length; i++) {
        res += Math.min(2 * minVal, Math.min(swapList1[i], swapList2[i]));
    }

    return res;
};