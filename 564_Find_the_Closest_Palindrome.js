/**
 * 564. Find the Closest Palindrome
 * Difficulty: Hard
 * 
 * Given a string n representing an integer, return the closest integer (not including itself), which is a palindrome. If there is a tie, return the smaller one.
The closest is defined as the absolute difference minimized between two integers.

Example 1:
Input: n = "123"
Output: "121"

Example 2:
Input: n = "1"
Output: "0"
Explanation: 0 and 2 are the closest palindromes but we return the smallest which is 0.
 
Constraints:

1 <= n.length <= 18
n consists of only digits.
n does not have leading zeros.
n is representing an integer in the range [1, 1018 - 1].
 */

/**
 * Intuition
First, we need to understand what the problem is asking. Lets say we are Given a string representation of a number, 
we're asked to find the closest palindrome to that number, excluding the number itself. If there's a tie (two palindromes equally close), 
we should return the smaller one. The "closest" is defined by the smallest absolute difference between the given number and the palindrome.

The constraints are very important to consider:
1. The input string length is between 1 and 18 characters.
2. The input consists only of digits.
3. There are no leading zeros.
4. The number represented is between 1 and 10 
18
  - 1

By just looking at these constraints we can tell that we're dealing with potentially very large numbers, which also explains why the input is given as a string. 
We'll use long integers in our calculations since we need to be careful about integer overflow.

Now, let's think about palindromes. What makes a number a palindrome? It reads the same forwards and backwards. For example, 12321 is a palindrome. 
This structure tell us that we can focus on the left half of the number (which we'll call the "palindrome root") and use it to generate the full palindrome.

for a palindrome like 12321, the next larger palindrome is 12421, and the next smaller is 12221. This pattern holds for both odd and even-length palindromes. 
This means that we can generate candidate palindromes by using left half of the number

My First approach had some limitations it was failing a lot of edge cases. It was handling several special cases separately, which made my code more complex plus 
It also wasn't considering all possible nearest palindromes in some cases for ex consider that we're dealing with numbers up to 18 digits long. 
That's a range from 1 to 999,999,999,999,999,999! We can't simply generate all palindromes and check which one is closest. That would take far too long. 
We need to be think about this. So in this approach, I'll consider five candidate palindromes:

The palindrome formed by the left half of the number as is.
The palindrome formed by decrementing the left half of the number.
The palindrome formed by incrementing the left half of the number.
The number with all 9's that has one digit less than the input.
The number with all 0's and 1's at the ends that has one digit more than the input.
Why these five candidates? Let's think about it:

1-3: These cover the cases where the nearest palindrome is close to the original number. By considering the current left half and its incremented and decremented versions,
 we cover a range of nearby palindromes. So in simple terms the closest palindrome is likely to be very near our original number. By considering these three options, 
 we're exploring the immediate neighborhood of our number in the world of palindromes.

4: This covers cases where the nearest palindrome might be a "9" palindrome just below our number. For example, if our number is 1000, the nearest smaller palindrome is 999.

5: This covers cases where the nearest palindrome might be just above our number with an additional digit. For example, if our number is 999, 
the nearest larger palindrome is 1001.

These cases (4 and 5) occur when we're near a "boundary" where the number of digits changes. To handle these, we need to consider two more special cases:

The number with all 9's that has one digit less than our original number
The number with all 0's (and 1's at the ends) that has one more digit than our original number

Since we are considering these five candidates, we are making sure that we don't miss any potential nearest palindromes, regardless of what the input number's structure is.

Another thing to note here is that we can generate palindromes by manipulating just the left half of the number. 
This is because the right half is always a mirror of the left half (with a possible middle digit for odd-length palindromes).

Now we need to generate these palindromes, compare them to find the closest one, and handle all the edge cases correctly. 
We need to be careful about numbers at the boundaries (like 1, 10, 11, etc.) and make sure our solution works for all possible inputs within the given constraints. 
This approach is better because it works for any number in our range, whether it's small like 11 or massive like 999,999,999,999,999,999. 
We're not generating all palindromes; we're smartly picking just a few candidates that are most likely to be the answer.

Approach
1. Handle special cases for small numbers:

if number <= 10:
    return string(number - 1)
if number == 11:
    return "9"
If the number is 1-10, the closest palindrome is always the previous number. For example, for 6, it's 5; for 10, it's 9.
If the number is 11, the closest palindrome is 9.
We handle these separately because they don't follow the general pattern we'll use for larger numbers.

2. Calculate the length of the input number and extract the left half:

length = length(numberStr)
leftHalf = parse_long(numberStr.substring(0, (length + 1) / 2))
For our main algorithm, we start by extracting the left half of our number. If the number has an odd number of digits, we include the middle digit in this left half.

For example:

For "12345", the left half would be "123"
For "1234", the left half would be "12"
We use (length + 1) / 2 to handle both odd and even length numbers correctly.

3. Generate the five candidate palindromes:

 candidates = new array of size 5
 candidates[0] = generatePalindrome(leftHalf, length % 2 == 0)
 candidates[1] = generatePalindrome(leftHalf - 1, length % 2 == 0)
 candidates[2] = generatePalindrome(leftHalf + 1, length % 2 == 0)
 candidates[3] = 10^(length - 1) - 1
 candidates[4] = 10^length + 1
The palindrome formed by the left half as is
The palindrome formed by decrementing the left half
The palindrome formed by incrementing the left half
The number with all 9's that has one digit less than our input
The number with 1 followed by 0's and ending with 1, with one more digit than our input
To generate palindromes from the left half, we use a helper function. This function takes the left half, creates a palindrome from it, 
and handles both odd and even-length numbers correctly.
The generatePalindrome function (which we'll define later) creates a palindrome from the left half.

4. Find the nearest palindrome:

nearestPalindrome = 0
minDifference = MAX_LONG_VALUE
for each candidate in candidates:
    if candidate == number:
        continue
    difference = abs(candidate - number)
    if difference < minDifference OR (difference == minDifference AND candidate < nearestPalindrome):
        minDifference = difference
        nearestPalindrome = candidate
Once we have our candidates, we compare each of them to our original number. We're looking for the one with the smallest absolute difference from our original number.
If two palindromes have the same difference, we choose the smaller one, as per the problem requirements.

5. Return the result:

return string(nearestPalindrome)
Now, let's define the generatePalindrome function:

function generatePalindrome(leftHalf, isEvenLength):
    palindrome = leftHalf
    if not isEvenLength:
        leftHalf = leftHalf / 10
//mirror the remaining digits to create the right half
    while leftHalf > 0:
        palindrome = palindrome * 10 + leftHalf % 10
        leftHalf = leftHalf / 10
    return palindrome
This function works as follows:

It starts with the left half of the palindrome.

If the length is odd, it removes the last digit of the left half (which will be the middle digit of the palindrome).

while leftHalf > 0:
palindrome = palindrome * 10 + leftHalf % 10
leftHalf = leftHalf / 10

It then mirrors the remaining digits to create the right half of the palindrome.

leftHalf % 10: This extracts the last digit of leftHalf.
palindrome * 10 + leftHalf % 10: We’re shifting the current digits in palindrome to the left This mirrors the digit to the other side of the palindrome.
leftHalf = leftHalf / 10: This removes the last digit from leftHalf, preparing it for the next iteration.
This process repeats until all digits of leftHalf have been mirrored. The result is a full palindrome formed by reflecting leftHalf
The key to this approach is considering all possible nearest palindromes efficiently. By generating just five candidates, we cover all cases:

The palindrome formed by decrementing the left half covers cases where the nearest palindrome is slightly smaller.
The palindrome formed by the left half as-is covers cases where the nearest palindrome is very close to the original number.
The palindrome formed by incrementing the left half covers cases where the nearest palindrome is slightly larger.
The all-9s number with one less digit covers cases like 1000, where 999 is the nearest palindrome.
The number with 1 and trailing 0s with one more digit covers cases like 999, where 1001 is the nearest palindrome.
It works for both odd and even length numbers and correctly handles edge cases at the boundaries of the input range.

Complexity
Time complexity: O(1)
Well TBH its O(log n) where n is the input number. This is because we're primarily working with the digits of the number, and the number of digits is 
logarithmic in the value of the number. The generatePalindrome function runs in O(log n) time, and we call it a constant number of times.

Space complexity: O(1).
We're using a constant amount of extra space (the candidates array is always size 5), but we need O(log n) space to store the string representation of 
the number and the result.

In a general context (without these input constraints), both the TC and SC would be O(log n), But here Problem's constraints create an effective "ceiling" on 
the input size So dont get confused when the leetcode engine show it as O(1).
 */

