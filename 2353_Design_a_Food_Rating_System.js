/**
 * 2353. Design a Food Rating System
 * Difficulty: Medium
 * 
 * Design a food rating system that can do the following:

Modify the rating of a food item listed in the system.
Return the highest-rated food item for a type of cuisine in the system.
Implement the FoodRatings class:

FoodRatings(String[] foods, String[] cuisines, int[] ratings) Initializes the system. The food items are described by foods, cuisines and ratings, all of which have a length of n.
foods[i] is the name of the ith food,
cuisines[i] is the type of cuisine of the ith food, and
ratings[i] is the initial rating of the ith food.
void changeRating(String food, int newRating) Changes the rating of the food item with the name food.
String highestRated(String cuisine) Returns the name of the food item that has the highest rating for the given type of cuisine. If there is a tie, return the item with the lexicographically smaller name.
Note that a string x is lexicographically smaller than string y if x comes before y in dictionary order, that is, either x is a prefix of y, or if i is the first position such that x[i] != y[i], then x[i] comes before y[i] in alphabetic order.

 

Example 1:

Input
["FoodRatings", "highestRated", "highestRated", "changeRating", "highestRated", "changeRating", "highestRated"]
[[["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]], ["korean"], ["japanese"], ["sushi", 16], ["japanese"], ["ramen", 16], ["japanese"]]
Output
[null, "kimchi", "ramen", null, "sushi", null, "ramen"]

Explanation
FoodRatings foodRatings = new FoodRatings(["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]);
foodRatings.highestRated("korean"); // return "kimchi"
                                    // "kimchi" is the highest rated korean food with a rating of 9.
foodRatings.highestRated("japanese"); // return "ramen"
                                      // "ramen" is the highest rated japanese food with a rating of 14.
foodRatings.changeRating("sushi", 16); // "sushi" now has a rating of 16.
foodRatings.highestRated("japanese"); // return "sushi"
                                      // "sushi" is the highest rated japanese food with a rating of 16.
foodRatings.changeRating("ramen", 16); // "ramen" now has a rating of 16.
foodRatings.highestRated("japanese"); // return "ramen"
                                      // Both "sushi" and "ramen" have a rating of 16.
                                      // However, "ramen" is lexicographically smaller than "sushi".
 

Constraints:

1 <= n <= 2 * 104
n == foods.length == cuisines.length == ratings.length
1 <= foods[i].length, cuisines[i].length <= 10
foods[i], cuisines[i] consist of lowercase English letters.
1 <= ratings[i] <= 108
All the strings in foods are distinct.
food will be the name of a food item in the system across all calls to changeRating.
cuisine will be a type of cuisine of at least one food item in the system across all calls to highestRated.
At most 2 * 104 calls in total will be made to changeRating and highestRated.
 */

/**
 * Intuition
Set Hash Map this.cuisines where each cuisine is Priority Queue of tuples [rating, food] and custom comparator to make sequence by bigger rating, but smaller lexicographically order and this.foods as reversed Hash Map to track related cuisine and current rating {cuisine, rating}.

Within search of maximum rating and lexicographically smaller get first from cuisines Priority Queue which food rating equal food from this.foods.

Approach
Define:
this.cuisines - Priority Queue of tuples [rating, food];
this.foods - reversed Hash Map of {cuisine, rating};

In constructor make:

Hash Map this.cuisines to store cuisines as Priority Queue(s) with custom comparator to sort by rating first and in case of equal rating, lexicographically in ASC order, filled with tuples [rating, food];
Hash Map this.foods filled with {cuisine, rating};
changeRating method get cuisine of given food from this.foods and update it's rating, then push tuple of current food with newRating to this.cuisines[cuisine]. Don't care that previous one still there.

highestRated get current cuisine (Priority Queue) from this.cuisines by key and run loop to pop elements until top element be matched food which rating equal rating from this.foods, it identifies food with biggest rating, lexicographicaly smaller and with real rating. Return it's name when found.

Complexity
Time complexity:
O(N∗log(n))

Space complexity:
O(n)
 */
/**
 * @param {string[]} foods
 * @param {string[]} cuisines
 * @param {number[]} ratings
 */
var FoodRatings = function(foods, cuisines, ratings) {
    this.cuisines = {};
    this.foods = {};

    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        const cuisine = cuisines[i];
        const rating = ratings[i];

        this.foods[food] = {cuisine, rating};

        if (!this.cuisines[cuisine]) this.cuisines[cuisine] = new PriorityQueue((a, b) => {
            if (a[0] !== b[0]) return b[0] - a[0];
            return a[1].localeCompare(b[1]);
        });

        this.cuisines[cuisine].enqueue([rating, food]);
    }
};

/** 
 * @param {string} food 
 * @param {number} newRating
 * @return {void}
 */
FoodRatings.prototype.changeRating = function(food, newRating) {
    const { cuisine } = this.foods[food];
    this.foods[food].rating = newRating;
    this.cuisines[cuisine].enqueue([newRating, food]);
};

/** 
 * @param {string} cuisine
 * @return {string}
 */
FoodRatings.prototype.highestRated = function(cuisine) {
    const heap = this.cuisines[cuisine];

    while (!heap.isEmpty()) {
        const [rating, name] = heap.front();

        if (this.foods[name].rating === rating) {
            return name;
        } else {
            heap.dequeue();
        }
    }
};

/** 
 * Your FoodRatings object will be instantiated and called as such:
 * var obj = new FoodRatings(foods, cuisines, ratings)
 * obj.changeRating(food,newRating)
 * var param_2 = obj.highestRated(cuisine)
 */