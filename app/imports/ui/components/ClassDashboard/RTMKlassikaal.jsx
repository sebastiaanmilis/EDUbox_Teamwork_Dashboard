import React from 'react';
import {nws_blue, OPACITY, OPACITY_BACKGROUND} from "/imports/api/constants"
import {addAlpha, reverse} from "../../../api/auxFunctions";
import {PolarAngleAxis, RadialBar, RadialBarChart} from "recharts";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const RTMKlassikaal = ({data}) => {
    const dataTransformed = Object.entries(data).map(([teamName, average]) => {
        return {name: teamName, average: average, fill: addAlpha(nws_blue, OPACITY)};
    });
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <RadialBarChart
                width={325}
                height={325}
                innerRadius="30%"
                outerRadius="90%"
                data={dataTransformed}
                startAngle={0}
                endAngle={-360}
            >
                <PolarAngleAxis type="number" dataKey="value" ticks={[0, 20, 40, 60, 80, 100]}
                                axisLine={false}
                                tick={false}/>
                <RadialBar background={{
                    fill: addAlpha(nws_blue, OPACITY_BACKGROUND)
                }} label={{
                    fill: "white",
                    rotate: 180,
                    position: 'insideEnd',
                    formatter: (value) => reverse(value + "%")
                }} clockWise={true}
                           dataKey='average'/>
            </RadialBarChart>
            <Typography mt={-3} variant="CPSCriteriaTitle">
                Gemiddelde energieniveaus
            </Typography>
        </Stack>
    );
};