import {Meteor} from 'meteor/meteor';
import {ClassVisualisationCollection} from "../db/ClassVisualisationCollection";
import {TeamVisualisationCollection} from "../db/TeamVisualisationCollection";
import {EDUboxLoggingCollection} from "../db/EDUboxLoggingCollection";

Meteor.publish('klas', function () {
    return ClassVisualisationCollection.find({});
});

Meteor.publish('teams', function () {
    return TeamVisualisationCollection.find({});
});

Meteor.publish('logs', function () {
    return EDUboxLoggingCollection.find({});
});