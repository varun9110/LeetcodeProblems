/**
 * 2064. Minimized Maximum of Products Distributed to Any Store
 * Difficulty: Medium
 * 
 * You are given an integer n indicating there are n specialty retail stores. There are m product types of varying amounts, 
 * which are given as a 0-indexed integer array quantities, where quantities[i] represents the number of products of the ith product type.

You need to distribute all products to the retail stores following these rules:

A store can only be given at most one product type but can be given any amount of it.
After distribution, each store will have been given some number of products (possibly 0). Let x represent the maximum number 
of products given to any store. You want x to be as small as possible, i.e., you want to minimize the maximum number of products that are given to any store.
Return the minimum possible x.

Example 1:
Input: n = 6, quantities = [11,6]
Output: 3
Explanation: One optimal way is:
- The 11 products of type 0 are distributed to the first four stores in these amounts: 2, 3, 3, 3
- The 6 products of type 1 are distributed to the other two stores in these amounts: 3, 3
The maximum number of products given to any store is max(2, 3, 3, 3, 3, 3) = 3.
Example 2:
Input: n = 7, quantities = [15,10,10]
Output: 5
Explanation: One optimal way is:
- The 15 products of type 0 are distributed to the first three stores in these amounts: 5, 5, 5
- The 10 products of type 1 are distributed to the next two stores in these amounts: 5, 5
- The 10 products of type 2 are distributed to the last two stores in these amounts: 5, 5
The maximum number of products given to any store is max(5, 5, 5, 5, 5, 5, 5) = 5.
Example 3:
Input: n = 1, quantities = [100000]
Output: 100000
Explanation: The only optimal way is:
- The 100000 products of type 0 are distributed to the only store.
The maximum number of products given to any store is max(100000) = 100000.

Constraints:

m == quantities.length
1 <= m <= n <= 105
1 <= quantities[i] <= 105
 */

/**
 * #2 Greedy BSoA Aproach
Main Function minimizedMaximum:
def minimizedMaximum(self, storeCount: int, productQuantities: List[int]) -> int:
    maxQuantity = max(productQuantities)
    left = 1
    right = maxQuantity
    result = 0
Takes number of stores and list of product quantities as input
Sets up binary search boundaries:
left = 1 (minimum possible products per store)
right = maxQuantity (maximum quantity among all products)
Binary Search:
    while left <= right:
        mid = left + (right - left) // 2
        if self.canDistributeProducts(mid, storeCount, productQuantities):
            result = mid
            right = mid - 1
        else:
            left = mid + 1
Uses biary search to find optimal maximum products per store
For each mid point:
Checks if distribution is possible with mid as max products per store
If possible, stores result and tries to find smaller value
If not possible, tries larger value
Helper Function canDistributeProducts:
def canDistributeProducts(self, maxProductsPerStore: int, storeCount: int, quantities: List[int]) -> bool:
    requiredStores = 0
    
    for quantity in quantities:
        requiredStores += (quantity + maxProductsPerStore - 1) // maxProductsPerStore
    
    return requiredStores <= storeCount
Checks if distribution is possible with given maximum products per store
For each product quantity:
Calculates minimum stores needed using ceiling division
Formula: (quantity + maxProductsPerStore - 1) // maxProductsPerStore
Returns true if total required stores ≤ available stores
walkthrough:

If storeCount = 6 and productQuantities = [11, 6]
Binary search starts with left=1, right=11
For mid=6:
Product 1 (11): needs ⌈11/6⌉ = 2 stores
Product 2 (6): needs ⌈6/6⌉ = 1 store
Total: 3 stores (≤ 6, possible)
and continues until finding minimum possible value
Done.

Upvote is just one click for U >__<
 */

/**
 * @param {number} n
 * @param {number[]} quantities
 * @return {number}
 */

var minimizedMaximum = function(n, quantities) {
    const maxQuantity = Math.max(...quantities);
    let left = 1;
    let right = maxQuantity;
    let result = 0;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (canDistributeProducts(mid, n, quantities)) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return result;
};

function canDistributeProducts(maxProductsPerStore, n, quantities) {
    let requiredStores = 0;
    
    for (const quantity of quantities) {
        requiredStores += Math.ceil(quantity / maxProductsPerStore);
    }
    
    return requiredStores <= n;
}