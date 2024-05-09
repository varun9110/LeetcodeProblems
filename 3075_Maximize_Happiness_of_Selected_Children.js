/**
 * 3075. Maximize Happiness of Selected Children
 * Difficulty: Medium
 * 
 * You are given an array happiness of length n, and a positive integer k.

There are n children standing in a queue, where the ith child has happiness value happiness[i]. 
You want to select k children from these n children in k turns.

In each turn, when you select a child, the happiness value of all the children that have not been selected till now decreases by 1. 
Note that the happiness value cannot become negative and gets decremented only if it is positive.

Return the maximum sum of the happiness values of the selected children you can achieve by selecting k children.

Example 1:

Input: happiness = [1,2,3], k = 2
Output: 4
Explanation: We can pick 2 children in the following way:
- Pick the child with the happiness value == 3. The happiness value of the remaining children becomes [0,1].
- Pick the child with the happiness value == 1. The happiness value of the remaining child becomes [0]. 
Note that the happiness value cannot become less than 0.
The sum of the happiness values of the selected children is 3 + 1 = 4.
Example 2:

Input: happiness = [1,1,1,1], k = 2
Output: 1
Explanation: We can pick 2 children in the following way:
- Pick any child with the happiness value == 1. The happiness value of the remaining children becomes [0,0,0].
- Pick the child with the happiness value == 0. The happiness value of the remaining child becomes [0,0].
The sum of the happiness values of the selected children is 1 + 0 = 1.
Example 3:

Input: happiness = [2,3,4,5], k = 1
Output: 5
Explanation: We can pick 1 child in the following way:
- Pick the child with the happiness value == 5. The happiness value of the remaining children becomes [1,2,3].
The sum of the happiness values of the selected children is 5.
 

Constraints:

1 <= n == happiness.length <= 2 * 105
1 <= happiness[i] <= 108
1 <= k <= n
 */

/**
 * Approach
So, the problem aims to maximize the total happiness gained by selecting the happiest bowls of ramen within the given budget (k). 
It's all about enjoying the most happiness while savoring some tasty ramen! Let's break down the approach used in the code with Yuji Itadori's style:

Sorting the Happiness Bowls: Just like picking the most delicious ramen bowls, we sort the bowls of happiness in descending order. 
This way, we can start with the happiest ones first!

Eating the Yummiest Bowls: With a limited number of bowls we can eat (k), we start devouring the yummiest ones! 
Each time we eat a bowl, we check if it makes us even happier. If it does, we enjoy it; otherwise, we skip it.

Adjusting Happiness Levels: As we eat the bowls, we also adjust the happiness levels of the remaining bowls. 
We subtract 1 from their happiness, but only if they were initially positive.

Summing Up the Joy: After finishing our ramen feast, we sum up all the happiness from the bowls we've eaten. That's our total joy!

So, it's all about picking the most happiness-packed bowls within our limit and making sure each bowl we eat adds to our overall joy. 
Just like enjoying a hearty ramen meal!
 */

var maximumHappinessSum = function(happiness, k) {
    happiness.sort((a, b) => b - a);
    let i = 0;
    let res = 0;

    while (k > 0 && i < happiness.length) {
        happiness[i] = Math.max(happiness[i] - i, 0);
        res += happiness[i];
        i++;
        k--;
    }

    return res;
};