/**
 * 2418. Sort the People
 * Difficulty : Easy
 * 
 * You are given an array of strings names, and an array heights that consists of distinct positive integers. Both arrays are of length n.
For each index i, names[i] and heights[i] denote the name and height of the ith person.
Return names sorted in descending order by the people's heights.
Example 1:
Input: names = ["Mary","John","Emma"], heights = [180,165,170]
Output: ["Mary","Emma","John"]
Explanation: Mary is the tallest, followed by Emma and John.
Example 2:
Input: names = ["Alice","Bob","Bob"], heights = [155,185,150]
Output: ["Bob","Alice","Bob"]
Explanation: The first Bob is the tallest, followed by Alice and the second Bob.

Constraints:
n == names.length == heights.length
1 <= n <= 103
1 <= names[i].length <= 20
1 <= heights[i] <= 105
names[i] consists of lower and upper case English letters.
All the values of heights are distinct.
 */

/**
 * Approach:
 * create a mapper with name and height as the keys to an object.
 * then sort this array with height as the parameter
 * 
 * next create a new array for the result names.
 * return this array
 */

var sortPeople = function(names, heights) {
    let mapper = [];
    for(let i=0; i<names.length; i++){
        mapper.push({
            name : names[i],
            height: heights[i]
        });
    }
    mapper.sort((a,b) => b.height-a.height);
    let result = [];
    for(let i=0; i<mapper.length; i++){
        result.push(mapper[i].name);
    }
    return result;
};

/**
 * same appraoch using map
 */
var sortPeople = function(names, heights) {
    let length = heights.length;
    let map = new Map();
    for(let i=0; i<length; i++){
        map.set(heights[i], names[i]);
    }
    heights.sort((a,b) => b-a);
    let res = [];
    for(let height of heights){
        res.push(map.get(height));
    }
    return res;
};