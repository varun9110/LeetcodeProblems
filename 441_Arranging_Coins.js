/**
 * 441. Arranging Coins
 * Difficulty: Easy
 * 
 * You have n coins and you want to build a staircase with these coins. 
 * The staircase consists of k rows where the ith row has exactly i coins. The last row of the staircase may be incomplete.
Given the integer n, return the number of complete rows of the staircase you will build.
Example 1:
Input: n = 5
Output: 2
Explanation: Because the 3rd row is incomplete, we return 2.
Example 2
Input: n = 8
Output: 3
Explanation: Because the 4th row is incomplete, we return 3.
Constraints:
1 <= n <= 231 - 1
 */

var arrangeCoins = function(n) {
    let k=0;
    while(n>=(k+1)){
        k++;
        n = n-k;
    }
    return k;
};

/**
 * Refined approach.
 * Little lesser time complexity
 */

var arrangeCoins = function(n) {
      let left = 0; // we use "long" because we may get an integer overflow
		let right = n;
		while(left <= right){
			let pivot = left + Math.floor((right - left) / 2);
			let coinsUsed = pivot * (pivot + 1)/2;
			if(coinsUsed == n){
				return pivot;
			}
			if(n < coinsUsed){
				right = pivot-1;
			}
			else{
				left = pivot + 1;
			}
		}
		return right;
};