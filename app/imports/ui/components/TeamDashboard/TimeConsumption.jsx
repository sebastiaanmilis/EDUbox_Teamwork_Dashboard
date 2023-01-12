import React from 'react';
import {PolarRadiusAxis, PolarAngleAxis, RadarChart, Radar, Legend} from "recharts";
import {addAlpha} from "../../../api/auxFunctions";
import {nws_blue, blue, OPACITY, OPACITY_BACKGROUND, CATEGORY_TO_SHORT} from "../../../api/constants";


export const TimeConsumption = ({data}) => {
    let inputData = Object.entries(data).map(([category, value]) => ({
        name: CATEGORY_TO_SHORT[category],
        value: value,
        one: 1
    }));

    return (
        <RadarChart outerRadius={90} width={450} height={325} data={inputData}>
            <PolarAngleAxis dataKey="name"/>
            <PolarRadiusAxis axisLine={false} tick={false}/>
            <Radar name="Dit team" dataKey="value" stroke={addAlpha(nws_blue, OPACITY)} fill={nws_blue}
                   fillOpacity={OPACITY_BACKGROUND / OPACITY}/>
            <Radar name="Klasgemiddelde" dataKey="one" stroke={addAlpha(blue, OPACITY)} fill={blue}
                   fillOpacity={OPACITY_BACKGROUND / OPACITY}/>
            <Legend/>
        </RadarChart>
    );


};
