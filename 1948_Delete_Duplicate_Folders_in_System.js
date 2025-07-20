/**
 * 1948. Delete Duplicate Folders in System
 * Difficulty: Hard
 * 
 * Due to a bug, there are many duplicate folders in a file system. You are given a 2D array paths, where paths[i] is an array representing an absolute path to the ith folder in the file system.

For example, ["one", "two", "three"] represents the path "/one/two/three".
Two folders (not necessarily on the same level) are identical if they contain the same non-empty set of identical subfolders and underlying subfolder structure. The folders do not need to be at the root level to be identical. If two or more folders are identical, then mark the folders as well as all their subfolders.

For example, folders "/a" and "/b" in the file structure below are identical. They (as well as their subfolders) should all be marked:
/a
/a/x
/a/x/y
/a/z
/b
/b/x
/b/x/y
/b/z
However, if the file structure also included the path "/b/w", then the folders "/a" and "/b" would not be identical. Note that "/a/x" and "/b/x" would still be considered identical even with the added folder.
Once all the identical folders and their subfolders have been marked, the file system will delete all of them. The file system only runs the deletion once, so any folders that become identical after the initial deletion are not deleted.

Return the 2D array ans containing the paths of the remaining folders after deleting all the marked folders. The paths may be returned in any order.

 

Example 1:


Input: paths = [["a"],["c"],["d"],["a","b"],["c","b"],["d","a"]]
Output: [["d"],["d","a"]]
Explanation: The file structure is as shown.
Folders "/a" and "/c" (and their subfolders) are marked for deletion because they both contain an empty
folder named "b".
Example 2:


Input: paths = [["a"],["c"],["a","b"],["c","b"],["a","b","x"],["a","b","x","y"],["w"],["w","y"]]
Output: [["c"],["c","b"],["a"],["a","b"]]
Explanation: The file structure is as shown. 
Folders "/a/b/x" and "/w" (and their subfolders) are marked for deletion because they both contain an empty folder named "y".
Note that folders "/a" and "/c" are identical after the deletion, but they are not deleted because they were not marked beforehand.
Example 3:


Input: paths = [["a","b"],["c","d"],["c"],["a"]]
Output: [["c"],["c","d"],["a"],["a","b"]]
Explanation: All folders are unique in the file system.
Note that the returned array can be in a different order as the order does not matter.
 

Constraints:

1 <= paths.length <= 2 * 104
1 <= paths[i].length <= 500
1 <= paths[i][j].length <= 10
1 <= sum(paths[i][j].length) <= 2 * 105
path[i][j] consists of lowercase English letters.
No two paths lead to the same folder.
For any folder not at the root level, its parent folder will also be in the input.
 */

/**
 * Problem Overview – What's Going On?
You’re given a list of folder paths where each path is an array of strings (representing folders).
Your task is to identify all folders that are structurally identical, even if they’re at different locations in the file system — and delete them and their entire subtrees.

Example:

Paths = [
  ["a"], ["a", "x"], ["a", "x", "y"], ["a", "z"],
  ["b"], ["b", "x"], ["b", "x", "y"], ["b", "z"]
]
Both /a and /b have the exact same subfolder structure. Therefore, delete both completely.

🔍 What Is a Duplicate Folder Structure?
A folder structure is not considered duplicate based on folder name alone. Instead, it’s considered duplicate if and only if:

"The set of child folders and their subfolders are identical in structure and names."

For example:

/a        ↳ x       ↳ y
          ↳ z

/b        ↳ x       ↳ y
          ↳ z
✅ Same child structure → considered duplicates → deleted.
Now consider:

/a        ↳ b       ↳ c

/d        ↳ b       ↳ d
Even though both /a/b and /d/b exist — they are not structurally identical → ❌ not deleted.

🧠 Step-by-Step Solution Explained
✅ Step 1: Build the File Tree (Like a Trie)
We represent the filesystem using a custom tree node structure, where each folder is a node.

Each node stores:

Folder name

A TreeMap of children (to ensure consistent order during serialization)

A string signature to uniquely represent its subtree structure

We build the tree by:

Inserting each path one by one.

Creating nodes if they don’t exist.

This gives us a full tree of the filesystem.

🧬 Step 2: Serialize Each Subtree to Detect Duplicates
We now perform post-order DFS (children first) to compute a signature for each subtree.

Example Signature:

For structure:
  "b" ↳ "c"
  "d"
Signature of "b" = b(c())
Signature of root = a(b(c())d())

This uniquely identifies the structure. If two nodes generate the same signature, then they’re identical folders.

We keep a Map<String, Integer> to count how many times each signature appears.

❌ Step 3: Second DFS to Delete Duplicates
Now we traverse the tree again:

For each node, if its signature occurs more than once, we skip that node and its children (i.e., delete it).

Otherwise, we record the full path and continue traversal.

This ensures that all duplicates and their subfolders are removed, and only unique paths remain.
 */

/**
 * @param {string[][]} paths
 * @return {string[][]}
 */
class Node {
    constructor(name) {
        this.name = name;
        this.children = new Map();
        this.signature = "";
    }
}

var deleteDuplicateFolder = function(paths) {
    const root = new Node("");
    for (const path of paths) {
        let node = root;
        for (const folder of path) {
            if (!node.children.has(folder)) {
                node.children.set(folder, new Node(folder));
            }
            node = node.children.get(folder);
        }
    }

    const signatureCount = new Map();

    function dfs(node) {
        if (node.children.size === 0) {
            node.signature = "";
            return "";
        }
        const childSignatures = [];
        const sortedChildren = Array.from(node.children.entries()).sort((a, b) => a[0].localeCompare(b[0]));
        for (const [name, child] of sortedChildren) {
            const childSignature = dfs(child);
            childSignatures.push(`${name}(${childSignature})`);
        }
        node.signature = childSignatures.join("");
        signatureCount.set(node.signature, (signatureCount.get(node.signature) || 0) + 1);
        return node.signature;
    }

    dfs(root);

    const result = [];
    const currentPath = [];

    function dfs2(node) {
        if (node.children.size > 0 && signatureCount.get(node.signature) >= 2) {
            return;
        }
        currentPath.push(node.name);
        result.push([...currentPath]);
        const sortedChildren = Array.from(node.children.entries()).sort((a, b) => a[0].localeCompare(b[0]));
        for (const [name, child] of sortedChildren) {
            dfs2(child);
        }
        currentPath.pop();
    }

    const sortedRootChildren = Array.from(root.children.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    for (const [name, child] of sortedRootChildren) {
        dfs2(child);
    }

    return result;
};