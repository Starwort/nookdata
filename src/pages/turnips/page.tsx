import { Button, Card, CardContent, CardHeader, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
// import Chart from 'react-billboardjs';
import { areaSplineRange } from 'billboard.js';
import deepmerge from "deepmerge";
import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Centred } from '../../components';
import { clone, DeepPartial, Dict, getDefault } from "../../misc";
import { Chart } from './components';
import { calculate, dataMakesSense, emptyWeek, Pattern, patternColours, UserTurnipsData } from "./data";

const weekDays: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat')[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const names = {
    [Pattern.FLUCTUATING]: "turnips:pattern.fluctuating",
    [Pattern.LARGE_SPIKE]: "turnips:pattern.large_spike",
    [Pattern.DECREASING]: "turnips:pattern.decreasing",
    [Pattern.SMALL_SPIKE]: "turnips:pattern.small_spike",
    [Pattern.AGGREGATE]: "turnips:pattern.aggregate",
}

export default function Turnips() {
    const foundData = getDefault(window.localStorage.turnips, clone(emptyWeek));
    const [data, setDataImpl] = React.useState(foundData);
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [dontAsk, setDontAsk] = React.useState(false);
    const makesSense = dataMakesSense(data);
    const result = makesSense ? (console.log('calculating'), calculate(data)) : [];
    console.log(result.length && 'hello');
    let columns: [string, ...{ high: number, low: number, mid: number }[]][] = [];
    let colours: Dict<string> = {}
    let names: Dict<string> = {}
    let n = 0;
    for (let pattern of result) {
        let column: [string, ...{ high: number, low: number, mid: number }[]] = [`data${n}`];
        for (let hour of pattern.hours) {
            column.push({ low: hour.min, high: hour.max, mid: hour.avg });
        }
        columns.push(column);
        names[`data${n}`] = names[pattern.pattern];
        colours[`data${n++}`] = patternColours[pattern.pattern](pattern.chance);
    }
    console.log(result);
    function confirm() {
        if (dontAsk) {
            window.localStorage.turnipDontConfirm = 'true';
        }
        setConfirmOpen(false);
        reset();
    }
    function setData(newData: DeepPartial<UserTurnipsData>) {
        let toSet: UserTurnipsData = deepmerge<UserTurnipsData>(data, newData as Partial<UserTurnipsData>);
        window.localStorage.turnips = JSON.stringify(toSet);
        setDataImpl(toSet);
    }
    function nextWeek() {
        if (getDefault<boolean>(window.localStorage.turnipDontConfirm, false)) {
            reset();
        } else {
            setConfirmOpen(true);
        }
    }
    function reset() {
        let newData = clone(emptyWeek);
        newData.previousPattern = result.map((result) => result.pattern).reduce((aggregate, next) => {
            if (aggregate === Pattern.UNKNOWN) {
                return Pattern.UNKNOWN;
            }
            if (aggregate === Pattern.AGGREGATE) {
                return next;
            }
            if (next === Pattern.AGGREGATE) {
                return aggregate;
            }
            if (aggregate !== next) {
                return Pattern.UNKNOWN;
            } else {
                return next;
            }
        }, Pattern.UNKNOWN);
        setData(newData);
    }
    const { t } = useTranslation(['core', 'turnips']);
    const theme = useTheme();
    const isXs = !useMediaQuery(theme.breakpoints.up('sm'));
    const firstBuy = <Grid item xs={12} sm={6}>
        <Centred>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={data.firstBuy}
                        onChange={(event) => setData({ firstBuy: event.target.checked })}
                        color="primary"
                    />
                }
                label={t('turnips:prices.first_buy.checkbox')}
                title={t('turnips:prices.first_buy.hover')}
            />
        </Centred>
    </Grid>;
    return <>
        <Helmet>
            <title>{t('core:title.browser.page', { pageTitle: t('core:pages.turnips') })}</title>
        </Helmet>
        <div style={{ maxWidth: 800, margin: 'auto' }}>
            <Card style={{ margin: 16 }}>
                <CardHeader title={t('turnips:prices.title')} />
                <CardContent>
                    <Grid container spacing={1}>
                        {isXs && firstBuy}
                        <Grid item xs={12} sm={6}>
                            <TextField type="number" fullWidth value={data.buy} onChange={(event) => setData({ buy: event.target.value ? +event.target.value : null })} label={t('turnips:prices.buy')} />
                        </Grid>
                        {!isXs && firstBuy}
                        {weekDays.map((day) => (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <TextField type="number" fullWidth value={data[day].am} onChange={(event) => setData({ [day]: { am: event.target.value ? +event.target.value : null } })} label={t('turnips:prices.am', { day: t(`core:time.weekday.${day}.long`) })} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField type="number" fullWidth value={data[day].pm} onChange={(event) => setData({ [day]: { pm: event.target.value ? +event.target.value : null } })} label={t('turnips:prices.pm', { day: t(`core:time.weekday.${day}.long`) })} />
                                </Grid>
                            </>
                        ))}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="comp-label">{t('turnips:pattern.label')}</InputLabel>
                                <Select
                                    value={data.previousPattern}
                                    onChange={(event) => setData(
                                        { previousPattern: event.target.value as Pattern }
                                    )}
                                    labelId='pattern-label'
                                    fullWidth
                                >
                                    <MenuItem value={Pattern.SMALL_SPIKE}>{t('turnips:pattern.small_spike')}</MenuItem>
                                    <MenuItem value={Pattern.LARGE_SPIKE}>{t('turnips:pattern.large_spike')}</MenuItem>
                                    <MenuItem value={Pattern.FLUCTUATING}>{t('turnips:pattern.fluctuating')}</MenuItem>
                                    <MenuItem value={Pattern.DECREASING}>{t('turnips:pattern.decreasing')}</MenuItem>
                                    <MenuItem value={Pattern.UNKNOWN}>{t('turnips:pattern.unknown')}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button style={{ height: '100%' }} fullWidth variant="contained" color="primary" onClick={nextWeek}>{t('turnips:ui.start_next')}</Button>
                        </Grid>
                    </Grid>
                    {makesSense || <>
                        <br />
                        <Centred>
                            <div
                                style={{
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    height: '100%',
                                    color: theme.palette.error.main,
                                    paddingRight: 8
                                }}
                            >
                                <Warning />
                            </div>
                            <Typography color="error">{t('turnips:ui.bad_data')}</Typography>
                        </Centred>
                    </>
                    }
                </CardContent>
            </Card>
            {!!result.length && <Card style={{ margin: 16 }}>
                <CardContent>
                    <Chart
                        isPure
                        className={`chart ${theme.name}`}
                        data={{
                            columns: columns as any,
                            colors: colours,
                            names,
                            type: areaSplineRange(),
                        }}
                        legend={{
                            // position: 'right',
                            show: false
                        }}
                    />
                </CardContent>
            </Card>}
        </div>
        <Dialog open={confirmOpen}>
            <DialogTitle>{t('turnips:ui.reset_dialogue.title')}</DialogTitle>
            <DialogContent>
                {t('turnips:ui.reset_dialogue.text')}
                <br />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={dontAsk}
                            onChange={(event) => setDontAsk(event.target.checked)}
                            color="primary"
                        />
                    }
                    label={t('core:ui.dont_ask')}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setConfirmOpen(false)}>
                    {t('core:ui.cancel')}
                </Button>
                <Button onClick={confirm}>
                    {t('core:ui.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    </>;
}