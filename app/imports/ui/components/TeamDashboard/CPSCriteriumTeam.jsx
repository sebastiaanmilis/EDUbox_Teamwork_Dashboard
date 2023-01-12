import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import {CRITERIUM_TO_COLOR, CRITERIUM_TO_LONG, grijs, OPACITY, OPACITY_BACKGROUND} from "../../../api/constants";
import {Bar, BarChart, LabelList, XAxis, YAxis} from "recharts";
import {addAlpha, toPercentage} from "../../../api/auxFunctions";

export const CPSCriteriumTeam = ({criterium, score, gemiddelde}) => {

    const [hover, setHover] = useState(false);

    let data = [{
        percentageTeam: toPercentage(score),
        percentageKlas: toPercentage(gemiddelde),
        name: criterium
    }]
    return (
        <>
            <Typography variant="CPSCriteriaTitle">
                {CRITERIUM_TO_LONG[criterium]}
            </Typography>
            <BarChart layout="vertical" width={500} height={58}
                      margin={{top: 0, right: 5, bottom: 18, left: 5}}
                      data={data} barGap={0}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}>
                <YAxis hide type="category" dataKey="name"/>
                <XAxis hide ticks={[0, 20, 40, 60, 80, 100]} tickLine={false}
                       type="number"/>
                <Bar layout="vertical" barSize={17} dataKey="percentageTeam"
                     fill={addAlpha(CRITERIUM_TO_COLOR[criterium], OPACITY)}
                     background={{
                         fill: addAlpha(CRITERIUM_TO_COLOR[criterium], OPACITY_BACKGROUND),
                         radius: [10, 10, 10, 10]
                     }}
                     radius={[10, 10, 10, 10]}>
                    {hover &&
                        <LabelList dataKey="percentageTeam" formatter={(value) => value + "%"} position="insideRight"
                                   fill="white"/>}
                </Bar>
                <Bar layout="vertical" barSize={17} dataKey="percentageKlas"
                     fill={grijs} background={{fill: addAlpha(grijs, OPACITY_BACKGROUND), radius: [10, 10, 10, 10]}}
                     radius={[10, 10, 10, 10]}>
                    {hover &&
                        <LabelList dataKey="percentageKlas" formatter={(value) => value + "%"} position="insideRight"
                                   fill="white"/>}
                    <LabelList position="insideLeft" fill="white">
                        Klasgemiddelde
                    </LabelList>
                </Bar>
            </BarChart>
        </>
    );
};

// <LabelList dataKey="percentageTeam" formatter={(value) => value + "%"} position="right"/>
// Prcoent bij hover