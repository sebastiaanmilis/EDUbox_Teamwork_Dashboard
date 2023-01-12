import {Meteor} from 'meteor/meteor';
import React, {useState} from "react";
import {useTracker} from "meteor/react-meteor-data";
import {ClassVisualisationCollection} from "../../db/ClassVisualisationCollection";
import {TeamVisualisationCollection} from "../../db/TeamVisualisationCollection";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import {Autocomplete, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Link} from 'react-router-dom';

export const DashboardSelector = () => {

    const [className, setClassName] = useState(null);
    const [teamName, setTeamName] = useState(null);
    const [onTeamBasis, setOnTeamBasis] = useState(false);

    const onToggleTeamBasis = () => setOnTeamBasis(!onTeamBasis);

    const {classNames, teamNames, isLoading} = useTracker(() => {
        const noDataAvailable = {classNames: [], teamNames: []};

        const klasSubscription = Meteor.subscribe('klas');
        const teamsSubscription = Meteor.subscribe('teams');

        if (!(klasSubscription.ready() && teamsSubscription.ready())) {
            return {...noDataAvailable, isLoading: true};
        }

        if (className == null) {
            return {
                classNames: ClassVisualisationCollection.find({}).fetch().map((klas) => klas.className),
                teamNames: []
            }
        }

        return {
            classNames: ClassVisualisationCollection.find({}).fetch().map((klas) => klas.className),
            teamNames: TeamVisualisationCollection.find({className: className}).fetch().map((team) => team.teamName)
        }
    });

    return (
        <Container>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <Typography>Klassikaal dashboard</Typography>
                    <Switch checked={onTeamBasis} onChange={onToggleTeamBasis}/>
                    <Typography>Dashboard per team</Typography>
                </Stack>
                <Autocomplete
                    value={className}
                    onChange={(event, newValue) => {
                        setClassName(newValue);
                    }}
                    options={classNames}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="Klas"/>}
                />
                {onTeamBasis && <Autocomplete
                    value={teamName}
                    onChange={(event, newValue) => {
                        setTeamName(newValue);
                    }}
                    options={teamNames}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="Team"/>}
                />}
                {onTeamBasis && className && teamName
                    ?
                    <Link
                        to={`/dashboard/${encodeURIComponent(className)}/${encodeURIComponent(teamName)}`}
                        style={{textDecoration: 'none'}}>
                        <Button variant="contained">Naar dashboard gaan!</Button>
                    </Link>
                    :
                    !onTeamBasis && className ? <Link
                        to={`/dashboard/${encodeURIComponent(className)}`} style={{textDecoration: 'none'}}>
                        <Button variant="contained">Naar dashboard gaan!</Button>
                    </Link> : null
                }
            </Stack>
            {isLoading && <div>Loading...</div>}
        </Container>
    );
}