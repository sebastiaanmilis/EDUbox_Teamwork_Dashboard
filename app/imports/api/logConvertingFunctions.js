import _ from "underscore";
import {maxEDUboxSlideNumber, QUESTION_TO_CRITERIUM, SLIDE_TO_TIME_CATEGORY} from "./constants";
import {toRounded} from "/imports/api/auxFunctions"

// FILTERS
const timeFilter = (arr) => _.filter(arr, (log) => log.pagenumber !== undefined);
const rtmFilter = (arr) => _.filter(arr, (log) => (log.pagenumber === 54 && log.buttonPressed === "button-answer"));
const questionsFilter = (arr) => _.filter(arr, (log) => (log.pagetype === "questionnaire" && log.buttonPressed === "button-answer"));
// TIME
const generateEmptySlideTimes = () => {
    let obj = {}
    for (let i = 0; i < (maxEDUboxSlideNumber + 1); i++) {
        obj[i] = 0;
    }
    return obj
}

const getRTMResult = (logs) => {
    let sortedLogs = _.sortBy(logs, "insertedAt");
    return sortedLogs[0].feedback;
}

const getAverageRTM = (rtm) => {
    let values = Object.values(rtm);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = (sum / values.length) || 0;
    return toRounded(avg);
}

// Converts logs into slide times (for one team)
const getSlideTimes = (logs) => {
    let sortedLogs = _.sortBy(logs, "insertedAt");
    let slideTimes = _.reduce(sortedLogs, ({previousNumber, previousTime, tempSlideTimes}, log) => {
        if (log.buttonPressed === "initial-load" || (log.pagenumber === 1 && log.buttonPressed === "button-next")) {
            return {
                previousNumber: log.pagenumber,
                previousTime: log.insertedAt,
                tempSlideTimes: tempSlideTimes
            }
        } else {
            tempSlideTimes[previousNumber] = tempSlideTimes[previousNumber] + (log.insertedAt - previousTime);
            return {
                previousNumber: log.pagenumber,
                previousTime: log.insertedAt,
                tempSlideTimes: tempSlideTimes
            }
        }
    }, {
        previousNumber: 0,
        previousTime: new Date(),
        tempSlideTimes: generateEmptySlideTimes()
    }).tempSlideTimes;
    return slideTimes;
}
// Gets for all teams in this class the slide times
export const getTimeData = (logs) => {
    let timeLogs = timeFilter(logs);
    let logsByGroup = _.groupBy(timeLogs, "groupName");
    let timePerSlideByGroup = _.mapObject(logsByGroup, getSlideTimes);
    return timePerSlideByGroup;
}

export const getTimeDataTeam = (logs, teamName) => {
    let tempTimeTeam = {
        plan: 0,
        vertrouwen: 0,
        rollen: 0,
        lijn: 0,
        situational: 0,
        rtm: 0,
        other: 0
    }
    let tempTimeKlas = {
        plan: 0,
        vertrouwen: 0,
        rollen: 0,
        lijn: 0,
        situational: 0,
        rtm: 0,
        other: 0
    }
    let timeData = getTimeData(logs);
    console.log(timeData);
    Object.entries(timeData).forEach(([team, timeConsumption]) => {
        let isTeam = (team === teamName);
        Object.keys(timeConsumption).forEach((key) => {
            tempTimeKlas[SLIDE_TO_TIME_CATEGORY(key)] += timeConsumption[key];
            if (isTeam) {
                tempTimeTeam[SLIDE_TO_TIME_CATEGORY(key)] += timeConsumption[key];
            }
        })
    })
    Object.keys(tempTimeTeam).forEach((key) => tempTimeTeam[key] = (tempTimeTeam[key] / (tempTimeKlas[key] / Object.keys(timeData).length || 0) || 0));
    delete tempTimeTeam.other;
    return tempTimeTeam;
}

export const getRTMData = (logs) => {
    let rtmLogs = rtmFilter(logs);
    let logsByGroup = _.groupBy(rtmLogs, "groupName");
    let rtmResultByGroup = _.mapObject(logsByGroup, getRTMResult);
    return rtmResultByGroup;
}

