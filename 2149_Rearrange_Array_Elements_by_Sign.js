/**
 * 2149. Rearrange Array Elements by Sign
 * Difficulty: Medium
 * 
 * You are given a 0-indexed integer array nums of even length consisting of an equal number of positive and negative integers.
You should rearrange the elements of nums such that the modified array follows the given conditions:
Every consecutive pair of integers have opposite signs.
For all integers with the same sign, the order in which they were present in nums is preserved.
The rearranged array begins with a positive integer.
Return the modified array after rearranging the elements to satisfy the aforementioned conditions.

Example 1:
Input: nums = [3,1,-2,-5,2,-4]
Output: [3,-2,1,-5,2,-4]
Explanation:
The positive integers in nums are [3,1,2]. The negative integers are [-2,-5,-4].
The only possible way to rearrange them such that they satisfy all conditions is [3,-2,1,-5,2,-4].
Other ways such as [1,-2,2,-5,3,-4], [3,1,2,-2,-5,-4], [-2,3,-5,1,-4,2] are incorrect because they do not satisfy one or more conditions.  
Example 2:
Input: nums = [-1,1]
Output: [1,-1]
Explanation:
1 is the only positive integer and -1 the only negative integer in nums.
So nums is rearranged to [1,-1].

Constraints:

2 <= nums.length <= 2 * 105
nums.length is even
1 <= |nums[i]| <= 105
nums consists of equal number of positive and negative integers.
 */

/**
 * Approach 1 ( Brute Force )
We will iterate over the nums vector.
If we encounter positive number then putting in v1 and if negative putting in v2.
Screenshot 2024-02-14 060503.png

With the help of while loop iterating both together and putting values in the ans vector, 
where ind1 in index for v1 and ind2 for v2 and the 1st element should be positive.
 */

var rearrangeArray = function(nums) {
    let v1 = [];
    let v2 = [];
    let ans = [];
    
    for (let num of nums) {
        if (num > 0) {
            v1.push(num);
        } else {
            v2.push(num);
        }
    }
    
    let ind1 = 0;
    let ind2 = 0;
    
    while (ind2 < nums.length / 2) {
        ans.push(v1[ind1]);
        ind1++;
        ans.push(v2[ind2]);
        ind2++;
    }
    
    return ans;
};


/**
 * Approach 2( Optimized )
Here we are directly putting values in the ans vector with the help of 2 pointer approach where initially both the indexes pos and neg are 0 and 1.
If we encounter positive element then will put values in the ans vector with the help of ans[pos] = nums[i] and if found negative element then ans[neg] = nums[i].
Screenshot 2024-02-14 061156.png


Here, we can't use ans.push_back() to add elements because
 we're not appending values sequentially. Instead, we're placing
 values at specific indexes based on the element we have.

The number 1....6 are the order in which the elements where
 pushed into the ans vector.

 */

 
var rearrangeArray = function(nums) {
    let ans = new Array(nums.length).fill(0);
    let pos = 0, neg = 1;
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            ans[pos] = nums[i];
            pos += 2;
        } else {
            ans[neg] = nums[i];
            neg += 2;
        }
    }
    
    return ans;
};