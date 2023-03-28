/**
 * 661. Image Smoother
 * Difficulty: Easy
 * An image smoother is a filter of the size 3 x 3 that can be applied to each cell of an image by rounding down the average of the cell and the eight surrounding 
 * cells (i.e., the average of the nine cells in the blue smoother). If one or more of the surrounding cells of a cell is not present, we do not consider it in the 
 * average (i.e., the average of the four cells in the red smoother).
Given an m x n integer matrix img representing the grayscale of an image, return the image after applying the smoother on each cell of it.
Example 1:
Input: img = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[0,0,0],[0,0,0],[0,0,0]]
Explanation:
For the points (0,0), (0,2), (2,0), (2,2): floor(3/4) = floor(0.75) = 0
For the points (0,1), (1,0), (1,2), (2,1): floor(5/6) = floor(0.83333333) = 0
For the point (1,1): floor(8/9) = floor(0.88888889) = 0
Example 2:
Input: img = [[100,200,100],[200,50,200],[100,200,100]]
Output: [[137,141,137],[141,138,141],[137,141,137]]
Explanation:
For the points (0,0), (0,2), (2,0), (2,2): floor((100+200+200+50)/4) = floor(137.5) = 137
For the points (0,1), (1,0), (1,2), (2,1): floor((200+200+50+200+100+100)/6) = floor(141.666667) = 141
For the point (1,1): floor((50+200+200+200+200+100+100+100+100)/9) = floor(138.888889) = 138

Constraints:
m == img.length
n == img[i].length
1 <= m, n <= 200
0 <= img[i][j] <= 255
 */

/**
 * Approach:
 * Brute force: do as the logic says. Use 4 for loops to solve the issue. and after each row keep calculating the row result and push it in another array.
 * return the result array.
 */
 var imageSmoother = function(img) {
    let m = img.length;
    let n = img[0].length;
    let result = [];

    for(let i=0; i<m; i++){
        let rowArray =[];
        for(let j=0; j<n; j++){
            let sum = 0;
            let count = 0;
            for(let row = i-1; row<i+2 && row<m; row++){
                if(row>=0){
                    for(let column = j-1; column<j+2 && column<n; column++){
                        if(column>=0){
                            sum += img[row][column];
                            count++;
                        }
                    }
                }
            }
            rowArray.push(Math.floor(sum/count));
        }
        result.push(rowArray);
    }
    return result;
};

/**
 * Refined code:
 * Create a prefilled result array. 
 * the as we know that around each element there will always be 8 elements and each of them will be -1,0,+1, hence we can use this to calculate the rows and columns 
 * and compute the answer.
 * this way we get rid of using the loop
 */

 var imageSmoother = function(M) {
    let rows = M.length, cols = M[0].length
    let ret = new Array(rows).fill(0).map(_ => new Array(cols).fill(0))
    let isValid = validationMaker(rows, cols)
    for(let r = 0; r < rows; ++r) {
		for(let c = 0; c < cols; ++c) {
			let count = 0
			for(let x of [-1, 0, 1])
				for(let y of [-1, 0, 1])
					if(isValid(r + x, c + y)) {
						count++
						ret[r][c] += M[r + x][c + y]
					}
			ret[r][c] = Math.floor(ret[r][c] / count)
		}
    }
    return ret
}

const validationMaker = (rows, cols) =>
    (r, c) => r < rows && r >= 0 && c < cols && c >= 0