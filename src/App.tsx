import {Button, CssBaseline, ThemeProvider} from '@material-ui/core';
import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router';
import {Redirect} from 'react-router-dom';
import {AppFrame, Loading, UpdateReadyDialogue, WorksOfflineDialogue} from './components';
import {DataContextProvider, TimeContextProvider} from './context';
import {upgradeData, UserSettings} from './data';
import {valueOr} from './misc';
import {Critterpedia, Turnips} from './pages';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import getTheme from './themes';

export function App() {
    React.useEffect(upgradeData, []);
    const [settings, setSettingsImpl] = React.useState(() => JSON.parse(window.localStorage.settings));
    function setSettings(value: UserSettings) {
        value.dataLastUpdated = new Date().toISOString();
        window.localStorage.settings = JSON.stringify(value);
        setSettingsImpl(value);
    }
    function setTheme(value: 'dark' | 'light') {
        document.body.classList.add("no-transition");
        setSettings({...settings, theme: value});
        // document.body.classList.remove("no-transition");
        setTimeout(() => document.body.classList.remove("no-transition"), 10);
    }
    const theme = React.useMemo(
        () => getTheme(settings.theme),
        [settings]
    );
    const [updateReady, setUpdateReadyImpl] = React.useState(false);
    const [worksOffline, setWorksOfflineImpl] = React.useState(false);
    const [updateReadyDialogueOpen, setUpdateReadyDialogueOpen] = React.useState(false);
    const [worksOfflineDialogueOpen, setWorksOfflineDialogueOpen] = React.useState(false);
    function setUpdateReady(value: boolean) {
        console.log('setUpdateReady:', value);
        setUpdateReadyImpl(value);
        setUpdateReadyDialogueOpen(value);
    }
    function setWorksOffline(value: boolean) {
        console.log('setWorksOffline:', value);
        setWorksOfflineImpl(value);
        setWorksOfflineDialogueOpen(value);
    }
    React.useEffect(() => {
        serviceWorkerRegistration.register({onUpdate: _ => setUpdateReady(true), onSuccess: _ => setWorksOffline(true)});
    }, []);
    return <ThemeProvider theme={theme}>
        <DataContextProvider>
            <TimeContextProvider>
                <CssBaseline />
                <AppFrame setTheme={setTheme} updateReady={updateReady} worksOffline={worksOffline} setWorksOffline={setWorksOffline}>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route path="/critterpedia/:type/:index" render={({match}) => {
                                let type = match.params.type;
                                let index = valueOr(match.params.index, -1);
                                if (!(type === 'bug' || type === 'fish') || index < 0 || index > 79) {
                                    return <Redirect to="/critterpedia" />;
                                }
                                return <Critterpedia load={{type, index}} />;
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
                            <Route path="/test">
                                <Button onClick={() => setUpdateReady(!updateReady)}>
                                    Toggle <code>updateReady</code> (currently <code>{'' + updateReady}</code>)
                                </Button>
                                <Button onClick={() => setWorksOffline(!worksOffline)}>
                                    Toggle <code>worksOffline</code> (currently <code>{'' + worksOffline}</code>)
                                </Button>
                            </Route>
                        </Switch>
                    </Suspense>
                </AppFrame>
                <WorksOfflineDialogue open={worksOfflineDialogueOpen} setOpen={setWorksOfflineDialogueOpen} />
                <UpdateReadyDialogue open={updateReadyDialogueOpen} setOpen={setUpdateReadyDialogueOpen} />
            </TimeContextProvider>
        </DataContextProvider>
    </ThemeProvider>;
}
