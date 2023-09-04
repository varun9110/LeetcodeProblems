/**
 * 605. Can Place Flowers
 * Difficulty: Easy
 * You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.
Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return true if n new 
flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule and false otherwise.

Example 1:
Input: flowerbed = [1,0,0,0,1], n = 1
Output: true
Example 2:
Input: flowerbed = [1,0,0,0,1], n = 2
Output: false

Constraints:
1 <= flowerbed.length <= 2 * 104
flowerbed[i] is 0 or 1.
There are no two adjacent flowers in flowerbed.
0 <= n <= flowerbed.length
 */

/**
 * Approach: 
 * iterate through the array and keep checking the i-1 and i+1 to check if they are empty, if they are then pot a flower there and then continue
 */

var canPlaceFlowers = function(flowerbed, n) {
    let len = flowerbed.length;
    for(let i=0; i<len; i++){
        if(n===0) return true;
        let leftE = true;
        if(i-1>=0 && flowerbed[i-1] != 0) leftE = false;
        let rightE = true;
        if(i+1<len && flowerbed[i+1] != 0) rightE = false;
        if(leftE && rightE && flowerbed[i]===0){
            flowerbed[i] = 1;
            n--;
        }
    }
    return (n===0);
};


/**
 * Approach 2:
 * I see that many solutions mutating the array, this apporach uses one helper variable to keep track of gaps.
It is not hard to see that you can place at most (c - 1) / 2 flowers into the gap, where c is a number of continuous 0 
in the gap. With two exceptions, when first or last position is 0 we need extra +1.
 */

var canPlaceFlowers = function(flowerbed, n) {
    let current = 0; const size = flowerbed.length;
	for(var i = 0; i <= size; i++) {
		if (i < size && flowerbed[i] == 0) {
			current++;
			if (i == 0) current++;
			if (i == size - 1) current++;
		} else {
			n -= Math.trunc((current - 1) / 2);
			if (n <= 0) return true;
			current = 0;
		}
	}
	return false;
};