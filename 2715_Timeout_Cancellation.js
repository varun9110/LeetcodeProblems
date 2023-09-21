/**
 * 2715. Timeout Cancellation
 * Difficulty: Easy
 * Given a function fn, an array of arguments args, and a timeout t in milliseconds, return a cancel function cancelFn.
After a delay of t, fn should be called with args passed as parameters unless cancelFn was invoked before the delay of t milliseconds elapses, 
specifically at cancelT ms. In that case, fn should never be called.

Example 1:
Input: fn = (x) => x * 5, args = [2], t = 20, cancelT = 50
Output: [{"time": 20, "returned": 10}]
Explanation: 

const result = []
const fn = (x) => x * 5
const start = performance.now() 
const log = (...argsArr) => {
    const diff = Math.floor(performance.now() - start);
    result.push({"time": diff, "returned": fn(...argsArr)})
}
const cancel = cancellable(log, [2], 20);
const maxT = Math.max(t, 50)
setTimeout(cancel, cancelT)
setTimeout(() => {
     console.log(result) // [{"time":20,"returned":10}]
}, 65)

The cancellation was scheduled to occur after a delay of cancelT (50ms), which happened after the execution of fn(2) at 20ms.
Example 2:
Input: fn = (x) => x**2, args = [2], t = 100, cancelT = 50 
Output: []
Explanation: The cancellation was scheduled to occur after a delay of cancelT (50ms), which happened before the execution of fn(2) at 100ms, resulting in fn(2) never being called.
Example 3:
Input: fn = (x1, x2) => x1 * x2, args = [2,4], t = 30, cancelT = 100
Output: [{"time": 30, "returned": 8}]
Explanation: The cancellation was scheduled to occur after a delay of cancelT (100ms), which happened after the execution of fn(2,4) at 30ms.

Constraints:
fn is a function
args is a valid JSON array
1 <= args.length <= 10
20 <= t <= 1000
10 <= cancelT <= 1000
 */

/**
 * Approach
The code defines a function named "cancellable" that takes three parameters: "fn" (a function), "args" (an array of arguments), and "t" 
(a time delay in milliseconds).
Inside the "cancellable" function, a nested function named "cancelFn" is defined. This function is responsible for canceling the execution 
of the scheduled function.
The "cancelFn" function calls clearTimeout with the timer identifier to cancel the scheduled function execution.
The setTimeout function is used to schedule the execution of a function, which is passed as the first parameter, after the specified time delay (t).
The setTimeout function returns a timer identifier, which is stored in the "timer" variable.
The scheduled function (fn) is executed using the spread operator (...args) to pass the arguments array to the function.
Finally, the "cancelFn" function is returned from the "cancellable" function, allowing you to call it later to cancel the scheduled function if needed.
 */

var cancellable = function(fn, args, t) {
    
    // cancelFn function//
    const cancelFn = function (){
      clearTimeout(timer);
    };

    const timer = setTimeout(()=>{
        fn(...args)
    }, t);
    return cancelFn ;
};

/**
 *  const result = []
 *
 *  const fn = (x) => x * 5
 *  const args = [2], t = 20, cancelT = 50
 *
 *  const start = performance.now() 
 *
 *  const log = (...argsArr) => {
 *      const diff = Math.floor(performance.now() - start);
 *      result.push({"time": diff, "returned": fn(...argsArr)})
 *  }
 *       
 *  const cancel = cancellable(log, args, t);
 *
 *  const maxT = Math.max(t, cancelT)
 *           
 *  setTimeout(() => {
 *     cancel()
 *  }, cancelT)
 *
 *  setTimeout(() => {
 *     console.log(result) // [{"time":20,"returned":10}]
 *  }, maxT + 15)
 */