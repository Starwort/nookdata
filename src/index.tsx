import { CssBaseline, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { EmojiNature } from '@material-ui/icons';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router';
import { BrowserRouter, NavLink, NavLinkProps, Redirect } from 'react-router-dom';
import { homepage } from '../package.json';
import AppBar from './components/AppBar';
import NavigationDrawer from './components/NavigationDrawer';
import UpdateReadyDialogue from './components/UpdateReadyDialogue';
import WorksOfflineDialogue from './components/WorksOfflineDialogue';
import { NDContextProvider } from './context';
import './i18n';
import './index.scss';
import { Dict } from './misc';
import Critterpedia from './pages/critterpedia';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import getTheme from './themes';
import UserSettings from './user_settings';

const baseUrl = process.env.NODE_ENV === 'production' ? homepage : 'http://localhost:3000/nookdata_v2';
const root = '/nookdata_v2';

interface PageData {
    title: string;
    icon: React.ReactNode;
}
const pageData: Dict<PageData> = {
    '/critterpedia': {
        title: 'core:pages.critterpedia',
        icon: <EmojiNature />,
    },
    // '/': {
    //     title: 'Home',
    //     icon: <EmojiNature />,
    // },
}


interface DrawerAdjustProps {
    active: boolean,
    children: React.ReactNode;
}
function DrawerAdjust(props: DrawerAdjustProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <div style={{ paddingLeft: 240 * (+props.active) * (+matches), transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms' }}>
            {props.children}
        </div>
    )
}

interface ListItemLinkProps {
    icon?: React.ReactNode;
    primary: string;
    to: string;
    exact?: boolean;
}
function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to, exact } = props;
    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<NavLinkProps, 'to'>>((itemProps, ref) => (
                <NavLink to={to} ref={ref} {...itemProps} activeClassName="Mui-selected" exact={exact} />
            )),
        [to],
    );
    return <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
    </ListItem>;
}

interface AppFrameProps {
    setTheme: (value: "dark" | "light") => void;
    theme: "dark" | "light";
    children: React.ReactNode;
}
function AppFrame(props: AppFrameProps) {
    const theme = useTheme();
    const startOpen = useMediaQuery(theme.breakpoints.up('lg'));
    const [initialRender, setInitialRender] = React.useState(true);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    if (startOpen && initialRender) {
        setDrawerOpen(true);
        setInitialRender(false);
    }
    const { t } = useTranslation('core');
    return (
        <>
            <AppBar setTheme={props.setTheme} setDrawerOpen={setDrawerOpen} theme={props.theme} drawerOpen={drawerOpen} title={
                <Typography variant="h6">
                    <div
                        style={{
                            color: theme.palette.winter.main,
                            display: 'inline'
                        }}>{t('title.a')}</div>
                    <div
                        style={{
                            color: theme.palette.summer.main,
                            display: 'inline'
                        }}>{t('title.b')}</div>
                </Typography>
            } />
            <NavigationDrawer open={drawerOpen} setOpen={setDrawerOpen}>
                <List>
                    {Object.entries(pageData).map(([route, data]) => (
                        <ListItemLink to={route} icon={data.icon} primary={t(data.title)} />
                    ))}
                </List>
            </NavigationDrawer>
            <DrawerAdjust active={drawerOpen}>
                {props.children}
            </DrawerAdjust>
        </>
    )
}

// interface RouteProps {
//     page: string;
//     route: string;
//     children: React.ReactNode;
// }
// function Route(props: RouteProps) {
//     const { t } = useTranslation('core');
//     if (props.page.split('?')[0] !== props.route) {
//         return null;
//     }
//     document.title = t('core:title.browser.page', { pageTitle: t(pageData[props.route].title) });
//     return <>
//         {props.children}
//     </>;
// }

let timeUpdateId: number | undefined = undefined;
const sentinelDate = new Date();

function Loading() {
    // return <img
    //     src="assets/shared/loading.gif"
    //     style={{ width: '20%', height: '20%', margin: '15% 40%', borderRadius: '50%' }}
    // />;
    return <div className="loader"></div>
}

function valueOr(data: String | undefined, defaultValue: number) {
    let rv = data ? +data : defaultValue;
    if (!isNaN(rv)) {
        return rv;
    } else {
        return defaultValue;
    }
}
function booleanOr(data: String | undefined, defaultValue: boolean) {
    switch (data) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return defaultValue;
    }
}

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
