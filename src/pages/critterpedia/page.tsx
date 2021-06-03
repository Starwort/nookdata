import { Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField, useTheme } from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { UserCritterData, UserCritterpediaData } from '../../data';
import { range } from '../../misc';
import CritterPanel from './components/CritterPanel';
import { bugs, fish } from './data.json';
import SearchParameters from './search_parameters';

interface CritterpediaProps {
    load?: { type: 'bug' | 'fish', index: number }
}

export default function Critterpedia(props: CritterpediaProps) {
    const { t } = useTranslation(['core', 'critterpedia']);
    const theme = useTheme();
    const data: UserCritterpediaData = JSON.parse(window.localStorage.critterpedia);
    const [activeRequired, setActiveRequired] = React.useState<'now' | 'month' | 'until_next' | 'any'>('any');
    const [location, setLocation] = React.useState('');
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [priceComparison, setPriceComparison] = React.useState<'>=' | '=' | '<='>('>=');
    const [size, setSize] = React.useState('');
    const [stateRequired, setStateRequired] = React.useState<'unobtained' | 'unmodelled' | 'any'>('any');
    const searchParameters: SearchParameters = {
        activeRequired,
        location,
        name,
        price,
        priceComparison,
        size,
        stateRequired,
    };
    const { type, index } = props.load ?? { type: 'bug', index: null };
    const [bugsData, setBugsDataImpl] = React.useState(data.bugs);
    const [fishData, setFishDataImpl] = React.useState(data.fish);

    const history = useHistory();

    function setOpenDialogue(type: 'bug' | 'fish', index: number | null) {
        if (index === null) {
            history.push('/critterpedia');
        } else {
            history.push(`/critterpedia/${type}/${index}`);
        }
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
    return <>
        <Helmet>
            <title>{t('core:title.browser.page', { pageTitle: t('core:pages.critterpedia') })}</title>
        </Helmet>
        <div style={{ maxWidth: 1316, margin: 'auto' }}>
            <Card style={{ margin: 16 }}>
                <CardHeader title={t('critterpedia:search.title')} />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={4} >
                            <TextField fullWidth value={name} onChange={(event) => setName(event.target.value)} label={t('critterpedia:search.name')} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} >
                            <TextField fullWidth value={location} onChange={(event) => setLocation(event.target.value)} label={t('critterpedia:search.location')} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} >
                            <TextField fullWidth value={size} onChange={(event) => setSize(event.target.value)} label={t('critterpedia:search.shadow')} />
                        </Grid>
                        <Grid item xs={6} sm={3} md={2} >
                            <FormControl fullWidth>
                                <InputLabel id="comp-label">{t('critterpedia:search.price.label')}</InputLabel>
                                <Select
                                    value={priceComparison}
                                    onChange={(event) => setPriceComparison(
                                        event.target.value as ('>=' | '=' | '<=')
                                    )}
                                    labelId='comp-label'
                                    fullWidth
                                >
                                    <MenuItem value=">=">{t('critterpedia:search.price.comp_values.ge')}</MenuItem>
                                    <MenuItem value="=">{t('critterpedia:search.price.comp_values.eq')}</MenuItem>
                                    <MenuItem value="<=">{t('critterpedia:search.price.comp_values.le')}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={3} md={2} >
                            <TextField fullWidth value={price} onChange={(event) => setPrice(+event.target.value)} label={t('critterpedia:search.price.value')} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} >
                            <FormControl fullWidth>
                                <InputLabel id="active-label">{t('critterpedia:search.active.title')}</InputLabel>
                                <Select
                                    value={activeRequired}
                                    onChange={(event) => setActiveRequired(
                                        event.target.value as ('now' | 'month' | 'until_next' | 'any')
                                    )}
                                    labelId='active-label'
                                    fullWidth
                                >
                                    <MenuItem value="any">{t('critterpedia:search.active.any')}</MenuItem>
                                    <MenuItem value="month">{t('critterpedia:search.active.month')}</MenuItem>
                                    <MenuItem value="now">{t('critterpedia:search.active.now')}</MenuItem>
                                    <MenuItem value="until_next">{t('critterpedia:search.active.until_next')}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} >
                            <FormControl fullWidth>
                                <InputLabel id="state-label">{t('critterpedia:search.state.title')}</InputLabel>
                                <Select
                                    value={stateRequired}
                                    onChange={(event) => setStateRequired(
                                        event.target.value as ('any' | 'unobtained' | 'unmodelled')
                                    )}
                                    labelId='state-label'
                                    fullWidth
                                >
                                    <MenuItem value="any">{t('critterpedia:search.state.any')}</MenuItem>
                                    <MenuItem value="unobtained">{t('critterpedia:search.state.unobtained')}</MenuItem>
                                    <MenuItem value="unmodelled">{t('critterpedia:search.state.unmodelled')}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card style={{ margin: 16 }}>
                <CardHeader title={
                    <Trans i18nKey="critterpedia:cards.bugs" t={t}>
                        Bugs <span style={{ color: theme.palette.primary.main }}>
                            ({
                                {
                                    obtained: bugsData.reduce(
                                        (total, bug) => total + (+bug.obtained), 0),
                                }
                            } / 80)
                    </span> <span style={{ color: theme.palette.modelled.main }}>
                            ({
                                {
                                    modelled: bugsData.reduce(
                                        (total, bug) => total + (+bug.modelled), 0),
                                }
                            } / 80)
                    </span>
                    </Trans>
                } />
                <CardContent style={{ overflowX: 'auto' }}>
                    <table style={{ paddingRight: 16 }}>
                        <tbody>
                            {
                                range(5).map(
                                    (y) =>
                                        <tr key={y}>
                                            {
                                                range(16).map(
                                                    (x) => {
                                                        const myIndex = x * 5 + y;
                                                        const critterData = bugsData[myIndex];
                                                        return <td key={x}>
                                                            <CritterPanel
                                                                data={bugs[myIndex]}
                                                                obtained={critterData.obtained}
                                                                modelled={critterData.modelled}
                                                                type="bug"
                                                                setObtained={(value: boolean) => setBugsData(myIndex, { obtained: value, modelled: false })}
                                                                setModelled={(value: boolean) => setBugsData(myIndex, { obtained: true, modelled: value })}
                                                                open={type === 'bug' && index === myIndex}
                                                                setOpenDialogue={(value) => setOpenDialogue('bug', value)}
                                                                searchParameters={searchParameters}
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
                    <Trans i18nKey="critterpedia:cards.fish" t={t}>
                        Fish <span style={{ color: theme.palette.primary.main }}>
                            ({
                                {
                                    obtained: fishData.reduce(
                                        (total, fish) => total + (+fish.obtained), 0),
                                }
                            } / 80)
                        </span> <span style={{ color: theme.palette.modelled.main }}>
                            ({
                                {
                                    modelled: fishData.reduce(
                                        (total, fish) => total + (+fish.modelled), 0),
                                }
                            } / 80)
                        </span>
                    </Trans>
                } />
                <CardContent style={{ overflowX: 'auto' }}>
                    <table style={{ paddingRight: 16 }}>
                        <tbody>
                            {
                                range(5).map(
                                    (y) =>
                                        <tr key={y}>
                                            {
                                                range(16).map(
                                                    (x) => {
                                                        const myIndex = x * 5 + y;
                                                        const critterData = fishData[myIndex];
                                                        return <td key={x}>
                                                            <CritterPanel
                                                                data={fish[myIndex]}
                                                                obtained={critterData.obtained}
                                                                modelled={critterData.modelled}
                                                                type="fish"
                                                                setObtained={(value: boolean) => setFishData(myIndex, { obtained: value, modelled: false })}
                                                                setModelled={(value: boolean) => setFishData(myIndex, { obtained: true, modelled: value })}
                                                                open={type === 'fish' && index == myIndex}
                                                                setOpenDialogue={(value) => setOpenDialogue('fish', value)}
                                                                searchParameters={searchParameters}
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
    </>
}