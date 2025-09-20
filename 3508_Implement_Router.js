/**
 * 3508. Implement Router
 * Difficulty: Medium
 * 
 * Design a data structure that can efficiently manage data packets in a network router. Each data packet consists of the following attributes:

source: A unique identifier for the machine that generated the packet.
destination: A unique identifier for the target machine.
timestamp: The time at which the packet arrived at the router.
Implement the Router class:

Router(int memoryLimit): Initializes the Router object with a fixed memory limit.

memoryLimit is the maximum number of packets the router can store at any given time.
If adding a new packet would exceed this limit, the oldest packet must be removed to free up space.
bool addPacket(int source, int destination, int timestamp): Adds a packet with the given attributes to the router.

A packet is considered a duplicate if another packet with the same source, destination, and timestamp already exists in the router.
Return true if the packet is successfully added (i.e., it is not a duplicate); otherwise return false.
int[] forwardPacket(): Forwards the next packet in FIFO (First In First Out) order.

Remove the packet from storage.
Return the packet as an array [source, destination, timestamp].
If there are no packets to forward, return an empty array.
int getCount(int destination, int startTime, int endTime):

Returns the number of packets currently stored in the router (i.e., not yet forwarded) that have the specified destination and have timestamps in the inclusive range [startTime, endTime].
Note that queries for addPacket will be made in increasing order of timestamp.

 

Example 1:

Input:
["Router", "addPacket", "addPacket", "addPacket", "addPacket", "addPacket", "forwardPacket", "addPacket", "getCount"]
[[3], [1, 4, 90], [2, 5, 90], [1, 4, 90], [3, 5, 95], [4, 5, 105], [], [5, 2, 110], [5, 100, 110]]

Output:
[null, true, true, false, true, true, [2, 5, 90], true, 1]

Explanation

Router router = new Router(3); // Initialize Router with memoryLimit of 3.
router.addPacket(1, 4, 90); // Packet is added. Return True.
router.addPacket(2, 5, 90); // Packet is added. Return True.
router.addPacket(1, 4, 90); // This is a duplicate packet. Return False.
router.addPacket(3, 5, 95); // Packet is added. Return True
router.addPacket(4, 5, 105); // Packet is added, [1, 4, 90] is removed as number of packets exceeds memoryLimit. Return True.
router.forwardPacket(); // Return [2, 5, 90] and remove it from router.
router.addPacket(5, 2, 110); // Packet is added. Return True.
router.getCount(5, 100, 110); // The only packet with destination 5 and timestamp in the inclusive range [100, 110] is [4, 5, 105]. Return 1.
Example 2:

Input:
["Router", "addPacket", "forwardPacket", "forwardPacket"]
[[2], [7, 4, 90], [], []]

Output:
[null, true, [7, 4, 90], []]

Explanation

Router router = new Router(2); // Initialize Router with memoryLimit of 2.
router.addPacket(7, 4, 90); // Return True.
router.forwardPacket(); // Return [7, 4, 90].
router.forwardPacket(); // There are no packets left, return [].
 

Constraints:

2 <= memoryLimit <= 105
1 <= source, destination <= 2 * 105
1 <= timestamp <= 109
1 <= startTime <= endTime <= 109
At most 105 calls will be made to addPacket, forwardPacket, and getCount methods altogether.
queries for addPacket will be made in increasing order of timestamp.
 */

/**
 * Intuition
The router can only store a fixed number of packets (memoryLimit).

New packets come in with source, destination, and timestamp.

If memory is full, we must remove the oldest packet (like a queue → FIFO).

Duplicate packets (same source, destination, timestamp) should be ignored.

We also need to quickly answer queries about how many packets (not yet forwarded) match a destination and fall in a given timestamp range.

Approach
addPacket(source, destination, timestamp):
Encode (source, destination, timestamp) into a unique key.

If the key already exists → return false (duplicate).

If memory full → call forwardPacket() to remove the oldest.

Add new packet into both packets map and queue.

Store its timestamp in counts[destination].

Return true.

forwardPacket():
Remove the oldest packet from the queue.

Delete it from the packets map.

Also remove its timestamp from the list in counts.

Return the removed packet.

getCount(destination, startTime, endTime):
Look at the timestamps list for this destination.

Use binary search (lowerBound and upperBound) to find how many timestamps fall within [startTime, endTime].

Return that count.

Complexity
Time complexity: O(log m)
Space complexity: O(memoryLimit)
 */

class Router {
    constructor(memoryLimit) {
        this.size = memoryLimit;
        this.packets = new Map(); // key -> [source, destination, timestamp]
        this.counts = new Map();  // destination -> array of timestamps
        this.queue = []; // FIFO order of keys
    }

    _encode(source, destination, timestamp) {
        // Combine into one unique number (using BigInt to avoid overflow)
        return (BigInt(source) << 40n) | (BigInt(destination) << 20n) | BigInt(timestamp);
    }

    addPacket(source, destination, timestamp) {
        const key = this._encode(source, destination, timestamp).toString();

        // Duplicate check
        if (this.packets.has(key)) return false;

        // If memory is full, forward oldest
        if (this.packets.size >= this.size) {
            this.forwardPacket();
        }

        // Add packet
        this.packets.set(key, [source, destination, timestamp]);
        this.queue.push(key);

        if (!this.counts.has(destination)) {
            this.counts.set(destination, []);
        }
        this.counts.get(destination).push(timestamp);

        return true;
    }

    forwardPacket() {
        if (this.packets.size === 0) return [];

        const key = this.queue.shift();
        const packet = this.packets.get(key);
        this.packets.delete(key);

        const destination = packet[1];
        this.counts.get(destination).shift(); // remove earliest timestamp

        return packet;
    }

    getCount(destination, startTime, endTime) {
        if (!this.counts.has(destination)) return 0;

        const timestamps = this.counts.get(destination);
        if (timestamps.length === 0) return 0;

        // Binary search helpers
        const lowerBound = (arr, target) => {
            let low = 0, high = arr.length;
            while (low < high) {
                const mid = Math.floor((low + high) / 2);
                if (arr[mid] < target) low = mid + 1;
                else high = mid;
            }
            return low;
        };

        const upperBound = (arr, target) => {
            let low = 0, high = arr.length;
            while (low < high) {
                const mid = Math.floor((low + high) / 2);
                if (arr[mid] <= target) low = mid + 1;
                else high = mid;
            }
            return low;
        };

        const left = lowerBound(timestamps, startTime);
        const right = upperBound(timestamps, endTime);

        return right - left;
    }
}