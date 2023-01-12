import React from 'react';
import {CPSCriteriumTeam} from "./CPSCriteriumTeam";
import Box from "@mui/material/Box";

export const CPSCriteriaTeam = ({data, gemiddelden}) => {
    return (
        <Box pt={0.5}>
            {Object.entries(data).map(([criterium, score], index) => <CPSCriteriumTeam
                criterium={criterium}
                score={score}
                gemiddelde={gemiddelden[criterium]}
                key={index}/>)}
        </Box>
    );
};