/**
 * 3484. Design Spreadsheet
 * Difficulty: Medium
 * 
 * A spreadsheet is a grid with 26 columns (labeled from 'A' to 'Z') and a given number of rows. Each cell in the spreadsheet can hold an integer value between 0 and 105.

Implement the Spreadsheet class:

Spreadsheet(int rows) Initializes a spreadsheet with 26 columns (labeled 'A' to 'Z') and the specified number of rows. All cells are initially set to 0.
void setCell(String cell, int value) Sets the value of the specified cell. The cell reference is provided in the format "AX" (e.g., "A1", "B10"), where the letter represents the column (from 'A' to 'Z') and the number represents a 1-indexed row.
void resetCell(String cell) Resets the specified cell to 0.
int getValue(String formula) Evaluates a formula of the form "=X+Y", where X and Y are either cell references or non-negative integers, and returns the computed sum.
Note: If getValue references a cell that has not been explicitly set using setCell, its value is considered 0.

 

Example 1:

Input:
["Spreadsheet", "getValue", "setCell", "getValue", "setCell", "getValue", "resetCell", "getValue"]
[[3], ["=5+7"], ["A1", 10], ["=A1+6"], ["B2", 15], ["=A1+B2"], ["A1"], ["=A1+B2"]]

Output:
[null, 12, null, 16, null, 25, null, 15]

Explanation

Spreadsheet spreadsheet = new Spreadsheet(3); // Initializes a spreadsheet with 3 rows and 26 columns
spreadsheet.getValue("=5+7"); // returns 12 (5+7)
spreadsheet.setCell("A1", 10); // sets A1 to 10
spreadsheet.getValue("=A1+6"); // returns 16 (10+6)
spreadsheet.setCell("B2", 15); // sets B2 to 15
spreadsheet.getValue("=A1+B2"); // returns 25 (10+15)
spreadsheet.resetCell("A1"); // resets A1 to 0
spreadsheet.getValue("=A1+B2"); // returns 15 (0+15)
 

Constraints:

1 <= rows <= 103
0 <= value <= 105
The formula is always in the format "=X+Y", where X and Y are either valid cell references or non-negative integers with values less than or equal to 105.
Each cell reference consists of a capital letter from 'A' to 'Z' followed by a row number between 1 and rows.
At most 104 calls will be made in total to setCell, resetCell, and getValue.
 */

/**
 * Explanation
We want to correctly parse the formula and distinguish between integers and cell references while maintaining efficient storage and retrieval.

A spreadsheet can be represented as a mapping from cell identifiers to integer values.

Formulas are limited to addition between two operands. Each operand can be:

Cell reference → value stored in the map.
Integer literal → parsed as integer.
Resetting a cell removes its entry from the map, which ensures that formulas referencing it treat it as 0.

Algorithm
Initialize a map cells to store cell values.

Set a cell:

cells[cell]=value
(Insert or update the cell’s value in the map.)
Reset a cell:

Remove cell from cells.
(This ensures formulas referencing this cell will treat it as 0.)
Evaluate a formula:

Split formula into left and right operands at  
′
 + 
′
 .

For each operand:

If it starts with a letter:

Retrieve its value from cells, defaulting to 0.
This is similar to checking if a key exists in a map.

Otherwise:

Parse it as an integer literal.
Return valLeft+valRight.

Time Complexity: O(1)
Space Complexity: O(N)
 */

/**
 * @param {number} rows
 */
var Spreadsheet = function(rows) {
    const cells = {};

    const setCell = (cell, value) => {
        cells[cell] = value;
    };

    const resetCell = cell => {
        delete cells[cell];
    };

    const getValue = formula => {
        const idx = formula.indexOf('+');
        const left = formula.slice(1, idx);
        const right = formula.slice(idx + 1);
        const valLeft = /[a-zA-Z]/.test(left[0]) ? (cells[left] || 0) : parseInt(left);
        const valRight = /[a-zA-Z]/.test(right[0]) ? (cells[right] || 0) : parseInt(right);
        return valLeft + valRight;
    };

    return { setCell, resetCell, getValue };
};

/** 
 * @param {string} cell 
 * @param {number} value
 * @return {void}
 */
Spreadsheet.prototype.setCell = function(cell, value) {
    
};

/** 
 * @param {string} cell
 * @return {void}
 */
Spreadsheet.prototype.resetCell = function(cell) {
    
};

/** 
 * @param {string} formula
 * @return {number}
 */
Spreadsheet.prototype.getValue = function(formula) {
    
};

/** 
 * Your Spreadsheet object will be instantiated and called as such:
 * var obj = new Spreadsheet(rows)
 * obj.setCell(cell,value)
 * obj.resetCell(cell)
 * var param_3 = obj.getValue(formula)
 */