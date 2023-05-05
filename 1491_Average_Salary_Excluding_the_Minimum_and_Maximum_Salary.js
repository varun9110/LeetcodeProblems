/**
 * 1491. Average Salary Excluding the Minimum and Maximum Salary
 * Difficulty: Easy
 * You are given an array of unique integers salary where salary[i] is the salary of the ith employee.
Return the average salary of employees excluding the minimum and maximum salary. Answers within 10-5 of the actual answer will be accepted.
Example 1:
Input: salary = [4000,3000,1000,2000]
Output: 2500.00000
Explanation: Minimum salary and maximum salary are 1000 and 4000 respectively.
Average salary excluding minimum and maximum salary is (2000+3000) / 2 = 2500
Example 2:
Input: salary = [1000,2000,3000]
Output: 2000.00000
Explanation: Minimum salary and maximum salary are 1000 and 3000 respectively.
Average salary excluding minimum and maximum salary is (2000) / 1 = 2000

Constraints:
3 <= salary.length <= 100
1000 <= salary[i] <= 106
All the integers of salary are unique.
*/

/**
 * Approach:
 * make 3 variables for min, max and sum and store the 0th index value thre. loop from 1 till the end of the array.
 * Keep checking for Min Max and adding the value to the sum.
 * At the end subtract Min and Max from the Sum and divide by length-2 to find the average
 */

var average = function (salary) {
  let min = (max = sum = salary[0]);
  for (let i = 1; i < salary.length; i++) {
    min = Math.min(salary[i], min);
    max = Math.max(salary[i], max);
    sum += salary[i];
  }
  return (sum - min - max) / (salary.length - 2);
};
