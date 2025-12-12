/**
 * 3433. Count Mentions Per User
 * Difficulty: Medium
 * 
 * You are given an integer numberOfUsers representing the total number of users and an array events of size n x 3.

Each events[i] can be either of the following two types:

Message Event: ["MESSAGE", "timestampi", "mentions_stringi"]
This event indicates that a set of users was mentioned in a message at timestampi.
The mentions_stringi string can contain one of the following tokens:
id<number>: where <number> is an integer in range [0,numberOfUsers - 1]. There can be multiple ids separated by a single whitespace and may contain duplicates. This can mention even the offline users.
ALL: mentions all users.
HERE: mentions all online users.
Offline Event: ["OFFLINE", "timestampi", "idi"]
This event indicates that the user idi had become offline at timestampi for 60 time units. The user will automatically be online again at time timestampi + 60.
Return an array mentions where mentions[i] represents the number of mentions the user with id i has across all MESSAGE events.

All users are initially online, and if a user goes offline or comes back online, their status change is processed before handling any message event that occurs at the same timestamp.

Note that a user can be mentioned multiple times in a single message event, and each mention should be counted separately.

 

Example 1:

Input: numberOfUsers = 2, events = [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","71","HERE"]]

Output: [2,2]

Explanation:

Initially, all users are online.

At timestamp 10, id1 and id0 are mentioned. mentions = [1,1]

At timestamp 11, id0 goes offline.

At timestamp 71, id0 comes back online and "HERE" is mentioned. mentions = [2,2]

Example 2:

Input: numberOfUsers = 2, events = [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","12","ALL"]]

Output: [2,2]

Explanation:

Initially, all users are online.

At timestamp 10, id1 and id0 are mentioned. mentions = [1,1]

At timestamp 11, id0 goes offline.

At timestamp 12, "ALL" is mentioned. This includes offline users, so both id0 and id1 are mentioned. mentions = [2,2]

Example 3:

Input: numberOfUsers = 2, events = [["OFFLINE","10","0"],["MESSAGE","12","HERE"]]

Output: [0,1]

Explanation:

Initially, all users are online.

At timestamp 10, id0 goes offline.

At timestamp 12, "HERE" is mentioned. Because id0 is still offline, they will not be mentioned. mentions = [0,1]

 

Constraints:

1 <= numberOfUsers <= 100
1 <= events.length <= 100
events[i].length == 3
events[i][0] will be one of MESSAGE or OFFLINE.
1 <= int(events[i][1]) <= 105
The number of id<number> mentions in any "MESSAGE" event is between 1 and 100.
0 <= <number> <= numberOfUsers - 1
It is guaranteed that the user id referenced in the OFFLINE event is online at the time the event occurs.
 */

/**
 * Approach (step-by-step)
Parse events and group them by timestamp (so we can process all actions at a timestamp together).

Keep arrays:

mentions (length = numberOfUsers) to accumulate counts.
isOnline (bool) to track online status. Initially all true.
offlineUntil (int) storing the time when a user automatically becomes online again (0 if online).
Iterate timestamps in increasing order:

First, bring back online any users with offlineUntil <= current_timestamp.

Then run all OFFLINE events at that timestamp: mark the user offline and set offlineUntil = timestamp + 60.

Then run all MESSAGE events at that timestamp:

Split the mentions string into tokens.

For each token:

ALL: increment all users (including offline).
HERE: increment only users where isOnline == true.
idX: parse X and increment that user's count.
At the end return mentions.
 */

/**
 * @param {number} numberOfUsers
 * @param {string[][]} events
 * @return {number[]}
 */
var countMentions = function(numberOfUsers, events) {
    const byTime = new Map();
    for (const ev of events) {
        const t = parseInt(ev[1], 10);
        if (!byTime.has(t)) byTime.set(t, []);
        byTime.get(t).push(ev);
    }

    const timestamps = Array.from(byTime.keys()).sort((a,b) => a - b);

    const mentions = Array(numberOfUsers).fill(0);
    const isOnline = Array(numberOfUsers).fill(true);
    const offlineUntil = Array(numberOfUsers).fill(0);

    for (const t of timestamps) {
        const evs = byTime.get(t);

        for (let i = 0; i < numberOfUsers; ++i) {
            if (!isOnline[i] && offlineUntil[i] <= t) {
                isOnline[i] = true;
                offlineUntil[i] = 0;
            }
        }

        for (const ev of evs) {
            if (ev[0] === "OFFLINE") {
                const id = parseInt(ev[2], 10);
                isOnline[id] = false;
                offlineUntil[id] = t + 60;
            }
        }

        for (const ev of evs) {
            if (ev[0] !== "MESSAGE") continue;
            const tokens = ev[2].trim().split(/\s+/);
            for (const token of tokens) {
                if (token === "ALL") {
                    for (let i = 0; i < numberOfUsers; ++i) mentions[i]++;
                } else if (token === "HERE") {
                    for (let i = 0; i < numberOfUsers; ++i) if (isOnline[i]) mentions[i]++;
                } else if (token.startsWith("id")) {
                    const id = parseInt(token.slice(2), 10);
                    if (id >= 0 && id < numberOfUsers) mentions[id]++;
                }
            }
        }
    }

    return mentions;
};