/**
 * 1154. Day of the Year
 * Difficulty: EAsy
 * 
 * Given a string date representing a Gregorian calendar date formatted as YYYY-MM-DD, return the day number of the year.

Example 1:

Input: date = "2019-01-09"
Output: 9
Explanation: Given date is the 9th day of the year in 2019.
Example 2:

Input: date = "2019-02-10"
Output: 41
 

Constraints:

date.length == 10
date[4] == date[7] == '-', and all other date[i]'s are digits
date represents a calendar date between Jan 1st, 1900 and Dec 31st, 2019.
 */

/**
 * @param {string} date
 * @return {number}
 */
var dayOfYear = function(date) {

    const newDate = new Date(date); 
    const yearStart = new Date(newDate.getFullYear(), 0, 0);
    const oneDay = 1000 * 60 * 60 * 24;

    const nrDays = Math.floor( (newDate - yearStart) / oneDay);

    return nrDays;    
};