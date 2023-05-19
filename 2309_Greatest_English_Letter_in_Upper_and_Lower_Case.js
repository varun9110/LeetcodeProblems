/**
 * 2309. Greatest English Letter in Upper and Lower Case
 * Difficulty: Easy
 * 
 * Given a string of English letters s, return the greatest English letter which occurs as both a lowercase and uppercase letter in s. The returned letter
 *  should be in uppercase. If no such letter exists, return an empty string.
An English letter b is greater than another letter a if b appears after a in the English alphabet.
Example 1:
Input: s = "lEeTcOdE"
Output: "E"
Explanation:
The letter 'E' is the only letter to appear in both lower and upper case.
Example 2:
Input: s = "arRAzFif"
Output: "R"
Explanation:
The letter 'R' is the greatest letter to appear in both lower and upper case.
Note that 'A' and 'F' also appear in both lower and upper case, but 'R' is greater than 'F' or 'A'.
Example 3:
Input: s = "AbCdEfGhIjK"
Output: ""
Explanation:
There is no letter that appears in both lower and upper case.

Constraints:
1 <= s.length <= 1000
s consists of lowercase and uppercase English letters.
 */

/**
 * Approach:
 * Create a mapper to map all alphabets to their values.
 * store result, bigger value, unique to store the chanracters of the string
 * now iterate through the string and check if the value is greater than the previous one.
 * if yes then check if both lower and upper exists in the string. if yes then store them in the respective variables
 * return result
 */

var greatestLetter = function (s) {
  let mapper = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
  };
  let result = "";
  let bigger = 0;
  let unique = {};
  for (let i = 0; i < s.length; i++) {
    unique[s[i]] = 1;
    let lower = s[i].toLowerCase();
    let upper = s[i].toUpperCase();
    if (mapper[lower] > bigger) {
      if (unique[lower] && unique[upper]) {
        result = upper;
        bigger = mapper[lower];
      }
    }
  }
  return result;
};

/**
 * Refined approach:
 * by using the charcode
 */

var greatestLetter = function (s) {
  let set = new Set(s.split(""));
  // ASCII(A-Z, a-z)=(65-90, 97-122).
  for (let i = 90; i >= 65; i--) {
    if (
      set.has(String.fromCharCode(i)) &&
      set.has(String.fromCharCode(i + 32))
    ) {
      return String.fromCharCode(i);
    }
  }
  return "";
};