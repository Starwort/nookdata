import {Button, Card, Checkbox, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Grid, IconButton, makeStyles, TextField, Toolbar, Tooltip, useTheme} from "@material-ui/core";
import {ChevronLeft, ChevronRight, Cloud, WbSunny} from "@material-ui/icons";
import React from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {Centred} from "../../../components";
import {useData, useTime} from "../../../context";
import {UserCritterData} from "../../../data";
import {numberFormatters} from "../../../i18n";
import {getCritterLocation, getCritterName, getCritterQuote} from "../data";
import {bugs, fish} from '../data.json';
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

const shadows = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "six_fin",
    "six_narrow",
];

interface CritterDialogueProps {
    data: (typeof bugs[0]) | (typeof fish[0]);
    type: 'bug' | 'fish';
    open: boolean;
    setOpenDialogue: (value: number | null) => void;
}
export default function CritterDialogue({data, type, open, setOpenDialogue}: CritterDialogueProps) {
    const {t} = useTranslation('critterpedia');
    const numberFormatter = numberFormatters[t('core:misc.code')];
    const time = useTime();
    const {settings, critterpedia, updateData} = useData();
    const hours = (
        settings.hemisphere == 'north' ?
            data.hours :
            data.hours.rotated(6)
    );
    const state = (
        type === 'bug'
            ? critterpedia.bugs
            : critterpedia.fish
    )[data.index];
    const theme = useTheme();
    const palette = theme.palette;
    let shadow;
    if (type == 'fish') {
        shadow = t(`critterpedia:fish.size.${(data as typeof fish[0]).shadow}`);
    }
    const updateSelf = React.useCallback(
        type === 'bug'
            ? (value: Partial<UserCritterData>) => updateData({critterpedia: {bugs: {[data.index]: value} as UserCritterData[]}})
            : (value: Partial<UserCritterData>) => updateData({critterpedia: {fish: {[data.index]: value} as UserCritterData[]}}),
        [type]
    );
    const index = data.index.toString().padStart(2, '0');
    const name = getCritterName(data, type, t).capitalise();
    return <>
        <Dialog
            open={open}
            onClose={() => setOpenDialogue(null)}
            scroll="body"
            PaperProps={{
                style: {
                    borderColor: state.modelled
                        ? palette.modelled.main
                        : (
                            state.obtained
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
                <title>{t('core:title.browser.page_data', {pageTitle: t('core:pages.critterpedia'), pageData: name})}</title>
            </Helmet>
            <DialogTitle style={{
                paddingBottom: 0,
            }}
            >
                <Toolbar>
                    {
                        data.index > 0
                            ? <IconButton edge="start" onClick={() => setOpenDialogue(data.index - 1)}>
                                {theme.direction == 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                            </IconButton>
                            : <IconButton disabled />
                    }
                    <div style={{
                        textAlign: 'center',
                        color: state.modelled
                            ? palette.modelled.main
                            : (
                                state.obtained
                                    ? palette.primary.main
                                    : undefined
                            ),
                        flexGrow: 1,
                        transition: 'color 0.5s ease-in-out',
                    }}>
                        {name}
                    </div>
                    {
                        data.index < 79
                            ? <IconButton edge="end" onClick={() => setOpenDialogue(data.index + 1)}>
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
                {t(`critterpedia:dialogue.type.${type}`, {index: numberFormatter(data.index + 1)})}
                <br />
                <Divider style={{marginTop: 8, marginBottom: 8}} />
                <div
                    style={{paddingBottom: 8}}
                    dangerouslySetInnerHTML={{
                        __html: getCritterQuote(
                            data,
                            type,
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
                <Card variant="outlined" style={{marginBottom: 8}}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <img src={
                                `assets/${type}/${index}.png`
                            } />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="info">
                                {data.dry &&
                                    <Tooltip
                                        title={t('critterpedia:dialogue.details.dry') as string}
                                    >
                                        <div
                                            className="dry"
                                        >
                                            <WbSunny
                                                style={{
                                                    color: theme.palette.summer.main
                                                }}
                                            />
                                        </div>
                                    </Tooltip>
                                }
                                <div className="lfound">{t('critterpedia:dialogue.details.found')}</div>
                                <div className="lsell">{t('critterpedia:dialogue.details.price')}</div>
                                {shadow && <div className="lshadow">{t('critterpedia:dialogue.details.shadow')}</div>}
                                {data.rain &&
                                    <Tooltip
                                        title={t('critterpedia:dialogue.details.rain') as string}
                                    >
                                        <div
                                            className="rain"
                                        >
                                            <Cloud
                                                style={{
                                                    color: theme.palette.winter.main
                                                }}
                                            />
                                        </div>
                                    </Tooltip>
                                }
                                <div className="found">{getCritterLocation(data, type, t)}</div>
                                <div className="sell">{t('core:money.value', {value: numberFormatter(data.price)})}</div>
                                {shadow && <div className="shadow">{shadow}</div>}
                            </div>
                        </Grid>
                    </Grid>
                </Card>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            value={state.stored.toString()}
                            onChange={(event) => updateSelf({stored: +event.target.value})}
                            type="number"
                            label={t('critterpedia:dialogue.stored')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Centred>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.obtained}
                                        onChange={(event) => updateSelf({obtained: event.target.checked, stored: +event.target.checked, modelled: false})}
                                        color="primary"
                                    />
                                }
                                label={t('critterpedia:dialogue.obtained')}
                            />
                        </Centred>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Centred>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        className={useStyles(theme).modelled}
                                        checked={state.modelled}
                                        disabled={!state.obtained}
                                        onChange={(event) => updateSelf({modelled: event.target.checked, stored: Math.max(state.stored + 3 * (-1) ** +event.target.checked, 0)})}
                                        color="default"
                                    />
                                }
                                label={t('critterpedia:dialogue.modelled')}
                            />
                        </Centred>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="text"
                    onClick={() => setOpenDialogue(null)}
                >{t('core:ui.dismiss')}</Button>
            </DialogActions>
        </Dialog>
    </>;
}