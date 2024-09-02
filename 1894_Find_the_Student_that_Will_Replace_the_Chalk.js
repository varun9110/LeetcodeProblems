/**
 * 1894. Find the Student that Will Replace the Chalk
 * Difficulty: Medium
 * 
 * There are n students in a class numbered from 0 to n - 1. The teacher will give each student a problem starting with the student number 0, 
 * then the student number 1, and so on until the teacher reaches the student number n - 1. After that, the teacher will restart the process, 
 * starting with the student number 0 again.

You are given a 0-indexed integer array chalk and an integer k. There are initially k pieces of chalk. When the student number i is given a problem to solve, 
they will use chalk[i] pieces of chalk to solve that problem. However, if the current number of chalk pieces is strictly less than chalk[i], 
then the student number i will be asked to replace the chalk.

Return the index of the student that will replace the chalk pieces.

 

Example 1:

Input: chalk = [5,1,5], k = 22
Output: 0
Explanation: The students go in turns as follows:
- Student number 0 uses 5 chalk, so k = 17.
- Student number 1 uses 1 chalk, so k = 16.
- Student number 2 uses 5 chalk, so k = 11.
- Student number 0 uses 5 chalk, so k = 6.
- Student number 1 uses 1 chalk, so k = 5.
- Student number 2 uses 5 chalk, so k = 0.
Student number 0 does not have enough chalk, so they will have to replace it.
Example 2:

Input: chalk = [3,4,1,2], k = 25
Output: 1
Explanation: The students go in turns as follows:
- Student number 0 uses 3 chalk so k = 22.
- Student number 1 uses 4 chalk so k = 18.
- Student number 2 uses 1 chalk so k = 17.
- Student number 3 uses 2 chalk so k = 15.
- Student number 0 uses 3 chalk so k = 12.
- Student number 1 uses 4 chalk so k = 8.
- Student number 2 uses 1 chalk so k = 7.
- Student number 3 uses 2 chalk so k = 5.
- Student number 0 uses 3 chalk so k = 2.
Student number 1 does not have enough chalk, so they will have to replace it.
 

Constraints:

chalk.length == n
1 <= n <= 105
1 <= chalk[i] <= 105
1 <= k <= 109
 */



