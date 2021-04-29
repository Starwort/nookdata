import { Card, CardActionArea, CardContent, Checkbox, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, makeStyles, Toolbar, useTheme } from "@material-ui/core";
import { ChevronLeft, ChevronRight, Cloud, Help, Warning, WbSunny } from "@material-ui/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNDContext } from "../../../context";
import '../../../prototype_mods';
import { getCritterLocation, getCritterName, getCritterQuote } from '../data';
import { bugs, fish } from '../data.json';
import SearchParameters from "../search_parameters";
import './CritterPanel.scss';
import MonthPanels from "./MonthPanels";
import TimeTracker from "./TimeTracker";

const useStyles = makeStyles((theme) => createStyles({
    modelled: {
        color: theme.palette.modelled.main,
        '&.Mui-disabled': {
            color: theme.palette.modelled.transparent,
        },
    },
}))

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
    open: boolean;
    setOpenDialogue: (value: number | null) => void;
}
function CritterPanel(props: CritterPanelProps) {
    const { t } = useTranslation('critterpedia');
    const { time, settings } = useNDContext();
    const hours = (
        settings.hemisphere == 'north' ?
            props.data.hours :
            [...props.data.hours.slice(6), ...props.data.hours.slice(0, 6)]
    );
    const theme = useTheme();
    const activeNow = hours[props.month][props.hour];
    const activeMonth = hours[props.month].reduce((a, b) => a || b);
    const leavingSoon = activeMonth && !hours[(props.month + 1) % 12].reduce((a, b) => a || b);
    const { palette } = useTheme();
    const {
        activeRequired,
        location,
        name,
        price,
        priceComparison,
        size,
        stateRequired,
    } = props.searchParameters;
    let shadow = '';
    if (props.type == 'fish') {
        shadow = t(`critterpedia:fish.size.${(props.data as typeof fish[0]).shadow}`);
    }
    let match = true;
    if (activeRequired === 'now' && !activeNow) {
        match = false;
    } else if (activeRequired === 'month' && !activeMonth) {
        match = false;
    } else if (activeRequired === 'until_next' && !leavingSoon) {
        match = false;
    } else if (!getCritterLocation(props.data, props.type, t).includes(location.toLowerCase())) {
        match = false;
    } else if (!getCritterName(props.data, props.type, t).includes(name.toLowerCase())) {
        match = false;
    } else if (props.type == 'fish' && !shadow.includes(size.toLowerCase())) {
        match = false;
    } else if (stateRequired === 'unobtained' && props.obtained) {
        match = false;
    } else if (stateRequired === 'unmodelled' && props.modelled) {
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

    const title = [
        t(`critterpedia:panel.type.${props.type}`, { name: getCritterName(props.data, props.type, t).capitalise(), index: props.data.index + 1 }),
        (activeMonth ? '' : t('critterpedia:panel.status.unavailable')),
        (activeNow ? t('critterpedia:panel.status.now') : ''),
        (props.modelled ? t('critterpedia:panel.status.modelled') : ''),
        t('critterpedia:panel.status.details'),
    ].filter((elem) => !!elem).join('\n');

    return <>
        <Card
            className="critter-panel"
            title={title}
            style={
                {
                    backgroundColor: props.modelled
                        ? palette.modelled.transparent
                        : (
                            props.obtained
                                ? palette.primary.transparent
                                : (
                                    activeMonth
                                        ? undefined
                                        : palette.error.transparent
                                )
                        ),
                    borderColor: props.modelled
                        ? palette.modelled.main
                        : (
                            activeMonth
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
                                    activeMonth
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
            open={props.open}
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
                        {getCritterName(props.data, props.type, t).capitalise()}
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
                {t(`critterpedia:dialogue.type.${props.type}`, { index: props.data.index + 1 })}
                <br />
                <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                <div
                    style={{ paddingBottom: 8 }}
                    dangerouslySetInnerHTML={{
                        __html: getCritterQuote(
                            props.data,
                            props.type,
                            settings.playerName,
                            t
                        )
                    }}
                />
                <MonthPanels
                    months={hours.map(
                        (month) => month.reduce((a, b) => a || b)
                    )}
                    activeMonth={props.month}
                />
                <TimeTracker
                    hours={hours[time.getMonth()]}
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
                            {props.data.dry && <div
                                title={t('critterpedia:dialogue.details.dry')}
                            >
                                <WbSunny
                                    className="critter-dry"
                                    style={{
                                        color: theme.palette.summer.main
                                    }}
                                />
                            </div>}
                            {props.data.rain && <div
                                title={t('critterpedia:dialogue.details.wet')}
                            >
                                <Cloud
                                    className="critter-wet"
                                    style={{
                                        color: theme.palette.winter.main
                                    }}
                                />
                            </div>}
                            <div className="location-label">{t('critterpedia:dialogue.details.found')}</div>
                            <div className="price-label">{t('critterpedia:dialogue.details.price')}</div>
                            <div className="location">{getCritterLocation(props.data, props.type, t)}</div>
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
                    label={t('critterpedia:dialogue.obtained')}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            className={useStyles(theme).modelled}
                            checked={props.modelled}
                            disabled={!props.obtained}
                            onChange={(event) => props.setModelled(event.target.checked)}
                            color="default"
                        />
                    }
                    label={t('critterpedia:dialogue.modelled')}
                />
            </DialogActions>
        </Dialog>
    </>;
}
export default CritterPanel;