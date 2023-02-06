/*
1122. Relative Sort Array
Difficulty : Easy

Given two arrays arr1 and arr2, the elements of arr2 are distinct, and all elements in arr2 are also in arr1.
Sort the elements of arr1 such that the relative ordering of items in arr1 are the same as in arr2. Elements that do not appear in arr2 should be placed at the end of arr1 in ascending order.

 

Example 1:
Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
Output: [2,2,2,1,4,3,3,9,6,7,19]

Example 2:
Input: arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]
Output: [22,28,8,6,17,44]
 

Constraints:
1 <= arr1.length, arr2.length <= 1000
0 <= arr1[i], arr2[i] <= 1000
All the elements of arr2 are distinct.
Each arr2[i] is in arr1.

*/

/*
Approach:
Craete a mapper that iterates all the values of the arr1 and store hwo many of then are present there
Then for loop to go through the arr2 and keep adding that number of value from the mapper to the result array, at the end delete that property from the mapper
now for the remaining values, do Object.keys and get the keys and sort them and then iterate them map them to the mapper and keep adding those values again and
keep deleteing the property from the mapper

finally return the result array
*/

var relativeSortArray = function(arr1, arr2) {
    let mapper = {};
    for(let i=0; i<arr1.length; i++){
        mapper[arr1[i]] = (mapper[arr1[i]]) ? mapper[arr1[i]]+1 : 1;
    }
    let result = [];
    for(let j=0; j<arr2.length; j++){
        while(mapper[arr2[j]] > 0){
            result.push(arr2[j]);
            mapper[arr2[j]] -= 1;
        }
        delete mapper[arr2[j]];
    }
    let remainingNumbers = Object.keys(mapper);
    remainingNumbers.sort((a, b) => a - b);
    for(let k=0; k<remainingNumbers.length; k++){
        while(mapper[remainingNumbers[k]] > 0){
            result.push(remainingNumbers[k]);
            mapper[remainingNumbers[k]] -= 1;
        }
        delete mapper[remainingNumbers[k]];
    }
    return result;
};