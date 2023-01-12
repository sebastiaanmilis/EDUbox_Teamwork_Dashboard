import React from 'react';
import {RadialAvatar} from "./RadialAvatar";
import {nws_blue, OPACITY, ROLE_TO_AVATAR} from "/imports/api/constants"
import {addAlpha} from "../../../api/auxFunctions";
import Stack from "@mui/material/Stack";
import {RocketChart} from "./RocketChart";


const roles = ["pilot", "engineer", "coordinator", "scientist"]

export const RTMTeam = ({data}) => {
    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
        >
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={-5}
            >
                {roles.map((key, index) => <RadialAvatar
                    data={[{name: key, value: data[key], fill: addAlpha(nws_blue, OPACITY)}]}
                    avatar={ROLE_TO_AVATAR[key]}
                    key={index}/>)}
            </Stack>
            <RocketChart score={data.spacecraft}></RocketChart>
        </Stack>
    );
};