/**
 * 374. Guess Number Higher or Lower
 * Difficulty: Easy
 * 
 * We are playing the Guess Game. The game is as follows:
I pick a number from 1 to n. You have to guess which number I picked.
Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.
You call a pre-defined API int guess(int num), which returns three possible results:
-1: Your guess is higher than the number I picked (i.e. num > pick).
1: Your guess is lower than the number I picked (i.e. num < pick).
0: your guess is equal to the number I picked (i.e. num == pick).
Return the number that I picked.
Example 1:
Input: n = 10, pick = 6
Output: 6
Example 2:
Input: n = 1, pick = 1
Output: 1
Example 3:
Input: n = 2, pick = 1
Output: 1
Constraints:
1 <= n <= 231 - 1
1 <= pick <= n
 */

var guessNumber = function(n) {
    let l = 0, r = n-1;
    while(l  <= r ){
        let mid = Math.floor((l+r)/2);
        let res = guess(mid);
        if(res == 0) return mid;
        else if (res == 1) l = mid+1;
        else r = mid-1;
    }
    return l; 
};

/**
 * Refined code
 *
 */


var guessNumber = function(n) {
    let ceil = n;
    let floor = 1;
    let mid = getMidPoint(ceil, floor);
    for(let g = guess(mid); g !== 0; mid = getMidPoint(ceil, floor), g = guess(mid)){
        if(g === -1){
            ceil = mid-1;
        }else{
            floor = mid+1;
        }
    }
    return mid;
};

const getMidPoint = (ceil, floor) => floor + Math.ceil((ceil-floor)/2);