/**
 * 2525. Categorize Box According to Criteria
 * Difficulty: Easy
 * Given four integers length, width, height, and mass, representing the dimensions and mass of a box, respectively, 
 * return a string representing the category of the box.
The box is "Bulky" if:
Any of the dimensions of the box is greater or equal to 104.
Or, the volume of the box is greater or equal to 109.
If the mass of the box is greater or equal to 100, it is "Heavy".
If the box is both "Bulky" and "Heavy", then its category is "Both".
If the box is neither "Bulky" nor "Heavy", then its category is "Neither".
If the box is "Bulky" but not "Heavy", then its category is "Bulky".
If the box is "Heavy" but not "Bulky", then its category is "Heavy".
Note that the volume of the box is the product of its length, width and height.
Example 1:
Input: length = 1000, width = 35, height = 700, mass = 300
Explanation: 
None of the dimensions of the box is greater or equal to 104. 
Its volume = 24500000 <= 109. So it cannot be categorized as "Bulky".
Output: "Heavy"
However mass >= 100, so the box is "Heavy".
Since the box is not "Bulky" but "Heavy", we return "Heavy".
Example 2:
Input: length = 200, width = 50, height = 800, mass = 50
Output: "Neither"
Explanation: 
None of the dimensions of the box is greater or equal to 104.
Its volume = 8 * 106 <= 109. So it cannot be categorized as "Bulky".
Its mass is also less than 100, so it cannot be categorized as "Heavy" either. 
Since its neither of the two above categories, we return "Neither".
 Constraints:
1 <= length, width, height <= 105
1 <= mass <= 103
 */

var categorizeBox = function(length, width, height, mass) {
    const volume = length * width * height;
  const isBulky =
    length >= 10 ** 4 ||
    width >= 10 ** 4 ||
    height >= 10 ** 4 ||
    mass >= 10 ** 4 ||
    volume >= 10 ** 9;
  let result = '';

  const isHeavy = mass >= 100;
  if (isBulky && isHeavy) {
    result = 'Both';
  } else if (!isBulky && !isHeavy) {
    result = 'Neither';
  } else if (isBulky) {
    result = 'Bulky';
  } else if (isHeavy) {
    return 'Heavy';
  }

  return result;
};

/**
 * Refined code
 */

var categorizeBox = function(length, width, height, mass) {
    const volume = length * width * height;
    let maxVal = Math.max(length, width, height);
    const isBulky =  maxVal >= Math.pow(10, 4) || volume >= Math.pow(10, 9);
    const isHeavy = mass >= 100;
    if(isBulky && isHeavy){
        return "Both"
    } else if(!isBulky && !isHeavy){
        return "Neither"
    } else if(isBulky){
        return "Bulky"
    } else{
        return "Heavy"
    }
};