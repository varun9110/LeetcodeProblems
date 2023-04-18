/**
 * 733. Flood Fill
 * Difficulty: Easy
 * An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.
You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].

To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, 
plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color.

Return the modified image after performing the flood fill.
Example 1:
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
Explanation: From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.
Note the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.
Example 2:
Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
Output: [[0,0,0],[0,0,0]]
Explanation: The starting pixel is already colored 0, so no changes are made to the image.

Constraints:
m == image.length
n == image[i].length
1 <= m, n <= 50
0 <= image[i][j], color < 216
0 <= sr < m
0 <= sc < n
 */

/**
 * Approach: This is very easy using recurrsion
 * just keep calling the same function with -1 and +1 in row and column
 */

var floodFill = function (image, sr, sc, color) {
  // Avoid infinite loop if the new and old colors are the same...
  if (image[sr][sc] == color) return image;
  // Run the fill function starting at the position given...
  fill(image, sr, sc, color, image[sr][sc]);
  return image;
};
var fill = function (image, sr, sc, color, cur) {
  // If sr is less than 0 or greater equals to the length of image...
  // Or, If sc is less than 0 or greater equals to the length of image[0]...
  if (sr < 0 || sr >= image.length || sc < 0 || sc >= image[0].length) return;
  // If image[sr][sc] is not equal to previous color...
  if (cur != image[sr][sc]) return;
  // Update the image[sr][sc] as a color...
  image[sr][sc] = color;
  // Make four recursive calls to the function with (sr-1, sc), (sr+1, sc), (sr, sc-1) and (sr, sc+1)
  fill(image, sr - 1, sc, color, cur);
  fill(image, sr + 1, sc, color, cur);
  fill(image, sr, sc - 1, color, cur);
  fill(image, sr, sc + 1, color, cur);
};
