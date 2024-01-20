/**
 * 907. Sum of Subarray Minimums
 * Difficulty: Medium
 * 
 * Given an array of integers arr, find the sum of min(b), where b ranges over every (contiguous) subarray of arr. 
 * Since the answer may be large, return the answer modulo 109 + 7.

Example 1:
Input: arr = [3,1,2,4]
Output: 17
Explanation: 
Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
Sum is 17.
Example 2:
Input: arr = [11,81,94,43,3]
Output: 444
Constraints:
1 <= arr.length <= 3 * 104
1 <= arr[i] <= 3 * 104
 */

/**
 * Approach:
 * Brute force - use tripple nested loop. complexity will be O(n^3)
 */

var sumSubarrayMins = function(arr) {
    let sum = 0;
    count= 1;
    while(count<=arr.length){
        console.log("count : ", count);
        for(let i=0; i<arr.length-count+1; i++){
            console.log("i loop : ", i);
            let min = arr[i];
            for(let j=0; j<count; j++){
                console.log("j loop : ", j);
                console.log("number at i+j", arr[i+j]);
                min = Math.min(min, arr[i+j]);
            }
            sum += min;
        }
        count++;        
    }
    return sum;    
};

/**
 * Refined appraoch
 * https://leetcode.com/problems/sum-of-subarray-minimums/solutions/2118729/very-detailed-stack-explanation-o-n-images-comments/?envType=daily-question&envId=2024-01-20
 * 
 * 
 * Skip to Intuition if you understand the theory behind stacks and monotonic stacks.
Upvote if you found the solution helpful.

Theory
Stack
A stack is an abstract data structure that serves as a collection/grouping/list of data items with shared significance. 
A stack supports the following operations:
• Push, which adds a data item/element to the top of the stack
• Pop, which removes a data item/element from the top of a stack
• Peek, which allows access to the element on top of the stack without mutating the stack.

Items in a stack must be removed in a “Last in, first out” order. Consider the stack of books below, 
an attempt to remove the labelled book would leave the stack crashing down (unless you have god-level Jenga skills 😉).

image

Monotonic stack
A function is said to be monotonic if it preserves a given order. A monotonically increasing function never decreases. 
Likewise, a monotonically decreasing function never increases.
Similarly, a monotonic stack contains elements that preserve a given order. A monotone increasing stack contains elements that never decrease. 
Likewise, a monotone decreasing stack contains elements that never increase.

[1,1,1,2,3,4,5,6,7,8,8,9,9,9,10] Monotone Increasing stack

[10,10,9,8,7,6,5,4,4,3,2,1,1,1] Monotone Decreasing stack

Intuition
image

Consider index 4 with a value of 2. To obtain a contiguous subarray containing element 2, a subarray must be selected from the left, 
middle, and right subarrays. The concatenated subarrays give a contiguous subarray containing element 2.

image

Mathematically the total number of subarrays containing 2 can be obtained as follows:
Let L = total number of left subarrays = 5
Let M = total number of middle subarrays = 1
Let R = total number of right subarrays = 5
N = Total number of subarrays containing element in middle subarray
N = L * M * R = 5 * 1 * 5 = 25

If we want to obtain subarrays with 2 as the minimum element the options to the left and right reduce as follows.image

If we start from index 4 (with a value 2) and travel to the left of the array, the first index with a value less than 2 can 
be used to calculate the total number of viable left subarrays.

image

Likewise, we can calculate the number of viable right subarrays by travelling to the right of index 4 (element 2)

image

N = The total number of subarrays with 2 as the minimum = L * 1 * R = 4 * 1 * 4 = 16

We can obtain the indices i1 and i2 for every given index i in O(n) time using a monotonic stack.

Maintaining a monotone increasing stack
To maintain a monotone increasing stack, we check if the value of the current index in the array is less than the top of the stack. While true, we continue to pop the top of the stack until we can push the current value.

while len(stack) and array[i] < array[stack[-1]]:
	stack.pop()
stack.append(i)
Note*

The first lesser value to the right of any index is the value that pops it off the stack. (i2)
The first lesser value to the left of any index is the first value to the left of that index in the stack. (i1)
If we have the following array [1,2,3,4,5,6,7] we would never enter the while loop. A sentinel value less than every element 
in the array is pushed to the top of the array to ensure that we pop every element off the stack. Therefore, obtaining i1 and i2 for every 
index i in the array.

Suppose we traverse the array up until index 2 (value 4)
image
image

Suppose we maintain a monotone increasing stack until we reach the following state
image

The value 1 at index 8 is about to pop value 2 at index 4 off the stack.
Reference index i = 4 = stack.pop( )
i1 = Stack[-1] = 0
i2 = 8
L = i – i1 = 4 – 0 = 4
R = i2 – i = 8 – 4 = 4
N = 4 * 4 = 16

Using the above logic, we can calculate to number of times every index in the array was a minimum value in a subarray. 
Therefore, we can find the sum of all subarray minimums.
 */

var sumSubarrayMins = function(arr) {
    
    M = 10**9+7
    stack = [-1]
    res = 0
    arr.push(0)
    
    for(let i2 = 0; i2 < arr.length; i2++){
        while(arr[i2] < arr[stack[stack.length -1]]){
            i = stack.pop()
            i1 = stack[stack.length-1]
            Left = i - i1
            Right = i2 -i
            res += (Left*Right*arr[i])
        };
        stack.push(i2)
    };
    
    return res%M
};