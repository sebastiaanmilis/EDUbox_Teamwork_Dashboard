import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import {getDeviceID} from "../../api/auxFunctions";

export const WidgetAlwaysOn = ({title, content, order}) => {

    return (
        <Paper elevation={3}
               sx={{
                   height: "26.5rem",
                   padding: 2,
                   margin: 1,
                   order: order
               }}>
            <Stack alignItems="center" spacing={1}>
                <Typography component="h2" variant="widgetTitle">
                    {title}
                </Typography>
                {content}
            </Stack>
        </Paper>
    );
};
