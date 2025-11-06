/**
 * 3607. Power Grid Maintenance
 * Difficulty: Medium
 * 
 * You are given an integer c representing c power stations, each with a unique identifier id from 1 to c (1‑based indexing).

These stations are interconnected via n bidirectional cables, represented by a 2D array connections, where each element connections[i] = [ui, vi] indicates a connection between station ui and station vi. Stations that are directly or indirectly connected form a power grid.

Initially, all stations are online (operational).

You are also given a 2D array queries, where each query is one of the following two types:

[1, x]: A maintenance check is requested for station x. If station x is online, it resolves the check by itself. If station x is offline, the check is resolved by the operational station with the smallest id in the same power grid as x. If no operational station exists in that grid, return -1.

[2, x]: Station x goes offline (i.e., it becomes non-operational).

Return an array of integers representing the results of each query of type [1, x] in the order they appear.

Note: The power grid preserves its structure; an offline (non‑operational) node remains part of its grid and taking it offline does not alter connectivity.

 

Example 1:

Input: c = 5, connections = [[1,2],[2,3],[3,4],[4,5]], queries = [[1,3],[2,1],[1,1],[2,2],[1,2]]

Output: [3,2,3]

Explanation:



Initially, all stations {1, 2, 3, 4, 5} are online and form a single power grid.
Query [1,3]: Station 3 is online, so the maintenance check is resolved by station 3.
Query [2,1]: Station 1 goes offline. The remaining online stations are {2, 3, 4, 5}.
Query [1,1]: Station 1 is offline, so the check is resolved by the operational station with the smallest id among {2, 3, 4, 5}, which is station 2.
Query [2,2]: Station 2 goes offline. The remaining online stations are {3, 4, 5}.
Query [1,2]: Station 2 is offline, so the check is resolved by the operational station with the smallest id among {3, 4, 5}, which is station 3.
Example 2:

Input: c = 3, connections = [], queries = [[1,1],[2,1],[1,1]]

Output: [1,-1]

Explanation:

There are no connections, so each station is its own isolated grid.
Query [1,1]: Station 1 is online in its isolated grid, so the maintenance check is resolved by station 1.
Query [2,1]: Station 1 goes offline.
Query [1,1]: Station 1 is offline and there are no other stations in its grid, so the result is -1.
 

Constraints:

1 <= c <= 105
0 <= n == connections.length <= min(105, c * (c - 1) / 2)
connections[i].length == 2
1 <= ui, vi <= c
ui != vi
1 <= queries.length <= 2 * 105
queries[i].length == 2
queries[i][0] is either 1 or 2.
1 <= queries[i][1] <= c
 */

/**
 * Approach
Build components

Use DSU to union all (u, v) connections.
After unions, every station i has a root find(i) that identifies its component.
Prepare per-component min-heaps

For each station i, push i into the min-heap of its component root.
Initially all stations are online, so every heap contains all members.
Maintain online/offline status

Keep a boolean array offline[i] (all false initially).
Process queries in order

Type [2, x]: mark offline[x] = true. (No graph change.)

Type [1, x]:

If offline[x] == false, answer x (it handles its own check).

Else:

Let r = find(x).
While the heap for r is not empty and its top t is offline, pop it (lazy delete).
If the heap becomes empty → return -1 (no online station in that component).
Else → return the current top (smallest-id online station).
 */

/**
 * @param {number} c
 * @param {number[][]} connections
 * @param {number[][]} queries
 * @return {number[]}
 */
var processQueries = function(c, connections, queries) {
    const p = Array(c+1).fill(0).map((_,i)=>i);
    const sz = Array(c+1).fill(1);
    const find = x => (p[x]===x ? x : (p[x]=find(p[x])));
    const unite = (a,b) => {
        a=find(a); b=find(b);
        if (a===b) return;
        if (sz[a] < sz[b]) [a,b] = [b,a];
        p[b]=a; sz[a]+=sz[b];
    };
    for (const [u,v] of connections) unite(u,v);

    class MinHeap {
        constructor(){ this.a = []; }
        size(){ return this.a.length; }
        peek(){ return this.a[0]; }
        push(x){
            const a=this.a; a.push(x);
            let i=a.length-1;
            while(i>0){
                let p=(i-1)>>1;
                if (a[p] <= a[i]) break;
                [a[p],a[i]]=[a[i],a[p]]; i=p;
            }
        }
        pop(){
            const a=this.a;
            if (a.length===0) return undefined;
            const top=a[0], last=a.pop();
            if (a.length){
                a[0]=last;
                let i=0;
                while(true){
                    let l=i*2+1, r=l+1, m=i;
                    if (l<a.length && a[l]<a[m]) m=l;
                    if (r<a.length && a[r]<a[m]) m=r;
                    if (m===i) break;
                    [a[i],a[m]]=[a[m],a[i]]; i=m;
                }
            }
            return top;
        }
    }

    const heap = new Map();
    for (let i=1;i<=c;i++){
        const r=find(i);
        if (!heap.has(r)) heap.set(r, new MinHeap());
        heap.get(r).push(i);
    }

    const offline = Array(c+1).fill(false);
    const ans = [];

    for (const [t,x] of queries){
        if (t===2){
            offline[x]=true;
        } else {
            if (!offline[x]) {
                ans.push(x);
            } else {
                const r = find(x);
                const pq = heap.get(r);
                if (!pq){ ans.push(-1); continue; }
                while (pq.size() && offline[pq.peek()]) pq.pop();
                ans.push(pq.size() ? pq.peek() : -1);
            }
        }
    }
    return ans;
};