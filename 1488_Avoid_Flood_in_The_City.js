/**
 * 1488. Avoid Flood in The City
 * Difficulty: Medium
 * 
 * Your country has an infinite number of lakes. Initially, all the lakes are empty, but when it rains over the nth lake, the nth lake becomes full of water. If it rains over a lake that is full of water, there will be a flood. Your goal is to avoid floods in any lake.

Given an integer array rains where:

rains[i] > 0 means there will be rains over the rains[i] lake.
rains[i] == 0 means there are no rains this day and you can choose one lake this day and dry it.
Return an array ans where:

ans.length == rains.length
ans[i] == -1 if rains[i] > 0.
ans[i] is the lake you choose to dry in the ith day if rains[i] == 0.
If there are multiple valid answers return any of them. If it is impossible to avoid flood return an empty array.

Notice that if you chose to dry a full lake, it becomes empty, but if you chose to dry an empty lake, nothing changes.

Example 1:

Input: rains = [1,2,3,4]
Output: [-1,-1,-1,-1]
Explanation: After the first day full lakes are [1]
After the second day full lakes are [1,2]
After the third day full lakes are [1,2,3]
After the fourth day full lakes are [1,2,3,4]
There's no day to dry any lake and there is no flood in any lake.
Example 2:

Input: rains = [1,2,0,0,2,1]
Output: [-1,-1,2,1,-1,-1]
Explanation: After the first day full lakes are [1]
After the second day full lakes are [1,2]
After the third day, we dry lake 2. Full lakes are [1]
After the fourth day, we dry lake 1. There is no full lakes.
After the fifth day, full lakes are [2].
After the sixth day, full lakes are [1,2].
It is easy that this scenario is flood-free. [-1,-1,1,2,-1,-1] is another acceptable scenario.
Example 3:

Input: rains = [1,2,0,1,2]
Output: []
Explanation: After the second day, full lakes are  [1,2]. We have to dry one lake in the third day.
After that, it will rain over lakes [1,2]. It's easy to prove that no matter which lake you choose to dry in the 3rd day, the other one will flood.
 

Constraints:

1 <= rains.length <= 105
0 <= rains[i] <= 109
 * 
 */

/**
 * Algorithm
We want to select which lakes to dry on non-rainy days to prevent any lake from flooding.

A lake floods when it rains over a lake that is already full.

When it rains over a lake that's already full, we need to find a dry day between the previous rain and the current rain to dry that lake.

The approach here is to:

Track when each lake was last filled using a hash map
Then, when a lake is rained on for the second time, we must find a dry day between the two rain events
We will use a data structure: Union Find to efficiently skip over already-used dry days
So, if no suitable dry day exists, flooding is unavoidable
Union-Find (Disjoint Set Union) efficiently finds the next available dry day after a lake was last filled. This allows us to greedily assign dry days to prevent floods.

The Union-Find maintains two key operations:

Find Operation:

find(node)={ 
node
find(parent[node])
​
  
if parent[node]=node
otherwise
​
 
​
 
This finds the next available dry day starting from position node.

Union Operation:

parent[node]←find(node+1)
​
 
This marks day node as used and links it to the next available day.

Code Explanation and Algorithm
Ex: rains=[1,2,0,0,2,1]

Initialize structures:
Create a Union-Find structure of size n+1
parent=[0,1,2,3,4,5,6]
​
 
Create a hash map to track the last occurrence of each lake
map={}
​
 
Initialize result array with all 1s (placeholder for unused dry days)
res=[1,1,1,1,1,1]
​
 
Process each day:

If no rain (rain[i]=0):

Leave res[i]=1 (or any lake) for now
This will be updated later if needed
When it it rains (rain[i]

=0)

Then, there nothing to do, just set res[i]=−1
Mark day i as used: unite(i)
"used" means parent[i]

=i (the current element's parent changes).

Flood Check:
This is the most important part of this algorithm:

Check if this lake was rained on before:
if lake exists in the map:
Find the next available dry day after previous rain:
dry=find(prev+1)
​
 
find() returns the index i where parent[i]=i (an available day)

Note: We search from prev+1 (not prev) because prev is a rain day.
We need to find a dry day that comes after the previous rain event.

If dry≥i, no valid dry day exists
   → return empty array
  

If dry<i:

Use this dry day to dry the lake: res[dry]=lake
Mark dry day as used: unite(dry)
"used" means parent[i]

=i (the current element's parent changes).

Update map to remember that lake was last filled on day i:

map[lake]=i
Finally, return the result array containing the strategic dry plan.

Time Complexity: O(n⋅α(n))≈O(n)
Space Complexity: O(n)
 */

/**
 * @param {number[]} rains
 * @return {number[]}
 */
var avoidFlood = function(rains) {
    const filled = new Map();  // lake -> last day filled
    const dryDays = [];        // sorted list of available dry days
    const ans = new Array(rains.length).fill(-1);

    for (let i = 0; i < rains.length; i++) {
        const lake = rains[i];

        if (lake === 0) {
            dryDays.push(i);
            ans[i] = 1;
            continue;
        }
      
        if (filled.has(lake)) {
            let lastFill = filled.get(lake);
            let dryIndex = -1;

            for (let j = 0; j < dryDays.length; j++) {
                if (dryDays[j] > lastFill) {
                    dryIndex = j;
                    break;
                }
            }

            if (dryIndex === -1) {
                return [];
            }

            const dryDay = dryDays[dryIndex];
            ans[dryDay] = lake;
            dryDays.splice(dryIndex, 1);
        }

        filled.set(lake, i);
    }

    return ans;
};