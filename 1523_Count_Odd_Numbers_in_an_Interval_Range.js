/*

1523_Count_Odd_Numbers_in_an_Interval_Range
Difficulty : Easy


1523. Count Odd Numbers in an Interval Range
Easy
1.3K
90
Companies
Given two non-negative integers low and high. Return the count of odd numbers between low and high (inclusive).

 

Example 1:

Input: low = 3, high = 7
Output: 3
Explanation: The odd numbers between 3 and 7 are [3,5,7].
Example 2:

Input: low = 8, high = 10
Output: 1
Explanation: The odd numbers between 8 and 10 are [9].
 

Constraints:

0 <= low <= high <= 10^9



*/

/*

Approach
case 1:
l = 3 
h=7
4/2 = 2
[3,5] + 7 = 3

case 2:
l =4 
h=8
4/2 = 2
[5,7]

case 3:
l=4
h=9
5/2 = 2
[5,7] + 9 = 3

case 4:
l=5
h= 10
5/2 = 2 
[7,9] + 5 = 3

*/

var countOdds = function(low, high) {
    let diff = high -low;
    if((low %2 === 0) && (high%2 ===0)){
        return Math.floor(diff/2);
    } else {
        return (Math.floor(diff/2) + 1);
    }
};

