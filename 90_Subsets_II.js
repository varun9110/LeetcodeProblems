/**
 * 90. Subsets II
 * Difficulty : Medium
 * 
 * Given an integer array nums that may contain duplicates, return all possible 
subsets
 (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

 

Example 1:

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
 */

/**
 * Approaches
(Also explained in the code)

Sorting the Input:

Initially, the nums vector is sorted in ascending order. This sorting helps in identifying duplicates and ensures that 
identical elements appear consecutively.
Recursive Backtracking (f function):

The f function generates subsets using a recursive backtracking approach.
It maintains an index (index) that tracks the position of the current element being considered for inclusion in the subset.
It starts by adding the current subset t into the ans vector of subsets.
Iteration through Elements:

The function iterates through the elements of nums starting from the index position.
It checks for duplicates by ensuring that if i is not equal to index (not considering the same index) and the current element 
is the same as the previous one, it skips duplicates using continue.
Building Subsets:

For each valid element, it adds that element to the subset t, calls the f function recursively with the next index i + 1, 
and explores further elements to create subsets that include the current element.
After the recursive call, it removes the last added element from the t subset (t.pop_back()) to backtrack and explore other possibilities.
Subset Generation:

As the recursion unwinds, it generates different combinations of subsets by adding and removing elements, eventually leading 
to the generation of all unique subsets without duplicates.
Return:

Finally, all subsets (including duplicates) are collected in the ans vector and returned as the result.
Complexity
Time complexity:
O(2n∗n)

Space complexity:
O(2n∗k)
 */

var subsetsWithDup = function(nums) {
    const ans = [];
    nums.sort((a, b) => a - b);

    function f(index, t) {
        ans.push([...t]);

        for (let i = index; i < nums.length; i++) {
            if (i !== index && nums[i] === nums[i - 1]) continue;
            t.push(nums[i]);
            f(i + 1, t);
            t.pop();
        }
    }

    f(0, []);
    return ans;
};