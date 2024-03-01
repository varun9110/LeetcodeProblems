/**
 * 1356. Sort Integers by The Number of 1 Bits
 * Difficulty: Easy
 * 
 * You are given an integer array arr. Sort the integers in the array in ascending order by the number of 1's in their binary 
 * representation and in case of two or more integers have the same number of 1's you have to sort them in ascending order.

Return the array after sorting it.

Example 1:
Input: arr = [0,1,2,3,4,5,6,7,8]
Output: [0,1,2,4,8,3,5,6,7]
Explantion: [0] is the only integer with 0 bits.
[1,2,4,8] all have 1 bit.
[3,5,6] have 2 bits.
[7] has 3 bits.
The sorted array by bits is [0,1,2,4,8,3,5,6,7]
Example 2:
Input: arr = [1024,512,256,128,64,32,16,8,4,2,1]
Output: [1,2,4,8,16,32,64,128,256,512,1024]
Explantion: All integers have 1 bit in the binary representation, you should just sort them in ascending order.

Constraints:
1 <= arr.length <= 500
0 <= arr[i] <= 104
 */

/**
 * Approach
Create a custom sorting function that takes two integers, x and y, as parameters.
Calculate the number of 1's in the binary representation of x and y. This can be done using the countBit function.
Compare the counts of 1's in x and y. If they are equal, compare the original integer values of x and y to ensure ascending order.
Use the custom sorting function to sort the array. The sorting function ensures that integers are sorted first by the 
count of 1's and then by their original values.
 */

var sortByBits = function(arr) {
    const n = arr.length;
    const res = new Array(n);
    for (let i = 0; i < n; i++) {
        res[i] = countBit(arr[i]) * 10001 + arr[i];
    }
    res.sort((a, b) => a - b);
    for (let i = 0; i < n; i++) {
        res[i] %= 10001;
    }
    return res;
};

function countBit(n) {
    let res = 0;
    while (n !== 0) {
        res += (n & 1);
        n >>= 1;
    }
    return res;
}