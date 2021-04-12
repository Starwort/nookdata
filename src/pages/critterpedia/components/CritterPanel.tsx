import { Card, CardActionArea, CardContent, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, Toolbar, useTheme } from "@material-ui/core";
import { ChevronLeft, ChevronRight, Cloud, Help, Warning, WbSunny } from "@material-ui/icons";
import React from "react";
import '../../../prototype_mods';
import UserSettings from '../../../user_settings';
import { bugs, fish } from '../data.json';
import SearchParameters from "../search_parameters";
import './CritterPanel.scss';
import MonthPanels from "./MonthPanels";
import TimeTracker from "./TimeTracker";



interface CritterPanelProps {
    data: (typeof bugs[0]) | (typeof fish[0]);
    type: 'bug' | 'fish';
    obtained: boolean;
    modelled: boolean;
    setObtained: (value: boolean) => void;
    setModelled: (value: boolean) => void;
    month: number;
    hour: number;
    searchParameters: SearchParameters;
    openDialogue: number | null;
    setOpenDialogue: (value: number | null) => void;
    now: Date;
    settings: UserSettings;
}
function CritterPanel(props: CritterPanelProps) {
    const hours = (
        props.settings.hemisphere == 'north' ?
            props.data.hours :
            [...props.data.hours.slice(6), ...props.data.hours.slice(0, 6)]
    );
    const theme = useTheme();
    const activeNow = hours[props.month].reduce((a, b) => a || b);
    const leavingSoon = activeNow && !hours[(props.month + 1) % 12].reduce((a, b) => a || b);
    const { palette } = useTheme();
    const {
        activeRequired,
        leavingRequired,
        location,
        name,
        price,
        priceComparison,
        size,
        unmodelledRequired,
        unobtainedRequired,
    } = props.searchParameters;
    let shadow = '';
    if (props.type == 'fish') {
        shadow = (props.data as typeof fish[0]).shadow;
    }
    let match = true;
    if (activeRequired && !activeNow) {
        match = false;
    } else if (leavingRequired && !leavingSoon) {
        match = false;
    } else if (!props.data.location.includes(location.toLowerCase())) {
        match = false;
    } else if (!props.data.name.includes(name.toLowerCase())) {
        match = false;
    } else if (props.type == 'fish' && !shadow.includes(size.toLowerCase())) {
        match = false;
    } else if (unobtainedRequired && props.obtained) {
        match = false;
    } else if (unmodelledRequired && props.modelled) {
        match = false;
    } else {
        switch (priceComparison) {
            case '>=':
                if (props.data.price < price) {
                    match = false;
                }
                break;
            case '=':
                if (props.data.price != price) {
                    match = false;
                }
                break;
            case '<=':
                if (props.data.price > price) {
                    match = false;
                }
                break;
        }
    }

    return <>
        <Card className="critter-panel" title={
            `${props.data.name.capitalise()} (${props.type.capitalise()
            } #${props.data.index + 1})`
        }
            style={
                {
                    backgroundColor: props.modelled
                        ? palette.modelled.transparent
                        : (
                            props.obtained
                                ? palette.primary.transparent
                                : (
                                    activeNow
                                        ? undefined
                                        : palette.error.transparent
                                )
                        ),
                    borderColor: props.modelled
                        ? palette.modelled.main
                        : (
                            activeNow
                                ? (
                                    props.obtained
                                        ? palette.primary.main
                                        : undefined
                                )
                                : palette.error.main
                        ),
                    opacity: match ? 1 : theme.palette.opacity,
                }
            }
        >
            <CardActionArea onClick={() => props.setOpenDialogue(props.data.index)}>
                {
                    leavingSoon
                        ? <Warning style={{
                            color: props.modelled
                                ? palette.modelled.main
                                : palette.error.main,
                        }} />
                        : <Help style={{
                            color: props.modelled
                                ? palette.modelled.main
                                : (
                                    activeNow
                                        ? (
                                            props.obtained
                                                ? palette.primary.main
                                                : undefined
                                        )
                                        : palette.error.main
                                ),
                        }} />
                }
                <img src={
                    `assets/${props.type}/${props.data.index.toString().padStart(2, '0')
                    }.png`
                } />
            </CardActionArea>
        </Card>
        <Dialog
            open={props.openDialogue == props.data.index}
            onClose={() => props.setOpenDialogue(null)}
            scroll="body"
            PaperProps={{
                style: {
                    borderColor: props.modelled
                        ? palette.modelled.main
                        : (
                            props.obtained
                                ? palette.primary.main
                                : 'transparent'
                        ),
                    borderWidth: 1,
                    borderStyle: 'solid',
                    width: "75%",
                    transition: 'color 0.5s ease-in-out, border-color 0.5s ease-in-out',
                }
            }}
        >
            <DialogTitle style={{
                paddingBottom: 0,
            }}
            >
                <Toolbar>
                    {
                        props.data.index > 0
                            ? <IconButton edge="start" onClick={() => props.setOpenDialogue(props.data.index - 1)}>
                                {theme.direction == 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                            </IconButton>
                            : <IconButton disabled />
                    }
                    <div style={{
                        textAlign: 'center',
                        color: props.modelled
                            ? palette.modelled.main
                            : (
                                props.obtained
                                    ? palette.primary.main
                                    : undefined
                            ),
                        flexGrow: 1,
                        transition: 'color 0.5s ease-in-out',
                    }}>
                        {props.data.name.capitalise()}
                    </div>
                    {
                        props.data.index < 79
                            ? <IconButton edge="end" onClick={() => props.setOpenDialogue(props.data.index + 1)}>
                                {theme.direction == 'ltr' ? <ChevronRight /> : <ChevronLeft />}
                            </IconButton>
                            : <IconButton disabled />
                    }
                </Toolbar>
            </DialogTitle>
            <DialogContent
                style={{
                    textAlign: 'center'
                }}
            >
                {props.type.capitalise()} #{props.data.index + 1}
                <br />
                <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                <div
                    style={{ paddingBottom: 8 }}
                    dangerouslySetInnerHTML={{
                        __html: props.data.quote.replace('{playername}', props.settings.playerName)
                    }}
                />
                <MonthPanels
                    months={hours.map(
                        (month) => month.reduce((a, b) => a || b)
                    )}
                    activeMonth={props.month}
                    settings={props.settings}
                />
                <TimeTracker
                    hours={hours[props.now.getMonth()]}
                    time={props.now}
                    settings={props.settings}
                />
                <Card variant="outlined">
                    <CardContent>
                        <div className="critter-overview">
                            <img
                                src={
                                    `assets/${props.type}/${props.data.index.toString().padStart(2, '0')
                                    }.png`
                                }
                                className="critter-icon"
                            />
                            {props.data.dry && <WbSunny className="critter-dry" style={{ color: theme.palette.summer.main }} />}
                            {props.data.rain && <Cloud className="critter-wet" style={{ color: theme.palette.winter.main }} />}
                            <div className="location-label">Found:</div>
                            <div className="price-label">Sells for:</div>
                            <div className="location">{props.data.location}</div>
                            <div className="price">{props.data.price}</div>
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={props.obtained}
                            onChange={(event) => props.setObtained(event.target.checked)}
                            color="primary"
                        />
                    }
                    label="Obtained"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={props.modelled}
                            disabled={!props.obtained}
                            onChange={(event) => props.setModelled(event.target.checked)}
                            color="default"
                            style={{ color: theme.palette.modelled.main }}
                        />
                    }
                    label="Modelled"
                />
            </DialogActions>
        </Dialog>
    </>;
}
export default CritterPanel;