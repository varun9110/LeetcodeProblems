/**
 * 1360. Number of Days Between Two Dates
 * Difficulty: Easy
 * Write a program to count the number of days between two dates.
The two dates are given as strings, their format is YYYY-MM-DD as shown in the examples.
Example 1:
Input: date1 = "2019-06-29", date2 = "2019-06-30"
Output: 1
Example 2:
Input: date1 = "2020-01-15", date2 = "2019-12-31"
Output: 15
Constraints:

The given dates are valid dates between the years 1971 and 2100.
 */

/**
 * Approach: getTime function of the JS returns the date in milisecond format.
 * not find the milisecond format of both the days, then find one day on the milisecond, which is : 24*60*60*1000.
 * Now divide the absolute difference between the 2 days by milisecond 1 day.
 * return the answer.
 */

var daysBetweenDates = function(date1, date2) {
    const millisecondsInADay = 1000*60*60*24;    
    return Math.abs((new Date(date1).getTime() - new Date(date2).getTime()) / millisecondsInADay);
};