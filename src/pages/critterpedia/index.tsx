import { Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField, useTheme } from '@material-ui/core';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import UserSettings from '../../user_settings';
import CritterPanel from './components/CritterPanel';
import { getCritterName } from './data';
import { bugs, fish } from './data.json';
import SearchParameters from './search_parameters';

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
    params: URLSearchParams;
    setParams: (route: URLSearchParams) => void;
}

export default function Critterpedia(props: CritterpediaProps) {
    const { t } = useTranslation('critterpedia');
    const { settings, time, params, setParams } = props;
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
    const [bugsData, setBugsDataImpl] = React.useState(data.bugs);
    const [fishData, setFishDataImpl] = React.useState(data.fish);
    const [openDialogue, setOpenDialogueImpl] = React.useState<number | null>(null);
    const [openDialogueType, setOpenDialogueTypeImpl] = React.useState<'bug' | 'fish'>('bug');
    function openCritterDialogue(type: 'bug' | 'fish', index: number | null) {
        if (index !== null) {
            console.log(`Loading ${type} #${index}`);
            if (type !== openDialogueType) {
                setOpenDialogueTypeImpl(type);
            }
            let title = getCritterName(
                (
                    type === 'bug'
                        ? bugs
                        : fish
                )[index],
                type,
                t
            ).capitalise();
            document.title = t('critterpedia:title.info', { name: title });
            window.history.pushState(null, t('critterpedia:title.info', { name: title }));
            setParams(new URLSearchParams({ 'type': type, 'index': index.toString() }));
            if (index !== openDialogue) {
                setOpenDialogueImpl(index);
            }
        } else {
            console.log('Unloading critter dialogue');
            document.title = t('critterpedia:title.default');
            window.history.pushState(null, t('critterpedia:title.default'));
            setParams(new URLSearchParams());
            setOpenDialogueImpl(null);
        }
    }
    // function setOpenDialogueType(value: 'bug' | 'fish') {
    //     console.log('Loading:', value);
    //     setOpenDialogueTypeImpl(value);
    // }
    // function setOpenDialogue(value: number | null) {
    //     console.log(openDialogueType);
    //     if (value !== null) {
    //         let title = getCritterName(
    //             (
    //                 openDialogueType === 'bug'
    //                     ? bugs
    //                     : fish
    //             )[value],
    //             openDialogueType,
    //             t
    //         ).capitalise();
    //         document.title = t('critterpedia:title.info', { name: title });
    //         window.history.pushState(null, t('critterpedia:title.info', { name: title }));
    //         setParams(new URLSearchParams({ 'type': openDialogueType, 'index': value.toString() }));
    //     } else {
    //         document.title = t('critterpedia:title.default');
    //         window.history.pushState(null, t('critterpedia:title.default'));
    //         setParams(new URLSearchParams());
    //     }
    //     setOpenDialogueImpl(value);
    // }
    try {
        if (!params.has('type')) {
            throw new Error();
        }
        if (!params.has('index')) {
            throw new Error();
        }
        const type: 'bug' | 'fish' = params.get('type') as 'bug' | 'fish';
        const index: number = +params.get('index')!;
        if (type === 'bug' || type == 'fish') {
            if (0 <= index && index < 80) {
                openCritterDialogue(type, index);
            }
        }
    } catch {
        props.setParams(new URLSearchParams({}));
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
                    <Grid item xs={4} sm={2} md={2} >
                        {/* display:flex;justify-content:center;align-items:center; */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}>
                            {t('critterpedia:search.price.label')}
                        </div>
                    </Grid>
                    <Grid item xs={4} sm={2} md={1} >
                        <FormControl fullWidth>
                            <InputLabel id="comp-label">{t('critterpedia:search.price.comp')}</InputLabel>
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
                    <Grid item xs={4} sm={2} md={1} >
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
                                    <tr>
                                        {
                                            range(16).map(
                                                (x) => {
                                                    const critterData = bugsData[x * 5 + y];
                                                    return <td key={x}>
                                                        <CritterPanel
                                                            data={bugs[x * 5 + y]}
                                                            obtained={critterData.obtained}
                                                            modelled={critterData.modelled}
                                                            type="bug"
                                                            setObtained={(value: boolean) => setBugsData(x * 5 + y, { obtained: value, modelled: false })}
                                                            setModelled={(value: boolean) => setBugsData(x * 5 + y, { obtained: true, modelled: value })}
                                                            month={now.getMonth()}
                                                            hour={now.getHours()}
                                                            openDialogue={openDialogueType === 'bug' ? openDialogue : null}
                                                            setOpenDialogue={(value: number | null) => {
                                                                // setOpenDialogueType('bug');
                                                                // setOpenDialogue(value);
                                                                openCritterDialogue('bug', value);
                                                            }}
                                                            searchParameters={searchParameters}
                                                            settings={settings}
                                                            now={time}
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
                                    <tr>
                                        {
                                            range(16).map(
                                                (x) => {
                                                    const critterData = fishData[x * 5 + y];
                                                    return <td key={x}>
                                                        <CritterPanel
                                                            data={fish[x * 5 + y]}
                                                            obtained={critterData.obtained}
                                                            modelled={critterData.modelled}
                                                            type="fish"
                                                            setObtained={(value: boolean) => setFishData(x * 5 + y, { obtained: value, modelled: false })}
                                                            setModelled={(value: boolean) => setFishData(x * 5 + y, { obtained: true, modelled: value })}
                                                            month={now.getMonth()}
                                                            hour={now.getHours()}
                                                            openDialogue={openDialogueType === 'fish' ? openDialogue : null}
                                                            setOpenDialogue={(value: number | null) => {
                                                                // setOpenDialogueType('fish');
                                                                // setOpenDialogue(value);
                                                                openCritterDialogue('fish', value);
                                                            }}
                                                            searchParameters={searchParameters}
                                                            settings={settings}
                                                            now={time}
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