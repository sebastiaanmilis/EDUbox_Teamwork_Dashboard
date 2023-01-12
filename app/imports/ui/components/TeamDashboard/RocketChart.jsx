import React from 'react';
import {Bar, BarChart, LabelList, XAxis, YAxis} from "recharts";
import {addAlpha} from "../../../api/auxFunctions";
import {nws_blue, OPACITY, OPACITY_BACKGROUND, ROLE_TO_AVATAR} from "../../../api/constants";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";


export const RocketChart = ({score}) => {
    let data = [{name: "spacecraft", percentage: score}]

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
            marginTop={-6}
        >
            <Box
                component="img"
                sx={{
                    height: 150,
                    width: 102,
                    transform: "rotate(90deg)"
                }}
                alt="Pilot"
                src={ROLE_TO_AVATAR.spacecraft}
            />
            <BarChart layout="vertical" width={500} height={58}
                      data={data}>
                <YAxis hide type="category" dataKey="name"/>
                <XAxis hide ticks={[0, 20, 40, 60, 80, 100]} tickLine={false}
                       type="number"/>
                <Bar layout="vertical" barSize={20} dataKey="percentage"
                     fill={addAlpha(nws_blue, OPACITY)}
                     background={{
                         fill: addAlpha(nws_blue, OPACITY_BACKGROUND),
                         radius: [10, 10, 10, 10]
                     }}
                     radius={[10, 10, 10, 10]}>
                    <LabelList dataKey="percentage" formatter={(value) => value + "%"} position="insideRight"
                               fill="white"/>
                </Bar>
            </BarChart>
        </Stack>

    );

};