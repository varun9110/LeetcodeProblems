/**
 * 881. Boats to Save People
 * Difficulty: Medium
 * 
 * You are given an array people where people[i] is the weight of the ith person, and an infinite number of boats where 
 * each boat can carry a maximum weight of limit. Each boat carries at most two people at the same time, 
 * provided the sum of the weight of those people is at most limit.

Return the minimum number of boats to carry every given person.

 

Example 1:

Input: people = [1,2], limit = 3
Output: 1
Explanation: 1 boat (1, 2)
Example 2:

Input: people = [3,2,2,1], limit = 3
Output: 3
Explanation: 3 boats (1, 2), (2) and (3)
Example 3:

Input: people = [3,5,3,4], limit = 5
Output: 4
Explanation: 4 boats (3), (3), (4), (5)
 

Constraints:

1 <= people.length <= 5 * 104
1 <= people[i] <= limit <= 3 * 104
 */

/**
 * Approach
Sort the people array in non-decreasing order.

Initialize the left pointer to the first element of the array, and the right pointer to the last element of the array.

Initialize a counter variable boats to 0.

While the left pointer is less than or equal to the right pointer, do the following:
a. Check if the sum of the weights of the people at the left and right pointers is less than
or equal to the limit.
b. If the sum is less than or equal to the limit, move the left pointer one step to the
right to include the next lightest person.
c. Move the right pointer one step to the left to include the next heaviest person,
regardless of whether or not they can fit on the current boat.
d. Increment the boats counter by 1.

Return the boats counter, which represents the total number of boats used.
 */

var numRescueBoats = function(people, limit) {
    people.sort(function(a, b) { return a - b; });
    var left = 0, right = people.length - 1, boats = 0;
    while (left <= right) {
        if (people[left] + people[right] <= limit) {
            left++;
        }
        right--;
        boats++;
    }
    return boats;
};