/**
Intuition
To start, let's first understand what the question is really asking we have a classroom of students each with a specific chalk requirement. The teacher goes around the room and starts giving chalk to the students until they run out. Our job is to find out which student will be the one to say, "Hey, we need more chalk!"

Cyclic Nature: The teacher starts again from the first student after the last one creating a cyclic pattern which basically means we need to consider how the chalk is distributed in multiple rounds, not just one.
Chalk Consumption: Each student has a different chalk consumption rate (chalk[i]). If a student's required chalk exceeds the remaining chalk that student needs to replace the chalk which is the problem's stopping condition.
At first this can appear like a straightforward simulation problem where we could just go through the motions subtracting chalk as we go until we hit a negative number But no the constraints tell us that we could have up to 10^5 students and up to 10^9 pieces of chalk. If we tried to simulate this naively we might end up going around the classroom thousands or even millions of times before running out of chalk.

Well now since we know we're going to be repeating the same pattern of chalk distribution over and over as each time the teacher completes a round they will return to the first student and if we can calculate the total amount of chalk required for one full round then we can use this information to "skip" through the unnecessary repetitions and focus on the point where the chalk actually runs out so we will use modular arithmetic i.e If we can figure out how much chalk is used in one complete round of the classroom, we can use the modulus operator to fast-forward through most of the repetitions. Try to understand that the total amount of chalk used in one complete cycle (from student 0 to student n-1) is fixed. so if k (the total chalk available) is greater than this sum we don't need to simulate every round Instead we can reduce the problem size by considering the remainder of k after subtracting full cycles this is where modular arithmetic is important instead of simulating each student's use of chalk over multiple rounds we can calculate how much chalk remains after several full cycles, focusing only on the "partial" cycle that causes the chalk to run out.

Let's think about this with a simpler example. Say we have 3 students who need 2, 3, and 4 pieces of chalk respectively. If we start with 20 pieces of chalk, how many complete rounds can we make? We'd use 2 + 3 + 4 = 9 chalk per round so we can complete 2 full rounds (using 18 chalk) with 2 pieces left over. Those leftover 2 pieces are what we really care about as they determine where in the third round we'll run out. Let's talk about calculating the total chalk used in one round. By summing up all the values in our chalk array, we get this important information. Then, using the modulus operator with our initial chalk amount, we can immediately get to the round where we'll run out.

But remember, we're not just looking for the round where we run out we also need to know exactly which student will be the one to run out. This means we can't just do a single modulus operation and say we got the results. We need to actually simulate that final partial round. That is why lets talk about a single pass through the array to simulate the final round, we start from the first student and we go student by student and begin subtracting their chalk requirement from the remaining chalk(the result of our modulus operation). Continue this process until you find the first student whose requirement exceeds the remaining chalk. The moment we can't meet a student's requirement this student will be the one who will say, "Hey, we need more chalk!"

Now, you might be thinking why even bother with the modulus operation at all Why cant we just simulate from the beginning well We use the modulus to quickly bypass all the complete rounds, then switch to simulation for the final important round. This gives us both speed and accuracy. By using the modulus we're essentially "wrapping" our chalk distribution around the classroom it's as if we're working with a circular array where the end connects back to the beginning. This circular nature mirrors the problem description perfectly, the teacher starts over at student 0 after reaching the end.

Let's talk about some edge cases for ex if we have exactly enough chalk for a whole number of rounds In this case, our modulus operation will give us 0 and we'll return 0 (the first student) as our answer. This makes sense - if we have exactly enough chalk we'll run out just as we're about to start a new round, another case to consider is when one student uses significantly more chalk than the others for ex if we have [1, 1, 1000] as our chalk array in this case our modulus operation becomes important without it we might waste a lot of time simulating the first two students over and over before finally hitting the third, this solution also handles the case where we have a very large amount of initial chalk efficiently. Even if we start with billions of pieces of chalk, our modulus operation cuts that down to a manageable number right away.

Another thing is we willbe using long for the totla chalk sum and a doubt you might have is why we use a long for this but keep using int for the remaining chalk well this is a subtle but important point as the total sum could potentially exceed the range of an int if we have many students using a lot of chalk. But after the modulus operation we're guaranteed to have a value less than the sum which fits safely in an int.

The approach also has the advantage of being very space-efficient. We just have a few variables to keep track of our sums and remainders. This means our space complexity is O(1), which is as good as it gets and in terms of time complexity, we will be making two passes through the array once to calculate the total, and once to simulate the final round this will give us a linear time complexity of O(n), where n is the number of students. Considering that we could potentially be dealing with billions of pieces of chalk, reducing this to a linear operation is a significant optimization.

Approach
1. Recognizing the Cycle
The distribution of chalk forms a repeating cycle. If we have enough chalk for multiple complete cycles, we don't need to simulate each one individually. So we will use modular arithmetic to "fast-forward" through complete cycles.

2. Calculating Total Chalk per Cycle
By summing the chalk requirements of all students, we can find out how much chalk is needed for one complete cycle. This sum is important for our modular arithmetic approach.

3. Using Modular Arithmetic
Once we know the total chalk per cycle, we can use the modulus operator to find out how much chalk remains after all complete cycles. This remainder is what we'll focus on in our final calculation.

4. Simulating the Final (Partial) Cycle
With the remaining chalk after complete cycles, we simulate the distribution one last time to find the student who will run out.

Pseudo-code
function chalkReplacer(chalk[], initialChalk):
    totalChalkNeeded = 0
    for each studentChalk in chalk:
        totalChalkNeeded += studentChalk
    
    remainingChalk = initialChalk % totalChalkNeeded
    
    for studentIndex from 0 to length(chalk) - 1:
        if remainingChalk < chalk[studentIndex]:
            return studentIndex
        remainingChalk -= chalk[studentIndex]
    
    return 0
Step 1: Calculate Total Chalk per Cycle
totalChalkNeeded = 0
for each studentChalk in chalk:
    totalChalkNeeded += studentChalk
In this step, we sum up the chalk requirements of all students. This gives us the total amount of chalk needed for one complete cycle through all students.

Because

It allows us to treat the problem as a series of complete cycles plus a partial cycle.
We can use this sum to determine how many complete cycles we can make with the initial chalk.
If we have n students, and chalk[i] represents the chalk needed by the i-th student, then:

totalChalkNeeded = chalk[0] + chalk[1] + ... + chalk[n-1]
This sum represents one complete "revolution" of chalk distribution.

Step 2: Apply Modular Arithmetic
remainingChalk = initialChalk % totalChalkNeeded
We use the modulus operator to determine how much chalk remains after all complete cycles.

Because

If initialChalk is less than totalChalkNeeded, the result is just initialChalk.
If initialChalk is greater than totalChalkNeeded, the result tells us how much chalk is left after the last complete cycle.
Let's say initialChalk = 100 and totalChalkNeeded = 30. We can express this as:

100 = 3 * 30 + 10
This means we can complete 3 full cycles, and we're left with 10 pieces of chalk to distribute in the partial cycle. The modulus operation 100 % 30 = 10 gives us this remainder directly, allowing us to skip simulating the three complete cycles.

Step 3: Simulate the Final (Partial) Cycle
for studentIndex from 0 to length(chalk) - 1:
    if remainingChalk < chalk[studentIndex]:
        return studentIndex
    remainingChalk -= chalk[studentIndex]
Now that we've skipped all complete cycles, we simulate the distribution of the remaining chalk.

Because

We iterate through the students in order.
For each student, we check if we have enough chalk to meet their requirement.
If we don't have enough, we've found our answer: this student will need to replace the chalk.
If we do have enough, we subtract their requirement and move to the next student.
Why do we need this step?
The modulus operation tells us how much chalk is left, but not which student will run out. This final simulation is necessary to pinpoint the exact student.

Step 4: Handle Edge Cases
return 0
This final return statement handles an important edge case: when we have exactly enough chalk for a whole number of complete cycles.

Why is this necessary?

If initialChalk is a multiple of totalChalkNeeded, the modulus operation will return 0.
In this case, we've used all the chalk exactly as we finish a cycle.
The next student to need chalk (which would be the first student) is the one who will ask for more.
Complexity Analysis
Time Complexity: O(n)
We make two passes through the chalk array:
To calculate totalChalkNeeded
To simulate the final partial cycle
Each pass is O(n), where n is the number of students.
The modulus operation is O(1).
Therefore, the overall time complexity is O(n).
Even if we have billions of pieces of chalk, we only need to iterate through the students twice. The modulus operation allows us to "skip" all the complete cycles in constant time.

Space Complexity: O(1)
We only use a few variables (totalChalkNeeded, remainingChalk, studentIndex) regardless of the input size.
We don't create any data structures that grow with the input.
Therefore, the space complexity is constant, or O(1).
Handling Large Numbers
In the actual implementation, we need to be careful about integer overflow. The sum of all chalk requirements could exceed the maximum value of a 32-bit integer.

// Use a long (64-bit integer) for totalChalkNeeded
long totalChalkNeeded = 0
for each studentChalk in chalk:
    totalChalkNeeded += studentChalk

// Cast back to int after modulus operation
int remainingChalk = (int)(initialChalk % totalChalkNeeded)
Why is this necessary?

If we have many students or large chalk requirements, totalChalkNeeded could exceed 2^31 - 1 (max value for a 32-bit int).
Using a 64-bit integer (long) for this calculation prevents overflow.
After the modulus operation, the result is guaranteed to be less than totalChalkNeeded, so it's safe to cast back to an int.
*/



/**
 * @param {number[]} chalk
 * @param {number} initialChalkPieces
 * @return {number}
 */
var chalkReplacer = function(chalk, initialChalkPieces) {
    let totalChalkNeeded = chalk.reduce((sum, studentChalkUse) => sum + studentChalkUse, 0);
    let remainingChalk = initialChalkPieces % totalChalkNeeded;
    
    for (let studentIndex = 0; studentIndex < chalk.length; studentIndex++) {
        if (remainingChalk < chalk[studentIndex]) {
            return studentIndex;
        }
        remainingChalk -= chalk[studentIndex];
    }
    
    return 0;
};