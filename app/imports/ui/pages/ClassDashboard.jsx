import {Meteor} from 'meteor/meteor';
import React from "react";
import {CPSCriteriaKlassikaal} from "../components/ClassDashboard/CPSCriteriaKlassikaal";
import {CPSHighlightsKlassikaal} from "../components/ClassDashboard/CPSHighlightsKlassikaal";
import _ from 'underscore'
import {MAP_QUESTIONS_SHORT} from "../../api/constants";
import {useParams} from "react-router-dom";
import {useTracker} from "meteor/react-meteor-data";
import {WidgetAlwaysOn} from "../components/WidgetAlwaysOn";
import {EDUboxLoggingCollection} from "../../db/EDUboxLoggingCollection";
import {getQuestionsDataKlassikaal, getRTMDataKlassikaal} from "../../api/logConvertingFunctions";
import {toPercentage} from "../../api/auxFunctions";
import {RTMKlassikaal} from "../components/ClassDashboard/RTMKlassikaal";
import Stack from "@mui/material/Stack";


export const ClassDashboard = () => {
    const params = useParams();
    const className = decodeURIComponent(params.className);

    // Data from logs sent by EDUbox
    const {logData, isLoading} = useTracker(() => {
        const noDataAvailable = {logData: []};

        const logSubscription = Meteor.subscribe('logs');
        if (!logSubscription.ready()) {
            return {...noDataAvailable, isLoading: true};
        }

        return {logData: EDUboxLoggingCollection.find({classId: className}).fetch()};
    });

    let classData = getQuestionsDataKlassikaal(logData);
    let rtmData = getRTMDataKlassikaal(logData);


    let sortedQuestions = _.sortBy(Object.entries(classData.vragen), ([, value]) => value);
    let reduced = sortedQuestions.reduce((array, [key, value]) => {
        array.push({
            aspect: key,
            aspect_short: MAP_QUESTIONS_SHORT[key],
            Klasgemiddelde: toPercentage(value)
        });
        return array;
    }, []);
    let worstQuestions = reduced.slice(0, 3);
    let bestQuestions = reduced.slice(reduced.length - 3, reduced.length - 1)

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <WidgetAlwaysOn title="Missie naar Mars" content={<RTMKlassikaal data={rtmData}/>}/>
                <WidgetAlwaysOn title="Hoe word je een dreamteam?"
                                content={<CPSCriteriaKlassikaal data={classData.CPSCriteria}/>}/>
            </Stack>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <WidgetAlwaysOn title="Uitblinkers" content={<CPSHighlightsKlassikaal data={bestQuestions}/>}/>
                <WidgetAlwaysOn title="Werkpuntjes" content={<CPSHighlightsKlassikaal data={worstQuestions}/>}/>
            </Stack>
        </Stack>
    );
};