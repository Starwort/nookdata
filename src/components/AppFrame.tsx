import {Typography, useMediaQuery, useTheme} from '@material-ui/core';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {AppBar, DrawerAdjust, NavigationDrawer, SettingsDialogue} from '.';
import {UserSettings} from '../data';
import InfoDialogue from './dialogues/InfoDialogue';


interface AppFrameProps {
    children: React.ReactNode;
    updateReady: boolean;
    worksOffline: boolean;
    setWorksOffline(value: boolean): void;
    setSettings(settings: UserSettings): void;
}
let initialRenders = 10;
export default function AppFrame({children, updateReady, worksOffline, setWorksOffline, setSettings}: AppFrameProps) {
    const theme = useTheme();
    const startOpen = useMediaQuery(theme.breakpoints.up('lg'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    if (initialRenders) {
        console.log(initialRenders, startOpen);
        if (startOpen && !drawerOpen) {
            initialRenders = 0;
            setDrawerOpen(true);
        } else {
            initialRenders--;
        }
    }
    const {t} = useTranslation('core');
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [infoOpen, setInfoOpen] = React.useState(false);
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
                updateReady={updateReady}
                worksOffline={worksOffline}
                setWorksOffline={setWorksOffline}
            />
            <NavigationDrawer
                open={drawerOpen}
                setOpen={setDrawerOpen}
                setInfoOpen={setInfoOpen}
                setSettingsOpen={setSettingsOpen}
            />
            <SettingsDialogue open={settingsOpen} setOpen={setSettingsOpen} setSettings={setSettings} />
            <InfoDialogue open={infoOpen} setOpen={setInfoOpen} />
            <DrawerAdjust active={drawerOpen}>
                {children}
            </DrawerAdjust>
        </>
    );
}
