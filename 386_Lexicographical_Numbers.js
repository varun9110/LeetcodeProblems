/**
 * 386. Lexicographical Numbers
 * Difficulty: Medium
 * 
 * Given an integer n, return all the numbers in the range [1, n] sorted in lexicographical order.

You must write an algorithm that runs in O(n) time and uses O(1) extra space. 

 

Example 1:

Input: n = 13
Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]
Example 2:

Input: n = 2
Output: [1,2]
 

Constraints:

1 <= n <= 5 * 104
 */


/**
 * Intuition
we cannot use sort function as it takes nlogn time
we have to dynamically generate this array
we can use a helper function to generate numbers starting from any number given a limit
ie if this helper function gets 13 as the starting number and 138 as the limit it will generate 130,131,132,133,134,135,136,137 for us
lets see how

Approach
we will make a helper function recursive adder that will take the starting number and the limit
it will check if the starting point is out of bounds
if it is not we will get the seed for the next elements in lexi order by simply multiplying the starting point by 10
we can add 1 to 9 to this seed and get eht lexi order elements
ex-1 is the starting point
the seed = 1*10 =10
from here we will simply add 1-9 giving
11,12,13,14,.......
we finally return the result array
thats it
thank you

Complexity
Time complexity:O(N)
Space complexity:O(N)
 */

var lexicalOrder = function(n) {
    let res=[]
    function rec_adder (x,n){
        if(x>n)return 
        res.push(x)
        let pe = x*10
        for(let i=0;i<10;i++){
            rec_adder(pe+i,n)
        }
    }
    for(let i=1;i<10;i++){
        rec_adder(i,n)
    }
    return res
};