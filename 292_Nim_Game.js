/**
 * 292. Nim Game
 * Difficulty: Easy
 * 
 * You are playing the following Nim Game with your friend:
Initially, there is a heap of stones on the table.
You and your friend will alternate taking turns, and you go first.
On each turn, the person whose turn it is will remove 1 to 3 stones from the heap.
The one who removes the last stone is the winner.
Given n, the number of stones in the heap, return true if you can win the game assuming both you and your friend play optimally, otherwise return false.
Example 1:
Input: n = 4
Output: false
Explanation: These are the possible outcomes:
1. You remove 1 stone. Your friend removes 3 stones, including the last stone. Your friend wins.
2. You remove 2 stones. Your friend removes 2 stones, including the last stone. Your friend wins.
3. You remove 3 stones. Your friend removes the last stone. Your friend wins.
In all outcomes, your friend wins.
Example 2:
Input: n = 1
Output: true
Example 3:
Input: n = 2
Output: true
Constraints:
1 <= n <= 231 - 1
 */

/**
 * Approach:
 * 
if both players are playing optimally then , each player at any given point of time will make always an optimal move that will be sending the other 
player to a postion from where the other player will always lose
At any given point of time :
-> if n=0 i.e. if no stone is there
any player at this point of time responsible of making a move loses
-> if n=1 i.e. if 1 stone is there
any player at this point of time responsible of making a move will surely wins the game , as he will optimally Pick 1 stone , 
leaving other player no stone to pick
-> if n=2 i.e. if 2 stone is there
any player at this point of time responsible of making a move will surely wins the game, as he will optimally Pick 2 stones , 
leaving other player no stone to pick
-> if n=3 i.e. if 3 stone is there
any player at this point of time responsible of making a move will surely wins the game , as he will optimally Pick 3 stones , 
leaving other player no stone to pick
->-> if n=4 i.e. if 4 stone is there
any player at this point of time responsible of making a move will surely lose the game, as no matter how many (1,2,or,3) stones he picks optimally , 
in next turn the other player will also pick stones optimally (3,2,or 1 respectively) , leaving player no stone to pick in subsequent turn.

there every n, has a predefined winner, if both players playes optimally
from above example, we can make an 0 indexed array from observation, where index is the number of stone , 
and value at an index is where the person required to make a move at when n stone is present would win or lose
[lose, win, win, win , lose]

if we keep continuning our observation for more then 4 stone we will observe a pattern in the array generated:
[lose, win, win, win , lose, win, win, win ,lose, win, win, win ,lose.,.....]

therefore we conclude that if n%4==0 then player will lose else player will win
 */

var canWinNim = function(n) {
    return n % 4 !==0
};