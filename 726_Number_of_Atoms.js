/**
 * 726. Number of Atoms
 * Difficulty: Hard
 * 
 * Given a string formula representing a chemical formula, return the count of each atom.

The atomic element always starts with an uppercase character, then zero or more lowercase letters, representing the name.

One or more digits representing that element's count may follow if the count is greater than 1. If the count is 1, no digits will follow.

For example, "H2O" and "H2O2" are possible, but "H1O2" is impossible.
Two formulas are concatenated together to produce another formula.

For example, "H2O2He3Mg4" is also a formula.
A formula placed in parentheses, and a count (optionally added) is also a formula.

For example, "(H2O2)" and "(H2O2)3" are formulas.
Return the count of all elements as a string in the following form: the first name (in sorted order), followed by its count (if that count is more than 1), 
followed by the second name (in sorted order), followed by its count (if that count is more than 1), and so on.

The test cases are generated so that all the values in the output fit in a 32-bit integer.


Example 1:
Input: formula = "H2O"
Output: "H2O"
Explanation: The count of elements are {'H': 2, 'O': 1}.
Example 2:
Input: formula = "Mg(OH)2"
Output: "H2MgO2"
Explanation: The count of elements are {'H': 2, 'Mg': 1, 'O': 2}.
Example 3:
Input: formula = "K4(ON(SO3)2)2"
Output: "K4N2O14S4"
Explanation: The count of elements are {'K': 4, 'N': 2, 'O': 14, 'S': 4}.

Constraints:
1 <= formula.length <= 1000
formula consists of English letters, digits, '(', and ')'.
formula is always valid.
 */

/**
 * Intuition
This problem just blew my mind. At first glance it seems like an easy task, but when you think about implementation...

First of all, when problem asks you to process some string which contains brackets it's already a good tip for using stack.
But what we want to store in stack? Since in one pair of brackets we can have multiple elements and since we want to somehow efficiently count them and multiply counters if we find multiplier after bracket it's a good choice to store every "pair of bracket" in stack as a hashmap (dictionary) where key is element's name and value is its counter for current bracket.
Let's think about how we want to process characters in the formula:
First of all, as long as character we're considering now is not "(" or ")" we understand that we're looking at normal formula without brackets, so we will jave only letters and numbers. But where we want to add this counters? If are currently not in bracket then we want to add this counter to final result, in the other case we want to add this counter to the LAST pair of brackets we founded (this is idea behind using stack)
If we found "(" all we want to do is to add new element in the stack -> just append empty hashmap to the stack.
If we found ")" we know for sure that we have at least one element in stack. We want to parse multiplier for this bracket if it exists and then add counter multiplied by multiplier to the:
Result hashmap if there's no more elements in stack (this was one-level nesting and we ended up in normal formula without brackets)
Hashmap in stack that was before this, since that means that this pair of brackets was nested in some other pair
After we counted all elements in result hashmap we want to sort them and create string as required in problem statement
👩🏻‍💻 Coding
Initialize result_counter as an empty dictionary to store the counts of each element.

Initialize parenthesis_stack as an empty list to store dictionaries for counts of elements inside parentheses.

Initialize cur_ind to 0 to serve as the current index while iterating through the formula.

Start a while loop that runs until cur_ind is less than n.

If cur_char is an opening parenthesis (:

Increment cur_ind by 1.
Append an empty dictionary to parenthesis_stack.
If cur_char is a closing parenthesis ):

Initialize mult as an empty string to store the multiplier.
Increment cur_ind by 1.
While the current character is a digit, append it to mult and increment cur_ind.
Pop the last dictionary from parenthesis_stack into last_counter.
Set target to the last dictionary in parenthesis_stack if it exists, otherwise set it to result_counter.
For each element and count in last_counter, add the count multiplied by mult (or 1 if mult is empty) to the corresponding count in target.
If cur_char is not any of brackets:

Initialize cur_elem as an empty string to store the current element.
Initialize cur_counter as an empty string to store the current element's count.
Set target to the last dictionary in parenthesis_stack if it exists, otherwise set it to result_counter.
While the current character is not a parenthesis and the index is within bounds:
If the character is an alphabet:
If the character is uppercase and cur_elem is not empty, add cur_elem to target with its count.
Reset cur_counter and cur_elem.
Append the character to cur_elem.
Otherwise, append the character to cur_counter.
Increment cur_ind by 1 and update cur_char.
Add the last element and its count to target.
Construct the output by joining element names and their counts (if greater than 1) sorted by element names.

Return the resulting string.

📘 Complexity Analysis
⏰ Time complexity: O(n^2), since at the end we use sorting (n log n), but in the loop we constantly readding characters from hashmap to hashmap and in the worst case we will do this n // 2 times with every hashmap containing up to n - (number of brackets so in total this result in O(n^2) TC
🧺 Space complexity: O(n), since stack will have size up to n // 2 -> O(n)
 */


var countOfAtoms = function(formula) {
    const n = formula.length;
    const resultCounter = {};
    const parenthesisStack = [];
    let curInd = 0;

    while (curInd < n) {
        let curChar = formula[curInd];

        if (curChar === '(') {
            curInd++;
            parenthesisStack.push({});
            continue;
        }

        if (curChar === ')') {
            let multStr = '';
            curInd++;

            while (curInd < n && isDigit(formula[curInd])) {
                multStr += formula[curInd];
                curInd++;
            }

            const mult = multStr === '' ? 1 : parseInt(multStr, 10);
            const lastCounter = parenthesisStack.pop();
            const target = parenthesisStack.length === 0 ? resultCounter : parenthesisStack[parenthesisStack.length - 1];
            
            for (const [elem, counter] of Object.entries(lastCounter)) {
                if (!(elem in target)) {
                    target[elem] = 0;
                }
                target[elem] += counter * mult;
            }
            continue;
        }

        let curElem = '';
        let curCounterStr = '';
        let target = parenthesisStack.length === 0 ? resultCounter : parenthesisStack[parenthesisStack.length - 1];

        while (curInd < n && formula[curInd] !== '(' && formula[curInd] !== ')') {
            if (isAlpha(formula[curInd])) {
                if (isUpper(formula[curInd]) && curElem !== '') {
                    if (!(curElem in target)) {
                        target[curElem] = 0;
                    }
                    target[curElem] += curCounterStr === '' ? 1 : parseInt(curCounterStr, 10);
                    curElem = '';
                    curCounterStr = '';
                }
                curElem += formula[curInd];
            } else {
                curCounterStr += formula[curInd];
            }
            curInd++;
        }

        if (!(curElem in target)) {
            target[curElem] = 0;
        }
        target[curElem] += curCounterStr === '' ? 1 : parseInt(curCounterStr, 10);
    }

    const parts = [];
    for (const [elem, counter] of Object.entries(resultCounter)) {
        parts.push(elem + (counter === 1 ? '' : counter));
    }
    parts.sort();

    return parts.join('');
};

function isDigit(char) {
    return char >= '0' && char <= '9';
}

function isAlpha(char) {
    return char.toLowerCase() !== char.toUpperCase();
}

function isUpper(char) {
    return char === char.toUpperCase();
}