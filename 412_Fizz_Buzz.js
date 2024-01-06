/**
 * 412. Fizz Buzz
 * Difficulty: Easy
 * 
 * Given an integer n, return a string array answer (1-indexed) where:
answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
answer[i] == "Fizz" if i is divisible by 3.
answer[i] == "Buzz" if i is divisible by 5.
answer[i] == i (as a string) if none of the above conditions are true.
Example 1:
Input: n = 3
Output: ["1","2","Fizz"]
Example 2:
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
Example 3:
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]

Constraints:
1 <= n <= 104
 */

var fizzBuzz = function(n) {
    let arr = new Array(n).fill(0);
    arr.map((n,i) => {
        let a = i+1;
        if(a%3===0 && a%5===0){
            return arr[i] = "FizzBuzz";
        } else if (a%3===0) {
            return arr[i] = "Fizz";
        } else if (a%5===0){
            return arr[i] = "Buzz";
        } else {
            return arr[i] = ""+a
        }
    })

    return arr;
};

/**
 Little refined approach.
 Done in 2 conditions
 */

var fizzBuzz = function(n) {
    const result = []
    for(let i=1; i<=n; i++){
         let elementString = ''
        if(i%3 === 0 ){
            elementString = 'Fizz'
        }
        if(i%5 === 0){
            elementString = `${elementString}Buzz`
        }
        if(elementString === ''){
            elementString = `${i}`
        }
        result.push(elementString)
    }
    return result
};