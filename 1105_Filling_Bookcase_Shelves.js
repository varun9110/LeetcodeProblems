/**
 * 1105. Filling Bookcase Shelves
 * Difficulty: Medium
 * 
 * You are given an array books where books[i] = [thicknessi, heighti] indicates the thickness and height of the ith book. 
 * You are also given an integer shelfWidth.

We want to place these books in order onto bookcase shelves that have a total width shelfWidth.

We choose some of the books to place on this shelf such that the sum of their thickness is less than or equal to shelfWidth, 
then build another level of the shelf of the bookcase so that the total height of the bookcase has increased by the maximum height of 
the books we just put down. We repeat this process until there are no more books to place.

Note that at each step of the above process, the order of the books we place is the same order as the given sequence of books.

For example, if we have an ordered list of 5 books, we might place the first and second book onto the first shelf, 
the third book on the second shelf, and the fourth and fifth book on the last shelf.
Return the minimum possible height that the total bookshelf can be after placing shelves in this manner.

 

Example 1:


Input: books = [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], shelfWidth = 4
Output: 6
Explanation:
The sum of the heights of the 3 shelves is 1 + 3 + 2 = 6.
Notice that book number 2 does not have to be on the first shelf.
Example 2:

Input: books = [[1,3],[2,4],[3,2]], shelfWidth = 6
Output: 4
 

Constraints:

1 <= books.length <= 1000
1 <= thicknessi <= shelfWidth <= 1000
1 <= heighti <= 1000
 */

/**
 * Intuition
This looks like a optimization problem - we're trying to minimize the total height of the bookshelf.
The order of books matters and can't be changed, which adds a constraint.
We have to make decisions about where to "break" the shelf and start a new one.
It feels like we might need to try different combinations to find the optimal solution.
The fact that we can't rearrange books makes me think of dynamic programming - we might be able to build on smaller subproblems.
Let's think about this with a simple example. Say we have books: [[1,3], [2,4], [3,2], [2,3]] and a shelf width of 4.

We could arrange them like:

[1,3][2,4]
[3,2]
[2,3]
Or:

[1,3][2,4]
[3,2][2,3]
The second arrangement is clearly better. But how do we systematically find the best arrangement?

Approach
Understanding the Problem Structure:
First, we need to recognize that this problem has an optimal substructure. This means that the best solution for arranging n books 
can be built from the best solutions for arranging fewer books. This is a key characteristic that suggests we can use dynamic programming.

Why? Because for each book, we have two choices:
a) Put it on the current shelf if there's space
b) Start a new shelf with this book

The best choice depends on what we've done with the previous books, but it doesn't depend on what we'll do with future books. 
This is another hint that dynamic programming could work well here.

Defining Our Subproblem:
We define our subproblem as: "What's the minimum height needed for the first i books?"

Why this subproblem? Because if we know the best way to arrange the first i-1 books, we can use that information to figure 
out the best way to arrange i books. We just need to decide whether to put the i-th book on a new shelf or try to fit it with some of the previous books.

Building the Solution Incrementally:
We'll use an array called minHeight to store our intermediate results. minHeight[i] will represent the minimum height needed to arrange the first i books.

Why an array? This allows us to store and reuse the results of our subproblems, which is a key feature of dynamic programming. 
It prevents us from recalculating the same things over and over.

Base Case:
We start with minHeight[0] = 0. This represents the case where we have no books, so the height is zero.

Why do we need this? Every recursive or dynamic programming solution needs a base case - a simple scenario where we know the answer without any calculation.
 This gives us a starting point to build upon.

Iterating Through the Books:
We'll go through the books one by one, from the first to the last. For each book, we'll determine the best way to arrange all books up to 
and including this one.

Why in this order? Because we need to know the best arrangements for smaller numbers of books before we can figure out the best arrangement for more books.

Considering Placement Options:
For each book, we'll try placing it on a shelf with some of the previous books. We start by trying to put it with just the previous book, 
then the previous two books, and so on, until we can't fit any more.

Why try all these options? Because the optimal solution might involve putting this book on a new shelf, or it might involve combining 
it with some number of previous books. We need to check all possibilities to find the best one.

Tracking Shelf Width and Height:
As we try different combinations, we keep track of two things:
a) The total width of books on the current shelf
b) The height of the tallest book on the current shelf

Why? The width tells us if we can fit another book. The height determines how tall this shelf will be, which affects our total bookshelf height.

Updating the Minimum Height:
For each valid arrangement (i.e., one that fits on the shelf), we calculate the total height. 
This is the height of the current shelf plus the minimum height needed for all the books before the ones on this shelf.

Why add these? The total height of our bookshelf is the sum of all the shelf heights. 
By adding the current shelf to the best arrangement of the books before it, we get the total height for this arrangement.

Choosing the Best Option:
After trying all possible arrangements for the current book, we keep the one that gives us the smallest total height. 
We store this in our minHeight array.

Why keep only the best? This is the essence of dynamic programming. We only need to know the best solution for each subproblem to solve larger problems.

Final Result:
After we've processed all the books, minHeight[n] (where n is the total number of books) gives us the minimum possible height for the entire bookshelf.

Complexity
Time Complexity: O(n^2)

We have an outer loop that iterates through all n books: O(n)
For each book, we have an inner loop that potentially looks back at all previous books: O(n)
These nested loops give us a quadratic time complexity: O(n) * O(n) = O(n^2)
In the worst case, where the shelf is very wide and can accommodate all books, we'll always look back at all previous books for each new book.

Best case scenario: O(n) if the shelf width only ever fits one book.
Average case: Still O(n^2) as we expect to look back at a significant portion of previous books for each new book.

Space Complexity: O(n)
 */



/**
 * @param {number[][]} books
 * @param {number} shelfWidth
 * @return {number}
 */
var minHeightShelves = function(books, shelfWidth) {
    return arrangeBooks(books, shelfWidth);
};

/**
 * @param {number[][]} books
 * @param {number} maxShelfWidth
 * @return {number}
 */
function arrangeBooks(books, maxShelfWidth) {
    const minHeights = new Array(books.length + 1).fill(Infinity);
    minHeights[0] = 0;

    for (let bookIndex = 1; bookIndex <= books.length; bookIndex++) {
        let currentShelfHeight = 0;
        let currentShelfWidth = 0;

        for (let lastBook = bookIndex - 1; lastBook >= 0; lastBook--) {
            const [currentBookThickness, currentBookHeight] = books[lastBook];

            if (currentShelfWidth + currentBookThickness > maxShelfWidth) {
                break;
            }

            currentShelfWidth += currentBookThickness;
            currentShelfHeight = Math.max(currentShelfHeight, currentBookHeight);

            const currentArrangementHeight = minHeights[lastBook] + currentShelfHeight;
            minHeights[bookIndex] = Math.min(minHeights[bookIndex], currentArrangementHeight);
        }
    }

    return minHeights[books.length];
}