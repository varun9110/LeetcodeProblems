/**
 * 461. Hamming Distance
 * Difficulty: Easy
 * 
 * The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

Given two integers x and y, return the Hamming distance between them.

Example 1:
Input: x = 1, y = 4
Output: 2
Explanation:
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑
The above arrows point to positions where the corresponding bits are different.
Example 2:
Input: x = 3, y = 1
Output: 1

Constraints:
0 <= x, y <= 231 - 1
 */

var hammingDistance = function(x, y) {
    let a = x.toString(2).toString();
    let b = y.toString(2).toString();
    if(a.length < b.length){
        let diff = b.length-a.length;
        for(let i=0; i<diff; i++){
            a = "0" +a
        }
    } else {
        let diff = a.length-b.length;
        for(let i=0; i<diff; i++){
            b = "0" +b
        }
    }
    console.log(a, b)

    let count = 0
    for(let i = 0; i < a.length; i++){
        if(a[i] != b[i]) count++
    }
    return count
};

/**
 * A little refined code
 */

var hammingDistance = function(x, y) {
    x = x.toString(2).split('').reverse()
    y = y.toString(2).split('').reverse()
    console.log(x, y)
    while(x.length < y.length) x.push('0')
    while(x.length > y.length) y.push('0')

    console.log(x, y)
    let count = 0
    for(let i = 0; i < x.length; i++){
        if(x[i] != y[i]) count++
    }
    return count
};