export const getRTMDataTeam = (logs, teamName) => {
    let rtmResultByGroup = getRTMData(logs);
    if (rtmResultByGroup[teamName] === undefined) {
        return {"spacecraft": 0, "pilot": 0, "engineer": 0, "coordinator": 0, "scientist": 0}
    }
    return rtmResultByGroup[teamName];
}

export const getRTMDataKlassikaal = (logs) => {
    let rtmResultByGroup = getRTMData(logs);
    let averageByGroup = _.mapObject(rtmResultByGroup, getAverageRTM);
    return averageByGroup;
}

export const getQuestionsDataKlassikaal = (logs) => {
    let questionLogs = questionsFilter(logs);
    let CPSCriteriaTemp = {plan: 0, vertrouwen: 0, rollen: 0, lijn: 0};
    let questionsTemp = {
        "question-1": 0,
        "question-2": 0,
        "question-3": 0,
        "question-4": 0,
        "question-5": 0,
        "question-6": 0,
        "question-7": 0,
        "question-8": 0,
        "question-9": 0,
        "question-10": 0,
        "question-11": 0,
        "question-12": 0,
    };
    questionLogs.forEach((log) => {
        Object.entries(log.feedback).forEach(([question, value]) => {
            questionsTemp[question] += parseInt(value);
            CPSCriteriaTemp[QUESTION_TO_CRITERIUM(question)] += parseInt(value);
        });
    });
    Object.keys(questionsTemp).forEach((key) => questionsTemp[key] = (questionsTemp[key] / questionLogs.length) || 0);
    Object.keys(CPSCriteriaTemp).forEach((key) => CPSCriteriaTemp[key] = (CPSCriteriaTemp[key] / (questionLogs.length * 3)) || 0);
    return {CPSCriteria: CPSCriteriaTemp, vragen: questionsTemp};

}

export const getQuestionsDataTeam = (logs, teamName) => {
    let questionLogs = questionsFilter(logs);
    let CPSCriteriaTemp = {plan: 0, vertrouwen: 0, rollen: 0, lijn: 0};
    let questionsTemp = {
        "question-1": 0,
        "question-2": 0,
        "question-3": 0,
        "question-4": 0,
        "question-5": 0,
        "question-6": 0,
        "question-7": 0,
        "question-8": 0,
        "question-9": 0,
        "question-10": 0,
        "question-11": 0,
        "question-12": 0,
    };
    let CPSCriteriaTeamTemp = {plan: 0, vertrouwen: 0, rollen: 0, lijn: 0};
    let questionsTeamTemp = {
        "question-1": 0,
        "question-2": 0,
        "question-3": 0,
        "question-4": 0,
        "question-5": 0,
        "question-6": 0,
        "question-7": 0,
        "question-8": 0,
        "question-9": 0,
        "question-10": 0,
        "question-11": 0,
        "question-12": 0,
    };
    let teamLogNumber = 0;
    questionLogs.forEach((log) => {
        let isTeamLog = (log.groupName === teamName);
        if (isTeamLog) {
            teamLogNumber += 1
        }
        Object.entries(log.feedback).forEach(([question, value]) => {
            questionsTemp[question] += parseInt(value);
            CPSCriteriaTemp[QUESTION_TO_CRITERIUM(question)] += parseInt(value);
            if (isTeamLog) {
                questionsTeamTemp[question] += parseInt(value);
                CPSCriteriaTeamTemp[QUESTION_TO_CRITERIUM(question)] += parseInt(value);
            }
        });
    });
    Object.keys(questionsTemp).forEach((key) => questionsTemp[key] = (questionsTemp[key] / questionLogs.length) || 0);
    Object.keys(CPSCriteriaTemp).forEach((key) => CPSCriteriaTemp[key] = (CPSCriteriaTemp[key] / (questionLogs.length * 3)) || 0);
    Object.keys(questionsTeamTemp).forEach((key) => questionsTeamTemp[key] = (questionsTeamTemp[key] / teamLogNumber) || 0);
    Object.keys(CPSCriteriaTeamTemp).forEach((key) => CPSCriteriaTeamTemp[key] = (CPSCriteriaTeamTemp[key] / (teamLogNumber * 3)) || 0);
    return {
        CPSCriteriaKlasgemiddelde: CPSCriteriaTemp,
        vragenKlasgemiddelde: questionsTemp,
        CPSCriteria: CPSCriteriaTeamTemp,
        vragen: questionsTeamTemp
    };

}