import {Meteor} from 'meteor/meteor';
import {EDUboxLoggingCollection} from '/imports/db/EDUboxLoggingCollection';

Meteor.methods({
    'fixMissingClassId'() {
        EDUboxLoggingCollection.update({
            groupName: {$in: ['team1', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7', 'team8', 'team9', 'team10', 'team11']},
            classId: "null"
        }, {$set: {classId: "stem"}}, {multi: true});
    }
});