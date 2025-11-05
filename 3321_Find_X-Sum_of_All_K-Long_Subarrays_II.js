/**
 * 3321. Find X-Sum of All K-Long Subarrays II
 * Difficulty: Hard
 * 
 * You are given an array nums of n integers and two integers k and x.

The x-sum of an array is calculated by the following procedure:

Count the occurrences of all elements in the array.
Keep only the occurrences of the top x most frequent elements. If two elements have the same number of occurrences, the element with the bigger value is considered more frequent.
Calculate the sum of the resulting array.
Note that if an array has less than x distinct elements, its x-sum is the sum of the array.

Return an integer array answer of length n - k + 1 where answer[i] is the x-sum of the subarray nums[i..i + k - 1].

 

Example 1:

Input: nums = [1,1,2,2,3,4,2,3], k = 6, x = 2

Output: [6,10,12]

Explanation:

For subarray [1, 1, 2, 2, 3, 4], only elements 1 and 2 will be kept in the resulting array. Hence, answer[0] = 1 + 1 + 2 + 2.
For subarray [1, 2, 2, 3, 4, 2], only elements 2 and 4 will be kept in the resulting array. Hence, answer[1] = 2 + 2 + 2 + 4. Note that 4 is kept in the array since it is bigger than 3 and 1 which occur the same number of times.
For subarray [2, 2, 3, 4, 2, 3], only elements 2 and 3 are kept in the resulting array. Hence, answer[2] = 2 + 2 + 2 + 3 + 3.
Example 2:

Input: nums = [3,8,7,8,7,5], k = 2, x = 2

Output: [11,15,15,15,12]

Explanation:

Since k == x, answer[i] is equal to the sum of the subarray nums[i..i + k - 1].

 

Constraints:

nums.length == n
1 <= n <= 105
1 <= nums[i] <= 109
1 <= x <= k <= nums.length
 */

/**
 * Approach
Slide a fixed window of length k.

Track counts in a hashmap cnt.

Maintain two ordered containers:

TOP: a set (or heap) of size ≤ x, ordered by (freq desc, value desc).
REST: all other elements with the same ordering.
Keep topSum = Σ value*freq over TOP.

For each step:

Add right element: remove its old (f,v) from its container, set f+1, put in TOP, trim TOP to size x (demote smallest if needed).
Remove left element: remove its old (f,v), set f-1. If f>0, put in REST. If TOP has room, promote the best from REST.
Record topSum.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findXSum = function(nums, k, x) {
  class _PQ {
    constructor(cmp){ this.a = []; this.cmp = cmp; }
    size(){ return this.a.length; }
    peek(){ return this.a[0]; }
    push(v){ this.a.push(v); this._up(this.size()-1); }
    pop(){
      const n = this.size(); if (!n) return undefined;
      [this.a[0], this.a[n-1]] = [this.a[n-1], this.a[0]];
      const v = this.a.pop(); this._down(0); return v;
    }
    _up(i){
      while (i){
        const p = (i-1)>>1;
        if (this.cmp(this.a[p], this.a[i]) <= 0) break;
        [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
        i = p;
      }
    }
    _down(i){
      const n = this.size();
      for(;;){
        let l = i*2+1, r = l+1, b = i;
        if (l < n && this.cmp(this.a[b], this.a[l]) > 0) b = l;
        if (r < n && this.cmp(this.a[b], this.a[r]) > 0) b = r;
        if (b === i) break;
        [this.a[b], this.a[i]] = [this.a[i], this.a[b]];
        i = b;
      }
    }
  }
  const minCmp = (a,b)=> a[0]!==b[0]? a[0]-b[0] : a[1]-b[1];
  const maxCmp = (a,b)=> a[0]!==b[0]? b[0]-a[0] : b[1]-a[1];

  const n = nums.length;
  const ans = new Array(n - k + 1);

  const freq = new Map();
  const chosen = new Set();
  const hot = new _PQ(minCmp);
  const pool = new _PQ(maxCmp);
  let sum = 0n;

  const clean = () => {
    while (hot.size()){
      const [f, v] = hot.peek();
      if (chosen.has(v) && (freq.get(v)||0) === f) break;
      hot.pop();
    }
    while (pool.size()){
      const [f, v] = pool.peek();
      if (!chosen.has(v) && (freq.get(v)||0) === f && f > 0) break;
      pool.pop();
    }
  };
  const demoteIfChosen = (v) => {
    if (chosen.has(v)) {
      chosen.delete(v);
      const f = freq.get(v) || 0;
      sum -= BigInt(v) * BigInt(f);
    }
  };
  const promoteWhileNeeded = () => {
    clean();
    while (chosen.size < x && pool.size()){
      const [f, v] = pool.pop();
      if ((freq.get(v)||0) !== f || chosen.has(v) || f === 0) continue;
      chosen.add(v);
      sum += BigInt(v) * BigInt(f);
      hot.push([f, v]);
      clean();
    }
  };

  const addOne = (v) => {
    demoteIfChosen(v);
    const f = (freq.get(v)||0) + 1;
    freq.set(v, f);
    pool.push([f, v]);
    if (chosen.size < x) {
      promoteWhileNeeded();
    } else {
      clean();
      if (pool.size() && hot.size()){
        const [bf, bv] = pool.peek();
        const [wf, wv] = hot.peek();
        if (bf > wf || (bf === wf && bv > wv)) {
          pool.pop();
          chosen.add(bv);
          sum += BigInt(bv) * BigInt(bf);
          hot.push([bf, bv]);
          clean();
          const [df, dv] = hot.pop();
          if (chosen.has(dv) && (freq.get(dv)||0) === df) {
            chosen.delete(dv);
            sum -= BigInt(dv) * BigInt(df);
            pool.push([df, dv]);
          }
          clean();
        }
      }
    }
  };
  const removeOne = (v) => {
    demoteIfChosen(v);
    const f = (freq.get(v)||0) - 1;
    if (f <= 0) freq.delete(v);
    else { freq.set(v, f); pool.push([f, v]); }
    promoteWhileNeeded();
  };

  for (let i = 0; i < k; ++i) addOne(nums[i]);
  ans[0] = Number(sum);
  for (let i = k; i < n; ++i){
    removeOne(nums[i-k]);
    addOne(nums[i]);
    ans[i-k+1] = Number(sum);
  }
  return ans;
};