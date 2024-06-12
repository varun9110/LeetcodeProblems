/**
 * 75. Sort Colors
 * Difficulty: Medium
 * 
 * Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, 
 * with the colors in the order red, white, and blue.
We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
You must solve this problem without using the library's sort function.

Example 1:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Example 2:
Input: nums = [2,0,1]
Output: [0,1,2]

Constraints:
n == nums.length
1 <= n <= 300
nums[i] is either 0, 1, or 2.
 

Follow up: Could you come up with a one-pass algorithm using only constant extra space?
 */

/**
 * 
 Use quick sort to do the sorting
 */

var sortColors = function(nums) {
    // Function to partition the array and return the partition index
    const partition = (arr, low, high) => {
        // Choosing the pivot
        let pivot = arr[high];
    
        // Index of smaller element and indicates the right position of pivot found so far
        let i = low - 1;
    
        for (let j = low; j <= high - 1; j++) {
            // If current element is smaller than the pivot
            if (arr[j] < pivot) {
                // Increment index of smaller element
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
            }
        }
    
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot to its correct position
        return i + 1; // Return the partition index
    }

    // The main function that implements QuickSort
    const quickSort = (arr, low, high) => {
        if (low < high) {
            // pi is the partitioning index, arr[pi] is now at the right place
            let pi = partition(arr, low, high);
    
            // Separately sort elements before partition and after partition
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
            return arr;
        }
    }

    quickSort(nums, 0 , nums.length-1)
    console.log(nums)
};



/**
 * create a constant till the isSorted.
 * Keep iterating till the isSorted is false. in this outer loop keep it as true.
 * Now, nested loop to iterate through the loop to check if any of the ith value is greater than i+1. if yes then swap and isSorted becomes false.
 * I
 */

var sortColors = function(nums) {
    let isSorted = false;
    while(!isSorted){
        isSorted = true;
        for(let i=0; i<nums.length-1; i++){
            if(nums[i] > nums[i+1]){
                isSorted = false;
                [nums[i], nums[i+1]] = [nums[i+1], nums[i]]
            }
        }
    }
}