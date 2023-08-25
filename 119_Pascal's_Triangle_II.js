/**
 * 119. Pascal's Triangle II
 * Difficulty : Easy
 * 
 * Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's triangle.
In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

Example 1:
Input: rowIndex = 3
Output: [1,3,3,1]
Example 2:
Input: rowIndex = 0
Output: [1]
Example 3:
Input: rowIndex = 1
Output: [1,1]

Constraints:
0 <= rowIndex <= 33
 */


/**
 * Approach: doable using the nested for loop and keep calculating the values of the current array in terms of the previous array
 */
var getRow = function(rowIndex) {
    let totalArray = [[1]];

    for(let i=1; i<=rowIndex; i++){
        let previousArray = totalArray[i-1];
        let newArray = [];
        for(let j=-1; j<previousArray.length; j++){
            let first = (previousArray[j]) ? previousArray[j] : 0;
            let second = (previousArray[j+1]) ? previousArray[j+1] : 0;
            newArray.push(first+second);
        }
        totalArray.push(newArray);
    }
    return totalArray[rowIndex];
};

/**
 * Refined approach:
 * As you know you can get any element of Pascal's Triangle in O(N) time and constant space complexity.
for first row first column we have 1C1
for second row first column we have 2C1
for second row second column we have 2C2
..... and so on
Therefore we can infer, for ith row and jth column we have the number iCj

And calculating this is pretty easy just in N time (factorial basically).
==> nCr = n*(n-1)*(n-2)...(r terms) / 1*2*..........*(r-2)*(r-1)*r
Now the question asks us to find the complete row.
If we calculate all the elements in this manner it would be quadratic in time. But, since its formula is pretty sleek, we proceed as follows:
suppose we have nCr and we have to find nC(r+1), like 5C3 and 5C4
==> 5C3 = 5*4*3 / 1*2*3
to get the next term we multiply numerator with its next term and denominator with its next term. As,
==> 5C4 = 5*4*3 * 2 / 1*2*3 * 4
We are following this simple maths logic to get the complete row in O(N) time.
Note:- We didnt actually need the variable temp. But the test cases are such that multiplying in one case exceeds the int range, and since we cannot change return type 
we have to take the long data type variable as temporary.
 */

var getRow = function(r) {
    var ans = new Array(r+1)
    ans[0]=ans[r]=1
    for(i=1,up=r;i<r;i++,up--)
        ans[i] = ans[i-1]*up/i
    return ans
};