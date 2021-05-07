import { Card, Checkbox, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Grid, IconButton, makeStyles, Toolbar, useTheme } from "@material-ui/core";
import { ChevronLeft, ChevronRight, Cloud, WbSunny } from "@material-ui/icons";
import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNDContext } from "../../../context";
import { getCritterLocation, getCritterName, getCritterQuote } from "../data";
import { bugs, fish } from '../data.json';
import './CritterDialogue.scss';
import MonthPanels from "./MonthPanels";
import TimeTracker from "./TimeTracker";

const useStyles = makeStyles((theme) => createStyles({
    modelled: {
        color: theme.palette.modelled.main,
        '&.Mui-disabled': {
            color: theme.palette.modelled.transparent,
        },
    },
}));

interface CritterDialogueProps {
    data: (typeof bugs[0]) | (typeof fish[0]);
    type: 'bug' | 'fish';
    obtained: boolean;
    modelled: boolean;
    setObtained: (value: boolean) => void;
    setModelled: (value: boolean) => void;
    open: boolean;
    setOpenDialogue: (value: number | null) => void;
}
export default function CritterDialogue(props: CritterDialogueProps) {
    const { t } = useTranslation('critterpedia');
    const { time, settings } = useNDContext();
    const hours = (
        settings.hemisphere == 'north' ?
            props.data.hours :
            props.data.hours.rotated(6)
    );
    const theme = useTheme();
    const { palette } = useTheme();
    let shadow;
    if (props.type == 'fish') {
        shadow = t(`critterpedia:fish.size.${(props.data as typeof fish[0]).shadow}`);
    }
    const index = props.data.index.toString().padStart(2, '0');
    const name = getCritterName(props.data, props.type, t).capitalise();
    return <>
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
            <Helmet>
                <title>{t('critterpedia:title.info', { name })}</title>
            </Helmet>
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
                        {name}
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
                    activeMonth={time.getMonth()}
                />
                <TimeTracker
                    hours={hours[time.getMonth()]}
                />
                <Card variant="outlined">
                    <>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <img src={
                                    `assets/${props.type}/${index}.png`
                                } />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="info">
                                    {props.data.dry && <div
                                        className="dry"
                                        title={t('critterpedia:dialogue.details.dry')}
                                    >
                                        <WbSunny
                                            style={{
                                                color: theme.palette.summer.main
                                            }}
                                        />
                                    </div>}
                                    <div className="lfound">{t('critterpedia:dialogue.details.found')}</div>
                                    <div className="lsell">{t('critterpedia:dialogue.details.price')}</div>
                                    {props.data.rain && <div
                                        className="rain"
                                        title={t('critterpedia:dialogue.details.rain')}
                                    >
                                        <Cloud
                                            style={{
                                                color: theme.palette.winter.main
                                            }}
                                        />
                                    </div>}
                                    <div className="found">{getCritterLocation(props.data, props.type, t)}</div>
                                    <div className="sell">{t('core:money.value', { value: props.data.price })}</div>
                                </div>
                            </Grid>
                        </Grid>
                    </>
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
    </>
}