import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import {Warning} from "@material-ui/icons";
import {areaSplineRange} from 'billboard.js';
import React from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {Centred} from '../../components';
import {useData} from "../../context";
import {clone, DeepPartial, Dict, fsum, range} from "../../misc";
import {Chart} from './components';
import {calculate, dataMakesSense, emptyWeek, knownPattern, Pattern, patternColours, TurnipsResult, UserTurnipsData} from "./data";

const patternNames = {
    [Pattern.FLUCTUATING]: "turnips:graph.fluctuating",
    [Pattern.LARGE_SPIKE]: "turnips:graph.large_spike",
    [Pattern.DECREASING]: "turnips:graph.decreasing",
    [Pattern.SMALL_SPIKE]: "turnips:graph.small_spike",
    [Pattern.AGGREGATE]: "turnips:graph.aggregate",
    [Pattern.UNKNOWN]: "Something went wrong. Sorry.",
};

const weekDays: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat')[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function transform(length: number) {
    return Math.log2(length) + 1;
}

function Graph({result}: {result: TurnipsResult[];}) {
    const {t} = useTranslation(['core', 'turnips']);
    const theme = useTheme();
    const patterns = {
        [Pattern.FLUCTUATING]: result.filter(result => result.pattern === Pattern.FLUCTUATING),
        [Pattern.LARGE_SPIKE]: result.filter(result => result.pattern === Pattern.LARGE_SPIKE),
        [Pattern.DECREASING]: result.filter(result => result.pattern === Pattern.DECREASING),
        [Pattern.SMALL_SPIKE]: result.filter(result => result.pattern === Pattern.SMALL_SPIKE),
        [Pattern.AGGREGATE]: [result[0]],
        [Pattern.UNKNOWN]: [] as TurnipsResult[],
    };
    if (result.length) {
        let xValues = [
            t('turnips:graph.buy'),
            t('core:time.meridian.am.short_day', {day: t(`core:time.weekday.mon.short`)}),
            t('core:time.meridian.pm.short_day', {day: t(`core:time.weekday.mon.short`)}),
            t('core:time.meridian.am.short_day', {day: t(`core:time.weekday.tue.short`)}),
            t('core:time.meridian.pm.short_day', {day: t(`core:time.weekday.tue.short`)}),
            t('core:time.meridian.am.short_day', {day: t(`core:time.weekday.wed.short`)}),
            t('core:time.meridian.pm.short_day', {day: t(`core:time.weekday.wed.short`)}),
            t('core:time.meridian.am.short_day', {day: t(`core:time.weekday.thu.short`)}),
            t('core:time.meridian.pm.short_day', {day: t(`core:time.weekday.thu.short`)}),
            t('core:time.meridian.am.short_day', {day: t(`core:time.weekday.fri.short`)}),
            t('core:time.meridian.pm.short_day', {day: t(`core:time.weekday.fri.short`)}),
            t('core:time.meridian.am.short_day', {day: t(`core:time.weekday.sat.short`)}),
            t('core:time.meridian.pm.short_day', {day: t(`core:time.weekday.sat.short`)}),
        ];
        let columns: [string, ...{high: number, low: number, mid: string;}[]][] = [
        ];
        let colours: Dict<string> = {};
        let names: Dict<string> = {};
        let n = 0;
        for (let pattern of result) {
            // for (let pattern of filteredResult) {
            let column: [string, ...{high: number, low: number, mid: string;}[]] = [`data${n}`];
            for (let hour of pattern.hours) {
                column.push({low: hour.min, high: hour.max, mid: hour.avg.toFixed(2)});
            }
            columns.push(column);
            names[`data${n}`] = t(patternNames[pattern.pattern], {patternChance: (pattern.chance * 100).toFixed(2)});
            colours[`data${n++}`] = patternColours[theme.name][pattern.pattern](pattern.chance * transform(patterns[pattern.pattern].length));
        }
        return <>
            <Card style={{margin: 16}}>
                <CardContent>
                    <Chart
                        key={theme.name}  // this is very hacky but if I don't do it switching theme completely breaks the graph
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
                        axis={{
                            x: {
                                tick: {
                                    format: (x: number) => (xValues[x]),
                                    values: range(13),
                                    count: 13,
                                    rotate: 90,
                                    multiline: false,
                                    tooltip: true,
                                    culling: false,
                                },
                            }
                        }}
                    />
                </CardContent>
            </Card>
            <div style={{margin: '0 16px'}}>
                <Grid container spacing={2}>
                    {[Pattern.SMALL_SPIKE, Pattern.LARGE_SPIKE, Pattern.FLUCTUATING, Pattern.DECREASING].map(pattern =>
                        <Grid item xs={12} sm={6} lg={3} key={pattern}>
                            <Card
                                style={{
                                    backgroundColor: theme.name === 'light' ? patternColours.light[pattern](1) : undefined,
                                    color: theme.name === 'light' ? undefined : patternColours.dark[pattern](1),
                                }}
                            >
                                <CardHeader
                                    title={{
                                        [Pattern.SMALL_SPIKE]: t('turnips:pattern.small_spike'),
                                        [Pattern.LARGE_SPIKE]: t('turnips:pattern.large_spike'),
                                        [Pattern.FLUCTUATING]: t('turnips:pattern.fluctuating'),
                                        [Pattern.DECREASING]: t('turnips:pattern.decreasing'),
                                        [Pattern.AGGREGATE]: 'Something went wrong',
                                        [Pattern.UNKNOWN]: 'Something went wrong',
                                    }[pattern]}
                                    titleTypographyProps={{
                                        variant: 'h6',
                                    }}
                                />
                                <CardContent>
                                    <Centred>
                                        {(fsum(patterns[pattern].map(result => result.chance)) * 100).toFixed(2)}%
                                    </Centred>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </div>
        </>;
    } else {
        return null;
    }
}

export default function Turnips() {
    console.log("render!");
    const {settings, turnips: data, updateData} = useData();
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [noConfirm, setNoConfirm] = React.useState(false);
    let makesSense = dataMakesSense(data);
    function setData(data: DeepPartial<UserTurnipsData>) {
        updateData({turnips: data});
    }
    function confirm() {
        if (noConfirm) {
            updateData({settings: {turnipNoConfirm: true}});
        }
        setConfirmOpen(false);
        reset();
    }
    function nextWeek() {
        if (settings.turnipNoConfirm) {
            reset();
        } else {
            setConfirmOpen(true);
        }
    }
    function reset() {
        let newData = clone(emptyWeek);
        newData.previousPattern = knownPattern(data);
        setData(newData);
    }
    const {t} = useTranslation(['core', 'turnips']);
    const theme = useTheme();
    const isXs = !useMediaQuery(theme.breakpoints.up('sm'));
    const firstBuy = <Grid item xs={12} sm={6}>
        <Centred>
            <Tooltip
                title={t('turnips:prices.first_buy.hover') as string}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={data.firstBuy}
                            onChange={(event) => setData({firstBuy: event.target.checked})}
                            color="primary"
                        />
                    }
                    label={t('turnips:prices.first_buy.checkbox')}
                />
            </Tooltip>
        </Centred>
    </Grid>;
    const result = React.useMemo(
        () => dataMakesSense(data) ? calculate(data) : [],
        [data]
    );
    let graph = <Graph result={result} />;
    if (!result.length) {
        makesSense = false;
    }
    return <>
        <Helmet>
            <title>{t('core:title.browser.page', {pageTitle: t('core:pages.turnips')})}</title>
        </Helmet>
        <div style={{maxWidth: 800, margin: 'auto'}}>
            <Card style={{margin: 16}}>
                <CardHeader title={t('turnips:prices.title')} />
                <CardContent>
                    <Grid container spacing={1}>
                        {isXs && firstBuy}
                        <Grid item xs={12} sm={6}>
                            <TextField type="number" fullWidth value={data.buy ?? ''} onChange={(event) => setData({buy: event.target.value ? +event.target.value : null})} label={t('turnips:prices.buy')} />
                        </Grid>
                        {!isXs && firstBuy}
                        {weekDays.map((day) => (
                            <React.Fragment key={day}>
                                <Grid item xs={12} sm={6} key={`${day}am`}>
                                    <TextField type="number" fullWidth value={data[day].am ?? ''} onChange={(event) => setData({[day]: {am: event.target.value ? +event.target.value : null}})} label={t('core:time.meridian.am.long_day', {day: t(`core:time.weekday.${day}.long`)})} />
                                </Grid>
                                <Grid item xs={12} sm={6} key={`${day}pm`}>
                                    <TextField type="number" fullWidth value={data[day].pm ?? ''} onChange={(event) => setData({[day]: {pm: event.target.value ? +event.target.value : null}})} label={t('core:time.meridian.pm.long_day', {day: t(`core:time.weekday.${day}.long`)})} />
                                </Grid>
                            </React.Fragment>
                        ))}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="comp-label">{t('turnips:pattern.label')}</InputLabel>
                                <Select
                                    value={data.previousPattern}
                                    onChange={(event) => setData(
                                        {previousPattern: event.target.value as Pattern}
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
                            <Button style={{height: '100%'}} fullWidth variant="contained" color="primary" onClick={nextWeek}>{t('turnips:ui.start_next')}</Button>
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
            {graph}
        </div>
        <Dialog open={confirmOpen}>
            <DialogTitle>{t('turnips:ui.reset_dialogue.title')}</DialogTitle>
            <DialogContent>
                {t('turnips:ui.reset_dialogue.text')}
                <br />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={noConfirm}
                            onChange={(event) => setNoConfirm(event.target.checked)}
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