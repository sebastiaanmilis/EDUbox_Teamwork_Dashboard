import React from 'react';
import {CPSCriteriumKlassikaal} from "./CPSCriteriumKlassikaal";
import Box from "@mui/material/Box";

export const CPSCriteriaKlassikaal = ({data}) => {
    return (
        <Box pt={0.5}>
            {Object.entries(data).map(([criterium, score], index) => <CPSCriteriumKlassikaal
                criterium={criterium}
                score={score}
                key={index}/>)}
        </Box>
    );
};