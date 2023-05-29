/**
 * 1128. Number of Equivalent Domino Pairs
 * Given a list of dominoes, dominoes[i] = [a, b] is equivalent to dominoes[j] = [c, d] if and only if either (a == c and b == d), 
 * or (a == d and b == c) - that is, one domino can be rotated to be equal to another domino.
Return the number of pairs (i, j) for which 0 <= i < j < dominoes.length, and dominoes[i] is equivalent to dominoes[j].
Example 1:
Input: dominoes = [[1,2],[2,1],[3,4],[5,6]]
Output: 1
Example 2:
Input: dominoes = [[1,2],[1,2],[1,1],[1,2],[2,2]]
Output: 3

Constraints:
1 <= dominoes.length <= 4 * 104
dominoes[i].length == 2
1 <= dominoes[i][j] <= 9
 */

/**
 * Approach:
 * since this problem is most likely be solved using the neseted loop so it makes sense to use mapper object here:
 * create mapper for all the values of the dominoes and that too in sorted way.
 * Keep their count as the values.
 * When all the values and their counts are calculated then run the loop to all the values and run another to find their possible combinations
 * Which are:
 * for 1 : 0
 * fof 2 : 0 + 1 
 * for 3: 0+ 1 + 2
 * for 4 : 0 + 1 + 2 + 3
 * for 5: 0 + 1 + 2 + 3 + 4
 */

var numEquivDominoPairs = function(dominoes) {
    let mapper = {};
    for(let i=0; i<dominoes.length; i++){
        let val = dominoes[i];
        let key = (val[0] < val[1]) ? ""+val[0]+val[1] : ""+val[1]+val[0];
        mapper[key] = (mapper[key]) ? mapper[key]+1 : 1;
    }
    let objectKeys = Object.values(mapper);
    let result = 0;
    for(let j=0; j<objectKeys.length; j++){
        let count = objectKeys[j];
        // for(let k=0; k<count; k++){
        //     result += k;
        // }
        //little refinement, the possible combinations can be found using the below formula:
        result = result + (count*(count-1))/2;
    }
    return result;
};