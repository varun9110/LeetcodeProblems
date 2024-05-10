/**
 * 786. K-th Smallest Prime Fraction
 * Difficulty: Medium
 * 
 * You are given a sorted integer array arr containing 1 and prime numbers, where all the integers of arr are unique. You are also given an integer k.

For every i and j where 0 <= i < j < arr.length, we consider the fraction arr[i] / arr[j].

Return the kth smallest fraction considered. Return your answer as an array of integers of size 2, where answer[0] == arr[i] and answer[1] == arr[j].

 

Example 1:

Input: arr = [1,2,3,5], k = 3
Output: [2,5]
Explanation: The fractions to be considered in sorted order are:
1/5, 1/3, 2/5, 1/2, 3/5, and 2/3.
The third fraction is 2/5.
Example 2:

Input: arr = [1,7], k = 1
Output: [1,7]
 

Constraints:

2 <= arr.length <= 1000
1 <= arr[i] <= 3 * 104
arr[0] == 1
arr[i] is a prime number for i > 0.
All the numbers of arr are unique and sorted in strictly increasing order.
1 <= k <= arr.length * (arr.length - 1) / 2
 

Follow up: Can you solve the problem with better than O(n2) complexity?
 */

/**
 * Approach: Best (Binary Search)
Finding the Kth Smallest Fraction with Spider-Man

Introduction: Hey there, true believers! Your friendly neighborhood Spider-Man here to break down this mind-bending problem for you!

Understanding the Problem: First things first, we gotta understand the problem itself. We've got an array of prime numbers, and we need to find the kth smallest fraction formed by dividing any two numbers in the array.

Binary Search Trick: Now, we could go the brute-force way and calculate all the fractions, sort 'em, and pick the kth one. But that's just too easy, and Spider-Man never takes the easy way out!

Binary Search Basics:

a. We start with a range of possible values, from 0 to 1 in this case.

b. We pick a value in the middle of the range, let's call it "mid."

c. Then, we count how many fractions are less than or equal to "mid."

d. If the count is equal to k, we've found our kth smallest fraction! Woohoo!

e. If the count is less than k, we need to search for a larger fraction, so we update the lower bound of our range to "mid."

f. If the count is greater than k, we need to search for a smaller fraction, so we update the upper bound of our range to "mid."

g. We keep repeating this process until we find the kth smallest fraction.

Counting Fractions: But wait, how do we count the number of fractions less than or equal to a given value? Well, that's where the real magic happens!

Spider-Man's Strategy: For each number in the array, we find the smallest index "j" such that the fraction formed by dividing the current number by arr[j] is greater than "mid."

Determining Fraction's Position: All the fractions formed by dividing the current number by arr[j] or any larger number in the array will be greater than "mid."

Updating Count: So, we can add the count of all these fractions to our total count!

Tracking Maximum Fraction: And while we're at it, we might as well keep track of the maximum fraction we've seen so far that's less than or equal to "mid." That way, we can return it if the total count ever equals k!

Conclusion: Alright, true believers, that's the gist of it! With this approach, we can find the kth smallest fraction in O(n log n) time, which is way better than the brute-force approach.

Final Words: Just remember, with great power comes great responsibility, so use this knowledge wisely, and don't let any supervillains get their hands on it!

Signing Off: Your friendly neighborhood Spider-Man, signing off!
 */

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var kthSmallestPrimeFraction = function(arr, k) {
    let left = 0, right = 1;
    let res = [];

    while (left <= right) {
        let mid = left + (right - left) / 2;
        let j = 1, total = 0, num = 0, den = 0;
        let maxFrac = 0;

        for (let i = 0; i < arr.length; ++i) {
            while (j < arr.length && arr[i] >= arr[j] * mid) {
                ++j;
            }
                
            total += arr.length - j;

            if (j < arr.length && maxFrac < arr[i] * 1.0 / arr[j]) {
                maxFrac = arr[i] * 1.0 / arr[j];
                num = i;
                den = j;
            }
        }

        if (total === k) {
            res = [arr[num], arr[den]];
            break;
        }

        if (total > k) {
            right = mid;
        } else {
            left = mid;
        }
    }

    return res;
};