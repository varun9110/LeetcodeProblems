/**
 * 2591. Distribute Money to Maximum Children
 * Difficulty : Easy
 * You are given an integer money denoting the amount of money (in dollars) that you have and another integer children denoting 
 * the number of children that you must distribute the money to.
You have to distribute the money according to the following rules:
All money must be distributed.
Everyone must receive at least 1 dollar.
Nobody receives 4 dollars.
Return the maximum number of children who may receive exactly 8 dollars if you distribute the money according to the aforementioned rules. 
If there is no way to distribute the money, return -1.
Example 1:
Input: money = 20, children = 3
Output: 1
Explanation: 
The maximum number of children with 8 dollars will be 1. One of the ways to distribute the money is:
- 8 dollars to the first child.
- 9 dollars to the second child. 
- 3 dollars to the third child.
It can be proven that no distribution exists such that number of children getting 8 dollars is greater than 1.
Example 2:
Input: money = 16, children = 2
Output: 2
Explanation: Each child can be given 8 dollars.
Constraints:
1 <= money <= 200
2 <= children <= 30
 */


/**
 * Approach
If money < children return -1.
If money > children * 8 we give every child 8 and the rest to last one, the result will be children -1.
Else give every child by 1 dolar. Give every next child by 7. Handle corner case, when after giving every possible child 
by 7 dollars we have 3 dolars left. In this case if we have only one child left, we should decrease total nuberl by 1.
 */

var distMoney = function(money, children) {
    if(money < children){
        return -1;
    }
    if(children * 8 < money){
        return children - 1
    }
    let moneyLeft = money - children;
    let childrenBy8 = Math.floor(moneyLeft/7);
    let left = moneyLeft % 7;
    
    if(left === 3 && childrenBy8 > 0 && children - childrenBy8 === 1){
        childrenBy8--;
    }
    
    
    return childrenBy8;
};