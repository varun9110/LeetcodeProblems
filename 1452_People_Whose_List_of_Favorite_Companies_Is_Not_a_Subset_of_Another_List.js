/**
 * 1452. People Whose List of Favorite Companies Is Not a Subset of Another List
 * Difficulty: Medium
 * 
 * Given the array favoriteCompanies where favoriteCompanies[i] is the list of favorites companies for the ith person (indexed from 0).
Return the indices of people whose list of favorite companies is not a subset of any other list of favorites companies. You must return the indices in 
increasing order.

Example 1:
Input: favoriteCompanies = [["leetcode","google","facebook"],["google","microsoft"],["google","facebook"],["google"],["amazon"]]
Output: [0,1,4] 
Explanation: 
Person with index=2 has favoriteCompanies[2]=["google","facebook"] which is a subset of favoriteCompanies[0]=["leetcode","google","facebook"] corresponding 
to the person with index 0. 
Person with index=3 has favoriteCompanies[3]=["google"] which is a subset of favoriteCompanies[0]=["leetcode","google","facebook"] and 
favoriteCompanies[1]=["google","microsoft"]. 
Other lists of favorite companies are not a subset of another list, therefore, the answer is [0,1,4].

Example 2:
Input: favoriteCompanies = [["leetcode","google","facebook"],["leetcode","amazon"],["facebook","google"]]
Output: [0,1] 
Explanation: In this case favoriteCompanies[2]=["facebook","google"] is a subset of favoriteCompanies[0]=["leetcode","google","facebook"], therefore, the 
answer is [0,1].

Example 3:
Input: favoriteCompanies = [["leetcode"],["google"],["facebook"],["amazon"]]
Output: [0,1,2,3]
 
Constraints:
1 <= favoriteCompanies.length <= 100
1 <= favoriteCompanies[i].length <= 500
1 <= favoriteCompanies[i][j].length <= 20
All strings in favoriteCompanies[i] are distinct.
All lists of favorite companies are distinct, that is, If we sort alphabetically each list then favoriteCompanies[i] != favoriteCompanies[j].
All strings consist of lowercase English letters only.
*/

/**
 * Approach :
 * brute force:
 * First we are creating a mapper to map the index of each people and their list of companies.
 * next sort the array in descending order. since the bigger cannot be a part of the smaller.
 *
 * next is the nested loop. i from 0 to the end of length, and j from i+1 to end of the length.
 * now first check if the lenght of both the companies is same then continue to the next iteration. since 2 people companies cannot be same.
 * It is one of the constraints
 * else. create a counter and check how many of j companies are there in the i companies. if all are there(match by number of matches and length)
 * if they match then splice the element and decrease the j by 1.
 * al the end create a result array and the original mapped index and sort it in ascending order.
 *
 */

var peopleIndexes = function (favoriteCompanies) {
  let mapper = {};
  for (let i = 0; i < favoriteCompanies.length; i++) {
    mapper[favoriteCompanies[i]] = i;
  }
  favoriteCompanies.sort((a, b) => b.length - a.length);

  for (let i = 0; i < favoriteCompanies.length; i++) {
    let companiesI = favoriteCompanies[i];
    for (let j = i + 1; j < favoriteCompanies.length; j++) {
      let companiesJ = favoriteCompanies[j];

      if (companiesI.length === companiesJ.length) {
        continue;
      }

      let count = 0;
      for (let k = 0; k < companiesJ.length; k++) {
        if (companiesI.find((element) => element === companiesJ[k])) {
          count++;
        }
      }
      if (companiesJ.length === count) {
        favoriteCompanies.splice(j, 1);
        j--;
      }
    }
  }
  let result = [];

  for (let i = 0; i < favoriteCompanies.length; i++) {
    result.push(mapper[favoriteCompanies[i]]);
  }
  result.sort((a, b) => a - b);
  return result;
};

/**
 * Better approach:
 * Using the metaphor of Big Fish Eats Little Fish
The basic concept is to find the person with the most amount of companies and eliminate all the people that are all the subset of itself. 
This way, all the people that are eliminated, we don't need to see if other people are a subset of them because the person that had more companies 
would've eliminated any people with subsets less than or equal to the eliminated person

Basicall the same approach but we use sets in place of arrays. for better computation.
 */

// helper method on set to see if current set is the subset of another
Set.prototype.isSubSet = function (set) {
  for (const value of this) {
    if (!set.has(value)) return false;
  }
  return true;
};

var peopleIndexes = function (favoriteCompanies) {
  // use an ordered set to keep possible people
  const people = new Set();

  // keep a set to see who do we need to check
  const peopleToCheck = new Set();

  for (let i = 0; i < favoriteCompanies.length; i++) {
    people.add(i);
    peopleToCheck.add(i);

    // convert all people's companies into a set so we can see if one set is the
    // subset of another in O(n) time rather than O(n^2) time
    favoriteCompanies[i] = new Set(favoriteCompanies[i]);
  }

  while (peopleToCheck.size > 0) {
    // get the next person in the set
    // it really doesn't matter which person we get
    // it just matters that we need to check this person in comparison to all others
    const person1 = peopleToCheck.values().next().value;

    peopleToCheck.delete(person1);
    const person1Companies = favoriteCompanies[person1];

    // check person1 against all other people remaining to be checked
    for (let person2 of peopleToCheck) {
      const person2Companies = favoriteCompanies[person2];

      // if person 1 is larger than person 2 and person 2 is a subset of person 1
      // we can delete person 2 from the possible people and from the people to check
      // because we know that person 1 will find all other people that are subsets of person 2
      if (person2Companies.size <= person1Companies.size) {
        if (person2Companies.isSubSet(person1Companies)) {
          peopleToCheck.delete(person2);
          people.delete(person2);

          // if person2 is a subset of person 1 and the size is the same then they are subsets of each other
          if (person1Companies.size == person2Companies.size)
            people.delete(person1);
        }

        // if person 1 is smaller then we want to delete the person
      } else if (person1Companies.isSubSet(person2Companies)) {
        people.delete(person1);
      }
    }
  }
  return [...people];
};