/**
 * @param {string} numberStr
 * @return {string}
 */
var nearestPalindromic = function(numberStr) {
    let number = BigInt(numberStr);
    if (number <= 10n) return (number - 1n).toString();
    if (number === 11n) return "9";

    let length = numberStr.length;
    let leftHalf = BigInt(numberStr.slice(0, (length + 1) / 2));
    
    let palindromeCandidates = [
        generatePalindromeFromLeft(leftHalf - 1n, length % 2 === 0),
        generatePalindromeFromLeft(leftHalf, length % 2 === 0),
        generatePalindromeFromLeft(leftHalf + 1n, length % 2 === 0),
        BigInt(10n ** BigInt(length - 1)) - 1n,
        BigInt(10n ** BigInt(length)) + 1n
    ];

    let nearestPalindrome = 0n;
    let minDifference = BigInt(Number.MAX_SAFE_INTEGER);

    for (let candidate of palindromeCandidates) {
        if (candidate === number) continue;
        let difference = candidate > number ? candidate - number : number - candidate;
        if (difference < minDifference || (difference === minDifference && candidate < nearestPalindrome)) {
            minDifference = difference;
            nearestPalindrome = candidate;
        }
    }

    return nearestPalindrome.toString();
};

function generatePalindromeFromLeft(leftHalf, isEvenLength) {
    let palindrome = leftHalf;
    if (!isEvenLength) leftHalf = leftHalf / 10n;
    while (leftHalf > 0n) {
        palindrome = palindrome * 10n + leftHalf % 10n;
        leftHalf = leftHalf / 10n;
    }
    return palindrome;
}