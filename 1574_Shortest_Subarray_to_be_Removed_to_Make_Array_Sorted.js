/*
1574. Shortest Subarray to be Removed to Make Array Sorted
Difficulty: Medium

Given an integer array arr, remove a subarray (can be empty) from arr such that the remaining elements in arr are non-decreasing.
Return the length of the shortest subarray to remove.
A subarray is a contiguous subsequence of the array.

 

Example 1:
Input: arr = [1,2,3,10,4,2,3,5]
Output: 3
Explanation: The shortest subarray we can remove is [10,4,2] of length 3. The remaining elements after that will be [1,2,3,3,5] which are sorted.
Another correct solution is to remove the subarray [3,10,4].

Example 2:
Input: arr = [5,4,3,2,1]
Output: 4
Explanation: Since the array is strictly decreasing, we can only keep a single element. Therefore we need to remove a subarray of length 4, either [5,4,3,2] or [4,3,2,1].

Example 3:
Input: arr = [1,2,3]
Output: 0
Explanation: The array is already non-decreasing. We do not need to remove any elements.
 
Constraints:
1 <= arr.length <= 105
*/

/*
Approach: First check from left to right when the left+1 is greater than left. if no one then array is in ascending order and return 0.
if not then check the ascending sequnce from right to left, that is right should be greater than right -1

this way the number between left and right needs to be removed (lets call this as "shortestRemoval" ) but there could be that array[left] > array[right]

to check this case. loop from i=0 to <=left and j=right to <= array.length
if number of the right is smaller then simply j++. or else if number of the left is smaller then check the smaller of the difference between j and i and the shortestRemoval and then i++

after this we will get our required sequence
*/


const findLengthOfShortestSubarray = (arr) => {
    const n = arr.length;
    let left = 0, right = n - 1;
    
    while (left+1 < n && arr[left] <= arr[left+1]) left++;       //longest increasing sequence from beginning going left to right
    if (left === n-1) return 0;
    while (right > left && arr[right-1] <= arr[right]) right--;  //longest decreasing sequence from end going right to left
    let shortestRemoval = Math.min(n - 1 - left, right);         //comparing removals for either of the two cases above as a baseline
    
    let i = 0, j = right;
    while (i <= left && j < n) {    //Find another possible removal sequence with beginning located between 0 and left, end located between j and right by incrementing i to shrink the removal sequence or incrementing j when arr[i] exceeds arr[j]
        if (arr[j] >= arr[i]){      //the right boundary is still connectable to the left boundary, update sequence length because a new minimum has potentially been found and move left boundary over to shrink sequence length and continue testing
            shortestRemoval = Math.min(shortestRemoval, j - i - 1);
            i++;
        } else {        //the connection requirement of arr[j] >= arr[i] is no longer fulfilled, increment j (which lengthens the removal sequence) and continue testing for possible shorter sequences from adjusting i
            j++;
        }
    }
    return shortestRemoval;
};