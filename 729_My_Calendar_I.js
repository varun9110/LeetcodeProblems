/**
 * 729. My Calendar I
 * Difficulty: Medium
 * 
 * You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a double booking.
A double booking happens when two events have some non-empty intersection (i.e., some moment is common to both events.).
The event can be represented as a pair of integers start and end that represents a booking on the half-open interval [start, end), 
the range of real numbers x such that start <= x < end.
Implement the MyCalendar class:
MyCalendar() Initializes the calendar object.
boolean book(int start, int end) Returns true if the event can be added to the calendar successfully without causing a double booking. 
Otherwise, return false and do not add the event to the calendar.
 
Example 1:
Input
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output
[null, true, false, true]

Explanation
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.
 

Constraints:

0 <= start < end <= 109
At most 1000 calls will be made to book.
 */

/**
 * Idea:
Since the bookings are not allowed to overlap, we'll naturally need to keep the data sorted in some way so that we can find the proper insertion position of each new booking, and to check for the validity of the booking.

The naive solution here would be to use an array and resort it each time, at a time complexity of O(N * log N). Alternately, we could use a binary search to find the right position, then insert the booking at that position, but that would take O(log N) time for the binary search and another O(N) time for the insertion.

(Important Note: Apparently, each of the four languages except Javascript has a sorted data structure based on a red-black tree structure which allows for insertion in only O(log N) time, rather than the O(N) time it would take for a standard array insertion. This, combined with the O(log N) time for the binary search makes this approach faster than a linked list approach. See the updated section below for the explanation.)

Python, Java, & C++:
Python, Java, and C++ allow for a sorted data structure with only a O(log N) insertion. In this approach, we first use a binary search function to find the proper insertion position, then compare the start and end of the new booking to the existing calendar entries to check for the validity of the new booking.

To avoid having to compare more than one calender entry for validation (as finding another entry might take another O(log N) time), we can store the entries in reverse order in calendar ({end, start}), then find the upper bound of the booking using the proper order ({start, end}).

Let's consider a booking gap that looks like this:

  |---------|               |---------|
If we're comparing start vs start in our binary search, we could end up with the following scenarios:

  S---------|               S---------|
   <----------------------->                 // binary search range
       S---------|                           // possibility #1
               S---------|                   // possibility #2
                       S---------|           // possibility #3
This means that we'll have to access both surrounding bookings to check if the new booking clears both the previous booking's end and the next booking's start. If, instead, we store the bookings with start and end flipped, the binary search will automatically clear the previous booking's end, which means those three scenarios shift to this:

  |---------E               |---------E
             <----------------------->       // binary search range
               S---------|                   // possibility #1
                       S---------|           // possibility #2
                                 S---------| // possibility #3
This means that we only have to access the booking returned by the binary search, saving us the O(log N) time for the second lookup, as well as only requiring a single conditional check (new.end <= next.start), rather than two.

If the booking is invalid, we can return false, otherwise we can insert the new booking into calendar (in reverse order) and then return true. We can also insert a tail booking upon the calendar initialization to make the comparisons easier.

Javascript:
For Javascript, we can use a linked list approach, as searching the linked list will only be O(N) time and the insertion will only be O(1) time. We should start by defining our empty bookings list (head) with a head node and a tail node as bookends for the booking data.

For the book function, we will then iterate through the linked list until we find the booking that begins after our attempted booking start (curr). We should also remember to keep track of the last node, as well, so that we can stitch the new booking into the list.

Once we've located the proper node, we should check to see if the new booking will overlap, and return false if it does. Otherwise, we should create our new node, and insert it between last and curr, then return true.

Time Complexity:
single booking w/ sorted tree: O(log N) where N is the length of the calendar
single booking w/ linked list: O(N)
complete series w/ sorted tree: O(N * log N)
complete series w/ linked list: O(N^2)
Space Complexity: O(N) for the calendar
 */



var MyCalendar = function () {
    this.val = [];
};

/** 
 * @param {number} start 
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
    let left = 0
    let right = this.val.length - 1;

    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);
        const [s, e] = this.val[mid];
        if (s < end && e > start) return false;

        if (start >= e) left = mid + 1;
        else right = mid - 1;

    }
    this.val.splice(left, 0, [start, end]);
    return true;
};

/** 
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */