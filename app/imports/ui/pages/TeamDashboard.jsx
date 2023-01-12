import {Meteor} from 'meteor/meteor';
import React from "react";
import Box from "@mui/material/Box";
import {CPSCriteriaTeam} from "../components/TeamDashboard/CPSCriteriaTeam";
import {CPSHighlightsTeam} from "../components/TeamDashboard/CPSHighlightsTeam";
import {TimeConsumption} from "../components/TeamDashboard/TimeConsumption";
import {useParams} from "react-router-dom";
import {useTracker} from "meteor/react-meteor-data";
import {WidgetAlwaysOn} from "../components/WidgetAlwaysOn";
import {toPercentage} from "../../api/auxFunctions";
import {MAP_QUESTIONS_SHORT} from "../../api/constants";
import {EDUboxLoggingCollection} from "../../db/EDUboxLoggingCollection";
import {getQuestionsDataTeam, getRTMDataTeam, getTimeDataTeam} from "../../api/logConvertingFunctions";
import {RTMTeam} from "../components/TeamDashboard/RTMTeam";

export const TeamDashboard = () => {

    const params = useParams();
    const className = decodeURIComponent(params.className);
    const teamName = decodeURIComponent(params.teamName);

    const {logData, isLoading} = useTracker(() => {
        const noDataAvailable = {logData: []};

        const logSubscription = Meteor.subscribe('logs');
        if (!logSubscription.ready()) {
            return {...noDataAvailable, isLoading: true};
        }

        return {logData: EDUboxLoggingCollection.find({classId: className}).fetch()};
    });

    let teamData = getQuestionsDataTeam(logData, teamName);
    let rtmData = getRTMDataTeam(logData, teamName);
    let timeData = getTimeDataTeam(logData, teamName);
    console.log(timeData);

    let sortedQuestions = _.sortBy(Object.entries(teamData.vragen), ([vraag, value]) => value - teamData.vragenKlasgemiddelde[vraag]);
    let reduced = sortedQuestions.reduce((array, [key, value]) => {
        array.push({
            aspect: key,
            aspect_short: MAP_QUESTIONS_SHORT[key],
            Team: toPercentage(value),
            Klas: toPercentage(teamData.vragenKlasgemiddelde[key])
        });
        return array;
    }, []);
    let worstQuestions = reduced.slice(0, 3);
    let bestQuestions = reduced.slice(reduced.length - 3, reduced.length - 1).reverse();

    const widgetTitles = ["Missie naar Mars", "Hoe word je een dreamteam?", "Uitblinkers", "Werkpuntjes", "Tijdsbesteding"];
    const widgetContent = [<RTMTeam data={rtmData}/>, <CPSCriteriaTeam data={teamData.CPSCriteria}
                                                                       gemiddelden={teamData.CPSCriteriaKlasgemiddelde}/>,
        <CPSHighlightsTeam data={bestQuestions}/>,
        <CPSHighlightsTeam data={worstQuestions}/>, <TimeConsumption data={timeData}/>];

    return (
        <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }}>
            {widgetTitles.map((title, i) => <WidgetAlwaysOn title={title} content={widgetContent[i]}
                                                            order={i + 1} key={i}/>)}
        </Box>
    );
};
