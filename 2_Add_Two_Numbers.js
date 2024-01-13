/**
 * 2. Add Two Numbers
 * Difficulty: Mediium
 * 
 * You are given two non-empty linked lists representing two non-negative integers. 
 * The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example 1:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]
Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

Constraints:
The number of nodes in each linked list is in the range [1, 100].
0 <= Node.val <= 9
It is guaranteed that the list represents a number that does not have leading zeros.
 */

var addTwoNumbers = function(l1, l2) {
    let num1 = "";
    let num2 = "";
    while(l1){
        num1 += l1.val;
        l1 = l1.next;
    }
    while(l2){
        num2 += l2.val;
        l2 = l2.next;
    }
    let length = Math.max(num1.length, num2.length);

    let carry =0;
    let result = "";
    for(let i=0; i<length; i++){
        let n1=0;
        if(i<num1.length){
            n1 = Number(num1[i])
        }
        let n2=0;
        if(i<num2.length){
            n2 = Number(num2[i])
        }
        let sum = n1+n2+carry;
        result += ((sum%10))
        carry= (sum>9) ? 1 : 0;
    }

    result += (carry===1) ? 1 : "";

    var List = new ListNode(0);
    var head = List;

    for(let i=0; i<result.length; i++){
        head.next = new ListNode(Number(result[i]));
        head=head.next;
    }
    return List.next;
};

/**
 * Refined code:
 * Doing everything in one loop
 */

var addTwoNumbers = function(l1, l2) {
    var List = new ListNode(0);
    var head = List;
    var sum = 0;
    var carry = 0;

    while(l1!==null||l2!==null||sum>0){

        if(l1!==null){
            sum = sum + l1.val;
            l1 = l1.next;
        }
        if(l2!==null){
            sum = sum + l2.val;
            l2 = l2.next;
        }
        if(sum>=10){
            carry = 1;
            sum = sum - 10;
        }

        head.next = new ListNode(sum);
        head = head.next;

        sum = carry;
        carry = 0;

    }

    return List.next;
};


/**
 * Using recurrsion
 * But again only one iteration
 */

var addTwoNumbers = function(l1, l2) {
    
    function recurse(l1, l2, res, carry) {
        if (l1 == null && l2 == null) return;

        var val1 = l1 == null ? 0 : l1.val;
        var val2 = l2 == null ? 0 : l2.val;

        var sum = val1 + val2 + carry;
        carry = 0;
        if (sum > 9) {
            carry = 1;
            sum -= 10;
        }
        res.val = sum;

        var n1 = l1 == null ? null : l1.next;
        var n2 = l2 == null ? null : l2.next;

        if (n1 != null || n2 != null) {
            res.next = new ListNode(0, null);
            recurse(n1, n2, res.next, carry);
        } else if (carry == 1) {
            res.next = new ListNode(1, null);
        }
    }

    var res = new ListNode(0, null);

    recurse(l1,l2, res, 0);
    
    return res;
    
    
};