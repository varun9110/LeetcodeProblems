/**
 * 2115. Find All Possible Recipes from Given Supplies
 * Difficulty: Medium
 * 
 * You have information about n different recipes. You are given a string array recipes and a 2D string array ingredients. The ith recipe has the name recipes[i], 
 * and you can create it if you have all the needed ingredients from ingredients[i]. A recipe can also be an ingredient for other recipes, i.e., ingredients[i] 
 * may contain a string that is in recipes.

You are also given a string array supplies containing all the ingredients that you initially have, and you have an infinite supply of all of them.
Return a list of all the recipes that you can create. You may return the answer in any order.
Note that two recipes may contain each other in their ingredients.

Example 1:
Input: recipes = ["bread"], ingredients = [["yeast","flour"]], supplies = ["yeast","flour","corn"]
Output: ["bread"]
Explanation:
We can create "bread" since we have the ingredients "yeast" and "flour".
Example 2:
Input: recipes = ["bread","sandwich"], ingredients = [["yeast","flour"],["bread","meat"]], supplies = ["yeast","flour","meat"]
Output: ["bread","sandwich"]
Explanation:
We can create "bread" since we have the ingredients "yeast" and "flour".
We can create "sandwich" since we have the ingredient "meat" and can create the ingredient "bread".
Example 3:
Input: recipes = ["bread","sandwich","burger"], ingredients = [["yeast","flour"],["bread","meat"],["sandwich","meat","bread"]], supplies = ["yeast","flour","meat"]
Output: ["bread","sandwich","burger"]
Explanation:
We can create "bread" since we have the ingredients "yeast" and "flour".
We can create "sandwich" since we have the ingredient "meat" and can create the ingredient "bread".
We can create "burger" since we have the ingredient "meat" and can create the ingredients "bread" and "sandwich".

Constraints:
n == recipes.length == ingredients.length
1 <= n <= 100
1 <= ingredients[i].length, supplies.length <= 100
1 <= recipes[i].length, ingredients[i][j].length, supplies[k].length <= 10
recipes[i], ingredients[i][j], and supplies[k] consist only of lowercase English letters.
All the values of recipes and supplies combined are unique.
Each ingredients[i] does not contain any duplicate values.
 */

/**
 * Its similar to course dependency problem.
 then iterate through the loop through each recipe and check if all its ingredients were present, or its item was there a part of recipe or not
 if part of recipe then check if it was already visitedm if yes then check if it is part of the answer result if yes then possible else not
 if not visited then recurssive through its ingredients to check if it possible to check if it is possible to make then recipe or not.

 keep storing the answer in a result array
 */

/**
 * @param {string[]} recipes
 * @param {string[][]} ingredients
 * @param {string[]} supplies
 * @return {string[]}
 */
var findAllRecipes = function(recipes, ingredients, supplies) {
    let map = {};

    for(let i=0; i<recipes.length; i++){
        map[recipes[i]] = [];
        for(let j=0; j<ingredients[i].length; j++){
            map[recipes[i]].push(ingredients[i][j])
        }
    }

    let visited = new Set()
    let ans = [];

    const checkCompleteness = (recipe) => {
        if(visited.has(recipe)){
            return ans.some((element) => element === recipe)
        }
        visited.add(recipe)
        let ingre = map[recipe];
        let possible = true;
        for(let j=0; j<ingre.length; j++){
            if(!supplies.some((element) => element === ingre[j])){
                if(map[ingre[j]] === undefined || !checkCompleteness(ingre[j])){
                    possible = false;
                    break;
                }
            }
        }
        if(possible){
            ans.push(recipe);
        }
        return possible;
    }
    for(let i=0; i<recipes.length; i++){
        if(!visited.has(recipes[i])){
            checkCompleteness(recipes[i])
        }
    }
    return ans
};