import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import { AppFrame, Loading, UpdateReadyDialogue, WorksOfflineDialogue } from './components';
import { NDContextProvider } from './context';
import { booleanOr, valueOr } from './misc';
import { Critterpedia, Turnips } from './pages';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import getTheme, { ThemeName } from './themes';
import UserSettings from './user_settings';

export function App() {
    const themeSetting: ThemeName = window.localStorage.theme || 'dark';
    const [chosenTheme, setChosenThemeImpl] = React.useState<'dark' | 'light'>(themeSetting);
    function setChosenTheme(value: 'dark' | 'light') {
        window.localStorage.theme = value;
        document.body.classList.add("no-transition");
        setChosenThemeImpl(value);
        // document.body.classList.remove("no-transition");
        setTimeout(() => document.body.classList.remove("no-transition"), 10);
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
    };
    const theme = React.useMemo(
        () => getTheme(chosenTheme),
        [chosenTheme]
    );
    const [updateReady, setUpdateReady] = React.useState(false);
    const [worksOffline, setWorksOffline] = React.useState(false);
    serviceWorkerRegistration.register({ onUpdate: _ => setUpdateReady(true), onSuccess: _ => setWorksOffline(true) });
    console.log(chosenTheme);
    return <ThemeProvider theme={theme}>
        <NDContextProvider settings={settings}>
            <CssBaseline />
            <AppFrame setTheme={setChosenTheme}>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route path="/critterpedia/:type/:index" render={({ match }) => {
                            let type = match.params.type;
                            let index = valueOr(match.params.index, -1);
                            if (!(type === 'bug' || type === 'fish') || index < 0 || index > 79) {
                                return <Redirect to="/critterpedia" />;
                            }
                            return <Critterpedia load={{ type, index }} />;
                        }}>
                        </Route>
                        <Route path="/critterpedia" exact>
                            <Critterpedia />
                        </Route>
                        <Route path="/critterpedia">
                            <Redirect to="/critterpedia" />
                        </Route>
                        <Route path="/turnips">
                            <Turnips />
                        </Route>
                        <Route path="/loading">
                            <Loading />
                        </Route>
                    </Switch>
                </Suspense>
            </AppFrame>
            <WorksOfflineDialogue open={worksOffline} setOpen={setWorksOffline} />
            <UpdateReadyDialogue open={updateReady} setOpen={setUpdateReady} />
        </NDContextProvider>
    </ThemeProvider>;
}
