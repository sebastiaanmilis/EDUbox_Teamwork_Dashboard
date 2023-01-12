import React from 'react';
import {BarChart, Bar, Text, XAxis, YAxis, Tooltip, Cell} from 'recharts';
import {addAlpha} from "../../../api/auxFunctions";
import {
    CRITERIUM_TO_COLOR,
    grijs, MAP_QUESTIONS_LONG, MAP_QUESTIONS_SHORT,
    nws_blue,
    OPACITY,
    QUESTION_TO_CRITERIUM
} from "../../../api/constants";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const CustomizedAxisTick = ({x, y, payload}) => {
    return (
        <Text fill={nws_blue} x={x} y={y} width={100} textAnchor="middle"
              verticalAnchor="start">{MAP_QUESTIONS_SHORT[payload.value]}</Text>
    );
}

const CustomTooltip = ({active, payload, label}) => {
    if (active && payload && payload.length) {
        return (
            <Stack bgcolor="white" p={1}>
                <Typography variant="body1">{MAP_QUESTIONS_LONG[label]}</Typography>
                <Typography variant="body2">{"Ons team: " + payload[0].value + "%"}</Typography>
                <Typography variant="body2">{"Klasgemiddelde: " + payload[1].value + "%"}</Typography>
            </Stack>
        );
    }

    return null;
};


export const CPSHighlightsTeam = ({data}) => {

    return (
        <BarChart width={data.length * 175} height={350} data={data} barGap={0} barCategoryGap="25%">
            <XAxis dataKey="aspect" height={50} tickLine={false} tick={<CustomizedAxisTick/>} interval={0}/>
            <YAxis hide ticks={[0, 20, 40, 60, 80, 100]}/>
            <Tooltip cursor={{fill: 'transparent'}} wrapperStyle={{outline: "none"}} content={<CustomTooltip/>}/>
            <Bar dataKey="Team">
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`}
                              fill={addAlpha(CRITERIUM_TO_COLOR[QUESTION_TO_CRITERIUM(entry.aspect)], OPACITY)}/>
                    ))
                }
            </Bar>
            <Bar dataKey="Klas" fill={grijs}/>
        </BarChart>
    );
}