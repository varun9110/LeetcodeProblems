/*

492. Construct the Rectangle
Difficulty : Easy

A web developer needs to know how to design a web page's size. So, given a specific rectangular web page’s area, your job by now is to design a rectangular web page, whose length L and width W satisfy the following requirements:

The area of the rectangular web page you designed must equal to the given target area.
The width W should not be larger than the length L, which means L >= W.
The difference between length L and width W should be as small as possible.
Return an array [L, W] where L and W are the length and width of the web page you designed in sequence.

Example 1:
Input: area = 4
Output: [2,2]
Explanation: The target area is 4, and all the possible ways to construct it are [1,4], [2,2], [4,1]. 
But according to requirement 2, [1,4] is illegal; according to requirement 3,  [4,1] is not optimal compared to [2,2]. So the length L is 2, and the width W is 2.

Example 2:
Input: area = 37
Output: [37,1]

Example 3:
Input: area = 122122
Output: [427,286]
 

Constraints:
1 <= area <= 107

*/

/*
Approach 1: find all the divisibles of the area and push them to an array. 
then find the length of the array. if odd then square of the middle index. if even then multiple of the middle 2 indexes
O(n)
*/

var constructRectangle = function(area) {
    let i=0;
    let arr = [];
    while(i<=area){
        if(area%i === 0){
            arr.push(i);
        }
        i++;
    }
    let len = arr.length;
    let ind = Math.floor(len/2);
    if(len%2 === 1){
        return [arr[ind], arr[ind]];
    } else {
        return [arr[ind], arr[ind-1]];
    }
};

/*
Approach 2: Find the squaure root of the number and find the floor of that.
Then consider it as width and then decrease the width till we get area%w === 0;
then return the area/w and w itself in the array
*/


var constructRectangle = function(area) {
    let w = Math.floor(Math.sqrt(area));
    while (area % w!==0) w--;
    return [area/w, w];
};