
/*

1942_The_Number_of_the_Smallest_Unoccupied_Chair
Difficulty : Medium

There is a party where n friends numbered from 0 to n - 1 are attending. There is an infinite number of chairs in this party that are numbered from 0 to infinity. When a friend arrives at the party, they sit on the unoccupied chair with the smallest number.

For example, if chairs 0, 1, and 5 are occupied when a friend comes, they will sit on chair number 2.
When a friend leaves the party, their chair becomes unoccupied at the moment they leave. If another friend arrives at that same moment, they can sit in that chair.

You are given a 0-indexed 2D integer array times where times[i] = [arrivali, leavingi], indicating the arrival and leaving times of the ith friend respectively, and an integer targetFriend. All arrival times are distinct.

Return the chair number that the friend numbered targetFriend will sit on.

Example 1:
Input: times = [[1,4],[2,3],[4,6]], targetFriend = 1
Output: 1
Explanation: 
- Friend 0 arrives at time 1 and sits on chair 0.
- Friend 1 arrives at time 2 and sits on chair 1.
- Friend 1 leaves at time 3 and chair 1 becomes empty.
- Friend 0 leaves at time 4 and chair 0 becomes empty.
- Friend 2 arrives at time 4 and sits on chair 0.
Since friend 1 sat on chair 1, we return 1.

Example 2:
Input: times = [[3,10],[1,5],[2,6]], targetFriend = 0
Output: 2
Explanation: 
- Friend 1 arrives at time 1 and sits on chair 0.
- Friend 2 arrives at time 2 and sits on chair 1.
- Friend 0 arrives at time 3 and sits on chair 2.
- Friend 1 leaves at time 5 and chair 0 becomes empty.
- Friend 2 leaves at time 6 and chair 1 becomes empty.
- Friend 0 leaves at time 10 and chair 2 becomes empty.
Since friend 0 sat on chair 2, we return 2.
 

Constraints:
n == times.length
2 <= n <= 104
times[i].length == 2
1 <= arrivali < leavingi <= 105
0 <= targetFriend <= n - 1
Each arrivali time is distinct.

*/

/*
Approach: 
First make the hasher to identify that if a person is coming at some time or not so that we need to iterate the whole array everytime
then make 2 priority Queues, one for allotedSeats to the person came at some time
then second for vacant seats (seats left by each person)

then finally a loop from 0 to the arrival of the targetFriend, and keep adding the removing the person from the respective queue.
final value will be the currentAllotedSeat
*/

/**
 * @param {number[][]} times
 * @param {number} targetFriend
 * @return {number}
 */


 class QElement {
    constructor(element, priority)
    {
        this.element = element;
        this.priority = priority;
    }
}


class PriorityQueue1 {
 
    // An array is used to implement priority
    constructor()
    {
        this.items = [];
    }

    // enqueue function to add element
    // to the queue as per priority
    enqueue(element, priority)
    {
        // creating object from queue element
        var qElement = new QElement(element, priority);
        var contain = false;

        // iterating through the entire
        // item array to add element at the
        // correct location of the Queue
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                // Once the correct location is found it is
                // enqueued
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }

        // if the element have the highest priority
        // it is added at the end of the queue
        if (!contain) {
            this.items.push(qElement);
        }
    }
    dequeue()
    {
        // return the dequeued element
        // and remove it.
        // if the queue is empty
        // returns Underflow
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }
    isEmpty()
    {
        // return true if the queue is empty.
        return this.items.length == 0;
    }
    removeItemFromMiddle(aTime)
    {
        for (var i = 0; i < this.items.length; i++){
            if(this.items[i].element === aTime){
                let removeitem = this.items.splice(i, 1);
                return removeitem[0].priority;
            }
        }
    }
}

var smallestChair = function(times, targetFriend) {
    let arrival  = {};
    let departure = {};
    for(let i=0; i<times.length; i++){
        arrival[times[i][0]] = times[i][0];
        if(departure[times[i][1]]) {
            let a = departure[times[i][1]];
            a.push(times[i][0]);
            departure[times[i][1]] = a;
        } else { 
            departure[times[i][1]] = [times[i][0]];
        }
    }

    let totalChairNumber = -1;
    let currentallotedNumber = -1;

    let allotedSeats = new PriorityQueue1();
    let vacantSeats = new PriorityQueue1();


    for(let j = 0; j<=times[targetFriend][0]; j++){
        if (departure[j]) { 
            departure[j].forEach((element) => {
                let seatVacant  = allotedSeats.removeItemFromMiddle(element);
                vacantSeats.enqueue(seatVacant, seatVacant);
            });
        }

        if (arrival[j]) {
            if(vacantSeats.isEmpty()){
                totalChairNumber++;
                currentallotedNumber = totalChairNumber;
                allotedSeats.enqueue(arrival[j], currentallotedNumber);
            } else {
                let chair = vacantSeats.dequeue();
                currentallotedNumber = chair.priority;
                allotedSeats.enqueue(arrival[j], currentallotedNumber);

            }
        }
        
    }
    return currentallotedNumber;
};


