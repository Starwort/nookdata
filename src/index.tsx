
import { CssBaseline, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { EmojiNature } from '@material-ui/icons';
import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from './components/AppBar';
import NavigationDrawer from './components/NavigationDrawer';
import './index.scss';
import Critterpedia from './pages/critterpedia';
import getTheme from './themes';
import UserSettings from './user_settings';


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
interface AppFrameProps {
    setTheme: (value: "dark" | "light") => void;
    theme: "dark" | "light";
    setPage: (value: string) => void;
    page: string;
    children: React.ReactNode;
}
function AppFrame(props: AppFrameProps) {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const theme = useTheme();
    return (
        <>
            <AppBar setTheme={props.setTheme} setDrawerOpen={setDrawerOpen} theme={props.theme} drawerOpen={drawerOpen} title={
                <Typography variant="h6">
                    <div
                        style={{
                            color: theme.palette.winter.main,
                            display: 'inline'
                        }}>Nook</div>
                    <div
                        style={{
                            color: theme.palette.summer.main,
                            display: 'inline'
                        }}>Data</div>
                </Typography>
            } />
            <NavigationDrawer open={drawerOpen} setOpen={setDrawerOpen}>
                <List>
                    <ListItem selected={props.page === 'critterpedia'} button key='critterpedia' onClick={() => props.setPage('critterpedia')}>
                        <ListItemIcon><EmojiNature /></ListItemIcon>
                        <ListItemText primary='Critterpedia' />
                    </ListItem>
                    {/* {['A', 'B', 'C'].map((text, index) => (
                        <ListItem selected={props.page === text} button key={text} onClick={() => props.setPage(text)}>
                            <ListItemIcon>{index % 2 === 0 ? <EmojiNature /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))} */}
                </List>
                {/* <Divider />
                <List>
                    {['A', 'B', 'C'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <EmojiNature /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}
            </NavigationDrawer>
            <DrawerAdjust active={drawerOpen}>
                {props.children}
            </DrawerAdjust>
        </>
    )
}

interface RouteProps {
    page: string;
    route: string;
    children: React.ReactNode;
}
function Route(props: RouteProps) {
    if (props.page !== props.route) {
        return null;
    }
    return <>
        {props.children}
    </>;
}

let timeUpdateId: number | undefined = undefined;
const sentinelDate = new Date();

function App() {
    const themeSetting: "dark" | "light" = window.localStorage.theme || 'dark';
    const [chosenTheme, setChosenTheme] = React.useState<'dark' | 'light'>(themeSetting);
    const hemisphereSetting: "north" | "south" = window.localStorage.hemisphere || 'north';
    const [chosenHemisphere, setChosenHemisphere] = React.useState<'north' | 'south'>(hemisphereSetting);
    const settings: UserSettings = {
        theme: chosenTheme,
        hemisphere: chosenHemisphere,
        islandName: 'Gloverboia',
        playerName: 'Starwort',
        timeOffset: 0,
        useSystemTime: true,
        useTwelveHourTime: true,
    }
    const [time, setTime] = React.useState(sentinelDate);
    if (timeUpdateId) {
        window.clearInterval(timeUpdateId);
    }
    timeUpdateId = window.setInterval(() => setTime(new Date()), 500);
    const [page, setPage] = React.useState('home');
    const theme = React.useMemo(
        () => getTheme(chosenTheme),
        [chosenTheme]
    );
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppFrame page={page} theme={chosenTheme} setTheme={setChosenTheme} setPage={setPage}>
            <Route page={page} route="critterpedia">
                <Critterpedia time={time} settings={settings} />
            </Route>
        </AppFrame>
    </ThemeProvider>
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
export { };
