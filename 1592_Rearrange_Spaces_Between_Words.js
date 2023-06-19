/**
 * 1592. Rearrange Spaces Between Words
 * You are given a string text of words that are placed among some number of spaces. Each word consists of one or more lowercase English letters and are 
 * separated by at least one space. It's guaranteed that text contains at least one word.
Rearrange the spaces so that there is an equal number of spaces between every pair of adjacent words and that number is maximized. If you cannot redistribute 
all the spaces equally, place the extra spaces at the end, meaning the returned string should be the same length as text.
Return the string after rearranging the spaces.
Example 1:
Input: text = "  this   is  a sentence "
Output: "this   is   a   sentence"
Explanation: There are a total of 9 spaces and 4 words. We can evenly divide the 9 spaces between the words: 9 / (4-1) = 3 spaces.
Example 2:
Input: text = " practice   makes   perfect"
Output: "practice   makes   perfect "
Explanation: There are a total of 7 spaces and 3 words. 7 / (3-1) = 3 spaces plus 1 extra space. We place this extra space at the end of the string.
Constraints:
1 <= text.length <= 100
text consists of lowercase English letters and ' '.
text contains at least one word.
 */

/**
 * Approach:
 * split the array in the " ", count the number of words.
 * now, count the number of spaces in the actual text
 * 
 * check the divior and end spaces and between spaces. if the total length of the text array is 1 then all the spaces moves to the end of the result
 * craete the loop to add the spaces and text. add the end spaces at the end
 * return the result
 * 
 */


var reorderSpaces = function(text) {
    let array = text.split(" ");
    let totalSpaces = 0;
    let textArray = [];
    for(let i =0; i<array.length; i++){
        if(array[i] !== ""){
            textArray.push(array[i])
        }
    }
    for(let i =0; i<text.length; i++){
        if(text[i] === " "){
            totalSpaces++;
        }
    }
    let divisor = textArray.length-1;
    let between = totalSpaces/divisor;
    let end  = (divisor === 0) ? totalSpaces : totalSpaces%divisor;
    let result = textArray[0];
    for(let k=1; k<textArray.length; k++){
        for(let j=1; j<=between; j++){
            result += " ";
        }
        result += textArray[k].trim();
    }
    for(let j=1; j<=end; j++){
        result += " ";
    }
    return result;
};


/**
 * Same approach but refined code 
 */

// O(n)
var reorderSpaces = function(text) {
    let spaces = 0;
    let words = 0;
    const arr = [];
    for (let w of text.split(' ')) {
        if (w === '') spaces++;
        else {
            words++;
            arr.push(w);
        }
    }
    let diff = words - 1;
    if (diff === 0) return arr[0] + ' '.repeat(spaces);
    spaces += diff;
    let div = Math.floor(spaces / diff);
    let rem = spaces % diff;
    return arr.join(' '.repeat(div)) + ' '.repeat(rem);
};