/*
855. Exam Room
Difficulty: Medium

There is an exam room with n seats in a single row labeled from 0 to n - 1.
When a student enters the room, they must sit in the seat that maximizes the distance to the closest person. If there are multiple such seats, 
they sit in the seat with the lowest number. If no one is in the room, then the student sits at seat number 0.
Design a class that simulates the mentioned exam room.

Implement the ExamRoom class:
ExamRoom(int n) Initializes the object of the exam room with the number of the seats n.
int seat() Returns the label of the seat at which the next student will set.
void leave(int p) Indicates that the student sitting at seat p will leave the room. It is guaranteed that there will be a student sitting at seat p.
 

Example 1:
Input
["ExamRoom", "seat", "seat", "seat", "seat", "leave", "seat"]
[[10], [], [], [], [], [4], []]
Output
[null, 0, 9, 4, 2, null, 5]

Explanation
ExamRoom examRoom = new ExamRoom(10);
examRoom.seat(); // return 0, no one is in the room, then the student sits at seat number 0.
examRoom.seat(); // return 9, the student sits at the last seat number 9.
examRoom.seat(); // return 4, the student sits at the last seat number 4.
examRoom.seat(); // return 2, the student sits at the last seat number 2.
examRoom.leave(4);
examRoom.seat(); // return 5, the student sits at the last seat number 5.

Constraints:
1 <= n <= 109
It is guaranteed that there is a student sitting at seat p.
At most 104 calls will be made to seat and leave.
*/




/*
Approach:
FOR EXAMROOM:
just create a new exam room when Exam room is initialised

FOR SEAT:
if length is 0, that is no seat has been occupied then return 0;

else iterate through the array and craete an avg with i and i+1, find diff btw avg and seat[i]
if that is greater than max. then result is avg.

now check boundary conditions:
first left boundary:
if seats[0] is greater than mx then store seats[0] in max and 0 in res

then right boundary:
check the diff between the total seats and the last seat occupied. if the diff is greater than max then that is max and result is len-1

push it in the seats array sort it and return the value


FOR LEAVE:
Simply find the index of the seat and remove it from the array 
*/









/**
 * @param {number} n
 */
 var ExamRoom = function(n) {
    this.len=n;//For Length
    this.seats=new Array();//For Storing Used Seats (Sorted)
};

/**
 * @return {number}
 */
ExamRoom.prototype.seat = function() {
    /*If all seats empty*/
    if(this.seats.length<=0){
        this.seats.push(0);
        return 0;
    }

    let mx=-1;//for max diff
    let res=-1;//for seat-index
    
    /*
    Compare every 2 closest pairs of seats array
    */
    for(let i=0;i<this.seats.length-1;i++){
        let avg=Math.floor((this.seats[i]+this.seats[i+1])/2);
        let diff=avg-this.seats[i];
        if(diff>mx){
            mx=diff;
            res=avg;
        }
    }
    
    /*Left Boundary*/
    if(this.seats[0]>=mx){
        mx=this.seats[0];
        res=0;
    }
    
    /*Right Boundary*/
    if((this.len-1)-this.seats[this.seats.length-1]>mx){
        mx=(this.len-1)-this.seats[this.seats.length-1];
        res=(this.len-1);
    }

    // /*Insert and sorted order*/
    this.seats.push(res);
    this.seats.sort((a, b) => a - b);

    /*Return result*/
    return res;
};

/** 
 * @param {number} p
 * @return {void}
 */
ExamRoom.prototype.leave = function(p) {
    let ind=this.seats.indexOf(p);
    this.seats.splice(ind,1);
};

/** 
 * Your ExamRoom object will be instantiated and called as such:
 * var obj = new ExamRoom(n)
 * var param_1 = obj.seat()
 * obj.leave(p)
 */