import { List, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { EmojiNature, Info, Language } from '@material-ui/icons';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import LightModeIcon from '@material-ui/icons/Brightness7';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, DrawerAdjust, ListItemLink, NavigationDrawer } from '.';
import { Dict } from '../misc';
import { ThemeName } from '../themes';
import InfoDialogue from './InfoDialogue';
import LanguageDialogue from './LanguageDialogue';

interface PageData {
    title: string;
    icon: React.ReactNode;
}
export const pageData: Dict<PageData> = {
    '/critterpedia': {
        title: 'core:pages.critterpedia',
        icon: <EmojiNature />,
    },
    // '/turnips': {
    //     title: 'core:pages.turnips',
    //     icon: <ShowChart />,
    // },
}

interface AppFrameProps {
    setTheme: (value: ThemeName) => void;
    children: React.ReactNode;
    updateReady: boolean;
    worksOffline: boolean;
}
let initialRenders = 10;
export default function AppFrame(props: AppFrameProps) {
    const theme = useTheme();
    const startOpen = useMediaQuery(theme.breakpoints.up('lg'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    if (initialRenders) {
        console.log(initialRenders, startOpen)
        if (startOpen && !drawerOpen) {
            initialRenders = 0;
            setDrawerOpen(true);
        } else {
            initialRenders--;
        }
    }
    const { t, i18n } = useTranslation('core');
    const [langOpen, setLangOpen] = React.useState(false);
    const [infoOpen, setInfoOpen] = React.useState(false);
    const newTheme: ThemeName = theme.name === 'dark' ? 'light' : 'dark';
    return (
        <>
            <AppBar
                setDrawerOpen={setDrawerOpen}
                drawerOpen={drawerOpen}
                title={
                    <Typography variant="h6">
                        <div
                            style={{
                                color: theme.palette.winter.main,
                                display: 'inline'
                            }}
                        >
                            {t('title.a')}
                        </div>
                        <div
                            style={{
                                color: theme.palette.summer.main,
                                display: 'inline'
                            }}
                        >
                            {t('title.b')}
                        </div>
                    </Typography>
                }
                updateReady={props.updateReady}
                worksOffline={props.worksOffline}
            />
            <NavigationDrawer open={drawerOpen} setOpen={setDrawerOpen}>
                <List>
                    {Object.entries(pageData).map(([route, data]) => (
                        <ListItemLink to={route} icon={data.icon} primary={t(data.title)} />
                    ))}
                </List>
                <div style={{ flexGrow: 1 }} />
                <ListItem button onClick={() => setInfoOpen(true)}>
                    <ListItemIcon>
                        <Info />
                    </ListItemIcon>
                    <ListItemText primary={t('core:sidebar.about')} />
                </ListItem>
                <ListItem button onClick={() => setLangOpen(true)}>
                    <ListItemIcon>
                        <Language />
                    </ListItemIcon>
                    <ListItemText primary={t('core:sidebar.lang')} />
                </ListItem>
                <ListItem button onClick={() => props.setTheme(newTheme)}>
                    <ListItemIcon>
                        {
                            newTheme === 'dark'
                                ? <DarkModeIcon />
                                : <LightModeIcon />
                        }
                    </ListItemIcon>
                    <ListItemText primary={t('core:sidebar.theme')} />
                </ListItem>
            </NavigationDrawer>
            <LanguageDialogue open={langOpen} setLang={(value: string) => {
                i18n.changeLanguage(value);
                setLangOpen(false);
            }} />
            <InfoDialogue open={infoOpen} setOpen={setInfoOpen} />
            <DrawerAdjust active={drawerOpen}>
                {props.children}
            </DrawerAdjust>
        </>
    );
}
