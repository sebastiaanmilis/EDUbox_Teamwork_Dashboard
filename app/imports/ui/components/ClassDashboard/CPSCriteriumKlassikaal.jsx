import React from 'react';
import Typography from "@mui/material/Typography";
import {BarChart, Bar, XAxis, YAxis, LabelList} from 'recharts';
import {CRITERIUM_TO_COLOR, CRITERIUM_TO_LONG, OPACITY, OPACITY_BACKGROUND} from "../../../api/constants";
import {addAlpha, toPercentage} from "../../../api/auxFunctions";

export const CPSCriteriumKlassikaal = ({criterium, score}) => {

    let data = [{percentage: toPercentage(score), name: criterium}]

    return (
        <>
            <Typography variant="CPSCriteriaTitle">
                {CRITERIUM_TO_LONG[criterium]}
            </Typography>
            <BarChart layout="vertical" width={500} height={58}
                      margin={{top: 0, right: 5, bottom: 18, left: 5}}
                      data={data}>
                <YAxis hide type="category" dataKey="name"/>
                <XAxis hide ticks={[0, 20, 40, 60, 80, 100]} tickLine={false}
                       type="number"/>
                <Bar layout="vertical" barSize={20} dataKey="percentage"
                     fill={addAlpha(CRITERIUM_TO_COLOR[criterium], OPACITY)}
                     background={{
                         fill: addAlpha(CRITERIUM_TO_COLOR[criterium], OPACITY_BACKGROUND),
                         radius: [10, 10, 10, 10]
                     }}
                     radius={[10, 10, 10, 10]}>
                    <LabelList dataKey="percentage" formatter={(value) => value + "%"} position="insideRight"
                               fill="white"/>
                </Bar>
            </BarChart>
        </>
    );
};