import { Card, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, useTheme } from '@material-ui/core';
import React from 'react';
import UserSettings from '../../user_settings';
import CritterPanel from './components/CritterPanel';
import { bugs, fish } from './data.json';
import SearchParameters from './search_parameters';
const a = bugs;
const b = fish;

function range(stop: number) {
    return Array.from(Array(stop).keys());
}

interface UserCritterData {
    obtained: boolean;
    modelled: boolean;
}

interface UserCritterpediaData {
    bugs: UserCritterData[];
    fish: UserCritterData[];
}

interface CritterpediaProps {
    settings: UserSettings;
    time: Date;
}

export default function Critterpedia(props: CritterpediaProps) {
    const theme = useTheme();
    if (!window.localStorage.critterpedia) {
        let data: UserCritterpediaData = {
            bugs: [],
            fish: [],
        };
        for (let i = 0; i < 80; i++) {
            data.bugs.push({ obtained: false, modelled: false });
            data.fish.push({ obtained: false, modelled: false });
        }
        window.localStorage.critterpedia = JSON.stringify(data);
    }
    const data: UserCritterpediaData = JSON.parse(window.localStorage.critterpedia);
    const [activeRequired, setActiveRequired] = React.useState(false);
    const [leavingRequired, setLeavingRequired] = React.useState(false);
    const [location, setLocation] = React.useState('');
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [priceComparison, setPriceComparison] = React.useState<'>=' | '=' | '<='>('>=');
    const [size, setSize] = React.useState('');
    const [unmodelledRequired, setUnmodelledRequired] = React.useState(false);
    const [unobtainedRequired, setUnobtainedRequired] = React.useState(false);
    const searchParameters: SearchParameters = {
        activeRequired,
        leavingRequired,
        location,
        name,
        price,
        priceComparison,
        size,
        unmodelledRequired,
        unobtainedRequired,
    };
    const [bugsData, setBugsDataImpl] = React.useState(data.bugs);
    const [fishData, setFishDataImpl] = React.useState(data.fish);
    const [openDialogue, setOpenDialogueImpl] = React.useState<number | null>(null);
    const [openDialogueType, setOpenDialogueType] = React.useState<'bug' | 'fish'>('bug');
    function setOpenDialogue(value: number | null) {
        if (value !== null) {
            let title = (
                openDialogueType === 'bug'
                    ? bugs
                    : fish
            )[value].name.capitalise();
            window.history.pushState(null, `Critterpedia - ${title} | NookData`)
        } else {
            window.history.pushState(null, `Critterpedia | NookData`)
        }
        setOpenDialogueImpl(value);
    }
    function setBugsData(bug: number, state: UserCritterData) {
        data.bugs[bug] = state;
        window.localStorage.critterpedia = JSON.stringify(data);
        setBugsDataImpl(data.bugs);
    }
    function setFishData(fish: number, state: UserCritterData) {
        data.fish[fish] = state;
        window.localStorage.critterpedia = JSON.stringify(data);
        setFishDataImpl(data.fish);
    }
    const now = new Date();
    return <div style={{ maxWidth: 1316, margin: 'auto' }}>
        <Card style={{ margin: 16 }}>
            <CardHeader title="Search Critters" />
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={4} >
                        <TextField fullWidth value={name} onChange={(event) => setName(event.target.value)} label="Name" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} >
                        <TextField fullWidth value={location} onChange={(event) => setLocation(event.target.value)} label="Location" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} >
                        <TextField fullWidth value={size} onChange={(event) => setSize(event.target.value)} label="Size (fish)" />
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} >
                        <FormControl fullWidth variant="filled">
                            <InputLabel id="comp-label">Price</InputLabel>
                            <Select
                                value={priceComparison}
                                onChange={(event) => setPriceComparison(
                                    event.target.value as ('>=' | '=' | '<=')
                                )}
                                labelId='comp-label'
                                fullWidth
                            >
                                <MenuItem value=">=">≥</MenuItem>
                                <MenuItem value="=">=</MenuItem>
                                <MenuItem value="<=">≤</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3} md={2} >
                        <TextField fullWidth value={price} onChange={(event) => setPrice(+event.target.value)} label="Value" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={activeRequired}
                                    onChange={(event) => setActiveRequired(event.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Available this month"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={leavingRequired}
                                    onChange={(event) => setLeavingRequired(event.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Unavailable from next month"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={unobtainedRequired}
                                    onChange={(event) => setUnobtainedRequired(event.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Unobtained"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={unmodelledRequired}
                                    onChange={(event) => setUnmodelledRequired(event.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Model unobtained"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        <Card style={{ margin: 16 }}>
            <CardHeader title={
                <>
                    Bugs - <span style={{ color: theme.palette.primary.main }}>
                        ({
                            bugsData.reduce((total, bug) => total + (+bug.obtained), 0)
                        } / 80)
                    </span> <span style={{ color: theme.palette.modelled.main }}>
                        ({
                            bugsData.reduce((total, bug) => total + (+bug.modelled), 0)
                        } / 80)
                    </span>
                </>
            } />
            <CardContent style={{ overflowX: 'auto' }}>
                <table style={{ paddingRight: 16 }}>
                    <tbody>
                        {
                            range(5).map(
                                (y) =>
                                    <tr>
                                        {
                                            range(16).map(
                                                (x) => {
                                                    const bugData = bugsData[x * 5 + y];
                                                    return <td>
                                                        <CritterPanel
                                                            data={bugs[x * 5 + y]}
                                                            obtained={bugData.obtained}
                                                            modelled={bugData.modelled}
                                                            type="bug"
                                                            setObtained={(value: boolean) => setBugsData(x * 5 + y, { obtained: value, modelled: false })}
                                                            setModelled={(value: boolean) => setBugsData(x * 5 + y, { obtained: true, modelled: value })}
                                                            month={now.getMonth()}
                                                            hour={now.getHours()}
                                                            openDialogue={openDialogueType === 'bug' ? openDialogue : null}
                                                            setOpenDialogue={(value: number | null) => {
                                                                setOpenDialogueType('bug');
                                                                setOpenDialogue(value);
                                                            }}
                                                            searchParameters={searchParameters}
                                                            settings={props.settings}
                                                            now={props.time}
                                                        />
                                                    </td>;
                                                }
                                            )
                                        }
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </CardContent>
        </Card>
        <Card style={{ margin: 16 }}>
            <CardHeader title={
                <>
                    Fish - <span style={{ color: theme.palette.primary.main }}>
                        ({
                            fishData.reduce((total, fish) => total + (+fish.obtained), 0)
                        } / 80)
                    </span> <span style={{ color: theme.palette.modelled.main }}>
                        ({
                            fishData.reduce((total, fish) => total + (+fish.modelled), 0)
                        } / 80)
                    </span>
                </>
            } />
            <CardContent style={{ overflowX: 'auto' }}>
                <table style={{ paddingRight: 16 }}>
                    <tbody>
                        {
                            range(5).map(
                                (y) =>
                                    <tr>
                                        {
                                            range(16).map(
                                                (x) => {
                                                    const bugData = fishData[x * 5 + y];
                                                    return <td>
                                                        <CritterPanel
                                                            data={fish[x * 5 + y]}
                                                            obtained={bugData.obtained}
                                                            modelled={bugData.modelled}
                                                            type="fish"
                                                            setObtained={(value: boolean) => setFishData(x * 5 + y, { obtained: value, modelled: false })}
                                                            setModelled={(value: boolean) => setFishData(x * 5 + y, { obtained: true, modelled: value })}
                                                            month={now.getMonth()}
                                                            hour={now.getHours()}
                                                            openDialogue={openDialogueType === 'fish' ? openDialogue : null}
                                                            setOpenDialogue={(value: number | null) => {
                                                                setOpenDialogueType('fish');
                                                                setOpenDialogue(value);
                                                            }}
                                                            searchParameters={searchParameters}
                                                            settings={props.settings}
                                                            now={props.time}
                                                        />
                                                    </td>;
                                                }
                                            )
                                        }
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </CardContent>
        </Card>
    </div>
}