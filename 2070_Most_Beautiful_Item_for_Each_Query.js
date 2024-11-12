/**
 * 2070. Most Beautiful Item for Each Query
 * Difficulty: Medium
 * 
 * You are given a 2D integer array items where items[i] = [pricei, beautyi] denotes the price and beauty of an item respectively.

You are also given a 0-indexed integer array queries. For each queries[j], you want to determine the maximum beauty of an item whose price is less than or equal to queries[j]. If no such item exists, then the answer to this query is 0.

Return an array answer of the same length as queries where answer[j] is the answer to the jth query.

 

Example 1:

Input: items = [[1,2],[3,2],[2,4],[5,6],[3,5]], queries = [1,2,3,4,5,6]
Output: [2,4,5,5,6,6]
Explanation:
- For queries[0]=1, [1,2] is the only item which has price <= 1. Hence, the answer for this query is 2.
- For queries[1]=2, the items which can be considered are [1,2] and [2,4]. 
  The maximum beauty among them is 4.
- For queries[2]=3 and queries[3]=4, the items which can be considered are [1,2], [3,2], [2,4], and [3,5].
  The maximum beauty among them is 5.
- For queries[4]=5 and queries[5]=6, all items can be considered.
  Hence, the answer for them is the maximum beauty of all items, i.e., 6.
Example 2:

Input: items = [[1,2],[1,2],[1,3],[1,4]], queries = [1]
Output: [4]
Explanation: 
The price of every item is equal to 1, so we choose the item with the maximum beauty 4. 
Note that multiple items can have the same price and/or beauty.  
Example 3:

Input: items = [[10,1000]], queries = [5]
Output: [0]
Explanation:
No item has a price less than or equal to 5, so no item can be chosen.
Hence, the answer to the query is 0.
 

Constraints:

1 <= items.length, queries.length <= 105
items[i].length == 2
1 <= pricei, beautyi, queries[j] <= 109
 */

/**
 * Intuition
The goal of this algorithm is to find the maximum "beauty" of items a person can afford, given an array of items, where each item is represented as [price, beauty], and an array of queries, where each query represents an available budget.

To do this efficiently:

We preprocess the items to build a "price-beauty bracket" where each entry stores the highest possible beauty value achievable up to a certain price.
For each query, we quickly look up the maximum beauty achievable within that budget by consulting our preprocessed data.
This allows us to answer each query in constant time after the preprocessing step.

Approach
The algorithm is divided into two main parts: preprocessing the items and processing the queries.

Part 1: Preprocessing
Sort the Items by Price: We first sort the items array by price in ascending order. Sorting helps ensure that each processed item has a price greater than or equal to previous items, allowing us to build a cumulative "price-beauty bracket."

Construct Price-Beauty Brackets:

We create a list res to store "price-beauty brackets." Each bracket is represented as [min_price, max_beauty, max_price].
Starting with a bracket [0, 0, ∞], which represents zero budget, we iterate over each item in sorted order:
If the current item's beauty is higher than the last recorded beauty in res, we add a new bracket with the current item's price and beauty, updating the last bracket’s max_price to the current price.
Result of Preprocessing: At the end of preprocessing, res will contain cumulative price-beauty brackets, allowing us to check the maximum beauty for any budget by examining the highest bracket we can afford.

Part 2: Processing the Queries
For each budget in queries, we iterate backward through res (from the most expensive bracket to the least) and find the first bracket with a minimum price that fits within the query budget.
We record the corresponding beauty value in the result array.

Example
Suppose we have:

items = [[1, 2], [3, 4], [5, 6], [6, 8]] (price-beauty pairs)
queries = [2, 3, 5, 7] (budgets)
Step-by-Step Execution
Sorting Items by Price

After sorting (already sorted here), we have items = [[1, 2], [3, 4], [5, 6], [6, 8]].
Building the Price-Beauty Brackets (res)

Initialize res with [0, 0, ∞].
Process each item:
Item [1, 2]: Since 2 > 0 (last bracket's beauty), add a new bracket [1, 2, ∞] and set the last bracket’s max_price to 1.
Item [3, 4]: Since 4 > 2, add [3, 4, ∞] and update the previous bracket’s max_price to 3.
Item [5, 6]: Since 6 > 4, add [5, 6, ∞] and update the previous bracket’s max_price to 5.
Item [6, 8]: Since 8 > 6, add [6, 8, ∞] and update the previous bracket’s max_price to 6.
Final res: [[0, 0, 1], [1, 2, 3], [3, 4, 5], [5, 6, 6], [6, 8, ∞]].
Answering Queries

For each query in queries, find the maximum beauty that can be afforded.
Query 2: Find the last bracket with min_price <= 2. Result: bracket [1, 2, 3], so beauty is 2.
Query 3: Last bracket with min_price <= 3. Result: bracket [3, 4, 5], so beauty is 4.
Query 5: Last bracket with min_price <= 5. Result: bracket [5, 6, 6], so beauty is 6.
Query 7: Last bracket with min_price <= 7. Result: bracket [6, 8, ∞], so beauty is 8.
Output
The final output for the queries [2, 3, 5, 7] would be [2, 4, 6, 8].

Complexity
Time complexity:O(N log N)
Space complexity:O(M)
 */

var maximumBeauty = function (items, queries) {
    const maxI = Number.MAX_SAFE_INTEGER;
    let res = [[0, 0, maxI]]

    items.sort((a, b) => a[0] - b[0])

    for (let item of items) {
        let price = item[0]
        let beauty = item[1]
        let lastBracket = res.at(-1)

        if (beauty > lastBracket[1]) {
            res[res.length - 1][2] = price
            res.push([price, beauty, maxI])
        }
    }

    let ans = []

    for (let x of queries) {
        for (let i = res.length - 1; i > -1; i--) {
            if (res[i][0] <= x) {
                ans.push(res[i][1])
                break
            }
        }
    }

    return ans

};