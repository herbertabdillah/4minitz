Template.meetings.onRendered(function () {
  $('.collapsible').collapsible();
  //$('.tooltipped').tooltip({delay: 50});
});


Template.meetings.onCreated(function () {
});

Template.meetings.helpers({
    meetings: function () {
      //return Meetings.find({});
      return Meetings.find({}, {sort: {createdAt: -1}});
    }
});

Template.meetings.events({
    "click .hidehelp": function () {
        $(".help").hide();  // use jQuery to find and hide class
    },
    "click #deleteMeeting": function() {
        console.log("Delete");
        if (confirm("Do you really want to delete this meeting type?")) {
          Meteor.call("deleteMeeting", this._id);
        }
    },
    "click #deleteMeetingDB": function() {
        console.log("Delete from DB");
          Meteor.call("deleteMeeting", this._id);
    }
});


Template.meetingRow.helpers( {
    countMinutes: function () {
        if (this.minutes && this.minutes.length > 0) {
            return this.minutes.length+" minutes";
        } else {
            return "No minutes, yet";
        }
    },

    lastMinutes: function () {
        if (this.minutes && this.minutes.length > 0) {
            lastMinutesID = this.minutes[this.minutes.length -1];
            lastMinutes = Minutes.findOne(lastMinutesID);
            if (lastMinutes) {
                return lastMinutes
            }
        }
        return false;
    }
});