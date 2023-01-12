import React from 'react';
import {PolarAngleAxis, RadialBar, RadialBarChart, Tooltip} from "recharts";
import Box from "@mui/material/Box";
import {grijs, OPACITY,} from "../../../api/constants";
import {addAlpha, reverse} from "../../../api/auxFunctions";


export const RadialAvatar = ({data, avatar}) => {
    const CustomTooltip = ({active, payload, label}) => {
        return (
            <Box
                component="img"
                sx={{
                    height: 100,
                    width: 100
                }}
                alt="Pilot"
                src={avatar}
            />
        );
    };

    return (
        <RadialBarChart
            width={230}
            height={230}
            data={data}
            innerRadius="70%"
            outerRadius="90%"
            startAngle={225}
            endAngle={-45}
        >
            <PolarAngleAxis type="number" dataKey="value" ticks={[0, 20, 40, 60, 80, 100]}
                            axisLine={false}
                            tick={false}/>
            <RadialBar background={{
                fill: addAlpha(grijs, OPACITY)
            }}
                       label={{
                           fill: "white",
                           rotate: 180,
                           position: 'insideEnd',
                           formatter: (value) => reverse(value + "%")
                       }}
                       dataKey="value"
                       clockWise={true}>
            </RadialBar>
            <Tooltip position={{x: 65, y: 65}} cursor={{fill: 'transparent'}}
                     wrapperStyle={{
                         outline: "none", visibility: 'visible',
                         width: '100%',
                     }}
                     content={<CustomTooltip/>}/>
        </RadialBarChart>
    );
}