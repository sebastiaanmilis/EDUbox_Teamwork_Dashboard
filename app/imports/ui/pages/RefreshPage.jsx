import {Meteor} from 'meteor/meteor';
import React, {useState} from "react"
import {Button} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const RefreshPage = () => {
    const [mostRecentRefresh, setMostRecentRefresh] = useState("Never");

    const fixMissingClassId = () => {
        Meteor.call('fixMissingClassId');
        setMostRecentRefresh(new Date());
    };

    return (
        <Container>
            <Button variant="contained" onClick={fixMissingClassId}>Fix missing classId</Button>
            <Typography>
                {mostRecentRefresh.toString()}
            </Typography>
        </Container>
    );
}