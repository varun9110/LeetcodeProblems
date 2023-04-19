/**
 * 1078. Occurrences After Bigram
 * Difficulty : Easy
 * Given two strings first and second, consider occurrences in some text of the form "first second third", where second comes immediately after first, and third 
 * comes immediately after second.
Return an array of all the words third for each occurrence of "first second third".
Example 1:
Input: text = "alice is a good girl she is a good student", first = "a", second = "good"
Output: ["girl","student"]
Example 2:
Input: text = "we will we will rock you", first = "we", second = "will"
Output: ["we","rock"]

Constraints:
1 <= text.length <= 1000
text consists of lowercase English letters and spaces.
All the words in text a separated by a single space.
1 <= first.length, second.length <= 10
first and second consist of lowercase English letters.
 */

/**
 * Approach:
 * split the text on the basis of the " ". then iterate through the array and check for the condition (i should be first, and i+1 should be second and i+2 should be
 * less than the length)
 * if yes then push the i+2 to the result array
 */

var findOcurrences = function (text, first, second) {
  let arr = text.split(" ");
  let result = [];
  for (let i = 0; i < arr.length - 2; i++) {
    if (arr[i] === first && arr[i + 1] === second) {
      result.push(arr[i + 2]);
    }
  }
  console.log(result);
  return result;
};
