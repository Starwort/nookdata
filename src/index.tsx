import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { AppFrame, Loading, UpdateReadyDialogue, WorksOfflineDialogue } from './components';
import { NDContextProvider } from './context';
import './i18n';
import './index.scss';
import { booleanOr, root, valueOr } from './misc';
import { Critterpedia } from './pages';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import getTheme from './themes';
import UserSettings from './user_settings';

let timeUpdateId: number | undefined = undefined;
const sentinelDate = new Date();

function App() {
    const { t } = useTranslation('core');
    const themeSetting: "dark" | "light" = window.localStorage.theme || 'dark';
    const [chosenTheme, setChosenThemeImpl] = React.useState<'dark' | 'light'>(themeSetting);
    function setChosenTheme(value: 'dark' | 'light') {
        document.body.classList.add("no-transition");
        setTimeout(() => setChosenThemeImpl(value), 10);
        setTimeout(() => document.body.classList.remove("no-transition"), 20);
    }
    const nameSetting: string = window.localStorage.playerName || 'PLAYER';
    const [chosenName, setChosenNameImpl] = React.useState(nameSetting);
    function setChosenName(value: string) {
        window.localStorage.playerName = value;
        setChosenNameImpl(value);
    }
    const islandNameSetting: string = window.localStorage.islandName || 'ISLAND';
    const [chosenIslandName, setChosenIslandNameImpl] = React.useState(islandNameSetting);
    function setChosenIslandName(value: string) {
        window.localStorage.islandName = value;
        setChosenIslandNameImpl(value);
    }
    const hemisphereSetting: "north" | "south" = window.localStorage.hemisphere || 'north';
    const [chosenHemisphere, setChosenHemisphereImpl] = React.useState<'north' | 'south'>(hemisphereSetting);
    function setChosenHemisphere(value: 'north' | 'south') {
        window.localStorage.hemisphere = value;
        setChosenHemisphereImpl(value);
    }
    const offsetSetting: number = valueOr(window.localStorage.timeOffset, 0);
    const [chosenOffset, setChosenOffsetImpl] = React.useState(offsetSetting);
    function setChosenOffset(value: number) {
        window.localStorage.timeOffset = value;
        setChosenOffsetImpl(value);
    }
    const systemTimeSetting: boolean = booleanOr(window.localStorage.useSystemTime, true);
    const [chosenSystemTime, setChosenSystemTimeImpl] = React.useState(systemTimeSetting);
    function setChosenSystemTime(value: boolean) {
        window.localStorage.useSystemTime = value;
        setChosenSystemTimeImpl(value);
    }
    const twelveHourTimeSetting: boolean = booleanOr(window.localStorage.useTwelveHourTime, false);
    const [chosenTwelveHourTime, setChosenTwelveHourTimeImpl] = React.useState(twelveHourTimeSetting);
    function setChosenTwelveHourTime(value: boolean) {
        window.localStorage.useTwelveHourTime = value;
        setChosenTwelveHourTimeImpl(value);
    }
    const settings: UserSettings = {
        theme: chosenTheme,
        hemisphere: chosenHemisphere,
        islandName: chosenIslandName,
        playerName: chosenName,
        timeOffset: chosenOffset,
        useSystemTime: chosenSystemTime,
        useTwelveHourTime: chosenTwelveHourTime,
    }
    const [time, setTime] = React.useState(sentinelDate);
    if (timeUpdateId) {
        window.clearInterval(timeUpdateId);
    }
    timeUpdateId = window.setInterval(() => setTime(new Date()), 500);
    const theme = React.useMemo(
        () => getTheme(chosenTheme),
        [chosenTheme]
    );
    const [updateReady, setUpdateReady] = React.useState(false);
    const [worksOffline, setWorksOffline] = React.useState(false);
    serviceWorkerRegistration.register({ onUpdate: _ => setUpdateReady(true), onSuccess: _ => setWorksOffline(true) });
    return <ThemeProvider theme={theme}>
        <NDContextProvider time={time} settings={settings}>
            <CssBaseline />
            <AppFrame theme={chosenTheme} setTheme={setChosenTheme}>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        {/* <Route exact path="/">
                            Hello world!
                        </Route> */}
                        <Route path="/critterpedia/:type/:index" render={({ match }) => {
                            let type = match.params.type;
                            let index = valueOr(match.params.index, -1);
                            if (!(type === 'bug' || type === 'fish') || index < 0 || index > 79) {
                                return <Redirect to="/critterpedia" />
                            }
                            return <Critterpedia load={{ type, index }} />
                        }}>
                        </Route>
                        <Route path="/critterpedia" exact>
                            <Critterpedia />
                        </Route>
                        <Route path="/critterpedia">
                            <Redirect to="/critterpedia" />
                        </Route>
                        <Route path="/loading">
                            <Loading />
                        </Route>
                    </Switch>
                    {/* <Route page={page} route="/">
                    <Loading />
                </Route> */}
                </Suspense>
            </AppFrame>
            <WorksOfflineDialogue open={worksOffline} setOpen={setWorksOffline} />
            <UpdateReadyDialogue open={updateReady} setOpen={setUpdateReady} />
        </NDContextProvider>
    </ThemeProvider>
}

ReactDOM.render(
    <Suspense fallback={<Loading />}>
        <BrowserRouter basename={root}>
            <App />
        </BrowserRouter>
    </Suspense>,
    document.getElementById('root')
);
export { };
